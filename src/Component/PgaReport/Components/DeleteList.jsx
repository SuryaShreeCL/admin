import React from "react";
import {
  DeleteButtonWrapper,
  DeleteContainer,
  DeleteLeftWrapper,
} from "./StyledComponents";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import { IconButton, Typography } from "@material-ui/core";
import { useStyles } from "../Styles/Index";

function DeleteList(props) {
    const classes = useStyles()
  return (
    <DeleteContainer>
      <DeleteLeftWrapper>
        <Typography className={classes.deleteContentText}>
         {props.content}
        </Typography>
      </DeleteLeftWrapper>
      <DeleteButtonWrapper>
        <IconButton>
          <DeleteOutlineRoundedIcon color={"secondary"} />
        </IconButton>
      </DeleteButtonWrapper>
    </DeleteContainer>
  );
}

export default DeleteList;
