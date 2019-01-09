import React from "react";

const UserAvatar = ({ username, color, title }) => {
    return (
        <div
            className="user-avatar"
            style={{
                background: color ? color : "#303841",
                border: "1px solid rgba(153, 168, 180, .3)",
                cursor: "pointer"
            }}
            title={title ? title : ""}
        >
            <span style={{ color: "#f2f7f7" }}>
                {username[0].toUpperCase()}
            </span>
        </div>
    );
};

export default UserAvatar;
