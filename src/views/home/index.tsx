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
