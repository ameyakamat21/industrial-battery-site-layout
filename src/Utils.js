
const {PIXELS_PER_FOOT,MAX_WIDTH_FEET} = require('./Constants');

function calculateRectangularArea(boxes) {
    if(boxes == null || boxes.length == 0) {
      return {"topPx": 0, 
            "leftPx": 0, 
            "widthPx": 0, 
            "heightPx": 0,
            "top": 0, 
            "left": 0, 
            "width": 0, 
            "height": 0,
          };
    }

    var topMost=boxes[0].top,leftMost=boxes[0].left, rightMost=0, bottomMost=0;
    for(var currId in boxes) {
      var currBox = boxes[currId];
      topMost=Math.min(topMost, currBox.top);
      leftMost=Math.min(leftMost, currBox.left);
      rightMost=Math.max(rightMost, currBox.left + currBox.dimensions.widthPx);
      bottomMost=Math.max(bottomMost, currBox.top + currBox.dimensions.lengthPx);
    }
    console.log("calculateRectArea, widthPx: " + rightMost-leftMost);
    return {"topPx": topMost, 
            "leftPx": leftMost, 
            "widthPx": rightMost - leftMost, 
            "heightPx": bottomMost - topMost,
            "top": topMost / PIXELS_PER_FOOT, 
            "left": leftMost / PIXELS_PER_FOOT, 
            "width": (rightMost - leftMost) / PIXELS_PER_FOOT, 
            "height": (bottomMost - topMost) / PIXELS_PER_FOOT,
          };
  }

  export default calculateRectangularArea;