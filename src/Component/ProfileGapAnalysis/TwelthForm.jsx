import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveCopyData, saveTemplate } from "../../Actions/HelperAction";
import { sscexamboard } from "../../Actions/Student";
import {
  deleteSubjectDetailsById,
  getDistinctSubjects,
  getSimilarStudentsByGrade,
  getStudentPgaByGrade,
  submitPga,
} from "../../AsyncApiCall/Ppga";
import { HELPER_TEXT } from "../../Constant/Variables";
import EditableTable from "../../Utils/EditableTable";
import MySnackBar from "../MySnackBar";
import {
  isEmptyObject,
  isEmptyString,
  isNanAndEmpty,
  isNumber,
} from "../Validation";
import PrimaryButton from "../../Utils/PrimaryButton";
import CvViewer from "./CvViewer";
import { useStyles } from "./FormStyles";
import SimilarityPopup from "./SimilarityPopup";
import { ExpandMore } from "@material-ui/icons";

function TwelthForm(props) {
  // Setting up initial state values
  const popperAnchorEl = useSelector(
    (state) => state.HelperReducer.popperState.popperAnchorEl
  );
  const profileSimilarityPopupOpen = Boolean(popperAnchorEl);
  const [educationalDetailsId, setEducationalDetailsId] = useState("");
  const [schoolName, setSchoolName] = useState({
    name: "",
    helperText: "",
  });
  const [board, setBoard] = useState({
    name: null,
    helperText: "",
  });
  const [gradeScale, setGradeScale] = useState({
    name: null,
    helperText: "",
  });
  const [cgpa, setCgpa] = useState({
    name: "",
    helperText: "",
  });
  const [cumulativePercentage, setCumulativePercentage] = useState({
    name: "",
    helperText: "",
  });
  const [formulaEmployed, setFormulaEmployed] = useState({
    name: "",
    helperText: "",
  });
  const [cumulativeResult, setCumulativeResult] = useState({
    name: "",
    helperText: "",
  });
  const [snack, setSnack] = useState({
    snackOpen: false,
    snackVariant: "",
    snackMsg: "",
  });
  const [studentDocument, setStudentDocument] = useState("");
  const [data, setData] = useState([]);
  const [studentMatch, setStudentMatch] = useState([]);
  const [distinctMatch, setDistinctMatch] = useState([]);
  const { copiedData } = useSelector((state) => state.HelperReducer);
  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState("");
  // Setting up column config for the table
  const columns = [
    {
      title: "Id",
      field: "id",
      hidden: true,
    },
    {
      title: "Sequence No",
      field: "",
      cellStyle: {
        textAlign: "center",
      },
      render: (rowData, renderType) =>
        renderType === "row" ? rowData.tableData.id + 1 : "",
    },
    {
      title: "Subject Code",
      field: "subjectDetails.subjectCode",
      render: (rowData, renderType) =>
        renderType === "row"
          ? rowData.subjectDetails && rowData.subjectDetails.subjectCode
          : "",
      validate: (rowData) => {
        if (!isEmptyObject(rowData)) {
          if (rowData.subjectDetails) {
            if (!isEmptyString(rowData.subjectDetails.subjectCode)) {
              return true;
            } else {
              return {
                isValid: false,
                helperText: "Please fill this required field",
              };
            }
          }
        }
      },
    },
    {
      title: "Subject Name",
      field: "subjectDetails.subjectName",
      render: (rowData, renderType) =>
        renderType === "row"
          ? rowData.subjectDetails && rowData.subjectDetails.subjectName
          : "",
      validate: (rowData) => {
        if (!isEmptyObject(rowData)) {
          if (rowData.subjectDetails) {
            if (!isEmptyString(rowData.subjectDetails.subjectName)) {
              return true;
            } else {
              return {
                isValid: false,
                helperText: "Please fill this required field",
              };
            }
          }
        }
      },
    },
    {
      title: "Maximum Marks",
      field: "subjectDetails.maximumMarks",
      type: "numeric",
      cellStyle: {
        textAlign: "center",
      },
      render: (rowData, renderType) =>
        renderType === "row"
          ? rowData.subjectDetails && rowData.subjectDetails.maximumMarks
          : "",
      validate: (rowData) => {
        if (!isEmptyObject(rowData)) {
          if (rowData.subjectDetails) {
            if (!isNanAndEmpty(rowData.subjectDetails.maximumMarks)) {
              if (rowData.subjectDetails.maximumMarks > 0) {
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
            return {
              isValid: false,
              helperText: "Please fill this required field",
            };
          }
        }
      },
    },
    {
      title: "Score",
      field: "score",
      type: "numeric",
      cellStyle: {
        textAlign: "right",
      },
      validate: (rowData) => {
        if (!isEmptyObject(rowData)) {
          if (!isNanAndEmpty(rowData.score)) {
            if (rowData.subjectDetails) {
              if (rowData.score > 0) {
                if (rowData.score <= rowData.subjectDetails.maximumMarks) {
                  return true;
                } else {
                  return {
                    isValid: false,
                    helperText: "Score should be less than maximum mark",
                  };
                }
              } else {
                return {
                  isValid: false,
                  helperText: "Score should not be negative value",
                };
              }
            } else {
              return { isValid: false };
            }
          } else {
            return {
              isValid: false,
              helperText: "Please fill this required field",
            };
          }
        }
      },
    },
  ];
  // Setting up styles
  const classes = useStyles();
  // Setting up dispatch for doing api calls
  const dispatch = useDispatch();
  const choice = [
    { title: "10", value: 10 },
    { title: "7", value: 7 },
    { title: "4", value: 4 },
    { title: "%", value: 100 },
  ];
  // Getting exam board list from the reducer
  const examBoardList = useSelector(
    (state) => state.StudentReducer.sscexamboard
  );
  // Fetching required data that need from API
  useEffect(() => {
    getAndSetPgaDetails();
    getAndSetStudentMatch("");
    getAndSetDistinctMatch("");
    dispatch(sscexamboard());
  }, []);

  // Spectating whether the user is copying the template or row  data from the filter list if he done that we are updating our table based on that !

  useEffect(() => {
    if (typeof copiedData !== "string") {
      if (!Array.isArray(copiedData)) {
        if (
          data.filter(
            (el) =>
              el.subjectDetails.subjectCode ===
              copiedData.subjectDetails.subjectCode
          ).length === 0
        ) {
          var joinedData = data.concat(copiedData);
          setData(joinedData);
          dispatch(saveCopyData(""));
        }
      } else {
        setData(copiedData);
        dispatch(saveTemplate(copiedData));
        dispatch(saveCopyData(""));
      }
    }
  }, [copiedData]);

  // Getting and setting student match list in state

  const getAndSetStudentMatch = (year) => {
    getSimilarStudentsByGrade(props.match.params.studentId, "hsc", year).then(
      (response) => {
        if (response.status === 200) {
          setStudentMatch(response.data.data);
          if (!response.data.data.length && profileSimilarityPopupOpen) {
            setSnack({
              snackMsg: "Given Filter is not found",
              snackVariant: "error",
              snackOpen: true,
            });
          }
        }
      }
    );
  };

  // Getting and setting HSC data for the table and form

  const getAndSetPgaDetails = () => {
    getStudentPgaByGrade(props.match.params.studentId, "hsc").then(
      (response) => {
        console.log(response, "..............");
        if (response.status === 200) {
          const data =
            response.data.data.length !== 0 ? response.data.data[0] : [];
          if (typeof data === "object") {
            setEducationalDetailsId(data.id);
            setSchoolName((prevSchoolName) => ({
              ...prevSchoolName,
              name: data.schoolName,
            }));
            setBoard((prevBoard) => ({
              ...prevBoard,
              name: data.examBoard,
            }));
            setCgpa((prevCgpa) => ({
              ...prevCgpa,
              name: data.score,
            }));
            setGradeScale((prevGrade) => ({
              ...prevGrade,
              name: {
                title: data.scoreScale.toString(),
                value: data.scoreScale,
              },
            }));
            setData(
              data.studentSubjectDetails ? data.studentSubjectDetails : []
            );
            if (data.studentDocument.length > 0) {
              setStudentDocument(data.studentDocument[0].path);
            }
          }
        }
      }
    );
  };
  // Get and set student distinct match list
  const getAndSetDistinctMatch = (query) => {
    getDistinctSubjects(props.match.params.studentId, "hsc", query).then(
      (response) => {
        if (response.status === 200) {
          setDistinctMatch(response.data.data);
          if (!response.data.data.length && profileSimilarityPopupOpen) {
            setSnack({
              snackMsg: "No Data found",
              snackVariant: "error",
              snackOpen: true,
            });
          }
        }
      }
    );
  };
  // This function handles submit
  const handleSubmit = () => {
    // Validating whether all fields are filled or not
    isEmptyString(schoolName.name)
      ? setSchoolName((prevSchoolName) => ({
          ...prevSchoolName,
          helperText: HELPER_TEXT.requiredField,
        }))
      : setSchoolName((prevSchoolName) => ({
          ...prevSchoolName,
          helperText: "",
        }));
    isEmptyObject(board.name)
      ? setBoard((prevBoard) => ({
          ...prevBoard,
          helperText: HELPER_TEXT.requiredField,
        }))
      : setBoard((prevBoard) => ({ ...prevBoard, helperText: "" }));
    isEmptyString(cgpa.name)
      ? setCgpa((prevCgpa) => ({
          ...prevCgpa,
          helperText: HELPER_TEXT.requiredField,
        }))
      : setCgpa((prevCgpa) => ({ ...prevCgpa, helperText: "" }));
    isEmptyObject(gradeScale.name)
      ? setGradeScale((prevGrade) => ({
          ...prevGrade,
          helperText: HELPER_TEXT.requiredField,
        }))
      : setGradeScale((prevGrade) => ({ ...prevGrade, helperText: "" }));
    // isEmptyString(cumulativePercentage.name)
    //   ? setCumulativePercentage((prevCumlative) => ({
    //       ...prevCumlative,
    //       helperText: HELPER_TEXT.requiredField,
    //     }))
    //   : setCumulativePercentage((prevCumlative) => ({
    //       ...prevCumlative,
    //       helperText: "",
    //     }));
    // isEmptyString(formulaEmployed.name)
    //   ? setFormulaEmployed((prevFormula) => ({
    //       ...prevFormula,
    //       helperText: HELPER_TEXT.requiredField,
    //     }))
    //   : setFormulaEmployed((prevFormula) => ({
    //       ...prevFormula,
    //       helperText: "",
    //     }));
    // isEmptyString(cumulativeResult.name)
    //   ? setCumulativeResult((prevCumResult) => ({
    //       ...prevCumResult,
    //       helperText: HELPER_TEXT.requiredField,
    //     }))
    //   : setCumulativeResult((prevCumResult) => ({
    //       ...prevCumResult,
    //       helperText: "",
    //     }));
    if (
      !isEmptyString(schoolName.name) &&
      !isEmptyObject(board.name) &&
      !isEmptyString(cgpa.name) &&
      !isEmptyObject(gradeScale.name) &&
      gradeScale.name.value >= parseInt(cgpa.name)
    ) {
      let requestBody = {
        examBoard: {
          id: board.name.id,
          name: board.name.name,
        },
        schoolName: schoolName.name,
        score: cgpa.name,
        scoreScale: gradeScale.name.value.toString(),
        studentSubjectDetails: data,
      };

      submitPga(props.match.params.studentId, "hsc", requestBody).then(
        (response) => {
          if (response.status === 200) {
            getAndSetPgaDetails();
            // If the call gets success it will set a success message
            setSnack({
              snackMsg: "Saved Successfully",
              snackVariant: "success",
              snackOpen: true,
            });
          }
        }
      );
    }
  };
  // This function adds a new row to a table

  const handleRowAdd = (newData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setData([...data, newData]);
        resolve();
      }, 1000);
    });
  };

  // This function will delete a row from the table

  const handleRowDelete = (oldData) => {
    // If the data is from DB
    if (oldData.subjectDetails.id) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          deleteSubjectDetailsById(
            props.match.params.studentId,
            oldData.subjectDetails.id
          ).then((response) => {
            console.log(response);
            if (response.status === 200) {
              getAndSetPgaDetails();
              setSnack({
                snackMsg: "Deleted Successfully",
                snackVariant: "success",
                snackOpen: true,
              });
            }
            resolve();
          });
        }, 1000);
      });
    }
    // If the data is copied
    else {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataDelete = [...data];
          const index = oldData.tableData.id;
          dataDelete.splice(index, 1);
          setData([...dataDelete]);
          resolve();
        }, 1000);
      });
    }
  };

  // This function updates a row

  const handleRowUpdate = (newData, oldData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
        resolve();
      }, 1000);
    });
  };

  // This function will handle the search when the user types in the search field
  const searchHandler = (e) => {
    if (e.target.value.length !== 0) {
      getAndSetDistinctMatch("&q=" + e.target.value);
    } else {
      getAndSetDistinctMatch("");
    }
    setSearch(e.target.value);
  };
  //  This function filter student match based on year
  const onYearClick = (year) => {
    getAndSetStudentMatch("&year=" + year);
    setFilterYear(year);
  };

  return (
    <Grid container spacing={2}>
      <Grid
        item
        className={classes.leftContainer}
        xs={7}
        sm={7}
        md={7}
        lg={7}
        xl={7}
      >
        <Grid container spacing={3}>
          <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
            <Typography variant={"h5"}>12th</Typography>
          </Grid>
          {/* School name text field */}
          <Grid item md={4} xl={4} lg={4} sm={12} xs={12}>
            <TextField
              label={"School Name"}
              value={schoolName.name}
              className={classes.root}
              onChange={(e) =>
                setSchoolName({
                  name: e.target.value,
                  helperText: "",
                })
              }
              fullWidth
              helperText={schoolName.helperText}
              error={schoolName.helperText.length > 0}
            />
          </Grid>
          {/* Exam board dropdown */}
          <Grid item md={4} xl={4} lg={4} sm={12} xs={12}>
            <Autocomplete
              id="boardName"
              options={examBoardList.filter((el) => el.name !== null) || []}
              value={board.name}
              popupIcon={<ExpandMore color={"inherit"} />}
              getOptionLabel={(option) => option.name}
              onChange={(e, newValue) =>
                setBoard({
                  name: newValue,
                  helperText: "",
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  className={classes.root}
                  helperText={board.helperText}
                  error={board.helperText.length > 0}
                  label="Exam Board"
                  variant="standard"
                />
              )}
            />
          </Grid>
          {/* Grade scale dropdown */}
          <Grid item md={2} xl={4} lg={2} sm={6} xs={6}>
            <Autocomplete
              id="combo-box-demo"
              options={choice}
              getOptionLabel={(option) => option.title}
              value={gradeScale.name}
              popupIcon={<ExpandMore color={"inherit"} />}
              onChange={(e, newValue) =>
                setGradeScale({
                  name: newValue,
                  helperText: "",
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  className={classes.root}
                  helperText={gradeScale.helperText}
                  error={gradeScale.helperText.length > 0}
                  label="Grading Scale"
                  variant="standard"
                />
              )}
            />
          </Grid>
          {/* CGPA scale dropdown */}
          <Grid item md={2} xl={4} lg={2} sm={6} xs={6}>
            <TextField
              label={"CGPA / % Range"}
              value={cgpa.name}
              className={classes.root}
              helperText={
                gradeScale.name !== null &&
                !isEmptyString(gradeScale.name.value) &&
                gradeScale.name.value < parseInt(cgpa.name)
                  ? "Invalid Input"
                  : cgpa.helperText
              }
              error={
                (gradeScale.name !== null &&
                  !isEmptyString(gradeScale.name.title) &&
                  gradeScale.name.value < parseInt(cgpa.name)) ||
                cgpa.helperText.length > 0
              }
              onChange={(e) =>
                setCgpa({
                  name: e.target.value,
                  helperText: "",
                })
              }
              onKeyPress={(evt) => {
                if (isNumber(evt)) evt.preventDefault();
              }}
              fullWidth
            />
          </Grid>
          {/* CRUD table */}
          <Grid
            item
            md={12}
            sm={12}
            xs={12}
            lg={12}
            xl={12}
            className={classes.tableWrapper}
          >
            <EditableTable
              columns={columns}
              data={data}
              localization={{
                body: {
                  editRow: {
                    deleteText: "Are you sure Want to Delete this Row",
                  },
                },
              }}
              onRowUpdate={handleRowUpdate}
              onRowDelete={handleRowDelete}
              onRowAdd={handleRowAdd}
            />
          </Grid>
          <Grid
            item
            md={12}
            xl={12}
            lg={12}
            xs={12}
            sm={6}
            container
            spacing={2}
            className={classes.twelthFieldBottomContainer}
          >
            <Grid item md={4} xs={12} sm={6} lg={4} xl={4}>
              <TextField
                fullWidth
                className={classes.root}
                value={cumulativePercentage.name}
                helperText={cumulativePercentage.helperText}
                error={cumulativePercentage.helperText.length > 0}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    if (e.target.value.length <= 3) {
                      setCumulativePercentage({
                        name: e.target.value,
                        helperText: "",
                      });
                    }
                  }
                }}
                label={"Cumulative Percentage Score"}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6} lg={4} xl={4}>
              <TextField
                fullWidth
                className={classes.root}
                value={formulaEmployed.name}
                helperText={formulaEmployed.helperText}
                error={formulaEmployed.helperText.length > 0}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    setFormulaEmployed({
                      name: e.target.value,
                      helperText: "",
                    });
                  }
                }}
                label={"Formula Employed"}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={6} lg={4} xl={4}>
              <TextField
                fullWidth
                className={classes.root}
                value={cumulativeResult.name}
                helperText={cumulativeResult.helperText}
                error={cumulativeResult.helperText.length > 0}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    setCumulativeResult({
                      name: e.target.value,
                      helperText: "",
                    });
                  }
                }}
                label={"Cumulative Result"}
              />
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.bottomContainer}>
          <hr />
          <PrimaryButton
            onClick={handleSubmit}
            className={classes.bottomBtn}
            variant={"contained"}
            color={"primary"}
          >
            Save
          </PrimaryButton>
        </div>
      </Grid>
      {/* CV viewer for hsc mark sheet */}

      <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
        <CvViewer path={studentDocument} {...props} />
      </Grid>
      <SimilarityPopup
        handleYearClick={onYearClick}
        searchValue={search}
        searchHandler={searchHandler}
        distinctMatch={distinctMatch}
        data={studentMatch}
      />
      <MySnackBar
        onClose={() =>
          setSnack({
            snackOpen: false,
            snackMsg: "",
            snackVariant: "",
          })
        }
        snackOpen={snack.snackOpen}
        snackVariant={snack.snackVariant}
        snackMsg={snack.snackMsg}
      />
    </Grid>
  );
}

export default TwelthForm;
