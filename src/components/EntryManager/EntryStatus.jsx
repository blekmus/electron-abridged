/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'

import ButtonSlider from './ButtonSlider.jsx'

function EntryStatus({ type, setType }) {
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

    .btn-slider {
      margin-bottom: 15px;
    }

    p {
      color: #94989E;
      padding-right: 50px;
    }

    .line {
      width: 3px;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: #B566AD;
    }
  `

  // slider btn options
  const options = [
    { name: 'releasing', color: '#B2FF76' },
    { name: 'finished', color: '#49F8D9' },
    { name: 'abandoned', color: '#DC77FF' },
    { name: 'irrelevant', color: '#FF9A3D' },
  ]

  return (
    <div css={styles}>
      <div className="line" />
      <div className="cont">
        <h2>Status</h2>
        <ButtonSlider options={options} currentOption={type} setOption={setType} className="btn-slider" btnWidth={100} disabled={false} />
      </div>
    </div>
  )
}

EntryStatus.propTypes = {
  type: PropTypes.string.isRequired,
  setType: PropTypes.func.isRequired,
}

export default EntryStatus
