import { Typography, Grid, TextField, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import AutoCompleteDropDown from "../../../Utils/CreatableDropdown";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "../DiplomaForm/DiplomaForm.css";
import { ExpandMore } from "@material-ui/icons";
import {
  getAllColleges,
  getUniversity,
  getBranches,
} from "../../../Actions/College";
import { connect } from "react-redux";
import { getAcademicType } from "../../../Actions/HelperAction";

class ViewSemesterDetails extends Component {
  renderDegree = () => {
    if (this.props.degreeType) {
      return (
        <Typography
          color="textSecondary"
          className={"semesterForm_degree_style"}
        >
          Degree
        </Typography>
      );
    } else {
      return <div></div>;
    }
  };

  renderDegreeField = () => {
    if (this.props.degreeType) {
      return (
        <Typography
          className={"semesterForm_degreeField"}
          // style={{ height: "60px", marginTop: "3px" }}
        >
          {this.props.degreeType.name}
        </Typography>
      );
    } else {
      return <div></div>;
    }
  };

  render() {
    const {
      collegeName,
      universityName,
      departmentName,
      cgpaScale,
      semName,
      year,
      list,
      degree,
      item,
      cgpaPercentage,
      degreeType,
    } = this.props;
    
    
    return (
      <div>
        <Grid container>
          <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
            <div onClick={this.props.backHandler} className={"diploma_header"}>
              <div>
                <ArrowBackIosIcon className={"back_icon"} />
              </div>
              <div>
                <Typography className={"back_text"}>Back</Typography>
              </div>
            </div>
          </Grid>
          {/* diploma title */}
          <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
            <div className={"semester_title_div"}>
              <Typography variant={"h6"} className={"semester_title"}>
                {semName} |
              </Typography>
              <Typography variant={"h6"} className={"semester_title1"}>
                {list[this.props.academicTypes]}
              </Typography>
            </div>
          </Grid>

          {/* try */}
    
          <Grid item md={12} className={"details_grid"}>
            <Grid container>
              <Grid item md={3}>
              <Typography
                color="textSecondary"
              >
                College Name
              </Typography>
              </Grid>
              <Grid item md={3}>
              <Typography 
              >
                {collegeName.name}
              </Typography>
              </Grid>
              <Grid item md={3}>
              <Typography
                color="textSecondary"
                // className={"semesterForm_college_style"}
              >
                Department
              </Typography>
              </Grid>
              <Grid item md={3}>
              <Typography 
              // className={"semesterForm_departmentField"}
              >
                {departmentName && departmentName.name}
              </Typography>
              </Grid>
              <Grid item md={3}>
              <Typography
                // className={"semesterForm_universityAndCgpa_style"}
                color="textSecondary"
              >
                University Name
              </Typography>
              </Grid>
              <Grid item md={3}>
              <Typography 
              // className={"semesterForm_universityField"}
              >
                {universityName.name}
              </Typography>
              </Grid>
              <Grid item md={3}>
              <Typography
                color="textSecondary"
                // className={"semesterForm_universityAndCgpa_style"}
              >
                Batch
              </Typography>
              </Grid>
              <Grid item md={3}>
              <Typography 
              // className={"semesterForm_yearField"}
              >
                {year}
              </Typography>
              </Grid>
              <Grid item md={3}>
              <Typography
                color="textSecondary"
                // className={"semesterForm_universityAndCgpa_style"}
              >
                CGPA/Percentage
              </Typography>
              </Grid>
              <Grid item md={3}>
              <Typography 
              // className={"semesterForm_percentageField"}
              >
                {cgpaPercentage}
              </Typography>
              </Grid>
              <Grid item md={3}>
              <Typography
                color="textSecondary"
                // className={"semesterForm_universityAndCgpa_style"}
              >
                CGPA Scale
              </Typography>
              </Grid>
              <Grid item md={3}>
              <Typography
              //  className={"semesterForm_percentageField"}
               >
                {cgpaPercentage}
              </Typography>
              </Grid>
            </Grid>
            </Grid> 
          {/* <Grid item  md={3} xs={3} sm={3} xl={3} lg={3}>
            <div className={"semesterForm_semesterDetail_grid_item1"}>
              <Typography
                className={"semesterForm_college_style"}
                color="textSecondary"
              >
                College Name
              </Typography>

              <Typography
                className={"semesterForm_universityAndCgpa_style"}
                color="textSecondary"
              >
                University Name
              </Typography>

              <Typography
                color="textSecondary"
                className={"semesterForm_universityAndCgpa_style"}
              >
                CGPA/Percentage
              </Typography>
              {this.renderDegree()}
            </div>
          </Grid> */}

          {/* <Grid item  md={3} xs={3} sm={3} xl={3} lg={3}>
            <div className={"semesterForm_semesterDetail_grid_item2"}>
              <Typography className={"semesterForm_collegeField"}>
                {collegeName.name}
              </Typography>
              <Typography className={"semesterForm_universityField"}>
                {universityName.name}
              </Typography>
              <Typography className={"semesterForm_percentageField"}>
                {cgpaPercentage}
              </Typography>
              {this.renderDegreeField()}
            </div>
          </Grid> */}

          {/* <Grid item  md={3} xs={3} sm={3} xl={3} lg={3}>
            <div className={"semesterForm_semesterDetail_grid_item3"}>
              <Typography
                color="textSecondary"
                className={"semesterForm_college_style"}
              >
                Department
              </Typography>
              <Typography
                color="textSecondary"
                className={"semesterForm_universityAndCgpa_style"}
              >
                Batch
              </Typography>

              <Typography
                color="textSecondary"
                className={"semesterForm_universityAndCgpa_style"}
              >
                CGPA Scale
              </Typography>
            </div>
          </Grid> */}

          {/* <Grid item md={3} xs={3} sm={3} xl={3} lg={3}>
            <div className={"semesterForm_semesterDetail_grid_item4"}>
              <Typography className={"semesterForm_departmentField"}>
                {departmentName && departmentName.name}
              </Typography>
              <Typography className={"semesterForm_yearField"}>
                {year}
              </Typography>
              <Typography className={"semesterForm_scaleField"}>
                {cgpaScale}
              </Typography>
            </div>
          </Grid> */}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    collegeResponse: state.CollegeReducer.allCollegeList,
    universityResponse: state.CollegeReducer.University,
    departmentResponse: state.CollegeReducer.BranchList,
    academicTypes: state.HelperReducer.academicType,
  };
};

export default connect(mapStateToProps, {
  getAllColleges,
  getUniversity,
  getBranches,
  getAcademicType,
})(ViewSemesterDetails);
