<script>
  import { onMount } from "svelte";
  import { select } from "d3-selection";
  import { geoPath, geoEqualEarth } from "d3-geo";
  import { scaleThreshold } from "d3-scale";
  import { schemePurples } from "d3-scale-chromatic";
  import { map } from "d3-collection";
  import attendees from "./data/countries.json";
  import world from "./data/world.json";

  let svgEl;
  const width = 1920;
  const height = 1080;

  function renderSVG() {
    const svg = select(svgEl);

    // Map and projection
    let path = geoPath();
    let projection = geoEqualEarth().fitSize([width, height], world);

    // Data and color scale
    let data = map();
    let colorScale = scaleThreshold()
      .domain([1, 2, 4, 8, 16, 32])
      .range(schemePurples[7]);

    attendees.forEach((item, i) => {
      if (item.alpha3) {
        data.set(item.alpha3, item.percentage);
      }
    });

    svg.append("g")
      .selectAll("path")
      .data(world.features)
      .enter()
      .append("path")
        .attr("d", geoPath()
          .projection(projection)
        )
        .attr("fill", function (d) {
          d.total = data.get(d.id) || 0;
          return colorScale(d.total);
        });
  }

  onMount(() => {
    renderSVG();
  })
</script>

<style>
</style>

<svg bind:this={svgEl} viewBox={`0 0 ${width} ${height}`}></svg>

<table>
  <thead>
    <tr>
      <th>Country</th>
      <th>Attendees</th>
    </tr>
  </thead>
  <tbody>
    {#each attendees.reverse() as country}
    <tr>
      <th>{country.name}</th>
      <th>{country.percentage === 1 ? "≤1" : country.percentage}%</th>
    </tr>
    {/each}
  </tbody>
</table>
