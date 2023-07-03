import CloseButton from "../WinLayout/closeApp";
import MaximizeButton from "../WinLayout/maximizeApp";
import MinimizeButton from "../WinLayout/minimizeApp";
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
  const [articleType, setArticleType] = useState("");
  const [open, setOpen] = useState(false);
  const mdDocument = `
# 分类细则示例

这是一个示例文档，你可以根据需要替换它的内容。

## 标题 1

内容 1

## 标题 2

内容 2
`;

const [markdownText, setMarkdownText] = useState("");
const previewRef = useRef(null);

useEffect(() => {
  if (previewRef.current) {
    previewRef.current.scrollTop = previewRef.current.scrollHeight;
  }
}, [markdownText]);

  
  

  const textAreaRef = React.createRef();

  const handleTextChange = (event) => {
    setMarkdownText(event.target.value);
  };

  const handleInsertClick = (insertion, id) => {

    const textArea = textAreaRef.current;
    if (textArea) {
      insertTextAtEnd(textArea, `${insertion}{#${id}}\n\n`);
      setMarkdownText(textArea.value);
    }
  };


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleArticleTypeChange = (event) => {
    setArticleType(event.target.value);
  };

  const handleSubmit = () => {
    // 在这里处理提交逻辑
  };

  return (
    <>
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

<Box sx={{}}>
        <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          fullWidth
          multiline
          variant="outlined"
          value={markdownText}
          onChange={(event) => setMarkdownText(event.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <div
          ref={previewRef}
          style={{
            height: "100%",
            width: "100%",
            overflow: "auto",
            border: "1px solid #ddd",
            padding: "10px",
            maxHeight:"80vh"
          }}
        >
          <ReactMarkdown remarkPlugins={[gfm]} children={markdownText} />
        </div>
      </Grid>
    </Grid>
    </Box>

        <FormControl fullWidth sx={{ marginTop: "1rem" }}>
          <InputLabel id="article-type-label">上传服务器</InputLabel>
          <Select
            labelId="article-type-label"
            id="article-type-select"
            value={articleType}
            onChange={handleArticleTypeChange}
          >
            <MenuItem value="新增">新增</MenuItem>
          </Select>
        </FormControl>

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
      <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
        <DialogTitle>
          关于
          <IconButton
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
        <DialogContent dividers sx={{ overflowX: "hidden", maxWidth: "100%" }}>
          <ReactMarkdown remarkPlugins={[gfm]} children={mdDocument} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Editor;
