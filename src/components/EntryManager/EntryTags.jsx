/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'
import ReactTags from 'react-tag-autocomplete'

function EntryTags({ tags, setTags }) {
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

    .react-tags {
      min-width: 350px;
      max-width: 450px;
      height: 50px;
      border-radius: 7px 7px 6px 6px;
      background-color: #122131;
      border: none;
      padding-left: 5px;
      padding-bottom: 2px;
      transition: 0.2s ease border-color;
      display: flex;

      .react-tags__selected {
        display: flex;
      }

      .react-tags__selected-tag {
        margin: 8px 0px 8px 8px;
        padding: 0 8px;
        background-color: #213546;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:active {
          background-color: #1a2a38;
        }
      }

      .react-tags__selected-tag-name {
        font-family: 'Source Sans Pro';
        color: #B2FF76;
        font-size: 17px;
      }

      .react-tags__search,
      .react-tags__search-input,
      .react-tags__search-wrapper {
        width: 100%;
        height: 100%;
        background: none;
      }

      .react-tags__search-input {
        border: none;
        font-size: 18px;
        padding-left: 10px;

        &::placeholder {
          color: #495E75;
        }
      }

      &.is-focused {
        border-bottom-color: #446b93;
      }


    }
  `

  // add new tag to state on enter press
  const onTagAdd = (newTag) => {
    const alltags = [].concat(tags, newTag)
    setTags(alltags)
  }

  // remove tag from state on tag click
  const onTagDel = (oldTag) => {
    const alltags = tags.slice(0)
    alltags.splice(oldTag, 1)
    setTags(alltags)
  }

  return (
    <div css={styles}>
      <div className="line" />
      <div className="cont">
        <h2>Tags</h2>
        <p>What defines the entry&apos;s look and feel.</p>
        <ReactTags
          allowBackspace={false}
          autoresize={false}
          tags={tags}
          onAddition={onTagAdd}
          onDelete={onTagDel}
          allowNew
          placeholderText="Add tag"
          delimiters={['Enter', 'Tab', ' ']}
        />
      </div>
    </div>
  )
}

EntryTags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.string,
    ),
  ).isRequired,
  setTags: PropTypes.func.isRequired,
}

export default EntryTags
