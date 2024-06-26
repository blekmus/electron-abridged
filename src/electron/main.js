/* eslint-disable no-undef */
/* eslint-disable global-require */

import { app, BrowserWindow, protocol } from 'electron'
import { join } from 'path'
import low from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'
import { existsSync, readdirSync } from 'fs-extra'

// const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')

// hide content-security-policy warning in console
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true

if (require('electron-squirrel-startup')) {
  app.quit()
}

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#0B1622',
    autoHideMenuBar: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      // nodeIntegration: true
    },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  mainWindow.webContents.openDevTools()

  // ipcs
  require('./modules/database')
  require('./modules/media')
  require('./modules/images')
  require('./modules/general')
}

const createSetupWindow = () => {
  const setupWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#0B1622',
    autoHideMenuBar: true,
    webPreferences: {
      preload: SETUP_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  setupWindow.loadURL(SETUP_WINDOW_WEBPACK_ENTRY)
  setupWindow.webContents.openDevTools()
}

const createWindow = async () => {
  // createMainWindow()
  const appDBPath = join(app.getPath('userData'), 'appdata.json')

  const adapter = new FileAsync(appDBPath)
  const appDB = await low(adapter)

  if (!existsSync(appDBPath)) {
    appDB.defaults({ settings: { rootFolder: '/home/walker/Sandbox/Abridged' } }).write()
    createSetupWindow()
  } else {
    // simply if any issues arise go to the setup page.
    let dir
    try {
      dir = appDB.get('settings.rootFolder').value()
    } catch {
      createSetupWindow()
      return
    }

    // check if root folder exists in appDB
    if (dir === '' || dir === undefined) {
      createSetupWindow()
      return
    }

    let files
    try {
      files = readdirSync(dir)
    } catch (err) {
      console.log(err)
      return
    }

    // check if all primary dirs and files exist in appDB root folder
    if (!files.includes('Series') || !files.includes('Shorts') || !files.includes('Shots')) {
      createSetupWindow()
      return
    }

    createMainWindow()
  }
}

app.on('ready', createWindow)

app.whenReady().then(() => {
  // const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')
  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err))

  protocol.registerFileProtocol('absfile', (request, callback) => {
    const url = request.url.replace('absfile://', '')
    try {
      return callback(url)
    } catch (error) {
      console.error(error)
      return callback(404)
    }
  })
})
