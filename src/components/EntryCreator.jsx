/* eslint-disable no-param-reassign */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'
import { Container, Draggable } from 'react-smooth-dnd'
import { v4 as uuid } from 'uuid'
import applyDrag from '../assets/js/applyDrag'

function EntryCreator({ names, setNames }) {
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
      margin-bottom: 15px;
    }

    .line {
      width: 3px;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: #B566AD;
    }

    .smooth-dnd-container {
      margin-bottom: 5px;
    }

    .smooth-dnd-draggable-wrapper {
      padding-bottom: 10px;


      &:first-of-type .close-btn {
        display: none;
      }
    }

    .drag-cont {
      position: relative;
      display: flex;
      justify-content: space-between;
      max-width: 350px;
      width: 90%;
      height: 43px;
      border-radius: 7px 7px 6px 6px;
      background-color: #122131;
      border-bottom: 4px solid #223B55;
      transition: 0.2s ease border-color;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;
      column-gap: 15px;

      &:focus-within .close-btn {
        opacity: 1;
      }
  
      &:focus-within {
        border-bottom-color: #446b93;
      }

      .close-btn {
        opacity: 0;
        position: absolute;
        right: -30px;
        border: none;
        background: none;
        transition: 0.2s ease fill, 0.2s ease opacity;

        &:active path {
          fill: #c03e3e;
        }

        path {
          fill: #953F3F;
        }
      }

      svg {
        cursor: pointer;
      }

      input {
        border: none;
        width: 100%;
        background: none;
        font-size: 18px;

        &::placeholder {
          color: #495E75;
        }
      }
    }

    .add-more {
      background-color: #0E1925;
      border: none;
      width: 110px;
      height: 40px;
      color: white;
      font-weight: 700;
      padding: 0 10px;
      border-radius: 5px;
      font-size: 14px;
      letter-spacing: 0.5px;
      cursor: pointer;
      transition: 0.2s ease background-color;

      &:active {
        background-color: #12202f;
      }
    }
  `

  // save input data to state on every keypress
  const handleInput = (e, id) => {
    const updatedItem = names.find((name) => name.id === id)
    const namesCopy = [...names]
    namesCopy[names.indexOf(updatedItem)].name = e.target.value
    setNames(namesCopy)
  }

  // handle new creator inputbox add btn
  const handleAddBtn = () => {
    const namesCopy = [...names]
    namesCopy.push({ id: uuid(), name: '' })
    setNames(namesCopy)
  }

  // handle creator inputbox delete btn
  const handleDelBtn = (id) => {
    const delItem = names.find((name) => name.id === id)
    const filteredItems = names.filter((item) => item !== delItem)
    setNames(filteredItems)
  }

  // create input boxes from 'names' array state
  const inputBoxes = names.map((name) => (
    <Draggable key={name.id}>
      <div className="drag-cont">
        <svg className="drag-svg" width="23" height="19" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="17.0077" y1="1.42517" x2="0.134861" y2="1.42517" stroke="#243B54" strokeWidth="2.3" />
          <line x1="17.0077" y1="6.84854" x2="0.134861" y2="6.84854" stroke="#243B54" strokeWidth="2.3" />
          <line x1="17.0077" y1="12.2719" x2="0.134861" y2="12.2719" stroke="#243B54" strokeWidth="2.3" />
        </svg>
        <input type="text" placeholder="Creator name" value={name.name} onChange={(e) => handleInput(e, name.id)} />

        <button type="button" className="close-btn" onClick={() => handleDelBtn(name.id)}>
          <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.30999 7.03309L13.6411 2.70201C14.1196 2.22347 14.1196 1.44764 13.6411 0.969844L13.0637 0.392456C12.585 -0.0862334 11.8092 -0.0862334 11.3314 0.392456L7.00044 4.72339L2.66935 0.391559C2.19081 -0.0869811 1.41498 -0.0869811 0.93719 0.391559L0.358905 0.968946C-0.119635 1.44764 -0.119635 2.22347 0.358905 2.70126L4.69073 7.03309L0.359802 11.364C-0.118887 11.8427 -0.118887 12.6185 0.359802 13.0963L0.93719 13.6737C1.41573 14.1523 2.19156 14.1523 2.66935 13.6737L7.00044 9.34264L11.3314 13.6737C11.8101 14.1523 12.5859 14.1523 13.0637 13.6737L13.6411 13.0963C14.1196 12.6176 14.1196 11.8418 13.6411 11.364L9.30999 7.03309Z" />
          </svg>
        </button>
      </div>
    </Draggable>
  ))

  return (
    <div css={styles}>
      <div className="line" />

      <div className="cont">
        <h2>Creator(s)</h2>
        <p>People or groups responsible for the creation of the entry.</p>

        <Container
          dragHandleSelector=".drag-svg"
          lockAxis="y"
          onDrop={(e) => setNames(applyDrag(names, e))}
        >
          {inputBoxes}
        </Container>

        <button className="add-more" type="button" onClick={handleAddBtn}>ADD MORE</button>
      </div>
    </div>
  )
}

EntryCreator.propTypes = {
  names: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ),
  ).isRequired,
  setNames: PropTypes.func.isRequired,
}

export default EntryCreator
