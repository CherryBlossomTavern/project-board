import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from "./app"
import CssBaseline from "@material-ui/core/CssBaseline"
import {
  RGBAToHex,
  hexToRGBA,
} from "scripts"
import { 
  createMuiTheme,
  ThemeProvider,
  Theme,
} from "@material-ui/core/styles"

export interface MainProps {
  props: {
    theme: string
  }
}

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    // primary: {
    //   light: "rgba(0,0,0, 0.1)",
    //   main: "rgba(0,0,0, 0.4)",
    //   dark: "rgba(0,0,0, 0.7)",
    // },
    text: {
      primary: RGBAToHex(0, 0, 0, 0.87),
      secondary: RGBAToHex(0, 0, 0, 0.54),
      disabled: RGBAToHex(0, 0, 0, 0.38),
      hint: RGBAToHex(0, 0, 0, 0.38),
    },
    background: {
      paper: "#f7f7f7",
      default: "#f7f7f7",
    },
    action: {
      active: RGBAToHex(0, 0, 0, 0.54),
      hover: RGBAToHex(0, 0, 0, 0.04),
      hoverOpacity: 0.04,
      selected: RGBAToHex(0, 0, 0, 0.08),
      selectedOpacity: 0.08,
      disabled: RGBAToHex(0, 0, 0, 0.26),
      disabledBackground: RGBAToHex(0, 0, 0, 0.12),
      disabledOpacity: 0.38,
      focus: RGBAToHex(0, 0, 0, 0.12),
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  },
})

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    // primary: {
    //   light: "",
    //   main: hexToRGBA("#ff69b4", 0.6),
    //   dark: "",
    //   contrastText: "#fff",
    // },
    text: {
      primary: "#fff",
      secondary: RGBAToHex(255, 255, 255, 0.7),
      disabled: RGBAToHex(255, 255, 255, 0.5),
      hint: RGBAToHex(255, 255, 255, 0.5),
    },
    background: {
      paper: "rgb(24, 18, 23)",
      default: "rgb(24, 18, 23)",
    },
    action: {
      active: "#fff",
      hover: RGBAToHex(255, 255, 255, 0.08),
      hoverOpacity: 0.08,
      selected: RGBAToHex(255, 255, 255, 0.16),
      selectedOpacity: 0.16,
      disabled: RGBAToHex(255, 255, 255, 0.3),
      disabledBackground: RGBAToHex(255, 255, 255, 0.12),
      disabledOpacity: 0.38,
      focus: RGBAToHex(255, 255, 255, 0.12),
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        "&:hover": {
          backgroundColor: hexToRGBA("#ff69b4", 0.2),
        },
      },
    },
    // MuiAppBar: {
    //   root: {
    //     backgroundColor: RGBAToHex(255, 255, 255, 0.2),
    //   },
    // },
    // MuiToolbar: {
    //   root: {
    //     backgroundColor: RGBAToHex(255, 255, 255, 0.2),
    //   },
    // },
  },
})

export function render(theme: Theme): void {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App theme={theme.palette.type}/>
    </ThemeProvider>,
    document.getElementById("root"),
  )
}

const localTheme = window.localStorage.getItem("theme")

render(localTheme === "light" ? lightTheme : darkTheme)
