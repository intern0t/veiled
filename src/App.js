import React, { Component } from "react";
import "./styles/veiled.min.css";
import Sidebar from "./components/Sidebar";
import Brightbar from "./components/Brightbar";
import Frightbar from "./components/Frightbar";
import { AppProvider } from "./contexts/AppProvider";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="main-container">
                    <AppProvider>
                        <Sidebar />
                        <Brightbar />
                        <Frightbar />
                    </AppProvider>
                </div>
            </div>
        );
    }
}

export default App;
