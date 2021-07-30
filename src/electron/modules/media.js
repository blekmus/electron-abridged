import { ipcMain, shell } from 'electron'

// open video
ipcMain.handle('openVid', async (_e, path) => {
  const resp = await shell.openPath(path)
  return resp
})
