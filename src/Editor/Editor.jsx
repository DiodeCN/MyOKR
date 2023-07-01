import  { useState } from "react";
import { Box, TextField, Card, CardContent } from "@mui/material";
import { styled } from "@mui/system";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import WindowLayout from './EditorLayout'; 

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
    <WindowLayout>
      <h2>Writing:</h2>


      <Box sx={{ display: 'flex', justifyContent: 'space-around', height: '800px' }}> {/* Replace 800px with your desired fixed height */}
        <Box sx={{ width: '50vw', height: '100%', overflow: 'auto' }}>
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
        <Box sx={{ width: '10vw' }} /> {/* This is the empty element acting as a spacer */}
        <Box sx={{ width: '50vw', height: '100%', overflow: 'auto' }}>
          <TransparentCard>
            <CardContent>
              <ReactMarkdown remarkPlugins={[gfm]} children={markdownText} />
            </CardContent>
          </TransparentCard>
        </Box>
      </Box>
    </WindowLayout>
  );
}

export default Editor;
