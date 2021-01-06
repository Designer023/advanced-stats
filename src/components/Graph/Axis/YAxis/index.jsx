import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

// eslint-disable-next-line no-unused-vars
const drawAxis = ({ axisRef, x, y, yScaler, dataType, label, length, depth, alt }) => {
    const axisEl = d3.select(axisRef.current);

    let scale;

    let offset = 0; // Bump the axis off the plot area
    if (!alt) {
        scale = d3.axisLeft();
        offset = -1;
    } else {
        scale = d3.axisRight();
        offset = 1;
    }

    scale.scale(yScaler);

    axisEl.selectAll(".axis-label").remove();

    axisEl.attr("transform", `translate(${x + offset}, ${y})`).call(scale);

    if (label) {
        axisEl
            .append("text")
            .attr("class", "axis-label")
            .attr("y", depth + 20)
            .attr("x", length / 2)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .attr("fill", "#AAA")
            .text(label);
    }
};

// eslint-disable-next-line react/prop-types
const YAxis = ({ x, y, yScaler, dataType, unitScale, label, length, depth, alt }) => {
    const axisRef = useRef(null);

    useEffect(() => {
        if (yScaler && axisRef.current) {
            drawAxis({ axisRef, x, y, dataType, unitScale, yScaler, label, length, depth, alt });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (yScaler && axisRef.current) {
            drawAxis({ axisRef, x, y, dataType, unitScale, yScaler, label, length, depth, alt });
        }
    }, [x, y, dataType, yScaler, unitScale, label, length, depth, alt]);

    return <g ref={axisRef} />;
};

YAxis.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    alt: PropTypes.bool
};

YAxis.defaultProps = {
    alt: false
};

export default YAxis;
