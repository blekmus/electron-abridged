/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'

// images
import IndexCard from '../../assets/images/index-card.png'
import SeriesCard from '../../assets/images/series-card.png'
import ShortCard from '../../assets/images/short-card.png'
import ShotCard from '../../assets/images/shot-card.png'

function HomeHeader({ page }) {
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

      .en {
        font-family: 'Bebas Neue';
        font-size: 180px;
        opacity: 10%;
        text-align: center;
        letter-spacing: 20px;
        line-height: 110px;
      }

      .jp {
        font-family: 'M1+P';
        font-size: 75px;
        text-align: center;
        word-wrap: none;
        line-height: 0;
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

  // init variables
  let image
  let enText
  let jpText

  // resolve variables
  if (page === 'index') {
    image = IndexCard
    enText = 'ABRIDGED'
    jpText = 'アブリッジド'
  }

  if (page === 'series') {
    image = SeriesCard
    enText = 'SERIES'
    jpText = '示します'
  }

  if (page === 'short') {
    image = ShortCard
    enText = 'SHORT'
    jpText = 'ショーツ'
  }

  if (page === 'shot') {
    image = ShotCard
    enText = 'SHOT'
    jpText = 'シングルア'
  }

  return (
    <div css={styles}>
      <div className="text">
        <h1 className="en">{enText}</h1>
        <h1 className="jp">{jpText}</h1>
      </div>
      <div className="blur-layer" />
      <img src={image} alt="background" />
    </div>
  )
}

HomeHeader.propTypes = {
  page: PropTypes.string.isRequired,
}

export default HomeHeader
