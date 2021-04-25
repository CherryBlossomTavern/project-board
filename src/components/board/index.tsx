/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd"
import {
  hexToRGBA,
  getItems,
  Board,
  Column,
  getUser,
  Item,
} from "scripts"

import "./style.scss"

const constructObject = (arr: 
  [string, Column][],
) => {
  return arr.reduce((acc, val) => {
    const [key, value] = val
    Object.assign(acc, { [key]: value })

    return acc
  }, {})
}

// const deleteItem = (columnId: string, itemId: string, columns: Board, setColumns:React.Dispatch<React.SetStateAction<Board>>) => {
//   setColumns({
//     ...columns,
//     [columnId]: {
//       ...columns[columnId],
//       items: columns[columnId].items.filter(item => item.id !== itemId),
//     },
//   })
// }

// const claim = (columnId: string, itemId: string, columns: Board, setColumns: React.Dispatch<React.SetStateAction<Board>>) => {

// }

const Board: React.FC = () => {
  const [columns, setColumns] = React.useState({} as Board)
  const [attempted, setAttempted] = React.useState(false)
  const [isLoggedIn, setLoggedIn] = React.useState(true)

  if (!Object.entries(columns)[0] && !attempted) {
    getContent()
  }
  async function getContent() {
    const items = await getItems()
    setAttempted(true)
    setColumns({
      ...columns,
      ...items, 
    })
  } 

  return (
    <div className="container">
      <DragDropContext
        onDragEnd={
          result => onDragEnd(result, columns, setColumns)
        }
      >
        <MasterDroppable
          columns={columns}
          isLoggedIn={isLoggedIn}
          columnState={{
            columns,
            setColumns, 
          }}
        />
      </DragDropContext>
    </div>
  )
}

interface MasterDropInterface {
  columns: Board
  isLoggedIn: boolean
  columnState: {
    columns: Board
    setColumns:React.Dispatch<React.SetStateAction<Board>>
  }
}

const MasterDroppable:
React.FC<MasterDropInterface> = (props) => {
  const {
    columns,
    isLoggedIn,
    columnState,
  } = props

  return (
    <Droppable
      droppableId="MainColumnContainer"
      key="MainColumnContainer"
      direction="horizontal"
      type="column"
    >
      {(provided) => {
        return(
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="container-all"
          >
            {Object.entries(columns)
              .map(([columnId, column], index) => {
                return (
                  <ColumnDraggable
                    column={column}
                    columnId={columnId}
                    index={index}
                    isLoggedIn={isLoggedIn}
                    key={columnId}
                    columnState={columnState}
                  />
                )
              })}
            {provided.placeholder}
          </div>
        )
      }}
    </Droppable>
  )
}

interface ColumnDraggableInterface {
  columnId: string
  column: Column
  index: number
  isLoggedIn: boolean
  columnState: {
    columns: Board
    setColumns:React.Dispatch<React.SetStateAction<Board>>
  }
}

const ColumnDraggable:
React.FC<ColumnDraggableInterface> = (props) => {
  const {
    columnId,
    column,
    index,
    isLoggedIn,
    columnState,
  } = props

  return(
    <Draggable
      key={columnId}
      draggableId={columnId}
      index={index}
      isDragDisabled={!isLoggedIn}
    >
      {(provided) => {
        return(
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="columnContainer"
            key={columnId}
          >
            <div className="columns">
              <h2 className="columnName">
                {column.name}
              </h2>
              <ColumnDroppable
                column={column}
                columnId={columnId}
                isLoggedIn={isLoggedIn}
                columnState={columnState}
              />
            </div>
          </div>
        )
      }}
    </Draggable>
  )
}

interface ColumnDroppableInterface {
  column: Column
  columnId: string
  isLoggedIn: boolean
  columnState: {
    columns: Board
    setColumns:React.Dispatch<React.SetStateAction<Board>>
  }
}

const ColumnDroppable:
React.FC<ColumnDroppableInterface> = (props) => {
  const {
    column,
    columnId,
    isLoggedIn,
    columnState,
  } = props

  return (
    <Droppable droppableId={columnId} key={columnId} type="item">
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
            {column.items.map((item, index) => {
              return (
                <ItemDraggable
                  item={item}
                  index={index}
                  column={column}
                  columnId={columnId}
                  isLoggedIn={isLoggedIn}
                  key={item.id}
                  columnState={columnState}
                />
              )
            })}
            {provided.placeholder}
          </div>
        )
      }}
    </Droppable>
  )

}

interface DraggableItemInterface {
  item: Item
  index: number
  column: Column
  columnId: string
  isLoggedIn: boolean
  columnState: {
    columns: Board
    setColumns:React.Dispatch<React.SetStateAction<Board>>
  }
}

const ItemDraggable: 
React.FC<DraggableItemInterface> = (props) => {
  const {
    item,
    index,
    isLoggedIn,
    column,
    columnId,
    columnState,
  } = props
  
  return (
    <Draggable
      key={item.id}
      draggableId={item.id}
      index={index}
      isDragDisabled={!isLoggedIn}
    >
      {(provided, snapshot) => {
        return (
          <Item
            provided={provided}
            snapshot={snapshot}
            item={item}
            column={column}
            columnId={columnId}
            columnState={columnState}
          />
        )
      }}
    </Draggable>
  )
}

interface ItemInterface {
  provided: DraggableProvided
  snapshot: DraggableStateSnapshot
  item: Item
  column: Column
  columnId: string
  columnState: {
    columns: Board
    setColumns:React.Dispatch<React.SetStateAction<Board>>
  }
}

const Item: React.FC<ItemInterface> = (props) => {
  const {
    provided,
    snapshot,
    item,
    columnState,
    columnId,
  } = props

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="item"
      onDoubleClick={()=>{
        claimItem(
          columnState.columns,
          columnState.setColumns,
          columnId,
          item.id,
        ).then(res => {
          if (res) alert("Task already taken by " + res)
        })
      }}
      style={{
        backgroundColor: snapshot.isDragging
          ? item.claimedBy
            ? "rgba(255,255,255,0.2)"
            : "rgba(255,255,255,0.4)"
          : item.claimedBy
            ? "rgba(255,255,255,0.05)"
            : "rgba(255,255,255,0.1)",
        ...provided.draggableProps.style,
      }}
    >
    
      <Avatar userId={item.claimedBy}/>

      <div
        className="taskContent"
        style={{
          opacity: item.claimedBy
            ? 0.5 
            : 1,
        }}
      >
        <div className="tags">
          {item.tags.map((tag) => {
            return (
              <div
                key={tag.id}
                className="tag"
                style={{ backgroundColor: tag.color }}
              >
                {tag.content}
              </div>
            )
          })}
        </div>
        <div className="content">
          {item.content}
        </div>
      </div>
      {/*
    <Button
      onClick={() => {
        deleteItem(columnId, item.id, columns, setColumns)
      }}
    >Delete</Button> */}
    </div>
  )
}

const Avatar: React.FC<{ userId: string }> = (props) => {
  const [avatar, setAvatar] = React.useState("")
  async function addAvatar() {
    const user = await getUser(props.userId)
    setAvatar(user.avatar)
  }
  if (props.userId) {
    addAvatar()

    return <img
      src={avatar}
      draggable="false"
      className="avatar"
    />
  } else {
    return null
  }
}

const claimItem = async (
  columns: Board,
  setColumns:React.Dispatch<React.SetStateAction<Board>>,
  columnId: string,
  itemId: string,
): Promise<string> => {
  const tempUserId = "316669053957832706"
  const items = columns[columnId].items
  const item = columns[columnId].items.find(item => item.id === itemId)
  const index = columns[columnId].items.findIndex(item => item.id === itemId)
  if (item.claimedBy && item.claimedBy !== tempUserId) {
    //return tempUserId
    const user = await getUser(tempUserId)

    return Promise.resolve(user.username)
  }
  if (item.claimedBy && item.claimedBy === tempUserId){
    const [removed] = items.splice(index, 1)
    items.splice(index, 0, {
      ...removed,
      claimedBy: null, 
    })
  }
  if (!item.claimedBy) {
    const [removed] = items.splice(index, 1)
    items.splice(index, 0, {
      ...removed,
      claimedBy: tempUserId, 
    })
  }
  setColumns({
    ...columns,
  })

  return Promise.resolve(null)
}

const onDragEnd = (
  result:DropResult,
  columns:Board,
  setColumns:React.Dispatch<React.SetStateAction<Board>>,
) => {
  if (!result.destination) return
  const { source, destination } = result

  if (source.droppableId === "MainColumnContainer") {
    const arr = Object.entries(columns)
    const [removed] = arr.splice(source.index, 1)
    arr.splice(destination.index, 0, removed)
    setColumns(constructObject(arr))
  } else {
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
}

export {
  Board,
}
