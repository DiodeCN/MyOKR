import React, { useState, useRef, useEffect } from "react";


const fetchWithTimeout = (url, options, timeout = 60000) => {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error("服务器超时请检查配置")), timeout);
        fetch(url, options).then(
            response => {
                clearTimeout(timer);
                resolve(response);
            },
            err => {
                clearTimeout(timer);
                reject(err);
            }
        );
    });
};

export const uploadSingleFile = async (file, index, articleType, setMarkdownText) => {
    const loadingImagePlaceholder = `![loading${index}](loading.jpg)\n\n`; // 加载中的占位符
    const failedImageLink = `![failed${index}](failed.jpg)\n\n`; // 上传失败的图片

    // 在开始上传前，插入加载中的占位符
    setMarkdownText(currentText => `${currentText}${loadingImagePlaceholder}`);

    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetchWithTimeout(
            `${articleType}upload`,
            {
                method: "POST",
                body: formData,
            },
            120000 // 120秒超时
        );

        if (response.ok) {
            const data = await response.text();
            if (data.startsWith("上传成功：")) {
                const filename = data.substring("上传成功：".length);
                const uploadedImageLink = `![photo${index}](${articleType}share/${filename})\n\n`;

                // 替换加载中的占位符为上传成功的图片链接
                setMarkdownText(currentText => currentText.replace(loadingImagePlaceholder, uploadedImageLink));
            } else {
                throw new Error("上传未成功，服务器未返回成功消息");
            }
        } else {
            throw new Error("上传失败，服务器响应异常");
        }
    } catch (error) {
        console.error("上传错误:", error);
        // 替换加载中的占位符为上传失败的图片链接
        setMarkdownText(currentText => currentText.replace(loadingImagePlaceholder, failedImageLink));
        throw error; // 重新抛出错误，以便外部捕获
    }
};

export const uploadFileToServer = async (articleType, uploadQueue, setUploadQueue, setErrorMessage, setOpenErrorSnackbar, setMarkdownText) => {
    if (articleType === "") {
        setErrorMessage("笨蛋，你还没有选择上传服务器!");
        setOpenErrorSnackbar(true);
        return;
    }

    for (let i = 0; i < uploadQueue.length; i++) {
        try {
            await uploadSingleFile(uploadQueue[i], i, articleType, setMarkdownText);
            console.log(`文件 ${uploadQueue[i].name} 上传成功`);
        } catch (error) {
            setErrorMessage(error.message);
            setOpenErrorSnackbar(true);
            // 如果上传失败，不再继续上传后续文件
            break;
        }
    }

    // 所有文件尝试上传后（无论成功或失败），清空队列
    setUploadQueue([]);
};