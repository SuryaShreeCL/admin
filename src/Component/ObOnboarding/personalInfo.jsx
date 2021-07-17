import React, { Component } from "react";
import {
  Grid,
  TextField,
  Card,
  IconButton,
  ThemeProvider,
  withStyles,
  createMuiTheme,
} from "@material-ui/core";
import { getStudentsById } from "../../Actions/Student";
import { connect } from "react-redux";
import { getPersonalInfo, updatePersonalInfo, getPincodeDetails } from "../../Actions/Calldetails";
import GreenTick from "../../Asset/Images/greenTick.png";
import Pencil from "../../Asset/Images/pencil.png";
import PrimaryButton from "../../Utils/PrimaryButton";
import { isEmptyString } from "../../Component/Validation";

const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      input: {},
    },
    MuiIconButton: {
      root: {
        color: "#1093FF",
      },
    },
    MuiFormHelperText: {
      root: {
        color: "red",
      },
    },
    MuiInputLabel: {
      root: {
        whiteSpace: "nowrap",
        fontSize: "inherit",
      },
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: "0px",
        marginBottom: "0px",
      },
    },
  },
});

export class personalInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personalDisable: true,
      addressDisable: true,
      mediaDisable: true,
      clsid:'',
      firstName: "",
      firstNameErr: "",
      lastName: "",
      lastNameErr: "",
      fullName: "",
      fullNameErr: "",
      number:'',
      email:'',
      altPhone: "",
      altPhoneErr: "",
      altEmail: "",
      altEmailErr: "",
      apartmentName: "",
      apartmentNameErr: "",
      address1: "",
      address1Err: "",
      address2: "",
      address2Err: "",
      landmark: "",
      landmarkErr: "",
      pincode: "",
      pincodeErr: "",
      state: "",
      stateErr: "",
      city: "",
      cityErr: "",
      linkedIn: "",
      linkedInErr: "",
      facebook: "",
      facebookErr: "",
      twitter: "",
      twitterErr: "",
      pincodeDetails:[]
    };
  }
  componentDidMount(){
    this.props.getStudentsById(this.props.match.params.studentId);
  }
  
  componentDidUpdate(prevProps, prevState) {
     
    if (this.props.getStudentsByIdList !== prevProps.getStudentsByIdList) {
      this.props.getPincodeDetails(this.props.getStudentsByIdList.address.pincode , (data) => {
        this.setState({
          state: data[0].PostOffice[0].State,
          city: data[0].PostOffice[0].District,
        })
      })
      this.setState({
        firstName: this.props.getStudentsByIdList.firstName,
        lastName:this.props.getStudentsByIdList.lastName,
        fullName:this.props.getStudentsByIdList.firstName + this.props.getStudentsByIdList.lastName,
        number: this.props.getStudentsByIdList.phoneNumber,
        email: this.props.getStudentsByIdList.emailId,
        clsid: this.props.getStudentsByIdList.studentID,
        altPhone: this.props.getStudentsByIdList.altPhoneNumber,
        altEmail: this.props.getStudentsByIdList.altEmailId,
        apartmentName: this.props.getStudentsByIdList.address.suitNoApartmentNo,
        address1: this.props.getStudentsByIdList.address.streetAddressOne,
        address2: this.props.getStudentsByIdList.address.streetAddressTwo,
        landmark: this.props.getStudentsByIdList.address.landMark,
        pincode: this.props.getStudentsByIdList.address.pincode,
        // state: this.props.getStudentsByIdList.address.state,
        // city: this.props.getStudentsByIdList.address.city,
        twitter: this.props.getStudentsByIdList.twitterUrl,
        facebook:this.props.getStudentsByIdList.faceBookUrl,
        linkedIn: this.props.getStudentsByIdList.linkedInProfile
      });
    }
  }
  handlePersonalClick(e) {
    this.setState({ personalDisable: !this.state.personalDisable });
  }

  handleAddressClick(e) {
    this.setState({ addressDisable: !this.state.addressDisable });
  }

  handleSocialClick(e) {
    this.setState({ mediaDisable: !this.state.mediaDisable });
  }
  handleSave = () => {
    let hlptxt = "Please fill the required field";
    isEmptyString(this.state.firstName)
      ? this.setState({ firstNameErr: hlptxt })
      : this.setState({ firstNameErr: "" });
    this.state.lastName === ""
      ? this.setState({ lastNameErr: hlptxt })
      : this.setState({ lastNameErr: "" });
    this.state.fullName === ""
      ? this.setState({ fullNameErr: hlptxt })
      : this.setState({ fullNameErr: "" });
    this.state.altPhone === ""
      ? this.setState({ altPhoneErr: hlptxt })
      : this.setState({ altPhoneErr: "" });
    this.state.altPhone === ""
      ? this.setState({ altPhoneErr: hlptxt })
      : this.setState({ altPhoneErr: "" });
    this.state.altEmail === ""
      ? this.setState({ altEmailErr: hlptxt })
      : this.setState({ altEmailErr: "" });

    this.state.apartmentName === ""
      ? this.setState({ apartmentNameErr: hlptxt })
      : this.setState({ apartmentNameErr: "" });
    this.state.address1 === ""
      ? this.setState({ address1Err: hlptxt })
      : this.setState({ address1Err: "" });
    this.state.address2 === ""
      ? this.setState({ address2Err: hlptxt })
      : this.setState({ address2Err: "" });
    this.state.landmark === ""
      ? this.setState({ landmarkErr: hlptxt })
      : this.setState({ landmarkErr: "" });
    this.state.pincode === ""
      ? this.setState({ pincodeErr: hlptxt })
      : this.setState({ pincodeErr: "" });
    this.state.state === ""
      ? this.setState({ stateErr: hlptxt })
      : this.setState({ stateErr: "" });
    this.state.city === ""
      ? this.setState({ cityErr: hlptxt })
      : this.setState({ cityErr: "" });

    this.state.linkedIn === ""
      ? this.setState({ linkedInErr: hlptxt })
      : this.setState({ linkedInErr: "" });
    this.state.facebook === ""
      ? this.setState({ facebookErr: hlptxt })
      : this.setState({ facebookErr: "" });
    this.state.twitter === ""
      ? this.setState({ twitterErr: hlptxt })
      : this.setState({ twitterErr: "" });

    // if(){

    // }
    {
   let obj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      fullName: this.state.fullName,
      studentID: this.state.clsid,
      twitterUrl: this.state.twitter,
      faceBookUrl: this.state.facebook,
      linkedInProfile: this.state.linkedIn,
      altPhoneNumber: this.state.altPhone,
      altEmailId: this.state.altEmail,
      address: {
        city: this.state.city,
        state: this.state.state,
        country:"null",
        streetAddressOne: this.state.address1,
        streetAddressTwo: this.state.address2,
        pincode: this.state.pincode,
        landMark: this.state.landmark,
        suitNoApartmentNo: this.state.apartmentName,
      },
    }
    this.props.updatePersonalInfo(this.props.match.params.studentId,obj)
    console.log(this.props.match.params.studentId)
    };
  };

  render() {
    console.log(this.props.getStudentsByIdList)
    console.log(this.props)

    const { HeadStyle, HeadDisplay } = style;
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Card style={{ padding: 25 }}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "22%",
                    }}
                  >
                    <p style={HeadStyle}>Personal Information</p>
                    <img
                      src={GreenTick}
                      style={{
                        height: 17,
                        width: 17,
                        position: "relative",
                        top: 5,
                      }}
                    />
                  </div>
                  <IconButton onClick={this.handlePersonalClick.bind(this)}>
                    <img src={Pencil} height={17} width={17} />
                  </IconButton>
                </div>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="standard-basic"
                  label="CLS ID (Order ID / Student ID)"
                  disabled={true}
                  value={this.state.clsid}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  style={{
                    color: "red",
                    fontStyle: "Montserrat",
                    fontWeight: "700",
                    fontStyle: "normal",
                    fontSize: "18px",
                  }}
                  id="standard-basic"
                  label="Client First Name"
                  // disabled={this.state.personalDisable}
                  value={this.state.firstName}
                  onChange={(e) =>
                    this.setState({
                      firstName: e.target.value,
                      firstNameErr: "",
                    })
                  }
                  error={this.state.firstNameErr.length > 0}
                  helperText={this.state.firstNameErr}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="standard-basic"
                  label="Client Last Name"
                  // disabled={this.state.personalDisable}
                  value={this.state.lastName}
                  onChange={(e) =>
                    this.setState({ lastName: e.target.value, lastNameErr: "" })
                  }
                  error={this.state.lastNameErr.length > 0}
                  helperText={this.state.lastNameErr}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="standard-basic"
                  label="Full Name"
                  // disabled={this.state.personalDisable}
                  value={this.state.fullName}
                  onChange={(e) =>
                    this.setState({ fullName: e.target.value, fullNameErr: "" })
                  }
                  error={this.state.fullNameErr.length > 0}
                  helperText={this.state.fullNameErr}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  inputMode="numeric"
                  id="standard-basic"
                  label="Contact Number"
                  disabled={true}
                  value={this.state.number}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="standard-basic"
                  label="Email Address"
                  disabled={true}
                  value={this.state.email}
                />
              </Grid>

              <Grid item md={2}>
                <TextField
                  inputMode="numeric"
                  id="standard-basic"
                  label="Alternate Contatct Number"
                  // disabled={this.state.personalDisable}
                  value={this.state.altPhone}
                  onChange={(e) =>
                    this.setState({ altPhone: e.target.value, altPhoneErr: "" })
                  }
                  error={this.state.altPhoneErr.length > 0}
                  helperText={this.state.altPhoneErr}
                  inputProps={{ maxLength: 10 }}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  id="standard-basic"
                  label="Alternate Email Address"
                  // disabled={this.state.personalDisable}
                  value={this.state.altEmail}
                  onChange={(e) =>
                    this.setState({ altEmail: e.target.value, altEmailErr: "" })
                  }
                  error={this.state.altEmailErr.length > 0}
                  helperText={this.state.altEmailErr}
                />
              </Grid>
              <Grid item md={8}></Grid>

              <Grid item md={12}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "22%",
                    }}
                  >
                    <p style={HeadStyle}>Address Details</p>
                    <img
                      src={GreenTick}
                      style={{
                        height: 17,
                        width: 17,
                        position: "relative",
                        top: 5,
                      }}
                    />
                  </div>
                  <IconButton onClick={this.handleAddressClick.bind(this)}>
                    <img src={Pencil} height={17} width={17} />
                  </IconButton>
                </div>
              </Grid>
              <Grid item md={4}>
                <TextField
                  id="standard-basic"
                  label="Suit No, Apartment Name"
                  disabled={this.state.addressDisable}
                  value={this.state.apartmentName}
                  onChange={(e) =>
                    this.setState({
                      apartmentName: e.target.value,
                      apartmentNameErr: "",
                    })
                  }
                  error={this.state.apartmentNameErr.length > 0}
                  helperText={this.state.apartmentNameErr}
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  id="standard-basic"
                  label="Street Address 1"
                  disabled={this.state.addressDisable}
                  value={this.state.address1}
                  // value={this.state.address1}
                  onChange={(e) =>
                    this.setState({ address1: e.target.value, address1Err: "" })
                  }
                  error={this.state.address1Err.length > 0}
                  helperText={this.state.address1Err}
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  id="standard-basic"
                  label="Street Address 2"
                  disabled={this.state.addressDisable}
                  value={this.state.address2}
                  onChange={(e) =>
                    this.setState({ address2: e.target.value, address2Err: "" })
                  }
                  error={this.state.address2Err.length > 0}
                  helperText={this.state.address2Err}
                />
              </Grid>
              {/* <Grid item md={12}>
          </Grid> */}

              <Grid item md={2}>
                <TextField
                  id="standard-basic"
                  label="Landmark"
                  disabled={this.state.addressDisable}
                  value={this.state.landmark}
                  onChange={(e) =>
                    this.setState({ landmark: e.target.value, landmarkErr: "" })
                  }
                  error={this.state.landmarkErr.length > 0}
                  helperText={this.state.landmarkErr}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  inputMode="numeric"
                  id="standard-basic"
                  label="Pincode"
                  value={this.state.pincode}
                  type='number'
                  disabled={this.state.addressDisable}
                  onChange={(e) =>
                    this.setState({ pincode: e.target.value, pincodeErr: "" })
                  }
                  error={this.state.pincodeErr.length > 0}
                  helperText={this.state.pincodeErr}
                  inputProps={{ maxLength: 6 }}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="standard-basic"
                  label="State"
                  value={this.state.state}
                  disabled={this.state.addressDisable}
                  onChange={(e) =>
                    this.setState({ state: e.target.value, stateErr: "" })
                  }
                  error={this.state.stateErr.length > 0}
                  helperText={this.state.stateErr}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="standard-basic"
                  label="Current city"
                  value={this.state.city}
                  disabled={this.state.addressDisable}
                  onChange={(e) =>
                    this.setState({ city: e.target.value, cityErr: "" })
                  }
                  error={this.state.cityErr.length > 0}
                  helperText={this.state.cityErr}
                />
              </Grid>

              <Grid item md={12}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "22%",
                    }}
                  >
                    <p style={HeadStyle}>Social Media</p>
                    <img
                      src={GreenTick}
                      style={{
                        height: 17,
                        width: 17,
                        position: "relative",
                        top: 5,
                      }}
                    />
                  </div>
                  <IconButton onClick={this.handleSocialClick.bind(this)}>
                    <img src={Pencil} height={17} width={17} />
                  </IconButton>
                </div>
              </Grid>
              <Grid item md={3}>
                <TextField
                  id="standard-basic"
                  label="LinkedIn"
                  disabled={this.state.mediaDisable}
                  value={this.state.linkedIn}
                  onChange={(e) =>
                    this.setState({ linkedIn: e.target.value, linkedInErr: "" })
                  }
                  error={this.state.linkedInErr.length > 0}
                  helperText={this.state.linkedInErr}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  id="standard-basic"
                  label="Facebook"
                  disabled={this.state.mediaDisable}
                  value={this.state.facebook}
                  onChange={(e) =>
                    this.setState({ facebook: e.target.value, facebookErr: "" })
                  }
                  error={this.state.facebookErr.length > 0}
                  helperText={this.state.facebookErr}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  id="standard-basic"
                  label="Twitter"
                  disabled={this.state.mediaDisable}
                  value={this.state.twitter}
                  onChange={(e) =>
                    this.setState({ twitter: e.target.value, twitterErr: "" })
                  }
                  error={this.state.twitterErr.length > 0}
                  helperText={this.state.twitterErr}
                />
              </Grid>
              <Grid
                item
                md={12}
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <PrimaryButton
                  onClick={() => this.handleSave()}
                  style={{ textTransform: "none" }}
                  variant={"contained"}
                  color={"primary"}
                  size={"small"}
                >
                  Save Changes
                </PrimaryButton>
              </Grid>
            </Grid>
          </Card>
        </ThemeProvider>
      </div>
    );
  }
}
const style = {
  HeadStyle: {
    fontStyle: "Poppins",
    // fontWeight: "600",
    fontStyle: "normal",
    fontSize: "18px",
    color: "#0081FF",
    // padding:15
  },
  HeadDisplay: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 20,
  },
};

const mapStateToProps = (state) => {
  return {
    updatePersonalInfoList : state.CallReducer.updatePersonalInfo,
    getPersonalInfoList : state.CallReducer.getPersonalInfo,
    getStudentsByIdList: state.StudentReducer.StudentList,
  };
};

export default connect(mapStateToProps, {
  getPersonalInfo, updatePersonalInfo,
  getStudentsById,
  getPincodeDetails
})(personalInfo);

