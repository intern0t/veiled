import React from "react";
import Sidebar from "../components/Sidebar";
import Brightbar from "../components/Brightbar";
import Frightbar from "../components/Frightbar";
import { AppProvider } from "../contexts/AppProvider";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const ApplicationRouter = () => {
    return (
        <BrowserRouter>
            <div className="main-container">
                <AppProvider>
                    <Sidebar />
                    <Brightbar />
                    <Switch>
                        <Route exact path="/" component={Frightbar} />
                        <Route path="/conversations" component={Frightbar} />
                        <Route path="/messages" component={Frightbar} />
                        <Route path="/archive" component={Frightbar} />
                        <Route path="/settings" component={Frightbar} />
                        <Route path="/bugs" component={Frightbar} />
                    </Switch>
                </AppProvider>
            </div>
        </BrowserRouter>
    );
};

export default ApplicationRouter;
