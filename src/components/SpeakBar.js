import React from "react";
import Icon from "./Icon";

const SpeakBar = ({ _onChange, _onSpeak, message }) => {
    return (
        <div className="speakbar">
            <input
                onChange={e => _onChange(e)}
                onKeyDown={e => _onSpeak(e)}
                type="text"
                placeholder="Type your message here .."
                value={message}
            />
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
