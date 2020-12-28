/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState, createContext } from "react";
import PropTypes from "prop-types";
import merge from "lodash/merge";
import * as d3 from "d3";
import useWindowSize from "../../hooks/useWindowSize";

// import BarChart from "./Charts/Bar";
import XAxis from "./Axis/XAxis";
import YAxis from "./Axis/YAxis";
import Legend from "./Legend";
import { useXSpec, useYSpec, useDimensions } from "./hooks";

import { PlotContext } from "./context";

import { dataPropType } from "./PropTypes";
import { maxValue, minValue, parseData, scaleData } from "./utils";

const baseTheme = {
    color: "#ccc",
    colSpacing: 0.5
};

// eslint-disable-next-line react/prop-types
const MultiPlot = ({ data, height, min, max, xDataType, yDataType, theme, yUnitScale, xUnitScale, xLabel, yLabel }) => {
    const graphRef = useRef(null);
    const { width: winWidth } = useWindowSize();
    const [elWidth, setElWidth] = useState(100);

    const { plotWidth, plotHeight, plotX, plotY, hX, hY, vX, vY } = useDimensions({ height, elWidth });

    const combinedData = [];
    data.forEach((chart) => {
        combinedData.push(...chart.data);
    });

    const [xDomain, xScaler] = useXSpec(combinedData, xDataType, plotWidth, xUnitScale);
    const [yDomain, yScaler] = useYSpec(combinedData, yDataType, plotHeight, min, max, yUnitScale);

    useEffect(() => {
        if (graphRef.current) {
            setElWidth(graphRef.current.offsetWidth);
        }
    }, [winWidth, data]);

    // const mergedTheme = merge({}, baseTheme, theme);

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
                    <Legend data={data.map((item) => [item.label, item.theme.color])} />
                    {data.map((item) => {
                        const { chartComponent: ChartComponent, data: plotData, theme: plotTheme, label } = item;
                        const mergedChartTheme = merge({}, baseTheme, plotTheme);

                        return (
                            <ChartComponent
                                key={label}
                                theme={mergedChartTheme}
                                data={plotData}
                                width={plotWidth}
                                height={plotHeight}
                                x={plotX}
                                y={plotY}
                                min={min}
                                max={max}
                                xDataType={xDataType}
                                yDataType={yDataType}
                                yScaler={yScaler}
                                xScaler={xScaler}
                            />
                        );
                    })}

                    <XAxis x={hX} y={hY} />
                    <YAxis x={vX} y={vY} />
                </svg>
            </PlotContext.Provider>
        </div>
    );
};

MultiPlot.propTypes = {
    // chartComponent: PropTypes.elementType,
    data: PropTypes.arrayOf(
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

MultiPlot.defaultProps = {
    // chartComponent: BarChart,
    height: 200,
    min: 0,
    max: null,
    xDataType: "date",
    yDataType: "number",
    theme: {},
    yUnitScale: 1,
    xUnitScale: 1,
    xLabel: null,
    yLabel: null
};

export default MultiPlot;
