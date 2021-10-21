import React from "react";
import { useStyles } from "../Styles/Index";
import { AddButton, ListingDiv } from "./StyledComponents";

function ListingContainer(props) {
  const classes = useStyles();
  return (
    <ListingDiv color={props.containerColor}>
      <div className={classes.contentContainer}>
       {props.content}
      </div>
      <div className={classes.addContainer}>
        <AddButton onClick={props.handleAddClick} color={props.buttonColor}>{props.addText}</AddButton>
      </div>
    </ListingDiv>
  );
}

export default ListingContainer;
