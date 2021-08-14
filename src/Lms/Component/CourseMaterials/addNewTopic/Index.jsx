import React, { Component } from "react";
import TinyEditor from "../../../Utils/textEditor/TinyEditor";
import { Box, Tab, Tabs } from "@material-ui/core";
import Preview from "../../../Assets/icons/preview.svg";
import {
  ButtonContainer,
  Card,
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
      editorSources: { source1: [], source2: [] },
      editorNames: ["source1", "source2"],
      tabValue: 0,
    };
  }

  getCurrentTask = () => {
    const { editorNames } = this.state;
    const source = editorNames.find(
      (item) => editorNames.indexOf(item) === this.state.tabValue
    );
    return source;
  };

  onEditorTextChange = (evt, editor) => {
    const source = this.getCurrentTask();
    this.setState({
      editorSources: { [source]: editor.getContent() },
    });
  };

  handleSaveButton = () => {
    const { editorSources } = this.state;
    const editor = this.getCurrentTask();
    alert(editorSources[editor]);
  };

  render() {
    return (
      <>
        <MainContainer>
          <Card>
            <Wrapper>
              <Title>Add New Topic</Title>
              <InputCard></InputCard>
              <TabContainer>
                <Tabs
                  value={this.state.tabValue}
                  onChange={(e, newValue) =>
                    this.setState({ tabValue: newValue })
                  }
                  TabIndicatorProps={{
                    style: {
                      background: "#1093FF",
                    },
                  }}
                >
                  <Tab
                    className={this.state.tabValue === 0 && "active__task__tab"}
                    label="Task 1"
                    style={style}
                  ></Tab>
                  <Tab
                    className={this.state.tabValue === 1 && "active__task__tab"}
                    style={style}
                    label="Task 2"
                  ></Tab>
                </Tabs>
              </TabContainer>
              <InputCard></InputCard>
              <div
                style={{ padding: "8px" }}
                hidden={this.state.tabValue !== 0}
              >
                <TinyEditor
                  data={"ok"}
                  onEditorChange={this.onEditorTextChange}
                />
              </div>
              <div
                style={{ padding: "8px" }}
                hidden={this.state.tabValue !== 1}
              >
                <TinyEditor
                  data={"done"}
                  onEditorChange={this.onEditorTextChange}
                />
              </div>
            </Wrapper>
          </Card>
          <ButtonContainer>
            <OutlineButton>
              <PreviewIcon src={Preview} /> Preview
            </OutlineButton>

            <FillButton onClick={this.handleSaveButton}>Save</FillButton>
          </ButtonContainer>
        </MainContainer>
      </>
    );
  }
}

export default Index;

const style = {
  minWidth: 40,
  fontSize: "18px",
  margin: "0px 40px",
  padding: 0,
};
