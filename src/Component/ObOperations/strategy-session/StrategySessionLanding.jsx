import { Grid, Typography } from '@material-ui/core';
import React from 'react'
import { useStyles } from "./Styles";

function StrategySessionLanding() {
  const classes = useStyles()
  return (
    <div className={classes.sessionContainer}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div className={classes.selectedStrategyCard}>
            <Typography variant={"h5"}>
              Pre Strategy Document
            </Typography>
            <div className={classes.dateContainer}>
              <Typography color={"textSecondary"} variant={"body1"}>
                Updated on
              </Typography>
              <Typography variant={"body1"}>22 April 2022</Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default StrategySessionLanding