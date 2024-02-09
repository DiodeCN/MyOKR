const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

let win;

function createWindow () {
  // Calculate window size based on screen size
  const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({    
    width: Math.max(Math.round(width * 0.4), 600),
    height: Math.max(Math.round(height * 0.75), 800),
    preload: path.join(__dirname, 'preload.js'),
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      backgroundColor: '#00FFFFFF', // Set background color to transparent,
      ignoreCertificateErrors: true, // 添加这一行
    }

  })
//win.setMovable(false);  // 这行代码设置窗口为不可移动
  win.setMenuBarVisibility(false);
  
  const fs = require('fs');
  const windowStatePath = path.join(app.getPath('userData'), 'window-state.json');
  


  win.loadURL('https://localhost:5173/')

  ipcMain.on('set-ignore-mouse-events', (event, ignore, options) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    win.setIgnoreMouseEvents(ignore, options)
  })

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

app.commandLine.appendSwitch('ignore-certificate-errors')
