import { contextBridge, ipcRenderer } from 'electron'

// ipcs
contextBridge.exposeInMainWorld('electron', {
  getEntries: () => (
    ipcRenderer
      .invoke('getEntries')
      .then((result) => result)
      .catch((e) => e)
  ),

  setEntry: (data) => (
    ipcRenderer
      .invoke('setEntry', data)
      .then((result) => result)
      .catch((e) => e)
  ),

  getEntry: (data) => (
    ipcRenderer
      .invoke('getEntry', data)
      .then((result) => result)
      .catch((e) => e)
  ),

  updateEntry: (id, data) => (
    ipcRenderer
      .invoke('updateEntry', id, data)
      .then((result) => result)
      .catch((e) => e)
  ),
})
