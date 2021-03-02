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

import { fetchEditTour, fetchTour } from "../redux/actions";

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

const EditTourForm = ({ fetchEditTour, fetchTour }) => {
  const classes = useStyles();
  let { id } = useParams();
  const history = useHistory();
  const [tourInfo, setTourInfo] = useState({});
  const {
    title,
    startDate,
    endDate,
    description,
    includes,
    price,
    seats,
  } = tourInfo;

  const [editedTour, setEditedTour] = useState({});
  const [titleValue, setTitleValue] = useState(title);
  const [startDateValue, setStartDateValue] = useState(startDate);
  const [endDateValue, setEndDateValue] = useState(endDate);
  const [includesValue, setIncludesValue] = useState(includes);
  const [priceValue, setPriceValue] = useState(price);
  const [seatsValue, setSeatsValue] = useState(seats);
  const [descriptionValue, setDescriptionValue] = useState(description);

  useEffect(() => {
    fetchTour(id).then((data) => setTourInfo(data));
  }, [fetchTour, id]);

  console.log(tourInfo);

  const titleEdited = (e) => {
    setTitleValue(e.target.value);
        changeHandler(e);
  };

  const startDateEdited = (e) => {
    setStartDateValue(e.target.value);
        changeHandler(e);
  };
  const endDateEdited = (e) => {
    setEndDateValue(e.target.value);
        changeHandler(e);
  };
  const includesEdited = (e) => {
    setIncludesValue(e.target.value);
        changeHandler(e);
  };
  const priceEdited = (e) => {
    setPriceValue(e.target.value)
        changeHandler(e);
  };

  const descriptionEdited = (e) => {
    setDescriptionValue(e.target.value);
        changeHandler(e);
  };

  const seatsEdited = (e) => {
    setSeatsValue(e.target.value);
    changeHandler(e);
  };
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
                onChange={titleEdited}
                InputLabelProps={{
                  shrink: true,
                }}
                value={titleValue}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="startDate"
                name="startDate"
                label="Дата начала"
                onChange={startDateEdited}
                InputLabelProps={{
                  shrink: true,
                }}
                value={startDateValue}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="endDate"
                name="endDate"
                label="Дата окончания"
                onChange={endDateEdited}
                InputLabelProps={{
                  shrink: true,
                }}
                value={endDateValue}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="includes"
                name="includes"
                label="Включено в стоимость"
                onChange={includesEdited}
                InputLabelProps={{
                  shrink: true,
                }}
                value={includesValue}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="description"
                name="description"
                label="Описание"
                onChange={descriptionEdited}
                InputLabelProps={{
                  shrink: true,
                }}
                value={descriptionValue}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="price"
                name="price"
                label="Цена"
                onChange={priceEdited}
                InputLabelProps={{
                  shrink: true,
                }}
                value={priceValue}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="seats"
                name="seats"
                label="Осталось мест"
                onChange={seatsEdited}
                InputLabelProps={{
                  shrink: true,
                }}
                value={seatsValue}
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
  };
};

export default compose(
  withTourService(),
  connect(mapStateToProps, mapDispatchToProps)
)(EditTourForm);
