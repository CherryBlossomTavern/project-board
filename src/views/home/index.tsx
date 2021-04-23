/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react"
import "./style.scss"
import { Board } from "components/board"
export const Home: React.FC = () => {
  return (
    <div className="home">
      <Board />
    </div>
  )
}
// export const Home: React.FC = () => {
//   function temp(): void {
//     //
//   }

//   return (
//     <div className="home">
//       <DragDropContext onDragEnd={temp}>
//         <div className="contentArea">
//           <Droppable droppableId="categories">
//             {(provided): JSX.Element => (
//               <div className="card" {...provided.droppableProps} ref={provided.innerRef}>
//                 <Typography className="title">Test Category Yis Yis</Typography>
//                 {tempItems.map(({ id, text }, index) => {
//                   return (
//                     <Draggable key={id} draggableId={id} index={index}>
//                       {(provided): JSX.Element => (
//                         <div className="innerCard" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//                           <p>{text}</p>
//                         </div>
//                       )}
//                     </Draggable>
//                   )
//                 })}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </div>
//       </DragDropContext>
//     </div>
//   )
// }
