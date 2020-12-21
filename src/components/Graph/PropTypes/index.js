import PropTypes from "prop-types";

// eslint-disable-next-line import/prefer-default-export
export const dataPropType = PropTypes.arrayOf(
    PropTypes.shape({
        y: PropTypes.number.isRequired,
        x: PropTypes.string.isRequired
    })
);
