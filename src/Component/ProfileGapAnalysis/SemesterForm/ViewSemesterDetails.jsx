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
  constructor(props) {
    super(props);

    //  setting state
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

  // function to handle the textfield
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
      list,
      item
    } = this.props;
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
              {list[this.props.academicTypes]}
              </Typography>
            </div>
          </Grid>

          

          <Grid item md={4}  xs={4} sm={4} xl={4} lg={4}>
            <AutoCompleteDropDown
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              id="College Name"
              disabled
              options={this.props.collegeResponse}
              value={collegeName}
              onChange={(e, newValue) =>
                this.setState({
                  collegeName: newValue,
                })
              }
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="College Name"
                  variant="standard"
                  name="College Name"
                  value={collegeName}
                />
              )}
            />
          </Grid>

          <Grid item md={4}>
            <AutoCompleteDropDown
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              id="universityName"
              disabled
              options={this.props.universityResponse}
              value={universityName}
              onChange={(e, newValue) =>
                this.setState({
                  universityName: newValue,
                })
              }
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="university Name"
                  variant="standard"
                  name="universityName"
                />
              )}
            />
          </Grid>

          <Grid item md={4}>
            <TextField
              label="GPA"
              name="score"
              disabled
              value={score}
              onChange={(e) => this.handleChange(e)}
              fullWidth
            />
          </Grid>

          <Grid item md={4}>
            <AutoCompleteDropDown
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              id="departmentName"
              disabled
              options={this.department}
              value={departmentName}
              onChange={(e, newValue) =>
                this.setState({
                  departmentName: newValue,
                })
              }
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Department Name"
                  variant="standard"
                  name="departmentName"
                />
              )}
            />
          </Grid>

          <Grid item md={4}>
            <TextField
              label="Passing Year"
              disabled
              name="year"
              value={year}
              onChange={(e) => this.handleChange(e)}
              fullWidth
            />
          </Grid>
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
