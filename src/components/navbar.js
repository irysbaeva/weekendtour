import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const menu = ["Главная", "График туров", "Добавить тур", "Login"];

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "white",
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar>
        <Link to="/" className={classes.link}>
          <Button color="inherit">{menu[0]}</Button>
        </Link>
        <Link to="/tours" className={classes.link}>
          <Button color="inherit">{menu[1]}</Button>
        </Link>
        <Link to="/tours/new" className={classes.link}>
          <Button color="inherit">{menu[2]}</Button>
        </Link>
        <Link to="/login" className={classes.link}>
          <Button color="inherit">{menu[3]}</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
