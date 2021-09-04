import React, { Component } from "react";
import {
  Card,
  MainContainer,
  TabContainer,
  Title,
  Wrapper,
  TabThreeDot,
} from "../../../Assets/StyledComponents";
import {
  getCourses,
  getSubjects,
  getConcepts,
  addTaskDetails,
  addTopicDetails,
  getTopicDetails,
  validTopicName,
  deleteTask,
  uploadTopicImage,
} from "../../../Redux/Action/CourseMaterial";
import { connect } from "react-redux";
import { TopicCard } from "./TopicCard";
import { TaskCard } from "./TaskCard";
import { SnackBar } from "../../../Utils/SnackBar";
import { TaskButtons } from "./TaskButtons";
import { StyledTaps } from "../../../Utils/Tabs";
import Menu from "../Menu";
import { MoreVertRounded } from "@material-ui/icons";
import DialogComponent from "../../../Utils/DialogComponent";
import { IconButton } from "@material-ui/core";
import QueryString from "qs";
import { lms_course_landing } from "../../../../Component/RoutePaths";
import { DeleteRounded } from "@material-ui/icons";

const dialogContent = {
  type: "delete",
  icon: <DeleteRounded style={{ fontSize: "48px", fill: "#1093FF" }} />,
  title: "Are you sure you want to delete this task ?",
  button1: "No",
  button2: "Yes",
};

const validURL = (url) => {
  const IMAGE_FORMATS = [".jpg", ".jpeg", ".png", ".tiff", ".svg"];
  return (
    IMAGE_FORMATS.indexOf(url.slice(url.lastIndexOf("."), url.length)) > -1
  );
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseValue: null,
      subjectValue: null,
      conceptValue: null,
      topicValue: "",
      oldTopicValue: "",
      isTopicNameValid: true,
      descriptionValue: "",
      imageUrl: null,
      newTaskData: [],
      tabValue: null,
      totalTasks: 0,
      topicId: null,
      message: "",
      snackOpen: false,
      snackType: "success",
      tabsLabels: [],
      anchorEl: null,
      dialogStatus: false,
      dialogContent: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTaskProperties = this.handleTaskProperties.bind(this);
  }

  componentDidMount() {
    const { topic_id } = QueryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    var newtopicId = topic_id;
    this.props.getCourses((response) => {
      if (response.success) {
        this.props.getSubjects(response.data[0].id, (subjectResponse) => {
          if (subjectResponse.success) {
            this.props.getConcepts(
              subjectResponse.data[0].id,
              (conceptResponse) => {
                if (conceptResponse.success) {
                  if (
                    newtopicId !== undefined &&
                    newtopicId !== null &&
                    newtopicId.trim().length > 10
                  ) {
                    this.props.getTopicDetails(
                      newtopicId,
                      (newtopicResponse) => {
                        if (newtopicResponse.success) {
                          const { data } = this.props.topicsDetails;
                          this.props.getSubjects(data.course.id, {});
                          this.props.getConcepts(data.subject.id, {});
                        }
                      }
                    );
                  } else {
                    this.setState({
                      courseValue: response.data[0].id,
                      subjectValue: subjectResponse.data[0].id,
                      conceptValue: conceptResponse.data[0].id,
                    });
                  }
                }
              }
            );
          }
        });
      }
    });
    const { snackOpen } = this.state;
    if (snackOpen === true) {
      this.setState({ snackOpen: false });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topicsDetails !== this.props.topicsDetails) {
      const { data } = this.props.topicsDetails;
      const { taskDetails } = this.props;
      let tabArr = [];
      taskDetails.map((i, index) => {
        tabArr.push({
          tabLabel: `Task ${index + 1}`,
        });
      });
      this.setState({
        newTaskData: taskDetails,
        totalTasks: taskDetails.length,
        tabValue: 1,
        topicId: data.id,
        courseValue: data.course.id,
        subjectValue: data.subject.id,
        conceptValue: data.concept.id,
        topicValue: data.name,
        oldTopicValue: data.name,
        descriptionValue: data.description,
        imageUrl: data.imageUrl,
        tabsLabels: tabArr,
      });
    }
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "topicValue" && value.trim().length === 0) {
      this.setState({ isTopicNameValid: true });
    }
    if (name === "imageUrl") {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      this.props.uploadTopicImage(formData, (response) => {
        if (response.success) {
          this.setState({ [name]: response.data.fileName });
        }
      });
    } else this.setState({ [name]: value });
    if (name === "courseValue") {
      this.props.getSubjects(value, (subjectResponse) => {
        if (subjectResponse.success) {
          this.props.getConcepts(
            subjectResponse.data[0].id,
            (conceptResponse) => {
              if (conceptResponse.success) {
                this.setState({
                  subjectValue: subjectResponse.data[0].id,
                  conceptValue: conceptResponse.data[0].id,
                });
              }
            }
          );
        }
      });
    }
    if (name === "subjectValue") {
      this.props.getConcepts(value, (conceptResponse) => {
        if (conceptResponse.success) {
          this.setState({
            conceptValue: conceptResponse.data[0].id,
          });
        }
      });
    }
  };

  topicNameValidate = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
    const { conceptValue, oldTopicValue } = this.state;
    this.props.validTopicName(conceptValue, value, (res) => {
      if (res.success || oldTopicValue === value)
        this.setState({ isTopicNameValid: true });
      else this.setState({ isTopicNameValid: false });
    });
  };

  onRichEditorChange = (evt, editor) => {
    var taskData = [...this.state.newTaskData];
    const { tabValue } = this.state;
    taskData[tabValue - 1] = {
      ...taskData[tabValue - 1],
      content: editor.getContent(),
    };
    this.setState({
      newTaskData: taskData,
    });
  };

  handleTopicSaveButton = (e) => {
    e.preventDefault();
    const {
      topicValue,
      descriptionValue,
      imageUrl,
      conceptValue,
      topicId,
      isTopicNameValid,
    } = this.state;
    if (
      topicValue.trim().length > 0 &&
      imageUrl &&
      descriptionValue.trim().length > 0
    ) {
      if (isTopicNameValid) {
        if (validURL(imageUrl)) {
          const topicData = {
            id: topicId,
            name: topicValue,
            description: descriptionValue,
            imageUrl: imageUrl,
            concept: { id: conceptValue },
          };
          this.props.addTopicDetails(topicData, (topicResponse) => {
            if (topicResponse.success) {
              var topicMessage = "New Topic Added Successfully";
              if (topicId !== null)
                topicMessage = "Current Topic Updated Successfully";
              this.setState({
                message: topicMessage,
                snackOpen: true,
                snackType: "success",
                topicId: topicResponse.data.id,
                oldTopicValue: topicValue,
              });
            }
          });
        } else {
          let imageMessage = "Please enter a valid image url";
          this.setState({
            message: imageMessage,
            snackOpen: true,
            snackType: "warning",
          });
        }
      } else {
        var topicNameMessage = "The topic name already exists";
        this.setState({
          message: topicNameMessage,
          snackOpen: true,
          snackType: "warning",
        });
      }
    } else {
      var imageMessage = "Please fill all the valid fields";
      this.setState({
        message: imageMessage,
        snackOpen: true,
        snackType: "warning",
      });
    }
  };

  handleAddTask = () => {
    if (this.state.topicId !== null) {
      let count = this.state.totalTasks + 1;
      this.setState((prevState) => ({
        newTaskData: [
          ...prevState.newTaskData,
          {
            id: null,
            name: "",
            contentType: "",
            duration: "",
            content: "",
            topic: { id: this.state.topicId },
          },
        ],
        tabsLabels: [
          ...prevState.tabsLabels,
          { tabLabel: "Task " + (this.state.totalTasks + 1) },
        ],
      }));
      this.setState({
        totalTasks: count,
        tabValue: count,
      });
    }
  };

  handleTaskSaveButton = () => {
    const { newTaskData, tabValue } = this.state;
    const taskData = [...this.state.newTaskData];
    const taskDetail = newTaskData[tabValue - 1];
    if (
      taskDetail.content.trim().length > 0 &&
      taskDetail.contentType.trim().length > 0 &&
      taskDetail.duration > 0 &&
      taskDetail.name.trim().length > 0
    ) {
      this.props.addTaskDetails(newTaskData[tabValue - 1], (taskResponse) => {
        if (taskResponse.success) {
          var taskMessage = "New Task Added Successfully";
          if (newTaskData[tabValue - 1].id !== null)
            taskMessage = "Current Task Updated Successfully";

          taskData[tabValue - 1]["id"] = taskResponse.data.id;
          this.setState({
            message: taskMessage,
            snackOpen: true,
            snackType: "success",
            taskData,
          });
          this.props.history.push(lms_course_landing);
        }
      });
    } else {
      this.setState({
        message: "Please fill all the fields",
        snackOpen: true,
        snackType: "warning",
      });
    }
  };

  handleTaskProperties = (index, event) => {
    const taskData = [...this.state.newTaskData];
    const { name, value } = event.target;
    taskData[index][name] = value;
    this.setState({
      taskData,
    });
  };

  handleThreeDotClick = (e) => {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };

  handleButton1Click = () => {
    this.setState({
      dialogStatus: false,
      dialogContent: null,
      anchorEl: null,
    });
  };

  handleCloseIconClick = () => {
    this.setState({
      dialogStatus: false,
      dialogContent: null,
      anchorEl: null,
    });
  };

  handleDelete = () => {
    this.setState({
      dialogStatus: true,
      dialogContent: dialogContent,
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  removeArrayItem = (arr, index) => {
    for (var i = 0; i < arr.length; i++) {
      if (i === index) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };

  handleTaskDelete = () => {
    const { tabValue, newTaskData, topicId } = this.state;
    if (newTaskData.length !== 0) {
      var deleteTaskId = newTaskData[tabValue - 1]["id"];
      if (deleteTaskId !== null) {
        this.props.deleteTask(deleteTaskId, (response) => {
          if (response.success) {
            this.props.getTopicDetails(topicId, (res) => {
              if (res.success) {
                this.handleCloseIconClick();
              }
            });
          }
        });
      } else {
        let tabArr = [];
        let testArr = [];
        testArr = this.removeArrayItem(newTaskData, tabValue - 1);
        testArr.map((i, index) => {
          tabArr.push({
            tabLabel: `Task ${index + 1}`,
          });
        });

        this.setState({
          tabValue: tabArr.length,
          totalTasks: tabArr.length,
          tabsLabels: tabArr,
          newTaskData: testArr,
        });
        this.handleCloseIconClick();
      }
    }
  };

  render() {
    // console.log(validURL('hsojs'));
    const {
      courseValue,
      subjectValue,
      conceptValue,
      topicValue,
      descriptionValue,
      imageUrl,
      tabValue,
      newTaskData,
      topicId,
      message,
      snackOpen,
      snackType,
      tabsLabels,
      anchorEl,
      dialogStatus,
      isTopicNameValid,
    } = this.state;
    const {
      handleThreeDotClick,
      handleClose,
      handleDelete,
      handleButton1Click,
      handleCloseIconClick,
      handleTaskDelete,
      topicNameValidate,
    } = this;
    const { courses, subjects, concepts, taskDetails } = this.props;
    const { topic_id } = QueryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    return (
      <>
        <MainContainer>
          <Card>
            <Wrapper>
              <Title>{topic_id ? "Edit Topic" : "Add New Topic"}</Title>
              <TopicCard
                data={{
                  courses: courses.data,
                  courseId: courseValue,
                  subjects: subjects.data,
                  subjectId: subjectValue,
                  concepts: concepts.data,
                  conceptId: conceptValue,
                  topic: topicValue,
                  topicValid: isTopicNameValid,
                  topicId: topicId,
                  url: imageUrl,
                  description: descriptionValue,
                  handleChange: this.handleChange,
                  AddTask: this.handleAddTask,
                  topicSaveButton: this.handleTopicSaveButton,
                  topicNameValidate: topicNameValidate,
                }}
              />

              <TabContainer>
                {tabValue > 0 && newTaskData.length !== 0 && (
                  <TabThreeDot>
                    <IconButton
                      style={{ padding: "0px" }}
                      onClick={handleThreeDotClick}
                    >
                      <MoreVertRounded style={{ fill: "#1093ff" }} />
                    </IconButton>
                    <Menu
                      questionId={tabValue}
                      handleClose={handleClose}
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      handleDelete={() => handleDelete()}
                    />
                  </TabThreeDot>
                )}
                <StyledTaps
                  tabsData={{
                    tabId: tabValue - 1,
                    handleTabChange: (e, newValue) =>
                      this.setState({ tabValue: newValue + 1 }),
                    tabsBackColor: "#1093FF",
                    tabData: tabsLabels,
                    activeClass: "active__task__tab",
                    styleName: "addNewTask",
                  }}
                />
              </TabContainer>

              {newTaskData.map((item, index) => {
                return (
                  <TaskCard
                    taskDatas={{
                      index: index,
                      tabId: tabValue,
                      inputItem: item,
                      taskProperties: (e) =>
                        this.handleTaskProperties(index, e),
                      richContent:
                        (topic_id &&
                          taskDetails.length > 0 &&
                          taskDetails[tabValue - 1] !== undefined &&
                          taskDetails[tabValue - 1].content) ||
                        "",
                      richEditorChange: this.onRichEditorChange,
                    }}
                  />
                );
              })}
            </Wrapper>
          </Card>
          {tabValue !== null && tabValue !== 0 && newTaskData.length !== 0 && (
            <TaskButtons
              actionData={{
                taskSaveButton: this.handleTaskSaveButton,
                cancelButton: () => {
                  this.props.history.push(lms_course_landing);
                },
              }}
            />
          )}
          <DialogComponent
            open={dialogStatus}
            dialogContent={dialogContent}
            handleButton1Click={handleButton1Click}
            handleCloseIconClick={handleCloseIconClick}
            handleButton2Click={handleTaskDelete}
          />
          <SnackBar
            snackData={{
              open: snackOpen,
              snackClose: () => {
                this.setState({ snackOpen: false });
              },
              snackType: snackType,
              message: message,
            }}
          />
          {/* <p>{newTaskData.length !== 0 && newTaskData[tabValue - 1].content}</p> */}
        </MainContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.CourseMaterialReducer,
  };
};

export default connect(mapStateToProps, {
  getCourses,
  getSubjects,
  getConcepts,
  addTaskDetails,
  addTopicDetails,
  getTopicDetails,
  validTopicName,
  deleteTask,
  uploadTopicImage,
})(Index);
