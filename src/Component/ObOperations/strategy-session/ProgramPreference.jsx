import React from "react";
import SaveContainer from "./components/SaveContainer";
import { useStyles } from "./Styles";
import { Autocomplete } from "@material-ui/lab";
import { TextField, Typography, Grid } from "@material-ui/core";

function ProgramPreference() {
  const classes = useStyles();
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
                  renderInput={(params) => (
                    <TextField {...params} label="Degree" variant="standard" />
                  )}
                />
              </Grid>
              <Grid item md={9}>
                <Autocomplete
                  id="combo-box-demo"
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
