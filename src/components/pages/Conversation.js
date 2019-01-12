import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import Tip from "../Tip";
import Icon from "../Icon";
import Modal from "../Modal";
import Message from "../Message";
import Clipboard from "react-clipboard.js";
import { ConversationConsumer } from "../../contexts/ConversationProvider";
import { Link } from "react-router-dom";
import aes from "crypto-js/aes";

class Conversation extends Component {
    state = {
        message: "",
        keyIsVisible: false,
        joinRoomPromptVisible: false,
        conversationSettingsModalDisplayed: false,
        newRoomInfo: {
            roomid: "",
            nickname: "",
            note: "",
            key: ""
        }
    };

    componentDidMount() {
        const { match } = this.props;
        const { changeActiveRoom } = this.context;

        if (match && match.params && match.params.roomid) {
            let lsRooms = JSON.parse(localStorage.getItem("rooms")) || [];
            let roomExists = [...lsRooms].find(
                room => room.rid === match.params.roomid
            );

            if (!roomExists) {
                // Apparently user hasn't joined the room yet.
                // Ask if the room should be added to the rooms' list.
                this.setState(prevState => ({
                    ...prevState,
                    joinRoomPromptVisible: !prevState.joinRoomPromptVisible,
                    newRoomInfo: {
                        ...prevState.newRoomInfo,
                        roomid: match.params.roomid
                    }
                }));
            } else {
                // Room exists, simply change the room!
                changeActiveRoom(match.params.roomid || "r-general");
            }
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
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        const conversationWindow = document.getElementById(
            "conversation-window"
        );
        conversationWindow.scrollTop = conversationWindow.scrollHeight;
    };

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
        const { rooms, activeRoomID, nickname, onSendMessage } = this.context;
        if (e.key === "Enter") {
            if (message && message.length > 0) {
                let currentRoom = rooms.filter(
                    room => room.rid === activeRoomID
                )[0];
                let cipherText = aes.encrypt(message, currentRoom.key);

                let newMessageEntry = {
                    date: Math.floor(Date.now() / 1000),
                    message: cipherText.toString(),
                    nickname: nickname ? nickname : "You",
                    roomid: activeRoomID
                };
                onSendMessage(newMessageEntry);
                this.setState(prevState => ({
                    ...prevState,
                    message: ""
                }));
            }
        }
        this.scrollToBottom();
    };

    onKeyVisibilityHandle = e => {
        this.setState(prevState => ({
            ...prevState,
            keyIsVisible: !prevState.keyIsVisible
        }));
    };

    onJoinNicknameChange = e => {
        let nick = e.target.value || "";
        this.setState(prevState => ({
            ...prevState,
            newRoomInfo: {
                ...prevState.newRoomInfo,
                nickname: nick
            }
        }));
    };

    onJoinNoteChange = e => {
        let note = e.target.value || "";
        this.setState(prevState => ({
            ...prevState,
            newRoomInfo: {
                ...prevState.newRoomInfo,
                note
            }
        }));
    };

    onJoinKeyChange = e => {
        let newKey = e.target.value || "";
        this.setState(prevState => ({
            ...prevState,
            newRoomInfo: {
                ...prevState.newRoomInfo,
                key: newKey
            }
        }));
    };

    onJoinModalToggle = () => {
        this.setState(prevState => ({
            ...prevState,
            joinRoomPromptVisible: !prevState.joinRoomPromptVisible
        }));
    };

    onJoinModalSubmit = e => {
        e.preventDefault();

        const { newRoomInfo } = this.state;
        const { addNewRoom } = this.context;

        console.log(newRoomInfo);
        if (
            newRoomInfo.note &&
            newRoomInfo.key &&
            newRoomInfo.roomid &&
            newRoomInfo.note.length > 0 &&
            newRoomInfo.key.length > 0
        ) {
            let newRoom = {
                note: newRoomInfo.note,
                key: newRoomInfo.key,
                rid: newRoomInfo.roomid
            };
            console.log(newRoom);
            addNewRoom(newRoom);
            this.setState(
                prevState => ({
                    ...prevState,
                    newRoomInfo: {
                        ...prevState.newRoomInfo,
                        note: "",
                        key: "",
                        roomid: "",
                        nickname: ""
                    }
                }),
                () => {
                    this.onJoinModalToggle();
                }
            );
        }
    };

    render() {
        let otherUser = "Anonymous";
        return (
            <ConversationConsumer>
                {({
                    rooms,
                    messages,
                    activeRoomID,
                    nickname,
                    leaveRoom,
                    setNickname,
                    setKey,
                    veil
                }) => {
                    let theRoom = rooms.filter(
                        room => room.rid === activeRoomID
                    );

                    return (
                        <div className="frightbar">
                            <Notification
                                rooms={rooms}
                                messages={messages}
                                nickname={nickname}
                                activeRoomID={activeRoomID}
                            />
                            <div className="frightbar-top">
                                <div>
                                    <Icon
                                        icon="fas fa-landmark"
                                        style={{ fontSize: "16px" }}
                                        title={
                                            theRoom &&
                                            theRoom.length > 0 &&
                                            theRoom[0].note
                                                ? theRoom[0].note
                                                : "Untitled room."
                                        }
                                    />
                                    {theRoom &&
                                    theRoom.length > 0 &&
                                    theRoom[0].note
                                        ? `${theRoom[0].note} `
                                        : otherUser}
                                    <Tip
                                        updated={true}
                                        color={
                                            veil.connected
                                                ? "#82D455"
                                                : "#FF4E00"
                                        }
                                        title={"Online"}
                                    />
                                    <span style={{ fontSize: "11px" }}>
                                        <Icon
                                            icon="far fa-user"
                                            title="Total Users in this room."
                                            style={{
                                                cursor: "pointer",
                                                margin: "0 10px"
                                            }}
                                        />
                                        {theRoom[0] && theRoom[0].users
                                            ? theRoom[0].users
                                            : "∞"}
                                    </span>
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
                                        setNickname={setNickname}
                                        setKey={setKey}
                                        keyIsVisible={this.state.keyIsVisible}
                                        onKeyVisibilityHandle={
                                            this.onKeyVisibilityHandle
                                        }
                                    />
                                </Modal>
                            ) : null}

                            {this.state.joinRoomPromptVisible ? (
                                <Modal>
                                    <PromptJoin
                                        close={this.onJoinModalToggle}
                                        currentKey={this.state.newRoomInfo.key}
                                        currentNote={
                                            this.state.newRoomInfo.note
                                        }
                                        nickname={nickname}
                                        onJoinKeyChange={this.onJoinKeyChange}
                                        onJoinNicknameChange={
                                            this.onJoinNicknameChange
                                        }
                                        onJoinNoteChange={this.onJoinNoteChange}
                                        keyIsVisible={this.state.keyIsVisible}
                                        onKeyVisibilityHandle={
                                            this.onKeyVisibilityHandle
                                        }
                                        newRoomID={
                                            this.state.newRoomInfo.roomid
                                        }
                                        joinRoomEvent={this.onJoinModalSubmit}
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

const ConversationSettings = ({
    nickname,
    currentRoom,
    close,
    leaveRoom,
    setNickname,
    setKey,
    keyIsVisible,
    onKeyVisibilityHandle
}) => {
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
                        <label htmlFor="display-name">Display Name</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="display-name"
                            className="text-input"
                            placeholder="Display name for this conversation."
                            defaultValue={nickname}
                            onKeyDown={e => {
                                return e && e.key === "Enter"
                                    ? setNickname(e.target.value)
                                    : null;
                            }}
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
                            type={`${keyIsVisible ? "text" : "password"}`}
                            className="text-input"
                            name="private-key"
                            placeholder="Used to encrypt and decrypt messages."
                            onKeyDown={e => {
                                return e && e.key === "Enter"
                                    ? setKey(e.target.value)
                                    : null;
                            }}
                            defaultValue={
                                currentRoom && currentRoom.key
                                    ? currentRoom.key
                                    : ""
                            }
                        />
                        <Icon
                            icon={`fas fa-eye${keyIsVisible ? "-slash" : ""}`}
                            onClick={onKeyVisibilityHandle}
                            style={{
                                cursor: "pointer",
                                margin: "0 10px",
                                color: "#0092FF"
                            }}
                            title={`Click to ${
                                keyIsVisible ? "hide" : "reveal"
                            } your key.`}
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

const Notification = ({ rooms, messages, nickname }) => {
    let latestMessage = [...messages]
        .filter(message => message.nickname !== nickname)
        .sort((a, b) => b.date - a.date);
    let isValidNewMessage =
        latestMessage &&
        latestMessage.length > 0 &&
        latestMessage[0] &&
        typeof latestMessage[0] === "object";
    let notedRoom = null;

    if (latestMessage[0] && typeof latestMessage[0] === "object") {
        notedRoom = [...rooms].find(
            room => room.rid === latestMessage[0].roomid
        );
    }

    return (
        <div className="frightbar-notification">
            <div className="frightbar-notification-message-container">
                <Icon
                    icon="far fa-bell"
                    color={`${isValidNewMessage ? "#F36060" : "#99a8b4"}`}
                />
                <span className="notification-message">
                    {isValidNewMessage ? (
                        <div>
                            {
                                <span>
                                    {<i>{`"${latestMessage[0].message}"`}</i>}
                                    {` - by `}
                                    <b>{latestMessage[0].nickname}</b>
                                    {` in room `}
                                    <Link
                                        to={`/veiled/${
                                            latestMessage[0].roomid
                                        }`}
                                    >
                                        <u>{`${
                                            notedRoom && notedRoom.note
                                                ? notedRoom.note
                                                : "Untitled Room"
                                        } [${latestMessage[0].roomid}]`}</u>
                                    </Link>
                                </span>
                            }
                        </div>
                    ) : (
                        "Seems like you are all caught up!"
                    )}
                </span>
            </div>
        </div>
    );
};

const PromptJoin = ({
    close,
    newRoomID,
    nickname,
    currentKey,
    currentNote,
    onJoinKeyChange,
    onJoinNoteChange,
    keyIsVisible,
    onKeyVisibilityHandle,
    joinRoomEvent
}) => {
    return (
        <div className="modal-container">
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <Icon
                    icon="far fa-check-circle"
                    style={{ color: "#55A7D4", fontSize: "50px" }}
                />
            </div>
            <div style={{ textAlign: "center" }}>
                <h1
                    style={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        marginBottom: "10px"
                    }}
                >
                    {newRoomID || "Unknown Room"}
                </h1>
                <div>
                    This chat room is not in your rooms list yet, would you like
                    to add this room to your rooms list?
                </div>
            </div>
            <form onSubmit={joinRoomEvent}>
                <div>
                    <div>
                        <label htmlFor="display-name">Display Name</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="display-name"
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
                            onChange={onJoinNoteChange}
                            defaultValue={currentNote}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="private-key">Private Key</label>
                    </div>
                    <div>
                        <input
                            type={`${keyIsVisible ? "text" : "password"}`}
                            className="text-input"
                            name="private-key"
                            placeholder="Used to encrypt and decrypt messages."
                            onChange={onJoinKeyChange}
                            defaultValue={currentKey}
                        />
                        <Icon
                            icon={`fas fa-eye${keyIsVisible ? "-slash" : ""}`}
                            onClick={onKeyVisibilityHandle}
                            style={{
                                cursor: "pointer",
                                margin: "0 10px",
                                color: "#0092FF"
                            }}
                            title={`Click to ${
                                keyIsVisible ? "hide" : "reveal"
                            } your key.`}
                        />
                    </div>
                </div>
                <div className="buttons-wrapper">
                    <button type="button" className="button" onClick={close}>
                        Cancel
                    </button>
                    <button type="submit" className="button inform">
                        Join
                    </button>
                </div>
            </form>
        </div>
    );
};

Conversation.contextType = ConversationConsumer;
export default Conversation;
