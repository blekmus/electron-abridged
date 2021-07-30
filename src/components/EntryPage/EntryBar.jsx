/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

function EntryBar({
  type,
  status,
  episodic,
  id,
}) {
  const styles = css`
    height: 65px;
    background-color: #0E1925;
    display: flex;
    justify-content: space-between;
    top: 0;
    z-index: 4;

    .left {
      height: 100%;

      button {
        width: 70px;
        height: 100%;
        border: none;
        background: none;
        cursor: pointer;

        &:active {
          background-color: #101d2b;
        }

        &:focus-visible {
          border: solid 1px #333333;
        }
      }
    }

    .center {
      justify-self: center;
      display: flex;
      height: 100%;
      align-items: center;
      font-size: 21px;
      column-gap: 5px;

      .dot {
        font-weight: 900;
        color: white;
      }

      .item {
        color: #B2FF76;
      }

      .type {
        font-weight: 600;
      }
    }

    .right {
      height: 100%;
      display: flex;

      .edit {
        background-color: #112130;
        color: #FF5E5E;
        height: 100%;
        border: none;
        width: 90px;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 1.2px;
        cursor: pointer;

        &:active {
          background-color: #112130b5;
        }

        &:focus-visible {
          border: solid 1px #333333;
        }
      }
    }
  `

  const history = useHistory()

  return (
    <div css={styles}>
      <div className="left">
        <button type="button" title="Go Back" onClick={() => history.goBack()}>
          <svg width="28" height="23" viewBox="0 0 32 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.9453 13.0514C30.7737 13.0514 31.4453 12.3798 31.4453 11.5514C31.4453 10.723 30.7737 10.0514 29.9453 10.0514V13.0514ZM1.08074 10.4907C0.494949 11.0765 0.494949 12.0263 1.08074 12.6121L10.6267 22.158C11.2125 22.7438 12.1622 22.7438 12.748 22.158C13.3338 21.5722 13.3338 20.6225 12.748 20.0367L4.26272 11.5514L12.748 3.06611C13.3338 2.48032 13.3338 1.53058 12.748 0.94479C12.1622 0.359003 11.2125 0.359003 10.6267 0.94479L1.08074 10.4907ZM29.9453 10.0514L2.1414 10.0514V13.0514L29.9453 13.0514V10.0514Z" fill="white" />
          </svg>
        </button>
      </div>

      {(type === 'series')
        ? (
          <div className="center">
            <p className="item">{status}</p>
            <p className="dot">·</p>
            <p className="item type">{type}</p>
            <p className="dot">·</p>
            <p className="item">{(episodic === 'yes') ? 'episodic' : 'fragmented'}</p>
          </div>
        )
        : (
          <div className="center">
            <p className="item">{type}</p>
          </div>
        )}

      <div className="right">
        <button className="edit" type="button" title="Edit Entry" onClick={() => history.push(`/edit/${id}`)}>EDIT</button>
      </div>
    </div>
  )
}

EntryBar.propTypes = {
  type: PropTypes.string,
  status: PropTypes.string,
  episodic: PropTypes.string,
  id: PropTypes.string,
}

EntryBar.defaultProps = {
  type: '',
  status: '',
  episodic: '',
  id: '',
}

export default EntryBar
