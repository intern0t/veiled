import React from "react";
import uuidv4 from "uuid/v4";
import Tip from "../Tip";
import Icon from "../Icon";
import Modal from "../Modal";
import Message from "../Message";
import SpeakBar from "../SpeakBar";
import UserAvatar from "../UserAvatar";
import { AppConsumer } from "../../contexts/AppProvider";

const testMessages = [
    {
        message: "Vestibulum lacinia lectus nec condimentum fringilla.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Cras sit amet elit posuere, rhoncus nisi vel, feugiat mi.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Pellentesque pretium orci eget eros venenatis ullamcorper.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Integer vestibulum purus convallis dui feugiat, ac consectetur risus tempor.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Vivamus cursus arcu finibus, ornare sapien eu, pellentesque lectus.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Aenean ultricies augue id suscipit scelerisque.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Cras a mi commodo, pretium velit et, posuere mauris.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Fusce eget magna ultrices, pretium orci malesuada, consequat nulla.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Morbi consequat erat vel nulla porta ultricies.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Fusce vehicula augue eget cursus venenatis.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Fusce sed velit at mi ullamcorper mattis.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Phasellus id diam sodales, mollis ipsum vel, ultricies nulla.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus sollicitudin leo vitae commodo. Quisque suscipit risus ac elit venenatis, sed tincidunt sem tempor. Curabitur lobortis mattis bibendum. Donec cursus mattis pharetra. Cras non mi varius, eleifend turpis sit amet, semper lorem. Curabitur condimentum diam scelerisque ex maximus dignissim. Vivamus pretium rutrum sodales. Maecenas imperdiet enim et lectus vestibulum, sit amet ultricies ex fringilla.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    }
];

const Conversation = () => {
    let otherUser = "Anonymous";

    return (
        <AppConsumer>
            {({
                conSettingsModalDisplayed,
                toggleConSettingsModal,
                userInformation
            }) => {
                return (
                    <div className="frightbar">
                        <div className="frightbar-top">
                            <div>
                                <UserAvatar username={otherUser} />
                                {otherUser}
                                <Tip
                                    updated={true}
                                    color="#82D455"
                                    title={"Online"}
                                />
                            </div>
                            <div>
                                <Icon
                                    icon={"fas fa-link"}
                                    title="Share conversation"
                                    style={{ cursor: "pointer" }}
                                />

                                <Icon
                                    icon={"fas fa-cog"}
                                    title={"Conversation Settings"}
                                    onClick={e => toggleConSettingsModal(e)}
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                        </div>
                        <div className="frightbar-inner">
                            {testMessages.map(messageEntry => {
                                return (
                                    <Message
                                        key={uuidv4()}
                                        type={
                                            userInformation.displayName &&
                                            userInformation.displayName
                                                ? userInformation.displayName
                                                : "Undefined"
                                        }
                                        from={
                                            messageEntry.user === 1
                                                ? otherUser
                                                : userInformation.displayName
                                        }
                                        timestamp={messageEntry.timestamp}
                                        message={messageEntry.message}
                                    />
                                );
                            })}
                        </div>
                        <SpeakBar />
                        <Modal
                            style={{
                                display:
                                    conSettingsModalDisplayed &&
                                    conSettingsModalDisplayed === true
                                        ? "flex"
                                        : "none"
                            }}
                        >
                            <ConversationSettings
                                close={toggleConSettingsModal}
                            />
                        </Modal>
                    </div>
                );
            }}
        </AppConsumer>
    );
};

const ConversationSettings = ({ close }) => {
    return (
        <div
            className="modal-container"
            onClick={e => {
                return false;
            }}
        >
            <div>
                <Icon icon="fas fa-exclamation" color={"#F36060"} />{" "}
                <span>
                    You are updating or editing settings for Conversation ID -{" "}
                    <b>3DRFT&GY*</b>.
                </span>
            </div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                }}
            >
                <div>
                    <div>
                        <label htmlFor="private-key">Display Name</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="private-key"
                            className="text-input"
                            placeholder="Display name for this conversation."
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="private-key">Private Key</label>
                    </div>
                    <div>
                        <input
                            type="password"
                            className="text-input"
                            name="private-key"
                            placeholder="Used to encrypt and decrypt messages."
                        />
                    </div>
                </div>
                <div className="buttons-wrapper">
                    <button className="button" onClick={close}>
                        Close
                    </button>
                    <button className="button quest">Leave Conversation</button>
                    <button className="button inform">Update</button>
                </div>
            </form>
        </div>
    );
};

export default Conversation;
