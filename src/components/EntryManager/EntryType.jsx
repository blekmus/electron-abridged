/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'

import ButtonSlider from './ButtonSlider.jsx'

function EntryType({ type, setType, files }) {
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

  let description

  // slider btn options
  const options = [
    { name: 'series', color: '#B2FF76' },
    { name: 'short', color: '#DC77FF' },
    { name: 'shot', color: '#49F8D9' },
  ]

  // resolve description
  if (type === 'series') {
    description = (
      <p>
        Videos that cover an anime episodically or in two or more entries.
        <br />
        Videos adjoined by a common creator, plot, story or uniformity that span more than two entries.
      </p>
    )
  } else if (type === 'short') {
    description = (
      <p>
        Videos that cover most of the original anime&apos;s content in one or more entries.
        <br />
        If there is more than one entry, they shouldn&apos;t be heavily connected story-wise.
      </p>
    )
  } else {
    description = (
      <p>
        Videos that are short and cover only a short portion of it&apos;s original material.
        <br />
        They may be random as well. Without a coherent story or plot.
        <br />
        All shorts should be unit entries.
      </p>
    )
  }

  return (
    <div css={styles}>
      <div className="line" />
      <div className="cont">
        <h2>Type</h2>
        <ButtonSlider options={options} setOption={setType} currentOption={type} className="btn-slider" btnWidth={90} disabled={files.length > 0} />
        {description}
      </div>
    </div>
  )
}

EntryType.propTypes = {
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

export default EntryType
