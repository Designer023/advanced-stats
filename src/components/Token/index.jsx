import queryString from "query-string";
import { push } from "connected-react-router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startAuththentication } from "../../redux/actions";

const InitialLoad = () => {
    const location = useSelector((state) => state.router.location);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(location);
        const locationParams = queryString.parse(location.search);

        const { code } = locationParams;

        console.log(code);

        if (!auth.isAuthenticated) {
            dispatch(startAuththentication(code));
            console.log("start auth", code);
        } else {
            // Push back to home page
            dispatch(push("/"));
            console.log("Already authed");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
};

export default InitialLoad;
