import React from 'react'
import { Grid, TextField, Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import {useStyles} from './Styles'
import SaveContainer from "./components/SaveContainer";





export default function Recommender() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return(
    <div className={classes.mainWrapper}>
      <div className={classes.contentWrapper}>
        <Grid container spacing={3} >
          <Grid item xs={12}>
            <Typography>Recommenders</Typography>
          </Grid>
          <Grid item xs={10}>
            
              <Grid container className={classes.cardContainer}>
                <Grid item xs={12}>
                  <Typography>Recommender 1</Typography>
                  <hr fullWidth></hr>
                </Grid>
                <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>Name of Recommender</Typography>
                  <TextField fullWidth id="standard-basic" placeholder='Name of Recommender'/>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Designation of Recommender</Typography>
                  <TextField fullWidth id="standard-basic" placeholder='Designation'/>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Your&nbsp;Relationship&nbsp;with&nbsp;the&nbsp;Recommender</Typography>
                  <TextField fullWidth id="standard-basic" placeholder='Relationship'/>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Department</Typography>
                  <TextField fullWidth id="standard-basic" placeholder='Department'/>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Where they are working currently</Typography>
                  <TextField fullWidth id="standard-basic" placeholder='Working Currently'/>
                </Grid>
                </Grid>

              </Grid>
              
            
            
              
            
          </Grid>
          <Grid item xs={10}>
            
            <Grid container className={classes.cardContainer}>
              <Grid item xs={12}>
                <Typography>Recommender 1</Typography>
                <hr fullWidth></hr>
              </Grid>
              <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>Name of Recommender</Typography>
                <TextField fullWidth id="standard-basic" placeholder='Name of Recommender'/>
              </Grid>
              <Grid item xs={6}>
                <Typography>Designation of Recommender</Typography>
                <TextField fullWidth id="standard-basic" placeholder='Designation'/>
              </Grid>
              <Grid item xs={4}>
                <Typography>Your&nbsp;Relationship&nbsp;with&nbsp;the&nbsp;Recommender</Typography>
                <TextField fullWidth id="standard-basic" placeholder='Relationship'/>
              </Grid>
              <Grid item xs={4}>
                <Typography>Department</Typography>
                <TextField fullWidth id="standard-basic" placeholder='Department'/>
              </Grid>
              <Grid item xs={4}>
                <Typography>Where they are working currently</Typography>
                <TextField fullWidth id="standard-basic" placeholder='Working Currently'/>
              </Grid>
              </Grid>

            </Grid>
            
          
          
            
          
        </Grid>
        <Grid item xs={10}>
            
            <Grid container className={classes.cardContainer}>
              <Grid item xs={12}>
                <Typography>Recommender 1</Typography>
                <hr fullWidth></hr>
              </Grid>
              <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>Name of Recommender</Typography>
                <TextField fullWidth id="standard-basic" placeholder='Name of Recommender'/>
              </Grid>
              <Grid item xs={6}>
                <Typography>Designation of Recommender</Typography>
                <TextField fullWidth id="standard-basic" placeholder='Designation'/>
              </Grid>
              <Grid item xs={4}>
                <Typography>Your&nbsp;Relationship&nbsp;with&nbsp;the&nbsp;Recommender</Typography>
                <TextField fullWidth id="standard-basic" placeholder='Relationship'/>
              </Grid>
              <Grid item xs={4}>
                <Typography>Department</Typography>
                <TextField fullWidth id="standard-basic" placeholder='Department'/>
              </Grid>
              <Grid item xs={4}>
                <Typography>Where they are working currently</Typography>
                <TextField fullWidth id="standard-basic" placeholder='Working Currently'/>
              </Grid>
              </Grid>

            </Grid>
            
          
          
            
          
        </Grid>
        <Grid item xs={10}>
            
            <Grid container className={classes.cardContainer}>
              <Grid item xs={12}>
                <Typography>Recommender 1</Typography>
                <hr fullWidth></hr>
              </Grid>
              <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>Name of Recommender</Typography>
                <TextField fullWidth id="standard-basic" placeholder='Name of Recommender'/>
              </Grid>
              <Grid item xs={6}>
                <Typography>Designation of Recommender</Typography>
                <TextField fullWidth id="standard-basic" placeholder='Designation'/>
              </Grid>
              <Grid item xs={4}>
                <Typography>Your&nbsp;Relationship&nbsp;with&nbsp;the&nbsp;Recommender</Typography>
                <TextField fullWidth id="standard-basic" placeholder='Relationship'/>
              </Grid>
              <Grid item xs={4}>
                <Typography>Department</Typography>
                <TextField fullWidth id="standard-basic" placeholder='Department'/>
              </Grid>
              <Grid item xs={4}>
                <Typography>Where they are working currently</Typography>
                <TextField fullWidth id="standard-basic" placeholder='Working Currently'/>
              </Grid>
              </Grid>

            </Grid>
            
          
          
            
          
        </Grid>
        <Grid item xs={10}>
            
            <Grid container className={classes.cardContainer}>
              <Grid item xs={12}>
                <Typography>Recommender 1</Typography>
                <hr fullWidth></hr>
              </Grid>
              <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>Name of Recommender</Typography>
                <TextField fullWidth id="standard-basic" placeholder='Name of Recommender'/>
              </Grid>
              <Grid item xs={6}>
                <Typography>Designation of Recommender</Typography>
                <TextField fullWidth id="standard-basic" placeholder='Designation'/>
              </Grid>
              <Grid item xs={4}>
                <Typography>Your&nbsp;Relationship&nbsp;with&nbsp;the&nbsp;Recommender</Typography>
                <TextField fullWidth id="standard-basic" placeholder='Relationship'/>
              </Grid>
              <Grid item xs={4}>
                <Typography>Department</Typography>
                <TextField fullWidth id="standard-basic" placeholder='Department'/>
              </Grid>
              <Grid item xs={4}>
                <Typography>Where they are working currently</Typography>
                <TextField fullWidth id="standard-basic" placeholder='Working Currently'/>
              </Grid>
              </Grid>

            </Grid>
            
          
          
            
        
        </Grid>
          <Grid item xs={2}>
          </Grid>
        </Grid>
      </div>
      <SaveContainer/>
    </div>
  );
}