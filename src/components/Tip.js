import React from "react";

const Tip = ({ updated, color }) => {
    return (
        <span
            className="tip"
            style={{
                display: updated && updated ? "block" : "none",
                background: color && color ? color : "red"
            }}
        />
    );
};

export default Tip;
