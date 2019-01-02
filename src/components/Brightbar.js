import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import Icon from "./Icon";
import Modal from "./Modal";
import TipCounter from "./TipCounter";
import UserAvatar from "./UserAvatar";
import { generateRandomColorCode } from "../contexts/Library";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { AppConsumer } from "../contexts/AppProvider";
import { ConversationConsumer } from "../contexts/ConversationProvider";

class Brightbar extends Component {
    render() {
        return (
            <AppConsumer>
                {({
                    mailTabDisplayed,
                    toggleNewConModal,
                    newConModalDisplayed,
                    generatedRoomID,
                    generateRoomID,
                }) => {
                    return (
                        <ConversationConsumer>
                            {({ rooms, changeActiveRoom }) => {
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
                                            toggle={toggleNewConModal}
                                        />
                                        <ul className="brightbar-conversations">
                                            {rooms && rooms.length > 0
                                                ? rooms.map(room => {
                                                      return (
                                                          <ConversationEntry
                                                              room={room}
                                                              key={uuidv4()}
                                                              _changeRoom={
                                                                  changeActiveRoom
                                                              }
                                                          />
                                                      );
                                                  })
                                                : null}
                                        </ul>

                                        <Modal
                                            style={{
                                                display: newConModalDisplayed
                                                    ? "flex"
                                                    : "none"
                                            }}
                                        >
                                            <AddNewConversation
                                                close={toggleNewConModal}
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

const ConversationSearch = ({ toggle }) => {
    return (
        <div className="brightbar-search">
            <input
                type="text"
                className="text-input"
                placeholder="Search Conversations"
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
        <Router>
            <li>
                <Link
                    to={`/veiled/${room.rid}`}
                    onClick={e => _changeRoom(room.rid)}
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
        </Router>
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

export default Brightbar;
