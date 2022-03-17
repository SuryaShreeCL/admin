import React, { useEffect, useState } from "react";
import SaveContainer from "./components/SaveContainer";
import { useStyles } from "./Styles";
import { Autocomplete } from "@material-ui/lab";
import { TextField, Typography, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getDegree } from "../../../Actions/Student";
import { getAspirationSpecialization } from "../../../Actions/Student";
import { getAspirationBranch } from "../../../Actions/Student";
import { getRegions } from "../../../Actions/Student";
import { useParams } from "react-router-dom";
import {
  getProgramPrefence,
  putProgramPrefernce,
} from "../../../Actions/StrategySession";
function ProgramPreference() {
  const dispatch = useDispatch();
  const { degreeList } = useSelector((state) => state.StudentReducer);
  const { AspirationSpecialization } = useSelector(
    (state) => state.StudentReducer
  );
  const { AspirationBranch } = useSelector((state) => state.StudentReducer);
  const { regionList } = useSelector((state) => state.StudentReducer);
  const { studentId } = useParams();
  const { productId } = useParams();
  const [degree, setDegree] = useState(null);
  const [specialization, setSpecialization] = useState(null);
  const [branch, setBranch] = useState(null);
  const [region, setRegion] = useState(null);
  const [cgpa, setCgpa] = useState(null);
  const classes = useStyles();
  useEffect(() => {
    dispatch(getDegree(studentId));
    dispatch(getAspirationSpecialization("", () => {}));
    dispatch(getAspirationBranch("", ""));
    dispatch(getRegions(studentId));
    dispatch(getProgramPrefence(studentId, productId));
  }, []);
  console.log(region, "__________________");
  const handleSave = () => {
    let data = {
      cgpa: cgpa,
      degree: {
        id: degree.id,
      },
      fieldOfStudy: {
        id: branch.id,
      },
      areaOfSpecialization: {
        id: specialization.id,
      },
      region: {
        id: region.id,
      },
    };

    dispatch(putProgramPrefernce(data, studentId, productId));
  };
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
                  options={degreeList}
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
                  options={AspirationBranch}
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
                  options={AspirationSpecialization}
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
                  value={cgpa}
                  onChange={(e, newValue) => setCgpa(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6}></Grid>
        </Grid>
      </div>
      <SaveContainer handleClick={handleSave} />
    </div>
  );
}

export default ProgramPreference;
