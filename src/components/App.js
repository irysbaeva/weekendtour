import React from "react";
import { Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "./navbar";
import Cards from "./cards";
import HomePage from "./homepage";
import Footer from "./footer";
import AddTour from "./add-tour-main";
import Login from "./login";

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <main>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/tours" component={Cards} exact />
          <Route path="/tours/new" component={AddTour} />
          <Route path="/login" component={Login} />
        </Switch>
      </main>
      <Footer />
    </React.Fragment>
  );
}
