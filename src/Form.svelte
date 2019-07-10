<script>
  let loading = false;
  let promise = null;
  let email = "";
  const options = [
    { name: "dates", description: "The dates are confirmed" },
    { name: "cfp", description: "The call for papers is open" },
    { name: "tickets", description: "Tickets are available" },
  ]
  let selectedOptions = options.map(option => option.name);

  async function postData(url, data={}) {
    return fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      loading = false;
      return response.json();
    }).catch((error) => {
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
  h1 {
  color: purple;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <p>Get notified once we know more about the event</p>
  <label>
    Your email address
    <input type="email" bind:value={email} readonly={loading} on:input={clearPromise}>
  </label>
  <p>Notify me when</p>

  {#each options as option}
    <label>
      <input type=checkbox bind:group={selectedOptions} value={option.name}>
      {option.description}
    </label>
  {/each}

  <button type="submit" disabled={loading}>
    {#if loading}
      Sending
    {:else}
      Submit
    {/if}
  </button>

  {#if promise}
    {#await promise}
      <p>...waiting</p>
    {:then result}
      {#if result.success}
        <p>Success</p>
      {:else}
        <p>{result.error}</p>
      {/if}
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  {/if}
</form>
