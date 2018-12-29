import React, { Component } from "react";
import Conversation from "./pages/Conversation";
import Settings from "./pages/Settings";
import Bugs from "./pages/Bugs";
import Archive from "./pages/Archive";
import { AppConsumer } from "../contexts/AppProvider";

class Frightbar extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        const { match } = this.props;
        let currentPage = (match && match.path) || "/conversation";
        if (currentPage !== nextProps.match.path) {
            return true;
        }
        return false;
    }

    render() {
        const { match, children } = this.props;
        let currentPage = (match && match.path) || "/conversation";
        console.log(currentPage);
        return <div className="frightbar">{children}</div>;
    }
}

export default Frightbar;
