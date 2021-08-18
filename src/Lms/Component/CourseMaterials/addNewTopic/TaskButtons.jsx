import React from "react";
import { FillButton, OutlineButton } from "../../../Utils/Buttons";
import Preview from "../../../Assets/icons/preview.svg";
import { ButtonContainer, PreviewIcon } from "../../../Assets/StyledComponents";

export const TaskButtons = (props) => {
  const { taskSaveButton } = props.actionData;
  return (
    <ButtonContainer>
      <OutlineButton>
        <PreviewIcon src={Preview} /> Preview
      </OutlineButton>
      <span style={{ marginLeft: 26 }}>
        <FillButton onClick={taskSaveButton}>Save</FillButton>
      </span>
    </ButtonContainer>
  );
};
