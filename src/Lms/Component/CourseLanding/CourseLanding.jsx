import { Box, Grid, TextField, ThemeProvider } from '@material-ui/core';
import ArchiveIcon from '@material-ui/icons/Archive';
import ShareIcon from '@material-ui/icons/Share';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { lms_add_topic } from '../../../Component/RoutePaths';
import PublishIcon from '../../Assets/icons/Publish.svg';
import { Container, H1, textFieldTheme } from '../../Assets/StyledComponents';
import {
  deleteTopic,
  getConcepts,
  getCourses,
  getSubjects,
  getTopics,
  publishTopic,
  reviewTopic,
  approveTopic,
  draftTopic,
} from '../../Redux/Action/CourseMaterial';
import DialogComponent from '../../Utils/DialogComponent';
import PaginationComponent from '../../Utils/PaginationComponent';
import PlusButton from '../../Utils/PlusButton';
import DataTable from './DataTable';
import DropDownRack from './DropDownRack';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import UnarchiveIcon from '@material-ui/icons/Unarchive';

// import { approveTopic } from "../../Redux/Action/Test";

const INITIAL_PAGE_NO = 0;
const INITIAL_SEARCH_TEXT = '';

class CourseLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      anchorEl: null,
      courseId: null,
      subjectId: null,
      conceptId: null,
      searchText: '',
      pageNo: 0,
      popUpId: null,
      dialogStatus: false,
      dialogContent: null,
      role: '',
      alertState: false,
      alertMsg: '',
      alertSeverity: '',
    };
  }

  componentDidMount() {
    const role = sessionStorage.getItem('role');
    this.props.getCourses(response => {
      if (response.success) {
        this.props.getSubjects(response.data[0].id, subjectResponse => {
          if (subjectResponse.success) {
            this.props.getConcepts(
              subjectResponse.data[0].id,
              conceptResponse => {
                if (conceptResponse.success) {
                  this.props.getTopics(
                    conceptResponse.data[0].id,
                    INITIAL_PAGE_NO,
                    INITIAL_SEARCH_TEXT,
                    topicResponse => {}
                  );
                  this.setState({
                    courseId: response.data[0].id,
                    subjectId: subjectResponse.data[0].id,
                    conceptId: conceptResponse.data[0].id,
                    role: role,
                  });
                }
              }
            );
          }
        });
      }
    });
  }

  // Drop Downs Handling
  handleChange = event => {
    if (event.target.name === 'course')
      // subjectId === event.target.value
      this.props.getSubjects(event.target.value, subjectResponse => {
        if (subjectResponse.success) {
          this.props.getConcepts(
            subjectResponse.data[0].id,
            conceptResponse => {
              if (conceptResponse.success) {
                this.props.getTopics(
                  conceptResponse.data[0].id,
                  INITIAL_PAGE_NO,
                  INITIAL_SEARCH_TEXT,
                  topicResponse => {}
                );
                this.setState({
                  courseId: event.target.value,
                  subjectId: subjectResponse.data[0].id,
                  conceptId: conceptResponse.data[0].id,
                  pageNo: 0,
                });
              }
            }
          );
        }
      });
    if (event.target.name === 'subject')
      this.props.getConcepts(event.target.value, conceptResponse => {
        if (conceptResponse.success) {
          this.props.getTopics(
            conceptResponse.data[0].id,
            INITIAL_PAGE_NO,
            INITIAL_SEARCH_TEXT,
            topicResponse => {}
          );
          this.setState({
            subjectId: event.target.value,
            conceptId: conceptResponse.data[0].id,
            pageNo: 0,
          });
        }
      });
    if (event.target.name === 'concept')
      this.props.getTopics(
        event.target.value,
        INITIAL_PAGE_NO,
        INITIAL_SEARCH_TEXT,
        topicResponse => {}
      );
    this.setState({
      conceptId: event.target.value,
      pageNo: 0,
    });
  };

  // Fail response
  handleFail = response => {
    this.setState({
      alertState: true,
      alertMsg: response.message,
      alertSeverity: 'error',
    });
    this.handleCloseIconClick();
  };

  handleSuccess = response => {
    this.props.getTopics(
      this.state.conceptId,
      INITIAL_PAGE_NO,
      INITIAL_SEARCH_TEXT,
      topicResponse => {}
    );
    this.handleCloseIconClick();
  };

  handleButton2Click = () => {
    if (this.state.dialogContent.type === 'archive')
      this.props.deleteTopic(this.state.popUpId, response => {
        if (response.success) this.handleSuccess(response);
        else this.handleFail(response);
      });
    else if (this.state.dialogContent.type === 'publish')
      this.props.publishTopic(this.state.popUpId, response => {
        if (response.success) this.handleSuccess(response);
        else this.handleFail(response);
      });
    else if (this.state.dialogContent.type === 'unarchive')
      this.props.draftTopic(this.state.popUpId, response => {
        if (response.success) this.handleSuccess(response);
      });
    else if (this.state.dialogContent.type === 'review')
      this.props.reviewTopic(this.state.popUpId, response => {
        if (response.success) this.handleSuccess(response);
      });
    else if (this.state.dialogContent.type === 'approve')
      this.props.approveTopic(this.state.popUpId, response => {
        if (response.success) this.handleSuccess(response);
      });
  };

  handleOptions = (text, topicName, topicId) => {
    // console.log(text);
    if (text === 'Edit') {
      this.props.history.push(lms_add_topic + '?topic_id=' + topicId);
    } else if (text === 'Archive') {
      const dialogContent = {
        type: 'archive',
        icon: <UnarchiveIcon style={{ fontSize: '48px', fill: '#1093FF' }} />,
        title: 'Are you sure you want to Archive?',
        body: topicName,
        button1: 'No',
        button2: 'Yes',
      };
      this.setState({ dialogStatus: true, dialogContent: dialogContent });
    } else if (text === 'Unarchive') {
      const dialogContent = {
        type: 'unarchive',
        icon: <UnarchiveIcon style={{ fontSize: '48px', fill: '#1093FF' }} />,
        title: 'Are you sure you want to Unarchive?',
        body: topicName,
        button1: 'No',
        button2: 'Yes',
      };
      this.setState({ dialogStatus: true, dialogContent: dialogContent });
    } else if (text === 'Send Review') {
      const dialogContent = {
        type: 'review',
        icon: <ShareIcon style={{ fontSize: '48px', fill: '#1093FF' }} />,
        title: 'Are you sure you want to Send Review?',
        body: topicName,
        button1: 'Cancel',
        button2: 'Send',
      };
      this.setState({ dialogStatus: true, dialogContent: dialogContent });
    } else if (text === 'Approve') {
      console.log('hi');
      const dialogContent = {
        type: 'approve',
        icon: <ThumbUpIcon style={{ fontSize: '48px', fill: '#1093ff' }} />,
        title: 'Are you sure you want to Approve?',
        body: topicName,
        button1: 'Cancel',
        button2: 'Approve',
      };
      this.setState({ dialogStatus: true, dialogContent: dialogContent });
    } else if (text === 'Publish Now') {
      const dialogContent = {
        type: 'publish',
        icon: <img src={PublishIcon} width='64px' height='64px' />,
        title: 'Are you sure you want to Publish? ',
        body: topicName,
        button1: 'Cancel',
        button2: 'Publish now',
      };
      this.setState({ dialogStatus: true, dialogContent: dialogContent });
    }
  };

  handleThreeDotClick = (topicId, event) => {
    this.setState({ anchorEl: event.currentTarget, popUpId: topicId });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, popUpId: null });
  };

  handlePlusButton = () => {
    this.props.history.push(lms_add_topic);
  };

  handleTextFieldChange = event => {
    this.setState({ searchText: event.target.value, pageNo: 0 });
  };

  handlePageChange = (event, value) => {
    this.props.getTopics(
      this.state.conceptId,
      value - 1,
      this.state.searchText
    );
    this.setState({ pageNo: value - 1 });
  };

  handleButton1Click = () => {
    this.setState({
      dialogStatus: false,
      dialogContent: null,
    });
  };

  handleCloseIconClick = () => {
    this.setState({
      dialogStatus: false,
      dialogContent: null,
      anchorEl: null,
      popUpId: null,
    });
  };

  handleSendReviewClick = () => {
    const dialogContent = {
      type: 'review',
      icon: <ShareIcon color='primary' style={{ fontSize: '48px' }} />,
      title: 'Are you sure you want to Send Review?',
      button1: 'Cancel',
      button2: 'Send',
    };
    this.setState({ dialogStatus: true, dialogContent: dialogContent });
  };

  handleSearch = () => {
    this.props.getTopics(
      this.state.conceptId,
      INITIAL_PAGE_NO,
      this.state.searchText,
      response => {}
    );
  };

  render() {
    const {
      anchorEl,
      courseId,
      subjectId,
      conceptId,
      pageNo,
      popUpId,
      dialogStatus,
      dialogContent,
      role,
    } = this.state;
    const {
      handlePlusButton,
      handleThreeDotClick,
      handleClose,
      handleChange,
      handleTextFieldChange,
      handlePageChange,
      handleButton1Click,
      handleCloseIconClick,
      handleButton2Click,
      handleSendReviewClick,
      handleOptions,
      handleSearch,
    } = this;
    const { courses, subjects, concepts, topics } = this.props;
    return (
      <Container>
        {/* <ThemeProvider theme={ColorScheme}> */}
        <Grid style={{ minWidth: 0 }} container spacing={3}>
          <Grid
            item
            container
            alignItems='center'
            justifyContent='space-between'
            spacing={2}
            style={{ marginBottom: '35px' }}
          >
            <Grid item>
              <H1>Course Materials</H1>
            </Grid>
            <div>
              <Grid item container alignItems='center' spacing={2}>
                <Grid item>
                  <ThemeProvider theme={textFieldTheme}>
                    <TextField
                      style={{ height: '40px' }}
                      variant='outlined'
                      placeholder='Search topic name'
                      onChange={handleTextFieldChange}
                      onKeyPress={e => e.key === 'Enter' && handleSearch()}
                    />
                  </ThemeProvider>
                </Grid>
                <Grid item>
                  <PlusButton onClick={handlePlusButton}>Add</PlusButton>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Box width='100%' marginBottom='40px'>
            <DropDownRack
              courses={courses}
              subjects={subjects}
              concepts={concepts}
              handleChange={handleChange}
              courseId={courseId}
              subjectId={subjectId}
              conceptId={conceptId}
            />
          </Box>
          <Box overflow='auto' width='100%'>
            <DataTable
              topics={topics}
              anchorEl={anchorEl}
              handleThreeDotClick={handleThreeDotClick}
              handleClose={handleClose}
              handlePlusButton
              pageNo={pageNo}
              popUpId={popUpId}
              handleSendReview={handleSendReviewClick}
              role={role}
              handleOptions={handleOptions}
            />
          </Box>
        </Grid>
        {topics !== undefined && (
          <PaginationComponent
            pageCount={topics.data.totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* Popup components */}
        <Snackbar
          open={this.state.alertState}
          onClose={() => this.setState({ alertState: false })}
        >
          <Alert severity={this.state.alertSeverity} variant='filled'>
            {this.state.alertMsg}
          </Alert>
        </Snackbar>
        <DialogComponent
          open={dialogStatus}
          dialogContent={dialogContent}
          handleButton1Click={handleButton1Click}
          handleCloseIconClick={handleCloseIconClick}
          handleButton2Click={handleButton2Click}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: state.CourseMaterialReducer.courses,
    subjects: state.CourseMaterialReducer.subjects,
    concepts: state.CourseMaterialReducer.concepts,
    topics: state.CourseMaterialReducer.topics,
  };
};

export default connect(mapStateToProps, {
  getCourses,
  getSubjects,
  getConcepts,
  getTopics,
  deleteTopic,
  publishTopic,
  reviewTopic,
  approveTopic,
  draftTopic,
})(CourseLanding);
