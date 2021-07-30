/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'

function EntryHeader({ image, title, creators }) {
  const styles = css`
    height: 350px;
    width: 100%;
    position: relative;


    .text {
      position: absolute;
      z-index: 2;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .creators {
        font-family: 'Bebas Neue';
        font-size: 35px;
        color: #E0E0E0;
        opacity: 70%;
        text-align: center;
        letter-spacing: 1px;
      }

      .title {
        font-weight: 600;
        font-size: 70px;
        text-align: center;
      }
    }

    img {
      position: absolute;
      height: 100%;
      width: 100%;
      object-fit: cover;
      z-index: 0;
      opacity: 0.8;
    }

    .blur-layer {
      background: rgba(20, 29, 41, 0.5);
      backdrop-filter: blur(5px);
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
  `

  return (
    <div css={styles}>
      <div className="text">
        <h1 className="title">{title}</h1>
        <h2 className="creators">{creators.join(' // ')}</h2>
      </div>
      <div className="blur-layer" />
      <img src={(image !== '') ? `absfile://${image}` : ''} alt="background" />
    </div>
  )
}

EntryHeader.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  creators: PropTypes.arrayOf(PropTypes.string),
}

EntryHeader.defaultProps = {
  image: '',
  title: '',
  creators: [],
}

export default EntryHeader
