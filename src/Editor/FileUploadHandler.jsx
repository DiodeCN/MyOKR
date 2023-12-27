import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
// import { uploadFileToServer, testServerConnection } from '../utils/serverUtils'; // 假设这些函数已实现

const FileUploadHandler = ({ selectedServer, onUploadSuccess }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileDrop = async (files) => {
    if (!selectedServer) {
      setOpen(true);
      return;
    }

    const isConnected = await testServerConnection(selectedServer);
    if (!isConnected) {
      setOpen(true);
      return;
    }

    // 上传文件并处理返回结果
    const response = await uploadFileToServer(files[0], selectedServer);
    onUploadSuccess(response);
  };

  return (
    <>
      <div onDrop={(e) => {
        e.preventDefault();
        handleFileDrop(e.dataTransfer.files);
      }} onDragOver={(e) => e.preventDefault()}>
        {/* 拖拽区域的UI */}
      </div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>服务器连接问题</DialogTitle>
        <DialogContent>请检查服务器设置。</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>关闭</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FileUploadHandler;
