/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import get from "lodash/get";
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
const Graph = ({ plotData, height, min, max, xDataType, yDataType, theme, yUnitScale, xUnitScale, xLabel, yLabel, axis }) => {
    const graphRef = useRef(null);
    const { width: winWidth } = useWindowSize();
    const [elWidth, setElWidth] = useState(100);

    const { plotWidth, plotHeight, plotX, plotY, hX, hY, vX, vY, y2x } = useDimensions({ height, elWidth });

    const combinedData = [];
    const combinedDataAltAxis = [];

    const Y2Axis = plotData.reduce((p, c) => (p === true ? true : c.y2Axis === true), false);

    plotData.forEach((chart) => {
        if (Y2Axis) {
            if (chart.y2Axis) {
                combinedDataAltAxis.push(...chart.data);
            } else {
                combinedData.push(...chart.data);
            }
        } else {
            combinedData.push(...chart.data);
        }
    });

    console.log(axis);
    const yAxisUnitScale = get(axis, "y.unitScale", yUnitScale);
    const y2AxisUnitScale = get(axis, "y2.unitScale", yUnitScale);
    console.log(yAxisUnitScale, y2AxisUnitScale);

    const [xDomain, xScaler] = useXSpec(combinedData, xDataType, plotWidth, xUnitScale);
    // const [yPlotDomain, yPlotScaler] = useYSpec(combinedDataAltAxis, yDataType, plotHeight, min, max, yUnitScale);

    const [yDomain, yScaler] = useYSpec(combinedData, yDataType, plotHeight, min, max, yAxisUnitScale);
    const [y2Domain, y2Scaler] = useYSpec(combinedDataAltAxis, yDataType, plotHeight, min, max, y2AxisUnitScale);

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
        y2Axis: {
            scale: y2Scaler,
            domain: y2Domain,
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
                    {plotData.map((item, index) => {
                        const { chartComponent: ChartComponent, data, theme: plotTheme, label } = item;
                        const mergedChartTheme = merge({}, baseTheme, plotTheme);

                        const domain = item.y2Axis ? y2Domain : yDomain; // yPlotDomain; //
                        const scaler = item.y2Axis ? y2Scaler : yScaler; // yPlotScaler; //
                        const unitScale = item.y2Axis ? y2AxisUnitScale : yAxisUnitScale; // yPlotScaler; //

                        return (
                            <ChartComponent
                                key={label}
                                index={index}
                                theme={mergedChartTheme}
                                data={data}
                                width={plotWidth}
                                height={plotHeight}
                                x={plotX}
                                y={plotY}
                                min={min}
                                max={max}
                                xDataType={xDataType}
                                yDataType={yDataType}
                                yScaler={scaler}
                                xScaler={xScaler}
                                // eslint-disable-next-line react/prop-types
                                yUnitScale={unitScale}
                                yDomain={domain}
                                xUnitScale={xUnitScale}
                            />
                        );
                    })}

                    <XAxis x={hX} y={hY} />
                    <YAxis x={vX} y={vY} yScaler={yScaler} dataType={yDataType} unitScale={yAxisUnitScale} label={yLabel} length={plotWidth} depth={plotHeight} />

                    {Y2Axis ? <YAxis x={y2x} y={vY} alt yScaler={y2Scaler} dataType={yDataType} unitScale={y2AxisUnitScale} label={yLabel} length={plotWidth} depth={plotHeight} /> : null}

                    <Legend data={plotData.map((item) => [item.label, item.theme.color])} />
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
    yLabel: PropTypes.string,
    axis: PropTypes.shape({})
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
    yLabel: null,
    axis: {}
};

export default Graph;
