// Basic init
const electron = require('electron')
const {app, BrowserWindow, ipcMain} = electron

const writeNote = require('./workers/write-note')

// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname)

// To avoid being garbage collected
let mainWindow

app.on('ready', () => {

    mainWindow = new BrowserWindow({width: 800, height: 600})

    mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    console.log('slkdfsweojweofijwoeifjwoeifj')
    ipcMain.on('note-updated', writeNote)

})
