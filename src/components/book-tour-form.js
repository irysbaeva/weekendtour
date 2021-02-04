import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import compose from "../compose";
import withTourService from "../with-tour-service";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import Select from "@material-ui/core/Select";

import {
  fetchNewBooking,
  firstNameAdded,
  lastNameAdded,
  emailAdded,
  phoneAdded,
  bookSeats,
  tourAdded,
} from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
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
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  tourInfo: {
    fontSize: "10px",
    padding: theme.spacing(0),
  },
}));

const BookTourForm = (store) => {
  const classes = useStyles();
  // let { id } = useParams();
  const history = useHistory();
  const {
    fetchNewBooking,
    newBooking,
    tours,
    firstNameAdded,
    lastNameAdded,
    emailAdded,
    phoneAdded,
    bookSeats,
    tourAdded,
  } = store;

  let tour = tours.filter((tour) => tour.id === newBooking.tour)[0];
  const [selectedTour, setSelectedTour] = useState(tour);

  const onChangeTour = (title) => {
    const changedTour = tours.filter((tour) => tour.title === title)[0];
    setSelectedTour(changedTour);
    tourAdded(changedTour.id);
  };
  let tourInfo = [];
  const tourInfoGet = () => {
    if (selectedTour) {
      const {
        title,
        startDate,
        endDate,
        includes,
        price,
        company,
      } = selectedTour;
      return (tourInfo = [
        {
          primary: "Маршрут",
          secondary: title,
        },
        {
          primary: "Даты поездки",
          secondary: `${startDate} - ${endDate}`,
        },

        {
          primary: "Включено",
          secondary: includes,
        },
        {
          primary: "Стоимость",
          secondary: `${price} руб./чел.`,
        },
        {
          primary: "Организатор",
          secondary: company,
        },
      ]);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Параметры бронирования
          </Typography>
          {selectedTour && tourInfoGet() ? (
            <List className={classes.tourInfo} disablePadding>
              {tourInfo.map((el) => {
                return (
                  <ListItem
                    className={classes.tourInfo}
                    key={`${el.primary}${el.secondary}`}
                  >
                    <ListItemText
                      primary={el.primary}
                      secondary={el.secondary}
                    />
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <div></div>
          )}

          <Typography variant="h6" gutterBottom>
            Внести данные
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="select"
                label={selectedTour ? "Изменить тур" : "Выбрать тур"}
                defaultValue=""
                select
                fullWidth
                onChange={(e) => onChangeTour(e.target.value)}
              >
                {tours.map((tour) => (
                  <MenuItem key={`selected${tour.title}`} value={tour.title}>
                    {tour.title}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id={"firstName"}
                name={"firstName"}
                label={"Имя"}
                onChange={(e) => firstNameAdded(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id={"lastName"}
                name={"lastName"}
                label={"Фамилия"}
                onChange={(e) => lastNameAdded(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id={"email"}
                name={"email"}
                label={"Email"}
                onChange={(e) => emailAdded(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id={"phone"}
                name={"phone"}
                label={"Телефон"}
                onChange={(e) => phoneAdded(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                // id={"seats"}
                // name={"seats"}
                // label={"seats"}
                id="select"
                label={"Выбрать количество мест"}
                defaultValue=""
                select
                fullWidth
                onChange={(e) => bookSeats(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6].map((el) => (
                  <MenuItem key={`selected${el}`} value={el}>
                    {el}
                  </MenuItem>
                ))}{" "}
              </TextField>
              
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                fetchNewBooking(newBooking);

                history.push("/");
              }}
              className={classes.button}
            >
              Забронировать
            </Button>
          </Grid>
        </Paper>
      </main>
    </React.Fragment>
  );
};

const mapStateToProps = (store) => {
  return store;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { tourService } = ownProps;
  return {
    fetchNewBooking: fetchNewBooking(tourService, dispatch),
    firstNameAdded: (name) => dispatch(firstNameAdded(name)),
    lastNameAdded: (lastName) => dispatch(lastNameAdded(lastName)),
    emailAdded: (email) => dispatch(emailAdded(email)),
    phoneAdded: (phone) => dispatch(phoneAdded(phone)),
    bookSeats: (seats) => dispatch(bookSeats(seats)),
    tourAdded: (tourId) => dispatch(tourAdded(tourId)),
  };
};

export default compose(
  withTourService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookTourForm);
