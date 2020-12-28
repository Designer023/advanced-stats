import { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { PlotContext } from "../../context";

const drawAxis = ({ axisRef, x, y, yScaler, dataType, label, length, depth }) => {
    const axisEl = d3.select(axisRef.current);

    // eslint-disable-next-line no-cond-assign,no-empty
    if (dataType === "X") {
    }

    const scale = d3.axisLeft().scale(yScaler);

    axisEl.selectAll(".axis-label").remove();

    axisEl.attr("transform", `translate(${x}, ${y})`).call(scale);

    if (label) {
        axisEl
            .append("text")
            .attr("class", "axis-label")
            // .attr("transform", "rotate(-90)")
            .attr("y", depth + 20)
            .attr("x", length / 2)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .attr("fill", "#AAA")
            .text(label);
    }
};

const YAxis = ({ x, y }) => {
    const axisRef = useRef(null);

    const {
        yAxis: { scale: yScaler, dataType, unitScale, label, length, depth }
    } = useContext(PlotContext);

    useEffect(() => {
        if (yScaler && axisRef.current) {
            drawAxis({ axisRef, x, y, dataType, unitScale, yScaler, label, length, depth });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (yScaler && axisRef.current) {
            drawAxis({ axisRef, x, y, dataType, unitScale, yScaler, label, length, depth });
        }
    }, [x, y, dataType, yScaler, unitScale, label, length, depth]);

    return <g ref={axisRef} />;
};

YAxis.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
};

YAxis.defaultProps = {};

export default YAxis;
