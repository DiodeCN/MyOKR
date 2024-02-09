import CloseButton from "../WinLayout/closeApp";
import MaximizeButton from "../WinLayout/maximizeApp";
import CouldDrag from "../WinLayout/couldDrag"; // Import the couldDrag component
import MinimizeButton from "../WinLayout/minimizeApp";
import rehypeRaw from "rehype-raw";
import Shortcut from "./ShortCut";
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

import React, { useState, useRef, useEffect } from "react";


const EditorUI = ({ docTitle, handleInsertClick, markdownText,setIsAddressValid, handleCopyToClipboard,textAreaRef,previewRef,handleSubmit,isAddressValid,setMarkdownText, handleFileDrop, handleFileSelect, fileInputRef, handleButtonClick, servers, articleType, isAddingNew, newServer, setNewServer, handleConfirmNewServer, handleArticleTypeChange, handleOpen, handleClose, open, mdDocument, openSnackbar, handleCloseSnackbar, openErrorSnackbar, errorMessage, setOpenErrorSnackbar }) => {
    return (
        <>
        {" "}
        <CouldDrag />
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
              <div>
                <TextField
                  variant="standard"
                  value={docTitle} // 使用状态更新输入框的值
                  flex="flex"
                  InputProps={{
                    style: {
                      height: "3vh",
                      width: "100%",
                    },
                  }}
                />
              </div>
  
              {/* 容器用于按钮 */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button onClick={() => handleInsertClick("# 标题\n\n")}>
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
                variant="filled"
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
                }}
                InputProps={{
                  disableUnderline: true,
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

export default EditorUI;
