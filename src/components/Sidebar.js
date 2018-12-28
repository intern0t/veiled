import React from "react";
import Icon from "./Icon";
import Tip from "./Tip";
import { AppConsumer } from "../contexts/AppProvider";

const Sidebar = () => {
    return (
        <AppConsumer>
            {({ mailTabDisplayed, toggleMailTab }) => (
                <div className="sidebar">
                    <ul className="sidebar-section">
                        <li>
                            <a href="/" title="Conversations">
                                <Tip updated={true} color={"#55A7D4"} />
                                <Icon icon="fas fa-comment" />
                            </a>
                        </li>
                        <li>
                            <a href="/" title="Mail">
                                <Tip updated={true} />
                                <Icon
                                    icon={`fas fa-envelope${
                                        mailTabDisplayed ? "-open" : ""
                                    }`}
                                />
                            </a>
                        </li>
                        <li>
                            <a href="/" title="Archive">
                                <Icon icon="fas fa-box" />
                            </a>
                        </li>
                        <li>
                            <a href="/" title="Settings">
                                <Icon icon="fas fa-cogs" />
                            </a>
                        </li>
                        <li>
                            <a href="/" title="Report bugs">
                                <Icon icon="fas fa-bug" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="/"
                                title={`Turn Brightbar ${
                                    mailTabDisplayed ? "Off" : "On"
                                }`}
                                onClick={e => toggleMailTab(e)}
                            >
                                <Icon
                                    icon={`fas fa-toggle-${
                                        mailTabDisplayed ? "off" : "on"
                                    }`}
                                />
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </AppConsumer>
    );
};

export default Sidebar;
