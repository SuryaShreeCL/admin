import React from "react";
import {
  DeleteButtonWrapper,
  DeleteContainer,
  DeleteLeftWrapper,
} from "./StyledComponents";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import { IconButton, Typography } from "@material-ui/core";
import TextFieldComponent from "../../Controls/TextField";

function DeleteList(props) {
  return (
    <DeleteContainer>
      <DeleteLeftWrapper>
        <TextFieldComponent
        fullWidth
        minRows={2}
        multiline
        onChange={props.onChange}
        value={props.value}
        />
      </DeleteLeftWrapper>
      <DeleteButtonWrapper>
        <IconButton onClick={props.onDeleteClick}>
          <DeleteOutlineRoundedIcon color={"secondary"} />
        </IconButton>
      </DeleteButtonWrapper>
    </DeleteContainer>
  );
}

export default DeleteList;
