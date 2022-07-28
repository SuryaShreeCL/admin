import React from "react";
import { EditorBox, QDiv, T4 } from "../../../Assets/StyledTest";
import TextEditor from "../../../Utils/TextEditor";

function Question(props) {
  const {
    handleQuestionChange,
    question,
    handleDescriptionChange,
    description,
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
          <T4>Description</T4>
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
