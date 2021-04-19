import { Grid, Typography, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
    getAllColleges,
    getUniversity,
    getDegree,
    getBranches,
  } from "../../Actions/College";
  import Autocomplete from "@material-ui/lab/Autocomplete";

import {getStudentsById} from "../../Actions/Student"
class GeneralDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            studentId : null,
            studentIdHelperTxt : '',
            ugDegree : {},
            ugDegreeHelperTxt : '',
            department : {},
            departmentHelperTxt : "",
            firstName : null,
            fNameHelperTxt : "",
            lastName : null,
            lNameHelperTxt: "",
            college : {},
            collegeHelperTxt : "",
            university : {},
            universityHelperTxt : "",
            eMail : null,
            eMailHelperTxt : '',
            phoneNumber : null,
            phoneHelperTxt : '',

        }
    }

    componentDidMount() {
        this.props.getStudentsById(this.props.id)
        this.props.getBranches()
        this.props.getUniversity()
        this.props.getDegree()
        this.props.getAllColleges()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.StudentDetails !== prevProps.StudentDetails) {
            this.setState({
                studentId: this.props.StudentDetails.studentID,
                ugDegree:
                this.props.StudentDetails.ugDegree !== null
                  ? this.props.StudentDetails.ugDegree
                  : {},
                  department: this.props.StudentDetails.department !== null ? this.props.StudentDetails.department : {},
                  college: this.props.StudentDetails.college !== null ? this.props.StudentDetails.college : {},
                  university: this.props.StudentDetails.university !== null ? this.props.StudentDetails.university : {},
                  firstName: this.props.StudentDetails.firstName,
                  lastName: this.props.StudentDetails.lastName,
                  eMail: this.props.StudentDetails.emailId,
                  phoneNumber: this.props.StudentDetails.phoneNumber,



            })
        }

    }
    
    handleChange = (e) =>{
        this.setState({[e.target.name] : e.target.value})
    }
    

  render() {
      console.log(this.props.StudentDetails)
    return (
      <div>
        <Grid container style={{ padding: "2%" }} spacing={1}>
          <Grid item md={12}>
            <Typography color="textSecondary">User Controls</Typography>
          </Grid>
          <Grid item md={4}>
          <TextField
                  variant="outlined"
                  size="small"
                  error={
                    this.state.studentIdHelperTxt.length !== 0 ? true : false
                  }
                  onChange={(e) => this.handleChange(e)}
                  name={"studentId"}
                  helperText={this.state.studentIdHelperTxt}
                  label="Student ID"
                //   disabled={this.state.letEdit === false ? true : false}
                  value={this.state.studentId}
                  InputLabelProps={{shrink : true}}
                />
          </Grid>
          <Grid item md={2}>
          <Autocomplete
                  id="combo-box-demo"
                  options={this.props.degreeList}
                  value={this.state.ugDegree}
                //   disabled={this.state.letEdit === false ? true : false}
                  name={"ugDegree"}
                  size="small"
                  onChange={(e, newValue) =>
                    this.setState({ ugDegree: newValue })
                  }
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={this.state.ugDegreeHelperTxt}
                      label="UG Degree"
                      variant="outlined"
                    />
                  )}
                />
          </Grid>
          <Grid item md={2}>
          <Autocomplete
                  id="combo-box-demo"
                  options={this.props.branchList}
                  value={this.state.department}
                //   disabled={this.state.letEdit === false ? true : false}
                  name={"department"}
                  size="small"
                  onChange={(e, newValue) =>
                    this.setState({ department: newValue })
                  }
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={this.state.departmentHelperTxt}
                      label="Department"
                      variant="outlined"
                    />
                  )}
                />
          </Grid>
          <Grid item md={2}>
          <TextField
                  variant="outlined"
                  size="small"
                  label="Area Of Interest 1"
            
                />
          </Grid>
          <Grid item md={2}>
          <TextField
                  variant="outlined"
                  size="small"
                  label="Area Of Interest 2"
            
                />
          </Grid>
          <Grid item md={2}>
          <TextField
                  variant="outlined"
                  size="small"
                  error={this.state.fNameHelperTxt.length !== 0 ? true : false}
                  helperText={this.state.fNameHelperTxt}
                  onChange={(e) => this.handleChange(e)}
                  name={"firstName"}
                  label="First Name"
                  InputLabelProps={{shrink : true}}
                  value={this.state.firstName}
                />
          </Grid>
          <Grid item md={2}>
          <TextField
                  variant="outlined"
                  size="small"
                  error={this.state.lNameHelperTxt.length !== 0 ? true : false}
                  helperText={this.state.lNameHelperTxt}
                  onChange={(e) => this.handleChange(e)}
                  name={"lastName"}
                  label="Last Name"
                  InputLabelProps={{shrink : true}}
                  value={this.state.lastName}
                />    
          </Grid>
          <Grid item md={2}>
          <Autocomplete
                  id="combo-box-demo"
                  value={this.state.college}
                  name={"college"}
                  size="small"
                  onChange={(e, newValue) => this.setState({college : newValue})}
                  options={
                    this.props.allCollegeList.length !== 0
                      ? this.props.allCollegeList
                      : []
                  }
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} helperText={this.state.collegeHelperTxt} label="College" variant="outlined" />
                  )}
                />   
          </Grid>
          <Grid item md={2}>
          <Autocomplete
                  id="combo-box-demo"
                  value={this.state.university}
                  name={"university"}
                  size="small"
                  onChange={(e, newValue) => this.setState({university : newValue})}
                  disabled={this.state.letEdit === false ? true : false}
                  options={
                    this.props.universityList.length !== 0
                      ? this.props.universityList
                      : []
                  }
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={this.state.universityHelperTxt}
                      label="University"
                      variant="outlined"
                    />
                  )}
                />      
          </Grid>
          <Grid item md={2}>
          <TextField
                  variant="outlined"
                  size="small"
                  label="Area Of Interest 3"
            
                />
          </Grid>
          <Grid item md={2}>
          <TextField
                  variant="outlined"
                  size="small"
                  label="Area Of Interest 4"
            
                />
          </Grid>
          <Grid item md={2}>
          <TextField
                  variant="outlined"
                  size="small"
                  onChange={(e) => this.handleChange(e)}
                  name={"eMail"}
                  InputLabelProps={{shrink : true}}
                  helperText={this.state.eMailHelperTxt}
                //   disabled={this.state.letEdit === false ? true : false}
                  label="E-Mail"
                  value={this.state.eMail}
                />
          </Grid>
          <Grid item md={2}>
          <TextField
                  variant="outlined"
                  size="small"
                  InputLabelProps={{shrink : true}}
                  helperText={this.state.phoneHelperTxt}
                  onChange={(e) => this.handleChange(e)}
                  name={"phoneNumber"}
                //   disabled={this.state.letEdit === false ? true : false}
                  label="Phone Number"
                  value={this.state.phoneNumber}
                />
          </Grid>
          <Grid item md={1}>
                    
          </Grid>
          <Grid item md={1}>

          </Grid>
          <Grid item md={1}>

          </Grid>
          <Grid item md={1}>

          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      StudentDetails: state.StudentReducer.StudentList,
      cityList: state.StudentReducer.cityList,
      allCollegeList: state.CollegeReducer.allCollegeList,
      universityList: state.CollegeReducer.University,
      degreeList: state.CollegeReducer.Degree,
      branchList: state.CollegeReducer.BranchList,
    };
  };

export default connect(mapStateToProps,{getStudentsById, getAllColleges,
    getUniversity,
    getDegree,
    getBranches,})(GeneralDetails)
