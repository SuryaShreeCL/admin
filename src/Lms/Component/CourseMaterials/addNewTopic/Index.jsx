import React, { Component } from 'react';
import {
  Card,
  MainContainer,
  TabContainer,
  Title,
  Wrapper,
} from '../../../Assets/StyledComponents';
import {
  getCourses,
  getSubjects,
  getConcepts,
  addTaskDetails,
  addTopicDetails,
  getTopicDetails,
} from '../../../Redux/Action/CourseMaterial';
import { connect } from 'react-redux';
import { TopicCard } from './TopicCard';
import { TaskCard } from './TaskCard';
import { SnackBar } from '../../../Utils/SnackBar';
import { TaskButtons } from './TaskButtons';
import { StyledTaps } from '../../../Utils/Tabs';
import QueryString from 'qs';
import { lms_course_landing } from '../../../../Component/RoutePaths';

// const  = str => {
//   return str.match(/\.(jpeg|jpg|gif|png)$/);
// };

// function validURL(url) {
//   var arr = ['jpeg', 'jpg', 'gif', 'png'];
//   var ext = url.substring(url.lastIndexOf('.') + 1);
//   console.log(ext);
//   // if (inArray(ext, arr)) {
//   // alert('valid url');
//   // return true;
//   return null;
// }
const validURL = url => {
  return url.indexOf('jpg' || 'jpeg' || 'png' || 'tiff') > -1;
  // if (files[0].name.match(/.(xls|xlsx|csv)$/i))
  // console.log(url);
  // if (url.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp)$/gi)) return true;
  // return !!url.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp)$/gi);
  // return url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
  // return true;
};

function isValidImageURL(str) {}

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseValue: null,
      subjectValue: null,
      conceptValue: null,
      topicValue: '',
      descriptionValue: '',
      imageUrl: '',
      newTaskData: [],
      tabValue: null,
      totalTasks: 0,
      topicId: null,
      message: '',
      snackOpen: false,
      snackType: 'success',
      tabsLabels: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTaskProperties = this.handleTaskProperties.bind(this);
  }

  componentDidMount() {
    const { topic_id } = QueryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    var newtopicId = topic_id;
    this.props.getCourses(response => {
      if (response.success) {
        this.props.getSubjects(response.data[0].id, subjectResponse => {
          if (subjectResponse.success) {
            this.props.getConcepts(
              subjectResponse.data[0].id,
              conceptResponse => {
                if (conceptResponse.success) {
                  if (
                    newtopicId !== undefined &&
                    newtopicId !== null &&
                    newtopicId.trim().length > 10
                  ) {
                    this.props.getTopicDetails(newtopicId, newtopicResponse => {
                      if (newtopicResponse.success) {
                        const { data } = this.props.topicsDetails;
                        const { taskDetails } = this.props;
                        this.props.getSubjects(data.course.id, {});
                        this.props.getConcepts(data.subject.id, {});
                        this.setState({
                          newTaskData: taskDetails,
                          totalTasks: taskDetails.length,
                          tabValue: 1,
                          topicId: data.id,
                          courseValue: data.course.id,
                          subjectValue: data.subject.id,
                          conceptValue: data.concept.id,
                          topicValue: data.name,
                          descriptionValue: data.description,
                          imageUrl: data.imageUrl,
                        });
                        taskDetails.map((i, index) => {
                          this.setState(prevState => ({
                            tabsLabels: [
                              ...prevState.tabsLabels,
                              {
                                tabLabel: 'Task ' + (index + 1),
                              },
                            ],
                          }));
                        });
                      }
                    });
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
  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
    if (name === 'courseValue') {
      this.props.getSubjects(value, subjectResponse => {
        if (subjectResponse.success) {
          this.props.getConcepts(
            subjectResponse.data[0].id,
            conceptResponse => {
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
    if (name === 'subjectValue') {
      this.props.getConcepts(value, conceptResponse => {
        if (conceptResponse.success) {
          this.setState({
            conceptValue: conceptResponse.data[0].id,
          });
        }
      });
    }
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

  handleTopicSaveButton = () => {
    const {
      topicValue,
      descriptionValue,
      imageUrl,
      conceptValue,
      topicId,
    } = this.state;
    if (
      topicValue.trim().length > 0 &&
      imageUrl.trim().length > 0 &&
      descriptionValue.trim().length > 0
    ) {
      if (validURL(imageUrl)) {
        const topicData = {
          id: topicId,
          name: topicValue,
          description: descriptionValue,
          imageUrl: imageUrl,
          concept: { id: conceptValue },
        };
        this.props.addTopicDetails(topicData, topicResponse => {
          if (topicResponse.success) {
            var topicMessage = 'New Topic Added Successfully';
            if (topicId !== null)
              topicMessage = 'Current Topic Updated Successfully';
            this.setState({
              message: topicMessage,
              snackOpen: true,
              snackType: 'success',
              topicId: topicResponse.data.id,
            });
          }
        });
      } else {
        let imageMessage = 'Please enter a valid url';
        this.setState({
          message: imageMessage,
          snackOpen: true,
          snackType: 'warning',
        });
      }
    } else {
      var imageMessage = 'Please fill all the valid fields';
      this.setState({
        message: imageMessage,
        snackOpen: true,
        snackType: 'warning',
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
            name: '',
            contentType: '',
            duration: '',
            content: '',
            topic: { id: this.state.topicId },
          },
        ],
        tabsLabels: [
          ...prevState.tabsLabels,
          { tabLabel: 'Task ' + (this.state.totalTasks + 1) },
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
      this.props.addTaskDetails(newTaskData[tabValue - 1], taskResponse => {
        if (taskResponse.success) {
          var taskMessage = 'New Task Added Successfully';
          if (newTaskData[tabValue - 1].id !== null)
            taskMessage = 'Current Task Updated Successfully';

          taskData[tabValue - 1]['id'] = taskResponse.data.id;
          this.setState({
            message: taskMessage,
            snackOpen: true,
            snackType: 'success',
            taskData,
          });
          this.props.history.push(lms_course_landing);
        }
      });
    } else {
      this.setState({
        message: 'Please fill all the fields',
        snackOpen: true,
        snackType: 'warning',
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
    } = this.state;
    const { courses, subjects, concepts, taskDetails } = this.props;
    const { topic_id } = QueryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    return (
      <>
        <MainContainer>
          <Card>
            <Wrapper>
              <Title>{topic_id ? 'Edit Topic' : 'Add New Topic'}</Title>
              <TopicCard
                data={{
                  courses: courses.data,
                  courseId: courseValue,
                  subjects: subjects.data,
                  subjectId: subjectValue,
                  concepts: concepts.data,
                  conceptId: conceptValue,
                  topic: topicValue,
                  topicId: topicId,
                  url: imageUrl,
                  description: descriptionValue,
                  handleChange: this.handleChange,
                  AddTask: this.handleAddTask,
                  topicSaveButton: this.handleTopicSaveButton,
                }}
              />

              <TabContainer>
                <StyledTaps
                  tabsData={{
                    tabId: tabValue - 1,
                    handleTabChange: (e, newValue) =>
                      this.setState({ tabValue: newValue + 1 }),
                    tabsBackColor: '#1093FF',
                    tabData: tabsLabels,
                    activeClass: 'active__task__tab',
                    styleName: 'addNewTask',
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
                      taskProperties: e => this.handleTaskProperties(index, e),
                      richContent:
                        (topic_id &&
                          taskDetails.length > 0 &&
                          taskDetails[tabValue - 1] !== undefined &&
                          taskDetails[tabValue - 1].content) ||
                        '',
                      richEditorChange: this.onRichEditorChange,
                    }}
                  />
                );
              })}
            </Wrapper>
          </Card>
          {tabValue !== null && tabValue !== 0 && (
            <TaskButtons
              actionData={{
                taskSaveButton: this.handleTaskSaveButton,
                cancelButton: () => {
                  this.props.history.push(lms_course_landing);
                },
              }}
            />
          )}
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
          <p>{newTaskData.length !== 0 && newTaskData[tabValue - 1].content}</p>
        </MainContainer>
      </>
    );
  }
}

const mapStateToProps = state => {
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
})(Index);
