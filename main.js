require('dotenv').config()
const path = require('path')

const {app, BrowserWindow} = require('electron')
const isDev = require('electron-is-dev')

const createWindow = () => {
    console.log("CREATE WINDOW")
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    
    console.log(isDev)

    win.loadURL(
        isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, 'build/index.html')}`
    )
    if(isDev){
        win.webContents.openDevTools({mode: 'detach'})
    }
}

app.whenReady().then(() => {
    createWindow()
})

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow()
    }
})