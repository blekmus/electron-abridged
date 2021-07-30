/** @jsx jsx */
import { css, jsx } from '@emotion/react'
// import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

// components
import SettingsBar from '../components/SettingsPage/SettingsBar.jsx'
import RootFolder from '../components/SettingsPage/RootFolder.jsx'

function EntryPage() {
  const styles = css`
  `

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div css={styles}>
      <SettingsBar />

      <Toaster
        position="top-right"
        containerStyle={{
          top: 80,
          zIndex: 4,
          padding: 0,
        }}
      />

      <div>
        <RootFolder toast={toast} />
      </div>
    </div>
  )
}

export default EntryPage
