import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import Tip from "../Tip";
import Icon from "../Icon";
import Modal from "../Modal";
import Message from "../Message";
import SpeakBar from "../SpeakBar";
import UserAvatar from "../UserAvatar";
import { AppConsumer } from "../../contexts/AppProvider";
import { ConversationConsumer } from "../../contexts/ConversationProvider";

class Conversation extends Component {
    state = {
        currentRoom: {
            message: ""
        }
    };

    componentDidMount() {
        const { match } = this.props;
        const { changeActiveRoom } = this.context;
        if (match && match.params && match.params.roomid) {
            changeActiveRoom(match.params.roomid || "r-general");
        }
    }

    onSpeakBarType = e => {
        let appendedMessage = e.target.value || "";
        this.setState(prevState => ({
            ...prevState,
            currentRoom: {
                ...prevState.currentRoom,
                message: appendedMessage
            }
        }));
    };

    onSpeak = e => {
        const { currentRoom } = this.state;
        const { activeRoomID, addNewMessage, userInformation } = this.context;
        if (e.key === "Enter") {
            let newMessageEntry = {
                date: Math.floor(Date.now() / 1000),
                message: currentRoom.message,
                sender: userInformation.user.displayName
                    ? userInformation.user.displayName
                    : "Anonymous",
                roomid: activeRoomID
            };

            addNewMessage(newMessageEntry);

            this.setState(prevState => ({
                ...prevState,
                currentRoom: {
                    ...prevState.currentRoom,
                    message: ""
                }
            }));
        }
    };

    render() {
        let otherUser = "Empty User";

        return (
            <AppConsumer>
                {stuff => {
                    return (
                        <ConversationConsumer>
                            {({
                                rooms,
                                messages,
                                activeRoomID,
                                toggleConversationSettingsModal,
                                conversationSettingsModalDisplayed,
                                userInformation
                            }) => {
                                let theRoom = rooms.filter(
                                    room => room.rid === activeRoomID
                                );

                                return (
                                    <div className="frightbar">
                                        <div className="frightbar-top">
                                            <div>
                                                <UserAvatar
                                                    username={
                                                        theRoom &&
                                                        theRoom.length > 0 &&
                                                        theRoom[0].note
                                                            ? theRoom[0].note
                                                            : otherUser
                                                    }
                                                />
                                                {theRoom &&
                                                theRoom.length > 0 &&
                                                theRoom[0].note
                                                    ? `${theRoom[0].note} `
                                                    : otherUser}
                                                <Tip
                                                    updated={true}
                                                    color="#82D455"
                                                    title={"Online"}
                                                />
                                            </div>
                                            <div>
                                                <Icon
                                                    icon={"fas fa-link"}
                                                    title="Share conversation"
                                                    style={{
                                                        cursor: "pointer"
                                                    }}
                                                />

                                                <Icon
                                                    icon={"fas fa-cog"}
                                                    title={
                                                        "Conversation Settings"
                                                    }
                                                    onClick={e =>
                                                        toggleConversationSettingsModal(
                                                            e
                                                        )
                                                    }
                                                    style={{
                                                        cursor: "pointer"
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="frightbar-inner">
                                            {messages
                                                .filter(
                                                    messageEntry =>
                                                        messageEntry.roomid ===
                                                        activeRoomID
                                                )
                                                .map(messageEntry => {
                                                    return (
                                                        <Message
                                                            key={uuidv4()}
                                                            me={
                                                                userInformation &&
                                                                userInformation.user &&
                                                                userInformation
                                                                    .user
                                                                    .displayName
                                                                    ? userInformation
                                                                          .user
                                                                          .displayName
                                                                    : otherUser
                                                            }
                                                            from={
                                                                messageEntry &&
                                                                messageEntry.sender
                                                                    ? messageEntry.sender
                                                                    : "Anonymous"
                                                            }
                                                            timestamp={
                                                                messageEntry.date
                                                            }
                                                            message={
                                                                messageEntry.message
                                                            }
                                                        />
                                                    );
                                                })}
                                        </div>
                                        <SpeakBar
                                            _onChange={this.onSpeakBarType}
                                            _onSpeak={this.onSpeak}
                                            message={
                                                this.state.currentRoom.message
                                            }
                                        />
                                        <Modal
                                            style={{
                                                display:
                                                    conversationSettingsModalDisplayed &&
                                                    conversationSettingsModalDisplayed ===
                                                        true
                                                        ? "flex"
                                                        : "none"
                                            }}
                                        >
                                            <ConversationSettings
                                                close={
                                                    toggleConversationSettingsModal
                                                }
                                                rid={activeRoomID}
                                            />
                                        </Modal>
                                    </div>
                                );
                            }}
                        </ConversationConsumer>
                    );
                }}
            </AppConsumer>
        );
    }
}

const ConversationSettings = ({ close, rid }) => {
    return (
        <div
            className="modal-container"
            onClick={e => {
                return false;
            }}
        >
            <div>
                <Icon icon="fas fa-exclamation" color={"#F36060"} />
                <span>
                    You are updating or editing settings for Conversation ID -
                    <b>{rid || "Anonymous"}</b>.
                </span>
            </div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                }}
            >
                <div>
                    <div>
                        <label htmlFor="private-key">Display Name</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="private-key"
                            className="text-input"
                            placeholder="Display name for this conversation."
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
                    <button className="button quest">Leave Conversation</button>
                    <button className="button inform">Update</button>
                </div>
            </form>
        </div>
    );
};

Conversation.contextType = ConversationConsumer;
export default Conversation;
