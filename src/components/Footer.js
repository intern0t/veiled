import React from "react";
import Tip from "./Tip";

const Footer = () => {
    return (
        <div className="footer">
            <span>
                <Tip
                    updated={true}
                    color={"lime"}
                    style={{
                        display: "block",
                        position: "relative",
                        marginRight: "10px"
                    }}
                />
                <b>Connected</b>
            </span>
            <span>
                Copyright &copy; 2018, <a href="/">Veiled</a>
            </span>
        </div>
    );
};

export default Footer;
