import React from "react";
import Sidebar from "../components/Sidebar";
import Brightbar from "../components/Brightbar";
import MainPage from "../components/pages/MainPage";
import Conversation from "../components/pages/Conversation";
import Settings from "../components/pages/Settings";
import { AppProvider } from "../contexts/AppProvider";
import { ConversationProvider } from "../contexts/ConversationProvider";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import PageWrapper from "../components/pages/PageWrapper";
import SocketWrapper from "../containers/SocketWrapper";
import Contact from "../components/pages/Contact";

const ApplicationRouter = () => {
    return (
        <AppProvider>
            <ConversationProvider>
                <div className="main-container">
                    <div className="main-container-wrapper">
                        <Sidebar />
                        <Brightbar />
                        <SocketWrapper>
                            <Switch>
                                <Route
                                    path="/veiled/:roomid"
                                    component={props => {
                                        return <Conversation {...props} />;
                                    }}
                                />
                                <Route
                                    exact
                                    path="/settings"
                                    component={props => (
                                        <PageWrapper {...props}>
                                            <Settings {...props} />
                                        </PageWrapper>
                                    )}
                                />
                                <Route
                                    exact
                                    path="/contact"
                                    component={props => (
                                        <PageWrapper {...props}>
                                            <Contact {...props} />
                                        </PageWrapper>
                                    )}
                                />
                                <Route
                                    exact
                                    path="/"
                                    component={props => (
                                        <PageWrapper {...props}>
                                            <MainPage />
                                        </PageWrapper>
                                    )}
                                />
                            </Switch>
                        </SocketWrapper>
                    </div>
                    <Footer />
                </div>
            </ConversationProvider>
        </AppProvider>
    );
};

export default ApplicationRouter;
