import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import  {MTableAction} from "material-table";
import FormGroup from "@material-ui/core/FormGroup";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sscexamboard } from "../../Actions/Student";
import { HELPER_TEXT } from "../../Constant/Variables";
import FullFeaturedCrudGrid from "../../Utils/EditableTable";
import { isEmptyObject, isEmptyString, isNumber } from "../Validation";
import CvViewer from "./CvViewer";
import { useStyles } from "./FormStyles";
import SimilarityPopup from "./SimilarityPopup";
import { IconButton } from "@material-ui/core";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
function TenthForm(props) {
  const choice = [
    { title: "10", value: 10 },
    { title: "7", value: 7 },
    { title: "4", value: 4 },
    { title: "%", value: 100 },
  ];
  const dispatch = useDispatch();
  const addActionRef = useRef();

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

  const actionComponent = {
    Action: (props) => {
      //If isn't the add action
      console.log(props.action);
      if (
        typeof props.action === typeof Function ||
        props.action.tooltip !== "Add"
      ) {
        return <MTableAction {...props} />;
      } else {
        return <div ref={addActionRef} onClick={props.action.onClick} />;
      }
    }
  }

  const [columns, setColumns] = useState([
    {
      title: "Language",
      field: "subjectDetails.language",
      render: (rowData, renderType) =>
        renderType === "row" ? rowData.subjectDetails.language : "",
    },
    {
      title: "Subject Code",
      field: "subjectDetails.subjectCode",
      render: (rowData, renderType) =>
        renderType === "row" ? rowData.subjectDetails.subjectCode : "",
    },
    {
      title: "Subject Name",
      field: "subjectDetails.subjectName",
      render: (rowData, renderType) =>
        renderType === "row" ? rowData.subjectDetails.subjectName : "",
    },
    {
      title: "Maximum Marks",
      field: "subjectDetails.maximumMarks",
      render: (rowData, renderType) =>
        renderType === "row" ? rowData.subjectDetails.maximumMarks : "",
    },
    { title: "Score", field: "score", type: "numeric" },
    {
      title: "",
      field: "internal_action",
      editable: false,
      render: (rowData) =>{
        if(rowData){
          if(rowData.tableData.id + 1 === data.length){
            console.log(addActionRef, "add-------------")
           return (
            <IconButton
              style={{marginRight : "-23px"}}
              color="primary"
              onClick={() => addActionRef.current.click()}
            >
              <AddCircleRoundedIcon />
            </IconButton>
          )
          }
        }
      },
      cellStyle: {
        textAlign : "right",
       },
      }
  ]);

  const [data, setData] = useState([
    {
      score: "10",
      subjectDetails: {
        language: "01",
        subjectCode: "AD7890",
        subjectName: "English",
        maximumMarks: "100",
      },
    },
  ]);

  const classes = useStyles();
  const [twelth, setTwelth] = useState(true);
  const [diploma, setDiploma] = useState(false);

  const examBoardList = useSelector(
    (state) => state.StudentReducer.sscexamboard
  );
  useEffect(() => {
    dispatch(sscexamboard());
  }, []);

  const handleHigherStudyChange = (type) => {
    if (type === "diploma") {
      setDiploma(true);
      setTwelth(false);
    } else {
      setDiploma(false);
      setTwelth(true);
    }
  };

  const handleSubmit = () => {
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
  };

  const handleRowAdd = (newData) =>{
    console.log("==========",newData)
      return new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);
              resolve();
            }, 1000)
          })
  }

  const handleRowUpdate = (newData, oldData) =>{
    return  new Promise((resolve, reject) => {
      setTimeout(() => {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);

        resolve();
      }, 1000)
    })
     
  }

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
          <Grid item md={4} xl={4} lg={4} sm={12} xs={12}>
            <TextField
              className={classes.root}
              label={"School Name"}
              value={schoolName.name}
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
          <Grid item md={4} xl={4} lg={4} sm={12} xs={12}>
            <Autocomplete
              id="boardName"
              options={examBoardList || []}
              value={board.name}
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
          <Grid item md={2} xl={4} lg={2} sm={6} xs={6}>
            <Autocomplete
              id="combo-box-demo"
              options={choice}
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
          <Grid item md={2} xl={4} lg={2} sm={6} xs={6}>
            <TextField
              label={"CGPA / % Range"}
              value={cgpa.name}
              helperText={cgpa.helperText}
              error={cgpa.helperText.length > 0}
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
          <FullFeaturedCrudGrid
          actionComponent={actionComponent}
          addActionRef={addActionRef}
          columns={columns}
          data={data} 
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
          <Grid item md={12} sm={12} xs={12} lg={12} xl={12}>
            <Typography>Next Education</Typography>
          </Grid>
          <Grid item md={12} sm={12} xs={12} lg={12} xl={12}>
            <FormGroup row>
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
            </FormGroup>
          </Grid>
        </Grid>
        <div className={classes.bottomContainer}>
          <hr />
          <Button
            onClick={handleSubmit}
            className={classes.bottomBtn}
            variant={"contained"}
            color={"primary"}
          >
            Save
          </Button>
        </div>
      </Grid>
      <Grid item md={5} lg={5} xl={5} sm={12} xs={12}>
        <CvViewer {...props} />
      </Grid>
      <SimilarityPopup />
    </Grid>
  );
}

export default TenthForm;
