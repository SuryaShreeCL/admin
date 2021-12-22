import React from "react";
import Button from "@material-ui/core/Button";
import { greTheme } from "../../../../../../Assets/css/Preview/GreStyles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import withStyles from "@material-ui/styles/withStyles";

const styles = {
  root: {
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxSizing: "border-box",
    ...greTheme.typography.h5,
    color: greTheme.palette.text.secondary,
    textTransform: "none",
    width: "130px",
    whiteSpace: "nowrap",
  },
};

function SecondaryButton({ classes, onClick, children, icon }) {
  //   console.log(greTheme);
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      startIcon={icon}
      className={classes.root}
    >
      {children}
    </Button>
  );
}

export default withStyles(styles)(SecondaryButton);
