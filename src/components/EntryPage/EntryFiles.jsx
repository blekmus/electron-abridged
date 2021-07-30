/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'

function EntryFiles({ type, files }) {
  const styles = css`
    width: 85%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;
    padding-top: 10px;

    .header {
      font-size: 20px;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 30px;

      display: flex;
      column-gap: 10px;
    }

    .files {
      display: flex;
      flex-wrap: wrap;
      column-gap: 25px;
      row-gap: 25px;
    }
  `

  const epCard = css`
    position: relative;

    button {
      z-index: 1;
      opacity: 0;
      position: absolute;
      background: linear-gradient(180deg, rgb(0 0 0 / 72%) 35%, rgb(0 0 0 / 51%) 110%);
      border: none;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      display: flex;
      padding: 10px 15px;
      flex-direction: column;
      cursor: pointer;
      transition: 0.2s ease;

      &:hover {
        opacity: 1;
      }

      &:focus-visible {
        opacity: 1;
        border: solid 1px #333333;
      }

      .ep-num {
        color: #ff6767;
        font-size: 18px;
      }

      .ep-name {
        font-size: 21px;
        font-weight: 600;
        text-align: left;
      }
    }

    .background {
      width: 368px;
      height: 207px;

      img {
        border-radius: 3px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  `

  const openVid = (path) => {
    window.electron.openVid(path)
      .then((e) => console.log(e))
      .catch((e) => console.log(e))
  }

  const epCards = files.map((file) => (
    <div css={epCard} key={uuid()}>
      <button type="button" onClick={() => openVid(file.path)}>
        <p className="ep-num">
          {
            (type === 'series')
              ? `Episode ${file.ep_num}`
              : `${file.ep_num} - Shot`
          }
        </p>
        <p className="ep-name">{file.name}</p>
      </button>
      <div className="background">
        <img src={`absfile://${file.cover_path}`} alt={file.name} />
      </div>
    </div>
  ))

  return (
    <div css={styles}>
      {
        (['series', 'shot'].includes(type))
          ? (
            <h2 className="header">
              <span>{(type === 'series') ? 'episodes' : 'shots'}</span>
              <span>-</span>
              <span>{files.length}</span>
            </h2>
          )
          : ''
      }

      <div className="files">{epCards}</div>
    </div>
  )
}

EntryFiles.propTypes = {
  type: PropTypes.string,
  files: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ),
  ),
}

EntryFiles.defaultProps = {
  type: '',
  files: [],
}

export default EntryFiles
