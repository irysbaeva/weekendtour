import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import compose from "../utils/compose";
import withTourService from "../with-tour-service";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import MenuItem from "@material-ui/core/MenuItem";

import { fetchNewBooking } from "../redux/actions";


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
  notice: {
    fontSize: "10px",
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const BookTourForm = (store) => {
  const classes = useStyles();
  const history = useHistory();
  const { fetchNewBooking, newBooking, tours } = store;

  const [booking, setBooking] = useState({ tour: newBooking.tour });
  const tour = tours.find((tour) => tour.id === newBooking.tour);
  const [selectedTour, setSelectedTour] = useState(tour);
  const { firstName, lastName, seats, phone, email } = booking;
  const isBookButtonDisabled =
    !firstName || !lastName || !seats || !phone || !email;

  const onChangeTour = (event) => {
    const changedTour = tours.find((tour) => tour.title === event.target.value);
    setBooking({ ...booking, [event.target.name]: changedTour.id });
    setSelectedTour(changedTour);
  };

  const changeHandler = (event) => {
    setBooking({ ...booking, [event.target.name]: event.target.value });
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
        seats,
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
          secondary: company ? company.companyName : null,
        },
        { primary: "Осталось мест", secondary: seats },
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
                name="tour"
                fullWidth
                onChange={(e) => onChangeTour(e)}
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
                onChange={changeHandler}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id={"lastName"}
                name={"lastName"}
                label={"Фамилия"}
                onChange={changeHandler}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id={"email"}
                name={"email"}
                label={"Email"}
                onChange={changeHandler}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id={"phone"}
                name={"phone"}
                label={"Телефон"}
                onChange={changeHandler}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                // id={"seats"}
                name={"seats"}
                id="select"
                label={"Выбрать количество мест"}
                defaultValue=""
                select
                fullWidth
                onChange={changeHandler}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8]
                  .filter((el) => el <= selectedTour.seats)
                  .map((el) => (
                    <MenuItem key={`seats${el}`} value={el}>
                      {el}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              disabled={isBookButtonDisabled}
              onClick={() => {
                fetchNewBooking(booking);
                history.push("/");
              }}
              className={classes.button}
            >
              Забронировать
            </Button>

          </Grid>
            <Typography className={classes.notice}>Стоимость, указанная на сайте не действительна для групп более 10 человек. По всем групповым заявкам просим присылать запросы на mice@weekend.ru</Typography>
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
  };
};

export default compose(
  withTourService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookTourForm);
