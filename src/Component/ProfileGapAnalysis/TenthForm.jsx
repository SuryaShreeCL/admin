import { Grid, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sscexamboard } from "../../Actions/Student";
import FullFeaturedCrudGrid from "../../Utils/EditableTable";
import { Autocomplete } from "@material-ui/lab";
import { isNumber } from "../Validation";
import CvViewer from "./CvViewer";
function TenthForm(props) {
 const choice = [
    { title: "10", value: 10 },
    { title: "7", value: 7 },
    { title: "4", value: 4 },
    { title: "%", value: 100 },
  ];
  const dispatch = useDispatch();
  const [schoolName, setSchoolName] = useState("");
  const [board, setBoard] = useState(null);
  const [gradeScale, setGradeScale] = useState(null);
  const [cgpa, setCgpa] = useState("");
  const examBoardList = useSelector(
    (state) => state.StudentReducer.sscexamboard
  );
  useEffect(() => {
    dispatch(sscexamboard());
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item md={7} container spacing={2}>
        <Grid item md={4}>
          <TextField
            label={"School Name"}
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item md={4}>
          <Autocomplete
            id="boardName"
            options={examBoardList || []}
            getOptionLabel={(option) => option.name}
            onChange={(e,newValue)=>setBoard(newValue)}
            renderInput={(params) => (
              <TextField {...params} fullWidth label="Exam Board" variant="standard" />
            )}
          />
        </Grid>
        <Grid item md={2}>
        <Autocomplete
              id="combo-box-demo"
              options={choice}
              getOptionLabel={(option) => option.title}
              fullWidth
              value={gradeScale}
              onChange={(e,newValue)=>setGradeScale(newValue)}
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Grading Scale"
                  variant="standard"
                />
              )}
            />
        </Grid>
        <Grid item md={2}>
        <TextField
            label={"CGPA / % Range"}
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            onKeyPress={(evt) => {
              if (isNumber(evt)) evt.preventDefault();
            }}
            fullWidth
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12} lg={12} xl={12}>
          <FullFeaturedCrudGrid />
        </Grid>
      </Grid>
      <Grid item md={5}>
          <CvViewer {...props} />
      </Grid>
    </Grid>
  );
}

export default TenthForm;
