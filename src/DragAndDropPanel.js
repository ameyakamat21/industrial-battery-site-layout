import { useCallback, useState } from 'react'
import { DragAndDropContainer } from './DragAndDropContainer.js'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function DragAndDropPanel({outputPanelState, setOutputPanelState, boxes, setBoxes}) {
  return (
    <DndProvider backend={HTML5Backend}>
        <div>
            <DragAndDropContainer 
              outputPanelState={outputPanelState}
              setOutputPanelState={setOutputPanelState}
              boxes={boxes}
              setBoxes={setBoxes}/>
        </div>
    </DndProvider>
  )
}

export default DragAndDropPanel;