import { Card, Grid, Button, Snackbar } from '@material-ui/core';
import React, { Component } from 'react';
import '../../Assets/App.css';
import { CardTitle } from '../../Assets/StyledComponents';
import { FillButton, OutlineButton } from '../../Utils/Buttons';
import {
  getCourses,
  createFileUpload,
  courseMonth,
} from '../../Redux/Action/CourseMaterial';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { SnackBar } from '../../Utils/SnackBar';
import Alert from '@material-ui/lab/Alert';
import { lms_study_plans } from '../../../Component/RoutePaths';

class AddStudyPlans extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: '',
      month: '',
      courseValue: [],
      monthValue: '',
      productId: null,
      selectedFile: null,
      selectedMonth: null,
      open: false,
      severity: '',
      message: '',
    };
  }

  componentDidMount() {
    this.props.getCourses();
  }

  handleMonthChange = (e, newValue) => {
    this.setState({
      selectedMonth: newValue,
      open: newValue.studyPlanCreated,
      severity: 'warning',
      message: 'Study plan already created',
    });
  };

  handleCourseChange = (e, newValue) => {
    this.setState({ courseValue: newValue });
    if (newValue) this.props.courseMonth(newValue.id);
  };

  handleChange = e => {
    // console.log(e.target.files[0]);
    this.setState({
      selectedFile: e.target.files[0],
    });
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    this.props.createFileUpload(
      this.state.selectedMonth.id,
      formData,
      response => {
        if (response.success) {
          this.setState({
            open: true,
            message: response.message,
            severity: 'success',
          });
        } else {
          this.setState({
            open: true,
            message: response.message,
            severity: 'error',
          });
        }
        console.log(response);
      }
    );
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false, severity: '', message: '' });
  };

  render() {
    // console.log(this.props.monthResponse);

    // console.log(this.state);
    // console.log(this.props)
    return (
      <div style={{ padding: '10px 5px 5px' }}>
        <Card className={'card'}>
          <Grid container spacing={5} style={{ padding: '12px' }}>
            {/* title */}
            <Grid item md={12}>
              <CardTitle>Add Study Plan</CardTitle>
            </Grid>

            {/* dropdown and button */}

            {/* <Grid container style={{ padding: "12px" }}> */}
            <Grid item md={5}>
              <Autocomplete
                options={this.props.coursesResponse.data || []}
                value={this.state.courseValue}
                onChange={this.handleCourseChange}
                getOptionLabel={option => option.title}
                // style={{ width: 300 }}
                renderInput={params => (
                  <TextField {...params} label='Courses' variant='outlined' />
                )}
              />
            </Grid>

            <Grid item md={5}>
              <Autocomplete
                options={
                  this.props.monthResponse ? this.props.monthResponse.data : []
                }
                onChange={this.handleMonthChange}
                getOptionLabel={option => `${option.month} month`}
                // style={{ width: 300 }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='Plan Duration'
                    variant='outlined'
                  />
                )}
              />
            </Grid>
            <Grid item md={2}></Grid>
            {/* </Grid> */}
            {/* cancel and upload button */}

            {/* <Grid item md={4} container style={{ padding: "10px" }}> */}
            <Grid item md={3}>
              <OutlineButton
                onClick={() => this.props.history.push(lms_study_plans)}
              >
                Cancel
              </OutlineButton>
            </Grid>

            <Grid item md={3}>
              <input
                // accept='image/*'
                style={{ display: 'none' }}
                id='contained-button-file'
                type='file'
                onChange={this.handleChange}
              />
              <label htmlFor='contained-button-file'>
                {this.state.selectedMonth &&
                this.state.selectedMonth.studyPlanCreated ? (
                  ''
                ) : (
                  <FillButton
                    // onClick={() => this.handleClick(this.masterId)}
                    variant='contained'
                    component='span'
                  >
                    Upload
                  </FillButton>
                )}
              </label>
            </Grid>
            {/* </Grid> */}
          </Grid>
        </Card>
        <Snackbar
          open={this.state.open}
          autoHideDuration={4000}
          onClose={this.handleClose}
        >
          <Alert variant='filled' severity={this.state.severity}>
            {this.state.message}
          </Alert>
        </Snackbar>
        {/* <SnackBar
          snackData={{
            open:
              this.state.selectedMonth &&
              this.state.selectedMonth.studyPlanCreated,
            message: 'Study plan',
            snackType: 'success',
            snackClose: () => {},
          }}
          // {this.state.selectedMonth.studyPlanCreated}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    coursesResponse: state.CourseMaterialReducer.courses,
    uploadResponse: state.CourseMaterialReducer.fileUpload,
    monthResponse: state.CourseMaterialReducer.monthlyCourse,
  };
};

export default connect(mapStateToProps, {
  createFileUpload,
  getCourses,
  courseMonth,
})(AddStudyPlans);
