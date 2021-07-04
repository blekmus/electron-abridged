/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

function AddPageTopBar({ save }) {
  const styles = css`
    display: flex;
    justify-content: space-between;
    padding: 0 35px;
    height: 90px;
    align-items: center;

    h1 {
      color: white;
      font-family: 'Bebas Neue';
      font-weight: 400;
      letter-spacing: 2px;
      font-size: 27px;
      margin-top: 5px;
    }

    .btns {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 10px;

      button {
        font-family: 'Source Sans Pro';
        border: none;
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 1px;
        height: 32px;
        width: 80px;
        letter-spacing: 1px;
        border-radius: 5px;
        background-color: #162C42;

        &.cancel-btn {
          color: #FF5E5E;

          &:active {
            background-color: #122538;
          }
        }

        &.save-btn {
          background: none;

          &:active {
            background-color: #0e1d2c;
          }
        }
      }
    }
  `
  const history = useHistory()

  return (
    <div css={styles}>
      <h1 className="main-title">NEW ENTRY</h1>
      <div className="btns">
        <button type="button" className="save-btn" onClick={save}>SAVE</button>
        <button type="button" className="cancel-btn" onClick={() => history.goBack()}>CANCEL</button>
      </div>
    </div>
  )
}

AddPageTopBar.propTypes = {
  save: PropTypes.func.isRequired,
}

export default AddPageTopBar
