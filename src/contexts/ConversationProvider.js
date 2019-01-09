import React, { Component } from "react";
import { generateRoomID } from "./Library";
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
                note: "Vicky",
                key: "test"
            },
            {
                rid: "r-9f0205ea",
                note: "Edward",
                key: "test"
            },
            {
                rid: "r-bef987aa",
                note: "Issac",
                key: "test"
            },
            {
                rid: "r-f4df580b",
                note: "Lewis",
                key: "test"
            },
            {
                rid: "r-bd2bd857",
                note: "Elizabeth",
                key: "test"
            },
            {
                rid: "r-2b7d7cc5",
                note: "Diego",
                key: "test"
            }
        ],
        message: "", // input default value can't be null so..
        messages: [],
        modals: {
            conversationSettingsModalDisplayed: false,
            newConversationModalDisplayed: false
        },
        nickname: "Prashant Shrestha",
        generatedRoomID: generateRoomID(),
        activeRoomID: null
    };

    /**
     * TODO: Fetch & load all saved rooms from localStorage, if exists.
     */
    componentDidMount() {
        let roomsFromLocalStorage = localStorage.getItem("rooms");
        if (roomsFromLocalStorage) {
            this.setState(prevState => ({
                ...prevState,
                rooms: JSON.parse(roomsFromLocalStorage)
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
                return message.message === newMessageEntry.message;
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
        const { activeRoomID, message, user } = this.state;
        if (e.key === "Enter") {
            if (message && message.length > 0) {
                let newMessageEntry = {
                    date: Math.floor(Date.now() / 1000),
                    message: message,
                    sender: user ? user : "You",
                    roomid: activeRoomID
                };

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
                    leaveRoom: this.onRoomLeave
                }}
            >
                {children}
            </ConversationContext.Provider>
        );
    }
}

export const ConversationConsumer = ConversationContext.Consumer;
