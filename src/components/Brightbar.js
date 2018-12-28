import React from "react";
import { AppConsumer } from "../contexts/AppProvider";

const Brightbar = () => {
    return (
        <AppConsumer>
            {({ mailTabDisplayed }) => (
                <div
                    className="brightbar"
                    style={{ display: mailTabDisplayed ? "block" : "none" }}
                >
                    2
                </div>
            )}
        </AppConsumer>
    );
    // return <div className="brightbar">2</div>;
};

export default Brightbar;
