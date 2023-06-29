import React from 'react';
import IconButton from '@mui/material/IconButton';
import MinimizeIcon from '@mui/icons-material/Minimize';

const MinimizeButton = () => {

    const minimizeApp = () => {
        const electron = window.require('electron');
        electron.ipcRenderer.send('minimize-app');
    }

    return (
        <IconButton onClick={minimizeApp} style={{ position: 'absolute', right: 80, top: 0 }}>
            <MinimizeIcon />
        </IconButton>
    );
}

export default MinimizeButton;
