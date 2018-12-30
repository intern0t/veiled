import React, { Component } from "react";

class Icon extends Component {
    render() {
        const { icon, color } = this.props;
        return <span className={icon} style={{ color }} {...this.props} />;
    }
}

export default Icon;
