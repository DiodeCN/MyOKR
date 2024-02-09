import React from 'react';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import GitHubIcon from '@mui/icons-material/GitHub'; // 导入GitHub图标

const HomeButton = () => {
    // 跳转到主页的函数
    const goToHome = () => {
        window.location.href = '/'; // 假设你的主页路径是根路径
    };

    // 跳转到GitHub主页的函数
    const goToGitHub = () => {
        window.open('https://github.com/DiodeCN', '_blank'); // 使用'_blank'在新标签页中打开链接
    };
    

    return (
        <div>
            {/* 主页按钮 */}
            <IconButton
                onClick={goToHome} // 使用goToHome函数
                variant="text"
                className="button-icon"
                style={{
                    position: 'absolute',
                    right: 125,
                    top: 5,
                    borderRadius: 8,
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    outline: 'none',
                }}
            >
                <HomeIcon />
            </IconButton>
            {/* GitHub按钮 */}
            <IconButton
                onClick={goToGitHub} // 使用goToGitHub函数
                variant="text"
                className="button-icon"
                style={{
                    position: 'absolute',
                    right: 165, // 调整位置以避免与主页按钮重叠
                    top: 5,
                    borderRadius: 8,
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    outline: 'none',
                }}
            >
                <GitHubIcon />
            </IconButton>
        </div>
    );
}

export default HomeButton;
