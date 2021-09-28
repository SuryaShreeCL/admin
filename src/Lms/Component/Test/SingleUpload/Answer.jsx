import React from "react";
import { H1, H2, Div1, Switch, Div2 } from "../../../Assets/StyledTest";

import PlusButton from "../../../Utils/PlusButton";
import TabComp from "./TabComp";
import RadioButtons from "./RadioButtons";
import Choice from "./Choice";

function Answer(props) {
  const {
    checked,
    handleSwitch,
    activeTab,
    handleTabChange,
    bucketArray,
    handleAddBucket,
    handleRadioChange,
    answerType,
    handleCheckBoxes,
    handleAddOption,
    handleImageUpload,
    handleThreeDotClick,
    anchorEl,
    handleClose,
    handleDelete,
    handleDeleteIconClick,
    handleTextChange,
    editData,
  } = props;

  let tabCompProps = {
    checked,
    activeTab,
    handleTabChange,
    bucketArray,
    handleThreeDotClick,
    anchorEl,
    handleClose,
    handleDelete,
  };

  let radioButtonProps = {
    checked,
    handleRadioChange,
    answerType,
    editData,
  };

  const choiceProps = {
    handleCheckBoxes,
    handleAddOption,
    handleImageUpload,
    bucketArray,
    activeTab,
    handleDeleteIconClick,
    handleTextChange,
    answerType,
  };

  return (
    <React.Fragment>
      <H1>Answer</H1>
      <Div2>
        <Div1>
          <H2 checked={!checked}>Default answer</H2>
          <Switch
            disabled={editData}
            checked={checked}
            onChange={handleSwitch}
          />
          <H2 checked={checked}>Bucket answer</H2>
        </Div1>
        {checked && (
          <PlusButton onClick={handleAddBucket}>Add New Bucket</PlusButton>
        )}
      </Div2>
      <TabComp {...tabCompProps} />
      <RadioButtons {...radioButtonProps} />
      <Choice {...choiceProps} />
    </React.Fragment>
  );
}

export default Answer;
