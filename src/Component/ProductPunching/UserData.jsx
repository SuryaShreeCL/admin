import React, { Component } from "react";
import { Divider, Grid, Box, Typography, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import PrimaryButton from "../../Utils/PrimaryButton";
import CustomizedSwitch from "../../Utils/CustomizedSwitch";
import {
  getUserDataAcademicInfo,
  getStudentsById,
  updateUserData,
} from "../../Actions/Student";
import { connect } from "react-redux";

class UserData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientFirstName: "",
      clientFirstNameErr: "",
      clientLastName: "",
      clientLastNameErr: "",
      fullName: "",
      fullNameErr: "",
      number: "",
      numberErr: "",
      AltNumber: "",
      AltNumberErr: "",
      email: "",
      emailErr: "",
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
      country: "",
      countryErr: "",
      degree: "",
      degreeErr: "",
      collegeName: "",
      collegeNameErr: "",
      department: "",
      departmentErr: "",
      presentSem: "",
      presentSemErr: "",
      sgpa: "",
      sgpaErr: "",
    };
  }

  componentDidMount() {
    this.props.getUserDataAcademicInfo(this.props.match.params.id);
    this.props.getStudentsById(this.props.match.params.id);
  }

  handleUpdate = () => {
    let hlptxt = "Please fill the required field";
    this.state.clientFirstName === ""
      ? this.setState({ clientFirstNameErr: hlptxt })
      : this.setState({ clientFirstNameErr: "" });
    this.state.clientLastName === ""
      ? this.setState({ clientLastNameErr: hlptxt })
      : this.setState({ clientLastNameErr: "" });
    this.state.fullName === ""
      ? this.setState({ fullNameErr: hlptxt })
      : this.setState({ fullNameErr: "" });
    this.state.number === ""
      ? this.setState({ numberErr: hlptxt })
      : this.setState({ numberErr: "" });
    this.state.AltNumber === ""
      ? this.setState({ AltNumberErr: hlptxt })
      : this.setState({ AltNumberErr: "" });
    this.state.email === ""
      ? this.setState({ emailErr: hlptxt })
      : this.setState({ emailErr: "" });
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
    this.state.country === ""
      ? this.setState({ countryErr: hlptxt })
      : this.setState({ countryErr: "" });
    this.state.degree === ""
      ? this.setState({ degreeErr: hlptxt })
      : this.setState({ degreeErr: "" });
    this.state.collegeName === ""
      ? this.setState({ collegeNameErr: hlptxt })
      : this.setState({ collegeNameErr: "" });
    this.state.department === ""
      ? this.setState({ departmentErr: hlptxt })
      : this.setState({ departmentErr: "" });
    this.state.presentSem === ""
      ? this.setState({ presentSemErr: hlptxt })
      : this.setState({ presentSemErr: "" });
    this.state.sgpa === ""
      ? this.setState({ sgpaErr: hlptxt })
      : this.setState({ sgpaErr: "" });
    // if (
    //   this.state.clientFirstName !== "" &&
    //   this.state.clientLastName !== "" &&
    //   this.state.fullName !== "" &&
    //   this.state.number !== "" &&
    //   this.state.AltNumber !== "" &&
    //   this.state.email !== "" &&
    //   this.state.apartmentName !== "" &&
    //   this.state.address1 !== "" &&
    //   this.state.address2 !== "" &&
    //   this.state.landmark !== "" &&
    //   this.state.pincode !== "" &&
    //   this.state.state !== "" &&
    //   this.state.city !== "" &&
    //   this.state.country !== "" &&
    //   this.state.degree !== "" &&
    //   this.state.collegeName !== "" &&
    //   this.state.department !== "" &&
    //   this.state.presentSem !== "" &&
    //   this.state.sgpa !== ""
    // ) {
      let obj = {
        id: this.props.match.params.id,
        firstName: this.state.clientFirstName,
        lastName: this.state.clientLastName,
        fullName: this.state.fullName,
        altEmailId: this.state.altEmail,
        altPhoneNumber: this.state.AltNumber,
        address: {
          id: this.props.StudentDetails.address,
        },
        department: {
          id: this.props.StudentDetails.department.id,
        },
        ugDegree: {
          id: this.props.StudentDetails.ugDegree,
        },
        college: {
          id: this.props.StudentDetails.college.id,
        },
        university: {
          id: this.props.StudentDetails.university,
        },
        UGGPA: this.props.StudentDetails.uggpa,
      };
      this.props.updateUserData(obj)
    // }
  };

  render() {
    console.log(this.props);
    console.log(this.props.StudentDetails);
    return (
      <div>
        {/* {this.props.StudentDetails !== null ? this.props.StudentDetails.map(item => ( */}
        <Grid container style={{}} spacing={1}>
          <Grid item md={12}>
            <Box pt={2}>
              <Typography variant={"h6"} className={"user_data_heading"}>
                Personal Information
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Client First Name"
              value={this.props.StudentDetails.firstName || ''}
              size={"small"}
              name="clientFirstName"
              error={this.state.clientFirstNameErr !== "" ? true : false}
              onChange={(e) => {
                this.setState({ hlpTxt: "", clientFirstNameErr: "" });
                this.setState({ clientFirstName: e.target.value });
              }}
              helperText={this.state.clientFirstNameErr}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Client Last Name"
              value={this.props.StudentDetails.lastName || ''}
              size={"small"}
              name="clientLastName"
              error={this.state.clientFirstNameErr !== "" ? true : false}
              onChange={(e) => {
                this.setState({ hlpTxt: "", clientLastNameErr: "" });
                this.setState({ clientLastName: e.target.value });
              }}
              helperText={this.state.clientLastNameErr}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Full Name"
              value={this.props.StudentDetails.fullName || ''}
              size={"small"}
              name="fullName"
              error={this.state.fullNameErr !== "" ? true : false}
              onChange={(e) => {
                this.setState({ hlpTxt: "", fullNameErr: "" });
                this.setState({ fullName: e.target.value });
              }}
              helperText={this.state.fullNameErr}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={3}></Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Contact Number"
              value={this.props.StudentDetails.phoneNumber || ''}
              size={"small"}
              name="number"
              error={this.state.numberErr !== "" ? true : false}
              onChange={(e) => {
                this.setState({ hlpTxt: "", numberErr: "" });
                this.setState({ number: e.target.value });
              }}
              helperText={this.state.numberErr}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Alternate Contatct Number"
              value={this.props.StudentDetails.altPhoneNumber || ''}
              size={"small"}
              name="AltNumber"
              error={this.state.AltNumberErr !== "" ? true : false}
              onChange={(e) => {
                this.setState({ hlpTxt: "", AltNumberErr: "" });
                this.setState({ AltNumber: e.target.value });
              }}
              helperText={this.state.AltNumberErr}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Email Address"
              value={this.props.StudentDetails.emailId || ''}
              size={"small"}
              name="email"
              error={this.state.emailErr !== "" ? true : false}
              onChange={(e) => {
                this.setState({ hlpTxt: "", emailErr: "" });
                this.setState({ email: e.target.value });
              }}
              helperText={this.state.emailErr}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Alternate Email Address"
              value={this.props.StudentDetails.altEmailId || ''}
              size={"small"}
              name="altEmail"
              error={this.state.altEmailErr !== "" ? true : false}
              onChange={(e) => {
                this.setState({ hlpTxt: "", emailErr: "" });
                this.setState({ altEmail: e.target.value });
              }}
              helperText={this.state.altEmailErr}
              fullWidth
            />
          </Grid>
          <Grid md={12} style={{ display: "flex", flexDirection: "row" }}>
            <Grid item>
              <Box pt={4}>
                <Typography variant={"h6"} className={"user_data_heading"}>
                  Shipping Information
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box pt={3} mx={2}>
                <CustomizedSwitch />
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Suit No, Apartment Name"
              value={this.state.apartmentName}
              size={"small"}
              name="apartmentName"
              error={this.state.apartmentNameErr !== "" ? true : false}
              onChange={(e) => {
                this.setState({ hlpTxt: "", apartmentNameErr: "" });
                this.setState({ apartmentName: e.target.value });
              }}
              helperText={this.state.apartmentNameErr}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              label="Street Address 1"
              value={this.state.address1}
              size={"small"}
              name="address1"
              error={this.state.address1Err !== "" ? true : false}
              onChange={(e) => {
                this.setState({ hlpTxt: "", address1Err: "" });
                this.setState({ address1: e.target.value });
              }}
              helperText={this.state.address1Err}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              label="Street Address 2"
              value={this.state.address2}
              size={"small"}
              name="address2"
              error={this.state.address2Err !== "" ? true : false}
              onChange={(e) => {
                this.setState({ hlpTxt: "", address2Err: "" });
                this.setState({ address2: e.target.value });
              }}
              helperText={this.state.address2Err}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Land Mark"
              value={this.state.landmark}
              size={"small"}
              name="landmark"
              error={this.state.landmarkErr !== "" ? true : false}
              onChange={(e) => {
                this.setState({ hlpTxt: "", landmarkErr: "" });
                this.setState({ landmark: e.target.value });
              }}
              helperText={this.state.landmarkErr}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Pincode"
              value={this.state.pincode}
              size={"small"}
              name="pincode"
              error={this.state.pincodeErr !== "" ? true : false}
              onChange={(e) => {
                this.setState({ hlpTxt: "", pincodeErr: "" });
                this.setState({ pincode: e.target.value });
              }}
              helperText={this.state.pincodeErr}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="State"
              value={this.state.state}
              size={"small"}
              name="state"
              error={this.state.stateErr !== "" ? true : false}
              onChange={(e) => {
                this.setState({ hlpTxt: "", stateErr: "" });
                this.setState({ state: e.target.value });
              }}
              helperText={this.state.stateErr}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Current City"
              value={this.state.city}
              size={"small"}
              name="city"
              error={this.state.cityErr !== "" ? true : false}
              onChange={(e) => {
                this.setState({ hlpTxt: "", cityErr: "" });
                this.setState({ city: e.target.value });
              }}
              helperText={this.state.cityErr}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Country"
              value={this.state.country}
              size={"small"}
              name="country"
              error={this.state.countryErr !== "" ? true : false}
              onChange={(e) => {
                this.setState({ hlpTxt: "", countryErr: "" });
                this.setState({ country: e.target.value });
              }}
              helperText={this.state.countryErr}
              fullWidth
            />
          </Grid>
          <Grid item md={12}>
            <Box pt={3}>
              <Typography variant={"h6"} className={"user_data_heading"}>
                Academic Information
              </Typography>
            </Box>
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              // options={this.props.getAllProductFamilyList}
              // getOptionLabel={(option) => option.productName}
              // onChange={(e, newValue) => this.setState({ family: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="UG Degree" variant="standard" />
              )}
            />
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              // options={this.props.getAllProductFamilyList}
              // getOptionLabel={(option) => option.productName}
              // onChange={(e, newValue) => this.setState({ family: newValue })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="College Name"
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              // options={this.props.getAllProductFamilyList}
              // getOptionLabel={(option) => option.productName}
              // onChange={(e, newValue) => this.setState({ family: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="Department" variant="standard" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2} sm={2} lg={2} xl={2}>
            <TextField
              label="Present Semester"
              size={"small"}
              fullWidth
            />
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              // options={this.props.getAllProductFamilyList}
              // getOptionLabel={(option) => option.productName}
              // onChange={(e, newValue) => this.setState({ family: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="SGPA" variant="standard" />
              )}
            />
          </Grid>
          <Grid item md={12} align="center">
            <Box pt={4}>
              <PrimaryButton
                color={"primary"}
                variant={"contained"}
                onClick={() => this.handleUpdate()}
              >
                Update Details
              </PrimaryButton>
            </Box>
          </Grid>
        </Grid>
        {/* )) : null } */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    StudentsgetUserDataAcademicInfoList:
      state.StudentReducer.getUserDataAcademicInfo,
    StudentDetails: state.StudentReducer.StudentList,
    updateUserDataList: state.StudentReducer.updateUserData,
  };
};
export default connect(mapStateToProps, {
  getUserDataAcademicInfo,
  getStudentsById,
  updateUserData,
})(UserData);
