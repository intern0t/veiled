import React from "react";
import moment from "moment";
import UserAvatar from "./UserAvatar";

const Message = ({ type, timestamp, message, from }) => {
    const yourMessages = type === from;
    return (
        <div className="message-entry">
            <div
                style={{ flexDirection: yourMessages ? "row-reverse" : "row" }}
            >
                <span className="from">
                    <UserAvatar username={from} />
                </span>
                <div className="message-wrapper">
                    <span
                        className={`message ${
                            yourMessages ? "message-you" : "message-from"
                        }`}
                        style={{
                            marginLeft: yourMessages ? "50px" : "0",
                            marginRight: !yourMessages ? "30px" : "0"
                        }}
                    >
                        {message}
                    </span>
                    <span
                        className="timestamp"
                        style={{
                            marginLeft: yourMessages ? "auto" : "0"
                        }}
                    >
                        {moment.unix(timestamp).fromNow()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Message;
