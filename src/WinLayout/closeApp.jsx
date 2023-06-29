import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CloseButton = () => {

    const closeApp = () => {
        const electron = window.require('electron');
        electron.ipcRenderer.send('close-app');
    }

    return (
        <IconButton onClick={closeApp} style={{ position: 'absolute', right: 0, top: 0 }}>
            <CloseIcon />
        </IconButton>
    );
}

export default CloseButton;
