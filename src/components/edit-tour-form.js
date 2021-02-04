import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import compose from "../compose";
import withTourService from "../with-tour-service";
import Paper from "@material-ui/core/Paper";

import { fetchEditTour } from "../redux/actions";

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

const EditTourForm = ({
  fetchEditTour,

  fullDescription,
}) => {
  const classes = useStyles();
  let { id } = useParams();
  const history = useHistory();
  const [editedTour, setEditedTour] = useState({});

  const [titleValue, setTitleValue] = useState(fullDescription.title);
  const [priceValue, setPriceValue] = useState(fullDescription.price);
  const [seatsValue, setSeatsValue] = useState(fullDescription.seats);
  const [descriptionValue, setDescriptionValue] = useState(
    fullDescription.description
  );

  const titleEdited = (e) => {
    setTitleValue(e);
    setEditedTour({ ...editedTour, title: e });
  };

  const priceEdited = (e) => {
    setPriceValue(e);
    setEditedTour({ ...editedTour, price: e });
  };

  const descriptionEdited = (e) => {
    setDescriptionValue(e);
    setEditedTour({ ...editedTour, description: e });
  };

  const seatsEdited = (e) => {
    setSeatsValue(e);
    setEditedTour({ ...editedTour, seats: e });
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
                onChange={(e) => {
                  titleEdited(e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={titleValue || ""}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="description"
                name="description"
                label="Описание"
                onChange={(e) => {
                  descriptionEdited(e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={descriptionValue || ""}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="price"
                name="price"
                label="Цена"
                onChange={(e) => priceEdited(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                value={priceValue || ""}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="seats"
                name="seats"
                label="Осталось мест"
                onChange={(e) => seatsEdited(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                value={seatsValue || ""}
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

const mapStateToProps = ({ fullDescription }) => {
  return {
    fullDescription,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { tourService } = ownProps;
  return {
    fetchEditTour: fetchEditTour(tourService, dispatch),
  };
};

export default compose(
  withTourService(),
  connect(mapStateToProps, mapDispatchToProps)
)(EditTourForm);
