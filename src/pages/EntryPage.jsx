/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

// components
import EntryHeader from '../components/EntryPage/EntryHeader.jsx'
import EntryBar from '../components/EntryPage/EntryBar.jsx'
import EntryInfo from '../components/EntryPage/EntryInfo.jsx'
import EntryFiles from '../components/EntryPage/EntryFiles.jsx'

function EntryPage() {
  const styles = css`
  `

  const { id } = useParams({})
  const [entry, setEntry] = useState()

  useEffect(() => {
    window.electron.getEntry({ id }).then((e) => setEntry(e))
    window.scrollTo(0, 0)
  }, [])

  return (
    <div css={styles}>
      <EntryHeader image={entry?.files[0].cover_path} title={entry?.name} creators={entry?.creators} />

      <EntryBar type={entry?.type} id={entry?.id} status={entry?.status} episodic={entry?.episodic} />

      <EntryInfo tags={entry?.tags} description={entry?.description} sources={entry?.sources} />

      <EntryFiles type={entry?.type} files={entry?.files} />
    </div>
  )
}

export default EntryPage
