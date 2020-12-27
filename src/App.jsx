import { Route, Switch } from "react-router";
import { useSelector } from "react-redux";

import Nav from "./components/Nav";
import Token from "./components/Token";
import Loading from "./components/Loading";
import RunDetailsPage from "./pages/Run";
import AuthStatus from "./components/AuthStatus";
import HomePage from "./pages/Home";
// import RideDetailsPage from "./pages/Ride";
import EddingtionDetailsPage from "./pages/Eddington";
// import Banner from "./components/Banner";

function App() {
    const { isLoading } = useSelector((state) => state.app);

    return (
        <div className={`pb-20 relative ${isLoading ? "overflow-hidden h-screen" : ""}`}>
            <Loading />
            {/* <Banner /> */}
            <Nav />
            <div className="container mx-auto">
                <Switch>
                    <Route path="/token" exact component={Token} />

                    <Route path="/" exact component={HomePage} />

                    <Route path="/run" exact component={RunDetailsPage} />

                    <Route path="/ride" exact render={() => <RunDetailsPage type="ride" />} />
                    <Route path="/hike" exact render={() => <RunDetailsPage type="hike" />} />
                    <Route path="/walk" exact render={() => <RunDetailsPage type="walk" />} />

                    <Route path="/eddington" exact component={EddingtionDetailsPage} />
                </Switch>
            </div>

            <AuthStatus />
        </div>
    );
}

export default App;
