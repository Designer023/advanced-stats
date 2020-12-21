import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { dataPropType } from "../../PropTypes";
import { minValue, maxValue, scaleData } from "../../utils";

const drawAxis = (axisRef, data, height, x, y, min, max, yDataType, unitScale = 1, yScaler = null) => {
    const axisEl = d3.select(axisRef.current);

    const hScaleAxis = scaleData(yDataType)()
        .domain([minValue(data, "y", min) * unitScale, maxValue(data, "y", max) * unitScale])
        .range([height, 0]); // flip axis

    const yAxis = d3.axisLeft().scale(yScaler || hScaleAxis);

    axisEl.attr("transform", `translate(${x}, ${y})`).call(yAxis);
};

const YAxis = ({ data, width, height, x, y, min, max, yDataType, yScaler }) => {
    const axisRef = useRef(null);

    useEffect(() => {
        if (data && axisRef.current) {
            drawAxis(axisRef, data, height, x, y, min, max, yDataType, 0.001, yScaler);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (data && axisRef.current) {
            drawAxis(axisRef, data, height, x, y, min, max, yDataType, 0.001, yScaler);
        }
    }, [width, data, height, x, y, max, min, yDataType, yScaler]);

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
    yDataType: PropTypes.string,
    yScaler: PropTypes.func
};

YAxis.defaultProps = {
    min: 0,
    max: null,
    yDataType: "number",
    yScaler: null
};

export default YAxis;
