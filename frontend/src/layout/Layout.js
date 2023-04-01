import { Route, Switch } from "react-router-dom";

import React from "react";
import Home from "../home/Home";
import ObservationCreate from "../observations/ObservationCreate";
import Header from "./Header";
import Menu from "./Menu";
import NotFound from "./NotFound";

function Layout() {
  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <Switch>
          <Route path='/observations/new'>
            <ObservationCreate />
          </Route>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
