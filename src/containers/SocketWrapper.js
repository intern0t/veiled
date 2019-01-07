import React, { Component } from "react";
import { ConversationConsumer } from "../contexts/ConversationProvider";

class SocketWrapper extends Component {
    render() {
        const { children } = this.props;
        return <React.Fragment>{children}</React.Fragment>;
    }
}

SocketWrapper.contextType = ConversationConsumer;
export default SocketWrapper;
