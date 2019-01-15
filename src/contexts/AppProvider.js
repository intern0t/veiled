import React, { Component } from "react";

const AppContext = React.createContext();

export class AppProvider extends Component {
    state = {
        displayInformation: {
            currentPage: "/conversation",
            mailTabDisplayed: true,
            conversationSettingsModalDisplayed: false,
            newConversationModalDisplayed: false,
            settingsModalDisplayed: false
        }
    };

    toggleSettingsModal = () => {
        this.setState(prevState => ({
            ...prevState,
            displayInformation: {
                ...prevState.displayInformation,
                settingsModalDisplayed: !prevState.displayInformation
                    .settingsModalDisplayed
            }
        }));
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

    render() {
        const { children } = this.props;
        const { displayInformation } = this.state;
        return (
            <AppContext.Provider
                value={{
                    currentPage: displayInformation.currentPage,
                    mailTabDisplayed: displayInformation.mailTabDisplayed,
                    toggleMailTab: this.toggleMailTab,
                    onPageChange: this.onPageChange,
                    settingsModalDisplayed:
                        displayInformation.settingsModalDisplayed,
                    toggleSettingsModal: this.toggleSettingsModal
                }}
            >
                {children}
            </AppContext.Provider>
        );
    }
}

export const AppConsumer = AppContext.Consumer;
