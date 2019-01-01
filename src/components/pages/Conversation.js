import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import Tip from "../Tip";
import Icon from "../Icon";
import Modal from "../Modal";
import Message from "../Message";
import SpeakBar from "../SpeakBar";
import UserAvatar from "../UserAvatar";
import { AppConsumer } from "../../contexts/AppProvider";
import { ConversationConsumer } from "../../contexts/Conversation.context";

class Conversation extends Component {
    state = {
        currentRoom: {
            messages: [],
            message: ""
        }
    };

    componentDidMount() {
        const { match } = this.props;
        const { changeActiveRoom } = ConversationConsumer;
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
        const { userInformation, activeRoomID, addNewMessage } = this.context;
        if (e.key === "Enter") {
            let newMessageEntry = {
                date: Math.floor(Date.now() / 1000),
                message: currentRoom.message,
                sender: userInformation.displayName
                    ? userInformation.displayName
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
        let otherUser = "HiLow?";
        return (
            <AppConsumer>
                {({ userInformation }) => (
                    <ConversationConsumer>
                        {({ activeRoomID }) => {
                            console.log(activeRoomID, userInformation);
                            return <div>{activeRoomID}</div>;
                        }}
                    </ConversationConsumer>
                )}
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

export default Conversation;
