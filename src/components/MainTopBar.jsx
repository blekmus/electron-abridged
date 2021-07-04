/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

function MainPageTopBar({ active }) {
  const styles = css`
    display: flex;
    justify-content: space-between;
    padding: 0 35px;
    height: 90px;
    align-items: center;

    .left {
      display: flex;
      align-items: center;
      height: 100%;

      .menu {
        height: 100%;
        display: flex;
        align-items: center;
        column-gap: 35px;

        button {
          border-radius: 5px;
          color: #E5E6E7;
          border: none;
          font-size: 20px;
          font-weight: 600;
          width: 80px;
          height: 35px;
          background: none;

          &.active {
            background-color: #1C2939;

            &:active {
              background-color: #1C2939;
            }
          }

          &:active {
            background-color: #15202c3b;
          }
        }
      }
    }

    .right {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 10px;

      button {
        border-radius: 3px;
        color: #6C7A88;
        border: none;
        font-size: 18px;
        font-weight: 600;
        width: 70px;
        height: 30px;
        background: none;

        &.active {
          background-color: #1C2939;
        }
      }
    }
  `
  const history = useHistory()

  return (
    <div css={styles}>
      <div className="left">
        <div className="menu">
          <button type="button" className={(active === 'home') ? 'active' : ''}>Home</button>
          <button type="button" className={(active === 'series') ? 'active' : ''}>Series</button>
          <button type="button" className={(active === 'short') ? 'active' : ''}>Short</button>
          <button type="button" className={(active === 'shot') ? 'active' : ''}>Shot</button>
          <button type="button" onClick={() => history.push('/new')}>New</button>
        </div>
      </div>

      <div className="right">
        <button type="button" className="search-btn">Search</button>
      </div>
    </div>
  )
}

MainPageTopBar.propTypes = {
  active: PropTypes.string.isRequired,
}

export default MainPageTopBar
