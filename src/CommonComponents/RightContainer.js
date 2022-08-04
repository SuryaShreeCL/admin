import React from "react";
import { useStyles } from "../Asset/StyledComponents/Styles";

function RightContainer({ children }) {
  const classes = useStyles();
  return <div className={classes.rightContainer}>{children}</div>;
}

export default RightContainer;
