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
  //  setting state
  constructor(props) {
    super(props);

    this.state = {
      collegeName: "",
      collegeNameErr: "",
      universityName: "",
      gpa: "",
      departmentName: "",
      passingYear: "",
      semester: "",
    };
  }

  //   college Array
  college = [];

  // university array
  university = [];

  // department array
  department = [];

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    this.props.getAllColleges();
  }

  render() {
    const {
      collegeName,
      universityName,
      departmentName,
      score,
      semName,
      year,
      item,
    } = this.props;
    console.log(this.props);
    return (
      <div>
        <Grid container spacing={3} style={{ padding: "12px" }}>
          {/* back icon design */}
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
                {this.props.academicTypes}
              </Typography>
            </div>
          </Grid>

          {/* empty grid */}
          <Grid item md={12} xs={12} sm={12} xl={12} lg={12}></Grid>

          {/* 1st grid item */}
          <Grid item md={4} xs={4} sm={4} xl={4} lg={4} display="flex">
            <div className={"grid_item1_div"}>
              <div className={"collegeName_div"}>
                <Typography color="textSecondary">College Name</Typography>
                <Typography>
                  {item && item.college && item.college.name}
                </Typography>
              </div>
              <div className={"collegeName_div"}>
                <Typography color="textSecondary">University Name</Typography>
                <Typography>
                  {item && item.university && item.university.name}
                </Typography>
              </div>
            </div>
          </Grid>

          {/* 2nd grid item */}
          <Grid item md={4} xs={4} sm={4} xl={4} lg={4} display="flex">
            <div className={"grid_item1_div"}>
              <div className={"collegeName_div"}>
                <Typography color="textSecondary">Department</Typography>
                <Typography>
                  {item && item.department && item.department.name}
                </Typography>
              </div>
              <div className={"batch_div"}>
                <Typography color="textSecondary">Batch</Typography>
                <Typography>
                  {new Date(item && item.startDate).getFullYear()} -{" "}
                  {new Date(item && item.endDate).getFullYear()}
                </Typography>
              </div>
            </div>
          </Grid>

          {/* 3rd grid item */}
          <Grid item md={4} xs={4} sm={4} xl={4} lg={4} display="flex">
            <div className={"grid_item1_div"}>
              <div className={"grid_item3_div"}>
                <Typography color="textSecondary">Cumulative CGPA</Typography>
                <Typography>{item && item.score}%</Typography>
              </div>
            </div>
          </Grid>

          {/* empty grid */}
          <Grid item md={12} xs={12} sm={12} xl={12} lg={12}></Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
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
