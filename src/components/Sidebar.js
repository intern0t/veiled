import React, { Component } from "react";
import Icon from "./Icon";
import Tip from "./Tip";
import { Link } from "react-router-dom";
import { AppConsumer } from "../contexts/AppProvider";

class Sidebar extends Component {
    render() {
        return (
            <AppConsumer>
                {({ currentPage, toggleMailTab }) => (
                    <div className="sidebar">
                        <ul className="sidebar-section">
                            <li>
                                <Link
                                    to="/conversation"
                                    title="Conversation"
                                    className={
                                        (currentPage && currentPage === "/") ||
                                        currentPage === "/conversation" ||
                                        currentPage.includes("/veiled/")
                                            ? "sidebar-section-active"
                                            : ""
                                    }
                                >
                                    <Tip updated={true} color={"#55A7D4"} />
                                    <Icon icon="fas fa-comment-dots" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    title="Conversations"
                                    onClick={e => toggleMailTab(e)}
                                    className={
                                        currentPage &&
                                        currentPage === "/conversations"
                                            ? "sidebar-section-active"
                                            : ""
                                    }
                                >
                                    <Tip updated={true} />
                                    <Icon icon="fas fa-comments" />
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
                                    <Icon icon="fas fa-cogs" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/bugs"
                                    title="Report bugs"
                                    className={
                                        currentPage && currentPage === "/bugs"
                                            ? "sidebar-section-active"
                                            : ""
                                    }
                                >
                                    <Icon icon="fas fa-bug" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </AppConsumer>
        );
    }
}

export default Sidebar;
