import update from "immutability-helper";
import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { Box } from "./Box.js";
import { ItemTypes } from "./ItemTypes.js";
import { Breadcrumb, Layout, Menu, Empty,  Card, Col, Row, theme } from 'antd';
import teslaDeviceOfferings from './DeviceInfo'

const {PIXELS_PER_FOOT,MAX_WIDTH_FEET} = require('./Constants');
const { Header, Content, Footer } = Layout;

const dndContainerStyles = {
  height: MAX_WIDTH_FEET*PIXELS_PER_FOOT,
  width: MAX_WIDTH_FEET*PIXELS_PER_FOOT,
  border: "1px solid #dedede",
  borderRadius: '7px',
  opacity: '50%',
  position: "relative",
  textAlign: "center",
};

const floorAreaContainerStyles = {
  height: MAX_WIDTH_FEET*PIXELS_PER_FOOT + 10,
  width: MAX_WIDTH_FEET*PIXELS_PER_FOOT + 10,
  border: "25px solid red",
  backgroundColor: "blue",
  borderRadius: '7px',
  position: "fixed",
  textAlign: "center",
  zIndex: 100,
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

  // Check if being dropped outside the container
  if(boxToCheckTop < 0 || boxToCheckLeft < 0 || boxToCheckBottom > dndContainerStyles.height || boxToCheckRight > dndContainerStyles.width) {
    return false;
  }

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
     
      if(currBoxTop >= boxToCheckTop && currBoxTop <= boxToCheckBottom &&
          currBoxBottom >= boxToCheckTop && currBoxBottom <= boxToCheckBottom &&
          currBoxLeft >= boxToCheckLeft && currBoxLeft <= boxToCheckRight &&
          currBoxRight >= boxToCheckLeft && currBoxRight <= boxToCheckRight) {
        return false;
      }

    }
  }
  return true;
}

export const DragAndDropContainer = ({outputPanelState, setOutputPanelState, boxes, setBoxes}) => {

  var rectArea = outputPanelState.rectangularArea;
  rectArea.leftPx = rectArea.left*PIXELS_PER_FOOT;
  rectArea.widthPx = rectArea.width*PIXELS_PER_FOOT;
  rectArea.topPx = rectArea.top * PIXELS_PER_FOOT;
  rectArea.heightPx = rectArea.height * PIXELS_PER_FOOT;

  console.log(`rect area: <${rectArea.topPx} ${rectArea.leftPx} ${rectArea.widthPx} ${rectArea.heightPx}>`);
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
    <Layout style={{backgroundColor: "white"}}>
      <table style={{verticalAlign: "top", border: "1px solid black"}}>
        <tbody style={{verticalAlign: "top", border: "1px solid black", textAlign: "center"}}>
          <tr>
            <td style={{border: "1px solid black"}}></td>
            <td>
              <table style={{width:"100%", height:"100%", border: "1px solid black"}}> 
              <tbody>
                <tr>
                  <td>
                    {rectArea.width} ft
                  </td>
                  </tr>
                  <tr>
                    <td style={{backgroundColor: "pink"}}>
                      
                    <div style={{
                      backgroundColor: "blue",
                      width:`${rectArea.widthPx}px`,
                      height:"5px",
                      margin: `0px ${rectArea.leftPx}px`
                      }}>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table style={{width:"100%", height:"100%", border: "1px solid black", verticalAlign: "top"}}>
                <tbody>
                  <tr>
                    <td>
                      {rectArea.height} ft
                    </td>
                    <td style={{backgroundColor: "pink", height:"100%", verticalAlign: "top"}}>
                      <div style={{
                        backgroundColor: "blue", 
                        width:"5px", 
                        height:`${rectArea.heightPx}px`,
                        margin:`${rectArea.topPx}px 0px`,
                        verticalAlign: "top"
                        }}>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td>
              <div ref={drop} style={dndContainerStyles}>
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
            </td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
};
