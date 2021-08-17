import React, { Component } from 'react';
import {
  ColorScheme,
  Container,
  H1,
  textFieldTheme,
} from '../../Assets/StyledComponents';
import {
  Grid,
  TextField,
  Box,
  ThemeProvider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import DropDownRack from './DropDownRack';
import PlusButton from '../../Utils/PlusButton';
import DataTable from './DataTable';
import Pagination from '@material-ui/lab/Pagination';
import PaginationComponent from '../../Utils/PaginationComponent';
import { connect } from 'react-redux';
// import { getCourses } from '../../../Actions/Course';
import {
  getCourses,
  getSubjects,
  getConcepts,
  getTopics,
} from '../../Redux/Action/CourseMaterial';

const INITIAL_PAGE_NO = 0;
const INITIAL_SEARCH_TEXT = '';

class CourseLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      threeDotId: null,
      anchorEl: null,
      courseId: null,
      subjectId: null,
      conceptId: null,
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
                    topicResponse => {
                      console.log(topicResponse);
                      this.setState({
                        courseId: response.data[0].id,
                        subjectId: subjectResponse.data[0].id,
                        conceptId: conceptResponse.data[0].id,
                      });
                    }
                  );
                }
              }
            );
          }
        });
      }
    });
    let data = require('./course-material-landing.json');
    // console.log(data.data.content);
    this.setState({ content: data.data.content });
  }

  handleThreeDotClick = event => {
    console.log(event.currentTarget);
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handlePlusButton = () => {
    console.log('hi');
  };

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name + 'Id']: event.target.value,
    });
  };

  render() {
    console.log(this.state.courseId);
    const {
      content,
      threeDotId,
      anchorEl,
      courseId,
      subjectId,
      conceptId,
    } = this.state;
    const {
      handlePlusButton,
      handleThreeDotClick,
      handleClose,
      handleChange,
    } = this;
    const { courses, subjects, concepts, topics } = this.props;
    return (
      <Box display='flex' m={3}>
        <Container>
          <Grid container spacing={3}>
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
                      <TextField variant='outlined' placeholder='Search' />
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
                content={content}
                threeDotId={threeDotId}
                anchorEl={anchorEl}
                handleThreeDotClick={handleThreeDotClick}
                handleClose={handleClose}
                handlePlusButton
              />
            </Box>
          </Grid>
          <PaginationComponent pageCount={23} />
        </Container>
        {/* </ThemeProvider> */}
      </Box>
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

// export default connect(mapStateToProps, {
//   getOneQuestion,
//   getQuestionAnswer,
//   getAnswerExplanation,
// })(Question);

export default connect(mapStateToProps, {
  getCourses,
  getSubjects,
  getConcepts,
  getTopics,
})(CourseLanding);
