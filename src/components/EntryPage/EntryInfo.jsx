/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'

function EntryInfo({ tags, description, sources }) {
  const styles = css`
    margin-top: 40px;
    margin-bottom: 40px;
    width: 85%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;
    background-color: #0E1A26;
    padding: 20px 30px;

    .tags {
      display: flex;
      column-gap: 7px;
      margin-bottom: 15px;

      span {
        background-color: #162738;
        color: #FF61AD;
        padding: 3px 6px;
        font-weight: 600;
        font-size: 15px;
        border-radius: 3px;
      }
    }

    .desc {
      font-size: 18px;
      margin-bottom: 15px;
    }

    .based-on {
      display: flex;
      column-gap: 15px;
      margin-bottom: 5px;

      p {
        font-size: 18px;

        &.title {
          font-weight: 600;
          font-size: 17px;
        }
      }
    }
  `

  const tagList = tags.map((tag) => <span key={uuid()}>{tag}</span>)
  const sourceList = sources.map((source) => <p key={uuid()}>{source}</p>)

  return (
    <div css={styles}>
      <div className="tags">{tagList}</div>
      <p className="desc">{description}</p>

      {(sourceList.length !== 0)
        ? (
          <div className="based-on">
            <p className="title">Based on</p>

            <div className="items">
              {sourceList}
            </div>
          </div>
        ) : ' '}

    </div>
  )
}

EntryInfo.propTypes = {
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  sources: PropTypes.arrayOf(PropTypes.string),
}

EntryInfo.defaultProps = {
  description: '',
  tags: [],
  sources: [],
}

export default EntryInfo
