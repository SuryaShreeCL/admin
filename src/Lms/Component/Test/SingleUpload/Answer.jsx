import { Box, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { FlexView } from "../../../Assets/StyledComponents";
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
    handleDeleteChoiceClick,
    questionType,
    questionTypeOptions,
    handleQuestionType,
    isShowQuestionDropDown,
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
  var aesubject = window.sessionStorage.getItem("department");
  return (
    <React.Fragment>
      <FlexView paddingBottom={"12px !important"}>
        <H1 style={answerWrapperStyle}>Answer</H1>
        {isShowQuestionDropDown && (
          <Box width={"300px"}>
            <Autocomplete
              id={"question-types"}
              options={questionTypeOptions}
              value={
                questionTypeOptions.filter(
                  ({ name }) => name === questionType
                )[0] || null
              }
              getOptionLabel={(option) => option.title}
              onChange={handleQuestionType}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Question Type"}
                  variant={"outlined"}
                  fullWidth
                />
              )}
            />
          </Box>
        )}
      </FlexView>
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
      {(aesubject === "assessment_engine_admin" && answerType === "VIDEO") ||
      (aesubject === "assessment_engine_admin" &&
        answerType === "FILE_UPLOAD") ? (
        <></>
      ) : (
        <Choice
          handleDeleteChoiceClick={handleDeleteChoiceClick}
          {...choiceProps}
        />
      )}
    </React.Fragment>
  );
}

export default Answer;

const answerWrapperStyle = {
  padding: "0px",
  height: "56px",
  display: "flex",
  alignItems: "center",
};
