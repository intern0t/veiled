import React, { Component } from "react";
import "./styles/veiled.min.css";
import Icon from "./components/Icon";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="main-container">
                    <div className="sidebar">
                        {/* <div className="sidebar-section">Logo</div> */}
                        <ul className="sidebar-section">
                            <li>
                                <a href="/">
                                    <Icon icon="fas fa-comment" color="" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <Icon icon="fas fa-box" color="" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <Icon icon="fas fa-envelope" color="" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <Icon icon="fas fa-bug" color="" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    {" "}
                                    <Icon icon="fas fa-cogs" color="" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="brightbar">2</div>
                    <div className="frightbar">3</div>
                </div>
            </div>
        );
    }
}

export default App;
