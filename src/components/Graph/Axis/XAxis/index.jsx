import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { dataPropType } from "../../PropTypes";

const drawAxis = (axisRef, data, width, x, y) => {
    const axisEl = d3.select(axisRef.current);

    const domain = d3.extent(data, (d) => d3.isoParse(d.date));
    const scale = d3.scaleTime().domain(domain).range([0, width]);
    const a = d3.axisBottom().scale(scale);

    // Add ticks for each month
    a.ticks(d3.timeMonth, 1).tickFormat(d3.timeFormat("%b"));

    axisEl.attr("transform", `translate(${x}, ${y})`).call(a);
};

const XAxis = ({ data, width, height, x, y }) => {
    const axisRef = useRef(null);

    useEffect(() => {
        if (data && axisRef.current) {
            drawAxis(axisRef, data, width, x, y);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (data && axisRef.current) {
            drawAxis(axisRef, data, width, x, y);
        }
    }, [width, data, height, x, y]);

    return <g ref={axisRef} />;
};

XAxis.propTypes = {
    data: dataPropType.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
};

export default XAxis;
