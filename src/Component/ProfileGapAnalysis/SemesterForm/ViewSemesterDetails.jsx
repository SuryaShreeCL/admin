import { Typography, Grid, TextField } from "@material-ui/core";
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
    console.log(this.props.departmentResponse);
    return (
      <div>
        <Grid container spacing={3} 
        style={{ padding: "12px" }}
        >
          {/* back icon design */}
          <Grid item md={12}>
            <div className={"diploma_header"}>
              <div>
                <ArrowBackIosIcon className={"back_icon"} />
              </div>
              <div>
                <Typography className={"back_text"}>Back</Typography>
              </div>
            </div>
          </Grid>

          {/* diploma title */}
          <Grid item md={12}>
            <Typography variant={"h6"} className={"semester_title"}>
              5th Sem | Diploma
            </Typography>
          </Grid>

          <Grid item md={4}>
            <AutoCompleteDropDown
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              id="College Name"
              options={this.props.collegeResponse}
              value={this.state.collegeName}
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
                />
              )}
            />
          </Grid>

          <Grid item md={4}>
            <AutoCompleteDropDown
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              id="universityName"
              options={this.props.universityResponse}
              value={this.state.universityName}
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
              value={this.state.gpa}
              onChange={(e) => this.handleChange(e)}
              fullWidth
            />
          </Grid>

          <Grid item md={4}>
            <AutoCompleteDropDown
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              id="departmentName"
              options={this.department}
              value={this.props.departmentResponse}
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
              value={this.state.passingYear}
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
  console.log(state);
  return {
    collegeResponse: state.CollegeReducer.allCollegeList,
    universityResponse: state.CollegeReducer.University,
    departmentResponse: state.CollegeReducer.BranchList,
  };
};

export default connect(mapStateToProps, {
  getAllColleges,
  getUniversity,
  getBranches,
})(ViewSemesterDetails);
