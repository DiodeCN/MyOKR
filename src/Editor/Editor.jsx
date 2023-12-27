import CloseButton from "../WinLayout/closeApp";
import MaximizeButton from "../WinLayout/maximizeApp";
import CouldDrag from '../WinLayout/couldDrag'; // Import the couldDrag component
import MinimizeButton from "../WinLayout/minimizeApp";
import FileUploadHandler from '../Editor/FileUploadHandler';

import React, { useState, useRef, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";

import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const insertTextAtEnd = (textArea, newText) => {
  const { value } = textArea;
  textArea.value = value + newText;
};

const Editor = () => {

  useEffect(() => {
    // 页面初始化时尝试连接到RESTful服务器
    fetch("http://localhost:6222/api/connect")
      .then((response) => {
        if (response.ok) {
          return response.text();  // 解析为文本响应而不是JSON
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        console.log(data);  // 打印成功的文本信息
      })
      .catch((error) => {
        console.error("连接失败:", error);  // 打印错误信息
      });
  }, []);
  

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newServer, setNewServer] = useState("");
  const [isAddressValid, setIsAddressValid] = useState(true);

  const [servers, setServers] = useState(() => {
    // 从localStorage获取保存的服务器列表
    const saved = localStorage.getItem("servers");
    return saved ? JSON.parse(saved) : [];
  });

  const handleConfirmNewServer = () => {
    const isValidAddress = /^(http:\/\/|https:\/\/|(\d{1,3}\.){3}\d{1,3})/.test(newServer);
    if (!isValidAddress) {
      setIsAddressValid(false);  // 如果地址格式不正确，设置状态为 false
      return;  // 不继续执行后续的添加服务器逻辑
    }
    setIsAddressValid(true);  // 如果地址格式正确，继续执行添加服务器的逻辑
  
    const updatedServers = [...servers, newServer];
    setServers(updatedServers);
    localStorage.setItem("servers", JSON.stringify(updatedServers));
    setArticleType(newServer);
    setIsAddingNew(false);
    setNewServer("");
  };
  

  

  const handleFileDrop = (event) => {
    console.log("fuck you");
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      FileUploadHandler(file, handleUploadSuccess); // 使用您的FileUploadHandler处理文件
    }
  };

  const handleUploadSuccess = (serverResponse) => {
    // 插入返回的信息到文本编辑框
    insertTextAtEnd(textAreaRef.current, serverResponse);
  };

  const handleArticleTypeChange = (event) => {
    if (event.target.value === "新增") {
      setIsAddingNew(true);
    } else {
      setArticleType(event.target.value);
    }
  };



  const [articleType, setArticleType] = useState("");
  const [open, setOpen] = useState(false);
  const mdDocument = `
# 榆法糖-MyOKR！

## 想做给博客的Markdown编辑器来着，结果不小心做成OKR乐！
`;

const [markdownText, setMarkdownText] = useState("");
const previewRef = useRef(null);

useEffect(() => {
  if (previewRef.current) {
    previewRef.current.scrollTop = previewRef.current.scrollHeight;
  }
}, [markdownText]);

  const textAreaRef = React.createRef();


  const handleInsertClick = (insertion, id) => {
    const textArea = textAreaRef.current;
    if (textArea) {
      const { selectionStart, selectionEnd } = textArea;
      
      insertTextAtEnd(textArea, `${insertion}{#${id}}\n\n`);
      setMarkdownText(textArea.value);
  
      // Restore cursor position.
      textArea.selectionStart = selectionStart;
      textArea.selectionEnd = selectionEnd;
    }
  };
  
  const markdownRef = useRef(null);

  useEffect(() => {
    if (markdownRef.current) {
      setMarkdownHeight(`${markdownRef.current.getBoundingClientRect().height}px`);
    }
  }, [markdownText]);



  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSubmit = () => {
    // 在这里处理提交逻辑
  };

  return (
    <>
      <CouldDrag />
      <CloseButton />
      <MaximizeButton />
      <MinimizeButton />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
          margin: "0 auto"
        }}
      >
        <Grid item xs={12} sx={{ flexGrow: 1 }}>
          <AppBar
            position="sticky"
            color="transparent"
            elevation={0}
            style={{
              borderRadius: 8,
              backgroundColor: "transparent",
              boxShadow: "none"
            }}
          >
            <Toolbar>
              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                文本编辑
              </Typography>
              <Button onClick={() => handleInsertClick("# 芝士H1 标题\n\n")}>
                H1
              </Button>
              <Button onClick={() => handleInsertClick("## 芝士H2 标题\n\n")}>
                H2
              </Button>
              <Button onClick={() => handleInsertClick("### 芝士H3 标题\n\n")}>
                H3
              </Button>
              <Button onClick={() => handleInsertClick("**芝士粗体**")}>
                粗体
              </Button>
              <Button onClick={() => handleInsertClick("_芝士斜体_")}>
                斜体
              </Button>
              <Button onClick={() => handleInsertClick("~~芝士删除线~~")}>
                删除线
              </Button>
              <Button onClick={() => handleInsertClick("\n\n- 芝士列表项")}>
                列表项
              </Button>
              <Button
                onClick={() => handleInsertClick("\n\n1. 芝士有序列表项")}
              >
                有序列表项
              </Button>
            </Toolbar>
          </AppBar>
        </Grid>

        <Grid container spacing={2} >
        <Grid item xs={6} style={{maxHeight: '60vh', display: 'flex'}}>
    <TextField
        fullWidth
        multiline
        variant="outlined"
        value={markdownText}
        onChange={(event) => setMarkdownText(event.target.value)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        style={{
            maxHeight: '60vh',
            minHeight: '60vh',
            minWidth: '35vh',
            maxWidth: '45vh',
            overflow: 'auto',
            backgroundColor: 'rgba(255,255,255,0.3)', 
            borderRadius: '10px', 
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            backdropFilter: 'blur(4px)', 
            border: '1px solid rgba(255,255,255,0.18)', 
            flexGrow: 10,
            display: 'flex',
            flexDirection: 'column'
        }}
    />
</Grid>


      <Grid item xs={6}>
        <div
          className="view"
          ref={previewRef}
          style={{
            minHeight: '60vh',
            maxHeight: "60vh",
            width: "100%",
            minWidth: '35vh',
            maxWidth: '45vh',
            overflowX: "hidden",
            overflowY: "auto",
            backgroundColor: 'rgba(255,255,255,0.3)', // Add this
            borderRadius: '10px', // Add this
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', // Add this
            backdropFilter: 'blur(4px)', // Add this
            border: '1px solid rgba(255,255,255,0.18)', // Add this
            flexGrow: 1, // Add this
            display: 'flex', // Add this
            flexDirection: 'column', // Add this
            textAlign: "left"  // Make content align left

          }}
        >
          <ReactMarkdown remarkPlugins={[gfm]} children={markdownText} />
        </div>
      </Grid>
    </Grid>

    <Grid item xs={6}>

    <FormControl fullWidth sx={{ marginTop: "1rem" }}>
        <InputLabel id="article-type-label">上传服务器</InputLabel>
        {isAddingNew ? (
          <>
            <TextField
              value={newServer}
              onChange={(e) => setNewServer(e.target.value)}
            />
<Button
  variant="contained"
  sx={{ 
    minWidth: "48px",
    height: "48px",
    padding: 0,
    boxShadow: "none",  // 移除阴影
    backgroundColor: "#99CCFF",  // 设置按钮颜色为红色
    '&:hover': {
      backgroundColor: "#f7a8b8",  // 鼠标悬停时的颜色变化
      boxShadow: "none"  // 确保悬停时不显示阴影
    }
  }}
  onClick={handleConfirmNewServer}
>
确认
</Button>


          </>
        ) : (
          <Select
            labelId="article-type-label"
            id="article-type-select"
            value={articleType}
            onChange={handleArticleTypeChange}
          >
            {servers.map((server, index) => (
              <MenuItem key={index} value={server}>
                {server}
              </MenuItem>
            ))}
            <MenuItem value="新增">新增</MenuItem>
          </Select>
        )}
      </FormControl>

      </Grid>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleOpen}
          sx={{ marginTop: "1rem" }}
        >
          关于
        </Button>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginTop: "1rem" }}
        >
          发送
        </Button>
      </Box>

      <Dialog open={!isAddressValid} onClose={() => setIsAddressValid(true) }>
  <DialogTitle>{"无效的服务器地址"}</DialogTitle>
  <IconButton
            id="view"
            edge="end"
            color="inherit"
            onClick={() => setIsAddressValid(true)}
            aria-label="close"
            sx={{
              position: "absolute",
              right: "8px",
              top: "8px",
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
            </IconButton> 
  <DialogContent>
    <DialogContent>
      <h2>请检查服务器地址格式</h2>
      地址应以 "http://" 或 "https://" 开头
      ,或者是一个有效的 IPv4 地址。
    </DialogContent>
  </DialogContent>
  <DialogActions>
  </DialogActions>
</Dialog>




<Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
  <DialogTitle>
    关于
    <IconButton
      id="view"
      edge="end"
      color="inherit"
      onClick={handleClose}
      aria-label="close"
      sx={{
        position: "absolute",
        right: "8px",
        top: "8px",
        color: (theme) => theme.palette.grey[500]
      }}
    >
      <CloseIcon />
    </IconButton> 
  </DialogTitle>
  <DialogContent 
    dividers 
    sx={{ overflow: "hidden", maxWidth: "100%" }}
  >
    <ReactMarkdown remarkPlugins={[gfm]} children={mdDocument} />
  </DialogContent>
  <DialogActions>
  </DialogActions>
</Dialog>







    </>
  );
};

export default Editor;
