import React, { useEffect } from 'react';

const Shortcut = ({ handleInsertClick }) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'F1':
          handleInsertClick('\n\n# 标题');
          break;
        case 'F2':
          handleInsertClick('\n\n## 标题');
          break;
        case 'F3':
          handleInsertClick('\n\n### 标题');
          break;
        case 'F4':
          handleInsertClick('\n\n#### 标题');
          break;
        case 'F5': 
          handleInsertClick('**粗体**');
          break;
        case 'F6':
          handleInsertClick('_斜体_');
          break;
        case 'F7': 
          handleInsertClick('~~删除线~~');
          break;
        case 'F8': 
          handleInsertClick('\n\n-');
          break;
        case 'F9': 
          handleInsertClick('\n\n1.');
          break;       
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleInsertClick]);

  return null;
};

export default Shortcut;
