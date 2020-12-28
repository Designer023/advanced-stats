import PropTypes from "prop-types";

const dataTypes = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

// eslint-disable-next-line import/prefer-default-export
export const dataPropType = PropTypes.arrayOf(
    PropTypes.shape({
        y: dataTypes,
        x: dataTypes,
        z: dataTypes
    })
);
