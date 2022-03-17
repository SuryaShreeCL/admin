import React from "react";
import PrimaryButton from "../../../../Utils/PrimaryButton";
import { useStyles } from "../Styles";

function SaveContainer({ handleClick }) {
  const classes = useStyles();
  return (
    <div className={classes.saveContainer}>
      <PrimaryButton
        color={"primary"}
        variant={"contained"}
        onClick={handleClick}
      >
        Save
      </PrimaryButton>
    </div>
  );
}

export default SaveContainer;
