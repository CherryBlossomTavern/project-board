import * as React from "react"

import {
  BrowserRouter as MRouter,
  Route,
  Switch,
} from "react-router-dom"

import { Home } from "views/home"
import { FourOFour } from "views/404"

export const Router: React.FC = () => (
  <MRouter>
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="*" component={FourOFour} />
    </Switch>
  </MRouter>
)
