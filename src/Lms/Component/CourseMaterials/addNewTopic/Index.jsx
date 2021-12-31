import React, { Component } from "react";
import {
  Card,
  MainContainer,
  TabContainer,
  Title,
  Wrapper,
  TabThreeDot
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
  uploadTopicImage
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
import TaskPreview from "./Preview/Index";

const dialogContent = {
  type: "delete",
  icon: <DeleteRounded style={{ fontSize: "48px", fill: "#1093FF" }} />,
  title: "Are you sure you want to delete this task ?",
  button1: "No",
  button2: "Yes"
};

const validURL = url => {
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
      duplicateTask: [],
      openPreview: false,
      topicDetails: null,
      videoContent: [{ id: null, videoId: "" }]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTaskProperties = this.handleTaskProperties.bind(this);
  }

  componentDidMount() {
    const { topic_id } = QueryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    });
    var newtopicId = topic_id;
    if (
      newtopicId !== undefined &&
      newtopicId !== null &&
      newtopicId.trim().length > 10
    ) {
      this.props.getTopicDetails(newtopicId, newtopicResponse => {
        if (newtopicResponse.success) {
          const { data } = this.props.topicsDetails;
          this.props.getCourses(() => {});
          this.props.getSubjects(data.course.id, res => {
            this.setState({ subjectValue: data.subject.id });
          });
          this.props.getConcepts(data.subject.id, res => {
            this.setState({ conceptValue: data.concept.id });
          });
        }
      });
    } else {
      this.props.getCourses(response => {
        if (response.success) {
          this.props.getSubjects(response.data[0].id, subjectResponse => {
            if (subjectResponse.success) {
              this.props.getConcepts(
                subjectResponse.data[0].id,
                conceptResponse => {
                  if (conceptResponse.success) {
                    this.setState({
                      courseValue: response.data[0].id,
                      subjectValue: subjectResponse.data[0].id,
                      conceptValue: conceptResponse.data[0].id
                    });
                  }
                }
              );
            }
          });
        }
      });
    }
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
      taskDetails.length !== 0 &&
        taskDetails.map((i, index) => {
          tabArr.push({
            tabLabel: `Task ${index + 1}`
          });
        });
      this.setState({
        newTaskData: taskDetails,
        duplicateTask: taskDetails,
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
        topicDetails: data
      });
    }
  }

  handleChange = e => {
    const { value, name } = e.target;
    if (name === "topicValue" && value.trim().length === 0) {
      this.setState({ isTopicNameValid: true });
    }
    if (name === "imageUrl") {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      this.props.uploadTopicImage(formData, response => {
        if (response.success) {
          this.setState({ [name]: response.data.fileName });
        }
      });
    } else this.setState({ [name]: value });
    if (name === "courseValue") {
      this.props.getSubjects(value, subjectResponse => {
        if (subjectResponse.success) {
          this.props.getConcepts(
            subjectResponse.data[0].id,
            conceptResponse => {
              if (conceptResponse.success) {
                this.setState({
                  subjectValue: subjectResponse.data[0].id,
                  conceptValue: conceptResponse.data[0].id
                });
              }
            }
          );
        }
      });
    }
    if (name === "subjectValue") {
      this.props.getConcepts(value, conceptResponse => {
        if (conceptResponse.success) {
          this.setState({
            conceptValue: conceptResponse.data[0].id
          });
        }
      });
    }
  };

  // Checking if topic name already exist

  topicNameValidate = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
    const { conceptValue, oldTopicValue } = this.state;
    this.props.validTopicName(conceptValue, value, res => {
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
      content: editor.getContent()
    };
    this.setState({
      newTaskData: taskData
    });
  };

  handleTopicSaveButton = e => {
    e.preventDefault();
    const {
      topicValue,
      descriptionValue,
      imageUrl,
      conceptValue,
      topicId,
      isTopicNameValid
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
            concept: { id: conceptValue }
          };
          this.props.addTopicDetails(topicData, topicResponse => {
            if (topicResponse.success) {
              this.props.getTopicDetails(topicResponse.data.id, () => {});
              var topicMessage = "New Topic Added Successfully";
              if (topicId !== null)
                topicMessage = "Current Topic Updated Successfully";
              this.setState({
                message: topicMessage,
                snackOpen: true,
                snackType: "success",
                topicId: topicResponse.data.id,
                oldTopicValue: topicValue
              });
            }
          });
        } else {
          let imageMessage = "Please enter a valid image url";
          this.setState({
            message: imageMessage,
            snackOpen: true,
            snackType: "warning"
          });
        }
      } else {
        var topicNameMessage = "The topic name already exists";
        this.setState({
          message: topicNameMessage,
          snackOpen: true,
          snackType: "warning"
        });
      }
    } else {
      var imageMessage = "Please fill all the valid fields";
      this.setState({
        message: imageMessage,
        snackOpen: true,
        snackType: "warning"
      });
    }
  };

  handleAddTask = () => {
    if (this.state.topicId !== null) {
      let count = this.state.totalTasks + 1;
      this.setState(prevState => ({
        newTaskData: [
          ...prevState.newTaskData,
          {
            id: null,
            name: "",
            contentType: "",
            duration: null,
            content: "",
            topicData: { id: this.state.topicId },
            contentVideo: []
          }
        ],
        duplicateTask: [
          ...prevState.duplicateTask,
          {
            id: null,
            name: "",
            contentType: "",
            duration: null,
            content: "",
            topicData: { id: this.state.topicId },
            contentVideo: []
          }
        ],
        tabsLabels: [
          ...prevState.tabsLabels,
          { tabLabel: "Task " + (this.state.totalTasks + 1) }
        ]
      }));
      this.setState({
        totalTasks: count,
        tabValue: count
      });
    }
  };

  comparer = otherArray => {
    return function(current) {
      return (
        otherArray.filter(function(other) {
          console.log(other, current);
          return (
            other.id === current.id &&
            other.contentType === current.contentType &&
            other.name === current.name &&
            parseInt(other.duration) === parseInt(current.duration) &&
            other.content === current.content &&
            other.contentVideo === current.contentVideo
          );
        }).length === 0
      );
    };
  };

  totalTaskValidation = tasks => {
    const { tabValue } = this.state;
    const valid = tasks.map(
      item =>
        item.contentType !== null &&
        item.name !== null &&
        item.duration !== null &&
        item.duration &&
        item.name.trim().length > 0
    );
    return valid;
  };

  handleTaskSaveButton = () => {
    const { newTaskData, tabValue } = this.state;
    const taskData = [...this.state.newTaskData];
    const duplicateData = [...this.state.duplicateTask];
    const taskDetail = newTaskData[tabValue - 1];

    if (
      taskDetail.duration &&
      taskDetail.name &&
      taskDetail.contentType &&
      taskDetail.contentType.trim().length > 0 &&
      taskDetail.name.trim().length > 0 &&
      this.contentEmptyValidation(newTaskData, tabValue)
    ) {
      this.props.addTaskDetails(newTaskData[tabValue - 1], taskResponse => {
        if (taskResponse.success) {
          var taskMessage = "New Task Added Successfully";
          if (newTaskData[tabValue - 1].id !== null)
            taskMessage = "Current Task Updated Successfully";

          taskData[tabValue - 1]["id"] = taskResponse.data.id;

          duplicateData[tabValue - 1]["id"] = taskResponse.data.id;
          duplicateData[tabValue - 1]["contentType"] =
            taskResponse.data.contentType;
          duplicateData[tabValue - 1]["name"] = taskResponse.data.name;
          duplicateData[tabValue - 1]["duration"] = taskResponse.data.duration;
          duplicateData[tabValue - 1]["content"] = taskResponse.data.content;

          this.setState({
            message: taskMessage,
            snackOpen: true,
            snackType: "success",
            taskData,
            duplicateData
          });
          var onlyInA = taskData.filter(this.comparer(duplicateData));
          var onlyInB = duplicateData.filter(this.comparer(taskData));
          var result = onlyInA.concat(onlyInB);
          var valid = this.totalTaskValidation(taskData);
          if (result.length === 0 && !valid.includes(false)) {
            this.props.history.push(lms_course_landing);
          } else {
            this.setState({
              message: "Please save all tasks",
              snackOpen: true,
              snackType: "warning"
            });
          }
        } else {
          this.setState({
            message: taskResponse.message,
            snackOpen: true,
            snackType: "warning"
          });
        }
      });
    } else {
      this.setState({
        message: "Please fill all the fields",
        snackOpen: true,
        snackType: "warning"
      });
    }
  };

  contentEmptyValidation = (newTaskData, tabValue) => {
    const taskDetail = newTaskData[tabValue - 1];

    switch (taskDetail.contentType) {
      case "TEXT": {
        return taskDetail.content.trim().length > 0;
      }

      case "VIDEO": {
        for (let i = 0; i < taskDetail.contentVideo.length; i++) {
          if (taskDetail.contentVideo[i].videoId.length === 0) {
            return false;
          }
        }
        return true;
      }

      case "TEXT_VIDEO": {
        if (taskDetail.content.trim().length === 0) return false;
        for (let i = 0; i < taskDetail.contentVideo.length; i++) {
          if (taskDetail.contentVideo[i].videoId.length === 0) {
            return false;
          }
        }
        return true;
      }
    }
    // return (
    //   (taskDetail.content || taskDetail.contentVideo.length > 0) &&
    //   (taskDetail.content.trim().length > 0 ||
    //     taskDetail.contentVideo.length > 0)
    // );
  };

  handleTaskProperties = (index, event) => {
    const taskData = [...this.state.newTaskData];
    const { name, value } = event.target;

    if (value === "TEXT") taskData[index].contentVideo = [];
    if (value === "VIDEO") {
      taskData[index].content = "";
    }

    if (
      (value === "TEXT_VIDEO" || value === "VIDEO") &&
      taskData[index].contentVideo.length === 0
    )
      taskData[index].contentVideo.push({ id: null, videoId: "" });
    taskData[index][name] = value;
    this.setState({
      taskData
    });
  };

  handleThreeDotClick = e => {
    this.setState({
      anchorEl: e.currentTarget
    });
  };

  handleButton1Click = () => {
    this.setState({
      dialogStatus: false,
      dialogContent: null,
      anchorEl: null
    });
  };

  handleCloseIconClick = () => {
    this.setState({
      dialogStatus: false,
      dialogContent: null,
      anchorEl: null
    });
  };

  handleDelete = () => {
    this.setState({
      dialogStatus: true,
      dialogContent: dialogContent
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
        this.props.deleteTask(deleteTaskId, response => {
          if (response.success) {
            this.props.getTopicDetails(topicId, res => {
              if (res.success) {
                this.handleCloseIconClick();
              }
            });
          }
        });
      } else {
        let tabArr = [];
        let taskArr = [];
        let duplicateArr = [];
        duplicateArr = this.removeArrayItem(
          this.state.duplicateTask,
          tabValue - 1
        );
        taskArr = this.removeArrayItem(newTaskData, tabValue - 1);
        taskArr.map((i, index) => {
          tabArr.push({
            tabLabel: `Task ${index + 1}`
          });
        });

        this.setState({
          tabValue: tabArr.length,
          totalTasks: tabArr.length,
          tabsLabels: tabArr,
          newTaskData: taskArr,
          duplicateTask: duplicateArr
        });
        this.handleCloseIconClick();
      }
    }
  };

  handlePreviewClick = () => {
    const { newTaskData, tabValue } = this.state;
    if (newTaskData[tabValue - 1].id === null) {
      this.setState({
        message: "Please save all tasks",
        snackOpen: true,
        snackType: "warning"
      });
    } else this.setState({ openPreview: true });
  };

  handleClosePreview = () => {
    this.setState({ openPreview: false });
  };

  time_convert = num => {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return hours >= 1
      ? `${hours} Hours ${minutes >= 1 ? `${minutes} Mins` : ""}`
      : `${minutes} Mins`;
  };

  customArrayOfSum = array => {
    return array.length !== 0
      ? array
          .map(({ duration }) =>
            duration && !isNaN(parseFloat(duration)) > 0
              ? parseFloat(duration)
              : 0
          )
          .reduce((a, b) => a + b, 0)
      : 0;
  };

  handleVideoContentAdd = (index, event) => {
    const { newTaskData } = this.state;

    newTaskData[index].contentVideo.push({ id: null, videoId: "" });

    this.setState({ newTaskData });
  };

  handleVideoContentDelete = (index, event) => {
    const { newTaskData } = this.state;

    if (newTaskData[index].contentVideo.length > 1)
      newTaskData[index].contentVideo.pop();

    this.setState({ newTaskData });
  };

  /**
   *
   * @param {Number} index Task Index
   * @param {Object} e e.target.id Video Index
   */
  handleVideoContentChange = (index, e) => {
    const { id: idIndex, value } = e.target;
    const { newTaskData } = this.state;

    newTaskData[index].contentVideo[idIndex].videoId = value;

    this.setState({ newTaskData });
  };

  render() {
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
      openPreview,
      topicDetails
    } = this.state;
    const {
      handleThreeDotClick,
      handleClose,
      handleDelete,
      handleButton1Click,
      handleCloseIconClick,
      handleTaskDelete,
      topicNameValidate,
      handlePreviewClick,
      handleClosePreview,
      customArrayOfSum
    } = this;

    const { courses, subjects, concepts, taskDetails } = this.props;
    const { topic_id } = QueryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    });

    const { history, location, match } = this.props;
    const taskPreviewProps = topicData => {
      const { subject, concept } = topicData;
      return {
        open: openPreview,
        handleClose: handleClosePreview,
        history,
        location,
        match,
        topics: {
          data: {
            subject: subject.name,
            concept: concept.name,
            title: topicValue,
            duration: `${customArrayOfSum(newTaskData)} Mins`,
            completedTasks: 0,
            task: newTaskData.length !== 0 && newTaskData[tabValue - 1].name,
            progress: 0,
            totalTasks: newTaskData.length,
            contents:
              newTaskData.length !== 0 &&
              newTaskData.map(
                ({
                  id,
                  name,
                  contentType,
                  duration,
                  content,
                  contentVideo
                }) => ({
                  duration: duration,
                  id: id,
                  title: name,
                  type: contentType,
                  content: content,
                  contentVideo
                })
              ),
            tasks:
              newTaskData.length !== 0 &&
              newTaskData.map(({ id, name, contentType, duration }) => ({
                duration: `${duration ? duration : 0} Mins`,
                id: id,
                title: name,
                type: contentType ? contentType : "TEXT",
                status: "TODO"
              }))
          }
        },
        selectedStep: tabValue && tabValue > 0 ? tabValue - 1 : 0
      };
    };

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
                  topicNameValidate: topicNameValidate
                }}
              />

              <TabContainer>
                {tabValue > 0 && newTaskData.length !== 0 && (
                  <TabThreeDot>
                    <IconButton
                      style={{
                        padding: "3px"
                      }}
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
                    styleName: "addNewTask"
                  }}
                />
              </TabContainer>

              {newTaskData.map((item, index) => {
                const taskCardProps = {
                  handleVideoContentAdd: e =>
                    this.handleVideoContentAdd(index, e),
                  handleVideoContentDelete: e =>
                    this.handleVideoContentDelete(index, e),
                  handleVideoContentChange: e =>
                    this.handleVideoContentChange(index, e),
                  taskData: {
                    index: index,
                    tabId: tabValue,
                    inputItem: item,
                    taskProperties: e => this.handleTaskProperties(index, e),
                    richEditorChange: this.onRichEditorChange
                  }
                };
                return <TaskCard {...taskCardProps} />;
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
                handlePreviewClick: handlePreviewClick
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
              message: message
            }}
          />
        </MainContainer>
        {topicDetails && newTaskData.length !== 0 && (
          <TaskPreview {...taskPreviewProps(topicDetails)} />
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.CourseMaterialReducer
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
  uploadTopicImage
})(Index);
