import { contextBridge, ipcRenderer } from 'electron'

// ipcs
contextBridge.exposeInMainWorld('electron', {
  getEntries: (page) => (
    ipcRenderer
      .invoke('getEntries', page)
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

  openVid: (data) => (
    ipcRenderer
      .invoke('openVid', data)
      .then((result) => result)
      .catch((e) => e)
  ),

  cropImg: (data, crop) => (
    ipcRenderer
      .invoke('cropImg', data, crop)
      .then((result) => result)
      .catch((e) => e)
  ),

  selectFolder: () => (
    ipcRenderer
      .invoke('selectFolder')
      .then((result) => result)
      .catch((e) => e)
  ),

  getRootFolder: () => (
    ipcRenderer
      .invoke('getRootFolder')
      .then((result) => result)
      .catch((e) => e)
  ),

  setRootFolder: (data) => (
    ipcRenderer
      .invoke('setRootFolder')
      .then((result) => result, data)
      .catch((e) => e)
  ),

  checkRootFolder: (data) => (
    ipcRenderer
      .invoke('checkRootFolder', data)
      .then((result) => result)
      .catch((e) => e)
  ),

  createRootFolder: (data) => (
    ipcRenderer
      .invoke('createRootFolder', data)
      .then((result) => result)
      .catch((e) => e)
  ),

  restartDialog: () => (
    ipcRenderer
      .invoke('restartDialog')
      .then((result) => result)
      .catch((e) => e)
  ),
})
