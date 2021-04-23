import * as React from "react"
import { Router } from "router"
import { Navbar } from "components/navbar"

// Global stylesheet
import "scss/global.scss"

interface Props {
  theme: string
}

export class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }
  render(): JSX.Element {
    return (
      <div>
        <Navbar theme={this.props.theme} />
        <Router/>
      </div>
    )
  }
}
