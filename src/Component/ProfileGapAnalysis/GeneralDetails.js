import React, { Component } from "react";
import {
  createTheme,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  ThemeProvider,
  DialogActions,
  withStyles,
  Popover,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  getAllColleges,
  getDegree,
  getBranches,
  getPGDegree,
  getUniversity,
} from "./../../Actions/College";
import { Autocomplete } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";
import {
  getgeneraldetails,
  getstatus,
  getcommenthistory,
  updatestatus,
  updategeneraldetails,
} from "../../Actions/ProfileGapAction";
import {
  getAllSpecialization,
  getAllUniversity,
} from "../../Actions/Aspiration";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import PrimaryButton from "../../Utils/PrimaryButton";
import { connect } from "react-redux";
import Dot from "../../Utils/Dot";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Mysnack from "./../MySnackBar";
const theme = createTheme({
  overrides: {
    MuiGrid: {
      "spacing-xs-2": {
        width: "100%",
      },
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: "0px",
      },
    },
    MuiInputLabel: {
      root: {
        fontSize: "12px",
        whiteSpace: "nowrap",
      },
    },
    MuiInput: {
      underline: {
        "&:after": {
          borderBottom: "2px solid #1890ff",
        },
      },
    },
  },
});
class GeneralDetails extends Component {
  constructor() {
    super();
    this.state = {
      dialog: false,
      firstname: "",
      lastname: "",
      phone: "",
      clsid: "",
      email: "",
      degree: "",
      fieldofstudy: "",
      college: "",
      sem: "",
      areaofspecialisation: "",
      prefschool: "",
      package: "",
      product: "",
      intake: "",
      choosespe: "",
      popOpen: false,
      anchorEl: null,
      messageopen: true,
      commentdialogopen: false,
      specialisation: [],
      university: [],
      workexp: "",
      pgdegree: "",
      pgcollege: "",
      pguniversity: "",
      round: "",
      choosenprogram: "",
      enrollmentdate: null,
      verificationstatus: [],
      field: "",
      commentshistory: [],
      snackMsg: "",
      snackVariant: "",
      snackOpen: false,
      commentlist: [],
      emailErr: "",
      aspdegree: "",
      aspfieldofstudy: "",
    };
  }
  commentshistory(name, value) {
    console.log(value);
    let arr = this.state.commentshistory;
    let filterarr = arr && arr.filter((el) => el.fieldName !== name);
    filterarr.push({
      fieldName: name,
      oldValue:
        this.props.getgeneraldetailsList.studentDetails[name] &&
        this.props.getgeneraldetailsList.studentDetails[name],
      newValue: value,
      comments: "",
    });
    console.log(arr);
    this.setState({
      commentshistory: filterarr,
    });
  }
  componentDidMount() {
    this.props.getAllColleges();
    this.props.getDegree();
    this.props.getBranches();
    this.props.getPGDegree();
    this.props.getUniversity();
    this.props.getAllSpecialization((response) => {
      if (response.status === 200) {
        this.setState({
          specialisation: response.data,
        });
      }
    });
    this.props.getAllUniversity((response) => {
      if (response.status === 200) {
        this.setState({
          university: response.data,
        });
      }
    });
    this.props.getstatus(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      (response) => {
        if (response.status === 200) {
          this.setState({ verificationstatus: response.data });
        }
      }
    );
    this.props.getcommenthistory(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      (response) => {
        console.log(response);
        this.setState({
          commentlist: response.data,
        });
      }
    );
    this.props.getgeneraldetails(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      (response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            clsid: response.data.studentDetails.clsId,
            firstname: response.data.studentDetails.firstName,
            lastname: response.data.studentDetails.lastName,
            phone: response.data.studentDetails.phoneNumber,
            email: response.data.studentDetails.emailId,
            workexp: response.data.studentDetails.workExperience,
            pgcollege: response.data.studentDetails.postGraduateCollege,
            pgdegree: response.data.studentDetails.postGraduateDegree,
            pguniversity: response.data.studentDetails.postGraduateUniversity,
            college: response.data.studentDetails.college,
            degree: response.data.studentDetails.degree,
            fieldofstudy: response.data.studentDetails.fieldOfStudy,
            sem: response.data.studentDetails.currentSem,
            areaofspecialisation:
              response.data.aspirationDetails.aspirationAreaOfSpecializations,
            package: response.data.packageDetails.packagedPurchased,
            product: response.data.packageDetails.pgaProduct,
            intake: response.data.packageDetails.pgaIntake &&{title : response.data.packageDetails.pgaIntake},
            enrollmentdate: response.data.packageDetails.enrollmentDate,
            prefschool: response.data.aspirationDetails.aspirationUniversities,
            round: response.data.packageDetails.round,
            aspdegree: response.data.aspirationDetails.aspirationDegrees,
            aspfieldofstudy: response.data.aspirationDetails.aspirationBranches,
          });
        }
      }
    );
  }
  handlestatus = (status) => {
    console.log("Hello");
    let obj = {
      fieldName: this.state.field,
      verificationStatus: status,
    };
    console.log(obj);
    this.props.updatestatus(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      obj,
      (response) => {
        if (response.status === 200) {
          this.props.getstatus(
            this.props.match.params.studentId,
            this.props.match.params.productId,
            (getresponse) => {
              if (response.status === 200) {
                this.setState({ verificationstatus: getresponse.data });
              }
            }
          );
        }
      }
    );
    this.setState({
      popOpen: false,
    });
  };
  verifiedstatus(name) {
    console.log(name);
    let obj = this.state.verificationstatus.find(
      (data) => data.fieldName === name
    );
    console.log(obj);
    return obj;
  }

  handleopen = () => {
    if(this.props.variantStepList.codeName === "ACS_MBA"){
      if (
        this.state.firstname !== "" &&
        this.state.lastname !== "" &&
        this.state.degree !== null &&
        this.state.college !== null &&
        this.state.fieldofstudy !== null &&
        this.state.intake !== null &&
        this.state.sem !== "" &&
        this.state.round !== "" &&
        this.state.pgcollege !== null &&
        this.state.pgdegree !== null &&
        this.state.pguniversity !== null &&
        this.state.workexp !== ""
      ) {
        this.setState({
          dialog: true,
        });
      } else {
        this.setState({
          snackMsg: "Please Fill the Required Field",
          snackOpen: true,
          snackVariant: "error",
        });
      }
    }
    else{
      if (
        this.state.firstname !== "" &&
        this.state.lastname !== "" &&
        this.state.degree !== null &&
        this.state.college !== null &&
        this.state.fieldofstudy !== null &&
        this.state.sem !== "" &&
        this.state.intake !== null
      ) {
        this.setState({
          dialog: true,
        });
      } else {
        this.setState({
          snackMsg: "Please Fill the Required Field",
          snackOpen: true,
          snackVariant: "error",
        });
      }
    }
    
  };
  handleClose = () => {
    this.setState({
      popOpen: false,
      anchorEl: null,
    });
  };
  handlechange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleDropChange = (e, data) => {
    this.setState({
      [e.target.name]: data,
    });
  };
  handleClick = (event, name) => {
    console.log("jijiojo", event.currentTarget, name);
    this.setState({
      popOpen: true,
      anchorEl: event.currentTarget,
      field: name,
    });
  };
  handleChat = () => {
    this.setState({
      commentdialogopen: true,
    });
  };
  handlecomments = (commentindex, value) => {
    console.log(commentindex, value);
    let i = commentindex;
    let tempArr = this.state.commentshistory;
    tempArr[commentindex] = { ...tempArr[commentindex], comments: value };
    this.setState({
      commentshistory: tempArr,
    });
  };
  renderstudentdetails() {
    if (this.props.variantStepList.codeName === "ACS_MBA") {
      return (
        <Grid container spacing={3}>
          <Grid item md={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  alignItems: "flex-start",
                  display: "flex",
                }}
                onClick={(e) => this.handleClick(e, "pgDegree")}
              >
                <Dot
                  color={
                    this.state.verificationstatus.length > 0 &&
                    this.verifiedstatus("pgDegree").verificationStatus ===
                      "Verified"
                      ? "green"
                      : "orange"
                  }
                />
              </div>
              <div style={{ paddingLeft: "10px", width: "100%" }}>
                <Autocomplete
                  options={this.props.getPGDegreeList}
                  getOptionLabel={(option) => option.name}
                  value={this.state.pgdegree}
                  onChange={(e, newValue) => {
                    this.commentshistory("postGraduateDegree", newValue);
                    this.setState({ pgdegree: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="pgdegree"
                      label="Post Graduate Degree"
                    />
                  )}
                />
              </div>
            </div>
          </Grid>
          <Grid item md={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  alignItems: "flex-start",
                  display: "flex",
                }}
                onClick={(e) => this.handleClick(e, "pgCollege")}
              >
                <Dot
                  color={
                    this.state.verificationstatus.length > 0 &&
                    this.verifiedstatus("pgCollege").verificationStatus ===
                      "Verified"
                      ? "green"
                      : "orange"
                  }
                />
              </div>
              <div style={{ paddingLeft: "10px", width: "100%" }}>
                <Autocomplete
                  options={this.props.getAllCollegesList}
                  getOptionLabel={(option) => option.name}
                  value={this.state.pgcollege}
                  onChange={(e, newValue) => {
                    this.commentshistory("postGraduateCollege", newValue);
                    this.setState({ pgcollege: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="pgcollege"
                      label="Post Graduate College"
                    />
                  )}
                />
              </div>
            </div>
          </Grid>
          <Grid item md={4}></Grid>
          <Grid item md={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  alignItems: "flex-start",
                  display: "flex",
                }}
                onClick={(e) => this.handleClick(e, "pgUniversity")}
              >
                <Dot
                  color={
                    this.state.verificationstatus.length > 0 &&
                    this.verifiedstatus("pgUniversity").verificationStatus ===
                      "Verified"
                      ? "green"
                      : "orange"
                  }
                />
              </div>
              <div style={{ paddingLeft: "10px", width: "100%" }}>
                <Autocomplete
                  options={this.props.getpguniversity}
                  getOptionLabel={(option) => option.name}
                  value={this.state.pguniversity}
                  onChange={(e, newValue) => {
                    this.commentshistory("postGraduateUniversity", newValue);
                    this.setState({ pguniversity: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="pguniversity"
                      label="Post Graduate University"
                    />
                  )}
                />
              </div>
            </div>
          </Grid>
          <Grid item md={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  alignItems: "flex-start",
                  display: "flex",
                }}
                onClick={(e) => this.handleClick(e, "workExperience")}
              >
                <Dot
                  color={
                    this.state.verificationstatus.length > 0 &&
                    this.verifiedstatus("workExperience").verificationStatus ===
                      "Verified"
                      ? "green"
                      : "orange"
                  }
                />
              </div>
              <div style={{ paddingLeft: "10px", width: "100%" }}>
                <TextField
                  name="workexp"
                  label="Work Experience"
                  value={this.state.workexp}
                  onChange={(e) => {
                    this.commentshistory("workexp", e.target.value);
                    this.handlechange(e);
                  }}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid item md={4}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                alignItems: "flex-start",
                display: "flex",
              }}
              onClick={(e) => this.handleClick(e, "CurrentSem")}
            >
              <Dot
                color={
                  this.state.verificationstatus.length > 0 &&
                  this.verifiedstatus("CurrentSem").verificationStatus ===
                    "Verified"
                    ? "green"
                    : "orange"
                }
              />
            </div>
            <div style={{ paddingLeft: "10px" }}>
              <TextField
                name="sem"
                label="Current Semester"
                value={this.state.sem}
                onChange={(e) => {
                  this.commentshistory("currentSem", e.target.value);
                  this.handlechange(e);
                }}
              />
            </div>
          </div>
        </Grid>
      );
    }
  }
  renderhigherdetails() {
    if (this.props.variantStepList.codeName === "ACS_MBA") {
      return (
        <Grid container spacing={3}>
          <Grid item md={4}>
            <TextField
              disabled
              label="Round"
              name="round"
              value={this.state.round}
              onChange={(e) => this.handlechange(e)}
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              multiple
              disabled
              id="tags-outlined"
              options={this.state.aspdegree}
              getOptionLabel={(option) => option.name}
              groupBy={(option) => option.name}
              getOptionDisabled={(option) => {
                var specializationHolder = this.state.specialization.map(
                  (el) => el.name
                );
                return specializationHolder.includes(option.name);
              }}
              value={this.state.aspdegree || []}
              renderInput={(params) => <TextField {...params} label="Degree" />}
              onChange={(e, newValue) => this.setState({ e, newValue })}
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              multiple
              disabled
              id="tags-outlined"
              options={this.state.aspfieldofstudy}
              getOptionLabel={(option) => option.name}
              groupBy={(option) => option.name}
              getOptionDisabled={(option) => {
                var specializationHolder = this.state.specialization.map(
                  (el) => el.name
                );
                return specializationHolder.includes(option.name);
              }}
              value={this.state.aspfieldofstudy || []}
              renderInput={(params) => (
                <TextField {...params} label="Field of Study" />
              )}
              onChange={(e, newValue) => this.setState({ e, newValue })}
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              multiple
              disabled
              id="tags-outlined"
              options={this.state.specialisation}
              getOptionLabel={(option) => option.name}
              groupBy={(option) => option.name}
              getOptionDisabled={(option) => {
                var specializationHolder = this.state.specialization.map(
                  (el) => el.name
                );
                return specializationHolder.includes(option.name);
              }}
              value={this.state.areaofspecialisation || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="areaofspecialisation"
                  label="Area of specialization"
                />
              )}
              onChange={(e, newValue) => this.setState({ e, newValue })}
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              multiple
              disabled
              id="tags-outlined"
              options={this.state.university}
              getOptionLabel={(option) => option.name}
              groupBy={(option) => option.name}
              getOptionDisabled={(option) => {
                var specializationHolder = this.state.university.map(
                  (el) => el.name
                );
                return specializationHolder.includes(option.name);
              }}
              value={this.state.prefschool || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="prefschool"
                  label="Preferred Grad School"
                />
              )}
              onChange={(e, newValue) =>
                this.setState({ prefschool: newValue })
              }
            />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container spacing={3}>
          <Grid item md={4}>
            <Autocomplete
              options={this.props.getDegreeList}
              getOptionLabel={(option) => option.name}
              disabled
              value={this.state.degree}
              onChange={(e, newValue) => this.setState({ degree: newValue })}
              renderInput={(params) => (
                <TextField {...params} name="degree" label="Degree Type" />
              )}
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              options={this.props.getBranchesList}
              getOptionLabel={(option) => option.name}
              value={this.state.fieldofstudy}
              onChange={(e, newValue) =>
                this.setState({ fieldofstudy: newValue })
              }
              disabled
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="fieldofstudy"
                  label="Field Of Study"
                />
              )}
            />
          </Grid>
          <Grid item md={4}>
            {/* <TextField
              disabled
              name="choosespe"
              label="Choosen Specialisation"
              value={this.state.choosespe}
              onChange={(e, newValue) => this.setState({choosespe : newValue})}
            /> */}
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              multiple
              disabled
              options={this.state.specialisation}
              getOptionLabel={(option) => option.name}
              groupBy={(option) => option.name}
              getOptionDisabled={(option) => {
                var specializationHolder = this.state.specialization.map(
                  (el) => el.name
                );
                return specializationHolder.includes(option.name);
              }}
              value={this.state.areaofspecialisation || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="areaofspecialisation"
                  label="Area of specialization"
                />
              )}
              onChange={(e, newValue) =>
                this.setState({ areaofspecialisation: newValue })
              }
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              multiple
              disabled
              id="tags-outlined"
              options={this.state.university}
              getOptionLabel={(option) => option.name}
              groupBy={(option) => option.name}
              getOptionDisabled={(option) => {
                var specializationHolder = this.state.university.map(
                  (el) => el.name
                );
                return specializationHolder.includes(option.name);
              }}
              value={this.state.prefschool || []}
              renderInput={(params) => (
                <TextField {...params} label="Preferred Grad School" />
              )}
              onChange={(e, newValue) =>
                this.setState({ prefschool: newValue })
              }
            />
          </Grid>
        </Grid>
      );
    }
  }
  handlesaved = () => {
    if (this.props.variantStepList.codeName === "ACS_MBA") {
      console.log("true");
      let pgadataarr = [];
      this.state.commentshistory.map((eachdata) => {
        pgadataarr.push({
          fieldName: eachdata.fieldName,
          oldValue:
            typeof eachdata.oldValue === "object"
              ? eachdata.oldValue.id
              : eachdata.oldValue,
          newValue:
            typeof eachdata.newValue === "object"
              ? eachdata.newValue.id
              : eachdata.newValue,
          comments: eachdata.comments,
        });
      });
      console.log(pgadataarr);
      let obj = {
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        degree: {
          id: this.state.degree.id,
        },
        fieldOfStudy: {
          id: this.state.fieldofstudy.id,
        },
        college: {
          id: this.state.college.id,
        },
        postGraduateCollege: {
          id: this.state.pgcollege.id,
        },
        postGraduateDegree: {
          id: this.state.pgdegree.id,
        },
        postGraduateUniversity: {
          id: this.state.pguniversity.id,
        },
        updatedBy: {
          id: window.sessionStorage.getItem("adminUserId"),
        },
        round: this.state.round,
        pgaIntake: this.state.intake && this.state.intake.title,
        pgaDataChangeLogs: pgadataarr,
        workExperience: this.state.workexp,
      };
      console.log(obj);
      if (
        this.state.firstname !== "" &&
        this.state.lastname !== "" &&
        this.state.degree !== null &&
        this.state.college !== null &&
        this.state.fieldofstudy !== null &&
        this.state.intake !== null &&
        this.state.sem !== "" &&
        this.state.round !== "" &&
        this.state.pgcollege !== null &&
        this.state.pgdegree !== null &&
        this.state.pguniversity !== null &&
        this.state.workexp !== ""
      ) {
        this.props.updategeneraldetails(
          this.props.match.params.studentId,
          this.props.match.params.productId,
          obj,((response)=>{
            if(response.status === 200){
              this.setState({
                snackMsg: "Updated Successfully",
                snackOpen: true,
                snackVariant: "success",
              })
            }
          })
        );
        this.setState({ dialog: false });

      } else {
        this.setState({
          snackMsg: "Please Fill the Required Field",
          snackOpen: true,
          snackVariant: "error",
        });
      }
    } else {
      if (
        this.state.firstname !== "" &&
        this.state.lastname !== "" &&
        this.state.degree !== null &&
        this.state.college !== null &&
        this.state.fieldofstudy !== null &&
        this.state.intake !== null &&
        this.state.sem !== ""
      ) {
        let pgadataarr = [];
        this.state.commentshistory.map((eachdata) => {
          pgadataarr.push({
            fieldName: eachdata.fieldName,
            oldValue:
              eachdata.oldValue !== null &&
              typeof eachdata.oldValue === "object"
                ? eachdata.oldValue.id
                : eachdata.oldValue,
            newValue:
              typeof eachdata.newValue === "object"
                ? eachdata.newValue.id
                : eachdata.newValue,
            comments: eachdata.comments,
          });
        });
        console.log(pgadataarr);
        let obj = {
          firstName: this.state.firstname,
          lastName: this.state.lastname,
          currentSem: this.state.sem,
          degree: {
            id: this.state.degree.id,
          },
          fieldOfStudy: {
            id: this.state.fieldofstudy.id,
          },
          college: {
            id: this.state.college.id,
          },
          updatedBy: {
            id: window.sessionStorage.getItem("adminUserId"),
          },
          pgaDataChangeLogs: pgadataarr,
          pgaIntake: this.state.intake && this.state.intake.title,
        };
        console.log(obj);
        if (
          this.state.firstname !== "" &&
          this.state.lastname !== "" &&
          this.state.degree !== null &&
          this.state.college !== null &&
          this.state.fieldofstudy !== null &&
          this.state.intake !== null &&
          this.state.sem !== ""
        ) {
          this.props.updategeneraldetails(
            this.props.match.params.studentId,
            this.props.match.params.productId,
            obj,((response)=>{
              if(response.status === 200){
                this.setState({
                  snackMsg: "Updated Successfully",
                  snackOpen: true,
                  snackVariant: "success",
                })
              }
            })
          );
          this.setState({ dialog: false });
        } else {
          this.setState({
            snackMsg: "Please Fill the Required Field",
            snackOpen: true,
            snackVariant: "error",
          });
        }
      } else {
        this.setState({
          snackMsg: "Please Fill the Required Field",
          snackOpen: true,
          snackVariant: "error",
        });
      }
    }
  };
  intakevalue = [
    { title: "Fall 2020" },
    { title: "Spring 2021" },
    { title: "Fall 2021" },
    { title: "Spring 2022" },
    { title: "Fall 2022" },
    { title: "Spring 2023" },
    { title: "Fall 2023" },
    { title: "Spring 2024" },
    { title: "Fall 2024" },
    { title: "Spring 2025" },
    { title: "Fall 2025" },
  ];
  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <div>
        <ThemeProvider theme={theme}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "20px",
            }}
          >
            <Typography>Student Details</Typography>
            <ChatBubbleOutlineIcon
              style={{ marginLeft: "10px" }}
              onClick={() =>
                this.state.commentlist.length > 0 && this.handleChat()
              }
            />
          </div>
          <Grid
            container
            spacing={2}
            style={{ padding: "25px", marginTop: "-30px" }}
          >
            <Grid item md={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    alignItems: "flex-start",
                    display: "flex",
                  }}
                  onClick={(e) => this.handleClick(e, "ClsId")}
                >
                  <Dot
                    color={
                      this.state.verificationstatus.length > 0 &&
                      this.verifiedstatus("ClsId").verificationStatus ===
                        "Verified"
                        ? "green"
                        : "orange"
                    }
                  />
                </div>
                <div style={{ paddingLeft: "10px" }}>
                  <TextField
                    disabled
                    name="clsid"
                    label="CLS ID"
                    value={this.state.clsid}
                    onChange={(e) => {
                      this.commentshistory("clsId", e.target.value);
                      this.handlechange(e);
                    }}
                  />
                </div>
              </div>
            </Grid>
            <Grid item md={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    alignItems: "flex-start",
                    display: "flex",
                  }}
                  onClick={(e) => this.handleClick(e, "FirstName")}
                >
                  <Dot
                    color={
                      this.state.verificationstatus.length > 0 &&
                      this.verifiedstatus("FirstName").verificationStatus ===
                        "Verified"
                        ? "green"
                        : "orange"
                    }
                  />
                </div>
                <div style={{ paddingLeft: "10px" }}>
                  <TextField
                    name="firstname"
                    type="text"
                    label="First Name"
                    value={this.state.firstname}
                    onChange={(e) => {
                      this.commentshistory("firstName", e.target.value);
                      this.handlechange(e);
                    }}
                  />
                </div>
              </div>
            </Grid>
            <Grid item md={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    alignItems: "flex-start",
                    display: "flex",
                  }}
                  onClick={(e) => this.handleClick(e, "LastName")}
                >
                  <Dot
                    color={
                      this.state.verificationstatus.length > 0 &&
                      this.verifiedstatus("LastName").verificationStatus ===
                        "Verified"
                        ? "green"
                        : "orange"
                    }
                  />
                </div>
                <div style={{ paddingLeft: "10px" }}>
                  <TextField
                    name="lastname"
                    type="text"
                    label="Last Name"
                    value={this.state.lastname}
                    onChange={(e) => {
                      this.commentshistory("lastName", e.target.value);
                      this.handlechange(e);
                    }}
                  />
                </div>
              </div>
            </Grid>
            <Grid item md={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    alignItems: "flex-start",
                    display: "flex",
                  }}
                  onClick={(e) => this.handleClick(e, "PhoneNumber")}
                >
                  <Dot
                    color={
                      this.state.verificationstatus.length > 0 &&
                      this.verifiedstatus("PhoneNumber").verificationStatus ===
                        "Verified"
                        ? "green"
                        : "orange"
                    }
                  />
                </div>
                <div style={{ paddingLeft: "10px" }}>
                  <TextField
                    name="phone"
                    disabled
                    label="Phone Number"
                    value={this.state.phone}
                    onChange={(e) => {
                      this.commentshistory("phoneNumber", e.target.value);
                      this.handlechange(e);
                    }}
                    inputProps={{
                      maxLength: 10,
                    }}
                  />
                </div>
              </div>
            </Grid>
            <Grid item md={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    alignItems: "flex-start",
                    display: "flex",
                  }}
                  onClick={(e) => this.handleClick(e, "EmailId")}
                >
                  <Dot
                    color={
                      this.state.verificationstatus.length > 0 &&
                      this.verifiedstatus("EmailId").verificationStatus ===
                        "Verified"
                        ? "green"
                        : "orange"
                    }
                  />
                </div>
                <div style={{ paddingLeft: "10px" }}>
                  <TextField
                    name="email"
                    disabled
                    label="Email Address"
                    value={this.state.email}
                    onChange={(e) => {
                      this.commentshistory("emailId", e.target.value);
                      this.handlechange(e);
                    }}
                  />
                </div>
              </div>
            </Grid>
            <Grid item md={4}></Grid>
            <Grid item md={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    alignItems: "flex-start",
                    display: "flex",
                  }}
                  onClick={(e) => this.handleClick(e, "ugDegree")}
                >
                  <Dot
                    color={
                      this.state.verificationstatus.length > 0 &&
                      this.verifiedstatus("ugDegree").verificationStatus ===
                        "Verified"
                        ? "green"
                        : "orange"
                    }
                  />
                </div>
                <div style={{ paddingLeft: "10px", width: "100%" }}>
                  <Autocomplete
                    fullWidth
                    options={this.props.getDegreeList}
                    getOptionLabel={(option) => option.name}
                    value={this.state.degree}
                    onChange={(e, newValue) => {
                      this.commentshistory("degree", newValue);
                      this.setState({ degree: newValue });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="degree"
                        label="Degree Type"
                      />
                    )}
                  />
                </div>
              </div>
            </Grid>
            <Grid item md={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    alignItems: "flex-start",
                    display: "flex",
                  }}
                  onClick={(e) => this.handleClick(e, "ugDepartment")}
                >
                  <Dot
                    color={
                      this.state.verificationstatus.length > 0 &&
                      this.verifiedstatus("ugDepartment").verificationStatus ===
                        "Verified"
                        ? "green"
                        : "orange"
                    }
                  />
                </div>
                <div style={{ paddingLeft: "10px", width: "100%" }}>
                  <Autocomplete
                    options={this.props.getBranchesList}
                    getOptionLabel={(option) => option.name}
                    value={this.state.fieldofstudy}
                    onChange={(e, newValue) => {
                      this.commentshistory("fieldOfStudy", newValue);
                      this.setState({ fieldofstudy: newValue });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="fieldofstudy"
                        label="Field Of Study"
                      />
                    )}
                  />
                </div>
              </div>
            </Grid>
            <Grid item md={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    alignItems: "flex-start",
                    display: "flex",
                  }}
                  onClick={(e) => this.handleClick(e, "ugCollege")}
                >
                  <Dot
                    color={
                      this.state.verificationstatus.length > 0 &&
                      this.verifiedstatus("ugCollege").verificationStatus ===
                        "Verified"
                        ? "green"
                        : "orange"
                    }
                  />
                </div>
                <div style={{ paddingLeft: "10px", width: "100%" }}>
                  <Autocomplete
                    options={this.props.getAllCollegesList}
                    getOptionLabel={(option) => option.name}
                    value={this.state.college}
                    onChange={(e, newValue) => {
                      this.commentshistory("college", newValue);
                      this.setState({ college: newValue });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="college"
                        label="College Name"
                      />
                    )}
                  />
                </div>
              </div>
            </Grid>
            <Grid item md={12}>
              {this.renderstudentdetails()}
            </Grid>
          </Grid>
          <Typography style={{ marginLeft: "20px" }}>
            Higher Education Aspiration
          </Typography>
          <Grid
            container
            spacing={3}
            style={{ padding: "25px", marginTop: "-30px" }}
          >
            <Grid item md={12} style={{ marginLeft: "25px" }}>
              {this.renderhigherdetails()}
            </Grid>
          </Grid>
          <Typography style={{ marginLeft: "20px" }}>
            Package Details
          </Typography>
          <Grid
            container
            spacing={2}
            style={{ padding: "25px", marginTop: "-30px" }}
          >
            <Grid item md={12} style={{ marginLeft: "25px" }}>
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <TextField
                    disabled
                    name="package"
                    label="Package Purchased"
                    value={this.state.package}
                    onChange={(e) => this.handlechange(e)}
                  />
                </Grid>
                <Grid item md={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disabled
                      name="enrollmentdate"
                      margin="normal"
                      label="Enrollment Period"
                      format="dd-MM-yyyy"
                      value={this.state.enrollmentdate}
                      onChange={(newValue) =>
                        this.setState({ enrollmentdate: newValue })
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item md={4}></Grid>
                <Grid item md={4}>
                  <TextField
                    disabled
                    value={this.state.product}
                    onChange={(e) => this.handlechange(e)}
                    name="product"
                    label="Product"
                  />
                </Grid>
                <Grid item md={4}>
                  <Autocomplete
                    options={this.intakevalue}
                    getOptionLabel={(option) => option.title}
                    name="intake"
                    value={this.state.intake}
                    onChange={(e, newValue) => {
                      this.setState({
                        intake: newValue,
                      });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} name="intake" label="Intake" />
                    )}
                  />
                  {/* <TextField
                    name="intake"
                    value={this.state.intake}
                    onChange={(e) => this.handlechange(e)}
                    label="Intake"
                  /> */}
                  {/* <TextField name="intake" disabled label="Intake" /> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ padding: "10px" }}>
            <Grid item md={12}>
              <hr />
            </Grid>
            <Grid item md={12} align={"right"}>
              <PrimaryButton
                color={"primary"}
                variant={"contained"}
                style={{ width: "100px", marginTop: "-20px" }}
                onClick={() => {
                  this.state.commentshistory.length > 0
                    ? this.handleopen()
                    : this.handlesaved();
                }}
              >
                Save
              </PrimaryButton>
            </Grid>
          </Grid>
          <Dialog
            open={this.state.dialog}
            onClose={() => this.setState({ dialog: false })}
          >
            <DialogTitle>
              <Grid container>
                <Grid item md={12} align="left">
                  <Typography>Change Verification</Typography>
                </Grid>
                <Grid item md={12}>
                  <hr />
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                {this.state.commentshistory.map((data, index) => {
                  return (
                    <>
                      <Grid item md={12}>
                        <Typography>
                          We see that you have made changes to {data.fieldName}{" "}
                          ,Would you like to comment?
                        </Typography>
                      </Grid>
                      <Grid item md={12}>
                        <Typography>Old Name</Typography>
                      </Grid>
                      <Grid item md={6} style={{ color: "grey" }}>
                        {data.fieldName}
                      </Grid>
                      <Grid item md={6} style={{ fontWeight: "bold" }}>
                        {data.oldValue !== null &&
                        typeof data.oldValue === "object"
                          ? data.oldValue.name
                          : data.oldValue}
                      </Grid>
                      <Grid item md={12}>
                        New Name
                      </Grid>
                      <Grid item md={6} style={{ color: "grey" }}>
                        {data.fieldName}
                      </Grid>
                      <Grid item md={6} style={{ fontWeight: "bold" }}>
                        {data.newValue !== null &&
                        typeof data.newValue === "object"
                          ? data.newValue.name
                          : data.newValue}
                      </Grid>
                      <Grid item md={12}>
                        <TextField
                          fullWidth
                          label="Comments"
                          name="comments"
                          value={this.state.comments}
                          onChange={(e) => {
                            this.handlecomments(index, e.target.value);
                          }}
                        />
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Grid container>
                <Grid item md={8}></Grid>
                <Grid item md={4}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>
                      <PrimaryButton
                        style={{ width: "100px" }}
                        color="primary"
                        variant="contained"
                        onClick={() => this.handlesaved()}
                      >
                        Add
                      </PrimaryButton>
                    </div>
                    <div>
                      <PrimaryButton
                        style={{ width: "100px" }}
                        color="primary"
                        variant="outlined"
                        onClick={() => this.setState({ dialog: false })}
                      >
                        Cancel
                      </PrimaryButton>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>
          <Dialog
            open={this.state.commentdialogopen}
            onClose={() => this.setState({ commentdialogopen: false })}
          >
            <DialogTitle style={{ maxWidth: "lg" }}>
              <Typography>Comments History</Typography>
              <hr />
              <Typography>Comments</Typography>
            </DialogTitle>
            <DialogContent>
              {this.state.commentlist &&
                this.state.commentlist.map((data) => {
                  let date = new Date(data.updatedAt).getDate();
                  let month = new Date(data.updatedAt).getMonth();
                  let year = new Date(data.updatedAt).getFullYear();
                  var monthtext = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sept",
                    "Oct",
                    "Nov",
                    "Dec",
                  ];
                  let monthname = monthtext[month];
                  let finaldate = date + " " + monthname + " " + year;
                  return (
                    <>
                      <Grid
                        container
                        spacing={2}
                        style={{
                          borderStyle: "groove",
                          borderRadius: "10px",
                          padding: "10px",
                          margin: "5px",
                        }}
                      >
                        <Grid item md={12}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography>{finaldate}</Typography>
                            <div style={{ display: "flex" }}>
                              <Typography
                                style={{ color: "grey", marginRight: "10px" }}
                              >
                                Changed by
                              </Typography>
                              <Typography>{data.updatedBy}</Typography>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={6}>
                          <Grid container spacing={1}>
                            <Grid item md={12}>
                              <Typography style={{ color: "grey" }} k>
                                Previous
                              </Typography>
                            </Grid>
                            <Grid item md={7}>
                              <Typography style={{ color: "grey" }}>
                                Enter {data.fieldName}
                              </Typography>
                            </Grid>
                            <Grid item md={5}>
                              <Typography>{data.oldValue}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item md={6}>
                          <Grid container spacing={1}>
                            <Grid item md={12}>
                              <Typography style={{ color: "grey" }}>
                                Change to
                              </Typography>
                            </Grid>
                            <Grid item md={7}>
                              <Typography style={{ color: "grey" }}>
                                Enter {data.fieldName}
                              </Typography>
                            </Grid>
                            <Grid item md={5}>
                              <Typography>{data.newValue}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item md={12}>
                          <Typography style={{ color: "grey" }}>
                            Comments
                          </Typography>
                        </Grid>
                        <Grid item md={12} style={{ marginTop: "-15px" }}>
                          <p>{data.comments}</p>
                        </Grid>
                      </Grid>
                    </>
                  );
                })}
            </DialogContent>
            <DialogActions>
              <Grid container>
                <Grid item md={12} align={"right"}>
                  <PrimaryButton
                    variant={"outlined"}
                    color={"primary"}
                    style={{ width: "100px", height: "30px" }}
                    onClick={() => this.setState({ commentdialogopen: false })}
                  >
                    Cancel
                  </PrimaryButton>
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>
          <Menu
            id="basic-menu"
            anchorEl={this.state.anchorEl}
            open={this.state.popOpen}
            onClose={this.handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => this.handlestatus("Not Verified")}>
              {" "}
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Dot color={"orange"} />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <Typography
                    onClick={() => {
                      this.setState({
                        popOpen: false,
                      });
                    }}
                  >
                    Not Verified
                  </Typography>
                </div>
              </div>
            </MenuItem>
            <MenuItem onClick={() => this.handlestatus("Verified")}>
              {" "}
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                  }}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Dot color={"green"} />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <Typography
                    onClick={() => {
                      this.setState({
                        popOpen: false,
                      });
                    }}
                  >
                    Verified
                  </Typography>
                </div>
              </div>
            </MenuItem>
          </Menu>
          <Mysnack
            snackMsg={this.state.snackMsg}
            snackVariant={this.state.snackVariant}
            snackOpen={this.state.snackOpen}
            onClose={() => this.setState({ snackOpen: false })}
          />
        </ThemeProvider>
      </div>
    );
  }
}
const useStyles = (theme) => ({});
const mapStateToProps = (state) => {
  console.log(state);
  return {
    getAllCollegesList: state.CollegeReducer.allCollegeList,
    getDegreeList: state.CollegeReducer.Degree,
    getBranchesList: state.CollegeReducer.BranchList,
    getgeneraldetailsList: state.ProfileGapAnalysisReducer.getgeneraldetails,
    getallspeList: state.AspirationReducer.viewSpecializationList,
    getalluniversityList: state.AspirationReducer.viewCollegeList,
    getPGDegreeList: state.CollegeReducer.getPGDegrees,
    getpguniversity: state.CollegeReducer.University,
    getstatusList: state.ProfileGapAnalysisReducer.getstatus,
    getcommenthistoryList: state.ProfileGapAnalysisReducer.getcommenthistory,
    updatestatusList: state.ProfileGapAnalysisReducer.updatestatus,
    updategeneraldetailsList:
      state.ProfileGapAnalysisReducer.updategeneraldetails,
  };
};
export default connect(mapStateToProps, {
  getAllColleges,
  getDegree,
  getBranches,
  getgeneraldetails,
  getAllSpecialization,
  getAllUniversity,
  getPGDegree,
  getUniversity,
  getstatus,
  updatestatus,
  getcommenthistory,
  updategeneraldetails,
})(withStyles(useStyles)(GeneralDetails));
