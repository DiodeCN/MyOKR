import React, { useState } from 'react';
import { marked } from 'marked';  // Change this line
import './Editor.css';

const Editor = () => {
  const [markdown, setMarkdown] = useState("");

  return (
    <div className="markdown-editor">
      <textarea
        className="input"
        value={markdown}
        onChange={e => setMarkdown(e.target.value)}
      />
      <div
        className="preview"
        dangerouslySetInnerHTML={{__html: marked(markdown)}}
      />
    </div>
  );
};

export default Editor;
