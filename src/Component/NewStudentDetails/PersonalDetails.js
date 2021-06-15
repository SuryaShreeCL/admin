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
import { updateStudentPersonal, updateVerificationStatus } from "../../Actions/AdminAction";
import { getStudentsById, verifyNewPersonalData } from "../../Actions/Student";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import Loader from "../Testimonials/components/controls/Loader";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
export class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StudentDetails: null,
      studentId: null,
      studentIdHelperTxt: "",
      firstName: null,
      fNameHelperTxt: "",
      lastName: null,
      tempEmail : null,
      tempMobile : null,
      lNameHelperTxt: "",
      fullName: null,
      fullNameHelperTxt: "",
      status: this.status[1],
      misMatchDetails: null,
      letEdit: false,
      dialogOpen: false,
      snackOpen: false,
      snackMessage: null,
      snackVariant: null,
      isTempData : false,
      dateofbirth : null,
      dateofbirthHelperTxt : "",
      eMail:"",
      phoneNumber:""
    };
  }
  componentDidMount() {

    this.props.getStudentsById(this.props.id);
    
  }

  flag = false

  componentDidUpdate(prevProps, prevState) {

   
    if(this.state.status !== prevState.status){
      if(this.state.status !== null && this.state.status.value !== "mismatched"){
        this.setState({misMatchDetails : null})
      }
  }

    var findObj = this.props.studentStatusResponse.find(
      (res) => res.section.name === "Personal Details"
    );
    console.log(findObj);

    if(findObj !== undefined){
      if(findObj.section.name === "Personal Details"){
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
        studentId: this.props.StudentDetails.studentID,
        firstName: this.props.StudentDetails.firstName ,
        lastName:  this.props.StudentDetails.lastName,
        fullName: this.props.StudentDetails.fullName,
        eMail: this.props.StudentDetails.emailId,
        phoneNumber: this.props.StudentDetails.phoneNumber,
        dateofbirth : this.props.StudentDetails.dob
      });
    }
    if(this.props.tempData !== prevProps.tempData){
      console.log("temp............", this.props.tempData.length)
      if(this.props.tempData.length !== 0){
        console.log("...........",this.props.tempData)
         this.setState({
           isTempData : true,
          firstName : this.props.tempData.firstName,
          lastName : this.props.tempData.lastName,
          tempEmail : this.props.tempData.emailId,
          tempMobile : this.props.tempData.phoneNumber,
        })
      }else{
        this.setState({
          firstName: this.props.StudentDetails.firstName ,
        lastName:  this.props.StudentDetails.lastName,
        })
      }
    }
    if (
      this.props.updatePersonalResponse !== prevProps.updatePersonalResponse
    ) {
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
    if(this.props.updateNewPersonalResponse !== prevProps.updateNewPersonalResponse){
      this.setState({
        snackVariant: "success",
        snackMessage: "Data Verified Successfully",
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
    this.state.studentId === null ||
    this.state.studentId.length === 0 
    
      ? this.setState({ studentIdHelperTxt: helpMsg })
      : this.setState({ studentIdHelperTxt: "" });
      this.state.firstName === null ||
      this.state.firstName.length === 0 
    
      ? this.setState({ fNameHelperTxt: helpMsg })
      : this.setState({ fNameHelperTxt: "" });
      this.state.lastName === null ||
      this.state.lastName.length === 0 
    
      ? this.setState({ lNameHelperTxt: helpMsg })
      : this.setState({ lNameHelperTxt: "" });
      this.state.fullName === null ||
      this.state.fullName.length === 0 
    
      ? this.setState({ fullNameHelperTxt: helpMsg })
      : this.setState({ fullNameHelperTxt: "" });
      this.state.dateofbirth === null ||
      this.state.dateofbirth.length === 0 
    
      ? this.setState({ dateofbirthHelperTxt: helpMsg })
      : this.setState({ dateofbirthHelperTxt: "" });

    if (
      this.state.studentId !== null &&
      this.state.studentId.length !== 0 &&
      this.state.firstName !== null &&
      this.state.firstName.length !== 0 &&
      this.state.lastName.length !== 0 &&
      this.state.lastName !== null &&
      this.state.fullName.length !== 0 &&
      this.state.fullName !== null &&
      this.state.dateofbirth.length !== 0 &&
      this.state.dateofbirth !== null 
    ) {
      let obj = {
        studentID: this.state.studentId,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        fullName: this.state.fullName,
        Dob: this.state.dateofbirth
      };
      this.props.updateStudentPersonal(this.props.id, obj);
    }
  };
  handleStatusUpdate = () =>{
    if(this.state.status !== null){
      let obj = {
        student: {
          id: this.props.id,
        },
        section: {
          name: "Personal Details",
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
    if(this.props.tempData.studentTemp !== null){
      let updateObj = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        emailId: this.state.tempEmail,
        phoneNumber: this.state.tempMobile,
        status: this.state.status.value,
        altPhoneNumber: this.props.tempData.studentTemp.altPhoneNumber,
        altEmailId: this.props.tempData.studentTemp.emailId,
      };

      this.props.verifyNewPersonalData(this.props.id,updateObj)
    }
   
   
  }

  renderOptional = () =>{
    const { divStyle, textStyle, divContainer } = style;
    if(this.props.tempData.studentTemp !== null){
      return (
        <>
  <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"E-Mail ID:"}
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  disabled={this.state.letEdit === false ? true : false}
                  label="E-Mail"
                  value={this.state.tempEmail || ""}
                />
              </Grid>
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"Phone Number:"}
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  disabled={this.state.letEdit === false ? true : false}
                  label="Phone Number"
                  value={this.state.tempMobile || ""}
                />
              </Grid>
        </>
      )
    }
  }

  render() {  
    // console.log(this.props.tempData)
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
                  <IconButton 
                  // disabled={this.state.isTempData}
                  onClick={() => this.setState({ letEdit: true }) }>
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
                  {"Sudent ID(CLS ID):"}
                </Typography>
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
                  disabled={this.state.letEdit === false ? true : false}
                  value={this.state.studentId}
                />
              </Grid>
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"First Name:"}
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  error={this.state.fNameHelperTxt.length !== 0 ? true : false}
                  helperText={this.state.fNameHelperTxt}
                  onChange={(e) => this.handleChange(e)}
                  name={"firstName"}
                  disabled={this.state.letEdit === false ? true : false}
                  label="First Name"
                  value={this.state.firstName || ""}
                />
              </Grid>
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"Last Name:"}
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  error={this.state.lNameHelperTxt.length !== 0 ? true : false}
                  helperText={this.state.lNameHelperTxt}
                  onChange={(e) => this.handleChange(e)}
                  name={"lastName"}
                  label="Last Name"
                  disabled={this.state.letEdit === false ? true : false}
                  value={this.state.lastName || ""}
                />
              </Grid>
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"Full Name:"}
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  error={
                    this.state.fullNameHelperTxt.length !== 0 ? true : false
                  }
                  helperText={this.state.fullNameHelperTxt}
                  onChange={(e) => this.handleChange(e)}
                  name={"fullName"}
                  disabled={this.state.letEdit === false ? true : false}
                  label="Full Name"
                  value={this.state.fullName}
                />
              </Grid>
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"Date of Birth:"}
                </Typography>
                {/* <TextField
                  variant="outlined"
                  size="small"
                  error={
                    this.state.dateofbirthHelperTxt.length !== 0 ? true : false
                  }
                  helperText={this.state.dateofbirthHelperTxt}
                  onChange={(e) => this.handleChange(e)}
                  name={"dateofbirth"}
                  disabled={this.state.letEdit === false ? true : false}
                  label="Date of Birth"
                  value={this.state.dateofbirth}
                /> */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date of Birth"
                    format="MM/dd/yyyy"
                    value={this.state.dateofbirth}
                    onChange={(e,newValue)=>this.setState({ dateofbirth : newValue})}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  </MuiPickersUtilsProvider>
              </Grid>
              {/* {this.renderOptional()} */}
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
    padding: "1%"
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
  return {
    StudentDetails: state.StudentReducer.StudentList,
    updatePersonalResponse: state.AdminReducer.updatePersonalResponse,
    updateVerificationResponse :state.AdminReducer.updateVerificationResponse,
    studentStatusResponse : state.AdminReducer.studentStatusResponse,
    updateNewPersonalResponse : state.StudentReducer.updateNewPersonalResponse

  };
};

export default connect(mapStateToProps, {
  getStudentsById,
  updateStudentPersonal,
  updateVerificationStatus,
  verifyNewPersonalData
})(PersonalDetails);
