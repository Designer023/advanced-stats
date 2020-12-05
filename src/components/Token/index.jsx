import queryString from "query-string";
import { push } from "connected-react-router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { validateStravaToken } from "../../sagas/actions/auth";

const InitialLoad = () => {
    const location = useSelector((state) => state.router.location);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const locationParams = queryString.parse(location.search);

        const { code } = locationParams;
        if (!auth.isAuthenticated) {
            dispatch(validateStravaToken(code));
        } else {
            // Push back to home page
            dispatch(push("/"));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
};

export default InitialLoad;
