import CloseButton from "../WinLayout/closeApp";
import MaximizeButton from "../WinLayout/maximizeApp";
import CouldDrag from "../WinLayout/couldDrag"; // Import the couldDrag component
import MinimizeButton from "../WinLayout/minimizeApp";
import rehypeRaw from 'rehype-raw';

import React, {useState, useRef, useEffect} from "react";
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
    Snackbar,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";

import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const insertTextAtEnd = (textArea, newText) => {
    const {value} = textArea;
    textArea.value = value + newText;
};

const Editor = () => {

    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newServer, setNewServer] = useState("");
    const [isAddressValid, setIsAddressValid] = useState(true);

    const handleInsertClick = (insertText) => {
        // Assuming markdownText is the current state of the text area
        const currentText = markdownText;

        // Assuming textAreaRef is a ref to your text area
        const selectionStart = textAreaRef.current.selectionStart;

        // Insert the new text at the cursor position
        const newText = currentText.substring(0, selectionStart) + insertText;

        // Update the markdown text
        setMarkdownText(newText);

        // Update the cursor position after state update
        setTimeout(() => {
            if (textAreaRef.current) {
                textAreaRef
                    .current
                    .focus();
            }
            const newCursorPos = selectionStart + insertText.length;
            textAreaRef
                .current
                .setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const fetchWithTimeout = (url, options, timeout = 3000) => {
        return new Promise((resolve, reject) => {
            fetch(url, options).then(resolve, reject);
            setTimeout(() => reject(new Error('服务器超时请检查配置')), timeout);
        });
    };

    const [servers, setServers] = useState(() => {
        // 从localStorage获取保存的服务器列表
        const saved = localStorage.getItem("servers");
        return saved
            ? JSON.parse(saved)
            : [];
    });

    const handleConfirmNewServer = () => {
        const isValidAddress = /^(http:\/\/|https:\/\/|(\d{1,3}\.){3}\d{1,3})/.test(
            newServer
        );
        if (!isValidAddress) {
            setIsAddressValid(false); // 如果地址格式不正确，设置状态为 false
            return; // 不继续执行后续的添加服务器逻辑
        }
        setIsAddressValid(true); // 如果地址格式正确，继续执行添加服务器的逻辑

        const updatedServers = [
            ...servers,
            newServer
        ];
        setServers(updatedServers);
        localStorage.setItem("servers", JSON.stringify(updatedServers));
        setArticleType(newServer);
        setIsAddingNew(false);
        setNewServer("");
    };

    const handleFileDrop = (event) => {
        console.log("文件拖拽");
        event.preventDefault();
        event.stopPropagation();

        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const file = event
                .dataTransfer
                .files[0];
            uploadFileToServer(file); // 新增的上传函数
        }
    };

    const uploadFileToServer = (file) => {
        const formData = new FormData();
        formData.append("file", file);

        fetchWithTimeout(articleType + "/upload", {
            method: "POST",
            body: formData
        }, 3000) // 3000 milliseconds timeout
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('上传失败');
                }
            })
            .then(data => {
                console.log(data);
                if (data.startsWith("上传成功：")) {
                    const filename = data.substring("上传成功：".length);
                    if (/\.(jpg|jpeg|png|gif)$/i.test(filename)) {
                        const markdownImageString = `![photo](${articleType}/share/${filename})`;
                        handleInsertClick(markdownImageString);
                    }
                }
            })
            .catch(error => {
                console.error('上传错误:', error);
                setErrorMessage(error.message);
                setOpenErrorSnackbar(true);
            });
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

    const textAreaRef = useRef(null);

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

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCopyToClipboard = () => {
        if (textAreaRef.current) {
            navigator
                .clipboard
                .writeText(markdownText)
                .then(() => {
                    console.log("复制成功：", markdownText);
                    setOpenSnackbar(true); // 成功时打开 Snackbar
                })
                .catch(err => {
                    console.error('复制失败:', err);
                });
        } else {
            console.error('文本区域的引用未定义');
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <> < CouldDrag /> <CloseButton/>
        <MaximizeButton/>
        <MinimizeButton/>
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                width: "100%",
                margin: "0 auto"
            }}>
            <Grid
                item="item"
                xs={12}
                sx={{
                    flexGrow: 1
                }}>
                <AppBar
                    position="sticky"
                    color="transparent"
                    elevation={0}
                    style={{
                        borderRadius: 8,
                        backgroundColor: "transparent",
                        boxShadow: "none"
                    }}>
                    <Toolbar>
                        <Typography
                            variant="h5"
                            sx={{
                                flexGrow: 1
                            }}>
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
                        <Button onClick={() => handleInsertClick("\n\n1. 芝士有序列表项")}>
                            有序列表项
                        </Button>
                        <Button onClick={handleCopyToClipboard}>
                            复制文本
                        </Button>

                    </Toolbar>
                </AppBar>
            </Grid>

            <Grid container="container" spacing={2}>
                <Grid
                    item="item"
                    xs={6}
                    style={{
                        maxHeight: "60vh",
                        display: "flex"
                    }}>
                    <TextField
                        spellCheck={false}
                        fullWidth="fullWidth"
                        multiline="multiline"
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
                            flexDirection: "column"
                        }}
                        InputProps={{
                            disableUnderline: true
                        }}/>
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
                        }}>
                        <ReactMarkdown
                            remarkPlugins={[gfm]}
                            children={markdownText}
                            rehypePlugins={[rehypeRaw]}/>
                    </div>
                </Grid>
            </Grid>

            <Grid item="item" xs={6}>
                <FormControl
                    fullWidth="fullWidth"
                    sx={{
                        marginTop: "1rem"
                    }}>
                    <InputLabel id="article-type-label">上传服务器</InputLabel>
                    {
                        isAddingNew
                            ? (
                                <> < TextField value = {
                                    newServer
                                }
                                spellCheck = {
                                    false
                                }
                                onChange = {
                                    (e) => setNewServer(e.target.value)
                                } /> <Button
                                    variant="contained"
                                    sx={{
                                        minWidth: "48px",
                                        height: "48px",
                                        padding: 0,
                                        boxShadow: "none", // 移除阴影
                                        backgroundColor: "#99CCFF", // 设置按钮颜色为红色
                                        "&:hover" : {
                                            backgroundColor: "#f7a8b8", // 鼠标悬停时的颜色变化
                                            boxShadow: "none", // 确保悬停时不显示阴影
                                        }
                                    }}
                                    onClick={handleConfirmNewServer}>
                                    确认
                                </Button>
                            </>
                            )
                            : (
                                <Select
                                    labelId="article-type-label"
                                    id="article-type-select"
                                    value={articleType}
                                    onChange={handleArticleTypeChange}>
                                    {
                                        servers.map((server, index) => (
                                            <MenuItem key={index} value={server}>
                                                {server}
                                            </MenuItem>
                                        ))
                                    }
                                    <MenuItem value="新增">新增</MenuItem>
                                </Select>
                            )
                    }
                </FormControl>
            </Grid>

            <Button
                fullWidth="fullWidth"
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{
                    marginTop: "1rem"
                }}>
                关于
            </Button>

            <Button
                fullWidth="fullWidth"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{
                    marginTop: "1rem"
                }}>
                发送
            </Button>
        </Box>

        <Dialog open={!isAddressValid} onClose={() => setIsAddressValid(true)}>
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
                    color: (theme) => theme
                        .palette
                        .grey[500]
                }}>
                <CloseIcon/>
            </IconButton>
            <DialogContent>
                <DialogContent>
                    <h2>请检查服务器地址格式</h2>
                    地址应以 "http://" 或 "https://" 开头 ,或者是一个有效的 IPv4 地址。
                </DialogContent>
            </DialogContent>
            <DialogActions></DialogActions>
        </Dialog>

        <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth="fullWidth">
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
                        color: (theme) => theme
                            .palette
                            .grey[500]
                    }}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent
                dividers="dividers"
                sx={{
                    overflow: "hidden",
                    maxWidth: "100%"
                }}>
                <ReactMarkdown remarkPlugins={[gfm]} children={mdDocument}/>
            </DialogContent>
            <DialogActions></DialogActions>
        </Dialog>

        <Snackbar open={openSnackbar} autoHideDuration={600} onClose={handleCloseSnackbar} anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            // Basic positioning
            sx={{
                top: {
                    sm: 70
                } // Additional offset from the top for small and up screen sizes
            }} message="复制成功" ContentProps={{
                sx: {
                    backgroundColor: 'green', // Red background color
                }
            }} action={<React.Fragment > <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackbar}>
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>}/>

        <Snackbar open={openErrorSnackbar} autoHideDuration={3000} onClose={() => setOpenErrorSnackbar(false)} message={errorMessage} anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            // Basic positioning
            sx={{
                top: {
                    sm: 70
                } // Additional offset from the top for small and up screen sizes
            }} ContentProps={{
                sx: {
                    backgroundColor: 'red', // Red background color
                }
            }} action={<React.Fragment > <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setOpenErrorSnackbar(false)}>
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>}/>

    </>
    );
};

export default Editor;
