import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import merge from "lodash/merge";
import useWindowSize from "../../hooks/useWindowSize";

import BarChart from "./Charts/Bar";
import XAxis from "./Axis/XAxis";
import YAxis from "./Axis/YAxis";

import { dataPropType } from "./PropTypes";
import { useDimensions } from "./hooks";

const baseTheme = {
    color: "#ccc",
    colSpacing: 0.5
};

// eslint-disable-next-line react/prop-types
const Graph = ({ data, height, theme, min, max, xDataType, yDataType, chartComponent: ChartComponent }) => {
    const graphRef = useRef(null);
    const { width: winWidth } = useWindowSize();
    const [elWidth, setElWidth] = useState(100);

    const { plotWidth, plotHeight, plotX, plotY, xAxisWidth, xAxisHeight, hX, hY, vAxiswidth, vAxisHeight, vX, vY } = useDimensions({ height, elWidth });

    const mergedTheme = merge({}, baseTheme, theme);

    useEffect(() => {
        if (graphRef.current) {
            setElWidth(graphRef.current.offsetWidth);
        }
    }, [winWidth, data]);

    return (
        <div ref={graphRef} style={{ width: "100%" }}>
            <svg width={elWidth} height={200}>
                <ChartComponent theme={mergedTheme} data={data} width={plotWidth} height={plotHeight} x={plotX} y={plotY} min={min} max={max} xDataType={xDataType} yDataType={yDataType} />
                <XAxis width={xAxisWidth} height={xAxisHeight} x={hX} y={hY} data={data} theme={mergedTheme} xDataType={xDataType} />
                <YAxis width={vAxiswidth} height={vAxisHeight} x={vX} y={vY} data={data} min={min} max={max} theme={mergedTheme} yDataType={yDataType} />
            </svg>
        </div>
    );
};

Graph.propTypes = {
    chartComponent: PropTypes.elementType,
    data: dataPropType.isRequired,
    theme: PropTypes.shape({
        color: PropTypes.string
    }),
    height: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    xDataType: PropTypes.string,
    yDataType: PropTypes.string
};

Graph.defaultProps = {
    chartComponent: BarChart,
    theme: {},
    height: 200,
    min: 0,
    max: null,
    xDataType: "date",
    yDataType: "number"
};

export default Graph;
