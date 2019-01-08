import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import Tip from "../Tip";
import Icon from "../Icon";
import Modal from "../Modal";
import Message from "../Message";
import UserAvatar from "../UserAvatar";
import { copyToClipboard } from "../../contexts/Library";
import { ConversationConsumer } from "../../contexts/ConversationProvider";

class Conversation extends Component {
    state = {
        conversationSettingsModalDisplayed: false,
        message: ""
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
            user,
            addNewMessage,
            onSendMessage
        } = this.context;
        if (e.key === "Enter") {
            if (message && message.length > 0) {
                let newMessageEntry = {
                    date: Math.floor(Date.now() / 1000),
                    message: message,
                    sender: user ? user : "You",
                    roomid: activeRoomID
                };

                console.log(newMessageEntry);

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
                {({ rooms, messages, activeRoomID, me, leaveRoom }) => {
                    let theRoom = rooms.filter(
                        room => room.rid === activeRoomID
                    );
                    return (
                        <div className="frightbar">
                            {/* <div className="frightbar-notification">
                                            <div className="frightbar-notification-message-container">
                                                hi hi
                                            </div>
                                        </div> */}
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
                            <div className="frightbar-inner">
                                {messages
                                    .filter(
                                        messageEntry =>
                                            messageEntry.roomid === activeRoomID
                                    )
                                    .map(messageEntry => {
                                        return (
                                            <Message
                                                key={uuidv4()}
                                                me={me}
                                                from={
                                                    messageEntry &&
                                                    messageEntry.sender
                                                        ? messageEntry.sender
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
                                        me={me}
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

const ConversationSettings = ({ me, currentRoom, close, leaveRoom }) => {
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

Conversation.contextType = ConversationConsumer;
export default Conversation;
