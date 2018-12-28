import React from "react";

const UserAvatar = ({ username }) => {
    return (
        <div className="user-avatar">
            <span>{username[0].toUpperCase()}</span>
        </div>
    );
};

export default UserAvatar;
