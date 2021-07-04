/* eslint-disable no-param-reassign */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'
import TextareaAutosize from 'react-autosize-textarea'

function EntryDescription({ name }) {
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

    .textbox {
      background-color: #122131;
      border: none;
      resize: none;
      border-radius: 7px;
      min-height: 80px;
      width: 90%;
      max-width: 500px;
      font-size: 18px;
      padding: 10px 15px;
      border-bottom: 5px solid #223B55;
      transition: 0.2s ease border-color;

      &:focus {
        border-bottom-color: #446b93;
      }

      &::placeholder {
        color: #495E75;
      }
    }
  `

  // handle description input box
  const handleInput = (e) => {
    name.current = e.target.value
  }

  return (
    <div css={styles}>
      <div className="line" />
      <div className="cont">
        <h2>Description</h2>
        <p>A few words about what all the fuss is about</p>
        <TextareaAutosize onChange={handleInput} className="textbox" placeholder="A few words..." />
      </div>
    </div>
  )
}

EntryDescription.propTypes = {
  name: PropTypes.objectOf(
    PropTypes.string,
  ).isRequired,
}

export default EntryDescription
