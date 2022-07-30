import React from "react";
import { useStyles } from "../Component/SchoolResearchPreferenceList/Styles";
import CustomButton from "./CustomButton";

function BottomContainer({
  handlePrimaryButtonClick,
  handleSecondaryButtonClick,
  primaryButtonText,
  secondaryButtonText,
  secondaryButtonDisabled,
  primaryButtonDisabled,
  opacity,
  value,
  size,
  handleClick,
  missedData,
  children,
}) {
  const classes = useStyles();
  return <div className={classes.bottomPanel}>{children}</div>;
}

export default BottomContainer;
