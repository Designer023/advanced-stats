import { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { PlotContext } from "../../context";

const drawAxis = ({ axisRef, x, y, yScaler, dataType }) => {
    const axisEl = d3.select(axisRef.current);

    // eslint-disable-next-line no-cond-assign,no-empty
    if (dataType === "X") {
    }

    const scale = d3.axisLeft().scale(yScaler);

    axisEl.attr("transform", `translate(${x}, ${y})`).call(scale);
};

const YAxis = ({ x, y }) => {
    const axisRef = useRef(null);

    const {
        yAxis: { scale: yScaler, dataType, unitScale }
    } = useContext(PlotContext);

    useEffect(() => {
        if (yScaler && axisRef.current) {
            drawAxis({ axisRef, x, y, dataType, unitScale, yScaler });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (yScaler && axisRef.current) {
            drawAxis({ axisRef, x, y, dataType, unitScale, yScaler });
        }
    }, [x, y, dataType, yScaler, unitScale]);

    return <g ref={axisRef} />;
};

YAxis.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
};

YAxis.defaultProps = {};

export default YAxis;
