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

import * as DATA_TYPES from "./constants/dataTypes";

const baseTheme = {
    color: "#ccc",
    colSpacing: 0.5
};

// eslint-disable-next-line react/prop-types
const Graph = ({ plotData, height, theme, min, max, xDataType, yDataType, chartComponent: ChartComponent, yUnitScale, xUnitScale, xLabel, yLabel }) => {
    const graphRef = useRef(null);
    const { width: winWidth } = useWindowSize();
    const [elWidth, setElWidth] = useState(100);

    const { plotWidth, plotHeight, plotX, plotY, hX, hY, vX, vY } = useDimensions({ height, elWidth });

    const mergedTheme = merge({}, baseTheme, theme);

    useEffect(() => {
        if (graphRef.current) {
            setElWidth(graphRef.current.offsetWidth);
        }
    }, [winWidth, plotData]);

    const isBar = true;

    console.log(plotData);
    const [xDomain, xScaler] = useXSpec(plotData, xDataType, plotWidth, xUnitScale, isBar);
    const [yDomain, yScaler] = useYSpec(plotData, yDataType, plotHeight, min, max, yUnitScale);

    const graphState = {
        yAxis: {
            scale: yScaler,
            domain: yDomain,
            dataType: yDataType,
            unitScale: yUnitScale,
            length: plotWidth,
            depth: plotHeight,
            label: yLabel
        },
        xAxis: {
            scale: xScaler,
            domain: xDomain,
            dataType: xDataType,
            unitScale: xUnitScale,
            length: plotHeight,
            depth: plotWidth,
            label: xLabel
        }
    };

    return (
        <div ref={graphRef} style={{ width: "100%" }}>
            <PlotContext.Provider value={graphState}>
                <svg width={elWidth} height={200}>
                    <ChartComponent theme={mergedTheme} data={plotData} width={plotWidth} height={plotHeight} x={plotX} y={plotY} min={min} max={max} xDataType={xDataType} yDataType={yDataType} />
                    <XAxis x={hX} y={hY} />
                    <YAxis x={vX} y={vY} />
                </svg>
            </PlotContext.Provider>
        </div>
    );
};

Graph.propTypes = {
    chartComponent: PropTypes.elementType,
    plotData: dataPropType.isRequired,
    theme: PropTypes.shape({
        color: PropTypes.string
    }),
    height: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    xDataType: PropTypes.string,
    yDataType: PropTypes.string,
    yUnitScale: PropTypes.number,
    xUnitScale: PropTypes.number,
    xLabel: PropTypes.string,
    yLabel: PropTypes.string
};

Graph.defaultProps = {
    chartComponent: BarChart,
    theme: {},
    height: 200,
    min: 0,
    max: null,
    xDataType: DATA_TYPES.DATE,
    yDataType: DATA_TYPES.NUMBER,
    yUnitScale: 1,
    xUnitScale: 1,
    xLabel: null,
    yLabel: null
};

export default Graph;
