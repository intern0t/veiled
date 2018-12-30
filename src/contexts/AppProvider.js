import React, { Component } from "react";

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
        }
    };

    toggleMailTab = e => {
        e.preventDefault();

        this.setState(state => ({
            ...state,
            displayInformation: {
                ...state.displayInformation,
                mailTabDisplayed: !state.displayInformation.mailTabDisplayed
            }
        }));
    };

    toggleConversationSettingsModal = e => {
        e.preventDefault();
        this.setState(prevState => ({
            ...prevState,
            displayInformation: {
                ...prevState.displayInformation,
                conversationSettingsModalDisplayed: !prevState
                    .displayInformation.conversationSettingsModalDisplayed
            }
        }));
    };

    toggleNewConversationModal = e => {
        e.preventDefault();
        this.setState(prevState => ({
            ...prevState,
            displayInformation: {
                ...prevState.displayInformation,
                newConversationModalDisplayed: !prevState.displayInformation
                    .newConversationModalDisplayed
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

    render() {
        const { children } = this.props;
        const { userInformation, displayInformation } = this.state;
        return (
            <AppContext.Provider
                value={{
                    currentPage: displayInformation.currentPage,
                    mailTabDisplayed: displayInformation.mailTabDisplayed,
                    userInformation: userInformation.user,
                    conSettingsModalDisplayed:
                        displayInformation.conversationSettingsModalDisplayed,
                    newConModalDisplayed:
                        displayInformation.newConversationModalDisplayed,
                    toggleMailTab: this.toggleMailTab,
                    onPageChange: this.onPageChange,
                    toggleConSettingsModal: this
                        .toggleConversationSettingsModal,
                    toggleNewConModal: this.toggleNewConversationModal
                }}
            >
                {children}
            </AppContext.Provider>
        );
    }
}
export const AppConsumer = AppContext.Consumer;
