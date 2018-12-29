import React, { Component } from "react";
import { AppConsumer } from "../../contexts/AppProvider";

class Archive extends Component {
    render() {
        return (
            <AppConsumer>
                {({ userInformation }) => {
                    return (
                        <div className="frightbar">
                            This will be the Archive page.
                        </div>
                    );
                }}
            </AppConsumer>
        );
    }
}

export default Archive;
