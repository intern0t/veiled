import React, { Component } from "react";
import { generateRoomID } from "./Library";
import { generateNickName } from "./Library";
import CryptoJS from "crypto-js";

// Implementing Sockets
import { BACKEND_URL } from "../config";
import io from "socket.io-client";
const veil = io.connect(BACKEND_URL + "/veil");

const ConversationContext = React.createContext();

export class ConversationProvider extends Component {
    state = {
        rooms: [],
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

        if (
            roomsFromLocalStorage ||
            (nicknameFromLocalStorage && nicknameFromLocalStorage.length > 0)
        ) {
            let storedRooms = JSON.parse(localStorage.getItem("rooms"));
            this.setState(
                prevState => ({
                    ...prevState,
                    rooms: storedRooms || [],
                    nickname: nicknameFromLocalStorage || generateNickName()
                }),
                () => {
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
                        veil.on("roomInfo", data => {
                            if (
                                typeof data === "object" &&
                                data.roomid &&
                                data.users
                            ) {
                                let updatedRooms = [...rooms].map(room => {
                                    if (room.rid === data.roomid) {
                                        room.users = data.users;
                                    }
                                    return room;
                                });
                                this.setState(prevState => ({
                                    ...prevState,
                                    rooms: updatedRooms
                                }));
                            }
                        });
                        return true;
                    });
                }
            );
        }
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
        const { rooms, activeRoomID, messages } = this.state;
        // Check if the message was emitted or is it our own?
        if (newMessageEntry && newMessageEntry.emitted) {
            // If emitted, we know the message is encrypted.
            let currentRoom = rooms.filter(
                room => room.rid === activeRoomID
            )[0];
            let plainBytes = CryptoJS.AES.decrypt(
                newMessageEntry.message.toString(),
                currentRoom.key
            );
            let plainMessage = "";
            try {
                plainMessage = plainBytes.toString(CryptoJS.enc.Utf8);
            } catch (ex) {
                plainMessage = "This message could not be decrypted.";
            }
            if (
                !messages.find(
                    message =>
                        message.date === newMessageEntry.date &&
                        message.nickname === newMessageEntry.nickname &&
                        message.message === newMessageEntry.message
                )
            ) {
                newMessageEntry.message =
                    plainMessage && plainMessage.length > 0
                        ? plainMessage
                        : "This message could not be decrypted.";
                this.setState(
                    prevState => ({
                        ...prevState,
                        messages: [...prevState.messages, newMessageEntry]
                    }),
                    () => {
                        localStorage.setItem(
                            "rooms",
                            JSON.stringify(this.state.rooms)
                        );
                    }
                );
            }
        }
    };

    scrollToBottom = node => {
        node.scrollTop = node.scrollHeight;
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
        const { rooms } = this.state;

        this.setState(
            prevState => ({
                ...prevState,
                activeRoomID: roomid
            }),
            () => {
                rooms.map(room => {
                    veil.emit("join", { roomid: room.rid });
                    veil.on("notification", notice => {
                        this.onNotificationReceived(notice);
                    });
                    veil.on("message", data => {
                        this.onMessageReceived(data);
                    });
                    // @TODO: Update total users in the room (planned)
                    veil.on("roomInfo", data => {
                        if (
                            typeof data === "object" &&
                            data.roomid &&
                            data.users
                        ) {
                            let updatedRooms = [...rooms].map(room => {
                                if (room.rid === data.roomid) {
                                    room.users = data.users;
                                }
                                return room;
                            });
                            this.setState(prevState => ({
                                ...prevState,
                                rooms: updatedRooms
                            }));
                        }
                    });
                    return veil;
                });
            }
        );
    };

    onRoomLeave = roomid => {
        let updatedRooms = this.state.rooms.filter(
            joinedRooms => joinedRooms.rid !== roomid
        );
        veil.emit("leave", { roomid });
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

        localStorage.setItem("nickname", nickname);
    };

    setKey = newKey => {
        const { activeRoomID, rooms } = this.state;
        let roomToUpdate = [...rooms].map(room => {
            if (room.rid === activeRoomID && room.key !== newKey) {
                room.key = newKey;
            }
            return room;
        });

        this.setState(prevState => ({
            ...prevState,
            rooms: roomToUpdate
        }));
    };

    addNewRoom = newRoom => {
        const { generatedRoomID } = this.state;
        if (
            newRoom &&
            typeof newRoom === "object" &&
            generatedRoomID &&
            newRoom.note &&
            newRoom.key
        ) {
            let formattedRoom = {
                note: newRoom.note,
                key: newRoom.key
            };

            formattedRoom.rid = newRoom.rid ? newRoom.rid : generatedRoomID;

            this.setState(
                prevState => ({
                    ...prevState,
                    rooms: [...prevState.rooms, formattedRoom],
                    modals: {
                        ...prevState.modals,
                        newConversationModalDisplayed: !prevState.modals
                            .newConversationModalDisplayed
                    }
                }),
                () => {
                    localStorage.setItem(
                        "rooms",
                        JSON.stringify(
                            this.state.rooms.map(room => {
                                delete room.users;
                                return room;
                            })
                        )
                    );

                    // this.state.rooms.map(room => {
                    //     return veil.emit("join", { roomid: room.rid });
                    // });
                }
            );
        }
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
                    setKey: this.setKey,
                    leaveRoom: this.onRoomLeave,
                    addNewRoom: this.addNewRoom
                }}
            >
                {children}
            </ConversationContext.Provider>
        );
    }
}

export const ConversationConsumer = ConversationContext.Consumer;
