import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import merge from "lodash/merge";
import useWindowSize from "../../hooks/useWindowSize";

import BarChart from "./Charts/Bar";
import XAxis from "./Axis/XAxis";
import YAxis from "./Axis/YAxis";

import { dataPropType } from "./PropTypes";
import { useXSpec, useYSpec, useDimensions } from "./hooks";

import { PlotContext } from "./context";

const baseTheme = {
    color: "#ccc",
    colSpacing: 0.5
};

// eslint-disable-next-line react/prop-types
const Graph = ({ data, height, theme, min, max, xDataType, yDataType, chartComponent: ChartComponent, yUnitScale, xUnitScale }) => {
    const graphRef = useRef(null);
    const { width: winWidth } = useWindowSize();
    const [elWidth, setElWidth] = useState(100);

    const { plotWidth, plotHeight, plotX, plotY, hX, hY, vX, vY } = useDimensions({ height, elWidth });

    const mergedTheme = merge({}, baseTheme, theme);

    useEffect(() => {
        if (graphRef.current) {
            setElWidth(graphRef.current.offsetWidth);
        }
    }, [winWidth, data]);

    const [xDomain, xScaler] = useXSpec(data, xDataType, plotWidth, xUnitScale);
    const [yDomain, yScaler] = useYSpec(data, yDataType, plotHeight, min, max, yUnitScale);

    const graphState = {
        yAxis: {
            scale: yScaler,
            domain: yDomain,
            dataType: yDataType,
            unitScale: yUnitScale
        },
        xAxis: {
            scale: xScaler,
            domain: xDomain,
            dataType: xDataType,
            unitScale: xUnitScale
        }
    };

    return (
        <div ref={graphRef} style={{ width: "100%" }}>
            <PlotContext.Provider value={graphState}>
                <svg width={elWidth} height={200}>
                    <ChartComponent theme={mergedTheme} data={data} width={plotWidth} height={plotHeight} x={plotX} y={plotY} min={min} max={max} xDataType={xDataType} yDataType={yDataType} />
                    <XAxis x={hX} y={hY} />
                    <YAxis x={vX} y={vY} />
                </svg>
            </PlotContext.Provider>
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
    yDataType: PropTypes.string,
    yUnitScale: PropTypes.number,
    xUnitScale: PropTypes.number
};

Graph.defaultProps = {
    chartComponent: BarChart,
    theme: {},
    height: 200,
    min: 0,
    max: null,
    xDataType: "date",
    yDataType: "number",
    yUnitScale: 1,
    xUnitScale: 1
};

export default Graph;
