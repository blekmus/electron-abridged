import { ipcMain, dialog, app } from 'electron'

ipcMain.handle('selectFolder', async () => {
  const dir = await dialog.showOpenDialog({ properties: ['openDirectory'] })
  return dir.filePaths[0]
})

ipcMain.handle('restartDialog', () => {
  dialog.showMessageBox(null, {
    type: 'question',
    buttons: ['Restart'],
    message: 'Restart app for changes to take effect',
  }).then(() => {
    // don't know if this is a dev mode siddiyakda kiyala
    // but when it exits, it literally exits
    app.relaunch()
    app.exit()
  })
})
