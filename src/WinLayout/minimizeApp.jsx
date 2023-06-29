import React from 'react';
import IconButton from '@mui/material/IconButton';
import MinimizeIcon from '@mui/icons-material/Minimize';

const MinimizeButton = () => {

    const minimizeApp = () => {
        const electron = window.require('electron');
        electron.ipcRenderer.send('minimize-app');
    }

    return (
        <IconButton
            onClick={minimizeApp}
            variant="text"
            className="button-icon"
            style={{
                position: 'absolute',
                right: 80,
                top: 5,
                borderRadius: 8, // 设置圆角半径
                backgroundColor: 'transparent',
                boxShadow: 'none'
            }}
        >
            <MinimizeIcon />
        </IconButton>
    );
}

export default MinimizeButton;
