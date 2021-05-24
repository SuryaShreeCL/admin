import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  CircularProgress,
  Typography,
  TextField,
  IconButton,
  createMuiTheme,
  ThemeProvider,
  Tooltip,
  Button,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {getAllBranch,getAllDegree,getAllSpecialization,getAllTerms,getAllUniversity} from "../../Actions/Aspiration"
import { getStudentsById, getAspirationByStudentId } from "../../Actions/Student";
import {updateAspirationData, updateVerificationStatus} from "../../Actions/AdminAction"
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import Loader from "../Testimonials/components/controls/Loader";
import { DatePicker } from "@material-ui/pickers";
export class AspirationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StudentDetails: null,
      noOfSchool : null,
      noOfSchoolHelperTxt : '',
      year : null,
      yearHelperTxt : '',
        term : [],
        termHelperTxt : '',
        branch : [],
        branchHelperTxt : '',
        university : [],
        universityHelperTxt : '',
        specialization : [],
        specializationHelperTxt : '',
        degree : [],
        degreeHelperTxt : '',
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
    this.props.getAllBranch()
    this.props.getAllDegree()
    this.props.getAllSpecialization()
    this.props.getAllTerms()
    this.props.getAllUniversity()

  }
  flag = false
  componentDidUpdate(prevProps, prevState) {

    if(this.state.status !== prevState.status){
      if(this.state.status !== null && this.state.status.value !== "mismatched"){
        this.setState({misMatchDetails : null})
      }
  }

    var findObj = this.props.studentStatusResponse.find(
      (res) => res.section.name === "Aspiration Details"
    );
    console.log(findObj);

    if(findObj !== undefined){
      if(findObj.section.name === "Aspiration Details"){
        if(this.flag === false && findObj.status === "verified"){
          this.setState({status : this.status[0]}) 
          this.flag = true
        }else if(this.flag === false && findObj.status === "Notverified"){
          this.setState({status : this.status[1]}) 
          this.flag = true
        }else if(this.flag === false && findObj.status === "mismatched"){
          this.setState({
            status : this.status[2],
            misMatchDetails : findObj.remark
          }) 
          this.flag = true

        }
      }
    }

    if (this.props.StudentDetails !== prevProps.StudentDetails) {
      this.setState({
        StudentDetails: this.props.StudentDetails,
        term : this.props.aspirationDetails.terms,
        branch : this.props.aspirationDetails.branches,
        degree : this.props.aspirationDetails.degrees,
        specialization : this.props.aspirationDetails.specializations,
        university : this.props.aspirationDetails.universities,
        noOfSchool : this.props.aspirationDetails.noOfSchool,
        year : {title : this.props.aspirationDetails.year.toString(), value : this.props.aspirationDetails.year} 
      });
    }
    if (
      this.props.updateAspirationResponse !== prevProps.updateAspirationResponse
    ) {
      this.setState({
        snackVariant: "success",
        snackMessage: "Modified Successfully",
        snackOpen: true,
      });
      this.props.getAspirationByStudentId(this.props.id)
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

  handleSubmit = () => {
    let helpMsg = "Please Fill The Required Feild";
    this.state.term.length === 0 ? this.setState({termHelperTxt : helpMsg}) : this.setState({termHelperTxt : ''})
    this.state.branch.length === 0 ? this.setState({branchHelperTxt : helpMsg}) : this.setState({branchHelperTxt : ''})
    this.state.degree.length === 0 ? this.setState({degreeHelperTxt : helpMsg}) : this.setState({degreeHelperTxt : ''})
    this.state.specialization.length === 0 ? this.setState({specializationHelperTxt : helpMsg}) : this.setState({specializationHelperTxt : ''})
    this.state.university.length === 0 ? this.setState({universityHelperTxt : helpMsg}) : this.setState({universityHelperTxt : ''})
    this.state.noOfSchool.length === 0 ? this.setState({noOfSchoolHelperTxt : helpMsg}) : this.setState({termHelperTxt : ''})
    this.state.year === null ? this.setState({yearHelperTxt : helpMsg}) : this.setState({yearHelperTxt : ''})

    if(
        this.state.term.length !== 0 &&
        this.state.branch.length !== 0 &&
        this.state.degree.length !== 0 &&
        this.state.specialization.length !== 0 &&
        this.state.university.length !== 0 &&
        this.state.noOfSchool.length !== 0 &&
        this.state.year !== null
    ){
        let obj = {
            terms: this.state.term,
            degrees: this.state.degree,
            branches:this.state.branch,
            universities: this.state.university,
            specializations: this.state.specialization,
            year: this.state.year.value,
            noOfSchool: parseInt(this.state.noOfSchool),
            studentId: this.props.id,
          };
          this.props.updateAspirationData(this.props.id,obj)
        
    }
   
  };
  handleStatusUpdate = () =>{
    if(this.state.status !== null){
      let obj = {
        student: {
          id: this.props.id,
        },
        section: {
          name: "Aspiration Details",
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
   
  }
  renderYear = () =>{
    let startingYear = 2021;
    let endingYear = 2030
    let year = [];
    for (let i = startingYear; i <= endingYear; i++) {
      year.push({ title: i.toString(), value: i });
    }
    return year;
}
  render() {
    console.log(this.props.aspirationDetails)
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
              <Button variant="outlined" onClick={this.handleStatusUpdate} color="primary" size="small">
                    Update Status
                  </Button>
              </Grid>
              </>
              :
              <Grid item md={9} style={divStyle} alignItems="center">
              <Button variant="outlined" onClick={this.handleStatusUpdate} color="primary" size="small">
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
                  {"Term:"}
                </Typography>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.props.termList}
                  value={this.state.term}
                  style={{ width: "60%" }}
                  multiple
                  filterSelectedOptions
                  disabled={this.state.letEdit === false ? true : false}
                  name={"aspirationTerm"}
                  size="small"
                  onChange={(e, newValue) =>
                    this.setState({ term: newValue })
                  }
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={this.state.termHelperTxt}
                      label="Aspiration Term"
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
                  {"Branch:"}
                </Typography>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.props.branchList}
                  value={this.state.branch}
                  style={{ width: "60%" }}
                  multiple
                  filterSelectedOptions
                  disabled={this.state.letEdit === false ? true : false}
                  name={"aspirationBranch"}
                  size="small"
                  onChange={(e, newValue) =>
                    this.setState({ branch: newValue })
                  }
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={this.state.branchHelperTxt}
                      label="Aspiration Branch"
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
                  {"Degree:"}
                </Typography>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.props.degreeList}
                  value={this.state.degree}
                  style={{ width: "60%" }}
                  multiple
                  filterSelectedOptions
                  disabled={this.state.letEdit === false ? true : false}
                  name={"aspirationDegree"}
                  size="small"
                  onChange={(e, newValue) =>
                    this.setState({ degree: newValue })
                  }
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={this.state.degreeHelperTxt}
                      label="Aspiration Degree"
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
                  {"Specialization:"}
                </Typography>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.props.specializationList}
                  value={this.state.specialization}
                  style={{ width: "60%" }}
                  multiple
                  filterSelectedOptions
                  disabled={this.state.letEdit === false ? true : false}
                  name={"aspirationSpecialization"}
                  size="small"
                  onChange={(e, newValue) =>
                    this.setState({ specialization: newValue })
                  }
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={this.state.specializationHelperTxt}
                      label="Aspiration Specialization"
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
                  options={this.props.universityList}
                  value={this.state.university}
                  style={{ width: "60%" }}
                  multiple
                  filterSelectedOptions
                  disabled={this.state.letEdit === false ? true : false}
                  name={"aspirationUniversity"}
                  size="small"
                  onChange={(e, newValue) =>
                    this.setState({ university: newValue })
                  }
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={this.state.universityHelperTxt}
                      label="Aspiration University"
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
                  {"No Of Schools:"}
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  type="number"
                  helperText={this.state.noOfSchoolHelperTxt}
                  onChange={(e) => this.handleChange(e)}
                  name={"noOfSchool"}
                  disabled={this.state.letEdit === false ? true : false}
                  label="Number Of School"
                  value={this.state.noOfSchool}
                />
              </Grid>
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"Year:"}
                </Typography>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.renderYear()}
                  value={this.state.year}
                  style={{ width: "60%" }}
                  disabled={this.state.letEdit === false ? true : false}
                  name={"year"}
                  size="small"
                  onChange={(e, newValue) =>
                    this.setState({ year: newValue })
                  }
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={this.state.yearHelperTxt}
                      label="Year"
                      variant="outlined"
                    />
                  )}
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
  divContainer : {
    padding : "1% 2%"
  },
  textStyle: {
    paddingRight: "1%",
    paddingLeft: "3%",
  },
};
const mapStateToProps = (state) => {
    console.log("mapStateToProps.............",state.StudentReducer.aspirationDetails)
  return {
    aspirationDetails : state.StudentReducer.aspirationDetails,
    StudentDetails: state.StudentReducer.StudentList,
    branchList : state.AspirationReducer.allBranchList,
    termList : state.AspirationReducer.allTermList,
    degreeList : state.AspirationReducer.allDegreeList,
    universityList : state.AspirationReducer.allUniversityList,
    specializationList : state.AspirationReducer.allSpeciaizationList,
    updateAspirationResponse : state.AdminReducer.updateAspirationResponse,
    updateVerificationResponse : state.AdminReducer.updateVerificationResponse,
    studentStatusResponse: state.AdminReducer.studentStatusResponse,

  };
};

export default connect(mapStateToProps, {
getStudentsById,
getAllBranch,
getAllDegree,
getAllSpecialization,
getAllUniversity,
getAllTerms,
updateAspirationData,
updateVerificationStatus,
getAspirationByStudentId
})(AspirationDetails);
