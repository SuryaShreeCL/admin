import { Typography } from "@material-ui/core";
import React from "react";
import { NoShoolContainer } from "./StyledComponents";
import NoSchoolImg from "../../../Asset/Images/NoSchool.svg";
import { useStyles } from "../Styles/Index";

function NoSchool(props) {
  const classes = useStyles();
  return (
    <NoShoolContainer>
      <img src={props.image ? props.image : NoSchoolImg} />
      <Typography className={classes.noSchoolTypo}>{props.text}</Typography>
    </NoShoolContainer>
  );
}

export default NoSchool;
