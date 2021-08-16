import React, { Component } from "react";
import TinyEditor from "../../../Utils/textEditor/TinyEditor";
import {
  Grid,
  Tab,
  Tabs,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import Preview from "../../../Assets/icons/preview.svg";
import DropDown from "../../../Utils/DropDown";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { FillButton, OutlineButton, AddButton } from "../../../Utils/Buttons";
import { InputTextField } from "../../../Utils/TextField";
import {
  ButtonContainer,
  Card,
  InputCard,
  MainContainer,
  PreviewIcon,
  TabContainer,
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
              <InputCard>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <DropDown
                      label="Course"
                      items={[
                        { value: 1, label: "One" },
                        { value: 2, label: "Two" },
                        { value: 3, label: "Three" },
                      ]}
                      //value={value}
                      //onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <DropDown
                      label="Subject"
                      items={[
                        { value: 1, label: "One" },
                        { value: 2, label: "Two" },
                        { value: 3, label: "Three" },
                      ]}
                      //value={value}
                      //onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <DropDown
                      label="Concept"
                      items={[
                        { value: 1, label: "One" },
                        { value: 2, label: "Two" },
                        { value: 3, label: "Three" },
                      ]}
                      //value={value}
                      //onChange={handleChange}
                      //fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputTextField
                      label="Topic name"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <InputTextField
                      label="Description"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputTextField
                      label="Image Url"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent={"flex-end"}>
                  <Grid item>
                    <AddButton>Save</AddButton>
                  </Grid>
                  <Grid item>
                    <AddButton
                      startIcon={<AddRoundedIcon style={{ marginLeft: 6 }} />}
                    >
                      Add New Task
                    </AddButton>
                  </Grid>
                </Grid>
              </InputCard>
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
              <InputCard>
                <Grid container spacing={2}>
                  <Grid item xs={6} xl={6}>
                    <InputTextField label="Task Name" fullWidth />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <DropDown
                      label="Task Type"
                      items={[
                        { value: 1, label: "Image" },
                        { value: 2, label: "Video" },
                      ]}
                      //value={value}
                      //onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <FormControl variant="outlined">
                      <InputLabel>Approximate time</InputLabel>
                      <OutlinedInput
                        type={"number"}
                        //value={values.password}
                        //onChange={handleChange('password')}
                        endAdornment={
                          <InputAdornment position="end">mins</InputAdornment>
                        }
                        labelWidth={145}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </InputCard>
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
            <span style={{ marginLeft: 26 }}>
              <FillButton onClick={this.handleSaveButton}>Save</FillButton>
            </span>
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
