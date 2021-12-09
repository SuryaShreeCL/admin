import React from "react";
import { Div1, Div2, H1, H2, Switch } from "../../../Assets/StyledTest";
import PlusButton from "../../../Utils/PlusButton";
import Choice from "./Choice";
import RadioButtons from "./RadioButtons";
import TabComp from "./TabComp";

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
