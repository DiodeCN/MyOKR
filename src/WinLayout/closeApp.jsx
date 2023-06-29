import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CloseButton = () => {

    const closeApp = () => {
        const electron = window.require('electron');
        electron.ipcRenderer.send('close-app');
    }

    return (
        <IconButton
            onClick={closeApp}
            variant="text"
            className="button-icon"
            style={{
                position: 'absolute',
                right: 5,
                top: 5,
                borderRadius: 8, // 设置圆角半径
                backgroundColor: 'transparent',
                boxShadow: 'none'
            }}
        >
            <CloseIcon />
        </IconButton>
    );
}

export default CloseButton;
