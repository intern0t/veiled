import React from "react";

const Message = ({ type, timestamp, message, from }) => {
    return (
        <div className="message-entry">
            <span className="from">{from}</span>
            <span className="message">{message}</span>
            <span className="timestamp">{timestamp}</span>
        </div>
    );
};

export default Message;
