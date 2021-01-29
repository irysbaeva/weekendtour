import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { logoutUser } from "../redux/actions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = ({ logoutUser, isLoggedin }) => {
  const classes = useStyles();
  console.log(`status login ${isLoggedin}`);

  return (
    <div>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          {/* <Button variant="contained" color="primary" onClick={logoutUser}>
            logout 
          </Button> */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              logoutUser();
              localStorage.clear();

              console.log(`token...${localStorage.getItem("token")}`);
            }}
          >
            logout and clear localStorage
          </Button>
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
    </div>
  );
};

const mapStateToProps = (store) => {
  return { isLoggedin: store.isLoggedin };
};

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
