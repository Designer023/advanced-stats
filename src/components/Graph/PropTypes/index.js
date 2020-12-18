import PropTypes from "prop-types";

// eslint-disable-next-line import/prefer-default-export
export const dataPropType = PropTypes.arrayOf(
    PropTypes.shape({
        value: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired
    })
);
