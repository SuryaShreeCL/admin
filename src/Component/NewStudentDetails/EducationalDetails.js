import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
  createMuiTheme,
  ThemeProvider,
  Tooltip,
  Button,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Loader from "../Testimonials/components/controls/Loader";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  getAllColleges,
  getUniversity,
  getDegree,
  getBranches,
} from "../../Actions/College";
import {isEmptyObject} from "../Validation"
import {updateStudentEducation, updateVerificationStatus} from "../../Actions/AdminAction"
import { getStudentsById } from "../../Actions/Student";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
export class EducationalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StudentDetails: null,
      ugDegree: {},
      ugDegreeHelperTxt: "",
      university: {},
      universityHelperTxt: "",
      college: {},
      department: {},
      departmentHelperTxt : "",
      collegeHelperTxt: "",
      expectedYear: {},
      expectedYearHelperTxt: "",
      backlogs: null,
      backlogsHelperTxt: "",
      clearBacklogs: null,
      clearBacklogHelperTxt: "",
      uggpaScale: {},
      uggpaScaleHelperTxt: "",
      uggpa: null,
      uggpaHelperTxt: "",
      sem: {},
      semHelperTxt: "",
      status: this.status[1],
      misMatchDetails: null,
      letEdit: false,
      dialogOpen: false,
      snackOpen: false,
      snackMessage: null,
      snackVariant: null,
    };
  }
  componentDidMount() {
    this.props.getStudentsById(this.props.id);
    this.props.getAllColleges();
    this.props.getUniversity();
    this.props.getDegree();
    this.props.getBranches();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.StudentDetails !== prevProps.StudentDetails) {
      this.setState({
        StudentDetails: this.props.StudentDetails,
        ugDegree:
          this.props.StudentDetails.ugDegree !== null
            ? this.props.StudentDetails.ugDegree
            : {},
        college: this.props.StudentDetails.college !== null ? this.props.StudentDetails.college : {},
        department: this.props.StudentDetails.department !== null ? this.props.StudentDetails.department : {},
        university: this.props.StudentDetails.university !== null ? this.props.StudentDetails.university : {},
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
        backlogs:
          this.props.StudentDetails.noOfBacklogs === 100
            ? 0
            : this.props.StudentDetails.noOfBacklogs,
        clearBacklogs:
          this.props.StudentDetails.noOfClearedBacklogs === 100
            ? 0
            : this.props.StudentDetails.noOfClearedBacklogs,
        uggpaScale: {
          title: this.props.StudentDetails.uggpascale.toString(),
          value: this.props.StudentDetails.uggpascale,
        },
        uggpa: this.props.StudentDetails.uggpa,
      });
    }
    if(this.props.updateEducationalonalResponse !== prevProps.updateEducationalonalResponse){
      this.setState({
        snackVariant: "success",
        snackMessage: "Modified Successfully",
        snackOpen: true,
      });
    }
    if(this.props.updateVerificationResponse !== prevProps.updateVerificationResponse){
      this.setState({
        snackVariant: "success",
        snackMessage: "Status Updated Successfully",
        snackOpen: true,
      });
    }
  }
  theme = createMuiTheme({
    overrides: {
      MuiSvgIcon: {
        root: {
          color: "#000",
        },
      },
    },
  });

  // Options

  status = [
    { title: "Verified", value: "verified" },
    { title: "Not Verified", value: "Notverified" },
    { title: "Mismatch", value: "mismatched" },
  ];

  //Change Handler

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
   
  };
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

  handleSubmit = () => {
    let helperText = "Please Fill The Required Feild"
    this.state.ugDegree === null ||
    Object.keys(this.state.ugDegree).length === 0 ||
      this.state.ugDegree.constructor !== Object ? 
      this.setState({ugDegreeHelperTxt : helperText}) :
      this.setState({ugDegreeHelperTxt : ''}) 
      this.state.department === null ||
      Object.keys(this.state.department).length === 0 ||
      this.state.department.constructor !== Object  ? 
      this.setState({departmentHelperTxt : helperText}) : 
      this.setState({departmentHelperTxt : ''})
      this.state.college === null ||
      Object.keys(this.state.college).length === 0 ||
      this.state.college.constructor !== Object ? 
      this.setState({collegeHelperTxt : helperText}) : 
      this.setState({collegeHelperTxt : ''})
      this.state.university === null ||
      Object.keys(this.state.university).length === 0 ||
      this.state.university.constructor !== Object ?
      this.setState({universityHelperTxt : helperText}) : 
      this.setState({universityHelperTxt : ''})
      this.state.uggpa === null ||
      this.state.uggpa.toString().length === 0 ?
      this.setState({uggpaHelperTxt : helperText}) : 
      this.setState({uggpaHelperTxt : ''})
      this.state.uggpaScale === null ||
      Object.keys(this.state.uggpaScale).length === 0 ||
      this.state.uggpaScale.constructor !== Object ?
      
      this.setState({uggpaScaleHelperTxt : helperText}) : 
      this.setState({uggpaScaleHelperTxt : ''})
      this.state.backlogs === null ||
      this.state.backlogs.toString().length === 0 ?
      this.setState({backlogsHelperTxt : helperText}) : 
      this.setState({backlogsHelperTxt : ''})
      this.state.clearBacklogs === null ||
      this.state.clearBacklogs.toString().length === 0 ?
      this.setState({clearBacklogHelperTxt : helperText}) : 
      this.setState({clearBacklogHelperTxt : ''})
      this.state.expectedYear === null ||
      Object.keys(this.state.expectedYear).length === 0 ||
      this.state.expectedYear.constructor !== Object ?
      this.setState({expectedYearHelperTxt : helperText}) : 
      this.setState({expectedYearHelperTxt : ''})
      this.state.sem === null ||
      Object.keys(this.state.sem).length === 0 ||
      this.state.sem.constructor !== Object ?
      this.setState({semHelperTxt : helperText}) : 
      this.setState({semHelperTxt : ''})
   
      if (
      this.state.ugDegree !== null &&
      Object.keys(this.state.ugDegree).length !== 0 &&
      this.state.ugDegree.constructor === Object &&
      this.state.department !== null &&
      Object.keys(this.state.department).length !== 0 &&
      this.state.department.constructor === Object &&
      this.state.college !== null &&
      Object.keys(this.state.college).length !== 0 &&
      this.state.college.constructor === Object &&
      this.state.university !== null &&
      Object.keys(this.state.university).length !== 0 &&
      this.state.university.constructor === Object &&
      this.state.uggpa !== null &&
      this.state.uggpa.toString().length !== 0 &&
      this.state.uggpaScale !== null &&
      Object.keys(this.state.uggpaScale).length !== 0 &&  
      this.state.uggpaScale.constructor === Object &&
      this.state.uggpa < this.state.uggpaScale.value && 
      this.state.backlogs !== null &&
      this.state.backlogs.toString().length !== 0 &&
      this.state.clearBacklogs !== null &&
      this.state.clearBacklogs.toString().length !== 0 &&
      this.state.expectedYear !== null &&    
      Object.keys(this.state.expectedYear).length !== 0 &&  
      this.state.expectedYear.constructor === Object &&
      this.state.sem !== null &&    
      Object.keys(this.state.sem).length !== 0 &&
      this.state.sem.constructor === Object 
    ) {
      let obj = {
        id: this.props.id,
        ugDegree: {
          id: this.state.ugDegree.id,
        },
        department: {
          id: this.state.department.id,
        },
        college: {
          id: this.state.college.id,
        },
        university: {
          id: this.state.university.id,
        },
        uggpa: parseFloat(this.state.uggpa),
        uggpascale: parseFloat(
          this.state.uggpaScale.title === "%"
            ? 100
            : this.state.uggpaScale.title
        ),
        noOfBacklogs: this.state.backlogs === 0 || this.state.backlogs === "0" ? 100 : parseInt(this.state.backlogs),
        noOfClearedBacklogs:
          this.state.clearBacklogs === 0 || this.state.clearBacklogs === "0" ? 100 : parseInt(this.state.clearBacklogs),
        expectedYrOfGrad: this.state.expectedYear.value,
        currentSem: this.state.sem.value,
      };
      this.props.updateStudentEducation(this.props.id,obj)
    }
  };
  updateStatus = () => {
    if(this.state.status !== null){
      let obj = {
        student: {
          id: this.props.id,
        },
        section: {
          name: "Educationaldetails",
        },
        remark: this.state.misMatchDetails,
        status: this.state.status.value,
        updateDate: null,
      };
    console.log(obj)
    this.props.updateVerificationStatus(obj)
    this.setState({
      misMatchDetails : null,
    })
    }
    
  };
  render() {
    console.log(this.state.uggpaScale);
    console.log(this.props.updateEducationalonalResponse);
    const { divStyle, textStyle, divContainer } = style;
    return (
      <div>
        {this.state.StudentDetails !== null ? (
          <ThemeProvider theme={this.theme}>
            <Grid container spacing={2} style={divContainer}>
            <Grid item md={2} style={divStyle} alignItems="center">
              <Autocomplete
                  id="combo-box-demo"
                  options={this.status}
                  value={this.state.status}
                  fullWidth
                  onChange={(e, newValue) =>
                    this.setState({ status: newValue })
                  }
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      label="Verification Status"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>

              {this.state.status !== null &&
              this.state.status.value === "mismatched" ? 
              <>
              <Grid item md={7} style={divStyle} alignItems="center">
              <TextField
                        fullWidth
                        size="small"
                        onChange={(e) => this.handleChange(e)}
                        name={"misMatchDetails"}
                        value={this.state.misMatchDetails}
                        variant="outlined"
                        label={"Remark"}
                      />
                </Grid>
              <Grid item md={2} style={divStyle} alignItems="center"> 
              <Button variant="outlined" onClick={this.updateStatus} color="primary" size="small">
                    Update Status
                  </Button>
              </Grid>
              </>
              :
              <Grid item md={9} style={divStyle} alignItems="center">
              <Button variant="outlined" onClick={this.updateStatus} color="primary" size="small">
                    Update Status
                  </Button>
              </Grid>
                
                }

              <Grid item md={1} style={divStyle} alignItems="center">
              <Tooltip arrow title="Edit" aria-label="Edit">
                  <IconButton onClick={() => this.setState({ letEdit: true })}>
                    <EditRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"UG Degree:"}
                </Typography>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.props.degreeList}
                  value={this.state.ugDegree}
                  style={{ width: "60%" }}
                  disabled={this.state.letEdit === false ? true : false}
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
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"College:"}
                </Typography>
                <Autocomplete
                  id="combo-box-demo"
                  value={this.state.college}
                  name={"college"}
                  size="small"
                  onChange={(e, newValue) => this.setState({college : newValue})}
                  style={{ width: "60%" }}
                  disabled={this.state.letEdit === false ? true : false}
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
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"Department:"}
                </Typography>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.props.branchList}
                  value={this.state.department}
                  style={{ width: "60%" }}
                  disabled={this.state.letEdit === false ? true : false}
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
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"University:"}
                </Typography>
                <Autocomplete
                  id="combo-box-demo"
                  value={this.state.university}
                  name={"university"}
                  size="small"
                  onChange={(e, newValue) => this.setState({university : newValue})}
                  style={{ width: "60%" }}
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
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"Expected Year Of Grad:"}
                </Typography>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.renderYear()}
                  value={this.state.expectedYear}
                  style={{ width: "60%" }}
                  disabled={this.state.letEdit === false ? true : false}
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
                      label="Expected Year Of Graduation"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"Current Sem:"}
                </Typography>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.renderSem()}
                  value={this.state.sem}
                  style={{ width: "60%" }}
                  disabled={this.state.letEdit === false ? true : false}
                  name={"sem"}
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
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"No Of Backlogs:"}
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  helperText={this.state.backlogsHelperTxt}
                  type="number"
                  onChange={(e) => this.handleChange(e)}
                  name={"backlogs"}
                  disabled={this.state.letEdit === false ? true : false}
                  label="No Of Backlogs"
                  value={this.state.backlogs}
                />
              </Grid>
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"Cleared Backlogs:"}
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  type="number"
                  helperText={this.state.clearBacklogHelperTxt}
                  onChange={(e) => this.handleChange(e)}
                  name={"clearBacklogs"}
                  disabled={this.state.letEdit === false ? true : false}
                  label="Cleared Backlogs"
                  value={this.state.clearBacklogs}
                />
              </Grid>
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"UG GPA Scale:"}
                </Typography>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.renderUggpaScale()}
                  value={this.state.uggpaScale}
                  style={{ width: "60%" }}
                  disabled={this.state.letEdit === false ? true : false}
                  name={"uggpaScale"}
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
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"UG GPA:"}
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  type="number"
                  error={this.state.uggpaScale !== null && this.state.uggpa > this.state.uggpaScale.value ? true : false}
                  helperText={this.state.uggpaScale !== null &&this.state.uggpa > this.state.uggpaScale.value ? "Enter the valid UG GPA" :""}
                  onChange={(e) => this.handleChange(e)}
                  name={"uggpa"}
                  disabled={this.state.letEdit === false ? true : false}
                  label="UG GPA"
                  value={this.state.uggpa}
                />
              </Grid>
              <Grid item md={12} style={divStyle} justify="flex-end">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={this.handleSubmit}
                  disabled={this.state.letEdit === false ? true : false}
                  color="primary"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </ThemeProvider>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "65vh",
            }}
          >
            <Loader />
          </div>
        )}
          <Snackbar
          open={this.state.snackOpen}
          autoHideDuration={3000}
          onClose={() => this.setState({ snackOpen: false })}
        >
          <Alert
            variant="filled"
            onClose={() => this.setState({ snackOpen: false })}
            severity={this.state.snackVariant}
          >
            {this.state.snackMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const style = {
  divStyle: {
    display: "flex",
  },
  divContainer: {
    padding: "1% 2%",
  },
  textStyle: {
    paddingRight: "1%",
    paddingLeft: "3%",
  },
};
const mapStateToProps = (state) => {
  return {
    StudentDetails: state.StudentReducer.StudentList,
    allCollegeList: state.CollegeReducer.allCollegeList,
    universityList: state.CollegeReducer.University,
    degreeList: state.CollegeReducer.Degree,
    branchList: state.CollegeReducer.BranchList,
    updateEducationalonalResponse : state.AdminReducer.updateEducationalonalResponse,
    updateVerificationResponse :state.AdminReducer.updateVerificationResponse
  };
};

export default connect(mapStateToProps, {
  getStudentsById,
  getAllColleges,
  getUniversity,
  getDegree,
  getBranches,
  updateStudentEducation,
  updateVerificationStatus
})(EducationalDetails);
