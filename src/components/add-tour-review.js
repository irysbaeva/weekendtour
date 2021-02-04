import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";

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
}));

function AddTourReview({ newTour }) {
  const classes = useStyles();
  const {
    title,
    startDate,
    endDate,
    description,
    price,
    includes,
    company,
    seats
  } = newTour;

 
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
      secondary: price,
    },
    {
      primary: "Организатор",
      secondary: company,
    },
    {
      primary: "Количество мест",
      secondary: seats,
    },
  ]; 
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

const mapStateToProps = ({ newTour }) => {
  return {
    newTour,
  };
};

export default connect(mapStateToProps)(AddTourReview);
