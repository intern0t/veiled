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

    onPageChange = page => {
        let parsedPage = page.toLowerCase();
        // console.log(page, parsedPage);
        this.setState(state => ({
            ...state,
            ...{
                displayInformation: {
                    currentPage: parsedPage
                }
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
