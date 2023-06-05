import { useCallback, useState } from 'react'
import { DragAndDropContainer } from './DragAndDropContainer.js'
import { CustomDragLayer } from './CustomDragLayer.js'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function DragAndDropPanel({formInput}) {
  return (
    <DndProvider backend={HTML5Backend}>
        <div>
            <DragAndDropContainer snapToGrid={true} formInput={formInput} />
            {/* <CustomDragLayer snapToGrid={true} /> */}
        </div>
    </DndProvider>
  )
}

export default DragAndDropPanel;