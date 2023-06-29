const { app, BrowserWindow, ipcMain } = require('electron')

let win;  // 定义 win 在全局作用域

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,  // 无边框
    titleBarStyle: 'hidden', // 隐藏标题栏
    resizable: true, // 允许窗口拉伸
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true, // 允许在渲染器进程中使用 remote 模块
    }
  })

  win.loadURL('http://127.0.0.1:5173/')
}

ipcMain.on('close-app', () => {
  if (win) {
    win.close();
  }
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
