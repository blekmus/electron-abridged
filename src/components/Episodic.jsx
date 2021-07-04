/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'

import ButtonSlider from './ButtonSlider.jsx'

function Episodic({ type, setType, files }) {
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

    .btn-slider {
      margin-bottom: 15px;
    }

    p {
      color: #94989E;
      padding-right: 50px;
      margin-bottom: 10px;
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
    { name: 'yes', color: '#B2FF76' },
    { name: 'no', color: '#CFCFCF' },
  ]

  return (
    <div css={styles}>
      <div className="line" />
      <div className="cont">
        <h2>Episodic</h2>
        <p>Are the episodes tied together? (plot-wise, story-wise)</p>
        <ButtonSlider options={options} setOption={setType} currentOption={type} className="btn-slider" btnWidth={50} disabled={files.length > 0} />
      </div>
    </div>
  )
}

Episodic.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    ),
  ).isRequired,
  type: PropTypes.string.isRequired,
  setType: PropTypes.func.isRequired,
}

export default Episodic
