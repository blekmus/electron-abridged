import { ipcMain, app } from 'electron'
import { mkdir, readdir, copy } from 'fs-extra'
import { join } from 'path'
import low from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'
import FileSync from 'lowdb/adapters/FileSync'
import lodashId from 'lodash-id'

const appDBAdapter = new FileSync(join(app.getPath('userData'), 'appdata.json'))
const appDB = low(appDBAdapter)

const entriesAdapter = new FileAsync(join(appDB.get('settings.rootFolder').value(), 'entries.json'))

low(entriesAdapter).then((db) => {
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

  // get entries
  ipcMain.handle('getEntries', async (_e, page) => {
    let entries

    if (page === 'index') {
      entries = await db.get('entries').value()
    }

    if (page === 'series') {
      entries = await db.get('entries').filter({ type: 'series' }).value()
    }

    if (page === 'short') {
      entries = await db.get('entries').filter({ type: 'short' }).value()
    }

    if (page === 'shot') {
      entries = await db.get('entries').filter({ type: 'shot' }).value()
    }

    return entries
  })

  // get root folder
  ipcMain.handle('getRootFolder', async () => {
    const loc = appDB.get('settings.rootFolder').value()
    return loc
  })

  // check if supplied folder has the necessary dirs
  ipcMain.handle('checkRootFolder', async (_e, data) => {
    let files

    try {
      files = await readdir(data)
    } catch (err) {
      return {
        success: false,
        issues: err,
      }
    }

    // check if all primary dirs and files exist
    if (!files.includes('Series') || !files.includes('Shorts') || !files.includes('Shots')) {
      return {
        success: false,
        issues: 'PRIMARY_DIRS_MISSING',
      }
    }
    return {
      success: true,
      issues: null,
    }
  })

  // update the appDB rootFolder and copy files
  ipcMain.handle('setRootFolder', async (_e, data) => {
    // get old location
    const loc = appDB.get('settings.rootFolder').value()

    try {
      // copy entry files and entryDB to new dest
      await copy(loc, data, { preserveTimestamps: true })
    } catch (err) {
      return {
        success: false,
        issues: err,
      }
    }

    // save new location
    appDB.get('settings').set('rootFolder', data).write()

    return {
      success: true,
      issues: null,
    }
  })

  // create rootFolder sub folders
  ipcMain.handle('createRootFolder', async (_e, data) => {
    try {
      await mkdir(`${data}/Series`)
      await mkdir(`${data}/Shorts`)
      await mkdir(`${data}/Shots`)
    } catch (err) {
      return {
        success: false,
        issues: err,
      }
    }

    return {
      success: true,
      issues: null,
    }
  })
})

// JSON Generator template

// JG.repeat(
//   50,
//   {
//     id: JG.guid(),

//     description: JG.loremIpsum({
//       sentenceLowerBound: 5,
//       sentenceUpperBound: 50
//     }),

//     name: JG.loremIpsum({ units: 'words', count: JG.integer(1, 3) }),

//     creators: JG.repeat(
//       JG.integer(1, 2),
//       JG.firstName()
//     ),

//     sources: JG.repeat(
//       JG.integer(1, 3),
//       JG.company()
//     ),

//     type: JG.random('series', 'short', 'shot'),

//     tags: JG.repeat(
//       JG.integer(1, 3),
//       JG.loremIpsum({ units: 'words', count: 1 })
//     ),

//     date_added: JG.date(),

//     date_updated: JG.date(),

//     episodic: JG.random('yes', 'no'),

//     status: JG.random(
//       'finished',
//       'releasing',
//       'abandoned',
//       'irrelevant'
//     ),
//   }
// );
