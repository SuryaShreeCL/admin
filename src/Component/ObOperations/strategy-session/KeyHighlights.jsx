import { Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./Styles";
import SaveContainer from "./components/SaveContainer";

function KeyHighlights() {
  const classes = useStyles();
  return (
    <div className={classes.mainWrapper}>
      <div className={classes.contentWrapper}>
        <Grid container>
          <Grid item md={6}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Typography className={classes.title}>
                  Key Hightlights
                </Typography>
              </Grid>
              <Grid item md={12}>
                <p className={classes.question}>
                  What do you think are the aspects of your profile that should
                  be highlighted?
                </p>
              </Grid>
              <Grid item md={12}>
                <TextField
                  fullWidth
                  label="Hightlight 1"
                  variant="standard"
                ></TextField>
              </Grid>
              <Grid item md={12}>
                <TextField
                  fullWidth
                  label="Hightlight 2"
                  variant="standard"
                ></TextField>
              </Grid>
              <Grid item md={12}>
                <TextField
                  fullWidth
                  label="Hightlight 3"
                  variant="standard"
                ></TextField>
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

export default KeyHighlights;
