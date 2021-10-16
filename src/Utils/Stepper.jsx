import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles,ThemeProvider } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ".././Asset/CareerRole.css";
import { createTheme } from "@material-ui/data-grid";
const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  line: {
    borderColor: "green",
    borderTopWidth: 3,
    borderRadius: 1,
    minHeight: "60px",
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#784af4",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
});

const theme = createTheme({
  overrides: {
    MuiSvgIcon: {
      root: {
        fill : "green",
      },
    },
  },
});
function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      width: 1,
      height: "50px",
    },
  },
  completed: {
    "& $line": {
      width: 1,
      height: "50px",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    width: 1,
    height: "50px",
    // boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    width: 1,
    height: "50px",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {/* {icons[String(props.icon)]} */}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

// function getSteps() {
//   return ['X', 'XII', 'Diploma','UG','PG','Icanio','Infosys'];
// }

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return 'Select campaign settings...';
//     case 1:
//       return 'What is an ad group anyways?';
//     case 2:
//       return 'This is the bit I really care about!';
//     default:
//       return 'Unknown step';
//   }
// }

export default function CustomizedSteppers(props) {
  const classes = useStyles();
  // const [activeStep, setActiveStep] = React.useState(0);
  // const steps = getSteps();

  const handleNext = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    // setActiveStep(0);
  };
  const handleClick = (e) => {
    console.log(e);
  };
  const handleContent = (label, type) => {
    if (type === "Career Role") {
      return (
        <>
          <div className={"careerstepper"}>
            <div>
              <Typography>{label.title}</Typography>
            </div>
            <div>
              <Typography>({label.duration})</Typography>
            </div>
          </div>
        </>
      );
    }
  };
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Stepper
          orientation={props.orientation}
          activeStep={props.activeStep}
          connector={<QontoConnector />}
        >
          {props.data.map((label) => (
            <Step key={label}>
              <StepLabel onClick={(e) => handleClick(label)}>
                {handleContent(label, props.component)}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </ThemeProvider>
    </div>
  );
}
