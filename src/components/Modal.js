import React, { Component } from "react";

class Modal extends Component {
    render() {
        const { children } = this.props;
        return (
            <div className="modal" {...this.props}>
                {children}
            </div>
        );
    }
}

export default Modal;
