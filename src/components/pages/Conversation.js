import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import Tip from "../Tip";
import Icon from "../Icon";
import Modal from "../Modal";
import Message from "../Message";
import UserAvatar from "../UserAvatar";
import Clipboard from "react-clipboard.js";
import { ConversationConsumer } from "../../contexts/ConversationProvider";

class Conversation extends Component {
    state = {
        message: "",
        conversationSettingsModalDisplayed: false,
        notificationAvailable: false,
        notificationMessage: ""
    };

    componentDidMount() {
        const { match } = this.props;
        const { changeActiveRoom } = this.context;

        if (match && match.params && match.params.roomid) {
            changeActiveRoom(match.params.roomid || "r-general");
        }

        console.log(
            `Conversation window mounted with conversation for roomid: ${
                match.params.roomid
            }.`
        );
    }

    componentDidUpdate(prevProps) {
        const { match } = this.props;
        const { activeRoomID, changeActiveRoom } = this.context;

        if (
            prevProps.match.params.roomid &&
            this.props.match.params.roomid &&
            activeRoomID &&
            prevProps.match.params.roomid !== activeRoomID
        ) {
            changeActiveRoom(match.params.roomid || "r-general");
        }

        const conversationWindow = document.getElementById(
            "conversation-window"
        );
        conversationWindow.scrollTop = conversationWindow.scrollHeight;
    }

    toggleConversationSettingsModal = () => {
        this.setState(prevState => ({
            ...prevState,
            conversationSettingsModalDisplayed: !this.state
                .conversationSettingsModalDisplayed
        }));
    };

    onSpeakBarChange = e => {
        let appendedMessage = e.target.value || "";
        this.setState(prevState => ({
            ...prevState,
            message: appendedMessage
        }));
    };

    onSpeakBarSpoken = e => {
        const { message } = this.state;
        const {
            activeRoomID,
            nickname,
            addNewMessage,
            onSendMessage
        } = this.context;
        if (e.key === "Enter") {
            if (message && message.length > 0) {
                let newMessageEntry = {
                    date: Math.floor(Date.now() / 1000),
                    message: message,
                    nickname: nickname || "You",
                    roomid: activeRoomID
                };

                addNewMessage(newMessageEntry);
                onSendMessage(newMessageEntry);
                this.setState(prevState => ({
                    ...prevState,
                    message: ""
                }));
            }
        }
    };

    render() {
        let otherUser = "Anonymous";
        return (
            <ConversationConsumer>
                {({ rooms, messages, activeRoomID, nickname, leaveRoom }) => {
                    let theRoom = rooms.filter(
                        room => room.rid === activeRoomID
                    );
                    return (
                        <div className="frightbar">
                            <Notification
                                notificationAvailable={
                                    this.state.notificationAvailable
                                }
                                notificationMessage={
                                    this.state.notificationMessage
                                }
                            />
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
                                    <Clipboard
                                        component="a"
                                        button-href="#"
                                        onClick={e => e.preventDefault()}
                                        data-clipboard-text={
                                            window.location.href
                                        }
                                        style={{ color: "rgba(54,62,71,0.7)" }}
                                    >
                                        <Icon
                                            icon={"far fa-clipboard"}
                                            title="Share conversation"
                                            style={{
                                                cursor: "pointer",
                                                marginRight: "5px"
                                            }}
                                        />
                                    </Clipboard>

                                    <Icon
                                        icon={"fas fa-cog"}
                                        title={"Conversation Settings"}
                                        onClick={
                                            this.toggleConversationSettingsModal
                                        }
                                        style={{
                                            cursor: "pointer"
                                        }}
                                    />
                                </div>
                            </div>
                            <div
                                className="frightbar-inner"
                                id="conversation-window"
                            >
                                {messages
                                    .filter(
                                        messageEntry =>
                                            messageEntry.roomid === activeRoomID
                                    )
                                    .map(messageEntry => {
                                        return (
                                            <Message
                                                key={uuidv4()}
                                                me={nickname}
                                                from={
                                                    messageEntry &&
                                                    messageEntry.nickname
                                                        ? messageEntry.nickname
                                                        : "Anonymous"
                                                }
                                                timestamp={messageEntry.date}
                                                message={messageEntry.message}
                                            />
                                        );
                                    })}
                            </div>
                            <SpeakBar
                                _onChange={this.onSpeakBarChange}
                                _onSpeak={this.onSpeakBarSpoken}
                                message={this.state.message}
                            />

                            {this.state.conversationSettingsModalDisplayed ? (
                                <Modal>
                                    <ConversationSettings
                                        close={
                                            this.toggleConversationSettingsModal
                                        }
                                        nickname={nickname}
                                        currentRoom={theRoom[0]}
                                    />
                                </Modal>
                            ) : null}
                        </div>
                    );
                }}
            </ConversationConsumer>
        );
    }
}

const SpeakBar = ({ _onChange, _onSpeak, message }) => {
    return (
        <div className="speakbar">
            <input
                onChange={_onChange}
                onKeyDown={_onSpeak}
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

const ConversationSettings = ({ nickname, currentRoom, close, leaveRoom }) => {
    return (
        <div className="modal-container">
            <div>
                <Icon icon="fas fa-exclamation" color={"#F36060"} />
                <span>
                    You are updating or editing settings for Conversation ID -
                    <b>
                        {currentRoom && currentRoom.rid
                            ? currentRoom.rid
                            : "Anonymous"}
                    </b>
                    .
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
                            defaultValue={nickname}
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
                            defaultValue={
                                currentRoom && currentRoom.note
                                    ? currentRoom.note
                                    : ""
                            }
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
                    <button type="button" className="button" onClick={close}>
                        Close
                    </button>
                    <button
                        type="button"
                        className="button warn"
                        onClick={leaveRoom}
                    >
                        Leave Conversation
                    </button>
                    <button type="button" className="button inform">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

const Notification = ({ notificationAvailable, notificationMessage }) => {
    return (
        <div className="frightbar-notification">
            <div className="frightbar-notification-message-container">
                <Icon
                    icon="far fa-bell"
                    color={`${notificationAvailable ? "#F36060" : "#99a8b4"}`}
                />
                <span className="notification-message">
                    {notificationMessage
                        ? notificationMessage
                        : "Seems like you are all caught up!"}
                </span>
                <div className="notification-controls">
                    <Icon
                        icon="fas fa-check"
                        color={`${
                            notificationAvailable ? "#F36060" : "#99a8b4"
                        }`}
                        title="Mark all notifications as read."
                    />
                </div>
            </div>
        </div>
    );
};

Conversation.contextType = ConversationConsumer;
export default Conversation;
