import * as React from "react"
import {
  render,
  lightTheme,
  darkTheme, 
} from "../../index"

import "./style.scss"

import {
  //IconButton,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core"
//import { HighlightOutlined } from "@material-ui/icons"

interface Props {
  theme: string
}

interface State {
  currTheme: string
}

export class Navbar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.changeTheme = this.changeTheme.bind(this)
  }
  state: State = {
    currTheme: this.props.theme,
  }
  changeTheme(): void {
    if (this.state.currTheme === "dark") {
      render(lightTheme)
      this.setState({ currTheme: "light" })
      window.localStorage.setItem("theme", "light")
    } else {
      render(darkTheme)
      this.setState({ currTheme: "dark" })
      window.localStorage.setItem("theme", "dark")
    }
  }
  render(): JSX.Element {
    return (
      <AppBar id="bar" position="fixed" color="transparent" elevation={1}>
        <div>
          <Toolbar id="toolbar">
            <Typography id="bar-title">Project Board</Typography>
            <Button id="login-button">Login</Button>
            {/* <IconButton onClick={this.changeTheme}><HighlightOutlined fontSize="default"/></IconButton> */ /* Yeah no, leaving flashlight mode disabled */}
          </Toolbar>
        </div>
      </AppBar>
    )
  }
}
