import React, { useEffect, useState } from "react";
import SaveContainer from "./components/SaveContainer";
import { useStyles } from "./Styles";
import { Autocomplete } from "@material-ui/lab";
import { TextField, Typography, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDegree,
  getAllSpecialization,
} from "../../../Actions/Aspiration";
import { getBranches } from "../../../Actions/College";
import { getRegions } from "../../../Actions/Student";
import { useParams } from "react-router-dom";
function ProgramPreference() {
  const dispatch = useDispatch();
  const { allDegreeList } = useSelector((state) => state.AspirationReducer);
  const { allSpeciaizationList } = useSelector(
    (state) => state.AspirationReducer
  );
  const { BranchList } = useSelector((state) => state.CollegeReducer);
  const { regionList } = useSelector((state) => state.StudentReducer);
  const { studentId } = useParams();
  const [degree, setDegree] = useState(null);
  const [specialization, setSpecialization] = useState(null);
  const [branch, setBranch] = useState(null);
  const [region, setRegion] = useState(null);
  const classes = useStyles();
  useEffect(() => {
    dispatch(getAllDegree());
    dispatch(getAllSpecialization());
    dispatch(getBranches());
    dispatch(getRegions(studentId));
  }, []);
  console.log(region, "__________________");
  return (
    <div className={classes.mainWrapper}>
      <div className={classes.contentWrapper}>
        <Grid container>
          <Grid item md={6}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Typography className={classes.title}>
                  Program Preference
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                  id="combo-box-demo"
                  options={allDegreeList}
                  value={degree}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, newValue) => setDegree(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Degree" variant="standard" />
                  )}
                />
              </Grid>
              <Grid item md={9}>
                <Autocomplete
                  id="combo-box-demo"
                  options={BranchList}
                  value={branch}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, newValue) => setBranch(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Chosen Field(eg CSE)"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item md={6}>
                <Autocomplete
                  id="combo-box-demo"
                  options={allSpeciaizationList}
                  value={specialization}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, newValue) => setSpecialization(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Chosen Specialization"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                  id="combo-box-demo"
                  options={regionList}
                  value={region}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, newValue) => setRegion(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Chosen location"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  inputMode="numeric"
                  label="Current CGPA"
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6}></Grid>
        </Grid>
      </div>
      <SaveContainer />
    </div>
  );
}

export default ProgramPreference;
