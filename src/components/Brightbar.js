import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import Icon from "./Icon";
import Modal from "./Modal";
import TipCounter from "./TipCounter";
import UserAvatar from "./UserAvatar";
import { generateRandomColorCode } from "../contexts/Library";
import { Link } from "react-router-dom";
import { AppConsumer } from "../contexts/AppProvider";
import { ConversationConsumer } from "../contexts/ConversationProvider";

class Brightbar extends Component {
    state = {
        filterBy: ""
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

    render() {
        return (
            <AppConsumer>
                {({ mailTabDisplayed }) => {
                    return (
                        <ConversationConsumer>
                            {({
                                rooms,
                                changeActiveRoom,
                                toggleNewConversationModal,
                                newConversationModalDisplayed,
                                generatedRoomID,
                                generateRoomID
                            }) => {
                                return (
                                    <div
                                        className="brightbar"
                                        style={{
                                            display:
                                                mailTabDisplayed &&
                                                mailTabDisplayed === true
                                                    ? "block"
                                                    : "none"
                                        }}
                                    >
                                        <ConversationSearch
                                            toggle={toggleNewConversationModal}
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
                                                              _changeRoom={
                                                                  changeActiveRoom
                                                              }
                                                          />
                                                      ))
                                                : null}
                                        </ul>
                                        <Modal
                                            style={{
                                                display: newConversationModalDisplayed
                                                    ? "flex"
                                                    : "none"
                                            }}
                                        >
                                            <AddNewConversation
                                                close={
                                                    toggleNewConversationModal
                                                }
                                                generate={generateRoomID}
                                                generated={generatedRoomID}
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
                icon={"fas fa-plus-square"}
                color={"#99a8b4"}
                title={"Add or join a secure room."}
                onClick={toggle}
            />
        </div>
    );
};

const ConversationEntry = ({ room, _changeRoom }) => {
    let colorCode = generateRandomColorCode();
    let newMessages = 11;
    return (
        <li>
            <Link
                to={`/veiled/${room.rid}`}
                className="brightbar-conversations-entry"
            >
                <UserAvatar username={room.note} />
                <div className="brightbar-conversations-entry-message">
                    <h1>{room.note ? room.note : "Anonymous"}</h1>
                    <p>{`Your conversation with ${room.note}..`}</p>
                </div>
                <TipCounter color={colorCode} newMessages={newMessages} />
            </Link>
        </li>
    );
};

const AddNewConversation = ({ close, generate, generated }) => {
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
                        <label htmlFor="private-key">Room ID</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="private-key"
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
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="room-identifier">Note</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            className="text-input"
                            name="room-identifier"
                            placeholder="To better identify this room."
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
                    <button className="button inform">Update</button>
                </div>
            </form>
        </div>
    );
};

Brightbar.contextType = ConversationConsumer;
export default Brightbar;
