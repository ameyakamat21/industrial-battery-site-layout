import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'

const {PIXELS_PER_FOOT,MAX_WIDTH_FEET} = require('./Constants');

export const Box = ({ id, left, top, hideSourceOnDrag, children, dimensions }) => {

  var style = {
    position: 'absolute',
    border: '1px solid #dedede',
    borderRadius: '7px',
    backgroundColor: '#f7f7f7',
    padding: '0.25rem 0.5rem',
    cursor: 'move',
    width: `${dimensions.widthPx}px`,
    height: `${dimensions.lengthPx}px`,
    wordWrap: 'break-word',
    fontSize: '14px',
  };

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  )
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />
  }
  return (
    <div
      className="box"
      ref={drag}
      style={{ ...style, left, top }}
      data-testid="box"
    >
      {children}
    </div>
  )
}
