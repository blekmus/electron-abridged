import { ipcMain, app } from 'electron'
import jimp from 'jimp/es'
import path from 'path'
import { promises as fs } from 'fs'

ipcMain.handle('cropImg', async (_e, coverPath, crop) => {
  const image = await jimp.read(coverPath)
  const parent = path.join(app.getPath('temp'), 'abridged-anime')
  const output = path.join(parent, `${image.hash()}.${image.getExtension()}`)

  await image.crop(crop.x, crop.y, crop.width, crop.height).writeAsync(output)
  const stat = await fs.stat(output)
  return [output, stat.size]
})
