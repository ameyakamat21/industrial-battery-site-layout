import update from "immutability-helper";
import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { Box } from "./Box.js";
import { ItemTypes } from "./ItemTypes.js";
import { Breadcrumb, Layout, Menu, Empty,  Card, Col, Row, theme } from 'antd';
import teslaDeviceOfferings from './DeviceInfo'
import calculateRectangularArea from "./Utils.js";

const {PIXELS_PER_FOOT,MAX_WIDTH_FEET} = require('./Constants');
const { Header, Content, Footer } = Layout;

function doSnapToGrid(x, y) {
  const snappedX = Math.round(x / (10*PIXELS_PER_FOOT)) * (10*PIXELS_PER_FOOT);
  const snappedY = Math.round(y / (10*PIXELS_PER_FOOT)) * (10*PIXELS_PER_FOOT);
  return [snappedX, snappedY];
}

function isValidDrop(outputPanelState, boxes, id, boxToCheckLeft, boxToCheckTop) {
  var maxRight = MAX_WIDTH_FEET * PIXELS_PER_FOOT;
  var maxBottom = outputPanelState.rectangularArea.topPx + outputPanelState.rectangularArea.heightPx + 45*PIXELS_PER_FOOT;

  var boxToCheck = boxes[id];
  var boxToCheckRight = boxToCheckLeft + boxToCheck.dimensions.widthPx;
  var boxToCheckBottom = boxToCheckTop + boxToCheck.dimensions.lengthPx;

  // Check if being dropped outside the container
  if(boxToCheckTop < 0 || boxToCheckLeft < 0 || boxToCheckBottom > maxBottom || boxToCheckRight > maxRight) {
    return false;
  }

  for(var currBoxId in boxes) {
    if(id != currBoxId) {
      var currBox = boxes[currBoxId];
      var currBoxTop = currBox.top;
      var currBoxLeft = currBox.left;
      var currBoxRight = currBoxLeft + currBox.dimensions.widthPx;
      var currBoxBottom = currBoxTop + currBox.dimensions.lengthPx;

      // Check if any vertical and horizontal edges together align
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

      // Check if one box is entirely inside other box
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
  var dndContainerStyles = {
    height: rectArea.topPx + rectArea.heightPx + 45*PIXELS_PER_FOOT,
    width: MAX_WIDTH_FEET*PIXELS_PER_FOOT,
    border: "1px solid #dedede",
    borderRadius: '7px',
    opacity: '50%',
    position: "relative",
    textAlign: "center",
  };

  console.log(`rect area: <${rectArea.topPx} ${rectArea.leftPx} ${rectArea.widthPx} ${rectArea.heightPx}>`);
  const moveBox = useCallback(
    (id, left, top) => {
      var boxesCopy = {...boxes};
      boxesCopy[id].left = left;
      boxesCopy[id].top = top;
      setBoxes(boxesCopy);

      var outputPanelStateCopy = {...outputPanelState}
      outputPanelStateCopy.rectangularArea = calculateRectangularArea(boxesCopy);
      setOutputPanelState(outputPanelStateCopy);
    },
    [boxes, setBoxes, outputPanelState, setOutputPanelState],
  );
  
  const canDrop = useCallback(
    (id, left, top) => {
      return isValidDrop(outputPanelState, boxes, id, left, top);
    },
    [boxes, outputPanelState]
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
      <table style={{verticalAlign: "top", border: "0px solid black"}}>
        <tbody style={{verticalAlign: "top", border: "0px solid black", textAlign: "center"}}>
          <tr>
            <td style={{border: "0px solid black"}}></td>
            <td>
              <table style={{height:"100%", border: "0px solid black"}}> 
              <tbody>
                <tr>
                  <td style={{color: "#57b6fa", fontSize: '14px'}}>
                    {rectArea.width} ft
                  </td>
                  </tr>
                  <tr>
                    <td>
                    <div style={{
                      backgroundColor: "#57b6fa",
                      width:`${rectArea.widthPx}px`,
                      height:"2px",
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
              <table style={{width:"100%", height:"100%", border: "0px solid black", verticalAlign: "top"}}>
                <tbody>
                  <tr>
                    <td style={{color: "#57b6fa", fontSize: '14px'}}>
                      {rectArea.height} ft
                    </td>
                    <td style={{height:"100%", verticalAlign: "top"}}>
                      <div style={{
                        backgroundColor: "#57b6fa", 
                        width:"2px", 
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
                      {title}
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
