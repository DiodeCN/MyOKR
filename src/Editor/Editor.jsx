import CloseButton from "../WinLayout/closeApp";
import MaximizeButton from "../WinLayout/maximizeApp";
import HomeButton from "../WinLayout/home";
import CouldDrag from "../WinLayout/couldDrag"; // Import the couldDrag component
import MinimizeButton from "../WinLayout/minimizeApp";
import rehypeRaw from "rehype-raw";
import Shortcut from "./ShortCut";

import React, { useState, useRef, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";

import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";


const Editor = () => {
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newServer, setNewServer] = useState("");
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [uploadQueue, setUploadQueue] = useState([]);
  const [docTitle, setDocTitle] = useState(""); // 新增状态用于存储文档标题

  const handleInsertClick = (insertText) => {
    const selectionStart = textAreaRef.current
      ? textAreaRef.current.selectionStart
      : 0;

    // 使用函数式更新以确保获取到最新的markdownText状态
    setMarkdownText(
      (currentText) => {
        const newText = currentText.substring(0, selectionStart) + insertText;

        // 返回更新后的文本
        return newText;
      },
      () => {
        if (textAreaRef.current) {
          const newCursorPosition = selectionStart + insertText.length;
          textAreaRef.current.selectionStart = newCursorPosition;
          textAreaRef.current.selectionEnd = newCursorPosition;
          textAreaRef.current.focus();
        }
      }
    );
  };

  useEffect(() => {
    // 在组件加载时尝试从localStorage中获取“currentServer”
    const currentServer = localStorage.getItem("currentServer");
    if (currentServer) {
      setArticleType(currentServer); // 设置为当前服务器地址
    }
    // 同时加载保存的服务器列表
    const savedServers = localStorage.getItem("servers");
    if (savedServers) {
      setServers(JSON.parse(savedServers));
    }
  }, []);

  useEffect(() => {
    const totalArticles = localStorage.getItem("totalArticles");
    if (totalArticles === null) {
      localStorage.setItem("totalArticles", 1); // 如果不存在，则初始化为1
      setDocTitle(`未命名文档（1）`); // 设置文档标题
    } else {
      const total = parseInt(totalArticles, 10); // 读取并转换为数字
      setDocTitle(`未命名文档（${total}）`); // 更新文档标题
    }
  }, []);

  const fetchWithTimeout = (url, options, timeout = 60000) => {
    return new Promise((resolve, reject) => {
      fetch(url, options).then(resolve, reject);
      setTimeout(() => reject(new Error("服务器超时请检查配置")), timeout);
    });
  };

  const [servers, setServers] = useState(() => {
    // 从localStorage获取保存的服务器列表
    const saved = localStorage.getItem("servers");
    return saved ? JSON.parse(saved) : [];
  });

  const handleConfirmNewServer = () => {
    const ipv4Pattern = "(\\d{1,3}\\.){3}\\d{1,3}";
    const ipv6Pattern = "([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}";
    const urlPattern = "^(http:\\/\\/|https:\\/\\/)";
    const isValidAddress = new RegExp(
      urlPattern + "|" + ipv4Pattern + "|" + ipv6Pattern
    ).test(newServer);

    if (!isValidAddress) {
      setIsAddressValid(false);
      return;
    }

    let correctedServer = newServer;
    // 检查URL是否以HTTP/HTTPS开头
    if (new RegExp(urlPattern).test(newServer)) {
      // 如果不是以正斜杠结尾，则添加正斜杠
      if (!newServer.endsWith("/")) {
        correctedServer += "/";
      }
    } else {
      // 如果是IP地址，添加http前缀，并确保以正斜杠结尾
      correctedServer = "http://" + newServer;
      if (!newServer.endsWith("/")) {
        correctedServer += "/";
      }
    }

    setIsAddressValid(true);
    const updatedServers = [...servers, correctedServer];
    setServers(updatedServers);
    localStorage.setItem("servers", JSON.stringify(updatedServers));
    localStorage.setItem("currentServer", correctedServer);
    setArticleType(correctedServer);
    setIsAddingNew(false);
    setNewServer("");
  };

  const handleFileDrop = (event) => {
    console.log("文件拖拽");
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      addToUploadQueue(Array.from(event.dataTransfer.files));
    }
  };

  const handleFileSelect = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      addToUploadQueue(Array.from(event.target.files));
    }
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    // 当上传队列改变时，启动上传过程
    if (uploadQueue.length > 0) {
      uploadFileToServer();
    }
  }, [uploadQueue]);

  const addToUploadQueue = (files) => {
    setUploadQueue((prevQueue) => [...prevQueue, ...files]);
  };

  const uploadSingleFile = async (file, index) => {
    const loadingImagePlaceholder = `![loading${index}](loading.jpg)\n\n`; // 加载中的占位符
    const failedImageLink = `![failed${index}](failed.jpg)\n\n`; // 上传失败的图片

    // 在开始上传前，插入加载中的占位符
    setMarkdownText(
      (currentText) => `${currentText}${loadingImagePlaceholder}`
    );

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
          setMarkdownText((currentText) =>
            currentText.replace(loadingImagePlaceholder, uploadedImageLink)
          );
        } else {
          throw new Error("上传未成功，服务器未返回成功消息");
        }
      } else {
        throw new Error("上传失败，服务器响应异常");
      }
    } catch (error) {
      console.error("上传错误:", error);
      // 替换加载中的占位符为上传失败的图片链接
      setMarkdownText((currentText) =>
        currentText.replace(loadingImagePlaceholder, failedImageLink)
      );
      throw error; // 重新抛出错误，以便外部捕获
    }
  };

  const uploadFileToServer = async () => {
    if (articleType === "") {
      setErrorMessage("笨蛋，你还没有选择上传服务器!");
      setOpenErrorSnackbar(true);
      return;
    }

    for (let i = 0; i < uploadQueue.length; i++) {
      try {
        await uploadSingleFile(uploadQueue[i], i);
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

  const handleArticleTypeChange = (event) => {
    const newArticleType = event.target.value;
    if (newArticleType === "新增") {
      setIsAddingNew(true);
    } else {
      setArticleType(newArticleType);
      localStorage.setItem("currentServer", newArticleType);
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
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.scrollTop = previewRef.current.scrollHeight;
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

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCopyToClipboard = () => {
    if (textAreaRef.current) {
      navigator.clipboard
        .writeText(markdownText)
        .then(() => {
          console.log("复制成功：", markdownText);
          setOpenSnackbar(true); // 成功时打开 Snackbar
        })
        .catch((err) => {
          console.error("复制失败:", err);
        });
    } else {
      console.error("文本区域的引用未定义");
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      {" "}
      <CouldDrag />
      <HomeButton />
      <CloseButton />
      <MaximizeButton />
      <MinimizeButton />
      <Shortcut handleInsertClick={handleInsertClick} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <AppBar
          position="sticky"
          color="transparent"
          elevation={0}
          style={{
            borderRadius: 8,
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            {/* 容器用于输入框 */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                variant="standard"
                value={docTitle} // 使用状态更新输入框的值
                flex="flex"
                InputProps={{
                  style: {
                    width: "100%",
                  },
                }}
              />
              .MD
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* 容器用于按钮 */}
              <Button onClick={() => handleInsertClick("\n\n# 标题")}>
                H1
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
              <Button
                onClick={handleCopyToClipboard}
                sx={{
                  color: "white",
                }}
              >
                复制文本
              </Button>
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  multiple
                  style={{ display: "none" }}
                />
                <Button
                  sx={{
                    color: "white",
                  }}
                  onClick={handleButtonClick}
                >
                  选择文件
                </Button>
              </>
            </div>
          </Toolbar>
        </AppBar>

        <Grid container="container" spacing={2}>
          <Grid
            item="item"
            xs={6}
            style={{
              maxHeight: "60vh",
              display: "flex",
            }}
          >
            <TextField
              spellCheck={false}
              multiline
              ref={textAreaRef}
              variant="standard"
              value={markdownText}
              onChange={(event) => setMarkdownText(event.target.value)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              style={{
                maxHeight: "60vh",
                minHeight: "60vh",
                minWidth: "42vh",
                maxWidth: "42vh",
                overflow: "auto",
                backgroundColor: "rgba(255,255,255,0.3)",
                borderRadius: "10px",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(255,255,255,0.18)",
                flexGrow: 100,
                display: "flex",
                flexDirection: "column",
                fontSize: "16px", // 调整此值以更改字体大小
              }}
              InputProps={{
                disableUnderline: true,
                style: { fontSize: "28px" }, // 如果需要，也可以在这里调整输入文本的字体大小
              }}
            />
          </Grid>

          <Grid item="item" xs={6}>
            <div
              className="view"
              ref={previewRef}
              style={{
                minHeight: "60vh",
                maxHeight: "60vh",
                width: "100%",
                minWidth: "42vh",
                maxWidth: "42vh",
                overflowX: "hidden",
                overflowY: "auto",
                backgroundColor: "rgba(255,255,255,0.3)", // Add this
                borderRadius: "10px", // Add this
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)", // Add this
                backdropFilter: "blur(4px)", // Add this
                border: "1px solid rgba(255,255,255,0.18)", // Add this
                flexGrow: 1, // Add this
                display: "flex", // Add this
                flexDirection: "column", // Add this
                textAlign: "left", // Make content align left
              }}
            >
              <ReactMarkdown
                remarkPlugins={[gfm]}
                children={markdownText}
                rehypePlugins={[rehypeRaw]}
              />
            </div>
          </Grid>
        </Grid>

        <Grid item="item" xs={6}>
          <FormControl
            fullWidth
            sx={{
              marginTop: "1rem",
            }}
          >
            <InputLabel id="article-type-label">上传服务器</InputLabel>
            {isAddingNew ? (
              <>
                {" "}
                <TextField
                  value={newServer}
                  spellCheck={false}
                  onChange={(e) => setNewServer(e.target.value)}
                />{" "}
                <Button
                  variant="contained"
                  sx={{
                    minWidth: "48px",
                    height: "48px",
                    padding: 0,
                    boxShadow: "none", // 移除阴影
                    backgroundColor: "#99CCFF", // 设置按钮颜色为红色
                    "&:hover": {
                      backgroundColor: "#f7a8b8", // 鼠标悬停时的颜色变化
                      boxShadow: "none", // 确保悬停时不显示阴影
                    },
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
          sx={{
            marginTop: "1rem",
          }}
        >
          关于
        </Button>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            marginTop: "1rem",
          }}
        >
          保存并发送
        </Button>
      </Box>
      <Dialog open={!isAddressValid} onClose={() => setIsAddressValid(true)}>
        <DialogTitle sx={{ width: "50vw" }}>{"无效的服务器地址"}</DialogTitle>
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
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContent>
            <h1>请检查服务器地址格式</h1>
            地址应以"http://"或"https://"开头,或是一个有效的IPv4/IPv6地址。
            <br />
            其格式应该如https://upload.maoniang.cn:1145/
          </DialogContent>
        </DialogContent>
        <DialogActions></DialogActions>
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
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          dividers="dividers"
          sx={{
            overflow: "hidden",
            maxWidth: "100%",
          }}
        >
          <ReactMarkdown remarkPlugins={[gfm]} children={mdDocument} />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={600}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        // Basic positioning
        sx={{
          top: {
            sm: 70,
          }, // Additional offset from the top for small and up screen sizes
        }}
        message="复制成功"
        ContentProps={{
          sx: {
            backgroundColor: "green", // Red background color
          },
        }}
        action={
          <React.Fragment>
            {" "}
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenErrorSnackbar(false)}
        message={errorMessage}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        // Basic positioning
        sx={{
          top: {
            sm: 70,
          }, // Additional offset from the top for small and up screen sizes
        }}
        ContentProps={{
          sx: {
            backgroundColor: "red", // Red background color
          },
        }}
        action={
          <React.Fragment>
            {" "}
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setOpenErrorSnackbar(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
};

export default Editor;
