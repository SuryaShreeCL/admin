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
  Button,
  TextField,
} from "@material-ui/core";
import Preview from "../../../Assets/icons/preview.svg";
import DropDown from "../../../Utils/DropDown";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import {
  ButtonContainer,
  Card,
  FillButton,
  InputCard,
  MainContainer,
  OutlineButton,
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
                  <Grid item xs={12} lg={4}>
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
                  <Grid item xs={12} lg={4}>
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
                  <Grid item xs={12} lg={4}>
                    <DropDown
                      label="Concept"
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
                <Grid container spacing={2}>
                  <Grid item xs={4} xl={4}>
                    <TextField label="Description" variant="outlined" />
                  </Grid>
                  <Grid item xs={4} xl={4}>
                    <TextField label="Image Url" variant="outlined" />
                  </Grid>
                  <Grid item xs={4} xl={4}>
                    <TextField label="Topic name" variant="outlined" />
                  </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent={"flex-end"}>
                  <Grid item>
                    <Button style={{ marginRight: 20 }}>Save</Button>
                  </Grid>
                  <Grid item>
                    <Button startIcon={<AddRoundedIcon />}>Add New Task</Button>
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
                    <TextField label="Task Name" variant="outlined" />
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
                          <InputAdornment position="end">ms</InputAdornment>
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
