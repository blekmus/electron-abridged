/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'

import Cropper from 'react-easy-crop'

function EntryCropper({
  path,
  setCropArea,
  setCropper,
  saveCrop,
}) {
  const styles = css`
    position: relative;
    height: 400px;
    width: 400px;

    &:hover {
      .crop-btns button {
        opacity: 1;
      }
    }

    .crop-btns {
      display: flex;
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 2;
      column-gap: 10px;

      button {
        border: none;
        font-size: 13px;
        font-weight: 800;
        background-color: #dc3939;
        color: white;
        border: none;
        border-radius: 3px;
        transition: 0.2s ease opacity, 0.2s ease background-color;
        width: 60px;
        height: 25px;
        opacity: 0;
        cursor: pointer;

        &:active {
          background-color: #a22727;
        }

        &.save {
          width: 45px;
        }
      }
    }

    .reactEasyCrop_Container {
      border-radius: 6px;
    }
  `

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCropArea([croppedArea, croppedAreaPixels])
  }, [])

  return (
    <div css={styles}>
      <div className="crop-btns">
        <button type="button" onClick={() => setCropper(false)}>CANCEL</button>
        <button type="button" className="save" onClick={saveCrop}>SAVE</button>
      </div>

      <Cropper
        image={`absfile://${path}`}
        crop={crop}
        zoom={zoom}
        zoomSpeed={0.1}
        aspect={16 / 9}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
    </div>
  )
}

EntryCropper.propTypes = {
  path: PropTypes.string.isRequired,
  setCropArea: PropTypes.func.isRequired,
  setCropper: PropTypes.func.isRequired,
  saveCrop: PropTypes.func.isRequired,
}

export default EntryCropper
