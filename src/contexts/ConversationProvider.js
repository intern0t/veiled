import React, { Component } from "react";
import { generateRoomID } from "./Library";
import { generateNickName } from "./Library";

// Implementing Sockets
import { BACKEND_URL } from "../config";
import io from "socket.io-client";
const veil = io.connect(BACKEND_URL + "/veil");

const ConversationContext = React.createContext();

export class ConversationProvider extends Component {
    state = {
        rooms: [
            {
                rid: "r-f0d6c1a6",
                note: "Veiled",
                key: "general"
            },
            {
                rid: "r-c0d6c1a6",
                note: "Denim",
                key: "general"
            }
        ],
        message: "", // input default value can't be null so..
        messages: [],
        modals: {
            conversationSettingsModalDisplayed: false,
            newConversationModalDisplayed: false
        },
        nickname: generateNickName(),
        generatedRoomID: generateRoomID(),
        activeRoomID: null
    };

    /**
     * TODO: Fetch & load all saved rooms from localStorage, if exists.
     */
    componentDidMount() {
        let roomsFromLocalStorage = localStorage.getItem("rooms");
        let nicknameFromLocalStorage = localStorage.getItem("nickname");

        if (roomsFromLocalStorage) {
            this.setState(prevState => ({
                ...prevState,
                rooms: JSON.parse(roomsFromLocalStorage)
            }));
        }

        if (nicknameFromLocalStorage) {
            this.setState(prevState => ({
                ...prevState,
                nickname: nicknameFromLocalStorage
            }));
        }

        const { rooms } = this.state;

        rooms.map(room => {
            veil.emit("join", { roomid: room.rid });
            veil.on("notification", notice => {
                this.onNotificationReceived(notice);
            });
            veil.on("message", data => {
                this.onMessageReceived(data);
            });
            // @TODO: Update total users in the room (planned)
            return false;
        });
    }

    onNotificationReceived = notice => {
        if (notice.error) {
            console.log(notice);
        }
    };

    onMessageReceived = messageEntry => {
        this.addNewMessage(messageEntry);
    };

    /**
     * * Generates a new room id. Room ID can only be generated.
     * @memberof ConversationProvider
     */
    generateRoomID = () => {
        this.setState(prevState => ({
            ...prevState,
            generatedRoomID: generateRoomID()
        }));
    };

    onSendMessage = messageEntry => {
        if (veil.connected) {
            veil.emit("message", messageEntry);
        }
    };
    /**
     * * Add new message to the messages list.
     * TODO: Make sure to store maximum of 50 messages of ea. room.
     * @memberof ConversationProvider
     */
    addNewMessage = newMessageEntry => {
        if (
            !this.state.messages.find(message => {
                return (
                    message.date === newMessageEntry.date &&
                    message.message === newMessageEntry.message
                );
            })
        ) {
            this.setState(prevState => ({
                ...prevState,
                messages: [...prevState.messages, newMessageEntry]
            }));
        }
    };

    onSpeakBarChange = e => {
        let appendedMessage = e.target.value || "";
        this.setState(prevState => ({
            ...prevState,
            message: appendedMessage
        }));
    };

    onSpeakBarSpoken = e => {
        const { activeRoomID, message, nickname } = this.state;
        if (e.key === "Enter") {
            if (message && message.length > 0) {
                let newMessageEntry = {
                    date: Math.floor(Date.now() / 1000),
                    message: message,
                    nickname: nickname ? nickname : "You",
                    roomid: activeRoomID
                };

                console.log(nickname);

                this.addNewMessage(newMessageEntry);

                this.onSendMessage(newMessageEntry);

                this.setState(prevState => ({
                    ...prevState,
                    message: ""
                }));
            }
        }
    };

    toggleConversationSettingsModal = e => {
        e.preventDefault();
        this.setState(prevState => ({
            ...prevState,
            modals: {
                ...prevState.modals,
                conversationSettingsModalDisplayed: !prevState.modals
                    .conversationSettingsModalDisplayed
            }
        }));
    };

    toggleNewConversationModal = e => {
        e.preventDefault();
        this.setState(prevState => ({
            ...prevState,
            modals: {
                ...prevState.modals,
                newConversationModalDisplayed: !prevState.modals
                    .newConversationModalDisplayed
            }
        }));
    };

    changeActiveRoom = roomid => {
        this.setState(prevState => ({
            ...prevState,
            activeRoomID: roomid
        }));
    };

    onRoomLeave = roomid => {
        let updatedRooms = this.state.rooms.filter(
            joinedRooms => joinedRooms.rid !== roomid
        );
        this.setState(prevState => ({
            ...prevState,
            rooms: updatedRooms
        }));
    };

    setNickname = nickname => {
        if (nickname && nickname.length > 3) {
            this.setState(prevState => ({
                ...prevState,
                nickname: nickname
            }));
        }

        localStorage.setItem("nickname", this.state.nickname);
    };

    render() {
        const { children } = this.props;

        return (
            <ConversationContext.Provider
                value={{
                    veil: veil,
                    rooms: this.state.rooms,
                    activeRoomID: this.state.activeRoomID,
                    changeActiveRoom: this.changeActiveRoom,
                    generateRoomID: this.generateRoomID,
                    generatedRoomID: this.state.generatedRoomID,
                    messages: this.state.messages,
                    message: this.state.message,
                    onSpeakBarChange: this.onSpeakBarChange,
                    onSpeakBarSpoken: this.onSpeakBarSpoken,
                    onSendMessage: this.onSendMessage,
                    addNewMessage: this.addNewMessage,
                    conversationSettingsModalDisplayed: this.state.modals
                        .conversationSettingsModalDisplayed,
                    newConversationModalDisplayed: this.state.modals
                        .newConversationModalDisplayed,
                    toggleConversationSettingsModal: this
                        .toggleConversationSettingsModal,
                    toggleNewConversationModal: this.toggleNewConversationModal,
                    nickname: this.state.nickname,
                    setNickname: this.setNickname,
                    leaveRoom: this.onRoomLeave
                }}
            >
                {children}
            </ConversationContext.Provider>
        );
    }
}

export const ConversationConsumer = ConversationContext.Consumer;
