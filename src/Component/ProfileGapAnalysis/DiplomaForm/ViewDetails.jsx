// new design
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

class ViewDetails extends Component {
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
        <Grid container spacing={3} style={{ padding: "14px" }}>
          <Grid
            item
            // container
            md={12}
            xs={12}
            sm={12}
            xl={12}
            lg={12}
            display="flex"
            style={{ padding: "19px" }}
          >
            <Typography className={"viewDetails_title"} variant={"h6"}>
              {item.type}
            </Typography>
          </Grid>

          <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
            <AutoCompleteDropDown
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              id="College Name"
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
              id="departmentName"
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
                  label="Department"
                  variant="standard"
                  name="departmentName"
                />
              )}
            />
          </Grid>

          <Grid item md={4}>
            <TextField
              label="CGPA/Percentage"
              name="score"
              value={score}
              onChange={(e) => this.handleChange(e)}
              fullWidth
            />
          </Grid>

          <Grid item md={4}>
            <AutoCompleteDropDown
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              id="universityName"
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

          <Grid item md={2}>
            <TextField
              label="Batch"
              name="year"
              value={year}
              onChange={(e) => this.handleChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              label="Degree"
              name="year"
              value={year}
              onChange={(e) => this.handleChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              label="CGPA Scale"
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
})(ViewDetails);
