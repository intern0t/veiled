import React, { Component } from "react";
import { AppConsumer } from "../../contexts/AppProvider";

class Settings extends Component {
    render() {
        return (
            <AppConsumer>
                {({ userInformation }) => {
                    return (
                        <div className="frightbar">
                            This will be the settings page.
                        </div>
                    );
                }}
            </AppConsumer>
        );
    }
}

export default Settings;
