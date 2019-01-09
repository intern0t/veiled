import React from "react";
import Tip from "./Tip";
import { GITHUB_REPO } from "../config";
import Icon from "./Icon";

const Footer = ({ isConnected }) => {
    return (
        <div className="footer">
            <span>
                <Tip
                    updated={isConnected}
                    color={isConnected ? "#00EA7E" : "#FF4E00"}
                    style={{
                        display: "block",
                        position: "relative",
                        marginRight: "10px"
                    }}
                />
                <b>{isConnected ? "Connected" : "Disconnected"}</b>
            </span>
            <span>
                Copyright &copy; 2018,{" "}
                <a
                    href={GITHUB_REPO || "/"}
                    target="_blank"
                    title="Visit Github Repo."
                >
                    {` Veiled `} <Icon icon="fab fa-github-alt" />
                </a>
            </span>
        </div>
    );
};

export default Footer;
