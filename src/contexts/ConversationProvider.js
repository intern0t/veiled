import React, { Component } from "react";
import { generateRoomID } from "./Library";

const ConversationContext = React.createContext();

export class ConversationProvider extends Component {
    state = {
        rooms: [
            {
                rid: "r-f0d6c1a6",
                note: "Prashant",
                key: "test"
            },
            {
                rid: "r-9f0205ea",
                note: "Shrestha",
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
                displayName: "Synonymous"
            }
        },
        generatedRoomID: generateRoomID(),
        activeRoomID: null
    };

    _generateRoomID = () => {
        this.setState(prevState => ({
            ...prevState,
            generateRoomID: generateRoomID()
        }));
    };

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
