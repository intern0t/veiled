import uuidv4 from "uuid/v4";

const generateRandomColorCode = () => {
    return (
        "#" +
        Math.random()
            .toString(16)
            .substr(-6)
    );
};

const generateRoomID = () => {
    return `r-${uuidv4().split("-")[0]}`;
};

export { generateRandomColorCode, generateRoomID };
