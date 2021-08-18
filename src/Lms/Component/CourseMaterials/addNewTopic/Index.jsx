import React, { Component, Fragment } from 'react';
import TinyEditor from '../../../Utils/textEditor/TinyEditor';
import {
  Grid,
  Tab,
  Tabs,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Snackbar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Preview from '../../../Assets/icons/preview.svg';
import { SelectDropDown } from '../../../Utils/SelectField';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { FillButton, OutlineButton, AddButton } from '../../../Utils/Buttons';
import { InputTextField } from '../../../Utils/TextField';
import {
  ButtonContainer,
  Card,
  InputCard,
  MainContainer,
  PreviewIcon,
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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTaskProperties = this.handleTaskProperties.bind(this);
  }

  componentDidMount() {
    //let topicId = new URLSearchParams(history.location.search).get('topicId');
    let newtopicId = 'a66f873b-0065-468b-b79e-0b2cf3f0ff61';
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
                    conceptValue: conceptResponse.data[0].id,
                  });
                  if (newtopicId.trim().length > 10) {
                    this.props.getTopicDetails(newtopicId, newtopicResponse => {
                      if (newtopicResponse.success) {
                        console.log(this.props.taskDetails);
                        this.setState({
                          newTaskData: this.props.taskDetails,
                          totalTasks: this.props.taskDetails.length,
                          tabValue: this.props.taskDetails.length,
                          topicId: newtopicId,
                        });
                      }
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
                //this.props.getTopicDetails(conceptResponse.data[0].id);
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
          //this.props.getTopicDetails(conceptResponse.data[0].id);
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
    const { topicValue, descriptionValue, imageUrl, conceptValue } = this.state;

    if (
      topicValue.trim().length !== 0 &&
      imageUrl.trim().length !== 0 &&
      descriptionValue.trim().length !== 0
    ) {
      const topicData = {
        id: null,
        name: topicValue,
        description: descriptionValue,
        imageUrl: imageUrl,
        concept: { id: conceptValue },
      };
      this.props.addTopicDetails(topicData, topicResponse => {
        if (topicResponse.success) {
          this.setState({
            message: 'New Topic Added Successfully',
            snackOpen: true,
            snackType: 'success',
            topicId: topicResponse.data.id,
          });
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
      taskDetail.content.trim().length !== 0 &&
      taskDetail.contentType.trim().length !== 0 &&
      taskDetail.duration > 0 &&
      taskDetail.name.trim().length !== 0
    ) {
      this.props.addTaskDetails(newTaskData[tabValue - 1], taskResponse => {
        if (taskResponse.success) {
          taskData[tabValue - 1]['id'] = taskResponse.data.id;
          this.setState({
            message: 'New Task Added Successfully',
            snackOpen: true,
            snackType: 'success',
            taskData,
          });
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
    } = this.state;
    const { courses, subjects, concepts } = this.props;
    //console.log(concepts.data);
    return (
      <>
        <MainContainer>
          <Card>
            <Wrapper>
              <Title>Add New Topic</Title>
              <InputCard>
                <Grid container spacing={2} style={{ paddingBottom: '30px' }}>
                  <Grid item xs={12} md={4}>
                    <SelectDropDown
                      label='Course'
                      name='courseValue'
                      items={courses.data}
                      value={courseValue}
                      onhandleChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ paddingBottom: '30px' }}>
                  <Grid item xs={12} md={4}>
                    <SelectDropDown
                      label='Subject'
                      name='subjectValue'
                      items={subjects.data}
                      value={subjectValue}
                      onhandleChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <SelectDropDown
                      label='Concept'
                      name='conceptValue'
                      items={concepts.data}
                      value={conceptValue}
                      onhandleChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputTextField
                      name='topicValue'
                      value={topicValue}
                      onChange={this.handleChange}
                      label='Topic name'
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ paddingBottom: '30px' }}>
                  <Grid item xs={12} md={8}>
                    <InputTextField
                      name='descriptionValue'
                      onChange={this.handleChange}
                      value={descriptionValue}
                      label='Description'
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputTextField
                      name='imageUrl'
                      onChange={this.handleChange}
                      value={imageUrl}
                      label='Image Url'
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent={'flex-end'}>
                  <Grid item>
                    <AddButton onClick={this.handleTopicSaveButton}>
                      Save
                    </AddButton>
                  </Grid>
                  <Grid item style={{ opacity: !topicId && 0.6 }}>
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
                      background: '#1093FF',
                    },
                  }}
                >
                  {newTaskData.map((i, tabIndex) => {
                    return (
                      <Tab
                        className={
                          tabValue === tabIndex + 1 && 'active__task__tab'
                        }
                        label={'Task ' + (tabIndex + 1)}
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
                              name='name'
                              value={item.name}
                              onChange={e =>
                                this.handleTaskProperties(index, e)
                              }
                              label='Task Name'
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} lg={3}>
                            <SelectDropDown
                              label='Task Type'
                              name='contentType'
                              items={[
                                { id: 'TEXT', title: 'TEXT' },
                                { id: 'VIDEO', title: 'VIDEO' },
                              ]}
                              value={item.contentType}
                              onhandleChange={e =>
                                this.handleTaskProperties(index, e)
                              }
                            />
                          </Grid>
                          <Grid item xs={12} lg={3}>
                            <FormControl variant='outlined'>
                              <InputLabel>Approximate time</InputLabel>
                              <OutlinedInput
                                type={'number'}
                                value={item.duration}
                                name='duration'
                                onChange={e =>
                                  this.handleTaskProperties(index, e)
                                }
                                endAdornment={
                                  <InputAdornment position='end'>
                                    mins
                                  </InputAdornment>
                                }
                                labelWidth={145}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      </InputCard>
                      <div style={{ padding: '8px' }}>
                        <TinyEditor
                          data={item.content || ''}
                          onEditorChange={this.onRichEditorChange}
                        />
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </Wrapper>
          </Card>
          {tabValue !== null && tabValue !== 0 && (
            <ButtonContainer>
              <OutlineButton>
                <PreviewIcon src={Preview} /> Preview
              </OutlineButton>
              <span style={{ marginLeft: 26 }}>
                <FillButton onClick={this.handleTaskSaveButton}>
                  Save
                </FillButton>
              </span>
            </ButtonContainer>
          )}
          <Snackbar
            open={snackOpen}
            autoHideDuration={6000}
            onClose={() => {
              this.setState({ snackOpen: false });
            }}
          >
            <Alert
              onClose={() => {
                this.setState({ snackOpen: false });
              }}
              severity={snackType}
              elevation={6}
              variant='filled'
            >
              {message}
            </Alert>
          </Snackbar>
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

const style = {
  minWidth: 40,
  fontSize: '18px',
  margin: '0px 40px',
  padding: 0,
};
