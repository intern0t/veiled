import React from "react";
import Icon from "./Icon";

const SpeakBar = () => {
    return (
        <div className="speakbar">
            <input type="text" placeholder="Type your message here .." />
            <ul>
                <li>
                    <a href="/">
                        <Icon icon="fas fa-paperclip" />
                    </a>
                </li>
                <li>
                    <a href="/">
                        <Icon icon="fas fa-file-image" />
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default SpeakBar;
