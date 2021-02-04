import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
// import { useParams } from "react-router-dom";
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
}));

const BookTourForm = (store) => {
    const classes = useStyles();
    // let { id } = useParams();
    const history = useHistory();
    const { fetchNewBooking, newBooking, tours } = store;
    const [booking, setBooking] = useState({
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        seats: null,
        tour: newBooking.tour,
    });
    let tour = tours.filter((tour) => tour.id === newBooking.tour)[0];
    const [selectedTour, setSelectedTour] = useState(tour);

    const onChangeTour = (title) => {
        const changedTour = tours.filter((tour) => tour.title === title)[0];
        setSelectedTour(changedTour);
        setBooking({ ...booking, tour: changedTour.id });
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
                                        {tour.id}
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
                                onChange={(e) => {
                                    setBooking({ ...booking, firstName: e.target.value });
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id={"lastName"}
                                name={"lastName"}
                                label={"Фамилия"}
                                onChange={(e) => {
                                    setBooking({ ...booking, lastName: e.target.value });
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id={"email"}
                                name={"email"}
                                label={"Email"}
                                onChange={(e) => {
                                    setBooking({ ...booking, email: e.target.value });
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id={"phone"}
                                name={"phone"}
                                label={"phone"}
                                onChange={(e) => {
                                    setBooking({ ...booking, phone: e.target.value });
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id={"seats"}
                                name={"seats"}
                                label={"seats"}
                                onChange={(e) => {
                                    setBooking({ ...booking, seats: e.target.value });
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                fetchNewBooking(booking);

                                history.push("/")

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
    };
};

export default compose(
    withTourService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookTourForm);

/* {arr.map(({ name, label, xs }) => {
              return ( */
/* <Grid item xs={xs}>
                  <TextField
                    required
                    id={name}
                    name={name}
                    label={label}
                    onChange={(e) => {
                      setBooking({ ...booking, keys: e.target.value });
                    }}
                    fullWidth
                  />
                </Grid> */
/* //   ); */
/* // })} */

// const arr = [
//   {
//     xs: 6,
//     name: "firstName",
//     label: "Имя",
//   },
//   {
//     xs: 6,
//     name: "lastName",
//     label: "Фамилия",
//   },
//   {
//     xs: 12,
//     name: "email",
//     label: "Email",
//   },
//   {
//     xs: 12,
//     name: "phone",
//     label: "Телефон",
//   },
//   {
//     xs: 12,
//     name: "seats",
//     label: "Количество мест",
//   },
// ];
