import React from "react";
import { FillButton, OutlineButton } from "../../../Utils/Buttons";
import Preview from "../../../Assets/icons/preview.svg";
import { ButtonContainer, PreviewIcon } from "../../../Assets/StyledComponents";

export const TaskButtons = (props) => {
  const { taskSaveButton } = props.actionData;
  return (
    <ButtonContainer>
      {/* <OutlineButton>
        <PreviewIcon src={Preview} /> Preview
      </OutlineButton> */}
      {/* style={{ marginLeft: 26 }} */}
      <span>
        <FillButton onClick={taskSaveButton}>Save</FillButton>
      </span>
    </ButtonContainer>
  );
};
