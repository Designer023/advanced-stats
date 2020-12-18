import * as d3 from "d3";

export const maxValue = (data, max = null) => max || Math.ceil(d3.max(data, (d) => d.value));
export const minValue = (data, min = 0) => {
    if (min === 0) return 0;

    if (min !== 0 && min) {
        return min;
    }
    return Math.floor(d3.min(data, (d) => d.value));
};
