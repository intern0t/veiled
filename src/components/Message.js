import React from "react";
import moment from "moment";
import UserAvatar from "./UserAvatar";
import Linkify from "linkifyjs/react";

const Message = ({ me, timestamp, message, from }) => {
    const yourMessages = me === from;

    return (
        <div className="message-entry">
            <div
                style={{ flexDirection: yourMessages ? "row-reverse" : "row" }}
            >
                <span className="from">
                    <UserAvatar
                        username={from}
                        title={yourMessages ? `You (${from})` : from}
                    />
                </span>
                <div className="message-wrapper">
                    <span
                        className={`message ${
                            yourMessages ? "message-you" : "message-from"
                        }`}
                    >
                        <Linkify
                            options={{
                                attributes: {
                                    target: {
                                        url: "_blank"
                                    }
                                }
                            }}
                        >
                            {message}
                        </Linkify>
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
