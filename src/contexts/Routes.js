import React from "react";
import Sidebar from "../components/Sidebar";
import Brightbar from "../components/Brightbar";
import Frightbar from "../components/Frightbar";
import { AppProvider } from "../contexts/AppProvider";
import { BrowserRouter as Switch, Route } from "react-router-dom";

const ApplicationRouter = () => {
    return (
        <Switch>
            <Route
                exact
                path="/"
                component={props => <Wrapper {...props} />}
            />
        </Switch>
    );
};

const Wrapper = () => {
    return (
        <div className="main-container">
            <AppProvider>
                <Sidebar />
                <Brightbar />
                <Frightbar />
            </AppProvider>
        </div>
    );
};

export default ApplicationRouter;
