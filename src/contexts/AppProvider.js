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
            mailTabDisplayed: true
        }
    };

    toggleMailTab = e => {
        e.preventDefault();
        const { displayInformation } = this.state;
        this.setState(state => ({
            ...state,
            ...{
                displayInformation: {
                    mailTabDisplayed: !displayInformation.mailTabDisplayed
                }
            }
        }));
    };

    onPageChange = page => {
        let newStateUpdate = {
            displayInformation: {
                currentPage: page
            }
        };
        let currentState = Object.assign({}, this.state, newStateUpdate);
        this.setState(currentState);
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
                    toggleMailTab: this.toggleMailTab,
                    onPageChange: this.onPageChange
                }}
            >
                {children}
            </AppContext.Provider>
        );
    }
}
export const AppConsumer = AppContext.Consumer;
