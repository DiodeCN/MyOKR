import React from 'react';
import IconButton from '@mui/material/IconButton';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const MaximizeButton = () => {

    const maximizeApp = () => {
        const electron = window.require('electron');
        electron.ipcRenderer.send('maximize-app');
    }

    return (
        <IconButton
            onClick={maximizeApp}
            variant="text"
            className="button-icon"
            style={{
                position: 'absolute',
                right: 45,
                top: 5,
                borderRadius: 8, // 设置圆角半径
                backgroundColor: 'transparent',
                boxShadow: 'none',
                outline: 'none', // 这行代码移除了焦点轮廓
            }}
        >
            <FullscreenIcon />
        </IconButton>
    );
}

export default MaximizeButton;
