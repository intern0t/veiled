import React, { Component } from "react";

class Contact extends Component {
    render() {
        return (
            <div className="frightbar">
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLScT0dWjUGYBOoSWU1OovHAXTJ0lQFVdevqGjpLNGiZ7SnJOTw/viewform?embedded=true"
                    width="auto"
                    height="100%"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                    style={{ margin: "20px 0"}}
                    title={"Project Veiled Contact Form"}
                >
                    Loading...
                </iframe>
            </div>
        );
    }
}

export default Contact;
