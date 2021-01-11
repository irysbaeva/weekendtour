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
  } = newTour;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Информация о туре
      </Typography>

      <List disablePadding>
        <ListItem className={classes.listItem} key={title}>
          <ListItemText primary={"Маршрут"} secondary={title} />
        </ListItem>
        <ListItem className={classes.listItem} key={startDate}>
          <ListItemText primary={"Дата начала"} secondary={startDate} />
        </ListItem>
        <ListItem className={classes.listItem} key={endDate}>
          <ListItemText primary={"Дата окончания"} secondary={endDate} />
        </ListItem>
        <ListItem className={classes.listItem} key={description}>
          <ListItemText primary={"Описание"} secondary={description} />
        </ListItem>
        <ListItem className={classes.listItem} key={includes}>
          <ListItemText primary={"Включено"} secondary={includes} />
        </ListItem>
        <ListItem className={classes.listItem} key={price}>
          <ListItemText primary={"Стоимость"} secondary={price} />
        </ListItem>
        <ListItem className={classes.listItem} key={company}>
          <ListItemText primary={"Организатор"} secondary={company} />
        </ListItem>
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
