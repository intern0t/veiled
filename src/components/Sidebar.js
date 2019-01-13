import React, { Component } from "react";
import Icon from "./Icon";
import Tip from "./Tip";
import { Link } from "react-router-dom";
import { AppConsumer } from "../contexts/AppProvider";
import { ConversationConsumer } from "../contexts/ConversationProvider";

class Sidebar extends Component {
    render() {
        return (
            <AppConsumer>
                {({ currentPage, toggleMailTab }) => (
                    <ConversationConsumer>
                        {({ toggleModes, darkMode }) => {
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
                                                to="/settings"
                                                title="Settings"
                                                className={
                                                    currentPage &&
                                                    currentPage === "/settings"
                                                        ? "sidebar-section-active"
                                                        : ""
                                                }
                                            >
                                                <Icon icon="far fa-save" />
                                            </Link>
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

export default Sidebar;
