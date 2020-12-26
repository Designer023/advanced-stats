import { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { PlotContext } from "../../context";

const drawAxis = ({ axisRef, x, y, xScaler, dataType }) => {
    const axisEl = d3.select(axisRef.current);
    const scale = d3.axisBottom().scale(xScaler);

    // Add ticks for each month
    if (dataType === "date") {
        scale.ticks(d3.timeMonth, 1).tickFormat(d3.timeFormat("%b"));
    } else {
        const formatxAxis = d3.format(".0f");

        scale.tickFormat(formatxAxis).ticks(5);
    }

    axisEl.attr("transform", `translate(${x}, ${y})`).call(scale);
};

const XAxis = ({ x, y }) => {
    const axisRef = useRef(null);

    const {
        xAxis: { scale: xScaler, dataType }
    } = useContext(PlotContext);

    useEffect(() => {
        if (xScaler && axisRef.current) {
            drawAxis({ axisRef, x, y, xScaler, dataType });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (xScaler && axisRef.current) {
            drawAxis({ axisRef, x, y, xScaler, dataType });
        }
    }, [x, y, xScaler, dataType]);

    return <g ref={axisRef} />;
};

XAxis.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
};

XAxis.defaultProps = {};

export default XAxis;
