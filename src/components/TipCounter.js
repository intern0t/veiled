import React from "react";

const TipCounter = ({ color, newMessages }) => {
    return (
        <div
            className="tip-counter"
            style={{
                background: "#F36060",
                display: newMessages ? "block" : "none"
            }}
        >
            {newMessages && newMessages > 10 ? "10+" : newMessages}
        </div>
    );
};

export default TipCounter;
