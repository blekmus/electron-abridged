/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'
import { Container, Draggable } from 'react-smooth-dnd'
import applyDrag from '../assets/js/applyDrag'

function DraggableFiles({
  files,
  setFiles,
}) {
  const styles = css`
    .drag-cont {
      position: relative;
      display: flex;
      max-width: 550px;
      width: 90%;
      height: 55px;
      border-radius: 7px;
      background-color: #122131;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;

      .drag-svg {
        margin-right: 10px;
        cursor: pointer;
      }

      &:focus-within .close-btn {
        opacity: 1;
      }

      .close-btn {
        opacity: 0;
        position: absolute;
        right: -30px;
        border: none;
        background: none;
        cursor: pointer;
        transition: 0.2s ease fill, 0.2s ease opacity;

        &:active path {
          fill: #c03e3e;
        }

        path {
          fill: #953F3F;
        }
      }

      .input-box {
        height: 100%;
        width: 100%;
        padding: 6px 0;
        flex: 1;
        margin-right: 10px;
        display: flex;
      }

      input {
        border: none;
        height: 100%;
        border-radius: 5px;
        background-color: #162738;
        border-bottom: 4px solid #223B55;
        font-size: 18px;
        transition: 0.2s ease border-color;
        color: #49F8D9;

        &:focus {
          border-bottom-color: #446b93;
        }

        &::placeholder {
          color: #495E75;
        }
      }

      .filename-input {
        width: 100%;
        flex: 1;
        padding-left: 10px;
      }

      .entrynum-input {
        width: 50px;
        margin-right: 10px;
        text-align: center;
        color: #DC77FF;
        font-weight: 700;
        font-size: 20px;
      }

      .type-input {
        cursor: pointer;
        width: 60px;
        text-align: center;
        margin-right: 10px;
        font-weight: 600;
        border: none;
        height: 100%;
        border-radius: 5px;
        background-color: #162738;
        border-bottom: 4px solid #223B55;
        font-size: 20px;
        transition: 0.2s ease border-color;
        color: #B2FF76;

        &:hover {
          border-bottom-color: #446b93;
        }

        &:disabled {
          border: none;
          cursor: default;
        }
      }
    }
  `

  const handleEntryNumInput = (e, path) => {
    const updatedFile = files.find((file) => file.path === path)
    const filesCopy = [...files]
    filesCopy[files.indexOf(updatedFile)].ep_num = Number(e.target.value)
    setFiles(filesCopy)
  }

  const handleTypeBtn = (e, path) => {
    const updatedFile = files.find((file) => file.path === path)
    const filesCopy = [...files]
    const newValue = (updatedFile.ep_type === 'ep') ? 'OVA' : 'ep'
    filesCopy[files.indexOf(updatedFile)].ep_type = newValue
    setFiles(filesCopy)
  }

  const handleFilenameInput = (e, path) => {
    const updatedFile = files.find((file) => file.path === path)
    const filesCopy = [...files]
    filesCopy[files.indexOf(updatedFile)].name = e.target.value
    setFiles(filesCopy)
  }

  const handleDelBtn = (path) => {
    const delFile = files.find((file) => file.path === path)
    const filteredFiles = files.filter((file) => file !== delFile)
    setFiles(filteredFiles)
  }

  const dragBoxes = files.map((file) => {
    let inputBoxes
    if (file.type === 'series') {
      inputBoxes = (
        <div className="input-box">
          {
            (file.episodic === 'yes')
              ? <input type="text" value={file.ep_num} className="entrynum-input" onChange={(e) => handleEntryNumInput(e, file.path)} />
              : ''
          }
          <button type="button" className="type-input" onClick={(e) => handleTypeBtn(e, file.path)}>{file.ep_type}</button>
          <input type="text" value={file.name} className="filename-input" onChange={(e) => handleFilenameInput(e, file.path)} />
        </div>
      )
    } else if (file.type === 'short') {
      inputBoxes = (
        <div className="input-box">
          <input type="text" value={file.name} className="filename-input" onChange={(e) => handleFilenameInput(e, file.path)} />
        </div>
      )
    } else {
      inputBoxes = (
        <div className="input-box">
          <input type="text" value={file.ep_num} className="entrynum-input" onChange={(e) => handleEntryNumInput(e, file.path)} />
          <button type="button" className="type-input" disabled>{file.ep_type}</button>
          <input type="text" value={file.name} className="filename-input" onChange={(e) => handleFilenameInput(e, file.path)} />
        </div>
      )
    }

    return (
      <Draggable key={file.path} css={styles}>
        <div className="drag-cont">
          <svg className="drag-svg" width="23" height="19" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="17.0077" y1="1.42517" x2="0.134861" y2="1.42517" stroke="#243B54" strokeWidth="2.3" />
            <line x1="17.0077" y1="6.84854" x2="0.134861" y2="6.84854" stroke="#243B54" strokeWidth="2.3" />
            <line x1="17.0077" y1="12.2719" x2="0.134861" y2="12.2719" stroke="#243B54" strokeWidth="2.3" />
          </svg>

          {inputBoxes}

          <button type="button" className="close-btn" onClick={() => handleDelBtn(file.path)}>
            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.30999 7.03309L13.6411 2.70201C14.1196 2.22347 14.1196 1.44764 13.6411 0.969844L13.0637 0.392456C12.585 -0.0862334 11.8092 -0.0862334 11.3314 0.392456L7.00044 4.72339L2.66935 0.391559C2.19081 -0.0869811 1.41498 -0.0869811 0.93719 0.391559L0.358905 0.968946C-0.119635 1.44764 -0.119635 2.22347 0.358905 2.70126L4.69073 7.03309L0.359802 11.364C-0.118887 11.8427 -0.118887 12.6185 0.359802 13.0963L0.93719 13.6737C1.41573 14.1523 2.19156 14.1523 2.66935 13.6737L7.00044 9.34264L11.3314 13.6737C11.8101 14.1523 12.5859 14.1523 13.0637 13.6737L13.6411 13.0963C14.1196 12.6176 14.1196 11.8418 13.6411 11.364L9.30999 7.03309Z" />
            </svg>
          </button>
        </div>
      </Draggable>
    )
  })

  return (
    <Container
      dragHandleSelector=".drag-svg"
      lockAxis="y"
      onDrop={(e) => setFiles(applyDrag(files, e))}
    >
      {dragBoxes}
    </Container>
  )
}

DraggableFiles.propTypes = {
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

export default DraggableFiles
