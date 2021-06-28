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
import {
  getAllColleges,
  getUniversity,
  getDegree,
  getBranches,
} from "../../Actions/College";
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
      university: "",
    };
  }

  componentDidMount() {
    this.props.getUserDataAcademicInfo(this.props.match.params.id);
    this.props.getStudentsById(this.props.match.params.id);
    this.props.getAllColleges();
    this.props.getUniversity();
    this.props.getDegree();
    this.props.getBranches();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.StudentDetails !== prevProps.StudentDetails) {
      this.setState({
        StudentDetails: this.props.StudentDetails,
        degree:
          this.props.StudentDetails.ugDegree !== null
            ? this.props.StudentDetails.ugDegree
            : {},
        collegeName:
          this.props.StudentDetails.college &&
          this.props.StudentDetails.college !== null
            ? this.props.StudentDetails.college
            : {},
        department:
          this.props.StudentDetails.department &&
          this.props.StudentDetails.department !== null
            ? this.props.StudentDetails.department
            : {},
        university:
          this.props.StudentDetails.university &&
          this.props.StudentDetails.university !== null
            ? this.props.StudentDetails.university
            : {},
        clientFirstName:
          this.props.StudentDetails.firstName &&
          this.props.StudentDetails.firstName !== null
            ? this.props.StudentDetails.firstName
            : null,
        clientLastName:
          this.props.StudentDetails.lastName &&
          this.props.StudentDetails.lastName !== null
            ? this.props.StudentDetails.lastName
            : null,
        fullName:
          this.props.StudentDetails.fullName &&
          this.props.StudentDetails.fullName !== null
            ? this.props.StudentDetails.fullName
            : null,
        number:
          this.props.StudentDetails.phoneNumber &&
          this.props.StudentDetails.phoneNumber !== null
            ? this.props.StudentDetails.phoneNumber
            : null,
        AltNumber:
          this.props.StudentDetails.altPhoneNumber &&
          this.props.StudentDetails.altPhoneNumber !== null
            ? this.props.StudentDetails.altPhoneNumber
            : null,
        email:
          this.props.StudentDetails.emailId &&
          this.props.StudentDetails.emailId !== null
            ? this.props.StudentDetails.emailId
            : null,
        altEmail:
          this.props.StudentDetails.altEmailId &&
          this.props.StudentDetails.altEmailId !== null
            ? this.props.StudentDetails.altEmailId
            : null,
        apartmentName:
          this.props.StudentDetails.address.suitNoAndApartmentName &&
          this.props.StudentDetails.address.suitNoAndApartmentName !== null
            ? this.props.StudentDetails.address.suitNoAndApartmentName
            : null,
        address1:
          this.props.StudentDetails.address.streetAddress1 &&
          this.props.StudentDetails.address.streetAddress1 !== null
            ? this.props.StudentDetails.address.streetAddress1
            : null,
        address2:
          this.props.StudentDetails.address.streetAddress2 &&
          this.props.StudentDetails.address.streetAddress2 !== null
            ? this.props.StudentDetails.address.streetAddress2
            : null,
        landmark:
          this.props.StudentDetails.address.landMark &&
          this.props.StudentDetails.address.landMark !== null
            ? this.props.StudentDetails.address.landMark
            : null,
        pincode:
          this.props.StudentDetails.address.pinCode &&
          this.props.StudentDetails.address.pinCode !== null
            ? this.props.StudentDetails.address.pinCode
            : null,
        state:
          this.props.StudentDetails.address.state &&
          this.props.StudentDetails.address.state !== null
            ? this.props.StudentDetails.address.state
            : null,
        city:
          this.props.StudentDetails.address.city &&
          this.props.StudentDetails.address.city !== null
            ? this.props.StudentDetails.address.city
            : null,
        country:
          this.props.StudentDetails.address.country &&
          this.props.StudentDetails.address.country !== null
            ? this.props.StudentDetails.address.country
            : null,
        sgpa:
          this.props.StudentDetails.uggpa &&
          this.props.StudentDetails.uggpa !== null
            ? this.props.StudentDetails.uggpa
            : null,
      });
    }
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
        city: this.state.city,
        country: this.state.country,
        landMark: this.state.landmark,
        pincode: this.state.pincode,
        state: this.state.state,
        streetAddressOne: this.state.address1,
        streetAddressTwo: this.state.address2,
        suitNoApartmentNo: this.state.apartmentName,
      },
      department: {
        id: this.state.department.id,
      },
      ugDegree: {
        id: this.state.degree.id,
      },
      college: {
        id: this.state.collegeName.id,
      },
      university: {
        id: this.state.university.id,
      },
      UGGPA: this.props.StudentDetails.uggpa,
    };

    this.props.updateUserData(obj);
    this.props.getStudentsById(this.props.match.params.id);
    this.props.getAllColleges();
    this.props.getDegree();
    this.props.getBranches();
    // }
  };

  render() {
    console.log(this.props.allCollegeList);
    console.log(this.props.branchList);
    console.log(this.props.degreeList);
    console.log(this.state);
    console.log(this.props.match.params.id)
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
              value={this.state.clientFirstName || ""}
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
              value={this.state.clientLastName || ""}
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
              value={this.state.fullName || ""}
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
              value={this.state.number || ""}
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
              value={this.state.AltNumber || ""}
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
              value={this.state.email || ""}
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
              value={this.state.altEmail || ""}
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
              value={this.state.apartmentName || ""}
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
              value={this.state.address1 || ""}
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
              value={this.state.address2 || ""}
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
              value={this.state.landmark || ""}
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
              value={this.state.pincode || ""}
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
              value={this.state.state || ""}
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
              value={this.state.city || ""}
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
              value={this.state.country || ""}
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
              options={this.props.degreeList}
              value={this.state.degree}
              name="ugDegree"
              onChange={(e, newValue) => this.setState({ degree: newValue })}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="UG Degree" variant="standard" />
              )}
            />
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              value={this.state.collegeName}
              name="college"
              onChange={(e, newValue) =>
                this.setState({ collegeName: newValue })
              }
              options={
                this.props.allCollegeList.length !== 0
                  ? this.props.allCollegeList
                  : []
              }
              getOptionLabel={(option) => option.name}
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
              options={this.props.branchList}
              value={this.state.department}
              name="department"
              onChange={(e, newValue) =>
                this.setState({ department: newValue })
              }
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Department" variant="standard" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2} sm={2} lg={2} xl={2}>
            <TextField label="Present Semester" size={"small"} fullWidth />
          </Grid>
          <Grid item md={2}>
            {/* <Autocomplete
              id="combo-box-demo"
              // options={this.props.getAllProductFamilyList}
              // getOptionLabel={(option) => option.productName}
              // onChange={(e, newValue) => this.setState({ family: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="SGPA" variant="standard" />
              )}
            /> */}
            <TextField
              label="SGPA"
              value={this.state.sgpa || ""}
              size={"small"}
              name="uggpa"
              error={this.state.sgpaErr !== "" ? true : false}
              onChange={(e) => {
                this.setState({ hlpTxt: "", sgpaErr: "" });
                this.setState({ sgpa: e.target.value });
              }}
              helperText={this.state.sgpaErr}
              fullWidth
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
    allCollegeList: state.CollegeReducer.allCollegeList,
    universityList: state.CollegeReducer.University,
    degreeList: state.CollegeReducer.Degree,
    branchList: state.CollegeReducer.BranchList,
  };
};
export default connect(mapStateToProps, {
  getUserDataAcademicInfo,
  getStudentsById,
  updateUserData,
  getAllColleges,
  getUniversity,
  getDegree,
  getBranches,
})(UserData);
