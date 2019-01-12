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
                                    <Tip updated={true} color={"#FF4E00"} />
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
                                        icon={`fas fa-envelope${
                                            currentPage &&
                                            currentPage === "/contact"
                                                ? "-open"
                                                : ""
                                        }`}
                                    />
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
