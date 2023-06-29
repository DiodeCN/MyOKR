import React from 'react';
import IconButton from '@mui/material/IconButton';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const MaximizeButton = () => {

    const maximizeApp = () => {
        const electron = window.require('electron');
        electron.ipcRenderer.send('maximize-app');
    }

    return (
        <IconButton onClick={maximizeApp} style={{ position: 'absolute', right: 40, top: 0 }}>
            <FullscreenIcon />
        </IconButton>
    );
}

export default MaximizeButton;
