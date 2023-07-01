import  { useState } from "react";
import { Box, TextField, Card, CardContent, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import CloseButton from '../WinLayout/closeApp'; 
import MaximizeButton from '../WinLayout/maximizeApp'; 
import MinimizeButton from '../WinLayout/minimizeApp'; 

const TransparentCard = styled(Card)(({ theme }) => ({
  backgroundColor: "transparent",
  color: "#ffffff"
}));

const StyledBox = styled(Box)({
  borderRadius: 8, 
  boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)', // 使用硬编码的阴影样式
});

function Editor() {
  const [markdownText, setMarkdownText] = useState('FULL TEXT');
  const [title, setTitle] = useState('No Title!'); 

  const handleMarkdownChange = (event) => {
    setMarkdownText(event.target.value);
  }

  const handleTitleChange = (event) => { 
    setTitle(event.target.value);
  }

  return (
    <>
      <Box sx={{display: 'flex', alignItems: 'center', marginTop: '10vh'}}>
        <h2 style={{ position: 'absolute', left: 10, top: -5, borderRadius: 8, backgroundColor: 'transparent', boxShadow: 'none' }}>Title:</h2>
        <Typography variant="h3" component="div" style={{ position: 'absolute', left: 80, top: 5, borderRadius: 8, backgroundColor: 'transparent', boxShadow: 'none' }}> 
          <TextField value={title} onChange={handleTitleChange} InputProps={{ style: { color: '#ffffff' } }} />
        </Typography>
        <CloseButton />
        <MaximizeButton />
        <MinimizeButton />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', position: 'fixed', bottom: 0, width: '100%' }}>
        <StyledBox sx={{ width: '45vw', overflow: 'auto' }}>
          <TextField
            multiline
            rowsMax={Infinity}
            variant="outlined"
            value={markdownText}
            onChange={handleMarkdownChange}
            fullWidth
            InputProps={{ style: { color: '#ffffff' } }}
          />
        </StyledBox>
        <Box sx={{ width: '10vw' }} /> 
        <StyledBox sx={{ width: '45vw', overflow: 'auto' }}>
          <TransparentCard>
            <CardContent>
              <ReactMarkdown remarkPlugins={[gfm]} children={markdownText} />
            </CardContent>
          </TransparentCard>
        </StyledBox>
      </Box>
    </>
  );
}

export default Editor;
