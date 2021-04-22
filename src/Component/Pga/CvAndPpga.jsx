import { Grid, TextField } from '@material-ui/core'
import React, { Component } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'

 class CvAndPpga extends Component {
     constructor(){
         super();
         this.state={

         }
     }
     cvfactor=[
         {title:"Work Experience "},
         {title:"Workshops"},
         {title:"Certification Courses"},
         {title:"Research Projects  "},
         {title:"Course Projects "},
         {title:"Patents"},
         {title:"Internships (Research)  "},
         {title:"Internships (Industrial)  "},
         {title:"Papers"},
         {title:"In-Plant Training"},
         {title:"Extra-curricular activities"},
         {title:"International Exposure"},
         {title:"Technical Skills"},
         {title:"Other"},
     ]
     ppgaques=[
       {title:"UG | School-Board-Grades"},
       {title:"Interested Subjects"},
       {title:"Confirm package (Placements/Masters)"},
       {title:"Higher Education Readiness (program, areas of study/specialization, location)"},
       {title:"Back-up options for Master’s"},
       {title:"Suggest a Specialization Track"},
       {title:"Ask the reason for the Job. Why now? What is the end goal?"},
       {title:"Ask about career interest. Clear? Suggest suitable courses. Unclear? Walk through steps options available"},
       {title:"If Backlogs.Ask for a reason. Cleared? If pending, when are they clearing?"},
       {title:"If gap in academics/career. Ask for reason. Will it affect chances? "},
       {title:"Relevant research experience. "},
       {title:"Relevant work experience. "},
       {title:"Relevant Extracurricular activities"},
     ]
     
    render() {
        return (
            <div>
                <h5 style={{padding:"1%"}}>CV Details</h5>
                <Grid container spacing={2} style={{padding:"2%"}}>
                    <Grid item md={3}>
                            <Autocomplete
                           id="combo-box-demo"
                           options={this.cvfactor}
                           getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Factor From CV"
                              variant="outlined"
                              size="small"
                            />
                        )}
                         />
                    </Grid>
                    <Grid item md={1}>
                      <TextField 
                        variant="outlined"
                        label="count"
                        InputLabelProps={{shrink : true}}
                        type="number"
                        size="small" />
                    </Grid>
                    <Grid item md={4}>
                      <TextField 
                         variant="outlined"
                         label="Data of Factor"
                         size="small" />
                    </Grid>
                    <Grid item md={4}>
                     <TextField 
                       variant="outlined"
                       label="Mentor Comments"
                       size="small" />
                    </Grid>
                    <Grid item md={3}>
                    <Autocomplete
                           id="combo-box-demo"
                           options={this.cvfactor}
                           getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Factor From CV"
                              variant="outlined"
                              size="small"
                            />
                        )}
                         />
                    </Grid>
                    <Grid item md={1}>
                      <TextField 
                        variant="outlined"
                        label="count"
                        type="number"
                        InputLabelProps={{shrink : true}}
                        size="small" />
                    </Grid>
                    <Grid item md={4}>
                      <TextField 
                         variant="outlined"
                         label="Data of Factor"
                         size="small" />
                    </Grid>
                    <Grid item md={4}>
                     <TextField 
                       variant="outlined"
                       label="Mentor Comments"
                       size="small" />
                    </Grid>
                    <Grid item md={3}>
                    <Autocomplete
                           id="combo-box-demo"
                           options={this.cvfactor}
                           getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Factor From CV"
                              variant="outlined"
                              size="small"
                            />
                        )}
                         />
                    </Grid>
                    <Grid item md={1}>
                      <TextField 
                        variant="outlined"
                        label="count"
                        type="number"
                        InputLabelProps={{shrink : true}}
                        size="small" />
                    </Grid>
                    <Grid item md={4}>
                      <TextField 
                         variant="outlined"
                         label="Data of Factor"
                         size="small" />
                    </Grid>
                    <Grid item md={4}>
                     <TextField 
                       variant="outlined"
                       label="Mentor Comments"
                       size="small" />
                    </Grid>
                    <Grid item md={3}>
                    <Autocomplete
                           id="combo-box-demo"
                           options={this.cvfactor}
                           getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Factor From CV"
                              variant="outlined"
                              size="small"
                            />
                        )}
                         />
                    </Grid>
                    <Grid item md={1}>
                      <TextField 
                        variant="outlined"
                        label="count"
                        InputLabelProps={{shrink : true}}
                        type="number"
                        size="small" />
                    </Grid>
                    <Grid item md={4}>
                      <TextField 
                         variant="outlined"
                         label="Data of Factor"
                         size="small" />
                    </Grid>
                    <Grid item md={4}>
                     <TextField 
                       variant="outlined"
                       label="Mentor Comments"
                       size="small" />
                    </Grid>
                    <Grid item md={3}>
                    <Autocomplete
                           id="combo-box-demo"
                           options={this.cvfactor}
                           getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Factor From CV"
                              variant="outlined"
                              size="small"
                            />
                        )}
                         />
                    </Grid>
                    <Grid item md={1}>
                      <TextField 
                        variant="outlined"
                        label="count"
                        type="number"
                        InputLabelProps={{shrink : true}}
                        size="small" />
                    </Grid>
                    <Grid item md={4}>
                      <TextField 
                         variant="outlined"
                         label="Data of Factor"
                         size="small" />
                    </Grid>
                    <Grid item md={4}>
                     <TextField 
                       variant="outlined"
                       label="Mentor Comments"
                       size="small" />
                    </Grid>
                    <Grid item md={3}>
                    <Autocomplete
                           id="combo-box-demo"
                           options={this.cvfactor}
                           getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Factor From CV"
                              variant="outlined"
                              size="small"
                            />
                        )}
                         />
                    </Grid>
                    <Grid item md={1}>
                      <TextField 
                        variant="outlined"
                        label="count"
                        type="number"
                        InputLabelProps={{shrink : true}}
                        size="small" />
                    </Grid>
                    <Grid item md={4}>
                      <TextField 
                         variant="outlined"
                         label="Data of Factor"
                         size="small" />
                    </Grid>
                    <Grid item md={4}>
                     <TextField 
                       variant="outlined"
                       label="Mentor Comments"
                       size="small" />
                    </Grid>
                    <Grid item md={3}>
                    <Autocomplete
                           id="combo-box-demo"
                           options={this.cvfactor}
                           getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Factor From CV"
                              variant="outlined"
                              size="small"
                            />
                        )}
                         />
                    </Grid>
                    <Grid item md={1}>
                      <TextField 
                        variant="outlined"
                        label="count"
                        type="number"
                        InputLabelProps={{shrink : true}}
                        size="small" />
                    </Grid>
                    <Grid item md={4}>
                      <TextField 
                         variant="outlined"
                         label="Data of Factor"
                         size="small" />
                    </Grid>
                    <Grid item md={4}>
                     <TextField 
                       variant="outlined"
                       label="Mentor Comments"
                       size="small" />
                    </Grid>
                    <Grid item md={3}>
                    <Autocomplete
                           id="combo-box-demo"
                           options={this.cvfactor}
                           getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Factor From CV"
                              variant="outlined"
                              size="small"
                            />
                        )}
                         />
                    </Grid>
                    <Grid item md={1}>
                      <TextField 
                        variant="outlined"
                        label="count"
                        type="number"
                        InputLabelProps={{shrink : true}}
                        size="small" />
                    </Grid>
                    <Grid item md={4}>
                      <TextField 
                         variant="outlined"
                         label="Data of Factor"
                         size="small" />
                    </Grid>
                    <Grid item md={4}>
                     <TextField 
                       variant="outlined"
                       label="Mentor Comments"
                       size="small" />
                    </Grid>
                </Grid>
                <hr />
                <h5 style={{padding:"1%"}}>PPGA Question</h5>
                <Grid container style={{padding:"2%"}} spacing={2}>
                    <Grid item md={4}>
                        {/* <TextField
                        variant="outlined"
                        size="small"
                        label="Question from Database" /> */}
                        <Autocomplete
                           id="combo-box-demo"
                           options={this.ppgaques}
                           getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Question From Database"
                              variant="outlined"
                              size="small"
                            />
                        )}
                         />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Notes Before PPGA " />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                        variant="outlined"
                        size="small"
                        label="Notes After PPGA " />
                    </Grid>
                    <Grid item md={4}>
                    <Autocomplete
                           id="combo-box-demo"
                           options={this.ppgaques}
                           getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Question From Database"
                              variant="outlined"
                              size="small"
                            />
                        )}
                         />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Notes Before PPGA " />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                        variant="outlined"
                        size="small"
                        label="Notes After PPGA " />
                    </Grid>
                    <Grid item md={4}>
                    <Autocomplete
                           id="combo-box-demo"
                           options={this.ppgaques}
                           getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Question From Database"
                              variant="outlined"
                              size="small"
                            />
                        )}
                         />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Notes Before PPGA " />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                        variant="outlined"
                        size="small"
                        label="Notes After PPGA " />
                    </Grid>
                    <Grid item md={4}>
                    <Autocomplete
                           id="combo-box-demo"
                           options={this.ppgaques}
                           getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Question From Database"
                              variant="outlined"
                              size="small"
                            />
                        )}
                         />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        label="Notes Before PPGA " />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                        variant="outlined"
                        size="small"
                        label="Notes After PPGA " />
                    </Grid>
                    <Grid item md={4}>
                    <Autocomplete
                           id="combo-box-demo"
                           options={this.ppgaques}
                           getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Question From Database"
                              variant="outlined"
                              size="small"
                            />
                        )}
                         />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Notes Before PPGA " />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                        variant="outlined"
                        size="small"
                        label="Notes After PPGA " />
                    </Grid>
                    <Grid item md={4}>
                    <Autocomplete
                           id="combo-box-demo"
                           options={this.ppgaques}
                           getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Question From Database"
                              variant="outlined"
                              size="small"
                            />
                        )}
                         />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        label="Notes Before PPGA " />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                        variant="outlined"
                        size="small"
                        label="Notes After PPGA " />
                    </Grid>
                    <Grid item md={4}>
                    <Autocomplete
                           id="combo-box-demo"
                           options={this.ppgaques}
                           getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Question From Database"
                              variant="outlined"
                              size="small"
                            />
                        )}
                         />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        label="Notes Before PPGA " />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                        variant="outlined"
                        size="small"
                        label="Notes After PPGA " />
                    </Grid>
                    <Grid item md={4}>
                    <Autocomplete
                           id="combo-box-demo"
                           options={this.ppgaques}
                           getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Question From Database"
                              variant="outlined"
                              size="small"
                            />
                        )}
                         />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        label="Notes Before PPGA " />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                        variant="outlined"
                        size="small"
                        label="Notes After PPGA " />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default CvAndPpga