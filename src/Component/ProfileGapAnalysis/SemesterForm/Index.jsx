import React, { Component } from "react";
import ViewMarks from "./ViewMarks";
import ViewSemesterDetails from "./ViewSemesterDetails";
import { Grid  ,withStyles } from "@material-ui/core";
import "../DiplomaForm/DiplomaForm.css";
import BottomButton from "../BottomButton";
import CvViewer from "../CvViewer";
import TableGrid from "../../../Utils/EditableTable";
import { connect } from "react-redux";
import {
  viewSemesterDetails,
  deleteSemesterDetails,
  saveSemesterDetails,
} from "../../../Actions/ProfileGapAction";
import { isClickedSem, getAcademicType } from "../../../Actions/HelperAction";
import { isEmptyObject, isEmptyString } from "../../Validation";
import { HELPER_TEXT } from "../../../Constant/Variables";
import Mysnack from "../../MySnackBar";
import SimilarityPopup from "../SimilarityPopup";
import {
  getSimilarStudentsByAcademic,
  getDistinctSubjectsByAcademic,
} from "../../../AsyncApiCall/Ppga";


class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pdfViewer: "",
      data: "",
      semesterData: "",
      collegeDetails: "",
      university: "",
      year: "",
      department: "",
      score: "",
      subjectDetails: "",

      // viewMarks
      semesterGpa: "",
      semesterGpaErr: "",
      cgpa: "",
      cgpaErr: "",
      formulaEmployed: "",
      formulaEmployedErr: "",
      percentage: "",
      percentageErr: "",

      // snack message
      snackMsg: "",
      snackVariant: "",
      snackOpen: false,

      // filter
      search: "",
      studentMatch: [],
      distinctMatch: [],
      filterYear: "",
    };
  }

  // Getting and setting student match list in state
  getAndSetStudentMatch = (year) => {
    getSimilarStudentsByAcademic(
      this.props.match.params.studentId,
      this.props.academicTypes,
      year
    ).then((response) => {
      this.setState({
        studentMatch: response&&response.data && response.data.data || [],
      });
    });
  };

  // Getting and setting distinct match list in state
  getAndSetDistinctMatch = (query) => {
    getDistinctSubjectsByAcademic(
      this.props.match.params.studentId,
      this.props.academicTypes,
      query
    ).then((response) => {
      this.setState({
        distinctMatch: response&&response.data && response.data.data || [],
      });
    });
  };

  // This function handles the search functionality
  searchHandler = (e) => {
    //  If the textbox is empty it will return all results
    if (e.target.value.length !== 0) {
      this.getAndSetDistinctMatch("&q=" + e.target.value);
    } else {
      this.getAndSetDistinctMatch("");
    }
    this.setState({
      search: e.target.value,
    });
  };
  // This function handles the filter based on year
  onYearClick = (year) => {
    this.getAndSetStudentMatch("&q=" + year);
    this.setState({
      filterYear: year,
    });
  };

  handleRowAdd = (newData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setState({
          semesterData: [...this.state.semesterData, newData],
        });
        resolve();
      }, 1000);
    });
  };

  handleRowDelete = (oldData) => {
    if (oldData.subjectDetailsUgPgDiploma.id) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.props.deleteSemesterDetails(
            this.props.match.params.studentId,
            oldData.subjectDetailsUgPgDiploma.id,
            this.props.clickedSem,
            (response) => {
              if (response.status === 200) {
                this.props.viewSemesterDetails(
                  this.props.match.params.studentId,
                  this.props.clickedSem,
                  (response) => {
                    this.setState({
                      semesterData: response.data.data[0].studentSubjectDetails,
                    });
                  }
                );
              }
            }
          );

          resolve();
        }, 1000);
      });
    } else {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataDelete = [...this.state.semesterData];
          const index = oldData.tableData.id;
          dataDelete.splice(index, 1);
          // setData([...dataDelete]);
          this.setState({
            semesterData: [...dataDelete],
          });
          resolve();
        }, 1000);
      });
    }
  };

  handleRowUpdate = (newData, oldData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const dataUpdate = [...this.state.semesterData];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        // setData([...dataUpdate]);
        this.setState({
          semesterData: [...dataUpdate],
        });
        resolve();
      }, 1000);
    });
  };

  componentDidMount() {
    this.props.viewSemesterDetails(
      this.props.match.params.studentId,
      this.props.clickedSem,
      (response) => {
        this.setState({
          semesterData:
            response.data.data[0].studentSubjectDetails !== null
              ? response.data.data[0].studentSubjectDetails
              : [],
          score: response.data.data[0].studentSemesterDetails.score,
          collegeDetails: response.data.data[0].college,
          degreeDetails: response.data.data[0].degree,
          university: response.data.data[0].university,
          department: response.data.data[0].department,
          subjectDetails: response.data.data[0].studentSemesterDetails,
          pdfViewer: response.data.data[0].studentDocument[0].path,
          data: response.data,
          year: response.data.data[0].year,
        });
      }
    );
    this.getAndSetStudentMatch("");
    this.getAndSetDistinctMatch("");
 
  }

  handleSaveClick = () => {
    let hlpTxt = "Please fill the required field";
    isEmptyString(this.state.semesterGpa)
      ? this.setState({ semesterGpaErr: hlpTxt })
      : this.setState({ semesterGpaErr: "" });
    isEmptyString(this.state.cgpa)
      ? this.setState({ cgpaErr: hlpTxt })
      : this.setState({ cgpaErr: "" });
    isEmptyString(this.state.formulaEmployed)
      ? this.setState({ formulaEmployedErr: hlpTxt })
      : this.setState({ formulaEmployedErr: "" });
    isEmptyString(this.state.percentage)
      ? this.setState({ percentageErr: hlpTxt })
      : this.setState({ percentageErr: "" });

    if (
      !isEmptyString(this.state.semesterGpa) &&
      !isEmptyString(this.state.cgpa) &&
      !isEmptyString(this.state.formulaEmployed) &&
      !isEmptyString(this.state.percentage)
    ) {
      let requestBody = {
        studentSemesterDetails: {
          id: this.state.subjectDetails.id,
          semester: this.state.subjectDetails.semester,
          score: this.state.subjectDetails.score,
          scoreScale: this.state.subjectDetails.scoreScale,
          semesterGpa: this.state.semesterGpa,
          cgpa: this.state.cgpa,
          formulaEmployed: this.state.formulaEmployed,
          percentage: this.state.percentage,

          college: {
            id: this.state.collegeDetails.id,
          },
          // degree: {
          //     id: this.state.degree.id
          // },
          department: {
            id: this.state.department.id,
          },
          university: {
            id: this.state.university.id,
          },
        },
        studentSubjectDetails: this.state.semesterData,
      };
      this.props.saveSemesterDetails(
        this.props.match.params.studentId,
        this.props.academicTypes,
        requestBody,
        (response) => {
          this.setState({
            snackMsg: "Saved Successfully",
            snackVariant: "success",
            snackOpen: true,
          });
          this.props.viewSemesterDetails(
            this.props.match.params.studentId,
            this.props.clickedSem,
            (response) => {
              this.setState({
                semesterData:
                  response.data.data[0].studentSubjectDetails !== null
                    ? response.data.data[0].studentSubjectDetails
                    : [],
                score: response.data.data[0].studentSemesterDetails.score,
                collegeDetails: response.data.data[0].college,
                degreeDetails: response.data.data[0].degree,
                university: response.data.data[0].university,
                department: response.data.data[0].department,
                subjectDetails: response.data.data[0].studentSemesterDetails,
                pdfViewer: response.data.data[0].studentDocument[0].path,
                data: response.data,
                year: response.data.data[0].year,
              });
            }
          );
        }
      );

    }
  };

  handleScoreChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleBackClick = () => {
    this.props.isClickedBack(true);
    console.log("object----------------");
  };

  render() {
    const {classes} = this.props
   
    const columns = [
      {
        title: "Id",
        field: "id",
        hidden: true,
      },
      {
        title: "Subject Code",
        field: "subjectDetailsUgPgDiploma.subjectCode",
        render: (rowData, renderType) =>
          renderType === "row"
            ? rowData.subjectDetailsUgPgDiploma.subjectCode
            : "",
        validate: (rowData) => {
          if (!isEmptyObject(rowData)) {
            if (!isEmptyString(rowData.subjectDetailsUgPgDiploma.subjectCode)) {
              return true;
            } else {
              return { isValid: false, helperText: HELPER_TEXT.requiredField };
            }
          }
        },
      },
      {
        title: "Subject Name",
        field: "subjectDetailsUgPgDiploma.subjectName",
        render: (rowData, renderType) =>
          renderType === "row"
            ? rowData.subjectDetailsUgPgDiploma.subjectName
            : "",
        validate: (rowData) => {
          if (!isEmptyObject(rowData)) {
            if (!isEmptyString(rowData.subjectDetailsUgPgDiploma.subjectName)) {
              return true;
            } else {
              return { isValid: false, helperText: HELPER_TEXT.requiredField };
            }
          }
        },
      },
      {
        title: "Grade Points",
        field: "gradePoints",
        render: (rowData, renderType) =>
          renderType === "row" ? rowData.gradePoints : "",
        validate: (rowData) => {
          if (!isEmptyObject(rowData)) {
            if (!isEmptyString(rowData.gradePoints)) {
              return true;
            } else {
              return { isValid: false, helperText: HELPER_TEXT.requiredField };
            }
          }
        },
      },
      {
        title: "Credit",
        field: "credit",
        render: (rowData, renderType) =>
          renderType === "row" ? rowData.credit : "",
        validate: (rowData) => {
          if (!isEmptyObject(rowData)) {
            if (!isEmptyString(rowData.credit)) {
              return true;
            } else {
              return { isValid: false, helperText: HELPER_TEXT.requiredField };
            }
          }
        },
      },
      {
        title: "Type",
        field: "subjectDetailsUgPgDiploma.type",
        render: (rowData, renderType) =>
          renderType === "row" ? rowData.subjectDetailsUgPgDiploma.type : "",
        validate: (rowData) => {
          if (!isEmptyObject(rowData)) {
            if (!isEmptyString(rowData.subjectDetailsUgPgDiploma.type)) {
              return true;
            } else {
              return { isValid: false, helperText: HELPER_TEXT.requiredField };
            }
          }
        },
      },
      {
        title: "Result",
        field: "result",
        render: (rowData, renderType) =>
          renderType === "row" ? rowData.result : "",
        validate: (rowData) => {
          if (!isEmptyObject(rowData)) {
            if (!isEmptyString(rowData.result)) {
              return true;
            } else {
              return { isValid: false, helperText: HELPER_TEXT.requiredField };
            }
          }
        },
      },
      {
        title: "Pass/Fail",
        field: "subjectDetailsUgPgDiploma.passOrFail",
        render: (rowData, renderType) =>
          renderType === "row"
            ? rowData.subjectDetailsUgPgDiploma.passOrFail
            : "",
        validate: (rowData) => {
          if (!isEmptyObject(rowData)) {
            if (!isEmptyString(rowData.subjectDetailsUgPgDiploma.passOrFail)) {
              return true;
            } else {
              return { isValid: false, helperText: HELPER_TEXT.requiredField };
            }
          }
        },
      },
    ];

    return (
      <div>
        <Grid container position="relative" height="100vh">
          {/*  left container*/}

          {/* semester details */}
          <Mysnack
            snackMsg={this.state.snackMsg}
            snackVariant={this.state.snackVariant}
            snackOpen={this.state.snackOpen}
            onClose={() => this.setState({ snackOpen: false })}
          />

          {/* filter */}
          <SimilarityPopup
            handleYearClick={this.onYearClick}
            searchValue={this.state.search}
            searchHandler={this.searchHandler}
            distinctMatch={
              this.state.distinctMatch !== null ? this.state.distinctMatch : []
            }
            data={
              this.state.studentMatch !== null ? this.state.studentMatch : []
            }
          />

          <Grid item md={7} xs={7} sm={7} xl={7} lg={7}>
            <Grid container>
              <Grid
                item
                md={12}
                xs={12}
                sm={12}
                xl={12}
                lg={12}
                className={classes.container}
                // style={{
                //   height: "95vh",
                //   overflowY: "scroll",
                //   overflowX: "hidden",
                //   width: "100%",
                // }}
              >
                <ViewSemesterDetails
                  // data={this.state.semesterData}
                  collegeName={this.state.collegeDetails}
                  universityName={this.state.university}
                  departmentName={this.state.department}
                  score={this.state.score}
                  semName={this.state.subjectDetails.semName}
                  year={this.state.year}
                  backHandler={this.props.backHandler}
                />

                <TableGrid
                  columns={columns}
                  data={this.state.semesterData || []}
                  onRowDelete={this.handleRowDelete}
                  onRowUpdate={this.handleRowUpdate}
                  onRowAdd={this.handleRowAdd}
                />
                <ViewMarks
                  semesterGpa={this.state.semesterGpa}
                  gpaError={this.state.semesterGpaErr}
                  cgpa={this.state.cgpa}
                  cgpaError={this.state.cgpaErr}
                  formulaEmployed={this.state.formulaEmployed}
                  formulaError={this.state.formulaEmployedErr}
                  percentage={this.state.percentage}
                  percentageError={this.state.percentageErr}
                  handleChange={(e) => this.handleScoreChange(e)}
                />
              </Grid>

              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <BottomButton handleChange={() => this.handleSaveClick()} />
              </Grid>
            </Grid>
          </Grid>

          {/* right container - markSheet */}
          <Grid item md={5} xs={5} sm={5} xl={5} lg={5}>
            <CvViewer path={this.state.pdfViewer} {...this.props} />
          </Grid>
        </Grid>
      </div>
    );
  }
}


const useStyles = (theme) => ({
  root: {
    "& .MuiFormLabel-root": {
      fontSize: "13px !important",
    },
  },
  container: {
    height: "95vh",
    overflowY: "scroll",
    overflowX: "hidden",
    width: "100%",
  },
 
 
});
const mapStateToProps = (state) => {
  return {
    clickedSem: state.HelperReducer.clickedSem,
    academicTypes: state.HelperReducer.academicType,
  };
};

export default connect(mapStateToProps, {
  viewSemesterDetails,
  isClickedSem,
  deleteSemesterDetails,
  saveSemesterDetails,
  getAcademicType,
  getSimilarStudentsByAcademic,
  getDistinctSubjectsByAcademic,
})(withStyles(useStyles)(Index));
