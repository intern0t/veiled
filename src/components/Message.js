import React from "react";
import moment from "moment";
import UserAvatar from "./UserAvatar";

const Message = ({ me, timestamp, message, from }) => {
    const yourMessages = me === from;
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
                            yourMessages ? "message-from" : "message-you"
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
