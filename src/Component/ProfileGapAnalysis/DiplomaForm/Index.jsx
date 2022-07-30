import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllColleges,
  getBranches,
  getUniversity,
} from "../../../Actions/College";
import { getAllDegrees } from "../../../Actions/Degree";
import { getAcademicType, isClickedSem } from "../../../Actions/HelperAction";
import {
  saveAcademicDetails,
  viewAcademicDetails,
} from "../../../Actions/ProfileGapAction";
import { URL } from "../../../Actions/URL";
import Mysnack from "../../MySnackBar";
import { isEmptyString } from "../../Validation";
import BottomButton from "../BottomButton";
import "./DiplomaForm.css";
import MarkSheetUpload from "./MarkSheetUpload";
import ViewDetails from "./ViewDetails";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      collegeName: "",
      departmentName: "",
      scoreScale: {},
      universityName: "",
      Batch: "",
      degreeName: "",
      score: "",
      scoreScale: "",
      list: {
        diploma: "Diploma",
        ug: "Undergraduate",
        pg: "Postgraduate",
      },
      scoreScaleErr: "",
      collegeNameErr: "",
      departmentNameErr: "",
      universityNameErr: "",
      scoreErr: "",
      degreeNameErr: "",
      // snack message
      snackMsg: "",
      snackVariant: "",
      snackOpen: false,
    };
  }

  componentDidMount() {
    this.props.getAllColleges();
    this.props.getBranches();
    this.props.getUniversity();
    this.props.getAllDegrees();
    this.props.viewAcademicDetails(
      this.props.match.params.studentId,
      this.props.academicTypes,
      (response) => {
        this.setState({
          data: response && response.data,
          collegeName: response && response.data.college,
          departmentName: response && response.data.department,
          universityName: response && response.data.university,
          scoreScale: response && response.data.scoreScale,
          score: response && response.data.score,
          degreeName: response && response.data.degree,
        });
      }
    );
  }

  gpaScale = [
    { title: "10", value: 10 },
    { title: "7", value: 7 },
    { title: "4", value: 4 },
    { title: "%", value: 100 },
  ];

  handleSaveClick = () => {
    let hlptxt = "Please fill the required field";
    isEmptyString(this.state.collegeName)
      ? this.setState({ collegeNameErr: hlptxt })
      : this.setState({ collegeNameErr: "" });

    isEmptyString(this.state.departmentName)
      ? this.setState({ departmentNameErr: hlptxt })
      : this.setState({ departmentNameErr: "" });

    isEmptyString(this.state.universityName)
      ? this.setState({ universityNameErr: hlptxt })
      : this.setState({ universityNameErr: "" });

    isEmptyString(this.state.degreeName)
      ? this.setState({ degreeNameErr: hlptxt })
      : this.setState({ degreeNameErr: "" });

    isEmptyString(this.state.scoreScale)
      ? this.setState({ scoreScaleErr: hlptxt })
      : this.setState({ scoreScaleErr: "" });

    this.state.score?.length === 0
      ? this.setState({ scoreErr: hlptxt })
      : this.setState({ scoreErr: "" });

    if (
      !isEmptyString(this.state.collegeName) &&
      !isEmptyString(this.state.departmentName) &&
      !isEmptyString(this.state.universityName) &&
      ((this.props.academicTypes !== "diploma" &&
        !isEmptyString(this.state.degreeName)) ||
        this.props.academicTypes === "diploma") &&
      !isEmptyString(this.state.scoreScale) &&
      this.state.score.length !== 0
    )
      if (this.props.academicTypes === "diploma") {
        // alert("ok");
        let requestBody = {
          college: {
            name: this.state.collegeName.name,
          },
          university: {
            name: this.state.universityName.name,
          },
          department: {
            name: this.state.departmentName.name,
          },
          //  degree:{
          //      id: this.state.degree.id
          //  },
          scoreScale: parseInt(this.state.scoreScale),
          score: parseInt(this.state.score),
        };
        this.props.saveAcademicDetails(
          this.props.match.params.studentId,
          this.props.academicTypes,
          requestBody,
          (response) => {
            this.setState({
              snackMsg: "Saved Successfully",
              snackVariant: "success",
              snackOpen: true,
            });
            this.props.viewAcademicDetails(
              this.props.match.params.studentId,
              this.props.academicTypes,
              (response) => {
                this.setState({
                  data: response && response.data,
                  collegeName: response && response.data.college,
                  departmentName: response && response.data.department,
                  universityName: response && response.data.university,
                  scoreScale: response && response.data.scoreScale,
                  score: response && response.data.score,
                  degree: response && response.data.degree,
                });
              }
            );
          }
        );
      } else {
        let requestBody = {
          college: {
            name: this.state.collegeName?.name,
          },
          university: {
            name: this.state.universityName?.name,
          },
          department: {
            name: this.state.departmentName?.name,
          },
          degree: {
            id: this.state.degreeName?.id,
            name: this.state.degreeName?.name,
          },
          scoreScale: parseInt(this.state.scoreScale),
          score: parseInt(this.state.score),
        };
        this.props.saveAcademicDetails(
          this.props.match.params.studentId,
          this.props.academicTypes,
          requestBody,
          (response) => {
            this.setState({
              snackMsg: "Saved Successfully",
              snackVariant: "success",
              snackOpen: true,
            });
            this.props.viewAcademicDetails(
              this.props.match.params.studentId,
              this.props.academicTypes,
              (response) => {
                this.setState({
                  data: response && response.data,
                  collegeName: response && response.data.college,
                  departmentName: response && response.data.department,
                  universityName: response && response.data.university,
                  scoreScale: response && response.data.scoreScale,
                  score: response && response.data.score,
                  degree: response && response.data.degree,
                });
              }
            );
          }
        );
      }
  };

  //  markSheet(click) handle function
  handleCardClick = (data) => {
    this.props.isClickedSem({ data: data, number: Math.random });
  };

  handleClick = (data) => {
    window.open(
      URL +
        "/api/v1/files/download/" +
        this.props.match.params.studentId +
        "/" +
        data
    );
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleUniversityChange = (e, newValue) => {
    this.setState({
      universityName: newValue,
    });
  };
  handleDepartmentChange = (e, newValue) => {
    this.setState({
      departmentName: newValue,
    });
  };
  handleCollegeChange = (e, newValue) => {
    this.setState({
      collegeName: newValue,
    });
  };
  handleDegreeChange = (e, newValue) => {
    this.setState({
      degreeName: newValue,
    });
  };

  handlePercentageChange = (e, newValue) => {
    this.setState({
      scoreScale: newValue?.value,
    });
  };

  render() {
    return (
      <div>
        <Grid container position="relative" height="100vh">
          <Grid item md={12}>
            <Grid container>
              {/* View details */}
              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <ViewDetails
                  item={this.state.data}
                  gpaScale={this.gpaScale}
                  list={this.state.list}
                  collegeName={this.state.collegeName}
                  departmentName={this.state.departmentName}
                  universityName={this.state.universityName}
                  scoreScale={this.state.scoreScale}
                  score={this.state.score}
                  degreeName={this.state.degreeName}
                  allDegrees={this.props.allDegrees}
                  handleChange={(e) => this.handleChange(e)}
                  collegeResponse={this.props.collegeResponse}
                  departmentResponse={this.props.departmentResponse}
                  universityResponse={this.props.universityResponse}
                  handleUniversityChange={(e, newValue) =>
                    this.handleUniversityChange(e, newValue)
                  }
                  handleDepartmentChange={(e, newValue) =>
                    this.handleDepartmentChange(e, newValue)
                  }
                  handleCollegeChange={(e, newValue) =>
                    this.handleCollegeChange(e, newValue)
                  }
                  handleDegreeChange={(e, newValue) =>
                    this.handleDegreeChange(e, newValue)
                  }
                  handlePercentageChange={(e, newValue) =>
                    this.handlePercentageChange(e, newValue)
                  }
                  collegeNameErr={this.state.collegeNameErr}
                  universityNameErr={this.state.universityNameErr}
                  departmentNameErr={this.state.departmentNameErr}
                  degreeNameErr={this.state.degreeNameErr}
                  scoreScaleErr={this.state.scoreScaleErr}
                  scoreErr={this.state.scoreErr}
                />
              </Grid>

              {/* divider grid */}
              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <hr className={"divider"} />
              </Grid>

              {/* markSheet card */}
              {this.state.data &&
                this.state.data.semesterDetails.map((item) => (
                  <Grid
                    item
                    md={4}
                    xs={4}
                    sm={4}
                    xl={4}
                    lg={4}
                    spacing={3}
                    style={{ padding: "15px" }}
                  >
                    <MarkSheetUpload
                      {...this.props}
                      department={
                        this.state.data.department &&
                        this.state.data.department.name
                      }
                      university={
                        this.state.data.university &&
                        this.state.data.university.name
                      }
                      semester={item.semName}
                      markSheet={item.studentDocument.marksheetName}
                      score={item.score}
                      handleChange={() => {
                        this.handleCardClick(item.id);
                      }}
                      handleDownloadClick={(e) => {
                        e.stopPropagation();
                        this.handleClick(item.studentDocument.path);
                      }}
                      data={item}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>

          {/* divider and button grid */}

          <Grid
            item
            md={12}
            xs={12}
            sm={12}
            xl={12}
            lg={12}
            position="absolute"
            bottom="0px"
            width="100%"
          >
            <BottomButton handleChange={() => this.handleSaveClick()} />
          </Grid>
          <Mysnack
            snackMsg={this.state.snackMsg}
            snackVariant={this.state.snackVariant}
            snackOpen={this.state.snackOpen}
            onClose={() => this.setState({ snackOpen: false })}
          />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    academicTypes: state.HelperReducer.academicType,
    clickedSem: state.HelperReducer.clickedSem,
    collegeResponse: state.CollegeReducer.allCollegeList,
    universityResponse: state.CollegeReducer.University,
    departmentResponse: state.CollegeReducer.BranchList,
    allDegrees: state.DegreeReducer.allDegreeList,
  };
};
export default connect(mapStateToProps, {
  viewAcademicDetails,
  getAcademicType,
  saveAcademicDetails,
  isClickedSem,
  getAllColleges,
  getUniversity,
  getBranches,
  getAcademicType,
  getAllDegrees,
})(Index);
