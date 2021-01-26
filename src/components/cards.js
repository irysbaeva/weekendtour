import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { fetchTours } from "../redux/actions";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import compose from "../compose";
import withTourService from "../with-tour-service";
import ErrorIndicator from "./error-indicator";
import Spinner from "./spinner";
import tourService from "../tour-service";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const Cards = ({ tours, fetchTours, loading, error }) => {
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorIndicator />;
  }

  const redirect = (id) => {
    history.push(`tours/${id}`);
  };
  const deleteTour = async (id) => {
    await tourService.deleteTour(id);
    fetchTours();
  };


  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {tours.map(({ title, startDate, endDate, price, id, image }) => (
          <Grid item key={title} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={`http://localhost:3333/${image}`}
                title="Image title"
              />

              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {title}
                </Typography>
                <Typography>
                  {startDate} - {endDate}
                </Typography>
                <Typography>{price} руб.</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    redirect(id);
                  }}
                >
                  Подробнее
                </Button>
             
                <Button
                  onClick={() => {
                    deleteTour(id);
                  }}
                  size="small"
                  color="primary"
                >
                  Удалить
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const mapStateToProps = ({ tours, loading, error }) => {
  return {
    tours,
    loading,
    error,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { tourService } = ownProps;
  return {
    fetchTours: fetchTours(tourService, dispatch),
  };
};

export default compose(
  withTourService(),
  connect(mapStateToProps, mapDispatchToProps)
)(Cards);
