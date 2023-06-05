import { memo } from 'react'
import pixelsPerFoot from './Constants'

export const Box = memo(function Box({ title, yellow, preview, dimensions }) {
  const styles = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    cursor: 'move',
    width: `${10*pixelsPerFoot}px`,
    height: `${dimensions["length"]*pixelsPerFoot}px`,
  }
  const backgroundColor = yellow ? 'yellow' : 'white'
  return (
    <div
      style={{ ...styles, backgroundColor }}
      role={preview ? 'BoxPreview' : 'Box'}
    >
      {title}
    </div>
  )

})
