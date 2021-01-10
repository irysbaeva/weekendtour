import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import img from "../pic.webp";
import Cards from "./cards";
import AddTour from "./add-tour-main";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
  },
  header: {
    color: "white",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            className={classes.header}
            component="h1"
            variant="h2"
            align="center"
            color="secondary"
            gutterBottom
          >
            Активный отдых Походы, сплавы, восхождения
          </Typography>
          <Typography
            variant="h5"
            align="center"
            className={classes.header}
            paragraph
          >
            Все туры в одном месте
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Link to="/tours" className={classes.link}>
                  <Button variant="contained" color="primary">
                    Выбрать тур
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                {/* <Button variant="outlined" color="primary">
                    Secondary action
                  </Button> */}
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Cards />
      <AddTour />
    </div>
  );
}
