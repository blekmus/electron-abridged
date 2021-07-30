/* eslint-disable no-param-reassign */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'

import InputElement from './InputElement.jsx'

function EntryName({ name, type, setName }) {
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

  let title
  let description

  // resolving description
  if (type === 'series') {
    title = 'Series Name'
    description = 'The name may be the series’ name or a creator specific designation.'
  } else if (type === 'short') {
    title = 'Short Name'
    description = 'The name used to uniquely identify the short.'
  } else {
    title = 'Shot General Name'
    description = 'The name may be the shot’s name if there’s only one. If not, it should be a general name that identifies all shots.'
  }

  return (
    <div css={styles}>
      <div className="line" />
      <div className="cont">
        <h2>{ title }</h2>
        <p>{description}</p>
        <InputElement placeholder="Enter something" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
    </div>
  )
}

EntryName.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
}

export default EntryName
