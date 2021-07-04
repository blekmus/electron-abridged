/* eslint-disable react/jsx-props-no-spreading */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
import DraggableFiles from './DraggableFiles.jsx'

function EntryFiles({
  episodic,
  type,
  files,
  setFiles,
}) {
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
      margin-bottom: 15px;
    }

    .line {
      width: 3px;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: #B566AD;
    }

    .dropzone {
      width: 480px;
      height: 140px;
      border: 3px dashed #294767;
      border-radius: 7px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      cursor: pointer;
      transition: 0.3s ease border-color;

      &:hover {
        border-color: #446b93;

        p {
          color: #28817d;
        }
      }

      p {
        color: #216562;
        font-size: 18px;
        transition: 0.3s ease color;

        &.dnd-warning {
          color: #ff5858b0;
        }
      }
    }

    .dropzone-btn {
      width: 110px;
      width: 40px;

      .add-more {
        background-color: #0E1925;
        border: none;
        width: 110px;
        height: 40px;
        color: white;
        font-weight: 700;
        padding: 0 10px;
        border-radius: 5px;
        font-size: 14px;
        letter-spacing: 0.5px;
        cursor: pointer;
        transition: 0.2s ease background-color;

        &:active {
          background-color: #12202f;
        }
      }
    }

    .dropzone-p {
      color: #94989E;
      padding-right: 50px;
      margin-bottom: 10px;
      margin-top: -10px;
    }

    .smooth-dnd-container {
      margin-bottom: 5px;
    }

    .smooth-dnd-draggable-wrapper {
      padding-bottom: 11px;

    }
  `

  // save formatted dnd and add btn files to 'files' state
  const dropAccepted = (accepted) => {
    const allFiles = []

    accepted.forEach((file) => {
      let fileInfo

      if (type === 'series') {
        fileInfo = {
          type: 'series',
          path: file.path,
          name: file.name,
          ep_num: 1,
          ep_type: 'ep',
          episodic,
        }
      } else if (type === 'short') {
        fileInfo = {
          path: file.path,
          name: file.name,
          type: 'short',
          ep_type: 'short',
        }
      } else {
        fileInfo = {
          path: file.path,
          name: file.name,
          ep_num: 1,
          type: 'shot',
          ep_type: 'shot',
        }
      }

      allFiles.push(fileInfo)
    })

    if (files.length !== 0) {
      let presence = false

      files.forEach((file) => {
        if (file.path === allFiles[0].path) {
          presence = true
        }
      })

      if (!presence) {
        const filesCopy = [...files, ...allFiles]
        setFiles(filesCopy)
      }
    } else {
      setFiles(allFiles)
    }
  }

  // initialize dnd and add btn dropzone
  const {
    fileRejections,
    getRootProps,
    getInputProps,
    open,
  } = useDropzone({
    accept: '.mkv, .mp4, .webm',
    onDropAccepted: dropAccepted,
    maxFiles: (type === 'short') ? 1 : 0,
  })

  return (
    <div css={styles}>
      <div className="line" />
      <div className="cont">
        <h2>Entry Files</h2>

        {/* when there are no files in state display the dnd zone */}
        {
          (files.length === 0)
            ? (
              <div>
                <p className="dropzone-p">
                  Selecting a file inhibits the ability to change the entry type.
                  <br />
                  To change type once more delete all entries.
                </p>
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <p>Drag&apos;n Drop or Click</p>
                  {(fileRejections.length !== 0) ? <p className="dnd-warning">Invalid Files were entered</p> : ''}
                </div>
              </div>
            )
            : ''
        }

        {/* when there are files in state display the add more btn plus the files */}
        {
          (type !== 'short' && files.length > 0)
            ? (
              <div>
                <DraggableFiles files={files} setFiles={setFiles} />
                <div {...getRootProps({ className: 'dropzone-btn' })}>
                  <input {...getInputProps()} />
                  <button className="add-more" type="button" onClick={() => open}>ADD MORE</button>
                </div>
              </div>
            )
            : ''
        }
      </div>
    </div>
  )
}

EntryFiles.propTypes = {
  episodic: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
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

export default EntryFiles
