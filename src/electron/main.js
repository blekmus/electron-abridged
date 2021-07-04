const { app, BrowserWindow, protocol } = require('electron')
const path = require('path')
// const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')


// hide content-security-policy warning in console
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

if (require('electron-squirrel-startup')) {
  app.quit()
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#0B1622',
    autoHideMenuBar: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  mainWindow.webContents.openDevTools()

  // ipcs
  require('./modules/database')
}

app.on('ready', createWindow)


app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  // const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')
  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err))

  protocol.registerFileProtocol('absfile', (request, callback) => {
    const url = request.url.replace('absfile://', '')
    try {
      return callback(url)
    }
    catch (error) {
      console.error(error)
      return callback(404)
    }
  })
})
