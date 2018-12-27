import React from "react";
import Icon from "./Icon";
import Tip from "./Tip";

const Sidebar = () => {
    return (
        <div className="sidebar">
            {/* <div className="sidebar-section">Logo</div> */}
            <ul className="sidebar-section">
                <li>
                    <a href="/" title="Conversations">
                        <Tip updated={true} color={"#55A7D4"} />
                        <Icon icon="fas fa-comment" />
                    </a>
                </li>
                <li>
                    <a href="/" title="Archive">
                        <Icon icon="fas fa-box" />
                    </a>
                </li>
                <li>
                    <a href="/" title="Friends">
                        <Tip updated={true} />
                        <Icon icon="fas fa-users" />
                    </a>
                </li>
                <li>
                    <a href="/" title="Settings">
                        <Icon icon="fas fa-cogs" />
                    </a>
                </li>
                <li>
                    <a href="/" title="Report bugs">
                        <Icon icon="fas fa-bug" />
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
