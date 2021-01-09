import { Route, Switch } from "react-router";
import { useSelector } from "react-redux";

import Nav from "./components/Nav";
import Loading from "./components/Loading";
import AuthStatus from "./components/AuthStatus";

import Token from "./pages/Token";
import ActivityDetails from "./pages/ActivityDetails";
import HomePage from "./pages/Home";
import EddingtionDetailsPage from "./pages/Eddington";

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

                    <Route path="/run" exact component={ActivityDetails} type="run" title="Run" />
                    <Route path="/ride" exact render={() => <ActivityDetails type="ride" title="Cycle" />} />
                    <Route path="/hike" exact render={() => <ActivityDetails type="hike" title="Hike" />} />
                    <Route path="/walk" exact render={() => <ActivityDetails type="walk" title="Walk" />} />

                    <Route path="/eddington" exact component={EddingtionDetailsPage} />
                </Switch>
            </div>

            <AuthStatus />
        </div>
    );
}

export default App;
