import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import Tip from "../Tip";
import Icon from "../Icon";
import Modal from "../Modal";
import Message from "../Message";
import UserAvatar from "../UserAvatar";
import { copyToClipboard } from "../../contexts/Library";
import { AppConsumer } from "../../contexts/AppProvider";
import { ConversationConsumer } from "../../contexts/ConversationProvider";

class Conversation extends Component {
    componentDidMount() {
        const { match } = this.props;
        const { activeRoomID, changeActiveRoom } = this.context;

        if (
            match &&
            match.params &&
            match.params.roomid &&
            match.params.roomid !== activeRoomID
        ) {
            changeActiveRoom(match.params.roomid || "r-general");
        }

        console.log(
            `Conversation window mounted with conversation for roomid: ${
                match.params.roomid
            }.`
        );
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps === this.props);
    }

    scrollToBottom = () => {
        let innerItem = document.getElementsByClassName("frightbar-inner")[0];
        if (innerItem) {
            innerItem.scrollTop = innerItem.scrollHeight;
        }
    };

    render() {
        let otherUser = "You";

        return (
            <AppConsumer>
                {stuff => {
                    return (
                        <ConversationConsumer>
                            {({
                                rooms,
                                message,
                                onSpeakBarChange,
                                onSpeakBarSpoken,
                                messages,
                                activeRoomID,
                                toggleConversationSettingsModal,
                                conversationSettingsModalDisplayed,
                                userInformation,
                                leaveRoom
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
                                                    onClick={copyToClipboard}
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
                                            _onChange={onSpeakBarChange}
                                            _onSpeak={onSpeakBarSpoken}
                                            message={message}
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
                                                me={
                                                    userInformation &&
                                                    userInformation.user &&
                                                    userInformation.user
                                                        .displayName
                                                        ? userInformation.user
                                                              .displayName
                                                        : otherUser
                                                }
                                                roomNote={() =>
                                                    theRoom[0]
                                                        ? theRoom[0].note
                                                        : "Unknown Room Note"
                                                }
                                                leaveRoom={() =>
                                                    leaveRoom(theRoom[0].rid)
                                                }
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

const SpeakBar = ({ _onChange, _onSpeak, message }) => {
    return (
        <div className="speakbar">
            <input
                onChange={_onChange}
                onKeyDown={e => {
                    _onSpeak(e);
                }}
                type="text"
                placeholder="Type your message here .."
                value={message}
            />
            <ul>
                <li>
                    <a href="/">
                        <Icon icon="fas fa-paperclip" />
                    </a>
                </li>
                <li>
                    <a href="/">
                        <Icon icon="fas fa-file-image" />
                    </a>
                </li>
            </ul>
        </div>
    );
};

const ConversationSettings = ({ me, close, rid, roomNote, leaveRoom }) => {
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
                            defaultValue={me ? me : "You"}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="change-note">Note</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="change-note"
                            className="text-input"
                            placeholder="Edit/Enter note to identify this conversation/room."
                            defaultValue={roomNote}
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
                    <button className="button warn" onClick={leaveRoom}>
                        Leave Conversation
                    </button>
                    <button className="button inform">Update</button>
                </div>
            </form>
        </div>
    );
};

Conversation.contextType = ConversationConsumer;
export default Conversation;
