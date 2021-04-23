/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react"
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd"
import { v4 as uuid } from "uuid"
import { hexToRGBA } from "scripts"

import "./style.scss"

// const itemsFromBackend: {id:string,content:string}[] = [
//   {
//     id: uuid(),
//     content: "First task", 
//   },
//   {
//     id: uuid(),
//     content: "Second task", 
//   },
//   {
//     id: uuid(),
//     content: "Third task", 
//   },
//   {
//     id: uuid(),
//     content: "Fourth task", 
//   },
//   {
//     id: uuid(),
//     content: "Fifth task", 
//   },
//   {
//     id: uuid(),
//     content: "First task", 
//   },
//   {
//     id: uuid(),
//     content: "Second task", 
//   },
//   {
//     id: uuid(),
//     content: "Third task", 
//   },
//   {
//     id: uuid(),
//     content: "Fourth task", 
//   },
//   {
//     id: uuid(),
//     content: "Fifth task", 
//   },
//   {
//     id: uuid(),
//     content: "Fifth task", 
//   },
// ]

const columnsFromBackend:{[uuid:string]:{name:string,items:{id:string,content:string}[]}} = {
  [uuid()]: {
    name: "Col",
    items: [
      {
        id: uuid(),
        content: "Make Columns Dragable", 
      },
      {
        id: uuid(),
        content: "Sync With Database", 
      },
      {
        id: uuid(),
        content: "Sign In With Discord", 
      },
      {
        id: uuid(),
        content: "Add New Columns/Tasks", 
      },
      {
        id: uuid(),
        content: "Add Tags To Tasks & Color Coding", 
      },
      {
        id: uuid(),
        content: "Add Claiming Tasks", 
      },
      {
        id: uuid(),
        content: "Websockets", 
      },
    ],
  },
  [uuid()]: {
    name: "Col",
    items: [],
  },
  [uuid()]: {
    name: "Col",
    items: [],
  },
  [uuid()]: {
    name: "Col",
    items: [],
  },
  [uuid()]: {
    name: "Col",
    items: [],
  },
  [uuid()]: {
    name: "Col",
    items: [],
  },
  [uuid()]: {
    name: "Col",
    items: [],
  },
  [uuid()]: {
    name: "Col",
    items: [],
  },
}

const onDragEnd = (result:any, columns:any, setColumns:any) => {
  if (!result.destination) return
  const { source, destination } = result

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destItems = [...destColumn.items]
    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    })
  } else {
    const column = columns[source.droppableId]
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    })
  }
}
export const Board: React.FC = () => {
  const [columns, setColumns] = React.useState(columnsFromBackend)
  
  return (
    <div className="container">
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <div
              className="columnContainer"
              key={columnId}
            >
              {/* <h2>{column.name}</h2> */}
              <div className="columns">
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="column"
                        style={{
                          background: snapshot.isDraggingOver
                            ? hexToRGBA("#ff69b4", 0.4)
                            : "rgba(255,255,255,0.1)",
                        }}
                      >
                        <h2 className="columnName">{column.name}</h2>
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="item"
                                    style={{
                                      backgroundColor: snapshot.isDragging
                                        ? "rgba(255,255,255,0.4)"
                                        : "rgba(255,255,255,0.1)",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                )
                              }}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}
                      </div>
                    )
                  }}
                </Droppable>
              </div>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  )
}
