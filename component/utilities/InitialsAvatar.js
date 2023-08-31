import React from 'react';

const letterToColor = {
    A: "pink",
    B: "blue",
    C: "green",
    D: "orange",
    E: "purple",
    F: "brown",
    G: "teal",
    H: "lime",
    I: "black",
    J: "gray",
    K: "white",
    L: "yellow",
    M: "magenta",
    N: "cyan",
    O: "red",
    P: "pink",
    Q: "blue",
    R: "green",
    S: "orange",
    T: "purple",
    U: "brown",
    V: "teal",
    W: "lime",
    X: "black",
    Y: "gray",
    Z: "white",
};



const InitialsAvatar = ({ fullName }) => {
    const names = fullName.split(" ");
    return names.map((name) => {
        const initial = name[0].toUpperCase();
        const backgroundColor = letterToColor[initial] || "gray"; // Default to gray if letter doesn't have a color
        return (
            <div
                key={initial}
                className="circle-initial"
                style={{ backgroundColor: backgroundColor }}
            >
                {initial}
            </div>
        );
    });
};

export default InitialsAvatar;
