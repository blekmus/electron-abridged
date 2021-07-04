/** @jsx jsx */
import { jsx } from '@emotion/react'
import { useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useHistory } from 'react-router-dom'

// top bar component
import AddPageTopBar from '../components/AddPageTopBar.jsx'

// input components
import EntryType from '../components/EntryType.jsx'
import Episodic from '../components/Episodic.jsx'
import EntryName from '../components/EntryName.jsx'
import EntryStatus from '../components/EntryStatus.jsx'
import EntryDescription from '../components/EntryDescription.jsx'
import EntryTags from '../components/EntryTags.jsx'
import EntryCreator from '../components/EntryCreator.jsx'
import EntryFiles from '../components/EntryFiles.jsx'
import EntryCovers from '../components/EntryCovers.jsx'
import EntrySource from '../components/EntrySource.jsx'

function AddPage() {
  const entryName = useRef('')
  const entryDescription = useRef('')
  const [entryCreators, setEntryCreators] = useState([{ id: uuid(), name: '' }])
  const [entrySource, setEntrySource] = useState([{ id: uuid(), name: '' }])
  const [entryTags, setEntryTags] = useState([])
  const [entryFiles, setEntryFiles] = useState([])

  // series / short / shot
  const [entryType, setEntryType] = useState('series')

  // yes - episodic / no - fragmented
  const [seriesEpisodic, setSeriesEpisodic] = useState('yes')

  // releasing / finished / abandoned / irrelevant
  const [entryStatus, setEntryStatus] = useState('abandoned')

  const history = useHistory()

  const saveData = () => {
    if (entryName.current === '') {
      console.log('empty entry name')
      return
    }

    if (entryCreators[0].name === '') {
      console.log('add a creator')
      return
    }

    if (entryDescription.current === '') {
      console.log('empty description')
      return
    }

    if (entrySource[0].name === '') {
      console.log('add a source')
      return
    }

    if (entryTags.length === 0) {
      console.log('atleast add one tag')
      return
    }

    if (entryFiles.length === 0) {
      console.log('add an entry file')
      return
    }

    const newEntry = {}

    newEntry.name = entryName.current
    newEntry.type = entryType
    newEntry.description = entryDescription.current
    newEntry.tags = entryTags
    newEntry.creator = entryCreators
    newEntry.source = entrySource
    newEntry.date_added = new Date()
    newEntry.last_modified = new Date()
    newEntry.files = entryFiles

    if (entryType === 'series') {
      newEntry.episodic = seriesEpisodic
      newEntry.status = entryStatus
    } else {
      newEntry.episodic = null
      newEntry.status = null
    }

    window.electron.setEntry(newEntry)
      .then((resp) => {
        console.log(resp)
        history.goBack()
        // https://github.com/timolins/react-hot-toast
      })
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <AddPageTopBar save={saveData} />

      <div className="options">
        <EntryType type={entryType} setType={setEntryType} files={entryFiles} />

        {(entryType === 'series') ? <Episodic type={seriesEpisodic} setType={setSeriesEpisodic} files={entryFiles} /> : ''}

        <EntryName name={entryName} type={entryType} />

        {(entryType === 'series') ? <EntryStatus type={entryStatus} setType={setEntryStatus} /> : ''}

        <EntryCreator names={entryCreators} setNames={setEntryCreators} />

        <EntryDescription name={entryDescription} />

        <EntrySource sources={entrySource} setSources={setEntrySource} />

        <EntryTags tags={entryTags} setTags={setEntryTags} />

        <EntryFiles episodic={seriesEpisodic} type={entryType} files={entryFiles} setFiles={setEntryFiles} />

        <EntryCovers files={entryFiles} setFiles={setEntryFiles} />
      </div>
    </div>
  )
}

export default AddPage
