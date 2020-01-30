<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import attendees from "./data/countries.json";
  import world from "./data/world.json";

  let svgEl;
  const width = 1920;
  const height = 1080;

  function renderSVG() {
    const svg = d3.select(svgEl);

    // Map and projection
    let path = d3.geoPath();
    let projection = d3.geoEqualEarth().fitSize([width, height], world);

    // Data and color scale
    let data = d3.map();
    let colorScale = d3.scaleThreshold()
      .domain([1, 3, 6, 12, 24, 48, 96, 192])
      .range(d3.schemePurples[9]);

    attendees.forEach((item, i) => {
      if (item.alpha3) {
        data.set(item.alpha3, +item.count);
      }
    });

    svg.append("g")
      .selectAll("path")
      .data(world.features)
      .enter()
      .append("path")
        .attr("d", d3.geoPath()
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
