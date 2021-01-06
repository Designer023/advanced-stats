// eslint-disable-next-line react/prop-types
const TabContent = ({ value, state, children }) => <>{value === state ? <>{children}</> : null}</>;

export default TabContent;
