/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { motion, useAnimation } from 'framer-motion'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

function ButtonSlider({
  options,
  setOption,
  currentOption,
  className,
  btnWidth,
  disabled,
}) {
  const styles = css`
    position: relative;
    display: flex;
    height: 35px;

    .text button,
    .btn-back,
    .btns .btn {
      width: ${btnWidth}px;
    }

    .text {
      position: absolute;
      display: flex;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 3;
      
      button{
        height: 100%;
        font-size: 18px;
        color: white;
        text-align: center;
        font-weight: 400;
        cursor: pointer;
        border: none;
        background: none;

        &:disabled {
          cursor: default;
        }

      }
    }

    .btn-back {
      position: absolute;
      top: 0;
      background-color: #122131;
      height: 100%;
      z-index: 2;
      border-radius: 5px;
    }

    .btns {
      display: flex;
      height: 100%;

      .btn {
        border: none;
        height: 100%;
        background-color: #0E1925;

        &:first-of-type {
          border-radius: 5px 0 0 5px;
        }

        &:last-of-type {
          border-radius: 0 5px 5px 0;
        }
      }
    }
  `

  // used to set initial position if it isn't default
  const backBtn = useRef()

  // set background if initial position isn't default
  useEffect(() => {
    if (currentOption !== options[0].name) {
      const curOption = options.find((option) => option.name === currentOption)
      const initial = options.indexOf(curOption) * btnWidth
      backBtn.current.style.left = `${initial}px`
    }
  }, [])

  // initializing framer motion
  const controls = useAnimation()

  // handling btn click animations and state changes
  const handleBtnClick = (position, option) => {
    setOption(option)

    controls.start({
      left: position * btnWidth,
      transition: {
        type: 'tween',
        ease: 'circOut',
      },
    })
  }

  // btn generation
  const optionBtns = options.map((option) => (
    <button
      key={uuid()}
      type="button"
      style={{ color: option.color }}
      onClick={() => handleBtnClick(options.indexOf(option), option.name)}
      disabled={disabled}
    >
      {option.name}
    </button>
  ))

  // backgrounds for btns
  const optionBtnBacks = options.map(() => (
    <div className="btn" key={uuid()} />
  ))

  return (
    <div css={styles} className={className}>
      <div className="text">{optionBtns}</div>
      <div className="btns">{ optionBtnBacks }</div>
      <motion.div animate={controls} ref={backBtn} className="btn-back" />
    </div>
  )
}

ButtonSlider.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
      ]),
    ),
  ).isRequired,
  setOption: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  currentOption: PropTypes.string.isRequired,
  btnWidth: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default ButtonSlider
