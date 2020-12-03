import { Route, Switch } from "react-router";

import Nav from "./components/Nav";
import Token from "./components/Token";
import Loading from "./components/Loading";
import RunDetailsPage from "./pages/Run";
import HomePage from "./pages/Home";
import RideDetailsPage from "./pages/Ride";

function App() {
    return (
        <div className="App">
            <Loading />
            <Nav />
            <div className="container mx-auto">
                <Switch>
                    <Route path="/token" exact component={Token} />

                    <Route path="/" exact component={HomePage} />

                    <Route path="/run" exact component={RunDetailsPage} />
                    <Route path="/ride" exact component={RideDetailsPage} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
