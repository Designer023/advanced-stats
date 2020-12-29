/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import merge from "lodash/merge";
import useWindowSize from "../../hooks/useWindowSize";

import XAxis from "./Axis/XAxis";
import YAxis from "./Axis/YAxis";
import Legend from "./Legend";
import { useXSpec, useYSpec, useDimensions } from "./hooks";

import { PlotContext } from "./context";

import { dataPropType } from "./PropTypes";
import * as DATA_TYPES from "./constants/dataTypes";

const baseTheme = {
    color: "#ccc",
    colSpacing: 0.5
};

// eslint-disable-next-line react/prop-types
const Graph = ({ plotData, height, min, max, xDataType, yDataType, theme, yUnitScale, xUnitScale, xLabel, yLabel }) => {
    const graphRef = useRef(null);
    const { width: winWidth } = useWindowSize();
    const [elWidth, setElWidth] = useState(100);

    const { plotWidth, plotHeight, plotX, plotY, hX, hY, vX, vY } = useDimensions({ height, elWidth });

    const combinedData = [];
    plotData.forEach((chart) => {
        combinedData.push(...chart.data);
    });

    const [xDomain, xScaler] = useXSpec(combinedData, xDataType, plotWidth, xUnitScale);
    const [yDomain, yScaler] = useYSpec(combinedData, yDataType, plotHeight, min, max, yUnitScale);

    useEffect(() => {
        if (graphRef.current) {
            setElWidth(graphRef.current.offsetWidth);
        }
    }, [winWidth, plotData]);

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
                <svg width={elWidth} height={height}>
                    <Legend data={plotData.map((item) => [item.label, item.theme.color])} />
                    {plotData.map((item) => {
                        const { chartComponent: ChartComponent, data, theme: plotTheme, label } = item;
                        const mergedChartTheme = merge({}, baseTheme, plotTheme);

                        return (
                            <ChartComponent key={label} theme={mergedChartTheme} data={data} width={plotWidth} height={plotHeight} x={plotX} y={plotY} min={min} max={max} xDataType={xDataType} yDataType={yDataType} yScaler={yScaler} xScaler={xScaler} />
                        );
                    })}

                    <XAxis x={hX} y={hY} />
                    <YAxis x={vX} y={vY} />
                </svg>
            </PlotContext.Provider>
        </div>
    );
};

Graph.propTypes = {
    // chartComponent: PropTypes.elementType,
    plotData: PropTypes.arrayOf(
        PropTypes.shape({
            data: dataPropType.isRequired,
            chartComponent: PropTypes.elementType.isRequired,
            theme: PropTypes.shape({
                color: PropTypes.string
            })
        })
    ).isRequired,
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
    // chartComponent: BarChart,
    height: 200,
    min: 0,
    max: null,
    xDataType: DATA_TYPES.DATE,
    yDataType: DATA_TYPES.NUMBER,
    theme: {},
    yUnitScale: 1,
    xUnitScale: 1,
    xLabel: null,
    yLabel: null
};

export default Graph;
