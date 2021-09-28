import {
  Grid,
  TextField,
  makeStyles,
  Divider,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sscexamboard } from "../../Actions/Student";
import FullFeaturedCrudGrid from "../../Utils/EditableTable";
import { Autocomplete } from "@material-ui/lab";
import { isNumber } from "../Validation";
import CvViewer from "./CvViewer";
import SimilarityPopup from "./SimilarityPopup";
function TenthForm(props) {
  const useStyles = makeStyles({
    leftContainer: {
      padding: "23px !important",
      position: "relative",
    },
    tableWrapper: {
      marginTop: "40px",
    },
    bottomContainer: {
      position: "absolute",
      bottom: 30,
      width: "100%",
      marginLeft: "-15px",
    },
    bottomBtn: {
      float: "right",
      top: "11px",
      right: "20px",
    },
    nextStudies: {
      marginTop: "10%",
    },
  });
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
  const classes = useStyles();
  const [twelth, setTwelth] = useState(true);
  const [diploma, setDiploma] = useState(false);
 

  const examBoardList = useSelector(
    (state) => state.StudentReducer.sscexamboard
  );
  useEffect(() => {
    dispatch(sscexamboard());
  }, []);
  
  const handleHigherStudyChange = (type) =>{
    if(type === "diploma"){
      setDiploma(true)
      setTwelth(false)
    }else{
      setDiploma(false)
      setTwelth(true)
    }
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
              label={"School Name"}
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item md={4} xl={4} lg={4} sm={12} xs={12}>
            <Autocomplete
              id="boardName"
              options={examBoardList || []}
              getOptionLabel={(option) => option.name}
              onChange={(e, newValue) => setBoard(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
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
              value={gradeScale}
              onChange={(e, newValue) => setGradeScale(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Grading Scale"
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item md={2} xl={4} lg={2} sm={6} xs={6}>
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
          <FullFeaturedCrudGrid />
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
          <Divider />
          <Button
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
      <SimilarityPopup
      />
    </Grid>
  );
}

export default TenthForm;
