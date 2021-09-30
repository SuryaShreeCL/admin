import React, { useEffect, useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, Typography } from "@material-ui/core";
import CvViewer from "./CvViewer";
import { TextField } from "@material-ui/core";
import { useStyles } from "./FormStyles";
import { isEmptyObject, isEmptyString, isNumber } from "../Validation";
import { sscexamboard } from "../../Actions/Student";
import EditableTable from "../../Utils/EditableTable";
import SimilarityPopup from "./SimilarityPopup";
import { HELPER_TEXT } from "../../Constant/Variables";

function TwelthForm(props) {
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
      name : '',
      helperText : ''
  });
  const [formulaEmployed, setFormulaEmployed] = useState({
    name : '',
    helperText : ''
});
  const [cumulativeResult, setCumulativeResult] = useState({
    name : '',
    helperText : ''
});
  const classes = useStyles();
  const dispatch = useDispatch();
  const choice = [
    { title: "10", value: 10 },
    { title: "7", value: 7 },
    { title: "4", value: 4 },
    { title: "%", value: 100 },
  ];

  const examBoardList = useSelector(
    (state) => state.StudentReducer.sscexamboard
  );
  useEffect(() => {
    dispatch(sscexamboard());
  }, []);

  const handleSubmit = () =>{
    isEmptyString(schoolName.name) ? setSchoolName((prevSchoolName)=>({...prevSchoolName,helperText : HELPER_TEXT.requiredField})) :  setSchoolName((prevSchoolName)=>({...prevSchoolName,helperText : ''}))
    isEmptyObject(board.name) ? setBoard((prevBoard)=>({...prevBoard, helperText : HELPER_TEXT.requiredField})) : setBoard((prevBoard)=>({...prevBoard, helperText : ""}))
    isEmptyString(cgpa.name) ? setCgpa((prevCgpa)=>({...prevCgpa, helperText : HELPER_TEXT.requiredField})) : setCgpa((prevCgpa)=>({...prevCgpa, helperText : ""}))
    isEmptyObject(gradeScale.name) ? setGradeScale((prevGrade)=>({...prevGrade, helperText : HELPER_TEXT.requiredField})) : setGradeScale((prevGrade)=>({...prevGrade, helperText : ""}))
    isEmptyString(cumulativePercentage.name) ? setCumulativePercentage((prevCumlative)=>({...prevCumlative, helperText : HELPER_TEXT.requiredField})) : setCumulativePercentage((prevCumlative)=>({...prevCumlative, helperText : ""}))
    isEmptyString(formulaEmployed.name) ? setFormulaEmployed((prevFormula)=>({...prevFormula, helperText : HELPER_TEXT.requiredField})) : setFormulaEmployed((prevFormula)=>({...prevFormula, helperText : ""}))
    isEmptyString(cumulativeResult.name) ? setCumulativeResult((prevCumResult)=>({...prevCumResult, helperText : HELPER_TEXT.requiredField})) : setCumulativeResult((prevCumResult)=>({...prevCumResult, helperText : ""}))
}
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
              className={classes.root}
              helperText={cgpa.helperText}
              error={cgpa.helperText.length > 0}
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
          <Grid
            item
            md={12}
            sm={12}
            xs={12}
            lg={12}
            xl={12}
            className={classes.tableWrapper}
          >
            <EditableTable />
          </Grid>
          <Grid item md={12} xl={12} lg={12} xs={12} sm={6} container spacing={2} className={classes.twelthFieldBottomContainer}>
          <Grid item md={4} xs={12} sm={6} lg={4} xl={4}>
            <TextField
              fullWidth
              className={classes.root}
              value={cumulativePercentage.name}
              helperText={cumulativePercentage.helperText}
              error={cumulativePercentage.helperText.length > 0}
              onChange={(e) => setCumulativePercentage({name : e.target.value, helperText : ''})}
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
              onChange={(e) => setFormulaEmployed({name : e.target.value, helperText : ""})}
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
              onChange={(e) => setCumulativeResult({name : e.target.value, helperText : ""})}
              label={"Cumulative Result"}
            />
          </Grid>
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
      <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
        <CvViewer {...props} />
      </Grid>
      <SimilarityPopup />
    </Grid>
  );
}

export default TwelthForm;
