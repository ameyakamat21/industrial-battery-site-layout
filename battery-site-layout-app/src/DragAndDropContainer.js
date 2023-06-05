import update from "immutability-helper";
import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { Box } from "./Box.js";
import { ItemTypes } from "./ItemTypes.js";
import teslaDeviceOfferings from './DeviceInfo'

const {PIXELS_PER_FOOT,MAX_WIDTH_FEET} = require('./Constants');

console.log("PIXELS_PER_FOOT: " + PIXELS_PER_FOOT + ", MAX_WIDTH_FEET: " + MAX_WIDTH_FEET);

const styles = {
  height: MAX_WIDTH_FEET*PIXELS_PER_FOOT*2,
  width: MAX_WIDTH_FEET*PIXELS_PER_FOOT,
  border: "1px solid black",
  position: "relative"
};

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
      var leftOffset = xPos * PIXELS_PER_FOOT;
      var topOffset = yPos * PIXELS_PER_FOOT;
      columnFillPositions[currCol] += boxDimensions["length"];
      var newBox = { top: topOffset, left: leftOffset, title: deviceType, dimensions: boxDimensions }
      boxes[boxId] = newBox;
      currCol = (currCol+1)%10;
      boxId += 1;
    }
  }
  return boxes;
}

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

export const DragAndDropContainer = ({ snapToGrid, formInput }) => {
  const [boxes, setBoxes] = useState(genrateBoxProperties(formInput));

  const moveBox = useCallback(
    (id, left, top) => {
       setBoxes(
        (boxes) => {      
          boxes[id].left = left;
          boxes[id].top = top;
          return boxes;
        }
      );
    },
    [boxes, setBoxes]
  );
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        var left = Math.round(item.left + delta.x);
        var top = Math.round(item.top + delta.y);
        [left, top] = doSnapToGrid(left, top);
        var boxesCopy = {...boxes};
        boxesCopy[item.id].left = left;
        boxesCopy[item.id].top = top;
        setBoxes(boxesCopy);
        return undefined;
      }
    })
  );
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
