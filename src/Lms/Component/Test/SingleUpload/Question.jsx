import { Box, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { FlexView } from "../../../Assets/StyledComponents";
import { EditorBox, QDiv, T4 } from "../../../Assets/StyledTest";
import TextEditor from "../../../Utils/TextEditor";

function Question(props) {
  const {
    handleQuestionChange,
    question,
    handleDescriptionChange,
    description,
    passageOptions = [],
    handlePassage,
  } = props;
  const deptName = window.sessionStorage.getItem("department");

  return (
    <QDiv>
      <T4>Question</T4>
      <EditorBox>
        <TextEditor
          onChange={(event, editor) => handleQuestionChange(event, editor)}
          data={question}
        />
      </EditorBox>
      {deptName !== "assessment_engine_admin" && (
        <>
          <FlexView>
            <T4>Description</T4>
            <Box width={"300px"}>
              <Autocomplete
                id={"passage-options"}
                options={passageOptions}
                getOptionLabel={(option) => option.name}
                onChange={handlePassage}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Passage"}
                    variant={"outlined"}
                    fullWidth
                  />
                )}
              />
            </Box>
          </FlexView>
          <EditorBox>
            <TextEditor
              onChange={(event, editor) =>
                handleDescriptionChange(event, editor)
              }
              data={description}
            />
          </EditorBox>
        </>
      )}
    </QDiv>
  );
}

export default Question;
