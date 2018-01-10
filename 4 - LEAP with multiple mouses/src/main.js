const { app, BrowserWindow } = require('electron')
const electron = require('electron')
const { ipcMain } = require('electron');
const path = require('path')
const url = require('url')

let win

function createWindow() {

  const screen = electron.screen.getPrimaryDisplay();

  win = new BrowserWindow({
    transparent: true, /* Very slow! */
    frame: false,
    toolbar: false,
    alwaysOnTop: true,
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.webContents.openDevTools()
  win.setIgnoreMouseEvents(true);

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('move', (event, args) => {
  if (win != null) {
    win.setBounds(args)
  }
})

