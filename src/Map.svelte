<script>
  import { onMount } from "svelte";
  // import attendees from "./data/countries.json";
  // import world from "./data/world.json";
  import L from "leaflet";
  import chroma from "chroma-js";

  let map;
  let world;
  let leafletContainer;
  let attendees;

  function renderMap() {
    const colorScale = chroma.scale(["#fff", "#f2f0f7", "#503069"])
      .domain([0, 1, Math.max(...attendees.map(country => country.percentage))], 7, "log")
      .mode("hsl");

    function style(feature) {
      return {
        fillColor: colorScale(feature.properties.percentage).hex(),
        weight: 1,
        opacity: 1,
        color: '#4F3767',
        fillOpacity: 1
      };
    }

    const features = world.features.map((country) => {
      const data = attendees.find((item) => item.alpha3 === country.id);
      country.properties["percentage"] = data ? data.percentage : 0;
      return country;
    });

    const filtered = features.filter(country => country.id !== "ATA");

    let geojson = L.geoJson(filtered, {
      style: style,
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`${feature.properties.percentage === 1 ? "≤1" : feature.properties.percentage}&percnt; from ${feature.properties.name}`);
        layer.on({
          mouseover: event => {
            let layer = event.target;

            layer.setStyle({
              weight: 2,
              dashArray: '',
              fillOpacity: 1
            });

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
              layer.bringToFront();
            }
          },
          mouseout: event => {
            geojson.resetStyle(event.target);
          }
        })
      }
    });
    geojson.addTo(map);
  }

  function getAttendees() {
    const attendeesURL = document.body.getAttribute("data-countries");
    return fetch(attendeesURL).then(response => response.json())
  }

  function getWorld() {
    const worldURL = document.body.getAttribute("data-world");
    return fetch(worldURL).then(response => response.json())
  }

  onMount(() => {
    map = L.map(leafletContainer, {
      center: [54.9, 25.316667],
      zoom: 3.25,
      attributionControl: false,
      scrollWheelZoom: false
    });

    Promise.all([getAttendees(), getWorld()]).then(result => {
      attendees = result[0];
      world = result[1];
      renderMap();
    })
  });
</script>

<style>
  .aspect-ratio-box {
    height: 0;
    overflow: hidden;
    padding-top: calc(9 / 16 * 100%);
    background: white;
    position: relative;
  }

  .aspect-ratio-box-inside {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .map {
    border: 1px solid #4F3767;
    z-index: 0;
  }

  :global(.leaflet-container) {
    background: rgba(255,255,255,0);
  }

  :global(.info) {
    width: 200px;
    padding: 6px 8px;
    background: white;
    background: rgba(255,255,255,0.9);
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
    border-radius: 5px;
  }
  :global(.info h4) {
      font-weight: bold;
      margin: 0 0 5px;
  }
</style>

<div class="aspect-ratio-box">
  <div class="map aspect-ratio-box-inside" bind:this={leafletContainer}></div>
</div>

<table>
  <thead>
    <tr>
      <th>Country</th>
      <th>Attendees</th>
    </tr>
  </thead>
  <tbody>
    {#if attendees}
      {#each attendees.reverse() as country}
      <tr>
        <td>{country.name}</td>
        <td>{country.percentage === 1 ? "≤1" : country.percentage}%</td>
      </tr>
      {/each}
    {/if}
  </tbody>
</table>
