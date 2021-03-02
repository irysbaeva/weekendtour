import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddTourForm from "./add-tour-form";
import AddTourReview from "./add-tour-review";
import { connect } from "react-redux";
import compose from "../utils/compose";
import withTourService from "../with-tour-service";
import { fetchNewTour } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
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

const steps = [" Параметры тура", "Проверить данные"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddTourForm />;
    case 1:
      return <AddTourReview />;
    default:
      throw new Error("Unknown step");
  }
}

function AddTour({ newTour, fetchNewTour, currentUser, fetchTours }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
 
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Добавить новый тур
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Тур добавлен
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Назад
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                      handleNext();
                      if (activeStep === steps.length - 1  ) {
                        await fetchNewTour({ ...newTour, company: currentUser.userId});
                      }
                    }}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Добавить тур" : "Далее"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}

const mapStateToProps = ({ newTour, currentUser }) => {
  return { newTour, currentUser };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { tourService } = ownProps;
  return {
    fetchNewTour: fetchNewTour(tourService, dispatch),
  };
};

export default compose(
  withTourService(),
  connect(mapStateToProps, mapDispatchToProps)
)(AddTour);
