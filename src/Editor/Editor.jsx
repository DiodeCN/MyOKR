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

        <Grid container spacing={2} >
        <Grid item xs={6} style={{maxHeight: '60vh', display: 'flex'}}>
    <TextField
        fullWidth
        multiline
        variant="outlined"
        value={markdownText}
        onChange={(event) => setMarkdownText(event.target.value)}
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
