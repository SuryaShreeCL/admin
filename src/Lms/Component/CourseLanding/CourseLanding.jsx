import { Box, Grid, TextField, ThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, H1, textFieldTheme } from '../../Assets/StyledComponents';
import {
  getConcepts,
  getCourses,
  getSubjects,
  getTopics,
  deleteTopic,
} from '../../Redux/Action/CourseMaterial';
import PaginationComponent from '../../Utils/PaginationComponent';
import PlusButton from '../../Utils/PlusButton';
import DataTable from './DataTable';
import DropDownRack from './DropDownRack';
import DialogComponent from '../../Utils/DialogComponent';

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
    };
  }

  componentDidMount() {
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
                  });
                }
              }
            );
          }
        });
      }
    });
  }

  handleThreeDotClick = (topicId, event) => {
    // console.log(event.currentTarget);
    this.setState({ anchorEl: event.currentTarget, popUpId: topicId });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, popUpId: null });
  };

  handlePlusButton = () => {
    console.log('Plus button');
  };

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
    // this.setState({
    //   ...this.state,
    //   [event.target.name + 'Id']: event.target.value,
    // });
  };

  // Search Handle
  handleTextFieldChange = event => {
    this.props.getTopics(
      this.state.conceptId,
      INITIAL_PAGE_NO,
      event.target.value,
      response => {}
    );
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

  handleDelete = topicId => {
    const dialogText = { title: 'Are you sure you want to Delete?', body: '' };

    console.log(topicId);
  };

  render() {
    console.log(this.props.delete);
    const {
      content,
      anchorEl,
      courseId,
      subjectId,
      conceptId,
      pageNo,
      popUpId,
    } = this.state;
    const {
      handlePlusButton,
      handleThreeDotClick,
      handleClose,
      handleChange,
      handleTextFieldChange,
      handlePageChange,
      handleDelete,
    } = this;
    const { courses, subjects, concepts, topics } = this.props;
    console.log(this.state.popUpId);
    return (
      <Container>
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
                      placeholder='Search'
                      onChange={handleTextFieldChange}
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
          <Box flexGrow='1'>
            <DataTable
              topics={topics}
              anchorEl={anchorEl}
              handleThreeDotClick={handleThreeDotClick}
              handleClose={handleClose}
              handlePlusButton
              pageNo={pageNo}
              handleDelete={handleDelete}
              popUpId={popUpId}
            />
          </Box>
        </Grid>
        {topics !== undefined && (
          <PaginationComponent
            pageCount={topics.data.totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <DialogComponent open={false} />
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
    delete: state.CourseMaterialReducer.deleteResponse,
  };
};

export default connect(mapStateToProps, {
  getCourses,
  getSubjects,
  getConcepts,
  getTopics,
  deleteTopic,
})(CourseLanding);
