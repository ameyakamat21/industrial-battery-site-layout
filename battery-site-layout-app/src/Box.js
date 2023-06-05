import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'
import pixelsPerFoot from './Constants';

export const Box = ({ id, left, top, hideSourceOnDrag, children, dimensions }) => {
  console.log("Box l=" + dimensions["length"] + ", w=" + dimensions["width"])
  var style = {
    position: 'absolute',
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.25rem 0.5rem',
    cursor: 'move',
    width: `${dimensions["width"]*pixelsPerFoot}px`,
    height: `${dimensions["length"]*pixelsPerFoot}px`,
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
