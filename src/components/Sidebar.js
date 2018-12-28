import React, { Component } from "react";
import Icon from "./Icon";
import Tip from "./Tip";
import { Link } from "react-router-dom";
import { AppConsumer } from "../contexts/AppProvider";

class Sidebar extends Component {
    render() {
        // const { pathname } = this.props.location;
        const pathname = "/";

        return (
            <AppConsumer>
                {({ mailTabDisplayed, toggleMailTab }) => (
                    <div className="sidebar">
                        <ul className="sidebar-section">
                            <li>
                                <Link
                                    to="/"
                                    title="Conversations"
                                    className={
                                        (pathname && pathname === "/") ||
                                        pathname === "conversations"
                                            ? "sidebar-section-active"
                                            : ""
                                    }
                                >
                                    <Tip updated={true} color={"#55A7D4"} />
                                    <Icon icon="fas fa-comment" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/messages"
                                    title="Messages"
                                    onClick={e => toggleMailTab(e)}
                                    className={
                                        pathname && pathname === "/messages"
                                            ? "sidebar-section-active"
                                            : ""
                                    }
                                >
                                    <Tip updated={true} />
                                    <Icon
                                        icon={`fas fa-envelope${
                                            mailTabDisplayed ? "-open" : ""
                                        }`}
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/archive"
                                    title="Archive"
                                    className={
                                        pathname && pathname === "/archive"
                                            ? "sidebar-section-active"
                                            : ""
                                    }
                                >
                                    <Icon icon="fas fa-box" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/settings"
                                    title="Settings"
                                    className={
                                        pathname && pathname === "/settings"
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
                                        pathname && pathname === "/bugs"
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
