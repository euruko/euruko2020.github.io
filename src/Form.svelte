<script>
  let loading = false;
  let promise = null;
  let email = "";
  const options = [
    { name: "dates", description: "The dates are confirmed" },
    { name: "cfp", description: "The call for papers is open" },
    { name: "tickets", description: "Tickets are available" }
  ];
  let selectedOptions = options.map(option => option.name);

  async function postData(url, data = {}) {
    return fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        loading = false;
        return response.json();
      })
      .catch(error => {
        loading = false;
        throw error;
      });
  }

  function handleSubmit(event) {
    loading = true;
    promise = postData("https://list.euruko2020.org/register", {
      email: email,
      options: selectedOptions
    });
  }

  function clearPromise() {
    promise = null;
  }
</script>

<style>
  .error {
    color: red;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <h3 class="form-title">Get notified once we know more about the event</h3>
  <input
    class="form-email"
    type="email"
    placeholder="Your email address"
    bind:value={email}
    readonly={loading}
    required
    on:input={clearPromise} />
  <div class="form-notices">
    <p class="form-notices__title">Notify me when</p>

    {#each options as option}
      <div class="form-checkbox">
        <input
          class="form-checkbox__input"
          type="checkbox"
          bind:group={selectedOptions}
          value={option.name}
          id={option.name} />
        <label for={option.name} class="form-checkbox__text">
           {option.description}
        </label>
      </div>
    {/each}
  </div>

  <button class="form-submit" type="submit" disabled={loading}>
    {#if loading}Sending{:else}Submit{/if}
  </button>

  {#if promise}
    {#await promise}
      <p>...waiting</p>
    {:then result}
      {#if result.success}
        <p>Success! Check your inbox for the confirmation link.</p>
      {:else}
        <p class="error">{result.error}</p>
      {/if}
    {:catch error}
      <p class="error">{error.message}</p>
    {/await}
  {/if}
</form>
