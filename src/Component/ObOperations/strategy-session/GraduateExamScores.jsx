import React from 'react'
import { Grid, TextField, Typography } from '@material-ui/core'
import { useStyles } from './Styles'

function GraduateExamScores() {
    const classes=useStyles()
  return (
    <Grid container>
        <Grid item md={12}>
            <Grid container spacing={2}>
               <Grid item md={12}>
                   <Typography className={classes.title}>Graduate exam scores</Typography>
               </Grid> 
               <Grid item md={12}>
                   <Typography className={classes.title}>GRE</Typography>
               </Grid>
               <Grid item md={2}>
                   <TextField label="Analytical" variant='standard'></TextField>
               </Grid>
               <Grid item md={2}>
                   <TextField label="Verbal Reasoning" variant='standard'></TextField>
               </Grid>
               <Grid item md={2}>
                   <TextField label="Quantitative Reasoning" variant='standard'></TextField>
               </Grid>
               <Grid item md={2}>
                   
               </Grid>
               <Grid item md={2}>
                   
               </Grid>
               <Grid item md={2}>
                   
               </Grid>



               <Grid item md={12}>
                   <Typography className={classes.title}>GMAT</Typography>
                </Grid> 
                <Grid item md={2}>
                    <TextField label="Analytical" variant='standard'></TextField>
                </Grid> 
                <Grid item md={2}>
                    <TextField label="Verbal Reasoning" variant='standard'></TextField>
                </Grid> 
                <Grid item md={2}>
                    <TextField label="Quantitative Reasoning" variant='standard'></TextField>
                </Grid>  
                <Grid item md={2}>
                    <TextField label="Integrated Reasoning" variant='standard'></TextField>
                </Grid> 
                <Grid item md={2}>
                   
               </Grid>
               <Grid item md={2}>
                   
               </Grid>


               <Grid item md={12}>
                   <Typography className={classes.title}>IETS</Typography>
                </Grid> 
                <Grid item md={2}>
                    <TextField label="Listening" variant='standard'></TextField>
                </Grid> 
                <Grid item md={2}>
                    <TextField label="Reading" variant='standard'></TextField>
                </Grid> 
                <Grid item md={2}>
                    <TextField label="Writing" variant='standard'></TextField>
                </Grid>  
                <Grid item md={2}>
                    <TextField label="Speaking" variant='standard'></TextField>
                </Grid> 
                <Grid item md={2}>
                    <TextField label="Band" variant='standard'></TextField>  
               </Grid>
               <Grid item md={2}>
                   
               </Grid>


               <Grid item md={12}>
                   <Typography className={classes.title}>TOEFL</Typography>
                </Grid> 
                <Grid item md={2}>
                    <TextField label="Listening" variant='standard'></TextField>
                </Grid> 
                <Grid item md={2}>
                    <TextField label="Reading" variant='standard'></TextField>
                </Grid> 
                <Grid item md={2}>
                    <TextField label="Writing" variant='standard'></TextField>
                </Grid>  
                <Grid item md={2}>
                    <TextField label="Speaking" variant='standard'></TextField>
                </Grid> 
                <Grid item md={2}>
                    <TextField label="Overall" variant='standard'></TextField>  
               </Grid>
               <Grid item md={2}>
                   
               </Grid>



                     
             </Grid>
        </Grid>

    </Grid>
  )
}
export default GraduateExamScores
