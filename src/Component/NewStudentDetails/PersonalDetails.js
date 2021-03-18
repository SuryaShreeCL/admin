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
import { getStudentsById } from "../../Actions/Student";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import Loader from "../Testimonials/components/controls/Loader";
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
    };
  }
  componentDidMount() {
    this.props.getStudentsById(this.props.id);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.StudentDetails !== prevProps.StudentDetails) {
      this.setState({
        StudentDetails: this.props.StudentDetails,
        studentId: this.props.StudentDetails.studentID,
        firstName: this.props.StudentDetails.firstName,
        lastName: this.props.StudentDetails.lastName,
        fullName: this.props.StudentDetails.fullName,
        eMail: this.props.StudentDetails.emailId,
        phoneNumber: this.props.StudentDetails.phoneNumber,
      });
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

    if (
      this.state.studentId !== null &&
      this.state.studentId.length !== 0 &&
      this.state.firstName !== null &&
      this.state.firstName.length !== 0 &&
      this.state.lastName.length !== 0 &&
      this.state.lastName !== null &&
      this.state.fullName.length !== 0 &&
      this.state.fullName !== null
    ) {
      let obj = {
        studentID: this.state.studentId,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        fullName: this.state.fullName,
      };
      this.props.updateStudentPersonal(this.props.id, obj);
    }
  };
  handleStatusUpdate = () =>{
    let obj = {
      student: {
        id: this.props.id,
      },
      section: {
        name: "personaldetails",
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
  render() {
    const { divStyle, textStyle, divContainer } = style;
    return (
      <div>
        {this.state.StudentDetails !== null ? (
          <ThemeProvider theme={this.theme}>
            <Grid container spacing={2} style={divContainer}>
              <Grid item md={3} style={divStyle} alignItems="center">
                <Tooltip arrow title="Edit" aria-label="Edit">
                  <IconButton onClick={() => this.setState({ letEdit: true })}>
                    <EditRoundedIcon />
                  </IconButton>
                </Tooltip>
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
              this.state.status.value === "mismatched" ? (
                <Grid
                  item
                  md={7}
                  style={divStyle}
                  justify="space-between"
                  alignItems="center"
                >
                  {this.state.status !== null &&
                  this.state.status.value === "mismatched" ? (
                    <>
                      <TextField
                        fullWidth
                        size="small"
                        onChange={(e) => this.handleChange(e)}
                        name={"misMatchDetails"}
                        value={this.state.misMatchDetails}
                        variant="outlined"
                        label={"Remark"}
                      />
                    </>
                  ) : null}
                </Grid>
              ) : (
                <Grid item md={7} style={divStyle} alignItems="center">
                  <Button variant="outlined" onClick={this.handleStatusUpdate} color="primary" size="small">
                    Update Status
                  </Button>
                </Grid>
              )}
              <Grid item md={2} style={divStyle} alignItems="center">
                {this.state.status !== null &&
                this.state.status.value === "mismatched" ? (
                  <Button variant="outlined" onClick={this.handleStatusUpdate} color="primary" size="small">
                    Update Status
                  </Button>
                ) : null}
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
                  value={this.state.firstName}
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
                  value={this.state.lastName}
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
  return {
    StudentDetails: state.StudentReducer.StudentList,
    updatePersonalResponse: state.AdminReducer.updatePersonalResponse,
    updateVerificationResponse :state.AdminReducer.updateVerificationResponse
  };
};

export default connect(mapStateToProps, {
  getStudentsById,
  updateStudentPersonal,
  updateVerificationStatus
})(PersonalDetails);
