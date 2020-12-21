import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { dataPropType } from "../../PropTypes";
import { parseData, scaleData } from "../../utils";

const drawAxis = (axisRef, data, width, x, y, xDataType) => {
    const axisEl = d3.select(axisRef.current);

    const domain = d3.extent(data, (d) => parseData(d.x, xDataType));
    const scale = scaleData(xDataType)().domain(domain).range([0, width]);
    const a = d3.axisBottom().scale(scale);

    // Add ticks for each month
    a.ticks(d3.timeMonth, 1).tickFormat(d3.timeFormat("%b"));

    axisEl.attr("transform", `translate(${x}, ${y})`).call(a);
};

const XAxis = ({ data, width, height, x, y, xDataType }) => {
    const axisRef = useRef(null);

    useEffect(() => {
        if (data && axisRef.current) {
            drawAxis(axisRef, data, width, x, y, xDataType);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (data && axisRef.current) {
            drawAxis(axisRef, data, width, x, y, xDataType);
        }
    }, [width, data, height, x, y, xDataType]);

    return <g ref={axisRef} />;
};

XAxis.propTypes = {
    data: dataPropType.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    xDataType: PropTypes.string
};

XAxis.defaultProps = {
    xDataType: "number"
};

export default XAxis;
