import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      © Weekend Tour {new Date().getFullYear()} <br />
      +7 922 000 00 01 weekendtour@mail.ru
    </Typography>
  );
}

const Footer = () => {
  const classes = useStyles();

  return (
    <div>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom></Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        ></Typography>
        <Copyright />
      </footer>
    </div>
  );
};

export default Footer;
