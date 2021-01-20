import React from "react";
import { Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "./navbar";
import Cards from "./cards";
import HomePage from "./homepage";
import Footer from "./footer";
import AddTour from "./add-tour-main";
import Login from "./login";
import TourDescription from "./tour-description"


export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <main>
        <Switch>
          <Route path="/" exact>
            <HomePage />{" "}
          </Route>
          <Route path="/tours" exact>
            <Cards />
          </Route>
          <Route path="/tours/new">
            <AddTour />
          </Route>
          <Route path="/tours/:id">
           <TourDescription/>
          </Route>
          <Route path="/login">
            <Login />
          </Route>

        </Switch>
      </main>
      <Footer />
    </React.Fragment>
  );
}
