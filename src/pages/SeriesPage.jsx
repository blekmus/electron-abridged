/** @jsx jsx */
import { css, jsx } from '@emotion/react'

// components
import MainPageTopBar from '../components/MainTopBar.jsx'
import Table from '../components/TableSeries.jsx'

// card images
import SeriesCard from '../assets/images/series-card.png'

function SeriesPage() {
  const styles = css`
    .top-back {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      height: 500px;
      width: 100%;

      .back-cont {
        height: 100%;
        width: 100%;
        position: relative;
        overflow-x: clip;
      }

      .page-en {
        position: absolute;
        bottom: 0;
        z-index: 1;
        font-family: 'Bebas Neue';
        font-size: 200px;
        line-height: 124px;
        opacity: 4%;
        text-align: center;
        letter-spacing: 25px;
        left: 50%;
        transform: translateX(-49.7%);
        white-space: nowrap;
      }

      .page-jp {
        font-family: 'M1+P';
        position: absolute;
        bottom: -55px;
        left: 0;
        right: 0;
        z-index: 2;
        font-size: 75px;
        text-align: center;
      }

      .blur-layer {
        background: rgba(20, 29, 41, 0.5);
        backdrop-filter: blur(15px);
        height: 100%;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: -2;
        opacity: 0.5;
      }
    }

    .main-image {
      max-width: 600px;
      width: 90%;
      margin: 0 auto;
      margin-top: 30px;

      img {
        width: 100%;
        border-radius: 4px;
        pointer-events: none
      }
    }

    .body {
      margin-top: 150px;
    }
  `

  return (
    <div css={styles}>
      <MainPageTopBar active="series" />
      <div className="top-back">
        <div className="back-cont">
          <p className="page-en">SERIES SERIES SERIES SERIES SERIES</p>
          <p className="page-jp">示します</p>
          <div className="blur-layer" />
          <img src={SeriesCard} alt="series-card" />
        </div>
      </div>

      <div className="main-image">
        <img src={SeriesCard} alt="" />
      </div>

      <div className="body">
        <Table />
      </div>
    </div>
  )
}

export default SeriesPage
