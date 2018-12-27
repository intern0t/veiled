import React from "react";
import Message from "./Message";
import uuidv4 from "uuid/v4";

const testMessages = [
    {
        timestamp: 1545861486,
        message: "Hello, this is a test message.",
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        timestamp: 1545861486,
        message: "Hello, this is a test message.",
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        timestamp: 1545861486,
        message: "Hello, this is a test message.",
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        timestamp: 1545861486,
        message: "Hello, this is a test message.",
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        timestamp: 1545861486,
        message: "Hello, this is a test message.",
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        timestamp: 1545861486,
        message: "Hello, this is a test message.",
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        timestamp: 1545861486,
        message: "Hello, this is a test message.",
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        timestamp: 1545861486,
        message: "Hello, this is a test message.",
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        timestamp: 1545861486,
        message: "Hello, this is a test message.",
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        timestamp: 1545861486,
        message: "Hello, this is a test message.",
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        timestamp: 1545861486,
        message: "Hello, this is a test message.",
        user: Math.floor(Math.random() * Math.floor(2))
    }
];

const Frightbar = () => {
    return (
        <div className="frightbar">
            <div className="frightbar-inner">
                {testMessages.map(messageEntry => {
                    return (
                        <Message
                            key={uuidv4()}
                            type=""
                            from={
                                messageEntry.user === 1 ? "Nischal" : "Prashant"
                            }
                            timestamp={messageEntry.timestamp}
                            message={messageEntry.message}
                        />
                    );
                })}
            </div>
            <div className="speakbar">
                <input type="text" placeholder="Type your message here .." />
            </div>
        </div>
    );
};

export default Frightbar;
