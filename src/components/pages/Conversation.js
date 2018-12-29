import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import Message from "../Message";
import UserAvatar from "../UserAvatar";
import Tip from "../Tip";
import { AppConsumer } from "../../contexts/AppProvider";
import SpeakBar from "../SpeakBar";

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

const Conversation = ({ page, onPageChange }) => {
    let otherUser = "Nischal Shrestha";
    // onPageChange(page);

    return (
        <AppConsumer>
            {({ userInformation }) => {
                return (
                    <div className="frightbar">
                        <div className="frightbar-top">
                            <UserAvatar username={otherUser} />
                            {otherUser}
                            <Tip
                                updated={true}
                                color="#82D455"
                                title={"Online"}
                            />
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
                    </div>
                );
            }}
        </AppConsumer>
    );
};

export default Conversation;
