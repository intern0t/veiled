import React, { Component } from "react";
import Icon from "./Icon";
import Tip from "./Tip";
import { BrowserRouter as Link } from "react-router-dom";
import { AppConsumer } from "../contexts/AppProvider";

class Sidebar extends Component {
    render() {
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
                                <a
                                    href="/"
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
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/"
                                    title="Archive"
                                    className={
                                        pathname && pathname === "/archive"
                                            ? "sidebar-section-active"
                                            : ""
                                    }
                                >
                                    <Icon icon="fas fa-box" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/"
                                    title="Settings"
                                    className={
                                        pathname && pathname === "/settings"
                                            ? "sidebar-section-active"
                                            : ""
                                    }
                                >
                                    <Icon icon="fas fa-cogs" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/"
                                    title="Report bugs"
                                    className={
                                        pathname && pathname === "/bugs"
                                            ? "sidebar-section-active"
                                            : ""
                                    }
                                >
                                    <Icon icon="fas fa-bug" />
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </AppConsumer>
        );
    }
}

export default Sidebar;
