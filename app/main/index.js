const { app, BrowserWindow, globalShortcut } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

const handleIPC = require('./ipc')

const GlobalHotKey = [
    {
        key: 'command+shift+i',
        active() {
            const browserWindow = BrowserWindow.getFocusedWindow();
            if (!browserWindow) return;
            browserWindow.webContents.toggleDevTools();
        }
    }
];

const registerGlobalHotKey = () => {
    for (const hotKey of GlobalHotKey) {
        globalShortcut.register(hotKey.key, hotKey.active);
    }
};


let win
app.on('ready', () => {
    win = new BrowserWindow({
        width: 600,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        show: true,
    })
    if (isDev) {
        win.loadURL('http://localhost:3000')
    } else {
        // 第三章用到
        win.loadFile(path.resolve(__dirname, '../../renderer/pages/main/index.html'))
    }

    handleIPC()
})


app.on('will-quit', () => {
    unregisterGlobalHotKey();
});

app.on('ready', () => {
    registerGlobalHotKey();
});


