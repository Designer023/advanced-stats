import * as d3 from "d3";

export const maxValue = (data, key, max = null) => max || Math.ceil(d3.max(data, (d) => d[key]));
export const minValue = (data, key, min = 0) => {
    if (min === 0) return 0;

    if (min !== 0 && min) {
        return min;
    }
    return Math.floor(d3.min(data, (d) => d[key]));
};

export const parseData = (value, type) => {
    switch (type) {
        case "date":
            return d3.isoParse(value);
        case "number":
        default:
            // Number needs no special parsing
            return value;
    }
};

export const scaleData = (type) => {
    switch (type) {
        case "date":
            return d3.scaleTime;
        case "log":
            return d3.scaleSymlog;
        case "number":
        default:
            return d3.scaleLinear;
    }
};
