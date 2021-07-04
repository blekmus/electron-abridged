import { ipcMain } from 'electron'

const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
const lodashId = require('lodash-id')

const adapter = new FileAsync('entries.json')

low(adapter).then((db) => {
  // id support from lodash-id
  db._.mixin(lodashId)

  // create json with defaults missing
  db.defaults({ entries: [] }).write()

  // set new entry
  ipcMain.handle('setEntry', async (_e, data) => {
    const entry = await db.get('entries').insert(data).write()
    return entry
  })

  // update entry with new data
  ipcMain.handle('updateEntry', async (_e, id, data) => {
    const entry = await db.get('entries').updateById(id, data).write()
    return entry
  })

  // get specific entry
  ipcMain.handle('getEntry', async (_e, data) => {
    const entry = await db.get('entries').find(data).value()
    return entry
  })

  // get all entries
  ipcMain.handle('getEntries', async () => {
    const entries = await db.get('entries').value()
    return entries
  })
})
