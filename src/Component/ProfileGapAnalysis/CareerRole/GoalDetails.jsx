import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid'
import React, { Component } from "react";

export default class GoalDetails extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item md={3}>
              <TextField label="Goal Type"/>
          </Grid>
          <Grid item md={9}></Grid>
          <Grid item md={3}>
              <TextField label="Role"/>
          </Grid>
          <Grid item md={4}>
              <TextField label="Industry" />
          </Grid>
          <Grid item md={4}>
              <TextField label="Company Name" />
          </Grid>
          <Grid item md={1}>

          </Grid>
        </Grid>
      </div>
    );
  }
}
