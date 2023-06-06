import { useCallback, useState } from 'react'
import { DragAndDropContainer } from './DragAndDropContainer.js'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function DragAndDropPanel({formInput, boxes, setBoxes}) {
  return (
    <DndProvider backend={HTML5Backend}>
        <div>
            <DragAndDropContainer formInput={formInput} boxes={boxes} setBoxes={setBoxes}/>
        </div>
    </DndProvider>
  )
}

export default DragAndDropPanel;