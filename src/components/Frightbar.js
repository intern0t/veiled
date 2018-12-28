import React from "react";
import Message from "./Message";
import uuidv4 from "uuid/v4";
import Icon from "./Icon";
import UserAvatar from "./UserAvatar";
import Tip from "./Tip";

const testMessages = [
    {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Nulla gravida sem ut consequat lobortis.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Sed molestie odio quis fermentum dictum.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Nullam auctor orci eu enim ornare accumsan.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Nunc pellentesque lorem in justo lacinia, maximus congue purus viverra.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Mauris consequat dui sit amet consequat porta.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Fusce rhoncus libero at tellus condimentum, non scelerisque erat pharetra.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Sed ultricies felis nec lectus vulputate ullamcorper.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Fusce accumsan lectus vel lectus facilisis sagittis.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "In dignissim felis vel nunc tempus facilisis.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Pellentesque posuere nisl vel rhoncus convallis.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Donec suscipit justo vel pulvinar luctus.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Sed sed sapien eu leo pellentesque tincidunt mattis iaculis risus.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Aenean id lectus mattis, scelerisque magna at, efficitur nisi.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Suspendisse eu mauris tristique, suscipit lorem in, viverra odio.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Sed malesuada tortor in cursus laoreet.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Vestibulum vel mauris tempor, vestibulum justo nec, euismod arcu.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Praesent nec velit eu mauris pharetra accumsan.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Aenean nec lacus vestibulum nisi vulputate egestas pretium sit amet ante.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Sed ut velit euismod, eleifend magna eu, congue metus.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Aenean non felis nec nisi malesuada vulputate eu et enim.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Ut vulputate lacus tincidunt bibendum accumsan.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Nam rhoncus enim vitae odio lacinia, non vulputate sapien consequat.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Vivamus bibendum magna mattis tortor varius volutpat.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Aenean in ante in leo mattis viverra.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Donec molestie orci eget placerat elementum.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Nullam eu odio ut nisi posuere ultrices non quis ipsum.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Donec condimentum dui eget sem mattis faucibus.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Aliquam ac elit in augue rhoncus egestas vel at purus.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Donec sagittis arcu et est malesuada fringilla.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Ut vel leo posuere, fermentum nisl eu, porta odio.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Mauris nec ex non augue feugiat placerat.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Quisque dictum eros dapibus rhoncus sodales.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Aliquam porta quam nec ante bibendum, vel porta ligula faucibus.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Integer blandit nibh ut nulla semper, sed aliquam neque tempor.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Donec dictum arcu nec justo hendrerit, vel rutrum nulla viverra.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Aenean ac arcu eu odio scelerisque fermentum ut vel enim.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Praesent eleifend dolor feugiat tempus blandit.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Integer sit amet odio tincidunt, dictum mi non, dignissim justo.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Mauris consectetur arcu nec lobortis tempus.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Sed et justo tincidunt, cursus odio vestibulum, gravida nisl.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Morbi sit amet dolor tincidunt, hendrerit nisi ac, tincidunt erat.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Ut eget neque id nibh consectetur scelerisque.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Etiam id erat sed velit feugiat imperdiet ut id sapien.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Sed nec urna congue, malesuada ligula at, bibendum sapien.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Vestibulum eu erat sollicitudin lacus ullamcorper auctor ac id libero.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Quisque a diam id tortor pulvinar porta.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Nam porta nulla eget vehicula dapibus.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Maecenas non mauris quis nisi elementum viverra.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Proin commodo erat et diam hendrerit tristique.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Phasellus congue velit vitae lectus congue consequat.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Phasellus eu sapien mattis, ullamcorper sapien nec, lacinia sem.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Etiam ultrices mi sodales pulvinar porttitor.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Nullam eu orci nec leo fermentum vehicula.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Aenean eget diam a justo vehicula vehicula ut nec metus.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Curabitur in nisl ut purus suscipit sollicitudin eget ac ligula.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Praesent eu leo sagittis, cursus velit eu, tincidunt turpis.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Suspendisse vel nibh sed quam iaculis mollis.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Vestibulum lacinia lectus nec condimentum fringilla.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Cras sit amet elit posuere, rhoncus nisi vel, feugiat mi.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Pellentesque pretium orci eget eros venenatis ullamcorper.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Integer vestibulum purus convallis dui feugiat, ac consectetur risus tempor.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Vivamus cursus arcu finibus, ornare sapien eu, pellentesque lectus.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Aenean ultricies augue id suscipit scelerisque.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Cras a mi commodo, pretium velit et, posuere mauris.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Fusce eget magna ultrices, pretium orci malesuada, consequat nulla.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Morbi consequat erat vel nulla porta ultricies.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Fusce vehicula augue eget cursus venenatis.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message: "Fusce sed velit at mi ullamcorper mattis.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Phasellus id diam sodales, mollis ipsum vel, ultricies nulla.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    },
    {
        message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus sollicitudin leo vitae commodo. Quisque suscipit risus ac elit venenatis, sed tincidunt sem tempor. Curabitur lobortis mattis bibendum. Donec cursus mattis pharetra. Cras non mi varius, eleifend turpis sit amet, semper lorem. Curabitur condimentum diam scelerisque ex maximus dignissim. Vivamus pretium rutrum sodales. Maecenas imperdiet enim et lectus vestibulum, sit amet ultricies ex fringilla.",
        timestamp: 0,
        user: Math.floor(Math.random() * Math.floor(2))
    }
];

const Me = "Prashant";

const Frightbar = () => {
    let otherUser = "Nischal Shrestha";

    return (
        <div className="frightbar">
            <div className="frightbar-top">
                <UserAvatar username={otherUser} />
                {otherUser}
                <Tip updated={true} color="#82D455" title={"Online"} />
            </div>
            <div className="frightbar-inner">
                {testMessages.map(messageEntry => {
                    return (
                        <Message
                            key={uuidv4()}
                            type={Me}
                            from={
                                messageEntry.user === 1 ? otherUser : Me
                            }
                            timestamp={messageEntry.timestamp}
                            message={messageEntry.message}
                        />
                    );
                })}
            </div>
            <div className="speakbar">
                <input type="text" placeholder="Type your message here .." />
                <ul>
                    <li>
                        <a href="/">
                            <Icon icon="fas fa-paperclip" />
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <Icon icon="fas fa-file-image" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Frightbar;
