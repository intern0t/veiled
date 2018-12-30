import React from "react";
import UserAvatar from "./UserAvatar";
import Icon from "./Icon";
import { generateRandomColorCode } from "../contexts/Library";
import { AppConsumer } from "../contexts/AppProvider";
import TipCounter from "./TipCounter";

const Brightbar = () => {
    const testConversation = {
        from: "Anonymous",
        lastMessage: "Finish up with the design so we can implement socket.io",
        newMessages: 14
    };

    return (
        <AppConsumer>
            {({ mailTabDisplayed }) => (
                <div
                    className="brightbar"
                    style={{ display: mailTabDisplayed ? "block" : "none" }}
                >
                    <ConversationSearch />
                    <ul className="brightbar-conversations">
                        <li>
                            <ConversationEntry
                                conversation={testConversation}
                            />
                        </li>
                        <li>
                            <ConversationEntry
                                conversation={testConversation}
                            />
                        </li>
                        <li>
                            <ConversationEntry
                                conversation={testConversation}
                            />
                        </li>
                        <li>
                            <ConversationEntry
                                conversation={testConversation}
                            />
                        </li>
                        <li>
                            <ConversationEntry
                                conversation={testConversation}
                            />
                        </li>
                        <li>
                            <ConversationEntry
                                conversation={testConversation}
                            />
                        </li>
                    </ul>
                </div>
            )}
        </AppConsumer>
    );
};

const ConversationSearch = () => {
    return (
        <div className="brightbar-search">
            <input
                type="text"
                className="text-input"
                placeholder="Search Conversations"
            />
            <Icon
                icon={"fas fa-plus-square"}
                color={"#99a8b4"}
                title={"Add or join a secure room."}
            />
        </div>
    );
};

const ConversationEntry = ({ conversation }) => {
    let colorCode = generateRandomColorCode();
    return (
        <div className="brightbar-conversations-entry">
            <UserAvatar username={conversation.from} />
            <div className="brightbar-conversations-entry-message">
                <h1>{conversation.from}</h1>
                <p>{conversation.lastMessage}</p>
            </div>
            <TipCounter
                color={colorCode}
                newMessages={conversation.newMessages}
            />
        </div>
    );
};

export default Brightbar;
