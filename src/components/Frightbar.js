import React, { Component } from "react";

class Frightbar extends Component {
    render() {
        const { children } = this.props;
        return <div className="frightbar">{children}</div>;
    }
}

export default Frightbar;
