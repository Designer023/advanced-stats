import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { dataPropType } from "../../PropTypes";
import { minValue, maxValue } from "../../utils";

const drawAxis = (axisRef, data, height, x, y, min, max, log) => {
    const axisEl = d3.select(axisRef.current);

    const yScale = log ? d3.scaleSymlog : d3.scaleLinear;

    const hScaleAxis = yScale()
        .domain([minValue(data, min) / 1000, maxValue(data, max) / 1000]) // convert to KM!
        .range([height, 0]); // flip axis

    const yAxis = d3.axisLeft().scale(hScaleAxis);

    axisEl.attr("transform", `translate(${x}, ${y})`).call(yAxis);
};

const YAxis = ({ data, width, height, x, y, min, max, log }) => {
    const axisRef = useRef(null);

    useEffect(() => {
        if (data && axisRef.current) {
            drawAxis(axisRef, data, height, x, y, min, max, log);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (data && axisRef.current) {
            drawAxis(axisRef, data, height, x, y, min, max, log);
        }
    }, [width, data, height, x, y, max, min, log]);

    return <g ref={axisRef} />;
};

YAxis.propTypes = {
    data: dataPropType.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    log: PropTypes.bool
};

YAxis.defaultProps = {
    min: 0,
    max: null,
    log: false
};

export default YAxis;
