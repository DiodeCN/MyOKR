import  { useState } from "react";
import { Box, TextField, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import CloseButton from '../WinLayout/closeApp'; // Import the CloseButton component
import MaximizeButton from '../WinLayout/maximizeApp'; // Import the MaximizeButton component
import MinimizeButton from '../WinLayout/minimizeApp'; // Import the MinimizeButton component

const TransparentCard = styled(Card)(({ theme }) => ({
  backgroundColor: "transparent",
  color: "#ffffff"
}));

function Editor() {
  const [markdownText, setMarkdownText] = useState('FULL TEXT');
  const [title, setTitle] = useState('No Title!'); // Added state for the title

  const handleMarkdownChange = (event) => {
    setMarkdownText(event.target.value);
  }

  const handleTitleChange = (event) => { // Added handler for the title
    setTitle(event.target.value);
  }

  return (
    <>
      <Box sx={{display: 'flex', alignItems: 'center', marginTop: '10vh'}}>
        <h2 style={{position: 'absolute', left: 10, top: -5, borderRadius: 8, backgroundColor: 'transparent', boxShadow: 'none'}}>Title:</h2>
        <Typography variant="h3" component="div" style={{position: 'absolute', left: 80, top: 5, borderRadius: 8, backgroundColor: 'transparent', boxShadow: 'none'}}>
          <TextField value={title} onChange={handleTitleChange} InputProps={{ style: { color: '#ffffff' } }} />
        </Typography>
        <CloseButton />
        <MaximizeButton />
        <MinimizeButton />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column', minHeight: '80vh'}}>
        <Box sx={{ width: '50vw', overflow: 'auto', marginTop: 'auto' }}>
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
        <Box sx={{ width: '50vw', overflow: 'auto' }}>
          <TransparentCard>
            <CardContent>
              <ReactMarkdown remarkPlugins={[gfm]} children={markdownText} />
            </CardContent>
          </TransparentCard>
        </Box>
      </Box>
    </>
  );
}

export default Editor;
