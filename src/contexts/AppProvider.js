import React, { Component } from "react";
import { generateRoomID } from "./Library";

const AppContext = React.createContext();

export class AppProvider extends Component {
    state = {
        userInformation: {
            user: {
                displayName: "Synonymous"
            }
        },
        displayInformation: {
            currentPage: "/conversation",
            mailTabDisplayed: true,
            conversationSettingsModalDisplayed: false,
            newConversationModalDisplayed: false
        },
        conversationInformation: {
            rooms: [
                {
                    rid: "r-f0d6c1a6",
                    note: "Dustin",
                    key: "test"
                },
                {
                    rid: "r-9f0205ea",
                    note: "Edwin",
                    key: "test"
                },
                {
                    rid: "r-3a236848",
                    note: "Sam",
                    key: "test"
                },
                {
                    rid: "r-d8715dee",
                    note: "Kevin",
                    key: "test"
                }
            ],
            messages: [],
            message: "",
            generatedRoomID: generateRoomID(),
            activeRoomID: null
        }
    };

    toggleMailTab = e => {
        e.preventDefault();

        this.setState(prevState => ({
            ...prevState,
            displayInformation: {
                ...prevState.displayInformation,
                mailTabDisplayed: !prevState.displayInformation.mailTabDisplayed
            }
        }));
    };

    onPageChange = page => {
        this.setState(prevState => ({
            ...prevState,
            displayInformation: {
                ...prevState.displayInformation,
                currentPage: page
            }
        }));
    };

    changeActiveRoom = roomid => {
        this.setState(prevState => ({
            ...prevState,
            conversationInformation: {
                ...prevState.conversationInformation,
                activeRoomID: roomid
            }
        }));
    };

    addNewMessage = newMessageEntry => {
        this.setState(prevState => ({
            ...prevState,
            conversationInformation: {
                ...prevState.conversationInformation,
                messages: [
                    ...prevState.conversationInformation.messages,
                    newMessageEntry
                ]
            }
        }));
    };

    render() {
        const { children } = this.props;
        const {
            userInformation,
            displayInformation,
            conversationInformation
        } = this.state;
        return (
            <AppContext.Provider
                value={{
                    currentPage: displayInformation.currentPage,
                    mailTabDisplayed: displayInformation.mailTabDisplayed,
                    userInformation: userInformation.user,
                    toggleMailTab: this.toggleMailTab,
                    onPageChange: this.onPageChange,
                }}
            >
                {children}
            </AppContext.Provider>
        );
    }
}

export const AppConsumer = AppContext.Consumer;
