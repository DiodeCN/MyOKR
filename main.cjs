const { app, BrowserWindow, ipcMain } = require('electron')
let win;

function createWindow () {
  // Calculate window size based on screen size
  const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({
    width: Math.max(Math.round(width * 0.6), 800),
    height: Math.max(Math.round(height * 0.8), 600),
    frame: false,
    titleBarStyle: 'hidden',
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })

  win.loadURL('http://127.0.0.1:5173/')

  ipcMain.on('close-app', () => {
    if (win) {
      win.close()
    }
  })

  ipcMain.on('maximize-app', () => {
    if (win) {
      if (win.isMaximized()) {
        win.unmaximize()
      } else {
        win.maximize()
      }
    }
  })

  ipcMain.on('minimize-app', () => {
    if (win) {
      win.minimize()
    }
  })
}

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
