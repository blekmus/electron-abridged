/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { useHistory } from 'react-router-dom'
// import PropTypes from 'prop-types'

function SettingsPage() {
  const styles = css`
    display: flex;
    justify-content: space-between;
    padding: 0 0 0 35px;
    height: 65px;
    align-items: center;
    background-color: #0E1925;
    position: sticky;
    top: 0;
    z-index: 20;

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

      button {
        height: 100%;
        border: none;
        width: 90px;
        font-size: 17px;
        font-weight: 700;
        letter-spacing: 1.2px;
        cursor: pointer;


        &.save-btn {
          background-color: #112130;
          color: #FF5E5E;

          &:active {
            background-color: #112130b5;
          }
        }

        &.cancel-btn {
          background: none;

          &:active {
            background-color: #00000017;
          }
        }
      }
    }
  `
  const history = useHistory()

  return (
    <div css={styles}>
      <h1 className="main-title">
        SETTINGS
      </h1>
      <div className="btns">
        <button type="button" className="cancel-btn" onClick={() => history.goBack()}>CLOSE</button>
      </div>
    </div>
  )
}

// SettingsPage.propTypes = {
//   save: PropTypes.func.isRequired,
//   page: PropTypes.string.isRequired,
// }

export default SettingsPage
