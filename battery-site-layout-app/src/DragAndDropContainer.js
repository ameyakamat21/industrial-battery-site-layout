import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { DraggableBox } from './DraggableBox.js'
import { ItemTypes } from './ItemTypes.js'
import { snapToGrid as doSnapToGrid } from './snapToGrid.js'
import teslaDeviceOfferings from './DeviceInfo'

const styles = {
 
  height: 200,
  border: '1px solid black',
  position: 'relative',
}

function genrateBoxProperties(formInput) {
  var boxes = {};
  var boxId=0;
  var columnFillPositions = new Array(10).fill(0);
  var currCol = 0;
  for(const deviceType in formInput) {
    var boxDimensions = teslaDeviceOfferings[deviceType]["dimensions"];
    var count = formInput[deviceType];
    for (let i = 0; i < count; i++) {
      var xPos = currCol*10;
      var yPos = columnFillPositions[currCol]
      columnFillPositions[currCol] += boxDimensions["length"];
      var newBox = { top: yPos, left: xPos, title: deviceType }
      boxes[boxId] = newBox;
      currCol+=1
      boxId += 1;
    }
  }
  console.log("Boxes: " + boxes)
  return boxes;
}

export const DragAndDropContainer = ({ snapToGrid, formInput }) => {
  // const [boxes, setBoxes] = useState({
  //   a: { top: 20, left: 80, title: 'Drag me aroundddddd' },
  //   b: { top: 180, left: 20, title: 'Drag me too' },
  // })

  const [boxes, setBoxes] = useState(genrateBoxProperties(formInput));
  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
    },
    [boxes],
  )
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset()
        let left = Math.round(item.left + delta.x)
        let top = Math.round(item.top + delta.y)
        if (snapToGrid) {
          ;[left, top] = doSnapToGrid(left, top)
        }
        moveBox(item.id, left, top)
        return undefined
      },
    }),
    [moveBox],
  )
  return (
    <div ref={drop} style={styles}>
      {Object.keys(boxes).map((key) => (
        <DraggableBox key={key} id={key} {...boxes[key]} />
      ))}
    </div>
  )
}
