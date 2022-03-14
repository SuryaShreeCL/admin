import React from 'react'
import { Grid, TextField, Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import {useStyles} from './Styles'
import SaveContainer from "./components/SaveContainer";

export default function Story(){
    const classes = useStyles();
    return(
        <div className={classes.mainWrapper}>
      <div className={classes.contentWrapper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography>Your Story For Your Essay</Typography>   
                </Grid>
                <Grid item xs={8}>
                    <Grid item xs={12}>
                        <Typography>What did you do/what are you currently doing to fulfil your interest?</Typography>
                        <TextField fullWidth id="standard-basic" placeholder='Point 1'/>
                        </Grid>
                    
                    </Grid>
             </Grid>
          </div>
          <SaveContainer/>
          </div>
    )
}