import React, { Component } from "react";

export default class ConversationContext extends Component {
    state = {
        rooms: [],
        messages: [],
        message: ""
    };

    render() {
        const { rooms, messages, message } = this.state;

        const { children } = this.props;
        return (
            <ConversationContext.Provider
                value={{
                    rooms,
                    messages,
                    message
                }}
            >
                {children}
            </ConversationContext.Provider>
        );
    }
}

export const ConversationContextConsumer = ConversationContext.Consumer;
