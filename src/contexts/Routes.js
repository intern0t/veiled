import React from "react";
import Sidebar from "../components/Sidebar";
import Brightbar from "../components/Brightbar";
import Frightbar from "../components/Frightbar";
import Conversation from "../components/pages/Conversation";
import Settings from "../components/pages/Settings";
import Bugs from "../components/pages/Bugs";
import Archive from "../components/pages/Archive";
import { AppProvider, AppConsumer } from "../contexts/AppProvider";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";

const ApplicationRouter = () => {
    return (
        <BrowserRouter>
            <AppProvider>
                <AppConsumer>
                    {({ onPageChange }) => {
                        return (
                            <div className="main-container">
                                <div className="main-container-wrapper">
                                    <Sidebar />
                                    <Brightbar />
                                    <Switch>
                                        <Route
                                            exact
                                            path="/"
                                            component={props => (
                                                <Frightbar {...props}>
                                                    <Conversation
                                                        page={"conversation"}
                                                        onPageChange={
                                                            onPageChange
                                                        }
                                                    />
                                                </Frightbar>
                                            )}
                                        />
                                        <Route
                                            path="/conversation"
                                            component={props => {
                                                return (
                                                    <Frightbar {...props}>
                                                        <Conversation
                                                            page={
                                                                "conversation"
                                                            }
                                                            onPageChange={
                                                                onPageChange
                                                            }
                                                        />
                                                    </Frightbar>
                                                );
                                            }}
                                        />
                                        {/* <Route path="/conversations" component={Frightbar} /> */}
                                        <Route
                                            path="/archive"
                                            component={props => (
                                                <Frightbar {...props}>
                                                    <Archive page={"archive"} />
                                                </Frightbar>
                                            )}
                                        />
                                        <Route
                                            path="/settings"
                                            component={props => {
                                                return (
                                                    <Frightbar {...props}>
                                                        <Settings
                                                            page={"Settings"}
                                                        />
                                                    </Frightbar>
                                                );
                                            }}
                                        />
                                        <Route
                                            path="/bugs"
                                            component={props => {
                                                return (
                                                    <Frightbar {...props}>
                                                        <Bugs page={"Bugs"} />
                                                    </Frightbar>
                                                );
                                            }}
                                        />
                                    </Switch>
                                </div>
                                <Footer />
                            </div>
                        );
                    }}
                </AppConsumer>
            </AppProvider>
        </BrowserRouter>
    );
};

export default ApplicationRouter;
