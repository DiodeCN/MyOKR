import  { useState } from "react";
import { Box, TextField, Card, CardContent } from "@mui/material";
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

  const handleMarkdownChange = (event) => {
    setMarkdownText(event.target.value);
  }

  return (
      <>
      <h2>Writing:</h2>
      <CloseButton />
      <MaximizeButton />
      <MinimizeButton />
      <Box sx={{ display: 'flex', justifyContent: 'space-around', height: '800px' }}> {/* Replace 800px with your desired fixed height */}
      <Box sx={{ width: '50vw', height: '100%', overflow: 'auto' }}>
        <TextField
          multiline
          rowsMax={Infinity}
          variant="outlined"
          value={markdownText}
          onChange={handleMarkdownChange}
          fullWidth
          InputProps={{ style: { color: '#ffffff' } }} />
      </Box>
      <Box sx={{ width: '10vw' }} /> {/* This is the empty element acting as a spacer */}
      <Box sx={{ width: '50vw', height: '100%', overflow: 'auto' }}>
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
