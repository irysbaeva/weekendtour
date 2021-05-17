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
  "Вход для туристических компаний",
  "Регистрация",
  "Выйти",
  "Забронировать тур",
  "Заявки",
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
    <AppBar position="sticky">
      <Toolbar>
        <Link to="/" className={classes.link}>
          <Button color="inherit">{menu[0]}</Button>
        </Link>

        {isLoggedin ? (
          <div>
            <Link to="/bookings" className={classes.link}>
              <Button color="inherit">{menu[7]}</Button>
            </Link>
            <Link to="/tours/new" className={classes.link}>
              <Button color="inherit">{menu[2]}</Button>
            </Link>
            <Link
              to="/"
              onClick={() => {
                logoutUser();
                localStorage.clear();
              }}
            >
              <Button className={classes.link} color="inherit">
                {menu[5]}
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/tours" className={classes.link}>
              <Button color="inherit">{menu[1]}</Button>
            </Link>
            <Link to="/bookings/new" className={classes.link}>
              <Button color="inherit">{menu[6]}</Button>
            </Link>
            <Link to="/login" className={classes.link}>
                <Button color="inherit" size="small" >{menu[3]}</Button>
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = ({isLoggedin}) => {
  return { isLoggedin };
};



export default connect(mapStateToProps, { logoutUser })(NavBar);
