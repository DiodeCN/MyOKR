const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile('http://localhost:3000'); // 替换为你的网页文件路径
}

app.whenReady().then(createWindow);
