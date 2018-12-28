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
            currentPage: "",
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

    render() {
        const { children } = this.props;
        return (
            <AppContext.Provider
                value={{
                    mailTabDisplayed: this.state.displayInformation
                        .mailTabDisplayed,
                    toggleMailTab: this.toggleMailTab
                }}
            >
                {children}
            </AppContext.Provider>
        );
    }
}
export const AppConsumer = AppContext.Consumer;
