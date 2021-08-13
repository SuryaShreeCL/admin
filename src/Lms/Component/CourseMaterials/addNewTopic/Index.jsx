import React, { Component } from "react";
import TinyEditor from "../../../Utils/textEditor/TinyEditor";
import { Box } from "@material-ui/core";
import Preview from "../../../Assets/icons/preview.svg";
import {
  ButtonContainer,
  Container,
  FillButton,
  InputCard,
  MainContainer,
  OutlineButton,
  PreviewIcon,
  TabContainer,
  TabItem,
  Title,
  Wrapper,
} from "../../../Assets/StyledComponents";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorSource: [],
    };
  }

  onEditorTextChange = (evt, editor) => {
    this.setState({
      editorSource: editor.getContent(),
    });
  };

  render() {
    return (
      <>
        <MainContainer>
          <Container>
            <Wrapper>
              <Title>Add New Topic</Title>
              <InputCard></InputCard>
              <TabContainer>
                <TabItem key={0} className={"active__task__tab"}>
                  Task 1
                </TabItem>
                <TabItem key={1}>Task 2</TabItem>
              </TabContainer>
              <InputCard></InputCard>
              <div style={{ padding: "8px" }}>
                <TinyEditor onEditorChange={this.onEditorTextChange} />
              </div>
              <p>{this.state.editorSource}</p>
            </Wrapper>
          </Container>
          <ButtonContainer>
            <OutlineButton>
              <PreviewIcon src={Preview} /> Preview
            </OutlineButton>
            <OutlineButton>Cancel</OutlineButton>
            <FillButton>Save</FillButton>
          </ButtonContainer>
        </MainContainer>
      </>
    );
  }
}

export default Index;
