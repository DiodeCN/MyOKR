import  { useState } from "react";
import { Grid, TextField, Card, CardContent } from "@mui/material";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import WindowLayout from './EditorLayout'; 

function Editor() {
  const [markdownText, setMarkdownText] = useState('FULL TEXT');

  const handleMarkdownChange = (event) => {
    setMarkdownText(event.target.value);
  }

  return (
    <WindowLayout>
      <h1>MyOKR!-ElmCose</h1>
      <div className="card">
        <h2>Advantage is in me...</h2>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            multiline
            rows={10}
            variant="outlined"
            value={markdownText}
            onChange={handleMarkdownChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <ReactMarkdown remarkPlugins={[gfm]} children={markdownText} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </WindowLayout>
  );
}

export default Editor;
