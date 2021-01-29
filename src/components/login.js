import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { fetchLogin, loginUser, logoutUser } from "../redux/actions";
import { connect } from "react-redux";
import compose from "../compose";
import withTourService from "../with-tour-service";
// import Notification from "./notification";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (store) => {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState({});
  const { isLoggedin, loginUser, logoutUser, fetchLogin } = store;

  const onEmailAdded = (email) => {
    setUser({ ...user, email: email });
  };
  const onPasswordAdded = (password) => {
    setUser({ ...user, password: password });
  };

  const redirect = () => {
    history.push(`/`);
  };
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  // autoComplete="email"
                  onChange={(e) => onEmailAdded(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  // autoComplete="current-password"
                  onChange={(e) => onPasswordAdded(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              // onClick={(event) => {
              //   console.log(user);
              //   event.preventDefault();
              //   fetchLogin(user);
              //   if (isLoggedin) {
              //     redirect();
              //   }
              // }}
              onClick={async (e) => {
                e.preventDefault();
                const response = await fetch(`http://localhost:5000/login`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: user.email,
                    password: user.password,
                  }),
                });
                const res = await response.json();

                if (res.token) {
                  localStorage.setItem("token", res.token);
                  // console.log(res.token);
                  loginUser(); // должен менять статус isLoggedin с false на  true
                  // в редаксе видно что стэйт изменился сразу на true,  но в консоле
                  // по прежнему  false, только при повторном нажатии на кнопку
                  // меняется на true

                  const timer = () => {
                    setTimeout(() => {
                      console.log(isLoggedin);
                    }, 1000);
                  };
                  timer();

                  if (isLoggedin) {
                    // redirect();
                    // не перенаправляет на нужную страницу
                    //так как статус isLoggedin = false
                  }
                }
              }}
            >
              login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Button variant="contained" color="primary" onClick={logoutUser}>
          logout ( пока только меняет статут isLoggedin на false)
        </Button>
      </Container>
    </div>
  );
};

const mapStateToProps = (store) => {
  return { isLoggedin: store.isLoggedin };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//   const { tourService } = ownProps;
//   return {
//     fetchLogin: fetchLogin(tourService, dispatch),
//   };
// };

function mapDispatchToProps(dispatch) {
  return {
    loginUser: () => {
      dispatch(loginUser());
    },
    logoutUser: () => {
      dispatch(logoutUser());
    },
  };
}

export default compose(
  withTourService(),
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
