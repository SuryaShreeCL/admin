import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import { ExpandMore } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useRef, useState } from "react";
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
import FullFeaturedCrudGrid from "../../Utils/EditableTable";
import PrimaryButton from "../../Utils/PrimaryButton";
import MySnackBar from "../MySnackBar";
import {
  isEmptyObject,
  isEmptyString,
  isNanAndEmpty,
  isNumber,
} from "../Validation";
import CvViewer from "./CvViewer";
import { useStyles } from "./FormStyles";
import SimilarityPopup from "./SimilarityPopup";
function TenthForm(props) {
  const popperAnchorEl = useSelector(
    (state) => state.HelperReducer.popperState.popperAnchorEl
  );
  const profileSimilarityPopupOpen = Boolean(popperAnchorEl);
  // Setting up initial values for the variable
  const choice = [
    { title: "10", value: 10 },
    { title: "7", value: 7 },
    { title: "4", value: 4 },
    { title: "%", value: 100 },
  ];
  const dispatch = useDispatch();
  const addActionRef = useRef();
  const [filterYear, setFilterYear] = useState("");
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
    name: { title: "", value: "" },
    helperText: "",
  });
  const [cgpa, setCgpa] = useState({
    name: "",
    helperText: "",
  });
  const [studentDocument, setStudentDocument] = useState("");

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
              return { isValid: false };
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
              return { isValid: false };
            }
          }
        }
      },
    },
    {
      title: "Maximum Marks",
      field: "subjectDetails.maximumMarks",
      cellStyle: {
        textAlign: "center",
      },
      type: "numeric",
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
            return { isValid: false };
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
              if (rowData.score >= 0) {
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
            return { isValid: false };
          }
        }
      },
    },
  ];
  const [data, setData] = useState([]);
  const [studentMatch, setStudentMatch] = useState([]);
  const [distinctMatch, setDistinctMatch] = useState([]);
  const classes = useStyles();
  const [twelth, setTwelth] = useState(true);
  const [diploma, setDiploma] = useState(false);
  const [search, setSearch] = useState("");
  const [snack, setSnack] = useState({
    snackOpen: false,
    snackVariant: "",
    snackMsg: "",
  });
  // Getting exam board list from the reducer
  const examBoardList = useSelector(
    (state) => state.StudentReducer.sscexamboard
  );
  // Getting Copied data from the reducer
  const { copiedData } = useSelector((state) => state.HelperReducer);

  // Getting and setting SSC data for the table and form
  const getAndSetPgaDetails = () => {
    getStudentPgaByGrade(props.match.params.studentId, "ssc").then(
      (response) => {
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
                title:
                  data.scoreScale.toString() === "100"
                    ? "%"
                    : data.scoreScale.toString(),
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

  // Getting and setting student match list in state

  const getAndSetStudentMatch = (year) => {
    getSimilarStudentsByGrade(props.match.params.studentId, "ssc", year).then(
      (response) => {
        if (response.status === 200) {
          setStudentMatch(response.data.data);
          if (!response.data.data?.length && profileSimilarityPopupOpen) {
            setSnack({
              snackMsg: "Given Filter is not Found",
              snackVariant: "error",
              snackOpen: true,
            });
          }
        }
        // else{
        //   setSnack({
        //     snackMsg : response,
        //     snackVariant : "error",
        //     snackOpen : true
        //   })
        // }
      }
    );
  };

  // Getting and setting distinct match list in state

  const getAndSetDistinctMatch = (query) => {
    getDistinctSubjects(props.match.params.studentId, "ssc", query).then(
      (response) => {
        if (response.status === 200) {
          setDistinctMatch(response.data.data);
          if (!response.data.data?.length && profileSimilarityPopupOpen) {
            setSnack({
              snackMsg: "No Result Found",
              snackVariant: "error",
              snackOpen: true,
            });
          }
        }
      }
    );
  };

  // Making API calls that needed for this component each function is explained above
  useEffect(() => {
    dispatch(sscexamboard());
    getAndSetPgaDetails();
    getAndSetStudentMatch("");
    getAndSetDistinctMatch("");
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
  // Checkbox change handler user can check either only one 12th or diploma
  const handleHigherStudyChange = (type) => {
    if (type === "diploma") {
      setDiploma(true);
      setTwelth(false);
    } else {
      setDiploma(false);
      setTwelth(true);
    }
  };
  // This function handles the form submit !
  const handleSubmit = () => {
    // Here we are checking whether all fields are filled or not if it is not filled it will throw an error message :)
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

      submitPga(props.match.params.studentId, "ssc", requestBody).then(
        (response) => {
          if (response.status === 200) {
            getAndSetPgaDetails();
            // This will trigger the success message
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
  // This function will add a new row to a table
  const handleRowAdd = (newData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setData([...data, newData]);
        resolve();
      }, 1000);
    });
  };
  // This function will delete a row
  const handleRowDelete = (oldData) => {
    // IF the data is from db
    if (oldData.subjectDetails.id) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          deleteSubjectDetailsById(
            props.match.params.studentId,
            oldData.subjectDetails.id
          ).then((response) => {
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
    // If the row is copied
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
  // This function will update the current row
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
  // This function handles the search functionality
  const searchHandler = (e) => {
    //  If the textbox is empty it will return all results
    if (e.target.value.length !== 0) {
      getAndSetDistinctMatch("&q=" + e.target.value);
    } else {
      getAndSetDistinctMatch("");
    }
    setSearch(e.target.value);
  };
  // This function handles the filter based on year
  const onYearClick = (year) => {
    getAndSetStudentMatch("&year=" + year);
    setFilterYear(year);
  };

  return (
    <Grid container spacing={2}>
      <Grid
        item
        md={7}
        xs={12}
        sm={12}
        lg={7}
        xl={7}
        className={classes.leftContainer}
      >
        <Grid container spacing={3}>
          <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
            <Typography variant={"h5"}>10th</Typography>
          </Grid>
          {/* School Name Textbox */}
          <Grid item md={4} xl={4} lg={4} sm={12} xs={12}>
            <TextField
              className={classes.root}
              label={"School Name"}
              value={schoolName.name}
              onChange={(e) => {
                setSchoolName({
                  name: e.target.value,
                  helperText: "",
                });
              }}
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
              popupIcon={<ExpandMore color={"inherit"} />}
              getOptionLabel={(option) => option.title}
              value={gradeScale.name}
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
          {/* CGPA Dropdown */}
          <Grid item md={2} xl={4} lg={2} sm={6} xs={6}>
            <TextField
              label={"CGPA / % Range"}
              value={cgpa.name}
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
              className={classes.root}
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
        </Grid>

        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          lg={12}
          xl={12}
          className={classes.tableWrapper}
        >
          {/* CRUD Table */}
          <FullFeaturedCrudGrid
            columns={columns}
            data={data}
            localization={{
              body: {
                editRow: { deleteText: "Are you sure Want to Delete this Row" },
              },
            }}
            onRowDelete={handleRowDelete}
            onRowUpdate={handleRowUpdate}
            onRowAdd={handleRowAdd}
          />
        </Grid>
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          lg={12}
          xl={12}
          container
          spacing={1}
          direction={"column"}
          className={classes.nextStudies}
        >
          {/* <Grid item md={12} sm={12} xs={12} lg={12} xl={12}>
            <Typography>Next Education</Typography>
          </Grid> */}
          <Grid item md={12} sm={12} xs={12} lg={12} xl={12}>
            {/* Checkbox for twelth and diploma */}
            {/* <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={twelth}
                    color={"primary"}
                    onChange={() => handleHigherStudyChange("twelth")}
                    name="twelth"
                  />
                }
                label="12th"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={diploma}
                    onChange={() => handleHigherStudyChange("diploma")}
                    name="diploma"
                    color="primary"
                  />
                }
                label="Diploma"
              />
            </FormGroup> */}
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
      <Grid item md={5} lg={5} xl={5} sm={12} xs={12}>
        {/* CV viewer */}
        <CvViewer path={studentDocument} {...props} />
      </Grid>
      {/* Similarity popup */}
      <SimilarityPopup
        handleYearClick={onYearClick}
        searchValue={search}
        searchHandler={searchHandler}
        distinctMatch={distinctMatch}
        data={studentMatch}
      />
      {/* Snackbar that display the success message */}
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

export default TenthForm;
