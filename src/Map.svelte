<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  // import * as countries from "world-atlas/countries-110m.json";
  import * as topojson from "topojson-client";
  console.log(d3);
  let canvas;

  // console.log(countries);

  onMount(() => {
    console.log("onMount");
    let context = canvas.getContext("2d");
    context.scale(2,2);
    let path = d3.geoPath().context(context);

    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json").then((world) => {
      let countries = topojson.feature(world, world.objects.countries)
      let graticule = d3.geoGraticule10()
      let outline = ({type: "Sphere"})
      let projection = d3.geoEqualEarth()
      let width = 960;
      let height = 600;

      // let height = {
      //   const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
      //   const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
      //   projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
      //   return dy;
      // }

      const path = d3.geoPath(projection, context);
      context.save();
      context.beginPath(), path(outline), context.clip(), context.fillStyle = "#fff", context.fillRect(0, 0, width, height);
      context.beginPath(), path(graticule), context.strokeStyle = "#ccc", context.stroke();
      context.beginPath(), path(countries), context.strokeStyle = "#000", context.stroke();
      context.restore();
      context.beginPath(), path(outline), context.strokeStyle = "#000", context.stroke();
    })
  })
</script>

<style>
  canvas {
    width: 960px;
    height: 600px;
  }
</style>

<canvas bind:this={canvas} width="1920" height="1200"></canvas>
