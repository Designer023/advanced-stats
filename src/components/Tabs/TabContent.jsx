import PropTypes from "prop-types";

const TabContent = ({ value, state, children }) => <>{value === state ? <>{children}</> : null}</>;

TabContent.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    state: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    children: PropTypes.node.isRequired
};

export default TabContent;
