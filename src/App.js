import React, { Component } from "react";
import "./styles/veiled.min.css";
import Routes from "./contexts/Routes";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Routes />
            </div>
        );
    }
}

export default App;
