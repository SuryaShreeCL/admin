import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  Typography,
  CircularProgress,
  TextField,
  IconButton,
  createTheme,
  ThemeProvider,
  Tooltip,
  Button,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Loader from "../Utils/controls/Loader";
import {
  updateStudentContact,
  updateVerificationStatus,
} from "../../Actions/AdminAction";
import { getStudentsById, viewAllCities } from "../../Actions/Student";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
export class ContactDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StudentDetails: null,
      altEmailId: null,
      altMailHelperTxt: "",
      eMail: null,
      eMailHelperTxt: "",
      phoneNumber: null,
      phoneHelperTxt: "",
      altPhoneNumber: null,
      altPhoneHelperTxt: "",
      linkedInProfile: null,
      linkedInHelperTxt: "",
      facebookProfile: null,
      facebookHelperTxt: "",
      address: null,
      addressHelperTxt: "",
      twitterProfile: "",
      twitterHelperTxt: "",
      city: null,
      cityHelperTxt: "",
      status: this.status[1],
      misMatchDetails: null,
      letEdit: false,
      snackOpen: false,
      snackMessage: null,
      snackVariant: null,
      dialogOpen: false,
    };
  }
  componentDidMount() {
    this.props.getStudentsById(this.props.id);
    this.props.viewAllCities();
  }
  flag = false;
  componentDidUpdate(prevProps, prevState) {
    if (this.state.status !== prevState.status) {
      if (
        this.state.status !== null &&
        this.state.status.value !== "mismatched"
      ) {
        this.setState({ misMatchDetails: null });
      }
    }

    var findObj = this.props.studentStatusResponse.find(
      (res) => res.section && res.section.name === "Contact Details"
    );
    console.log(findObj);

    if (findObj !== undefined) {
      if (findObj.section.name === "Contact Details") {
        if (this.flag === false && findObj.status === "verified") {
          this.setState({ status: this.status[0] });
          this.flag = true;
        } else if (this.flag === false && findObj.status === "Notverified") {
          this.setState({ status: this.status[1] });
          this.flag = true;
        } else if (this.flag === false && findObj.status === "mismatched") {
          this.setState({
            status: this.status[2],
            misMatchDetails: findObj.remark,
          });
          this.flag = true;
        }
      }
    }

    if (this.props.StudentDetails !== prevProps.StudentDetails) {
      this.setState({
        StudentDetails: this.props.StudentDetails,
        altEmailId: this.props.StudentDetails.altEmailId,
        eMail: this.props.StudentDetails.emailId,
        altPhoneNumber: this.props.StudentDetails.altPhoneNumber,
        phoneNumber: this.props.StudentDetails.phoneNumber,
        linkedInProfile: this.props.StudentDetails.linkedInProfile,
        city: this.props.StudentDetails.city,
        facebookProfile: this.props.StudentDetails.faceBookUrl,
        twitterProfile: this.props.StudentDetails.twitterUrl,
        address: this.props.StudentDetails.address,
      });
    }
    if (this.props.contactDataResponse !== prevProps.contactDataResponse) {
      this.setState({
        snackVariant: "success",
        snackMessage: "Modified Successfully",
        snackOpen: true,
      });
    }
    if (
      this.props.updateVerificationResponse !==
      prevProps.updateVerificationResponse
    ) {
      this.setState({
        snackVariant: "success",
        snackMessage: "Status Updated Successfully",
        snackOpen: true,
      });
    }
  }
  theme = createTheme({
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

  // Submit Handler

  handleSubmit = () => {
    console.log(this.state);
    let helperTxt = "Please Fill The Required Feild";
    this.state.eMail === null || this.state.eMail.length === 0
      ? this.setState({ eMailHelperTxt: helperTxt })
      : this.setState({ eMailHelperTxt: "" });
    this.state.altEmailId === null || this.state.altEmailId.length === 0
      ? this.setState({ altMailHelperTxt: helperTxt })
      : this.setState({ altMailHelperTxt: "" });
    this.state.phoneNumber === null || this.state.phoneNumber.length === 0
      ? this.setState({ phoneHelperTxt: helperTxt })
      : this.setState({ phoneHelperTxt: "" });
    this.state.altPhoneNumber === null || this.state.altPhoneNumber.length === 0
      ? this.setState({ altPhoneHelperTxt: helperTxt })
      : this.setState({ altPhoneHelperTxt: "" });
    this.state.linkedInProfile === "" || this.state.linkedInProfile.length === 0
      ? this.setState({ linkedInHelperTxt: helperTxt })
      : this.setState({ linkedInHelperTxt: "" });
    this.state.facebookProfile.length === 0
      ? this.setState({ facebookHelperTxt: helperTxt })
      : this.setState({ facebookHelperTxt: "" });
    this.state.twitterProfile.length === 0
      ? this.setState({ twitterHelperTxt: helperTxt })
      : this.setState({ twitterHelperTxt: "" });
    this.state.address.length === 0
      ? this.setState({ addressHelperTxt: helperTxt })
      : this.setState({ addressHelperTxt: "" });
    this.state.city === null
      ? this.setState({ cityHelperTxt: helperTxt })
      : this.setState({ cityHelperTxt: "" });
    if (
      this.state.eMail !== null &&
      this.state.eMail.length !== 0 &&
      this.state.altEmailId !== null &&
      this.state.altEmailId.length !== 0 &&
      this.state.phoneNumber !== null &&
      this.state.phoneNumber.length !== 0 &&
      this.state.altPhoneNumber !== null &&
      this.state.altPhoneNumber.length !== 0 &&
      this.state.linkedInProfile !== null &&
      this.state.linkedInProfile.length !== 0 &&
      this.state.facebookProfile !== null &&
      this.state.facebookProfile.length !== 0 &&
      this.state.twitterProfile !== null &&
      this.state.twitterProfile.length !== 0 &&
      this.state.address !== null &&
      this.state.address.length !== 0 &&
      this.state.city !== null
    ) {
      let obj = {
        emailId: this.state.eMail,
        altEmailId: this.state.altEmailId,
        phoneNumber: this.state.phoneNumber,
        altPhoneNumber: this.state.altPhoneNumber,
        linkedInProfile: this.state.linkedInProfile,
        faceBookUrl: this.state.facebookProfile,
        twitterUrl: this.state.twitterProfile,
        address: this.state.address,
        city: {
          id: this.state.city.id,
        },
      };
      this.props.updateStudentContact(this.props.id, obj);
    }
  };
  handleStatusUpdate = () => {
    if (this.state.status !== null) {
      let obj = {
        student: {
          id: this.props.id,
        },
        section: {
          name: "Contact Details",
        },
        remark: this.state.misMatchDetails,
        status: this.state.status.value,
        updateDate: null,
        product: {
          id: this.props.match.params.productId,
        },
      };
      console.log(obj);
      this.props.updateVerificationStatus(obj);
      this.setState({
        misMatchDetails: null,
      });
    }
  };
  render() {
    console.log(this.state, "state............");

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
              this.state.status.value === "mismatched" ? (
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
                    <Button
                      variant="outlined"
                      onClick={this.handleStatusUpdate}
                      color="primary"
                      size="small"
                    >
                      Update Status
                    </Button>
                  </Grid>
                </>
              ) : (
                <Grid item md={9} style={divStyle} alignItems="center">
                  <Button
                    variant="outlined"
                    onClick={this.handleStatusUpdate}
                    color="primary"
                    size="small"
                  >
                    Update Status
                  </Button>
                </Grid>
              )}

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
                  {"E-Mail ID:"}
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  onChange={(e) => this.handleChange(e)}
                  name={"eMail"}
                  helperText={this.state.eMailHelperTxt}
                  disabled={this.state.letEdit === false ? true : false}
                  label="E-Mail"
                  value={this.state.eMail}
                />
              </Grid>
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"Alt E-Mail ID:"}
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  onChange={(e) => this.handleChange(e)}
                  helperText={this.state.altMailHelperTxt}
                  name={"altEmailId"}
                  disabled={this.state.letEdit === false ? true : false}
                  label="Alt E-Mail ID"
                  value={this.state.altEmailId}
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
                  helperText={this.state.phoneHelperTxt}
                  onChange={(e) => this.handleChange(e)}
                  name={"phoneNumber"}
                  disabled={this.state.letEdit === false ? true : false}
                  label="Phone Number"
                  value={this.state.phoneNumber}
                />
              </Grid>
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"Alt Phone Number:"}
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  onChange={(e) => this.handleChange(e)}
                  name={"altPhoneNumber"}
                  helperText={this.state.altPhoneHelperTxt}
                  disabled={this.state.letEdit === false ? true : false}
                  label="Alt Phone Number"
                  value={this.state.altPhoneNumber}
                />
              </Grid>
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"Linked In Profile:"}
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  helperText={this.state.linkedInHelperTxt}
                  onChange={(e) => this.handleChange(e)}
                  name={"linkedInProfile"}
                  disabled={this.state.letEdit === false ? true : false}
                  label="Linked In Profile"
                  value={this.state.linkedInProfile}
                />
              </Grid>
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"City:"}
                </Typography>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.props.cityList}
                  value={this.state.city}
                  style={{ width: "60%" }}
                  disabled={this.state.letEdit === false ? true : false}
                  name={"city"}
                  size="small"
                  onChange={(e, newValue) => this.setState({ city: newValue })}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={this.state.cityHelperTxt}
                      label="City"
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
                  {"Facebook Profile:"}
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  helperText={this.state.facebookHelperTxt}
                  onChange={(e) => this.handleChange(e)}
                  name={"facebookProfile"}
                  disabled={this.state.letEdit === false ? true : false}
                  label="Facebook Profile"
                  value={this.state.facebookProfile}
                />
              </Grid>
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"Twitter Profile:"}
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  helperText={this.state.twitterHelperTxt}
                  onChange={(e) => this.handleChange(e)}
                  name={"twitterProfile"}
                  disabled={this.state.letEdit === false ? true : false}
                  label="Twitter Profile"
                  value={this.state.twitterProfile}
                />
              </Grid>
              <Grid item md={6} style={divStyle} justify="space-between">
                <Typography
                  color="primary"
                  style={textStyle}
                  variant="subtitle1"
                >
                  {"Address:"}
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  helperText={this.state.addressHelperTxt}
                  onChange={(e) => this.handleChange(e)}
                  name={"address"}
                  disabled={this.state.letEdit === false ? true : false}
                  label="Address"
                  value={this.state.address}
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
    cityList: state.StudentReducer.cityList,
    contactDataResponse: state.AdminReducer.contactDataResponse,
    updateVerificationResponse: state.AdminReducer.updateVerificationResponse,
    studentStatusResponse: state.AdminReducer.studentStatusResponse,
  };
};

export default connect(mapStateToProps, {
  getStudentsById,
  viewAllCities,
  updateStudentContact,
  updateVerificationStatus,
})(ContactDetails);
