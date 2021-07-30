/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

function HomeBar({ page }) {
  const styles = css`
    height: 65px;
    background-color: #0E1925;
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;

    .left {
      display: flex;
      height: 100%;

      button {
        width: 120px;
        height: 100%;
        border: none;
        background: none;
        font-weight: 500;
        font-size: 20px;
        cursor: pointer;
        color: #9FA3A8;
        border-top: 4px solid #0E1925;
        border-bottom: 4px solid #0E1925;

        &:active {
          background-color: #101d2b;
          border-top-color: #101d2b;
          border-bottom-color: #101d2b;
        }

        &.active {
          color: white;
          border-bottom: 4px solid #B566AD;
          cursor: default;

          &:active {
            background-color: #0E1925;
            border-top-color: #0E1925;
            border-bottom-color: #B566AD;
          }
        }
      }
    }

    .right {
      height: 100%;
      display: flex;

      .new {
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
      }

      .settings {
        background: none;
        border: none;
        width: 75px;
        height: 100%;
        cursor: pointer;

        &:active svg path {
          fill-opacity: 0.07;
        }

        svg {
          width: 23px;
          height: 100%;

          path {
            fill-opacity: 0.1;
          }
        }
      }
    }
  `

  const history = useHistory()

  return (
    <div css={styles}>
      <div className="left">
        <button
          type="button"
          className={(page === 'index') ? 'active' : ''}
          onClick={() => history.push('/')}
          disabled={(page === 'index')}
          title="All Entries"
        >
          All
        </button>

        <button
          type="button"
          className={(page === 'series') ? 'active' : ''}
          onClick={() => history.push('/series')}
          disabled={(page === 'series')}
          title="Series Entries"
        >
          Series
        </button>

        <button
          type="button"
          className={(page === 'short') ? 'active' : ''}
          onClick={() => history.push('/short')}
          disabled={(page === 'short')}
          title="Short Entries"
        >
          Short
        </button>

        <button
          type="button"
          className={(page === 'shot') ? 'active' : ''}
          onClick={() => history.push('/shot')}
          disabled={(page === 'shot')}
          title="Shot Entries"
        >
          Shot
        </button>
      </div>

      <div className="right">
        <button className="new" type="button" onClick={() => history.push('/new')}>NEW</button>
        <button className="settings" type="button" onClick={() => history.push('/settings')}>
          <svg viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.277 15.3484L20.2777 14.1939C20.4795 13.1051 20.4795 11.9881 20.2777 10.8993L22.277 9.74474C22.5069 9.61333 22.6102 9.34113 22.5351 9.08769C22.0142 7.41692 21.1271 5.90571 19.9679 4.64793C19.7896 4.45551 19.4986 4.40858 19.2733 4.53999L17.274 5.69452C16.4339 4.97176 15.4671 4.41327 14.4206 4.04721V1.74285C14.4206 1.48003 14.2375 1.25006 13.9794 1.19374C12.257 0.808903 10.4924 0.827676 8.85444 1.19374C8.59631 1.25006 8.41328 1.48003 8.41328 1.74285V4.0519C7.37139 4.42266 6.40459 4.98115 5.55982 5.69921L3.56521 4.54468C3.33525 4.41327 3.04896 4.45551 2.87062 4.65263C1.7114 5.90571 0.824388 7.41692 0.303444 9.09239C0.223659 9.34582 0.331603 9.61802 0.561569 9.74943L2.56087 10.904C2.35906 11.9928 2.35906 13.1098 2.56087 14.1986L0.561569 15.3531C0.331603 15.4845 0.228352 15.7567 0.303444 16.0102C0.824388 17.6809 1.7114 19.1921 2.87062 20.4499C3.04896 20.6423 3.33994 20.6893 3.56521 20.5579L5.56451 19.4033C6.40459 20.1261 7.37139 20.6846 8.41797 21.0506V23.3597C8.41797 23.6225 8.60101 23.8525 8.85913 23.9088C10.5815 24.2936 12.3462 24.2749 13.9841 23.9088C14.2422 23.8525 14.4253 23.6225 14.4253 23.3597V21.0506C15.4671 20.6799 16.4339 20.1214 17.2787 19.4033L19.278 20.5579C19.508 20.6893 19.7943 20.647 19.9726 20.4499C21.1318 19.1968 22.0188 17.6856 22.5398 16.0102C22.6102 15.752 22.5069 15.4798 22.277 15.3484ZM11.4169 16.3011C9.34723 16.3011 7.66237 14.6163 7.66237 12.5466C7.66237 10.4769 9.34723 8.79202 11.4169 8.79202C13.4866 8.79202 15.1715 10.4769 15.1715 12.5466C15.1715 14.6163 13.4866 16.3011 11.4169 16.3011Z" fill="white" />
          </svg>
        </button>
      </div>
    </div>
  )
}

HomeBar.propTypes = {
  page: PropTypes.string.isRequired,
}

export default HomeBar
