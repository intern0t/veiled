import React, { Component } from "react";
import Icon from "./Icon";
import Tip from "./Tip";
import { Link } from "react-router-dom";
import { AppConsumer } from "../contexts/AppProvider";
import { ConversationConsumer } from "../contexts/ConversationProvider";
import Modal from "./Modal";

class Sidebar extends Component {
    state = {
        displayName: ""
    };

    componentDidMount() {
        let nicknameFromLocalStorage = localStorage.getItem("nickname");
        const { nickname } = this.context;

        if (nicknameFromLocalStorage && nicknameFromLocalStorage.length > 3) {
            this.setState(prevState => ({
                ...prevState,
                displayName: nicknameFromLocalStorage || nickname
            }));
        }
    }

    nickOnChange = e => {
        let nick = e.target.value || "";
        if (nick.length > 3) {
            this.setState(prevState => ({
                ...prevState,
                displayName: nick
            }));
        }
    };

    onNickUpdate = e => {
        const { setNickname } = this.context;
        e.preventDefault();
        setNickname(this.state.displayName);
    };

    render() {
        return (
            <AppConsumer>
                {({
                    currentPage,
                    toggleMailTab,
                    settingsModalDisplayed,
                    toggleSettingsModal
                }) => (
                    <ConversationConsumer>
                        {({ nickname, toggleModes, darkMode }) => {
                            return (
                                <div className="sidebar">
                                    <ul className="sidebar-section">
                                        <li>
                                            <Link
                                                to="#"
                                                title="Conversations"
                                                onClick={e => toggleMailTab(e)}
                                                className={
                                                    currentPage &&
                                                    currentPage ===
                                                        "/conversations"
                                                        ? "sidebar-section-active"
                                                        : ""
                                                }
                                            >
                                                <Tip
                                                    updated={true}
                                                    color={"#FF4E00"}
                                                />
                                                <Icon icon="far fa-comments" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="#"
                                                title="Settings"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    toggleSettingsModal();
                                                }}
                                                className={
                                                    currentPage &&
                                                    currentPage === "/settings"
                                                        ? "sidebar-section-active"
                                                        : ""
                                                }
                                            >
                                                <Icon icon="far fa-save" />
                                            </Link>
                                            <Modal
                                                style={{
                                                    display: settingsModalDisplayed
                                                        ? "flex"
                                                        : "none"
                                                }}
                                            >
                                                <SettingsModal
                                                    toggleSettingsModal={
                                                        toggleSettingsModal
                                                    }
                                                    nickname={nickname}
                                                    nickOnChange={
                                                        this.nickOnChange
                                                    }
                                                    updateNick={
                                                        this.onNickUpdate
                                                    }
                                                />
                                            </Modal>
                                        </li>
                                        <li>
                                            <Link
                                                to="/contact"
                                                title="Contact Us"
                                                className={
                                                    currentPage &&
                                                    currentPage === "/contact"
                                                        ? "sidebar-section-active"
                                                        : ""
                                                }
                                            >
                                                <Icon
                                                    icon={`far fa-envelope${
                                                        currentPage &&
                                                        currentPage ===
                                                            "/contact"
                                                            ? "-open"
                                                            : ""
                                                    }`}
                                                />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="#"
                                                title="Toggle modes"
                                                onClick={toggleModes}
                                            >
                                                <Icon
                                                    icon={`${
                                                        darkMode ? "fas" : "far"
                                                    } fa-lightbulb`}
                                                />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            );
                        }}
                    </ConversationConsumer>
                )}
            </AppConsumer>
        );
    }
}

const SettingsModal = ({
    nickOnChange,
    nickname,
    toggleSettingsModal,
    updateNick
}) => {
    return (
        <div className="modal-container">
            <div
                style={{
                    textAlign: "center",
                    marginBottom: "20px"
                }}
            >
                <Icon
                    icon="fas fa-exclamation"
                    style={{
                        fontSize: "30px",
                        color: "#55a7d4"
                    }}
                />
            </div>
            <div>
                <span>
                    Feel free to set your global username, it can be
                    <b> anything</b>.
                </span>
            </div>
            <form onSubmit={updateNick}>
                <div>
                    <div>
                        <label htmlFor="display-name">Display Name</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="display-name"
                            className="text-input"
                            placeholder="Display name..."
                            defaultValue={nickname}
                            onChange={nickOnChange}
                            // onKeyDown={e => {
                            //     return e && e.key === "Enter"
                            //         ? setNickname(e.target.value)
                            //         : null;
                            // }}
                        />
                    </div>
                </div>
                <div className="buttons-wrapper">
                    <button
                        type="button"
                        className="button"
                        onClick={toggleSettingsModal}
                    >
                        Close
                    </button>
                    <button type="submit" className="button inform">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

Sidebar.contextType = ConversationConsumer;
export default Sidebar;
