import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import compose from "../utils/compose";
import withTourService from "../with-tour-service";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

import { fetchEditTour, fetchTour, fetchTours } from "../redux/actions";

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
}));

const EditTourForm = ({ fetchEditTour, fetchTour,fetchTours }) => {
  const classes = useStyles();
  let { id } = useParams();
  const history = useHistory();

  const [editedTour, setEditedTour] = useState({});

  useEffect(() => {
    fetchTour(id).then(
      ({ title, startDate, endDate, description, includes, price, seats,company }) => {
        setEditedTour({
          title: title,
          startDate: moment(startDate, "DD.MM.YYYY").format("YYYY-MM-DD"),
          endDate: moment(endDate, "DD.MM.YYYY").format("YYYY-MM-DD"),
          description: description,
          includes: includes,
          price: price,
          seats: seats,
          company:company._id
        });
      }
    );
  }, [fetchTour, id]);

  const {
    title,
    startDate,
    endDate,
    description,
    includes,
    price,
    seats
  } = editedTour;

  console.log(editedTour);

  const changeHandler = (e) => {
    setEditedTour({ ...editedTour, [e.target.name]: e.target.value });
  };

  const redirect = (id) => {
    history.push(`/tours/${id}`);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Редактировать данные
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="title"
                name="title"
                label="Маршрут"
                onChange={changeHandler}
                InputLabelProps={{
                  shrink: true,
                }}
                value={title}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="startDate"
                name="startDate"
                type="date"
                label="Дата начала"
                onChange={changeHandler}
                InputLabelProps={{
                  shrink: true,
                }}
                value={startDate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="endDate"
                name="endDate"
                type="date"
                label="Дата окончания"
                onChange={changeHandler}
                InputLabelProps={{
                  shrink: true,
                }}
                value={endDate}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="includes"
                name="includes"
                label="Включено в стоимость"
                onChange={changeHandler}
                InputLabelProps={{
                  shrink: true,
                }}
                value={includes}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="description"
                name="description"
                label="Описание"
                onChange={changeHandler}
                InputLabelProps={{
                  shrink: true,
                }}
                value={description}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="price"
                name="price"
                label="Цена"
                onChange={changeHandler}
                InputLabelProps={{
                  shrink: true,
                }}
                value={price}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="seats"
                name="seats"
                label="Осталось мест"
                onChange={changeHandler}
                InputLabelProps={{
                  shrink: true,
                }}
                value={seats}
                fullWidth
              />
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                fetchEditTour(id, editedTour);
                redirect(id);
              }}
              className={classes.button}
            >
              Сохранить
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
    fetchEditTour: fetchEditTour(tourService, dispatch),
    fetchTour: fetchTour(tourService, dispatch),
    fetchTours: fetchTours(tourService, dispatch),
  };
};

export default compose(
  withTourService(),
  connect(mapStateToProps, mapDispatchToProps)
)(EditTourForm);
