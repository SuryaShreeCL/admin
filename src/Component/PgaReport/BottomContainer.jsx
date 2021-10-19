import React from "react";
import PrimaryButton from "../../Utils/PrimaryButton";
import { SaveContainer } from "./Components/StyledComponents";

function BottomContainer(props) {
  return (
    <SaveContainer>
      <PrimaryButton
        variant={"contained"}
        onClick={props.onClick}
        color={"primary"}
      >
        Save
      </PrimaryButton>
    </SaveContainer>
  );
}

export default BottomContainer;
