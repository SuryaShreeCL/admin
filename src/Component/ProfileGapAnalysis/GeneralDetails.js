import DateFnsUtils from "@date-io/date-fns";
import {
  Card,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Menu,
  MenuItem,
  TextField,
  ThemeProvider,
  Typography,
  withStyles,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { Autocomplete } from "@material-ui/lab";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllBranch,
  getAllDegree,
  getAllSpecialization,
  getAllUniversity,
} from "../../Actions/Aspiration";
import { StudentStepDetails } from "../../Actions/Student";
import {
  getCommentHistory,
  getgeneraldetails,
  getstatus,
  updategeneraldetails,
  updatestatus,
} from "../../Actions/ProfileGapAction";
import "../../Asset/ProfileGapAnalysis.css";
import Dot from "../../Utils/Dot";
import PrimaryButton from "../../Utils/PrimaryButton";
import { isAlpha } from "../Validation";
import {
  getAllColleges,
  getBranches,
  getDegree,
  getPGDegree,
  getUniversity,
} from "./../../Actions/College";
import Mysnack from "./../MySnackBar";
import CommentDialog from "./CommentDialog";
import CvViewer from "./CvViewer";
import {
  getAspirationLocation,
  getAspirationPackage,
  getAspirationWork,
} from "../../Actions/Student";
const theme = createTheme({
  overrides: {
    MuiGrid: {
      "spacing-xs-2": {
        width: "100%",
        padding: "4px",
      },
      "spacing-xs-3": {
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
      commentList: [],
      emailErr: "",
      aspdegree: "",
      aspfieldofstudy: "",
      buttonStatus: false,
      isThreeFieldOnly: "",
      preferredWork: {},
      preferredLocation: {},
      preferredPackage: {},
      commentUpdateList: [],
      fieldname: {
        fieldOfStudy: "Field Of Study",
        college: "College",
        degree: "Degree",
        postGraduateDegree: "PostGraduate Degree",
        postGraduateUniversity: "PostGraduate University",
        postGraduateCollege: "PostGraduate College",
        firstName: "First Name",
        lastName: "Last Name",
        currentSem: "Current Semester",
        workexp: "Work Experience",
        workExperience: "Work Experience",
      },
    };
  }
  commentshistory(name, value) {
    let arr = this.state.commentshistory;
    let filterarr = arr && arr.filter((el) => el.fieldName !== name);
    filterarr.push({
      fieldName: name,
      oldValue:
        this.props.getgeneraldetailsList?.studentDetails[name] &&
        this.props.getgeneraldetailsList?.studentDetails[name],
      newValue: value,
      comment: "",
    });

    this.setState({
      commentshistory: filterarr,
    });
  }

  fetchCommentHistory() {
    this.props.getCommentHistory(
      this.props.match.params.studentId,
      this.props.match.params.productId
    );
    this.props.getgeneraldetails(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      (response) => {}
    );
  }

  componentDidMount() {
    this.props.getAllColleges();
    this.props.getDegree();
    this.props.getBranches();
    this.props.getPGDegree();
    this.props.getUniversity();
    this.props.getAllBranch();
    this.props.getAllDegree();
    this.props.StudentStepDetails(
      this.props.match.params.studentId,
      this.props.match.params.productId
    );
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
    this.props.getAspirationLocation(
      this.props.match.params.studentId,
      this.props.variantStepList.id
    );
    // this.props.getAspirationWork(
    //   this.props.match.params.studentId,
    //   this.props.variantStepList.id,
    //   null
    // );
    this.props.getAspirationPackage(
      this.props.match.params.studentId,
      this.props.variantStepList.id
    );

    this.fetchCommentHistory();

    this.props.getgeneraldetails(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      (response) => {
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
              response.data.aspirationDetails?.aspirationAreaOfSpecializations,
            package: response.data.packageDetails.packagedPurchased,
            product: response.data.packageDetails.pgaProduct,
            intake: response.data.packageDetails.pgaIntake && {
              title: response.data.packageDetails.pgaIntake,
            },
            enrollmentdate: response.data.packageDetails.enrollmentDate,
            prefschool:
              response.data.schoolType === "ASPIRATION_BS"
                ? response.data.aspirationDetails.aspirationBschool
                : response.data.aspirationDetails.aspirationUniversities,
            round: response.data.packageDetails.round,
            aspdegree: response.data.aspirationDetails?.aspirationDegrees,
            aspfieldofstudy:
              response.data.aspirationDetails?.aspirationBranches,
            isThreeFieldOnly: response.data.aspirationDetails?.isThreeFieldOnly,
            preferredLocation: response.data.aspirationDetails?.jobLocation,
            preferredWork: response.data.aspirationDetails?.workProfile,
            preferredPackage: response.data.aspirationDetails?.preferredPackage,
          });
        }
      }
    );
  }
  componentDidUpdate(prevProps) {
    const { commentHistory } = this.props;

    if (prevProps.getgeneraldetailsList !== this.props.getgeneraldetailsList) {
      this.setState({
        clsid: this.props.getgeneraldetailsList?.studentDetails?.clsId,
        firstname: this.props.getgeneraldetailsList?.studentDetails?.firstName,
        lastname: this.props.getgeneraldetailsList?.studentDetails?.lastName,
        phone: this.props.getgeneraldetailsList?.studentDetails?.phoneNumber,
        email: this.props.getgeneraldetailsList?.studentDetails?.emailId,
        workexp: this.props.getgeneraldetailsList?.studentDetails
          ?.workExperience,
        pgcollege: this.props.getgeneraldetailsList?.studentDetails
          ?.postGraduateCollege,
        pgdegree: this.props.getgeneraldetailsList?.studentDetails
          ?.postGraduateDegree,
        pguniversity: this.props.getgeneraldetailsList?.studentDetails
          ?.postGraduateUniversity,
        college: this.props.getgeneraldetailsList?.studentDetails?.college,
        degree: this.props.getgeneraldetailsList?.studentDetails?.degree,
        fieldofstudy: this.props.getgeneraldetailsList?.studentDetails
          ?.fieldOfStudy,
        sem: this.props.getgeneraldetailsList?.studentDetails?.currentSem,
        areaofspecialisation: this.props.getgeneraldetailsList
          ?.aspirationDetails?.aspirationAreaOfSpecializations,
        package: this.props.getgeneraldetailsList?.packageDetails
          ?.packagedPurchased,
        product: this.props.getgeneraldetailsList?.packageDetails?.pgaProduct,
        intake: this.props.getgeneraldetailsList?.packageDetails?.pgaIntake && {
          title: this.props.getgeneraldetailsList?.packageDetails?.pgaIntake,
        },
        enrollmentdate: this.props.getgeneraldetailsList?.packageDetails
          ?.enrollmentDate,
        prefschool:
          this.props.getgeneraldetailsList?.schoolType === "ASPIRATION_BS"
            ? this.props.getgeneraldetailsList?.aspirationDetails
                ?.aspirationBschool
            : this.props.getgeneraldetailsList?.aspirationDetails
                ?.aspirationUniversities,
        round: this.props.getgeneraldetailsList?.packageDetails?.round,
        aspdegree: this.props.getgeneraldetailsList?.aspirationDetails
          ?.aspirationDegrees,
        aspfieldofstudy: this.props.getgeneraldetailsList?.aspirationDetails
          ?.aspirationBranches,
      });
    }

    if (commentHistory && commentHistory !== prevProps.commentHistory) {
      if (commentHistory.success) {
        let arr = [];
        if (commentHistory.data && commentHistory.data.length !== 0) {
          this.setState({
            buttonStatus: true,
          });

          commentHistory.data.map((eachdata) => {
            if (eachdata.fieldName === "college") {
              arr.push({
                fieldName: eachdata.fieldName,
                oldValue: eachdata.oldCollege && eachdata.oldCollege.name,
                newValue: eachdata.newCollege && eachdata.newCollege.name,
                comment: eachdata.comment,
                updatedAt: eachdata.updatedAt,
                updatedBy: eachdata.updatedBy,
              });
            } else if (eachdata.fieldName === "degree") {
              arr.push({
                fieldName: eachdata.fieldName,
                oldValue: eachdata.oldDegree && eachdata.oldDegree.name,
                newValue: eachdata.newDegree && eachdata.newDegree.name,
                comment: eachdata.comment,
                updatedAt: eachdata.updatedAt,
                updatedBy: eachdata.updatedBy,
              });
            } else if (eachdata.fieldName === "fieldOfStudy") {
              arr.push({
                fieldName: eachdata.fieldName,
                oldValue:
                  eachdata.oldPgDepartment && eachdata.oldPgDepartment.name,
                newValue:
                  eachdata.newPgDepartment && eachdata.newPgDepartment.name,
                comment: eachdata.comment,
                updatedAt: eachdata.updatedAt,
                updatedBy: eachdata.updatedBy,
              });
            } else if (eachdata.fieldName === "postGraduateDegree") {
              arr.push({
                fieldName: eachdata.fieldName,
                oldValue: eachdata.oldPgDegree && eachdata.oldPgDegree.name,
                newValue: eachdata.newPgDegree && eachdata.newPgDegree.name,
                comment: eachdata.comment,
                updatedAt: eachdata.updatedAt,
                updatedBy: eachdata.updatedBy,
              });
            } else if (eachdata.fieldName === "fieldOfStudy") {
              arr.push({
                fieldName: eachdata.fieldName,
                oldValue:
                  eachdata.oldPgDepartment && eachdata.oldPgDepartment.name,
                newValue:
                  eachdata.newPgDepartment && eachdata.newPgDepartment.name,
                comment: eachdata.comment,
                updatedAt: eachdata.updatedAt,
                updatedBy: eachdata.updatedBy,
              });
            } else if (eachdata.fieldName === "postGraduateUniversity") {
              arr.push({
                fieldName: eachdata.fieldName,
                oldValue:
                  eachdata.oldPgUniversity && eachdata.oldPgUniversity.name,
                newValue:
                  eachdata.newPgUniversity && eachdata.newPgUniversity.name,
                comment: eachdata.comment,
                updatedAt: eachdata.updatedAt,
                updatedBy: eachdata.updatedBy,
              });
            } else if (eachdata.fieldName === "postGraduateCollege") {
              arr.push({
                fieldName: eachdata.fieldName,
                oldValue: eachdata.oldPgCollege && eachdata.oldPgCollege.name,
                newValue: eachdata.newPgCollege && eachdata.newPgCollege.name,
                comment: eachdata.comment,
                updatedAt: eachdata.updatedAt,
                updatedBy: eachdata.updatedBy,
              });
            } else {
              arr.push({
                fieldName: eachdata.fieldName,
                oldValue: eachdata.oldValue,
                newValue: eachdata.newValue,
                comment: eachdata.comment,
                updatedAt: eachdata.updatedAt,
                updatedBy: eachdata.updatedBy,
              });
            }
          });
        }
        this.setState({
          commentList: commentHistory.data || [],
          commentUpdateList: arr,
        });
      } else {
        this.setState({
          snackMsg: commentHistory.message,
          snackOpen: true,
          snackVariant: "error",
        });
      }
    }
  }

  handlestatus = (status) => {
    let obj = {
      fieldName: this.state.field,
      verificationStatus: status,
    };

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
              if (getresponse.status === 200) {
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
    let obj =
      this.state.verificationstatus &&
      this.state.verificationstatus.find((data) => data.fieldName === name);

    return obj;
  }

  handleopen = () => {
    if (
      this.props.StudentStepDetailsList.referProductCodeName === "ACS_MBA" ||
      this.props.StudentStepDetailsList.referProductCodeName === "ACS MIM"
    ) {
      if (
        this.state.firstname !== "" &&
        this.state.lastname !== "" &&
        this.state.degree !== null &&
        // this.state.college !== null &&
        this.state.fieldofstudy !== null &&
        this.state.intake !== null &&
        // this.state.sem !== "" &&
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
    } else {
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
    let i = commentindex;
    let tempArr = this.state.commentshistory;
    tempArr[commentindex] = { ...tempArr[commentindex], comment: value };
    this.setState({
      commentshistory: tempArr,
    });
  };
  renderstudentdetails() {
    if (
      this.props.StudentStepDetailsList.referProductCodeName === "ACS_MBA" ||
      this.props.StudentStepDetailsList.referProductCodeName === "ACS_MIM"
    ) {
      return (
        <ThemeProvider theme={theme}>
          <Grid container spacing={3} style={{ marginTop: "2%" }}>
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
                      this.state.verificationstatus &&
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
                    popupIcon={<ExpandMore style={{ color: "black" }} />}
                    expandIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                    options={this.props.getPGDegreeList || []}
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
                        className={"field_style"}
                        label="Post Graduate Degree"
                        InputLabelProps={{ shrink: true }}
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
                      this.state.verificationstatus &&
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
                    popupIcon={<ExpandMore style={{ color: "black" }} />}
                    options={this.props.getAllCollegesList || []}
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
                        className={"field_style"}
                        label="Post Graduate College"
                        InputLabelProps={{ shrink: true }}
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
                      this.state.verificationstatus &&
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
                    popupIcon={<ExpandMore style={{ color: "black" }} />}
                    options={this.props.getpguniversity || []}
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
                        className={"field_style"}
                        label="Post Graduate University"
                        InputLabelProps={{ shrink: true }}
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
                      this.state.verificationstatus &&
                      this.state.verificationstatus.length > 0 &&
                      this.verifiedstatus("workExperience")
                        .verificationStatus === "Verified"
                        ? "green"
                        : "orange"
                    }
                  />
                </div>
                <div style={{ paddingLeft: "10px", width: "100%" }}>
                  <TextField
                    name="workexp"
                    label="Work Experience"
                    className={"work_style"}
                    value={this.state.workexp}
                    onChange={(e) => {
                      this.commentshistory("workExperience", e.target.value);
                      this.handlechange(e);
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </ThemeProvider>
      );
    } else {
      return (
        <Grid container>
          <Grid item md={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                marginTop: "15px",
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
                    this.state.verificationstatus &&
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
                  popupIcon={<ExpandMore style={{ color: "black" }} />}
                  options={this.props.getAllCollegesList || []}
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
                      className={"field_style"}
                      label="College Name"
                      InputLabelProps={{ shrink: true }}
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
                justifyContent: "space-around",
                marginTop: "15px",
              }}
            >
              <div
                style={{
                  alignItems: "flex-start",
                  display: "flex",
                }}
                onClick={(e) => this.handleClick(e, "CurrentSem")}
              >
                {/* <Dot
                  color={
                    this.state.verificationstatus &&
                    this.state.verificationstatus.length > 0 &&
                    this.verifiedstatus("CurrentSem").verificationStatus ===
                      "Verified"
                      ? "green"
                      : "orange"
                  }
                /> */}
              </div>
              <div style={{ paddingLeft: "10px" }}>
                <TextField
                  name="sem"
                  label="Current Semester"
                  className={"sem_style"}
                  value={this.state.sem}
                  onChange={(e) => {
                    this.commentshistory("currentSem", e.target.value);
                    this.handlechange(e);
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      );
    }
  }

  renderhigherdetails() {
    if (
      this.props.StudentStepDetailsList.referProductCodeName === "ACS_MBA" ||
      this.props.StudentStepDetailsList.referProductCodeName === "ACS MIM"
    ) {
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
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              disabled
              id="tags-outlined"
              options={this.state.aspdegree || []}
              getOptionLabel={(option) => option.name}
              groupBy={(option) => option.name}
              getOptionDisabled={(option) => {
                var specializationHolder = this.state.aspdegree.map(
                  (el) => el.name
                );
                return specializationHolder.includes(option.name);
              }}
              value={this.state.aspdegree || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Degree"
                  className={"field_style"}
                />
              )}
              onChange={(e, newValue) => this.setState({ e, newValue })}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              multiple
              disabled
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              id="tags-outlined"
              options={this.state.aspfieldofstudy || []}
              getOptionLabel={(option) => option.name}
              groupBy={(option) => option.name}
              className={"package_style"}
              getOptionDisabled={(option) => {
                var specializationHolder = this.state.aspfieldofstudy.map(
                  (el) => el.name
                );
                return specializationHolder.includes(option.name);
              }}
              value={this.state.aspfieldofstudy || []}
              renderInput={(params) => (
                <TextField {...params} label="Field of Study" />
              )}
              onChange={(e, newValue) => this.setState({ e, newValue })}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              multiple
              disabled
              options={this.state.specialisation || []}
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
                  className={"package_style"}
                  label="Area of Specialization"
                  InputLabelProps={{ shrink: true }}
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
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              id="tags-outlined"
              options={this.state.university || []}
              getOptionLabel={(option) => option.name}
              groupBy={(option) => option.name}
              getOptionDisabled={(option) => {
                var specializationHolder = this.state.university.map(
                  (el) => el.name
                );
                return specializationHolder.includes(option.name);
              }}
              value={this.state.prefschool || []}
              InputLabelProps={{ shrink: true }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="prefschool"
                  // label="Preferred Grad School"
                  label={this.showSchoolLabel()}
                  className={"package_style"}
                  InputLabelProps={{ shrink: true }}
                />
              )}
              onChange={(e, newValue) =>
                this.setState({ prefschool: newValue })
              }
            />
          </Grid>
        </Grid>
      );
    } else if (this.state.isThreeFieldOnly) {
      return (
        <Grid container spacing={3}>
          <Grid item md={4}>
            <Autocomplete
              // multiple
              disabled
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              id="tags-outlined"
              options={this.props.getWorkList || []}
              getOptionLabel={(option) => option.workProfile}
              value={this.state.preferredWork || []}
              InputLabelProps={{ shrink: true }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="preferredWork"
                  label="Preferred Work"
                  // className={"degree_style"}
                  // InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              // multiple
              disabled
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              id="tags-outlined"
              options={this.props.getlocationList || []}
              getOptionLabel={(option) => option.jobLocation}
              value={this.state.preferredLocation || []}
              InputLabelProps={{ shrink: true }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="preferredLocation"
                  label="Preferred Location"
                  // className={"degree_style"}
                  // InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              // multiple
              disabled
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              id="tags-outlined"
              options={this.props.getPackagelist || []}
              getOptionLabel={(option) => option.preferredPackage}
              value={this.state.preferredPackage || []}
              InputLabelProps={{ shrink: true }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="preferredPackage"
                  label="Preferred Package"
                  // className={"degree_style"}
                  // InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container spacing={3}>
          <Grid item md={4}>
            <Autocomplete
              multiple
              disabled
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              id="tags-outlined"
              options={this.state.aspdegree || []}
              getOptionLabel={(option) => option.name}
              groupBy={(option) => option.name}
              getOptionDisabled={(option) => {
                var specializationHolder = this.state.aspdegree.map(
                  (el) => el.name
                );
                return specializationHolder.includes(option.name);
              }}
              value={this.state.aspdegree || []}
              InputLabelProps={{ shrink: true }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="aspdegree"
                  label="Degree"
                  className={"degree_style"}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid item md={4}>
            {/* <Autocomplete
            popupIcon={<ExpandMore 
              style={{ color: "black" }} />}
              options={this.props.getBranchesList}
              getOptionLabel={(option) => option.name}
              value={this.state.aspfieldofstudy}
              onChange={(e, newValue) =>
                this.setState({ fieldofstudy: newValue })
              }
              disabled
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="fieldofstudy"
                  label="Field Of Study"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            /> */}
            <Autocomplete
              multiple
              disabled
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              id="tags-outlined"
              options={this.state.aspfieldofstudy || []}
              getOptionLabel={(option) => option.name}
              groupBy={(option) => option.name}
              getOptionDisabled={(option) => {
                var specializationHolder = this.state.aspfieldofstudy.map(
                  (el) => el.name
                );
                return specializationHolder.includes(option.name);
              }}
              value={this.state.aspfieldofstudy || []}
              InputLabelProps={{ shrink: true }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="fieldofstudy"
                  className={"package_style"}
                  label="Field Of Study"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid item md={4}></Grid>
          <Grid item md={4}>
            <Autocomplete
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              multiple
              disabled
              options={this.state.specialisation || []}
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
                  className={"package_style"}
                  name="areaofspecialisation"
                  label="Area of Specialization"
                  InputLabelProps={{ shrink: true }}
                />
              )}
              onChange={(e, newValue) =>
                this.setState({ areaofspecialisation: newValue })
              }
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              popupIcon={<ExpandMore style={{ color: "black" }} />}
              multiple
              disabled
              id="tags-outlined"
              options={this.state.university || []}
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
                  // label="Preferred Grad School"
                  label={this.showSchoolLabel()}
                  className={"package_style"}
                  InputLabelProps={{ shrink: true }}
                />
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
    if (
      this.props.StudentStepDetailsList.referProductCodeName === "ACS_MBA" ||
      this.props.StudentStepDetailsList.referProductCodeName === "ACS MIM"
    ) {
      let pgadataarr = [];
      this.state.commentshistory.map((eachdata) => {
        pgadataarr.push({
          fieldName: eachdata.fieldName,
          oldValue:
            eachdata.oldValue && typeof eachdata.oldValue === "object"
              ? eachdata.oldValue.id
              : eachdata.oldValue,
          newValue:
            typeof eachdata.newValue === "object"
              ? eachdata.newValue.id
              : eachdata.newValue,
          comment: eachdata.comment,
        });
      });

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
        pgaIntake: this.state.intake?.title,
        pgaDataChangeLogs: pgadataarr,
        workExperience: this.state.workexp,
      };

      if (
        this.state.firstname !== "" &&
        this.state.lastname !== "" &&
        this.state.degree !== null &&
        this.state.fieldofstudy !== null &&
        // this.state.intake !== null &&
        this.state.round !== "" &&
        this.state.pgcollege !== null &&
        this.state.pgdegree !== null &&
        this.state.pguniversity !== null &&
        this.state.workexp !== ""
      ) {
        this.props.updategeneraldetails(
          this.props.match.params.studentId,
          this.props.match.params.productId,
          obj,
          (response) => {
            if (response.status === 200) {
              this.fetchCommentHistory();
              this.setState({
                snackMsg: "Saved Successfully",
                snackOpen: true,
                snackVariant: "success",
              });
            }
          }
        );
        this.setState({ dialog: false, commenthistory: [] });
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
        // this.state.intake !== null &&
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
            comment: eachdata.comment,
          });
        });

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
          pgaIntake: this.state.intake?.title,
        };

        if (
          this.state.firstname !== "" &&
          this.state.lastname !== "" &&
          this.state.degree !== null &&
          this.state.college !== null &&
          this.state.fieldofstudy !== null &&
          // this.state.intake !== null &&
          this.state.sem !== ""
        ) {
          this.props.updategeneraldetails(
            this.props.match.params.studentId,
            this.props.match.params.productId,
            obj,
            (response) => {
              if (response.status === 200) {
                this.fetchCommentHistory();
                this.setState({
                  snackMsg: "Saved Successfully",
                  snackOpen: true,
                  snackVariant: "success",
                });
              }
            }
          );
          this.setState({ dialog: false, commentshistory: [] });
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

  showSchoolLabel = () => {
    const { getgeneraldetailsList } = this.props;
    if (
      getgeneraldetailsList &&
      getgeneraldetailsList.schoolType === "ASPIRATION_GRAD"
    ) {
      return "Preferred Grad-Schools";
    } else if (
      getgeneraldetailsList &&
      getgeneraldetailsList.schoolType === "ASPIRATION_BS"
    ) {
      return "Preferred B-schools";
    } else if (
      getgeneraldetailsList &&
      getgeneraldetailsList.schoolType === "ASPIRATION_BS_GRAD"
    ) {
      return "Preferred B-schools / Grad Schools";
    } else return "Preferred B-schools / Grad Schools";
  };

  render() {
    const { classes } = this.props;
    console.log(this.props);
    console.log(this.props.variantStepList, this.props.StudentStepDetailsList);
    return (
      <div>
        <Grid container className={classes.root}>
          {/*left container  */}
          <Grid item md={7}>
            <ThemeProvider theme={theme}>
              <div className={classes.leftcontainer}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "20px",
                    marginTop: "30px",
                  }}
                >
                  <Typography>Student Details</Typography>
                  {this.state.buttonStatus ? (
                    <ChatBubbleOutlineIcon
                      style={{ marginLeft: "24px" }}
                      onClick={() => this.handleChat()}
                    />
                  ) : null}
                </div>
                <Grid container style={{ padding: "25px", marginTop: "-30px" }}>
                  <Grid item md={4}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        // backgroundColor:"green",
                        marginTop: "15px",
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
                            this.state.verificationstatus &&
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
                          InputLabelProps={{ shrink: true }}
                          className={"clsid_style"}
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
                        marginTop: "15px",
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
                            this.state.verificationstatus &&
                            this.state.verificationstatus.length > 0 &&
                            this.verifiedstatus("FirstName")
                              .verificationStatus === "Verified"
                              ? "green"
                              : "orange"
                          }
                        />
                      </div>
                      <div style={{ paddingLeft: "10px" }}>
                        <TextField
                          name="firstname"
                          type="text"
                          InputLabelProps={{ shrink: true }}
                          label="First Name"
                          className={"field_style"}
                          value={this.state.firstname}
                          onChange={(e) => {
                            this.commentshistory("firstName", e.target.value);
                            this.handlechange(e);
                          }}
                          onKeyPress={(evt) => {
                            if (isAlpha(evt)) {
                              evt.preventDefault();
                            }
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
                        marginTop: "15px",
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
                            this.state.verificationstatus &&
                            this.state.verificationstatus.length > 0 &&
                            this.verifiedstatus("LastName")
                              .verificationStatus === "Verified"
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
                          InputLabelProps={{ shrink: true }}
                          className={"field_style"}
                          onChange={(e) => {
                            this.commentshistory("lastName", e.target.value);
                            this.handlechange(e);
                          }}
                          onKeyPress={(evt) => {
                            if (isAlpha(evt)) {
                              evt.preventDefault();
                            }
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
                        marginTop: "15px",
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
                            this.state.verificationstatus &&
                            this.state.verificationstatus.length > 0 &&
                            this.verifiedstatus("PhoneNumber")
                              .verificationStatus === "Verified"
                              ? "green"
                              : "orange"
                          }
                        />
                      </div>
                      <div style={{ paddingLeft: "10px" }}>
                        <TextField
                          name="phone"
                          disabled
                          InputLabelProps={{ shrink: true }}
                          label="Phone Number"
                          className={"field_style"}
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
                        marginTop: "15px",
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
                            this.state.verificationstatus &&
                            this.state.verificationstatus.length > 0 &&
                            this.verifiedstatus("EmailId")
                              .verificationStatus === "Verified"
                              ? "green"
                              : "orange"
                          }
                        />
                      </div>
                      <div style={{ paddingLeft: "10px", paddingRight: "5px" }}>
                        <TextField
                          name="email"
                          disabled
                          label="Email Address"
                          InputLabelProps={{ shrink: true }}
                          value={this.state.email}
                          className={"field_style"}
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
                        marginTop: "15px",
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
                            this.state.verificationstatus &&
                            this.state.verificationstatus.length > 0 &&
                            this.verifiedstatus("ugDegree")
                              .verificationStatus === "Verified"
                              ? "green"
                              : "orange"
                          }
                        />
                      </div>
                      <div style={{ paddingLeft: "10px", width: "100%" }}>
                        <Autocomplete
                          popupIcon={<ExpandMore style={{ color: "black" }} />}
                          options={this.props.getDegreeList || []}
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
                              className={"degree_style"}
                              label="Degree"
                              InputLabelProps={{ shrink: true }}
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
                        marginTop: "15px",
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
                            this.state.verificationstatus &&
                            this.state.verificationstatus.length > 0 &&
                            this.verifiedstatus("ugDepartment")
                              .verificationStatus === "Verified"
                              ? "green"
                              : "orange"
                          }
                        />
                      </div>
                      <div style={{ paddingLeft: "10px", width: "100%" }}>
                        <Autocomplete
                          popupIcon={<ExpandMore style={{ color: "black" }} />}
                          options={this.props.getBranchesList || []}
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
                              className={"field_style"}
                              label="Field Of Study"
                              InputLabelProps={{ shrink: true }}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </Grid>
                  {this.props.StudentStepDetailsList.referProductCodeName ===
                    "ACS_MBA" ||
                  this.props.StudentStepDetailsList.referProductCodeName ===
                    "ACS MIM" ? (
                    <Grid item md={4}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          marginTop: "15px",
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
                              this.state.verificationstatus &&
                              this.state.verificationstatus.length > 0 &&
                              this.verifiedstatus("ugCollege")
                                .verificationStatus === "Verified"
                                ? "green"
                                : "orange"
                            }
                          />
                        </div>
                        <div style={{ paddingLeft: "10px", width: "100%" }}>
                          <Autocomplete
                            popupIcon={
                              <ExpandMore style={{ color: "black" }} />
                            }
                            options={this.props.getAllCollegesList || []}
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
                                className={"field_style"}
                                InputLabelProps={{ shrink: true }}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </Grid>
                  ) : (
                    ""
                  )}
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
                          className={"package_style"}
                          InputLabelProps={{ shrink: true }}
                          value={this.state.package}
                          onChange={(e) => this.handlechange(e)}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <TextField
                            label="Enrollment Period"
                            value={this.state.enrollmentdate}
                            type="month"
                            disabled
                            name="enrollmentdate"
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            onChange={(newValue) =>
                              this.setState({ enrollmentdate: newValue })
                            }
                            className={"package_style"}
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
                          className={"package_style"}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <Autocomplete
                          popupIcon={<ExpandMore style={{ color: "black" }} />}
                          options={this.intakevalue}
                          disabled
                          getOptionLabel={(option) => option.title}
                          name="intake"
                          value={this.state.intake}
                          InputLabelProps={{ shrink: true }}
                          onChange={(e, newValue) => {
                            this.setState({
                              intake: newValue,
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="intake"
                              label="Intake"
                              className={"work_style"}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              {/* button */}
              <Grid
                container
                style={{ height: 70, display: "flex", alignSelf: "flex-end" }}
              >
                <Grid item md={12}>
                  <hr />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                  sm={12}
                  xl={12}
                  lg={12}
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    // backgroundColor:"yellow"
                  }}
                >
                  <div>
                    <PrimaryButton
                      variant={"contained"}
                      color={"primary"}
                      onClick={() => {
                        this.state.commentshistory.length > 0
                          ? this.handleopen()
                          : this.handlesaved();
                      }}
                      style={{
                        width: "100px",
                        display: "flex",
                        marginRight: "10px",
                        // alignItems: "flex-end",
                      }}
                    >
                      Save
                    </PrimaryButton>
                  </div>
                </Grid>
              </Grid>
              <Dialog open={this.state.dialog} maxWidth={"sm"}>
                <DialogTitle>
                  <Grid container>
                    <Grid item md={12} align="left">
                      <Typography style={{ fontSize: "19px" }}>
                        Change Verification
                      </Typography>
                    </Grid>
                    <Grid item md={12}>
                      <hr />
                    </Grid>
                    <Grid item md={12}>
                      <Typography
                        style={{ color: "#595351", fontSize: "14px" }}
                      >
                        We see that you have made changes to{" "}
                        {this.state.commentshistory.map((data, index) => {
                          return this.state.fieldname[data.fieldName] + ",";
                        })}{" "}
                        Would you like to comment?
                      </Typography>
                    </Grid>
                  </Grid>
                </DialogTitle>
                <DialogContent>
                  <Grid container spacing={1}>
                    {this.state.commentshistory.map((data, index) => {
                      return (
                        <>
                          <Grid item md={12} style={{ marginTop: "15px" }}>
                            <Typography>Old Name</Typography>
                          </Grid>
                          <Grid item md={6} style={{ color: "grey" }}>
                            Enter {this.state.fieldname[data.fieldName]}
                          </Grid>
                          <Grid item md={6} style={{ fontWeight: "bold" }}>
                            {data.oldValue !== null &&
                            typeof data.oldValue === "object"
                              ? data.oldValue.name
                              : data.oldValue}
                          </Grid>
                          <Grid item md={12} style={{ marginTop: "15px" }}>
                            New Name
                          </Grid>
                          <Grid item md={6} style={{ color: "grey" }}>
                            Enter {this.state.fieldname[data.fieldName]}
                          </Grid>
                          <Grid item md={6} style={{ fontWeight: "bold" }}>
                            {data.newValue !== null &&
                            typeof data.newValue === "object"
                              ? data.newValue.name
                              : data.newValue}
                          </Grid>
                          <Grid item md={12} style={{ marginTop: "12px" }}>
                            <TextField
                              fullWidth
                              label="Comments"
                              name="comment"
                              value={this.state.comments}
                              InputLabelProps={{ shrink: true }}
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
                    <Grid item md={12}>
                      <hr />
                    </Grid>
                    <Grid item md={8}></Grid>

                    <Grid item md={4}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginLeft: "-10%",
                        }}
                      >
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
              <CommentDialog
                open={this.state.commentdialogopen}
                data={this.state.commentUpdateList}
                onClose={() => this.setState({ commentdialogopen: false })}
                fieldname={this.state.fieldname}
              />

              <Menu
                style={{ top: "25px" }}
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
          </Grid>

          {/* right container */}
          <Grid item md={5}>
            <Card>
              <CvViewer doctype={"cv"} {...this.props} />
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const useStyles = (theme) => ({
  root: {
    paddingLeft: "10px",
  },
  leftcontainer: {
    height: "89vh",
    overflowY: "scroll",
    [theme.breakpoints.only("lg")]: {
      height: "95vh",
    },
  },
});
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
    commentHistory: state.ProfileGapAnalysisReducer.commentHistory,
    updatestatusList: state.ProfileGapAnalysisReducer.updatestatus,
    updategeneraldetailsList:
      state.ProfileGapAnalysisReducer.updategeneraldetails,
    getAllBranchList: state.AspirationReducer.allBranchList,
    getAllDegreeList: state.AspirationReducer.allDegreeList,
    StudentStepDetailsList: state.StudentReducer.StudentStepDetails,
    getlocationList: state.StudentReducer.aspirationLocation,
    getPackagelist: state.StudentReducer.aspirationPackage,
    getWorkList: state.StudentReducer.aspirationWork,
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
  getCommentHistory,
  updategeneraldetails,
  getAllBranch,
  getAllDegree,
  StudentStepDetails,
  getAspirationLocation,
  getAspirationPackage,
  getAspirationWork,
})(withStyles(useStyles)(GeneralDetails));
