/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'

// components
import HomeHeader from '../components/HomeHeader.jsx'
import HomeBar from '../components/HomeBar.jsx'
import Table from '../components/Table.jsx'

function HomePage({ page }) {
  const styles = css`
  `

  return (
    <div css={styles}>
      <HomeHeader page={page} />
      <HomeBar page={page} />
      <Table />
    </div>
  )
}

HomePage.propTypes = {
  page: PropTypes.string.isRequired,
}

export default HomePage
