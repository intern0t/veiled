import React from "react";
import Tip from "./Tip";
import { GITHUB_REPO } from "../config";
import Icon from "./Icon";
import { ConversationConsumer } from "../contexts/ConversationProvider";

const Footer = () => {
    return (
        <ConversationConsumer>
            {({ veil }) => {
                return (
                    <div className="footer">
                        <span>
                            <Tip
                                updated={
                                    veil && veil.connected
                                        ? veil.connected
                                        : false
                                }
                                color={veil.connected ? "#00EA7E" : "#FF4E00"}
                                style={{
                                    display: "block",
                                    position: "relative",
                                    marginRight: "10px"
                                }}
                            />
                            <b>{veil.connected ? "Connected" : "Disconnected"}</b>
                        </span>
                        <span>
                            Copyright &copy; 2018,{" "}
                            <a
                                href={GITHUB_REPO || "/"}
                                target="_blank"
                                title="Visit Github Repo."
                                rel="noopener noreferrer"
                            >
                                {` Veiled `} <Icon icon="fab fa-github-alt" />
                            </a>
                        </span>
                    </div>
                );
            }}
        </ConversationConsumer>
    );
};

export default Footer;
