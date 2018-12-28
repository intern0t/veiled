import React, { Component } from "react";

export default class MainContainer extends Component {
    render() {
        const { children } = this.props;
        return <div className="main-container">{children}</div>;
    }
}
