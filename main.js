require('dotenv').config()
const path = require('path')

const {app, BrowserWindow, ipcMain} = require('electron')
const isDev = require('electron-is-dev')

const { exec } = require('node:child_process')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadURL(
        isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, 'build/index.html')}`
    )
    if(isDev){
        win.webContents.openDevTools({mode: 'detach'})
    }
}

ipcMain.on('launch', (e, url) => {
    const command = `start "" "${url}"`
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    })
})

app.whenReady().then(() => {
    createWindow()
})

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow()
    }
})