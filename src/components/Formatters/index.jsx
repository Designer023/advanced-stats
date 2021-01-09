const round = (num) => {
    return Math.round(num * 100 + Number.EPSILON) / 100;
};

// eslint-disable-next-line react/prop-types
const KM = ({ meters }) => {
    return <>{round(meters / 1000)}</>;
};

// eslint-disable-next-line react/prop-types
const Meters = ({ meters }) => {
    return <>{round(meters)}</>;
};

// eslint-disable-next-line react/prop-types
const Minutes = ({ seconds }) => {
    return <>{round(seconds / 60)}</>;
};

// eslint-disable-next-line react/prop-types
const Round = ({ value }) => {
    return <>{round(value / 1000)}</>;
};

// eslint-disable-next-line import/prefer-default-export
export { KM, Round, Minutes, Meters, round };
