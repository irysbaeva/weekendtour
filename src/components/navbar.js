import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions";

const menu = [
  "Главная",
  "График туров",
  "Добавить тур",
  "Вход",
  "Регистрация",
  "Выйти",
];

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "white",
  },
}));

const NavBar = ({ isLoggedin, logoutUser }) => {
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

        {isLoggedin ? (
          <Link to="/tours/new" className={classes.link}>
            <Button color="inherit">{menu[2]}</Button>
          </Link>
        ) : (
          <Link to="/signup" className={classes.link}>
            <Button color="inherit">{menu[4]}</Button>
          </Link>
        )}
        {isLoggedin ? (
          <Link
            to="/"
            onClick={() => {
              logoutUser(); // меняет isLoggedin на false
              localStorage.clear();

              console.log(`token...${localStorage.getItem("token")}`);
            }}
          >
            <Button className={classes.link} color="inherit">
              {menu[5]}
            </Button>
          </Link>
        ) : (
          <Link to="/login" className={classes.link}>
            <Button color="inherit">{menu[3]}</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (store) => {
  return { isLoggedin: store.isLoggedin };
};

const mapDispatchToProps = { logoutUser };

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
