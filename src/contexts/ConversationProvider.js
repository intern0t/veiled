import React, { Component } from "react";
import { generateRoomID } from "./Library";

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
        messages: [],
        modals: {
            conversationSettingsModalDisplayed: false,
            newConversationModalDisplayed: false
        },
        userInformation: {
            user: {
                displayName: "Prashant Shrestha"
            }
        },
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
    }

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

    /**
     * * Add new message to the messages list.
     * TODO: Make sure to store maximum of 50 messages of ea. room.
     * @memberof ConversationProvider
     */
    addNewMessage = newMessageEntry => {
        this.setState(prevState => ({
            ...prevState,
            messages: [...prevState.messages, newMessageEntry]
        }));
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

    render() {
        const { children } = this.props;

        return (
            <ConversationContext.Provider
                value={{
                    rooms: this.state.rooms,
                    activeRoomID: this.state.activeRoomID,
                    changeActiveRoom: this.changeActiveRoom,
                    generateRoomID: this.generateRoomID,
                    generatedRoomID: this.state.generatedRoomID,
                    messages: this.state.messages,
                    addNewMessage: this.addNewMessage,
                    conversationSettingsModalDisplayed: this.state.modals
                        .conversationSettingsModalDisplayed,
                    newConversationModalDisplayed: this.state.modals
                        .newConversationModalDisplayed,
                    toggleConversationSettingsModal: this
                        .toggleConversationSettingsModal,
                    toggleNewConversationModal: this.toggleNewConversationModal,
                    userInformation: this.state.userInformation
                }}
            >
                {children}
            </ConversationContext.Provider>
        );
    }
}

export const ConversationConsumer = ConversationContext.Consumer;
