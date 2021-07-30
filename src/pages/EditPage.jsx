/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import toast, { Toaster } from 'react-hot-toast'

// top bar component
import ManagerBar from '../components/EntryManager/ManagerBar.jsx'

// input components
import EntryType from '../components/EntryManager/EntryType.jsx'
import Episodic from '../components/EntryManager/Episodic.jsx'
import EntryName from '../components/EntryManager/EntryName.jsx'
import EntryStatus from '../components/EntryManager/EntryStatus.jsx'
import EntryDescription from '../components/EntryManager/EntryDescription.jsx'
import EntryTags from '../components/EntryManager/EntryTags.jsx'
import EntryCreator from '../components/EntryManager/EntryCreator.jsx'
import EntryFiles from '../components/EntryManager/EntryFiles.jsx'
import EntryCovers from '../components/EntryManager/EntryCovers.jsx'
import EntrySource from '../components/EntryManager/EntrySource.jsx'

function EditPage() {
  const { id } = useParams()

  const [entryName, setEntryName] = useState('')
  const [entryDesc, setEntryDesc] = useState('')
  const [entryCreators, setEntryCreators] = useState([{ id: uuid(), name: '' }])
  const [entrySources, setEntrySources] = useState([{ id: uuid(), name: '' }])
  const [entryTags, setEntryTags] = useState([])
  const [entryFiles, setEntryFiles] = useState([])

  // series / short / shot
  const [entryType, setEntryType] = useState('series')

  // yes - episodic / no - fragmented
  const [seriesEpisodic, setSeriesEpisodic] = useState('yes')

  // releasing / finished / abandoned / irrelevant
  const [entryStatus, setEntryStatus] = useState('releasing')

  // scroll to top on react-router page change
  useEffect(() => {
    window.scrollTo(0, 0)

    window.electron.getEntry({ id }).then((e) => {
      setEntryName(e.name)
      setEntryDesc(e.description)
      setEntryType(e.type)
      setSeriesEpisodic(e.episodic)
      setEntryStatus(e.status)
      console.log(e.status)
      console.log(entryStatus)

      setEntryCreators(e.creators.map((creator) => ({
        id: uuid(),
        name: creator,
      })))

      setEntrySources(e.sources.map((source) => ({
        id: uuid(),
        name: source,
      })))

      setEntryTags(e.tags.map((tag) => ({
        name: tag,
      })))

      setEntryFiles(e.files)
    })
  }, [])

  const history = useHistory()

  const saveData = () => {
    const newEntry = {}
    const toastStyles = css`
      p {
        color: #ffffffde;
        font-size: 18px;
      }
      button {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        opacity: 0;
      }
    `

    if (entryName === '') {
      toast((t) => (
        <div css={toastStyles}>
          <p>Entry name input field is empty. Please fill it to continue</p>
          <button type="button" onClick={() => toast.dismiss(t.id)}>close</button>
        </div>
      ), {
        style: {
          border: '1px solid #e7363667',
          padding: 4,
          background: '#182536',
          borderRadius: 1,
          minHeight: 50,
          maxWidth: 600,
          top: 700,
        },
        duration: 4000,
      })
      return
    }

    if (entryCreators[0].name === '') {
      toast((t) => (
        <div css={toastStyles}>
          <p>First creator input field is empty. Add at least one to continue</p>
          <button type="button" onClick={() => toast.dismiss(t.id)}>close</button>
        </div>
      ), {
        style: {
          border: '1px solid #e7363667',
          padding: 4,
          background: '#182536',
          borderRadius: 1,
          minHeight: 50,
          maxWidth: 600,
          top: 700,
        },
        duration: 4000,
      })
      return
    }

    if (entrySources[0].name === '') {
      toast((t) => (
        <div css={toastStyles}>
          <p>No source has been added. If you are unsure of what to add. Enter &apos;multiple&apos; and call it quits</p>
          <button type="button" onClick={() => toast.dismiss(t.id)}>close</button>
        </div>
      ), {
        style: {
          border: '1px solid #e7363667',
          padding: 4,
          background: '#182536',
          borderRadius: 1,
          minHeight: 50,
          maxWidth: 600,
          top: 700,
        },
        duration: 4000,
      })
      return
    }

    if (entryTags.length === 0) {
      toast((t) => (
        <div css={toastStyles}>
          <p>No tags have been added. Add at least one to continue</p>
          <button type="button" onClick={() => toast.dismiss(t.id)}>close</button>
        </div>
      ), {
        style: {
          border: '1px solid #e7363667',
          padding: 4,
          background: '#182536',
          borderRadius: 1,
          minHeight: 50,
          maxWidth: 600,
          top: 700,
        },
        duration: 4000,
      })
      return
    }

    if (entryFiles.length === 0) {
      toast((t) => (
        <div css={toastStyles}>
          <p>No entry files have been added. Add at least one to continue</p>
          <button type="button" onClick={() => toast.dismiss(t.id)}>close</button>
        </div>
      ), {
        style: {
          border: '1px solid #e7363667',
          padding: 4,
          background: '#182536',
          borderRadius: 1,
          minHeight: 50,
          maxWidth: 600,
          top: 700,
        },
        duration: 4000,
      })
      return
    }

    if (entryFiles.filter((file) => !file.cover_path).length > 0) {
      toast((t) => (
        <div css={toastStyles}>
          <p>Please make sure all entry files have cover images</p>
          <button type="button" onClick={() => toast.dismiss(t.id)}>close</button>
        </div>
      ), {
        style: {
          border: '1px solid #e7363667',
          padding: 4,
          background: '#182536',
          borderRadius: 1,
          minHeight: 50,
          maxWidth: 600,
          top: 700,
        },
        duration: 4000,
      })
      return
    }

    if (entryDesc === '') {
      newEntry.description = null
    } else {
      newEntry.description = entryDesc
    }

    newEntry.name = entryName
    newEntry.type = entryType
    newEntry.tags = entryTags.map((tag) => tag.name)
    newEntry.creators = entryCreators.map((creator) => creator.name)
    newEntry.sources = entrySources.map((source) => source.name)
    newEntry.date_added = new Date()
    newEntry.last_updated = new Date()
    newEntry.files = entryFiles

    if (entryType === 'series') {
      newEntry.episodic = seriesEpisodic
      newEntry.status = entryStatus
    } else {
      newEntry.episodic = null
      newEntry.status = null
    }

    window.electron.updateEntry(id, newEntry)
      .then((resp) => {
        console.log(resp)
        history.goBack()
      })
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <ManagerBar save={saveData} page="edit" />

      <Toaster
        position="top-right"
        containerStyle={{
          top: 80,
          zIndex: 4,
          padding: 0,
        }}
      />

      <div className="options">
        <EntryType type={entryType} setType={setEntryType} files={entryFiles} />

        {(entryType === 'series') ? <Episodic type={seriesEpisodic} setType={setSeriesEpisodic} files={entryFiles} /> : ''}

        <EntryName name={entryName} setName={setEntryName} type={entryType} />

        {(entryType === 'series') ? <EntryStatus type={entryStatus} setType={setEntryStatus} /> : ''}

        <EntryCreator names={entryCreators} setNames={setEntryCreators} />

        <EntryDescription desc={entryDesc} setDesc={setEntryDesc} />

        <EntrySource sources={entrySources} setSources={setEntrySources} />

        <EntryTags tags={entryTags} setTags={setEntryTags} />

        <EntryFiles episodic={seriesEpisodic} type={entryType} files={entryFiles} setFiles={setEntryFiles} />

        <EntryCovers files={entryFiles} setFiles={setEntryFiles} />
      </div>
    </div>
  )
}

export default EditPage
