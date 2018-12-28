import React, { Component } from "react";

const AppContext = React.createContext();

export class AppProvider extends Component {
    state = {
        userInformation: {
            user: {
                displayName: "Prashant Shrestha"
            }
        },
        displayInformation: {
            currentPage: "conversations",
            mailTabDisplayed: false
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

    render() {
        const { children } = this.props;
        const { displayInformation } = this.state;
        return (
            <AppContext.Provider
                value={{
                    currentPage: displayInformation.currentPage,
                    mailTabDisplayed: displayInformation.mailTabDisplayed,
                    toggleMailTab: this.toggleMailTab
                }}
            >
                {children}
            </AppContext.Provider>
        );
    }
}
export const AppConsumer = AppContext.Consumer;
