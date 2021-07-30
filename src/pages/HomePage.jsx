/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

// components
import HomeHeader from '../components/HomePage/HomeHeader.jsx'
import HomeBar from '../components/HomePage/HomeBar.jsx'
// import Table from '../components/HomePage/Table.jsx'

function HomePage({ page }) {
  const styles = css`
  `

  // scroll to top on react-router page change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const history = useHistory()
  // history.push('/edit/4c986ce0-da10-40da-badf-71ea4c846ce6')
  history.push('/settings')

  return (
    <div css={styles}>
      {/* the title and blurred image */}
      <HomeHeader page={page} />

      {/* the menu bar with page links */}
      <HomeBar page={page} />

      {/* the main body with table and table funcs */}
      {/* <Table page={page} /> */}
    </div>
  )
}

HomePage.propTypes = {
  page: PropTypes.string.isRequired,
}

export default HomePage
