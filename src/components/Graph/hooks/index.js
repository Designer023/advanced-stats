// eslint-disable-next-line import/prefer-default-export
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
