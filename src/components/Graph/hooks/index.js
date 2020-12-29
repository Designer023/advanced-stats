// eslint-disable-next-line import/prefer-default-export
import * as d3 from "d3";
import { maxValue, minValue, parseData, scaleData } from "../utils";
import * as DATA_TYPES from "../constants/dataTypes";

export const useDimensions = ({ height, elWidth }) => {
    const padding = 5;
    const vAxiswidth = 50;
    const xAxisHeight = 30;
    const vAxisHeight = height - padding * 2 - xAxisHeight;
    const xAxisWidth = elWidth - padding * 2 - vAxiswidth;
    const plotWidth = elWidth - padding * 2 - vAxiswidth;
    const plotHeight = height - padding * 2 - xAxisHeight;
    const plotX = padding + vAxiswidth;
    const plotY = padding;
    const vX = padding + vAxiswidth;
    const vY = padding;
    const hX = padding + vAxiswidth;
    const hY = padding + plotHeight;

    return {
        plotWidth,
        plotHeight,
        plotX,
        plotY,
        xAxisWidth,
        xAxisHeight,
        hX,
        hY,
        vAxiswidth,
        vAxisHeight,
        vX,
        vY
    };
};

export const useXSpec = (data, dataType, dimension, isBar = false) => {
    const xDomain = d3.extent(data, (d) => parseData(d.x, dataType));
    if (isBar && dataType === DATA_TYPES.NUMBER) {
        xDomain[1] += 1; // Extend bar dimensions by 1 to allow space for width of bar
    }
    const xScaler = scaleData(dataType)().domain(xDomain).range([0, dimension]);

    return [xDomain, xScaler];
};

export const useYSpec = (data, dataType, dimension, min, max, unitScale = 1, flip = true) => {
    const yDomain = [minValue(data, "y", min) * unitScale, maxValue(data, "y", max) * unitScale];
    const yScaler = scaleData(dataType)()
        .domain(yDomain)
        .range(flip ? [dimension, 0] : [0, dimension]); // flip axis

    return [yDomain, yScaler];
};
