const generateRandomColorCode = () => {
    return (
        "#" +
        Math.random()
            .toString(16)
            .substr(-6)
    );
};

export { generateRandomColorCode };
