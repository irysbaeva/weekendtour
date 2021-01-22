import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { fetchTour } from "../redux/actions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import compose from "../compose";
import withTourService from "../with-tour-service";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

const TourDescription = ({ fullDescription, fetchTour }) => {
  let { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    fetchTour(id);
  }, [fetchTour, id]);

  const redirectToEditTour = (id) => {
    history.push(`${id}/edit`);
  };
  const {
    title,
    startDate,
    endDate,
    description,
    includes,
    price,
    company,
  } = fullDescription;
  const tour = [
    {
      primary: "Маршрут",
      secondary: title,
    },
    {
      primary: "Дата начала",
      secondary: startDate,
    },
    {
      primary: "Дата окончания",
      secondary: endDate,
    },
    {
      primary: "Описание",
      secondary: description,
    },
    {
      primary: "Включено",
      secondary: includes,
    },
    {
      primary: "Стоимость",
      secondary: `${price} рублей`,
    },
    {
      primary: "Организатор",
      secondary: company,
    },
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Информация о туре
          </Typography>

          <List disablePadding>
            {tour.map((el) => {
              return (
                <ListItem className={classes.listItem} key={el.primary}>
                  <ListItemText primary={el.primary} secondary={el.secondary} />
                </ListItem>
              );
            })}
          </List>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              redirectToEditTour(id);
            }}
          >
            Изменить
          </Button>
        </Paper>
      </main>
    </React.Fragment>
  );
};

const mapStateToProps = ({ fullDescription }) => {
  return {
    fullDescription,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { tourService } = ownProps;
  return {
    fetchTour: fetchTour(tourService, dispatch),
  };
};

export default compose(
  withTourService(),
  connect(mapStateToProps, mapDispatchToProps)
)(TourDescription);
