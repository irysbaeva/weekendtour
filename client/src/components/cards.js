import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { fetchTours, addTourToBook } from "../redux/actions";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ErrorIndicator from "./error-indicator";
import Spinner from "./spinner";
import tourService from "../tour-service";
import { options } from "../utils/constants";

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

const Cards = (store) => {
  const classes = useStyles();
  const history = useHistory();
  const {
    tours,
    fetchTours,
    loading,
    error,
    isLoggedin,
    currentUser,
    addTourToBook,
  } = store;
  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorIndicator />;
  }

  const getInfo = (id) => {
    history.push(`tours/${id}`);
  };
  const bookTour = (id) => {
    addTourToBook(id);

    history.push(`bookings/new`);
  };
  const deleteTour = async (id) => {
    await tourService.deleteTour(id);
    await fetchTours();
  };
  const baseUrl = options[process.env.NODE_ENV].baseURL;
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {tours.map(
          ({ title, startDate, endDate, price, id, image, company }) => (
            <Grid item key={title} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={`${baseUrl}${image}`}
                  title="Image title"
                />

                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {title}
                  </Typography>
                  <Typography>
                    <DateRangeIcon fontSize="small" color="primary" />
                    {startDate} - {endDate}
                  </Typography>
                  <Typography>
                    <AttachMoneyIcon fontSize="small" color="primary" />
                    {price} руб.
                  </Typography>
                  <Typography>
                    Организатор {company.companyName.toUpperCase()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Grid container spacing={4}>
                    <Grid item sm={5}>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          getInfo(id);
                        }}
                      >
                        Подробнее
                      </Button>
                    </Grid>

                    <Grid item sm={5}>
                      {isLoggedin ? (
                        company && company._id === currentUser.userId ? (
                          <Button
                            onClick={() => {
                              deleteTour(id);
                            }}
                            size="small"
                            variant="contained"
                            color="primary"
                          >
                            Удалить
                          </Button>
                        ) : null
                      ) : (
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            bookTour(id);
                          }}
                        >
                          Забронировать
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
};

function mapStateToProps({ tours, loading, error, isLoggedin, currentUser }) {
  return {
    tours,
    loading,
    error,
    isLoggedin,
    currentUser,
  };
}

export default connect(mapStateToProps, {
  fetchTours,
  addTourToBook,
})(Cards);
