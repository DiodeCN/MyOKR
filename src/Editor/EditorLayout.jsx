import React from "react";
import CloseButton from '../WinLayout/closeApp'; // Import the CloseButton component
import MaximizeButton from '../WinLayout/maximizeApp'; // Import the MaximizeButton component
import MinimizeButton from '../WinLayout/minimizeApp'; // Import the MinimizeButton component

const WindowLayout = ({children}) => {
    return (
        <>
            <div>
                <CloseButton />
                <MaximizeButton />
                <MinimizeButton />
            </div>
            {children}
        </>
    );
};

export default WindowLayout;
