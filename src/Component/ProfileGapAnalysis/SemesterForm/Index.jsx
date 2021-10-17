import React, { Component } from "react";
import ViewMarks from "./ViewMarks";
import ViewSemesterDetails from "./ViewSemesterDetails";
import { Grid, withStyles } from "@material-ui/core";
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
  getDegreeByType,
} from "../../../AsyncApiCall/Ppga";
import {
  getAllColleges,
  getUniversity,
  getBranches,
} from "../../../Actions/College";

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
      cgpaScale: "",
      subjectDetails: "",
      degreeResponse: "",
      filterFieldType: "",
      filterField: "",
      filterSubItem: "",
      degreeType: "",
      cgpaPercentage: "",
      degreeDetails: "",

      // viewMarks
      semesterGpa: "",
      semesterGpaErr: "",
      cgpa: "",
      cgpaErr: "",
      formulaEmployed: "",
      // formulaEmployedErr: "",
      percentage: "",
      // percentageErr: "",

      // snack message
      snackMsg: "",
      snackVariant: "",
      snackOpen: false,

      // filter
      search: "",
      studentMatch: [],
      distinctMatch: [],
      filterYear: "",
      // title
      list: {
        diploma: "Diploma",
        ug: "Undergraduate",
        pg: "Postgraduate",
      },
    };
  }

  handleSubItemClick = (subItem) => {
    console.log(subItem, "sssssssssssssssssssssssss");
    this.setState({
      filterSubItem: subItem,
    });
  };

  onMouseOver = (item) => {
    console.log(item, "vvvvvvvvvvvvvvvvvvvvvvvvv");
    this.setState({
      filterField: item,
    });
  };

  // Getting and setting student match list in state
  getAndSetStudentMatch = (submenu) => {
    console.log(this.state);
    console.log(this.state.filterField);
    console.log(this.state.filterSubItem);

    getSimilarStudentsByAcademic(
      this.props.match.params.studentId,
      this.props.academicTypes,
      this.state.filterField,
      submenu.id
    ).then((response) => {
      console.log(response);
      this.setState({
        studentMatch: (response && response.data.body.data) || [],
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
        distinctMatch: (response && response.data.body.data) || [],
      });
    });
  };

  getDegreeTypes = (type) => {
    getDegreeByType(type).then((response) => {
      console.log(response);
      this.setState({
        degreeResponse: response && response.data,
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
  // onYearClick = (year) => {
  //   this.getAndSetStudentMatch("&q=" + year);
  //   this.setState({
  //     filterYear: year,
  //   });
  // };

  // function to add the row in the table
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

  // function to delete the row in the table
  handleRowDelete = (oldData) => {
    if (oldData.subjectDetailsUgPgDiploma.id) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.props.deleteSemesterDetails(
            this.props.match.params.studentId,
            oldData.subjectDetailsUgPgDiploma.id,
            this.props.clickedSem.data,
            (response) => {
              if (response.status === 200) {
                this.props.viewSemesterDetails(
                  this.props.match.params.studentId,
                  this.props.clickedSem.data,
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

  // function to update the row in the table
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
      this.props.clickedSem.data,
      (response) => {
        this.setState({
          semesterData:
            response && response.data.data[0].studentSubjectDetails !== null
              ? response.data.data[0].studentSubjectDetails
              : [],
          cgpaScale:
            response && response.data.data[0].studentSemesterDetails.score,
          cgpaPercentage:
            response && response.data.data[0].studentSemesterDetails.scoreScale,
          collegeDetails: response && response.data.data[0].college,
          degreeDetails: response && response.data.data[0].degree,
          university: response && response.data.data[0].university,
          department: response && response.data.data[0].department,
          subjectDetails:
            response && response.data.data[0].studentSemesterDetails,
          pdfViewer: response && response.data.data[0].studentDocument[0].path,
          data: response && response.data,
          year: response && response.data.data[0].year,
          semesterGpa:
            response &&
            response.data.data[0].studentSemesterDetails.semesterGpa,
          cgpa: response && response.data.data[0].studentSemesterDetails.cgpa,
          formulaEmployed:
            response &&
            response.data.data[0].studentSemesterDetails.formulaEmployed,
          percentage:
            response && response.data.data[0].studentSemesterDetails.percentage,
          degreeType: response && response.data.data[0].diplomaType,
        });
      }
    );
    this.getAndSetStudentMatch("");
    this.getAndSetDistinctMatch("");
    this.props.getBranches();
    this.getDegreeTypes(this.props.academicTypes);
  }

  // save button click function
  handleSaveClick = () => {
    let hlpTxt = "Please fill the required field";
    console.log(this.state);
    isEmptyString(this.state.subjectDetails.semesterGpa)
      ? this.setState({ semesterGpaErr: hlpTxt })
      : this.setState({ semesterGpaErr: "" });
    isEmptyString(this.state.subjectDetails.cgpa)
      ? this.setState({ cgpaErr: hlpTxt })
      : this.setState({ cgpaErr: "" });
    // isEmptyString(this.state.formulaEmployed)
    //   ? this.setState({ formulaEmployedErr: hlpTxt })
    //   : this.setState({ formulaEmployedErr: "" });
    // isEmptyString(this.state.percentage)
    //   ? this.setState({ percentageErr: hlpTxt })
    //   : this.setState({ percentageErr: "" });

    if (
      !isEmptyString(this.state.subjectDetails.semesterGpa) &&
      !isEmptyString(this.state.subjectDetails.cgpa)
      // !isEmptyString(this.state.formulaEmployed) &&
      // !isEmptyString(this.state.percentage)
    ) {
      console.log("======================");
      let requestBody = {
        studentSemesterDetails: {
          id: this.state.subjectDetails.id,
          semester: this.state.subjectDetails.semester,
          score: this.state.subjectDetails.score,
          scoreScale: this.state.subjectDetails.scoreScale,
          semesterGpa: this.state.subjectDetails.semesterGpa,
          cgpa: this.state.subjectDetails.cgpa,
          formulaEmployed: this.state.subjectDetails.formulaEmployed,
          percentage: this.state.subjectDetails.percentage,

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
            this.props.clickedSem.data,
            (response) => {
              this.setState({
                semesterData:
                  response &&
                  response.data.data[0].studentSubjectDetails !== null
                    ? response.data.data[0].studentSubjectDetails
                    : [],
                cgpaScale:
                  response &&
                  response.data.data[0].studentSemesterDetails.score,
                cgpaPercentage:
                  response &&
                  response.data.data[0].studentSemesterDetails.scoreScale,

                collegeDetails: response && response.data.data[0].college,
                degreeDetails: response && response.data.data[0].degree,
                university: response && response.data.data[0].university,
                department: response && response.data.data[0].department,
                degreeType: response && response.data.data[0].diplomaType,
                subjectDetails:
                  response && response.data.data[0].studentSemesterDetails,
                pdfViewer:
                  response && response.data.data[0].studentDocument[0].path,
                data: response && response && response.data,
                year: response.data.data[0].year,
                semesterGpa:
                  response &&
                  response.data.data[0].studentSemesterDetails.semesterGpa,
                cgpa:
                  response && response.data.data[0].studentSemesterDetails.cgpa,
                formulaEmployed:
                  response &&
                  response.data.data[0].studentSemesterDetails.formulaEmployed,
                percentage:
                  response &&
                  response.data.data[0].studentSemesterDetails.percentage,
              });
            }
          );
        }
      );
    }
  };

  // view marks - textfield handle function
  handleScoreChange = (e) => {
    this.setState({
      subjectDetails: {
        ...this.state.subjectDetails,
        [e.target.name]: e.target.value,
      },
    });
  };

  // function to handle the back button click
  handleBackClick = () => {
    this.props.isClickedBack(true);
  };

  render() {
    const { classes } = this.props;
    console.log(this.state, "--------------------------");
    console.log(this.state.studentMatch);

    // table columns
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

          <Mysnack
            snackMsg={this.state.snackMsg}
            snackVariant={this.state.snackVariant}
            snackOpen={this.state.snackOpen}
            onClose={() => this.setState({ snackOpen: false })}
          />

          {/* filter */}
          <SimilarityPopup
            // handleYearClick={this.onYearClick}
            searchValue={this.state.search}
            searchHandler={this.searchHandler}
            distinctMatch={
              this.state.distinctMatch !== null ? this.state.distinctMatch : []
            }
            data={
              this.state.studentMatch !== null ? this.state.studentMatch : []
            }
            department={this.props.departmentResponse}
            degree={this.state.degreeResponse}
            onMouseOver={this.onMouseOver}
            handleSubMenuClick={this.handleSubItemClick}
            getStudentMatch={this.getAndSetStudentMatch}
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
              >
                {/* semester details - (above the table) */}
                <ViewSemesterDetails
                  // data={this.state.semesterData}
                  collegeName={this.state.collegeDetails}
                  universityName={this.state.university}
                  departmentName={this.state.department}
                  cgpaScale={this.state.cgpaScale}
                  cgpaPercentage={this.state.cgpaPercentage}
                  semName={this.state.subjectDetails.semName}
                  year={this.state.year}
                  backHandler={this.props.backHandler}
                  list={this.state.list}
                  degree={this.state.degreeType}
                  degreeType={this.state.degreeDetails}
                />

                {/* table */}
                <TableGrid
                  columns={columns}
                  data={this.state.semesterData || []}
                  onRowDelete={this.handleRowDelete}
                  onRowUpdate={this.handleRowUpdate}
                  onRowAdd={this.handleRowAdd}
                />

                {/* view marks -( below the table) */}
                <ViewMarks
                  semesterGpa={this.state.subjectDetails.semesterGpa}
                  gpaError={this.state.semesterGpaErr}
                  cgpa={this.state.subjectDetails.cgpa}
                  cgpaError={this.state.cgpaErr}
                  formulaEmployed={this.state.subjectDetails.formulaEmployed}
                  formulaError={this.state.formulaEmployedErr}
                  percentage={this.state.subjectDetails.percentage}
                  percentageError={this.state.percentageErr}
                  handleChange={(e) => this.handleScoreChange(e)}
                />
              </Grid>

              {/* bottom - diver and save button grid */}
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
    departmentResponse: state.CollegeReducer.BranchList,
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
  getDegreeByType,
  getAllColleges,
  getUniversity,
  getBranches,
})(withStyles(useStyles)(Index));
