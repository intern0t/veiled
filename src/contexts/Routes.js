import React from "react";
import Sidebar from "../components/Sidebar";
import Brightbar from "../components/Brightbar";
import Conversation from "../components/pages/Conversation";
import Settings from "../components/pages/Settings";
import Bugs from "../components/pages/Bugs";
import Archive from "../components/pages/Archive";
import { AppProvider } from "../contexts/AppProvider";
import {
    ConversationProvider,
    ConversationConsumer
} from "../contexts/ConversationProvider";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import PageWrapper from "../components/pages/PageWrapper";

const ApplicationRouter = () => {
    return (
        <BrowserRouter>
            <AppProvider>
                <ConversationProvider>
                    <div className="main-container">
                        <div className="main-container-wrapper">
                            <Sidebar />
                            <Brightbar />
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    component={props => (
                                        <PageWrapper {...props}>
                                            <Conversation />
                                        </PageWrapper>
                                    )}
                                />
                                <Route
                                    path="/veiled/:roomid"
                                    component={props => {
                                        return (
                                            <ConversationConsumer>
                                                {({ activeRoomID }) => {
                                                    return (
                                                        <Conversation
                                                            {...props}
                                                            activeRoomID={
                                                                activeRoomID
                                                            }
                                                        />
                                                    );
                                                }}
                                            </ConversationConsumer>
                                        );
                                    }}
                                />
                                <Route
                                    exact
                                    path="/conversation"
                                    component={props => (
                                        <PageWrapper {...props}>
                                            <Conversation />
                                        </PageWrapper>
                                    )}
                                />
                                {/* <Route path="/conversations" component={Frightbar} /> */}
                                <Route
                                    exact
                                    path="/archive"
                                    component={props => (
                                        <PageWrapper {...props}>
                                            <Archive {...props} />
                                        </PageWrapper>
                                    )}
                                />
                                <Route
                                    exact
                                    path="/settings"
                                    component={props => {
                                        return (
                                            <PageWrapper {...props}>
                                                <Settings {...props} />
                                            </PageWrapper>
                                        );
                                    }}
                                />
                                <Route
                                    exact
                                    path="/bugs"
                                    component={props => {
                                        return (
                                            <PageWrapper {...props}>
                                                <Bugs {...props} />
                                            </PageWrapper>
                                        );
                                    }}
                                />
                            </Switch>
                            {/* <Frightbar>
                                
                            </Frightbar> */}
                        </div>
                        <Footer />
                    </div>
                </ConversationProvider>
            </AppProvider>
        </BrowserRouter>
    );
};

export default ApplicationRouter;
