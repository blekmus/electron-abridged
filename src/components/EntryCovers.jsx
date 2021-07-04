/* eslint-disable no-param-reassign */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'

import Cover from './EntryFileCover.jsx'

function EntryCovers({ files, setFiles }) {
  const styles = css`
    position: relative;
    margin-top: 50px;
    margin-bottom: 80px;

    .cont {
      margin-left: 150px;
    }

    h2 {
      font-weight: 600;
      font-size: 21px;
      margin-bottom: 20px;
    }

    .cont-desc {
      margin-top: -15px;
      color: #94989E;
      padding-right: 50px;
      margin-bottom: 20px;
    }

    .line {
      width: 3px;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: #B566AD;
    }

    .covers {
      display: flex;
      flex-wrap: wrap;
      column-gap: 20px;
      max-width: 1000px;
      row-gap: 10px;
    }
  `

  // handle entry cover image input and save path and size to 'files' state
  const handleFileInput = (e, path) => {
    const updatedItem = files.find((file) => file.path === path)
    const filesCopy = [...files]
    filesCopy[files.indexOf(updatedItem)].cover_path = e.target.files[0].path
    filesCopy[files.indexOf(updatedItem)].cover_size = e.target.files[0].size
    setFiles(filesCopy)
  }

  // delete cover file info from 'files' state
  const handleFileDel = (e, path) => {
    const updatedItem = files.find((file) => file.path === path)
    const filesCopy = [...files]
    delete filesCopy[files.indexOf(updatedItem)].cover_path
    delete filesCopy[files.indexOf(updatedItem)].cover_size
    setFiles(filesCopy)
  }

  // create cover input boxes from state
  const covers = files.map((file) => (
    <Cover file={file} key={file.path} handleFileInput={handleFileInput} handleFileDel={handleFileDel} />
  ))

  return (
    <div css={styles}>
      <div className="line" />

      <div className="cont">
        <h2>Covers</h2>
        {(files.length === 0) ? <p className="cont-desc">Add entry files to set covers.</p> : ''}

        <div className="covers">
          {covers}
        </div>
      </div>
    </div>
  )
}

EntryCovers.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    ),
  ).isRequired,
  setFiles: PropTypes.func.isRequired,
}

export default EntryCovers
