import  { useState } from "react";
import { Box, TextField, Card, CardContent, Typography } from "@mui/material";
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
      <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', position: 'fixed', bottom: 0, width: '100%', height: '80vh' }}>
        <Box sx={{ width: '45vw', overflow: 'auto' }}>
          <TextField
            multiline
            rowsMax={Infinity}
            variant="outlined"
            value={markdownText}
            onChange={handleMarkdownChange}
            fullWidth
            InputProps={{ style: { color: '#ffffff' } }}
          />
        </Box>
        <Box sx={{ width: '10vw' }} /> 
        <Box sx={{ width: '45vw', overflow: 'auto' }}>
          <TransparentCard>
            <CardContent>
            <ReactMarkdown remarkPlugins={[gfm]}>{markdownText}</ReactMarkdown>
            </CardContent>
          </TransparentCard>
        </Box>
      </Box>
    </>
  );
}

export default Editor;
