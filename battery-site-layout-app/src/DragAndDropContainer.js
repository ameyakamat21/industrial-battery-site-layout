import update from "immutability-helper";
import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { Box } from "./Box.js";
import { ItemTypes } from "./ItemTypes.js";
import teslaDeviceOfferings from './DeviceInfo'

const {PIXELS_PER_FOOT,MAX_WIDTH_FEET} = require('./Constants');

console.log("PIXELS_PER_FOOT: " + PIXELS_PER_FOOT + ", MAX_WIDTH_FEET: " + MAX_WIDTH_FEET);

var boxesList = {}

const styles = {
  height: MAX_WIDTH_FEET*PIXELS_PER_FOOT,
  width: MAX_WIDTH_FEET*PIXELS_PER_FOOT,
  border: "1px solid black",
  position: "relative",
  textAlign: "center",
};

function doSnapToGrid(x, y) {
  const snappedX = Math.round(x / (10*PIXELS_PER_FOOT)) * (10*PIXELS_PER_FOOT);
  const snappedY = Math.round(y / (10*PIXELS_PER_FOOT)) * (10*PIXELS_PER_FOOT);
  return [snappedX, snappedY];
}

function doesPointLieInBox(point, box) {
  var topLeft = {x: box.left, y: box.top}
  var topRight = {x: box.left + box.dimensions.width, y: box.top}
  var bottomLeft = {x: box.left, y: box.top + box.dimensions.length}
  var bottomRight = {x: box.left + box.dimensions.width, y: box.top + box.dimensions.length}
}

function isValidDrop(boxes, id, left, top) {
  for(var currBoxId in boxes) {
    if(id != currBoxId) {
      var currBox = boxes[id];
    }
  }
}

export const DragAndDropContainer = ({formInput, boxes, setBoxes}) => {
  let getBoxes = () => boxes;
  console.log("boxes generated: " + JSON.stringify(getBoxes()));

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
    [boxes, setBoxes],
  )
  
  
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        var left = Math.round(item.left + delta.x);
        var top = Math.round(item.top + delta.y);
        [left, top] = doSnapToGrid(left, top);
        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox],
  )

  return (
    <div ref={drop} style={styles}>
      {Object.keys(boxes).map((key) => {
        const { top, left, title, dimensions } = boxes[key];
        return (
          <Box
            key={key}
            id={key}
            left={left}
            top={top}
            hideSourceOnDrag={true}
            dimensions={dimensions}
          >
            {title}
          </Box>
        );
      })}
    </div>
  );
};
