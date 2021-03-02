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
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { fetchLogin } from "../redux/actions";
import { connect } from "react-redux";
import compose from "../utils/compose";
import withTourService from "../with-tour-service";

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
  const { isLoggedin, fetchLogin } = store;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const changeHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const redirect = () => {
    history.push(`/`);
  };
  return (
    <div>
      {isLoggedin && redirect() && open}

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Войти
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
                  autoComplete="email"
                  onChange={changeHandler}
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
                  autoComplete="current-password"
                  onChange={changeHandler}
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
              onClick={(event) => {
                event.preventDefault();
                fetchLogin(user).then((data) => {
                  console.log(`then${data}`);
                  if (data !== "Auth succesful") {
                    handleClick();
                  }
                });
              }}
            >
              Войти
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <MuiAlert
                elevation={6}
                variant="filled"
                severity="error"
                onClose={handleClose}
              >
                Неверный логин или пароль!
              </MuiAlert>
            </Snackbar>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Зарегистрироваться"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (store) => {
  return { isLoggedin: store.isLoggedin };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { tourService } = ownProps;
  return {
    fetchLogin: fetchLogin(tourService, dispatch),
  };
};

export default compose(
  withTourService(),
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
