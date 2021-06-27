const { ipcMain, clipboard } = require('electron')

module.exports = function () {
    ipcMain.handle('login', async () => {
        let code = Math.floor(Math.random() * (999999 - 100000) + 1000000)
        return code
    })
    ipcMain.on('control', async (e, remote) => {
        // 这里是跟服务端的交互，成功后我们会唤起面板
        signal.send('control', { remote })
    })

}

