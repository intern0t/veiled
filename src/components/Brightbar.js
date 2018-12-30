import React, { Component } from "react";
import UserAvatar from "./UserAvatar";
import Icon from "./Icon";
import Modal from "./Modal";
import { generateRandomColorCode } from "../contexts/Library";
import { AppConsumer } from "../contexts/AppProvider";
import TipCounter from "./TipCounter";

class Brightbar extends Component {
    render() {
        const testConversation = {
            from: "Anonymous",
            lastMessage:
                "Finish up with the design so we can implement socket.io",
            newMessages: 14
        };

        return (
            <AppConsumer>
                {({
                    mailTabDisplayed,
                    toggleNewConModal,
                    newConModalDisplayed
                }) => (
                    <div
                        className="brightbar"
                        style={{
                            display:
                                mailTabDisplayed && mailTabDisplayed === true
                                    ? "block"
                                    : "none"
                        }}
                    >
                        <ConversationSearch toggle={toggleNewConModal} />
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
                        </ul>

                        <Modal
                            style={{
                                display: newConModalDisplayed ? "flex" : "none"
                            }}
                        >
                            <AddNewConversation close={toggleNewConModal} />
                        </Modal>
                    </div>
                )}
            </AppConsumer>
        );
    }
}

const ConversationSearch = ({ toggle }) => {
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
                onClick={toggle}
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

const AddNewConversation = ({ close }) => {
    return (
        <div
            className="modal-container"
            onClick={e => {
                return false;
            }}
        >
            <div>
                <Icon icon="fas fa-plus" color={"#F36060"} />{" "}
                <span>
                    Adding or creating a new conversation room is simple.
                </span>
            </div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                }}
            >
                <div>
                    <div>
                        <label htmlFor="private-key">Room ID</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="private-key"
                            className="text-input"
                            placeholder="Generated Room ID for your room."
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="private-key">Private Key</label>
                    </div>
                    <div>
                        <input
                            type="password"
                            className="text-input"
                            name="private-key"
                            placeholder="Used to encrypt and decrypt messages."
                        />
                    </div>
                </div>
                <div className="buttons-wrapper">
                    <button className="button" onClick={close}>
                        Close
                    </button>
                    <button className="button inform">Update</button>
                </div>
            </form>
        </div>
    );
};

export default Brightbar;
