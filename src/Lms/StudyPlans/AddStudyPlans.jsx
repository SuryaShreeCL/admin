import { Card, Grid, Button } from "@material-ui/core";
import React, { Component } from "react";
import "../Assets/App.css";
import { CardTitle } from "../Assets/StyledComponents";
import { FillButton, OutlineButton } from "../Utils/Buttons";
import {
  getCourses,
  createFileUpload,
  courseMonth,
} from "../Redux/Action/CourseMaterial";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

class AddStudyPlans extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: "",
      month: "",
      courseValue: [],
      monthValue: "",
      productId: null,
    };
  }

  componentDidMount() {
    this.props.getCourses();
  }
  
  handleClick() {}

  handleCourseChange = (e, newValue) => {
    this.setState({ courseValue: newValue });
    if (newValue) this.props.courseMonth(newValue.id);
  };

  render() {
    console.log(this.state);
    // console.log(this.props)
    return (
      <div style={{ padding: "10px 5px 5px" }}>
        <Card className={"card"}>
          <Grid container spacing={3} style={{ padding: "12px" }}>
            {/* title */}
            <Grid item md={12}>
              <CardTitle>Add Study Plan</CardTitle>
            </Grid>

            {/* dropdown and button */}

            <Grid container style={{ padding: "12px" }}>
              <Grid item md={3} xs={3}>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.props.coursesResponse.data || []}
                  value={this.state.courseValue}
                  onChange={this.handleCourseChange}
                  getOptionLabel={(option) => option.title}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Courses" variant="outlined" />
                  )}
                />
              </Grid>
              <Grid item md={1} xs={1}></Grid>
              <Grid item md={3} xs={3}>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.props.monthResponse ? this.props.monthResponse.data :  [] }
                  getOptionLabel={(option) => `${option.month} month` }
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Plan Duration"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
            </Grid>
            {/* cancel and upload button */}

            <Grid item md={4} container style={{ padding: "10px" }}>
              <Grid item md={6} xs={12}>
                <OutlineButton>Cancel</OutlineButton>
              </Grid>

              <Grid item md={6} xs={12}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="contained-button-file"
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <FillButton variant="contained" component="span">
                    Upload
                  </FillButton>
                </label>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
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
