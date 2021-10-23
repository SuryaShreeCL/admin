// new design
import { Typography, Grid, TextField, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import AutoCompleteDropDown from "../../../Utils/CreatableDropdown";
import "../DiplomaForm/DiplomaForm.css";
import { ExpandMore } from "@material-ui/icons";

import { connect } from "react-redux";
import { getAcademicType } from "../../../Actions/HelperAction";

class ViewDetails extends Component {
  

  //   college Array
  college = [];

  // university array
  university = [];

  // department array
  department = [];

  degree = [];



  renderDegree = () => {
    if (this.props.item.degree) {
      return (
        <Grid item md={2}>
          <AutoCompleteDropDown
            popupIcon={<ExpandMore style={{ color: "black" }} />}
            id="degreeName"
            options={this.degree}
            value={this.props.degreeName}
            onChange={this.props.handleDegreeChange}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Degree"
                variant="standard"
                name="degreeName"
              />
            )}
          />
        </Grid>
      );
    }
  };

  render() {
    const {
      item,
      collegeName,
      departmentName,
      universityName,
      scoreScale,
      score,
      list,
      degreeName,
      collegeResponse,
      departmentResponse,
      universityResponse
    } = this.props;
    
    console.log(collegeName);
    console.log(this.props.collegeResponse);
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
            style={{ padding: "14px" }}
          >
            <Typography className={"viewDetails_title"} variant={"h6"}>
              {list[item.type]}
            </Typography>
          </Grid>

          <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
            <AutoCompleteDropDown
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              id="collegeName"
              options={collegeResponse}
              value={collegeName}
              onChange={this.props.handleCollegeChange}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="College Name"
                  variant="standard"
                  name="collegeName"
                />
              )}
            />
          </Grid>

          <Grid item md={4}>
            <AutoCompleteDropDown
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              id="departmentName"
              options={departmentResponse}
              value={departmentName}
              onChange={this.props.handleDepartmentChange}
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
              name="scoreScale"
              value={scoreScale}
              onChange={this.props.handleChange}
              fullWidth
            />
          </Grid>

          <Grid item md={4}>
            <AutoCompleteDropDown
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              id="universityName"
              options={universityResponse}
              value={universityName}
              onChange={this.props.handleUniversityChange}
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

          <Grid item md={this.props.item.degree ? 2 : 4}>
            <TextField
              label="Batch"
              name="year"
              value={`${new Date(item.startDate).getFullYear()} - ${new Date(item.endDate).getFullYear()}`}
              onChange={this.props.handleChange}
              fullWidth
            />
          </Grid>

          {this.renderDegree()}

          <Grid item md={4}>
            <TextField
              label="CGPA Scale"
              name="score"
              value={score}
              onChange={this.props.handleChange}
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
    academicTypes: state.HelperReducer.academicType,

  };
};

export default connect(mapStateToProps, {
  getAcademicType
})(ViewDetails);