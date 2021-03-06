import React from "react";
import { Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "./navbar";
import HomePage from "./homepage";
import Footer from "./footer";
import AddTour from "./add-tour-main";
import Login from "./login";
import TourDescription from "./tour-description";
import Schedule from "./schedule";
import EditTourForm from "./edit-tour-form";
import SignUp from "./signup";
import BookTourForm from "./book-tour-form";
import Bookings from "./bookings";

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <main>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/tours" exact>
            <Schedule />
          </Route>
          <Route path="/tours/new">
            <AddTour />
          </Route>
          <Route path="/tours/:id" exact>
            <TourDescription />
          </Route>
          <Route path="/tours/:id/edit">
            <EditTourForm />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/registration">
            <SignUp />
          </Route>
          <Route path="/bookings/new">
            <BookTourForm />
          </Route>
          <Route path="/bookings">
            <Bookings />
          </Route>
        </Switch>
      </main>
      <Footer />
    </React.Fragment>
  );
}
