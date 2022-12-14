import React, { Component } from "react";
import ViewMarks from "./ViewMarks";
import ViewSemesterDetails from "./ViewSemesterDetails";
import { Grid, withStyles, Button } from "@material-ui/core";
import "../DiplomaForm/DiplomaForm.css";
import BottomButton from "../BottomButton";
import CvViewer from "../CvViewer";
import TableGrid from "../../../Utils/EditableTable";
import { connect } from "react-redux";
import {
  viewSemesterDetails,
  deleteSemesterDetails,
  saveSemesterDetails,
  updateCalculation,
} from "../../../Actions/ProfileGapAction";
import {
  isClickedSem,
  getAcademicType,
  saveTemplate,
  saveCopyData,
} from "../../../Actions/HelperAction";
import { isEmptyObject, isEmptyString, isNanAndEmpty } from "../../Validation";
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
import MySnackBar from "../../MySnackBar";
import DropDown from "../../../Component/Controls/DropDown";
import TextFieldComponent from "../../../Component/Controls/TextField";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pdfViewer: "",
      data: [],
      semesterData: [],
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
      // semesterGpa: "",
      // semesterGpaErr: "",
      sgpaErr: "",

      // cgpa: "",
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
      // title
      list: {
        diploma: "Diploma",
        ug: "Undergraduate",
        pg: "Postgraduate",
      },
    };
  }

  onMouseOver = (item) => {
    this.setState({
      filterField: item,
    });
  };

  // Getting and setting student match list in state
  getAndSetStudentMatch = (submenu) => {
    if (submenu.id) {
      getSimilarStudentsByAcademic(
        this.props.match.params.studentId,
        this.props.academicTypes,
        this.state.filterField.name,
        submenu.id
      ).then((response) => {
        if (response.data && response.data.body.success) {
          this.setState({
            studentMatch: (response && response.data.body.data) || [],
          });
        } else {
          this.setState({
            snackMsg: "The Given Filter is not Found",
            snackVariant: "error",
            snackOpen: true,
          });
        }
      });
    }
  };

  // Getting and setting distinct match list in state
  getAndSetDistinctMatch = (query) => {
    getDistinctSubjectsByAcademic(
      this.props.match.params.studentId,
      this.props.academicTypes,
      query
    ).then((response) => {
      if (response.status === 200) {
        this.setState({
          distinctMatch: (response && response.data.body.data) || [],
        });
      }
    });
  };

  getDegreeTypes = (type) => {
    getDegreeByType(type).then((response) => {
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
                    if (response.status === 200) {
                      this.setState({
                        semesterData:
                          response.data.data.studentSubjectDetails &&
                          response.data.data.studentSubjectDetails,
                      });
                    }
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

  fetchData = (response) => {
    if (response.data && response.data.success) {
      this.setState({
        semesterData:
          response && response.data.data.studentSubjectDetails !== null
            ? response.data.data.studentSubjectDetails
            : [],
        cgpaScale: response && response.data.data.studentSemesterDetails.score,
        cgpaPercentage:
          response && response.data.data.studentSemesterDetails.scoreScale,
        collegeDetails: response && response.data.data.college,
        degreeDetails: response && response.data.data.degree,
        university: response && response.data.data.university,
        department: response && response.data.data.department,
        subjectDetails: response && response.data.data.studentSemesterDetails,
        pdfViewer: response && response.data.data.studentDocument[0].path,
        data: response && response.data.data,
        year: response && response.data.data.year,
        // semesterGpa:
        //   response && response.data.data.studentSemesterDetails.sgpa,
        // cgpa: response && response.data.data.studentSemesterDetails.cgpa,
        formulaEmployed:
          response && response.data.data.studentSemesterDetails.formulaEmployed,
        percentage:
          response && response.data.data.studentSemesterDetails.percentage,
        degreeType: response && response.data.data.diplomaType,
      });
    }
  };

  handleSubItemClick = (subItem) => {
    this.setState({
      filterSubItem: subItem,
    });
    this.getAndSetStudentMatch("");
    this.getAndSetDistinctMatch("");
  };

  componentDidMount() {
    this.props.viewSemesterDetails(
      this.props.match.params.studentId,
      this.props.clickedSem.data,
      this.fetchData
    );

    this.props.getBranches();
    this.getDegreeTypes(this.props.academicTypes);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.copy !== prevProps.copy) {
      if (typeof this.props.copy !== "string") {
        if (!Array.isArray(this.props.copy)) {
          if (
            this.state.semesterData.filter(
              (el) =>
                el.subjectDetailsUgPgDiploma.subjectCode ===
                this.props.copy.subjectDetailsUgPgDiploma.subjectCode
            ).length === 0
          ) {
            var joinedData = this.state.semesterData.concat(this.props.copy);
            this.setState({
              semesterData: joinedData,
            });
            this.props.saveCopyData("");
          }
        } else {
          this.setState({
            semesterData: this.props.copy,
          });
          this.props.saveTemplate(this.props.copy);
          this.props.saveCopyData("");
        }
      }
    }
  }

  // save button click function
  handleSaveClick = () => {
    let hlpTxt = "Please fill the required field";
    isEmptyString(this.state.collegeName)
      ? this.setState({ collegeNameErr: hlpTxt })
      : this.setState({ collegeNameErr: "" });

    isEmptyString(this.state.departmentName)
      ? this.setState({ departmentNameErr: hlpTxt })
      : this.setState({ departmentNameErr: "" });

    isEmptyString(this.state.universityName)
      ? this.setState({ universityNameErr: hlpTxt })
      : this.setState({ universityNameErr: "" });

    isEmptyString(this.state.degree)
      ? this.setState({ degreeErr: hlpTxt })
      : this.setState({ degreeErr: "" });

    isEmptyString(this.state.subjectDetails.sgpa)
      ? this.setState({ sgpaErr: hlpTxt })
      : this.state.subjectDetails.sgpa <= 0
      ? this.setState({ sgpaErr: "It cannot be zero or negative value" })
      : this.setState({ sgpaErr: "" });
    // this.setState({ sgpaErr: "" });

    isEmptyString(this.state.subjectDetails.cgpa)
      ? this.setState({ cgpaErr: hlpTxt })
      : this.state.subjectDetails.cgpa <= 0
      ? this.setState({ cgpaErr: "It cannot be zero or negative value" })
      : this.setState({ cgpaErr: "" });

    isEmptyString(this.state.subjectDetails.formulaEmployed)
      ? this.setState({ formulaEmployedErr: hlpTxt })
      : this.state.subjectDetails.formulaEmployed <= 0
      ? this.setState({
          formulaEmployedErr: "It cannot be zero or negative value",
        })
      : this.setState({ formulaEmployedErr: "" });
    // isEmptyString(this.state.subjectDetails.percentage)
    //   ? this.setState({ percentageErr: hlpTxt })
    //   : this.state.subjectDetails.percentage <= 0
    //   ? this.setState({ percentageErr: "It cannot be zero or negative value" })
    //   : this.setState({ percentageErr: "" });

    if (
      !isEmptyString(this.state.subjectDetails.sgpa) &&
      !(this.state.subjectDetails.sgpa <= 0) &&
      !isEmptyString(this.state.subjectDetails.cgpa) &&
      !(this.state.subjectDetails.cgpa <= 0) &&
      !isEmptyString(this.state.subjectDetails.formulaEmployed)
      // !(this.state.subjectDetails.formulaEmployed <= 0) &&
      // !isEmptyString(this.state.subjectDetails.percentage) &&
      // !(this.state.subjectDetails.percentage <= 0)
    ) {
      let requestBody = {
        studentSemesterDetails: {
          id: this.state.subjectDetails.id,
          semester: this.state.subjectDetails.semester,
          score: this.state.subjectDetails.score,
          scoreScale: this.state.subjectDetails.scoreScale,
          sgpa: this.state.subjectDetails.sgpa,
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
          if (response.data && response.data.success) {
            this.setState({
              snackMsg: "Saved Successfully",
              snackVariant: "success",
              snackOpen: true,
            });
            this.props.viewSemesterDetails(
              this.props.match.params.studentId,
              this.props.clickedSem.data,
              this.fetchData
            );
          } else {
            this.setState({
              snackMsg: "Same SubjectCode SubjectName is Already Added",
              snackVariant: "error",
              snackOpen: true,
            });
          }
        }
      );
    }
  };

  // view marks - textfield handle function
  handleScoreChange = (e) => {
    if (e.target.value >= 0) {
      this.setState({
        subjectDetails: {
          ...this.state.subjectDetails,
          [e.target.name]: e.target.value,
        },
        [e.target.name + "Err"]: "",
      });
    }
  };

  // function to handle the back button click
  handleBackClick = () => {
    this.props.isClickedBack(true);
  };

  // function to calculate sgpa
  handleSgpaClick = () => {
    // this.setState({
    //   subjectDetails : {
    //     ...this.state.subjectDetails,
    //     semesterGpa : "55"
    //   }
    // })
    this.props.updateCalculation(
      this.props.match.params.studentId,
      this.state.subjectDetails.semester,
      this.props.academicTypes,
      this.state.semesterData,
      (response) => {
        if(isNaN(response.data.data.sgpa)){
          this.setState({
            snackMsg: "Please fill the required field",
            snackVariant: "error",
            snackOpen: true,
          });
        }
        if (response.data.success) {
          this.setState({
            subjectDetails: {
              ...this.state.subjectDetails,
              sgpa: response.data.data.sgpa,
            },
          });
        }
      }
    );
  };

  // function to calculate cgpa
  handleCgpaClick = () => {
    // this.setState({
    //   subjectDetails : {
    //     ...this.state.subjectDetails,
    //     cgpa : "10"
    //   }
    // })
    this.props.updateCalculation(
      this.props.match.params.studentId,
      this.state.subjectDetails.semester,
      this.props.academicTypes,
      this.state.semesterData,
      (response) => {
        if(isNaN(response.data.data.cgpa)){
          this.setState({
            snackMsg: "Please fill the required field",
            snackVariant: "error",
            snackOpen: true,
          });
        }
        if (response.data.success) {
          this.setState({
            subjectDetails: {
              ...this.state.subjectDetails,
              cgpa: response.data.data.cgpa,
            },
          });
        }
      }
    );
  };

  examType = ["Practical", "Theory"];
  resultType = ["Pass", "Fail"];

  render() {
    const { classes } = this.props;
    
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
            if (
              !isEmptyString(
                rowData.subjectDetailsUgPgDiploma &&
                  rowData.subjectDetailsUgPgDiploma.subjectCode
              )
            ) {
              return true;
            } else {
              // this.setState({
              //   snackMsg : "Please fill the Required Field",
              //   snackOpen : true,
              //   snackVariant : "error"
              // })
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
            if (
              !isEmptyString(
                rowData.subjectDetailsUgPgDiploma &&
                  rowData.subjectDetailsUgPgDiploma.subjectName
              )
            ) {
              return true;
            } else {
              // this.setState({
              //   snackMsg : "Please fill the Required Field",
              //   snackOpen : true,
              //   snackVariant : "error"
              // })
              return { isValid: false, helperText: HELPER_TEXT.requiredField };
            }
          }
        },
      },
      {
        title: "Maximum Score",
        field: "maximumMarks",
        // type : "numeric",
        render: (rowData, renderType) =>
          renderType === "row" ? rowData.maximumMarks : "",
        validate: (rowData,e) => {
          if (!isEmptyObject(rowData)) {
            if (rowData.maximumMarks) {
              if (!isNanAndEmpty(rowData.maximumMarks)) {
                if (rowData.maximumMarks > 0) {
                  return true;
                } else {
                  return {
                    isValid: false,
                    helperText: "It cannot be zero or negative value",
                  };
                }
              } else {
                return { isValid: false };
              }
            } else {
              return { isValid: false, helperText: HELPER_TEXT.requiredField };
            }
          }
        },
      },
      {
        title: "Credit",
        field: "credit",
        // type : "numeric",
        render: (rowData, renderType) =>
          renderType === "row" ? rowData.credit : "",
        validate: (rowData) => {
          if (!isEmptyObject(rowData)) {
            if (rowData.credit) {
              if (!isNanAndEmpty(rowData.credit)) {
                if (rowData.credit > 0) {
                  return true;
                } else {
                  return {
                    isValid: false,
                    helperText: "It cannot be zero or negative value",
                  };
                }
              } else {
                return { isValid: false };
              }
            } else {
              return { isValid: false, helperText: HELPER_TEXT.requiredField };
            }
          }
        },
      },
      /**---------- */
      {
        title: "Type",
        field: "subjectDetailsUgPgDiploma.type",
        render: (rowData, renderType) =>
          renderType === "row" ? rowData.subjectDetailsUgPgDiploma.type : "",
        validate: (rowData) => {
          if (!isEmptyObject(rowData)) {
            if (
              !isEmptyString(
                rowData.subjectDetailsUgPgDiploma &&
                  rowData.subjectDetailsUgPgDiploma.type
              )
            ) {
              return true;
            } else {
              return { isValid: false };
            }
          }
        },

        editComponent: (props) => {
          return (
            <DropDown
              classes={{ root: classes.examTypeStyle }}
              id="combo-box-demo"
              options={this.examType}
              getOptionLabel={(option) => option}
              style={{ width: "100px" }}
              value={
                (props.rowData.subjectDetailsUgPgDiploma &&
                  props.rowData.subjectDetailsUgPgDiploma.type) ||
                ""
              }
              onChange={(e, value) => {
                props.onChange(value);
              }}
              renderInput={(params) => (
                <TextFieldComponent
                  // className={classes.examTypeStyle}
                  {...params}
                  error={
                    props.rowData.subjectDetailsUgPgDiploma &&
                    isEmptyObject(props.rowData.subjectDetailsUgPgDiploma.type)
                  }
                  label="Type"
                  variant="standard"
                  inputProps={{
                    ...params.inputProps,
                    onKeyDown: (e) => {
                          if (e.key === 'Enter') {
                            e.stopPropagation();
                          }
                    },
                  }}
                />
              )}
            />
          );
        },
      },

      {
        title: "Obtained Score",
        field: "score",
        // type : "numeric",
        render: (rowData, renderType) =>
          renderType === "row" ? rowData.score : "",
        validate: (rowData) => {
          if (!isEmptyObject(rowData)) {
            if (rowData.score) {
              if (!isNanAndEmpty(rowData.score)) {
                if (rowData.score > 0) {
                  return true;
                } else {
                  return {
                    isValid: false,
                    helperText: "It cannot be zero or negative value",
                  };
                }
              } else {
                return { isValid: false };
              }
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
            if (
              !isEmptyString(
                rowData.subjectDetailsUgPgDiploma &&
                  rowData.subjectDetailsUgPgDiploma.passOrFail
              )
            ) {
              return true;
            } else {
              return { isValid: false };
            }
          }
        },
        editComponent: (props) => {
          return (
            <DropDown
              classes={{ root: classes.examTypeStyle }}
              id="combo-box-demo"
              options={this.resultType}
              getOptionLabel={(option) => option}
              fullWidth
              value={
                (props.rowData.subjectDetailsUgPgDiploma &&
                  props.rowData.subjectDetailsUgPgDiploma.passOrFail) ||
                ""
              }
              onChange={(e, value) => {
                props.onChange(value);
              }}
              renderInput={(params) => (
                <TextFieldComponent
                  // className={classes.examTypeStyle}
                  {...params}
                  error={
                    props.rowData.subjectDetailsUgPgDiploma &&
                    isEmptyObject(
                      props.rowData.subjectDetailsUgPgDiploma.passOrFail
                    )
                  }
                  label="Pass/Fail"
                  variant="standard"
                  inputProps={{
                    ...params.inputProps,
                    onKeyDown: (e) => {
                          if (e.key === 'Enter') {
                            e.stopPropagation();
                          }
                    },
                  }}
                />
              )}
            />
          );
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
                <Grid container spacing={2}>
                  <Grid item md={12}>
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
                      collegeNameErr={this.state.collegeNameErr}
                      universityNameErr={this.state.universityNameErr}
                      departmentNameErr={this.state.departmentNameErr}
                      degreeErr={this.state.degreeErr}
                    />
                  </Grid>
                  <Grid item md={12}>
                    {/* table */}
                    <TableGrid
                      columns={columns}
                      data={this.state.semesterData || []}
                      onRowDelete={this.handleRowDelete}
                      onRowUpdate={this.handleRowUpdate}
                      onRowAdd={this.handleRowAdd}
                    />
                  </Grid>
                  <Grid item md={12}>
                    {/* view marks -( below the table) */}
                    <ViewMarks
                      semesterGpa={this.state.subjectDetails.sgpa}
                      sgpaError={this.state.sgpaErr}
                      cgpa={this.state.subjectDetails.cgpa}
                      cgpaError={this.state.cgpaErr}
                      formulaEmployed={
                        this.state.subjectDetails.formulaEmployed
                      }
                      formulaError={this.state.formulaEmployedErr}
                      percentage={this.state.subjectDetails.percentage}
                      percentageError={this.state.percentageErr}
                      handleChange={(e) => this.handleScoreChange(e)}
                    />
                  </Grid>
                </Grid>

                <div className={classes.buttonDiv}>
                  <Button
                    // className={"button"}
                    variant={"outlined"}
                    color={"primary"}
                    className={classes.sgpaButton}
                    onClick={this.handleSgpaClick}
                  >
                    Calculate SGPA
                  </Button>

                  <Button
                    // className={"button"}
                    variant={"outlined"}
                    color={"primary"}
                    className={classes.cgpaButton}
                    onClick={this.handleCgpaClick}
                  >
                    Calculate CGPA
                  </Button>
                </div>
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
        <MySnackBar
          snackMsg={this.state.snackMsg}
          snackOpen={this.state.snackOpen}
          snackVariant={this.state.snackVariant}
        />
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
  buttonDiv: {
    marginTop: "14px",
    display: "flex",
    marginLeft: "10px",
  },
  sgpaButton: {
    borderRadius: "5px",
    marginRight: "10px",
  },
  cgpaButton: {
    borderRadius: "5px",
    marginRight: "10px",
  },
  examTypeStyle: {
    "& .MuiFormLabel-root.Mui-error": {
      color: "grey !important",
    },
  },
});
const mapStateToProps = (state) => {
  return {
    clickedSem: state.HelperReducer.clickedSem,
    academicTypes: state.HelperReducer.academicType,
    departmentResponse: state.CollegeReducer.BranchList,
    copy: state.HelperReducer.copiedData,
    template: state.HelperReducer.templateData,
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
  saveTemplate,
  saveCopyData,
  updateCalculation,
})(withStyles(useStyles)(Index));
