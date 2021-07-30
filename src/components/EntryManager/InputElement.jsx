/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'

function inputElement({ placeholder, onChange, value }) {
  const styles = css`
    input {
      max-width: 350px;
      width: 90%;
      height: 43px;
      border-radius: 7px 7px 6px 6px;
      background-color: #122131;
      border: none;
      padding-left: 20px;
      font-size: 18px;
      border-bottom: 4px solid #223B55;
      transition: 0.2s ease border-color;

      &:focus {
        border-bottom-color: #446b93;
      }

      &::placeholder {
        color: #495E75;
      }
    }
  `

  return (
    <div css={styles}>
      <input type="text" placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  )
}

inputElement.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default inputElement
