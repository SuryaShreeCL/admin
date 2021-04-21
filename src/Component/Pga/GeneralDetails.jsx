import { Grid, Divider, Typography, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
    getAllColleges,
    getUniversity,
    getDegree,
    getBranches,
  } from "../../Actions/College";
  import Autocomplete from "@material-ui/lab/Autocomplete";
  import {getAllBranch,getAllDegree,getAllSpecialization} from "../../Actions/Aspiration"

import {getPgaScores} from "../../Actions/PgaAction"
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
            uggpaScale: {},
            uggpaScaleHelperTxt: "",
            uggpa: null,
            uggpaHelperTxt: "",
            sem: {},
            semHelperTxt: "",
            expectedYear: {},
            expectedYearHelperTxt: "",
            branch : [],
            branchHelperTxt : '',
            degree : [],
            degreeHelperTxt : '',
            specialization : [],
            specializationHelperTxt : '',
            overallResult : null,
            numericalAbility : null,
            logicalReasoning : null,
            verbalReasoning : null,
            personalityCode : null,
            csTest : null,
            eceTest : null,
        }
    }

    componentDidMount() {
        this.props.getStudentsById(this.props.id)
        this.props.getBranches()
        this.props.getUniversity()
        this.props.getDegree()
        this.props.getAllColleges()
        this.props.getAllBranch()
        this.props.getAllDegree()
        this.props.getAllSpecialization()
        this.props.getPgaScores(this.props.id)
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
                  expectedYear: {
                    title: this.props.StudentDetails.expectedYrOfGrad.toString(),
                    value: this.props.StudentDetails.expectedYrOfGrad,
                  },
                  sem:
                    this.props.StudentDetails.currentSem === 100
                      ? { title: "Graduated", value: 100 }
                      : {
                          title: this.props.StudentDetails.currentSem.toString(),
                          value: this.props.StudentDetails.currentSem,
                        },
                        uggpaScale: {
                          title: this.props.StudentDetails.uggpascale.toString(),
                          value: this.props.StudentDetails.uggpascale,
                        },
                        uggpa: this.props.StudentDetails.uggpa,
                        branch : this.props.aspirationDetails.branches,
                        degree : this.props.aspirationDetails.degrees,
                        specialization : this.props.aspirationDetails.specializations,
            })
        }
        if(this.props.pgaScoreDetails !== prevProps.pgaScoreDetails){
          this.setState({
            overallResult : this.props.pgaScoreDetails.["Overall Aptitude Score"],
            numericalAbility : this.props.pgaScoreDetails.["Numerical Ability (Score Out of 100)"],
            logicalReasoning : this.props.pgaScoreDetails.["Logical Reasoning (Score Out of 100)"],
            verbalReasoning : this.props.pgaScoreDetails.["Verbal Reasoning (Score Out of 100)"],
            personalityCode : this.props.pgaScoreDetails.personalitycode.replace("[","").replace("]",""),

          })
          let mechObj = this.props.pgaScoreDetails.score.find(eachDetails=>eachDetails.questionSetName === "Technical Test Mechanical")
         if(mechObj !== undefined){
           this.setState({
              mechTest : mechObj.score,
           })
         }
         let csObj = this.props.pgaScoreDetails.score.find(eachDetails=>eachDetails.questionSetName === "Technical Test Computer")
         if(csObj !== undefined){
           this.setState({
              csTest : csObj.score,
           })
         }
         let eceObj = this.props.pgaScoreDetails.score.find(eachDetails=>eachDetails.questionSetName === "Technical Test Electronics")
         if(eceObj !== undefined){
           this.setState({
              eceTest : eceObj.score,
           })
         }
        }

       
    }
    
    handleChange = (e) =>{
        this.setState({[e.target.name] : e.target.value})
    }
    renderYear = () => {
      let d = new Date();
      let currentYr = d.getFullYear();
      if (this.state.sem === null) {
        let startingYear = currentYr - 5;
        let endingYear = currentYr + 5;
        let year = [];
        for (startingYear; startingYear <= endingYear; startingYear++) {
          year.push({ title: startingYear.toString(), value: startingYear });
        }
        return year;
      } else if (this.state.sem.value === 100) {
        let startingYear = currentYr - 5;
        let endingYear = currentYr;
        let year = [];
        for (startingYear; startingYear <= endingYear; startingYear++) {
          year.push({ title: startingYear.toString(), value: startingYear });
        }
        return year;
      } else {
        let startingYear = currentYr;
        let endingYear = currentYr + 5;
        let year = [];
        for (startingYear; startingYear <= endingYear; startingYear++) {
          year.push({ title: startingYear.toString(), value: startingYear });
        }
        return year;
      }
    };
    renderSem = () => {
      let sem = [];
      let graduate = 100;
      for (let i = 1; i <= 8; i++) sem.push({ title: i.toString(), value: i });
      sem.push({ title: "Graduated", value: graduate });
      return sem;
    };
  
    renderUggpaScale = () => {
      let cgpascalelist = [
        { title: "10", value: 10 },
        { title: "7", value: 7 },
        { title: "4", value: 4 },
        { title: "%", value: 100 },
      ];
      return cgpascalelist;
    };
    
    
    period=[
        {title:"Jan to Mar"},
        {title:"Apr to June"},
        {title:"July to Sep"},
        {title:"Oct to Dec"},
      ] 
  country=[
    {title:"India"},
    {title:"South Africa"},
    {title:"Srilanka"},
    {title:"Australia"},
    {title:"Japan"},
  ]
  track=[
    {title:"Masters"},
    {title:"PB-Masters"},
    {title:"PB-Placements"},
    {title:"Others"},
  ]
  
      render() {
      console.log(this.props.StudentDetails)
      console.log(this.props.aspirationDetails)
      // console.log(this.props.aspidegreeList)
      console.log(this.state.degree)
      console.log(this.props.pgaScoreDetails)
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
                  fullWidth
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
          {/* <Typography
                  color="primary"
                  // style={textStyle}
                  variant="subtitle1"
                >
                  {"Expected Year Of Grad:"}
                </Typography> */}
                <Autocomplete
                  id="combo-box-demo"
                  options={this.renderYear()}
                  fullWidth
                  value={this.state.expectedYear}
                  name={"expectedYear"}
                  size="small"
                  onChange={(e, newValue) =>
                    this.setState({ expectedYear: newValue })
                  }
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={this.state.expectedYearHelperTxt}
                      label="Year Of Graduation"
                      variant="outlined"
                    />
                  )}
                /> 
          </Grid>
          <Grid item md={1}>
          {/* <Typography
                  color="primary"
                  // style={textStyle}
                  variant="subtitle1"
                >
                  {"Current Sem:"}
                </Typography> */}
                <Autocomplete
                  id="combo-box-demo"
                  options={this.renderSem()}
                  value={this.state.sem}
                  name={"sem"}
                  fullWidth
                  size="small"
                  onChange={(e, newValue) => this.setState({ sem: newValue })}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={this.state.semHelperTxt}
                      label="Current Sem"
                      variant="outlined"
                    />
                  )}
                />
          </Grid>
          <Grid item md={1}>
          {/* <Typography
                  color="primary"
                  // style={textStyle}
                  variant="subtitle1"
                >
                  {"UG GPA Scale:"}
                </Typography> */}
                <Autocomplete
                  id="combo-box-demo"
                  options={this.renderUggpaScale()}
                  value={this.state.uggpaScale}
                  name={"uggpaScale"}
                  fullWidth
                  size="small"
                  onChange={(e, newValue) =>
                    this.setState({ uggpaScale: newValue })
                  }
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={this.state.uggpaScaleHelperTxt}
                      label="UG GPA Scale"
                      variant="outlined"
                    />
                  )}
                />
          </Grid>
          <Grid item md={1}>
          {/* <Typography
                  color="primary"
                  // style={textStyle}
                  variant="subtitle1"
                >
                  {"UG GPA:"}
                </Typography> */}
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  type="number"
                  error={this.state.uggpaScale !== null && this.state.uggpa > this.state.uggpaScale.value ? true : false}
                  helperText={this.state.uggpaScale !== null &&this.state.uggpa > this.state.uggpaScale.value ? "Enter the valid UG GPA" :""}
                  onChange={(e) => this.handleChange(e)}
                  name={"uggpa"}
                  label="UG GPA"
                  value={this.state.uggpa}
                  InputLabelProps={{shrink : true}}
                />
          </Grid>
          <Grid item md={2}>
          <TextField
                  variant="outlined"
                  size="small"
                  label="Area Of Interest 5"
                />
          </Grid>
          <Grid item md={2}>
          <TextField
                  variant="outlined"
                  size="small"
                  label="Area Of Interest 6"
                />
          </Grid>
        </Grid>
        <hr />
        <h5 style={{ padding: "1%" }}>Test Result</h5>
        <Grid container style={{ padding: "1%" }}>
          <Grid item md={6}>
            <Grid container spacing={2}>
            <Grid item md={4}>
            <TextField
            variant="outlined"
            name="overallResult"
            InputLabelProps={{shrink : true}}
            value={this.state.overallResult}
            disabled
            label="Overall Result"
            size="small" />
          </Grid>
          <Grid item md={4}>
            <TextField
            variant="outlined"
            disabled
            InputLabelProps={{shrink : true}}
            name="numericalAbility"
            value={this.state.numericalAbility}
            label="Numerical Ability"
            size="small" />
          </Grid>
          <Grid item md={4}>
            <TextField
            variant="outlined"
            disabled
            InputLabelProps={{shrink : true}}
            label="Logical Reasoning"
            name={"logicalReasoning"}
            value={this.state.logicalReasoning}
            size="small" />
          </Grid>
          <Grid item md={4}>
            <TextField
            variant="outlined"
            InputLabelProps={{shrink : true}}
            disabled
            name={"verbalReasoning"}
            value={this.state.verbalReasoning}
            label="Verbal Reasoning"
            size="small" />
          </Grid>
          <Grid item md={4}>
            <TextField
            variant="outlined"
            InputLabelProps={{shrink : true}}
            disabled
            name={"personalityCode"}
            value= {this.state.personalityCode}
            label="Personality Code"
            size="small" />
          </Grid>
          <Grid item md={4}>
            <TextField
            variant="outlined"
            InputLabelProps={{shrink : true}}
            disabled
            name={"mechTest"}
            value={this.state.mechTest}
            label="Mech Technical Test"
            size="small" />
          </Grid>
          <Grid item md={4}>
            <TextField
            variant="outlined"
            InputLabelProps={{shrink : true}}
            name={"csTest"}
            value={this.state.csTest}
            disabled
            label="CS Technical Test"
            size="small" />
          </Grid>
          <Grid item md={4}>
            <TextField
            variant="outlined"
            InputLabelProps={{shrink : true}}
            name={"eceTest"}
            value={this.state.eceTest}
            disabled
            label="ECE Technical Test"
            size="small" />
          </Grid>
            </Grid>
            <hr />
          </Grid>
        </Grid>
        <h5 style={{ padding: "1%" }}>Package Details</h5>
        <Grid container style={{ padding: "1%" }}>
          <Grid item md={6}>
            <Grid container spacing={2}>
              <Grid item md={4}>
                <TextField
                variant="outlined"
                size="small"
                disabled
                label="Package" />
              </Grid>
              <Grid item md={4}>
                <Autocomplete
                  id="combo-box-demo"
                  value={this.state.degree}
                  name={"aspiDegree"}
                  multiple
                  options={this.props.aspidegreeList}
                  onChange={(e, newValue) => this.setState({degree : newValue})}
                  getOptionLabel={(option) => option.name}
                  size="small"
                  renderInput={(params) =>
                  <TextField
                     {...params}
                     label="Choosen Degree"
                     variant="outlined"
                    //  value={this.state.degree}
                     helperText={this.state.degreeHelperTxt}
                     />}
               />
              </Grid>
              <Grid item md={4}>
                <Autocomplete
                  id="combo-box-demo"
                  value={this.state.branch}
                  name={"aspiBranch"}
                  multiple
                  options={this.props.aspibranchList}
                  onChange={(e, newValue) => this.setState({branch : newValue})}
                  getOptionLabel={(option) => option.name}
                  size="small"
                  renderInput={(params) =>
                  <TextField
                     {...params}
                     label="Choosen Field"
                     variant="outlined"
                     helperText={this.state.branchHelperTxt}
                     />}
               />
              </Grid>
              <Grid item md={4}>
                  <Autocomplete
                  id="combo-box-demo"
                  value={this.state.specialization}
                  name={"specialization"}
                  multiple
                  options={this.props.specializationList}
                  onChange={(e, newValue) => this.setState({specialization : newValue})}
                  getOptionLabel={(option) => option.name}
                  size="small"
                  renderInput={(params) =>
                  <TextField
                     {...params}
                     label="Choosen specilaization"
                     variant="outlined"
                     helperText={this.state.specializationHelperTxt}
                     />}
               />
              </Grid>
              <Grid item md={4}>
                <TextField
                variant="outlined"
                disabled
                size="small"
                label="Course Opted" />
              </Grid>
              <Grid item md={4}>
                {/* <TextField
                variant="outlined"
                size="small"
                label="Chosen Track" /> */}
                 <Autocomplete
                  id="combo-box-demo"
                  // value={this.track}
                  name={"choosetrack"}
                  multiple
                  options={this.track}
                  // onChange={(e, newValue) => this.setState({choosentrack : newValue})}
                  getOptionLabel={(option) => option.title}
                  size="small"
                  renderInput={(params) =>
                  <TextField
                     {...params}
                     label="Choosen Track"
                     variant="outlined"
                     />}
               />
              </Grid>
              <Grid item md={4}>
                  <TextField
                  variant="outlined"
                  size="small"
                  disabled
                  label="Drive Link" />
              </Grid>
              <Grid item md={4}>
                <Autocomplete
                   id="combo-box-demo"
                   options={this.period}
                   getOptionLabel={(option) => option.title}
                   size="small"
                   renderInput={(params) =>
                   <TextField
                    {...params}
                    label="Enrollment Period"
                    variant="outlined"
                   />}
                />
              </Grid>
              <Grid item md={4}>
                <Autocomplete
                 id="combo-box-demo"
                 options={this.country}
                 getOptionLabel={(option) => option.title}
                 size="small"
                 renderInput={(params) =>
                 <TextField
                  {...params}
                  label="Preferred Region"
                  variant="outlined"
                 />}
                />
              </Grid>
            </Grid>
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
      aspibranchList : state.AspirationReducer.allBranchList,
      aspidegreeList : state.AspirationReducer.allDegreeList,
      specializationList : state.AspirationReducer.allSpeciaizationList,
      aspirationDetails : state.StudentReducer.aspirationDetails,
      pgaScoreDetails : state.PgaReducer.pgaScoreDetails
    };
  };

export default connect(mapStateToProps,{
    getStudentsById,
    getAllColleges,
    getUniversity,
    getDegree,
    getAllBranch,
    getAllDegree,
    getAllSpecialization,
    getPgaScores,
    getBranches,})(GeneralDetails)
