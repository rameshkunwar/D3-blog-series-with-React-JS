import { useEffect, useState } from "react";
import * as d3 from "d3";
import { useWindowResizeHooks } from "./WindowResizeHook";

const SimpleMap = ({ mapGeoJsonData, placeholderRef }) => {
  const [dimension, setDimension] = useState({ height: 0, width: 0 });
  const { width, height } = useWindowResizeHooks(placeholderRef);

  useEffect(() => {
    setDimension({ height: height, width: width });
  }, [width, height]);

  useEffect(() => {
    if (dimension.height !== 0 && dimension.width !== 0) {
      drawMap();
    }
  }, [dimension]);

  const drawMap = () => {
    const { width, height } = dimension;
    const minWidth = d3.min([width, height / 0.8]);

    //projection
    const projection = d3
      .geoMercator()
      .fitSize([minWidth, height], mapGeoJsonData);

    //path
    const path = d3.geoPath(projection);

    //svg element
    const svg = d3.select("#svg");

    //remove previously drawn svg so that it does not gets appended in next rendering
    svg.selectAll("*").remove();

    //g element
    const g = svg.append("g");

    //draw the map
    g.selectAll("path")
      .append("g")
      .data(mapGeoJsonData.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "gray")
      .attr("stroke", "white")
      .attr("stroke-width", "0.2");
  };

  return <svg id='svg' width={dimension.width} height={dimension.height}></svg>;
};
export default SimpleMap;
