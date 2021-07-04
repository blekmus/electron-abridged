/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'
import { useRef } from 'react'
import prettyBytes from 'pretty-bytes'

function Cover({ file, handleFileInput, handleFileDel }) {
  const styles = css`
    width: 272px;
    height: 213px;

    .top {
      background-color: #0E1925;
      height: 153px;
      border-radius: 6px 6px 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      transition: 0.2s ease background-color;

      &:active {
        background-color: #12202f;
      }

      input {
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        position: absolute;
        z-index: 3;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 6px 6px 0 0;
      }

      &:hover {
        .delete {
          opacity: 1;
        }

        .change {
          opacity: 50%;
        }
      }

      .delete {
        font-size: 13px;
        font-weight: 800;
        background-color: #dc3939;
        color: white;
        border: none;
        border-radius: 3px;
        width: 60px;
        height: 25px;
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 4;
        opacity: 0;
        transition: 0.2s ease opacity, 0.2s ease background-color;

        &:active {
          background-color: #a22727;
        }
      }

      .change {
        opacity: 0;
        position: absolute;
        z-index: 2;
        height: 100%;
        width: 100%;
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s ease;

        p {
          color: white;
          letter-spacing: 0.5px;
          font-weight: 700;
          font-size: 15px;
        }
      }
    }

    .bottom {
      height: 50px;
      width: 100%;
      border-radius: 0 0 6px 6px;
      background-color: #122131;
      padding: 6px 0;
      padding-left: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .ep-type {
        font-weight: 600;
        height: 100%;
        border: none;
        width: 60px;
        border-radius: 5px;
        background-color: #162738;
        border-bottom: 4px solid #223B55;
        font-size: 20px;
        color: #B2FF76;
        margin-right: 10px;
      }

      .ep-num {
        font-weight: 700;
        height: 100%;
        border: none;
        width: 50px;
        border-radius: 5px;
        background-color: #162738;
        border-bottom: 4px solid #223B55;
        font-size: 20px;
        color: #DC77FF;
      }

      .cover-size {
        margin-right: 10px;
        color: #526274;
        font-weight: 600;
      }
    }
  `

  // used to reset input box after a file has been seleccted to allow it to be used again
  // this is needed when deleting and reselecting covers
  const fileInputBox = useRef()

  return (
    <div css={styles}>
      {
        (file.cover_path)
          ? (
            <div className="top">
              <input ref={fileInputBox} type="file" multiple={false} accept=".png, .jpg, .jpeg" onInput={(e) => handleFileInput(e, file.path)} />

              <button
                className="delete"
                type="button"
                onClick={(e) => {
                  handleFileDel(e, file.path)
                  fileInputBox.current.value = ''
                }}
              >
                REMOVE
              </button>

              <img src={`absfile://${file.cover_path}`} alt={file.name} />

              <div className="change">
                <p>CHANGE COVER</p>
              </div>
            </div>
          )

          : (
            <div className="top">
              <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.4973 11.8634H17.6109V1.97703C17.6109 0.885573 16.7251 -0.000244141 15.6337 -0.000244141H14.3156C13.2241 -0.000244141 12.3383 0.885573 12.3383 1.97703V11.8634H2.45189C1.36043 11.8634 0.474609 12.7492 0.474609 13.8407V15.1588C0.474609 16.2503 1.36043 17.1361 2.45189 17.1361H12.3383V27.0225C12.3383 28.1139 13.2241 28.9998 14.3156 28.9998H15.6337C16.7251 28.9998 17.6109 28.1139 17.6109 27.0225V17.1361H27.4973C28.5888 17.1361 29.4746 16.2503 29.4746 15.1588V13.8407C29.4746 12.7492 28.5888 11.8634 27.4973 11.8634Z" fill="white" />
              </svg>

              <input type="file" multiple={false} accept=".png, .jpg, .jpeg" onInput={(e) => handleFileInput(e, file.path)} />
            </div>
          )
      }

      <div className="bottom">
        <div style={{ height: '100%', display: 'flex' }}>
          <button type="button" disabled className="ep-type">
            {file.ep_type}
          </button>
          <button type="button" disabled className="ep-num">
            {file.ep_num}
          </button>
        </div>

        <p className="cover-size">
          {(file.cover_size) ? prettyBytes(file.cover_size) : '' }
        </p>
      </div>
    </div>
  )
}

Cover.propTypes = {
  handleFileDel: PropTypes.func.isRequired,
  handleFileInput: PropTypes.func.isRequired,
  file: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  ).isRequired,
}

export default Cover
