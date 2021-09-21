import React from 'react';
import TextEditor from '../../../Utils/TextEditor';
import { QDiv, T4, EditorBox } from '../../../Assets/StyledTest';

function Question(props) {
  const {
    handleQuestionChange,
    question,
    handleDescriptionChange,
    description,
  } = props;
  return (
    <QDiv>
      <T4>Question</T4>
      <EditorBox>
        <TextEditor
          onChange={(event, editor) => handleQuestionChange(event, editor)}
          data={question}
        />
      </EditorBox>
      <T4>Description</T4>
      <EditorBox>
        <TextEditor
          onChange={(event, editor) => handleDescriptionChange(event, editor)}
          data={description}
        />
      </EditorBox>
    </QDiv>
  );
}

export default Question;
