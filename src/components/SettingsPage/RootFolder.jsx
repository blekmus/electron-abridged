/* eslint-disable react/jsx-props-no-spreading */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { useLayoutEffect, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import PropTypes from 'prop-types'

function RootFolder({ toast }) {
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
      margin-bottom: 5px;
    }

    .desc {
      color: #94989E;
      padding-right: 50px;
      margin-bottom: 10px;
    }

    .error-cont {
      p {
        color: #A94848;
        display: inline;
      }

      button {
        background: none;
        border: none;
        color: #D75151;
        font-weight: 700;
        font-size: 16px;
        cursor: pointer;
        margin-left: 3px;
        margin-right: 3px;

        &:hover {
          text-decoration: underline;
        }

        &:active {
          color: #c04444;
        }
      }

    }

    .line {
      width: 3px;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: #B566AD;
    }

    .path-cont {
      margin-bottom: 10px;
      height: 45px;
      border-radius: 6px;
      background-color: #122131;
      display: inline-grid;
      grid-template-columns: 340px 80px;
      align-items: center;

      .path-text-cont {
        position: relative;
        height: 100%;

        .scroll-container {
          cursor: col-resize;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, transparent 80%, #122131);
        }
      }

      .path {
        flex: 1;
        font-size: 17px;
        padding-left: 20px;
        line-height: 45px;
        color: #CFCFCF;
        white-space: nowrap;

        &:after {
          content: '___';
          opacity: 0;
        }
      }

      button {
        width: 100%;
        background: none;
        border: none;
        font-weight: 700;
        font-size: 15px;
        color: #AAB4BF;
        cursor: pointer;
        height: 100%;

        &.cancel {
          color: #bfaaaa;
        }

        &:active {
          background-color: #00000014;
          border-radius: 0 6px 6px 0;
        }
      }
    }
  `

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

  const [folderLoc, setFolderLoc] = useState('')
  const [tempLoc, setTempLoc] = useState(null)
  const [error, setError] = useState(null)

  useLayoutEffect(() => {
    window.electron.getRootFolder().then((e) => {
      if (!e) {
        setFolderLoc(false)
      } else {
        setFolderLoc(e)
      }
    })
  }, [])

  // if all goes well, set the root folder
  const setRootFolder = async (dir) => {
    const resp = await window.electron.setRootFolder(dir)

    if (!resp.success) {
      console.log(resp)
      toast((t) => (
        <div css={toastStyles}>
          <p>Unhandled error caused when settings Entry Folder</p>
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

    setFolderLoc(dir)
    setTempLoc(null)
    setError(null)

    toast((t) => (
      <div css={toastStyles}>
        <p>Folder structure and database has been created at selected entry folder location</p>
        <button type="button" onClick={() => toast.dismiss(t.id)}>close</button>
      </div>
    ), {
      style: {
        border: '1px solid #36e78667',
        padding: 4,
        background: '#182536',
        borderRadius: 1,
        minHeight: 50,
        maxWidth: 600,
        top: 700,
      },
      duration: 100000,
    })

    window.electron.restartDialog()
  }

  // if subfolders don't exist, create it error btn
  const handleCreateFolderBtn = async (dir) => {
    const create = await window.electron.createRootFolder(dir)

    if (create.success) {
      setRootFolder(dir)
      return
    }

    console.log(dir)
    toast((t) => (
      <div css={toastStyles}>
        <p>Unhandled error caused when settings Entry Folder</p>
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
  }

  // handle change folder btn
  const handleFolderBtn = async () => {
    const dir = await window.electron.selectFolder()

    if (!dir) {
      return
    }

    // check if dirs exist and this folder is usable
    const check = await window.electron.checkRootFolder(dir)

    if (check.success) {
      setRootFolder(dir)
    } else if (check.issues === 'PRIMARY_DIRS_MISSING') {
      setTempLoc(dir)
      setError((
        <div className="error-cont">
          <p>The given path doesn’t seem to have an existing database or file structure.</p>
          <button type="button" onClick={() => handleCreateFolderBtn(dir)}>Create it</button>
          <p>to save</p>
        </div>
      ))
    } else if (check.issues === 'NO_PERMISSIONS') {
      setError((
        <div className="error-cont">
          <p>You don&apos;t have the needed permissions to access the given path.</p>
        </div>
      ))
    } else {
      console.log(dir)
      toast((t) => (
        <div css={toastStyles}>
          <p>Unhandle error caused when settings Entry Folder</p>
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
    }
  }

  // handle temp folder select cancel
  const handleCancelBtn = () => {
    setTempLoc(null)
    setError(null)
  }

  let pathText

  if (folderLoc) {
    if (tempLoc) {
      pathText = tempLoc
    } else {
      pathText = folderLoc
    }
  } else {
    pathText = 'No folder location could be found'
  }

  return (
    <div css={styles}>
      <div className="line" />
      <div className="cont">
        <h2>Entry Folder</h2>
        <p className="desc">Path to already existing abridged files folder or a new folder. This is where all cover files, entry files and info database will be saved.</p>

        <div className="path-cont">
          <div className="path-text-cont">
            <ScrollContainer className="scroll-container" vertical={false}>
              <div className="overlay" />
              <p className="path">
                {pathText}
              </p>
            </ScrollContainer>
          </div>

          {
            (tempLoc)
              ? <button type="button" className="cancel" onClick={handleCancelBtn}>CANCEL</button>
              : (
                <button type="button" onClick={handleFolderBtn}>
                  {
                  (folderLoc)
                    ? 'CHANGE'
                    : 'ADD'
                }
                </button>
              )
          }
        </div>

        {error}
      </div>
    </div>
  )
}

RootFolder.propTypes = {
  toast: PropTypes.func.isRequired,
}

export default RootFolder
