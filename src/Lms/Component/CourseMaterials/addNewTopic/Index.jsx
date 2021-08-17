import React, { Component, Fragment } from "react";
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
import { SelectDropDown } from "../../../Utils/SelectField";
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
      courseValue: "1a",
      subjectValue: null,
      conceptValue: null,
      topicValue: null,
      descriptionValue: null,
      imageUrl: null,
      addTask: false,
      taskValue: null,
      taskType: null,
      taskTime: null,
      newTaskData: [],
      tabValue: null,
      totalTasks: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTaskProperties = this.handleTaskProperties.bind(this);
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  // getCurrentTask = () => {
  //   const { editorNames } = this.state;
  //   const source = editorNames.find(
  //     (item) => editorNames.indexOf(item) === this.state.tabValue
  //   );
  //   return source;
  // };

  onRichEditorChange = (evt, editor) => {
    var taskData = [...this.state.newTaskData];
    const { tabValue } = this.state;
    taskData[tabValue - 1] = {
      ...taskData[tabValue - 1],
      richEditorData: editor.getContent(),
    };
    this.setState({
      newTaskData: taskData,
    });
  };

  handleSaveButton = () => {
    const { editorSources } = this.state;
    const editor = this.getCurrentTask();
    alert(editorSources[editor]);
  };

  handleAddTask = () => {
    let count = this.state.totalTasks + 1;
    this.setState((prevState) => ({
      newTaskData: [
        ...prevState.newTaskData,
        {
          id: "",
          taskValue: "",
          taskType: "",
          taskTime: "",
          richEditorData: "",
        },
      ],
    }));
    this.setState({ totalTasks: count, tabValue: count });
  };

  handleTopicSave = () => {};

  handleTaskProperties = (index, event) => {
    const taskData = [...this.state.newTaskData];
    const { name, value } = event.target;
    taskData[index][name] = value;
    this.setState({
      taskData,
    });
  };

  render() {
    const {
      courseValue,
      subjectValue,
      conceptValue,
      topicValue,
      descriptionValue,
      imageUrl,
      addTask,
      tabValue,
      newTaskData,
    } = this.state;
    return (
      <>
        <MainContainer>
          <Card>
            <Wrapper>
              <Title>Add New Topic</Title>
              <InputCard>
                <Grid container spacing={2} style={{ paddingBottom: "30px" }}>
                  <Grid item xs={12} md={4}>
                    <SelectDropDown
                      label="Course"
                      name="courseValue"
                      items={[
                        { id: "1a", label: "One" },
                        { id: "2b", label: "Two" },
                        { id: "3c", label: "Three" },
                      ]}
                      value={courseValue}
                      onhandleChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ paddingBottom: "30px" }}>
                  <Grid item xs={12} md={4}>
                    <SelectDropDown
                      label="Subject"
                      name="subjectValue"
                      items={[
                        { id: 1, label: "One" },
                        { id: 2, label: "Two" },
                        { id: 3, label: "Three" },
                      ]}
                      value={subjectValue}
                      onhandleChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <SelectDropDown
                      label="Concept"
                      name="conceptValue"
                      items={[
                        { id: 1, label: "One" },
                        { id: 2, label: "Two" },
                        { id: 3, label: "Three" },
                      ]}
                      value={conceptValue}
                      onhandleChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputTextField
                      name="topicValue"
                      value={topicValue}
                      onChange={this.handleChange}
                      label="Topic name"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ paddingBottom: "30px" }}>
                  <Grid item xs={12} md={8}>
                    <InputTextField
                      name="descriptionValue"
                      onChange={this.handleChange}
                      value={descriptionValue}
                      label="Description"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputTextField
                      name="imageUrl"
                      onChange={this.handleChange}
                      value={imageUrl}
                      label="Image Url"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent={"flex-end"}>
                  <Grid item>
                    <AddButton onClick={this.handleTopicSave}>Save</AddButton>
                  </Grid>
                  <Grid item style={{ opacity: !addTask && 0.6 }}>
                    <AddButton
                      startIcon={<AddRoundedIcon style={{ marginLeft: 6 }} />}
                      onClick={this.handleAddTask}
                    >
                      Add New Task
                    </AddButton>
                  </Grid>
                </Grid>
              </InputCard>
              <TabContainer>
                <Tabs
                  value={tabValue - 1}
                  onChange={(e, newValue) =>
                    this.setState({ tabValue: newValue + 1 })
                  }
                  TabIndicatorProps={{
                    style: {
                      background: "#1093FF",
                    },
                  }}
                >
                  {newTaskData.map((i, tabIndex) => {
                    return (
                      <Tab
                        className={
                          tabValue === tabIndex + 1 && "active__task__tab"
                        }
                        label={"Task " + (tabIndex + 1)}
                        style={style}
                      ></Tab>
                    );
                  })}
                </Tabs>
              </TabContainer>

              {newTaskData.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <div hidden={tabValue !== index + 1}>
                      <InputCard>
                        <Grid container spacing={2}>
                          <Grid item xs={6} xl={6}>
                            <InputTextField
                              name="taskValue"
                              value={item.taskValue}
                              onChange={(e) =>
                                this.handleTaskProperties(index, e)
                              }
                              label="Task Name"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} lg={3}>
                            <SelectDropDown
                              label="Task Type"
                              name="taskType"
                              items={[
                                { id: 1, label: "TEXT" },
                                { id: 2, label: "VIDEO" },
                              ]}
                              value={item.taskType}
                              onhandleChange={(e) =>
                                this.handleTaskProperties(index, e)
                              }
                            />
                          </Grid>
                          <Grid item xs={12} lg={3}>
                            <FormControl variant="outlined">
                              <InputLabel>Approximate time</InputLabel>
                              <OutlinedInput
                                type={"number"}
                                value={item.taskTime}
                                name="taskTime"
                                onChange={(e) =>
                                  this.handleTaskProperties(index, e)
                                }
                                endAdornment={
                                  <InputAdornment position="end">
                                    mins
                                  </InputAdornment>
                                }
                                labelWidth={145}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      </InputCard>
                      <div style={{ padding: "8px" }}>
                        <TinyEditor
                          data={item.richEditorData || ""}
                          onEditorChange={this.onRichEditorChange}
                        />
                      </div>
                    </div>
                  </Fragment>
                );
              })}
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
