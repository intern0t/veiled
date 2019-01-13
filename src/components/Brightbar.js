import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import Icon from "./Icon";
import Modal from "./Modal";
import TipCounter from "./TipCounter";
import { generateRandomColorCode } from "../contexts/Library";
import { Link } from "react-router-dom";
import { AppConsumer } from "../contexts/AppProvider";
import { ConversationConsumer } from "../contexts/ConversationProvider";

class Brightbar extends Component {
    state = {
        filterBy: "",
        newRoomInfo: {
            note: "",
            key: "",
            keyVisible: false
        },
        newConversationModalDisplayed: false
    };

    onFilterChange = e => {
        let filterBy = e.target.value.toLowerCase() || "";
        this.setState({
            filterBy
        });
    };

    filterRoom = room => {
        const { filterBy } = this.state;
        return room.note.toLowerCase().includes(filterBy) === true;
    };

    // Clear filter.
    clearFilter = e => {
        if (e.key === "Escape") {
            this.setState({
                filterBy: ""
            });
        }
    };

    onAddNewRoom = e => {
        e.preventDefault();
        const { newRoomInfo } = this.state;
        const { generatedRoomID, addNewRoom } = this.context;
        console.log(newRoomInfo);
        if (
            generatedRoomID &&
            newRoomInfo.note &&
            newRoomInfo.key &&
            newRoomInfo.note.length > 0 &&
            newRoomInfo.key.length > 0
        ) {
            let newRoom = {
                note: newRoomInfo.note,
                key: newRoomInfo.key
            };
            addNewRoom(newRoom);
            this.setState(prevState => ({
                ...prevState,
                newRoomInfo: { ...prevState.newRoomInfo, note: "", key: "" }
            }));
        }
    };

    onFieldsChange = e => {
        let changedField = e.target || undefined;
        if (changedField && changedField.value && changedField.name) {
            this.setState(prevState => ({
                ...prevState,
                newRoomInfo: {
                    ...prevState.newRoomInfo,
                    [changedField.name]: changedField.value
                }
            }));
        }
    };

    keyVisibilityHandle = () => {
        this.setState(prevState => ({
            ...prevState,
            newRoomInfo: {
                ...prevState.newRoomInfo,
                keyVisible: !prevState.newRoomInfo.keyVisible
            }
        }));
    };

    toggleNewConversationModal = () => {
        this.setState(prevState => ({
            ...prevState,
            newConversationModalDisplayed: !prevState.newConversationModalDisplayed
        }));
    };

    render() {
        return (
            <AppConsumer>
                {({ mailTabDisplayed }) => {
                    return (
                        <ConversationConsumer>
                            {({
                                rooms,
                                messages,
                                nickname,
                                generatedRoomID,
                                generateRoomID,
                                activeRoomID
                            }) => {
                                return (
                                    <div
                                        className="brightbar"
                                        style={{
                                            display:
                                                mailTabDisplayed &&
                                                mailTabDisplayed === true
                                                    ? "block"
                                                    : "none",
                                            boxShadow:
                                                "box-shadow: 2px 0px 5px 0px rgba(0,0,0,0.75)"
                                        }}
                                    >
                                        <ConversationSearch
                                            toggle={
                                                this.toggleNewConversationModal
                                            }
                                            onChange={this.onFilterChange}
                                            clearFilter={this.clearFilter}
                                            filterBy={this.state.filterBy}
                                        />
                                        <ul className="brightbar-conversations">
                                            {rooms && rooms.length > 0
                                                ? rooms
                                                      .filter(this.filterRoom)
                                                      .map(room => (
                                                          <ConversationEntry
                                                              room={room}
                                                              key={uuidv4()}
                                                              messages={
                                                                  messages
                                                              }
                                                              activeRoomID={
                                                                  activeRoomID
                                                              }
                                                              nickname={
                                                                  nickname
                                                              }
                                                          />
                                                      ))
                                                : null}
                                        </ul>
                                        <Modal
                                            style={{
                                                display: this.state
                                                    .newConversationModalDisplayed
                                                    ? "flex"
                                                    : "none"
                                            }}
                                        >
                                            <AddNewConversation
                                                roomKey={
                                                    this.state.newRoomInfo.key
                                                }
                                                roomNote={
                                                    this.state.newRoomInfo.note
                                                }
                                                close={
                                                    this
                                                        .toggleNewConversationModal
                                                }
                                                generate={generateRoomID}
                                                generated={generatedRoomID}
                                                onAddNewRoom={this.onAddNewRoom}
                                                keyIsVisible={
                                                    this.state.newRoomInfo
                                                        .keyVisible
                                                }
                                                onKeyVisibilityHandle={
                                                    this.keyVisibilityHandle
                                                }
                                                onFieldsChange={
                                                    this.onFieldsChange
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

const ConversationSearch = ({ toggle, onChange, clearFilter, filterBy }) => {
    return (
        <div className="brightbar-search">
            <input
                type="text"
                className="text-input"
                placeholder="Search Conversations"
                value={filterBy}
                onChange={e => onChange(e)}
                onKeyDown={e => clearFilter(e)}
            />
            <Icon
                icon={"far fa-plus-square"}
                color={"#99a8b4"}
                title={"Add or join a secure room."}
                style={{ cursor: "pointer", marginLeft: "10px" }}
                onClick={toggle}
            />
        </div>
    );
};

const ConversationEntry = ({ room, messages, activeRoomID, nickname }) => {
    let colorCode = generateRandomColorCode();
    let messages_ = messages.filter(
        message => message.roomid === room.rid && message.nickname !== nickname
    );
    let latestMessage =
        messages_ && messages_.length > 0
            ? messages_.sort((a, b) => b.date - a.date)[0] ||
              `Start a conversation with ${room.note}.`
            : `Start a conversation with ${room.note}.`;
    let currentlyActive = room && room.rid === activeRoomID;

    return (
        <li>
            <Link
                to={`/veiled/${room.rid}`}
                className={
                    currentlyActive
                        ? "brightbar-conversations-entry active-conversation-entry"
                        : "brightbar-conversations-entry"
                }
            >
                <div className="brightbar-conversations-entry-wrapper">
                    <Icon
                        icon={`fas fa-mask`}
                        color={currentlyActive ? "#55A7D4" : "#99a8b4"}
                        title={"Currently active chatroom."}
                    />
                    <div className="brightbar-conversations-entry-wrapper-message">
                        <h1>{room.note ? room.note : "Anonymous"}</h1>
                        <p>
                            {latestMessage.message ||
                                `Your conversation in ${room.note}.`}
                        </p>
                    </div>
                </div>
                <TipCounter color={colorCode} newMessages={messages_.length} />
            </Link>
        </li>
    );
};

const AddNewConversation = ({
    roomKey,
    roomNote,
    close,
    generate,
    generated,
    onAddNewRoom,
    onFieldsChange,
    keyIsVisible,
    onKeyVisibilityHandle
}) => {
    return (
        <div
            className="modal-container"
            onClick={e => {
                return false;
            }}
        >
            <div>
                <Icon icon="fas fa-plus" color={"#F36060"} />
                <span>
                    Adding or creating a new conversation room is simple.
                </span>
            </div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                }}
            >
                <div>
                    <div>
                        <label htmlFor="note">Note</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            className="text-input"
                            name="note"
                            placeholder="To easily identify this room."
                            onChange={onFieldsChange}
                            value={roomNote}
                        />
                        <Icon
                            icon="fas fa-undo"
                            onClick={onKeyVisibilityHandle}
                            style={{
                                cursor: "pointer",
                                margin: "0 10px",
                                color: "#0092FF"
                            }}
                            title={"Clear note field."}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="roomid">Room ID</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="roomid"
                            className="text-input"
                            placeholder="Generated Room ID for your room."
                            value={generated}
                            readOnly
                        />
                        <Icon
                            icon="fas fa-sync"
                            onClick={generate}
                            style={{
                                cursor: "pointer",
                                margin: "0 10px",
                                color: "#0092FF"
                            }}
                            title="Generate a new room ID."
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="key">Private Key</label>
                    </div>
                    <div>
                        <input
                            type={`${keyIsVisible ? "text" : "password"}`}
                            className="text-input"
                            name="key"
                            placeholder="Used to encrypt and decrypt messages."
                            onChange={onFieldsChange}
                            value={roomKey}
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
                    <button className="button" onClick={close}>
                        Close
                    </button>
                    <button
                        className="button inform"
                        type="submit"
                        onClick={onAddNewRoom}
                    >
                        Add Room
                    </button>
                </div>
            </form>
        </div>
    );
};

Brightbar.contextType = ConversationConsumer;
export default Brightbar;
