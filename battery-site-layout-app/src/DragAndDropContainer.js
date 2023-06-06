import update from "immutability-helper";
import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { Box } from "./Box.js";
import { ItemTypes } from "./ItemTypes.js";
import teslaDeviceOfferings from './DeviceInfo'

const {PIXELS_PER_FOOT,MAX_WIDTH_FEET} = require('./Constants');

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

function isValidDrop(boxes, id, boxToCheckLeft, boxToCheckTop) {
  var boxToCheck = boxes[id];
  var boxToCheckRight = boxToCheckLeft + boxToCheck.dimensions.widthPx;
  var boxToCheckBottom = boxToCheckTop + boxToCheck.dimensions.lengthPx;

  for(var currBoxId in boxes) {
    if(id != currBoxId) {
      var currBox = boxes[currBoxId];
      var currBoxTop = currBox.top;
      var currBoxLeft = currBox.left;
      var currBoxRight = currBoxLeft + currBox.dimensions.widthPx;
      var currBoxBottom = currBoxTop + currBox.dimensions.lengthPx;
      // console.log(`Checking overlap ${id} <${boxToCheckTop}, ${boxToCheckLeft}, ${boxToCheckBottom}, ${boxToCheckRight}> 
        // with ${currBoxId} <${currBoxTop}, ${currBoxLeft}, ${currBoxBottom}, ${currBoxRight}>`);

      if(boxToCheckTop == currBoxTop && boxToCheckLeft == currBoxLeft) {
        // console.log("TopLeft conflicts with box: " + currBoxId);
        return false;
      }
       
      if(boxToCheckTop == currBoxTop && boxToCheckRight == currBoxRight) {
        // console.log("TopRight conflicts with box: " + currBoxId);
        return false;
      }
       
      if(boxToCheckBottom == currBoxBottom && boxToCheckLeft == currBoxLeft) {
        // console.log("BottomLeft conflicts with box: " + currBoxId);
        return false;
      }
       
      if(boxToCheckBottom == currBoxBottom && boxToCheckRight == currBoxRight) {
        // console.log("BottomRight conflicts with box: " + currBoxId);
        return false;
      }

      if(boxToCheckTop >= currBoxTop && boxToCheckTop <= currBoxBottom &&
          boxToCheckBottom >= currBoxTop && boxToCheckBottom <= currBoxBottom &&
          boxToCheckLeft >= currBoxLeft && boxToCheckLeft <= currBoxRight &&
          boxToCheckRight >= currBoxLeft && boxToCheckRight <= currBoxRight) {
        return false;
      }

    }
  }
  return true;
}

export const DragAndDropContainer = ({formInput, boxes, setBoxes}) => {

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
  );
  
  const canDrop = useCallback(
    (id, left, top) => {
      return isValidDrop(boxes, id, left, top);
    },
    [boxes]
  );
  
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
      canDrop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        var left = Math.round(item.left + delta.x);
        var top = Math.round(item.top + delta.y);
        [left, top] = doSnapToGrid(left, top);
        return canDrop(item.id, left, top);
      },
    }),
    [moveBox, canDrop],
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
            {key}
          </Box>
        );
      })}
    </div>
  );
};
