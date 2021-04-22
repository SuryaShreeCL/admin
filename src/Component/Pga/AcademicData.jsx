import { Button, Divider, Grid, TextField } from '@material-ui/core'
import React, { Component } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'

 class AcademicData extends Component {

     choice=[
        { title: "10", value: 10 },
        { title: "7", value: 7 },
        { title: "4", value: 4 },
        { title: "%", value: 100 },
     ]

     handleSaved=()=>{
         alert("Data Saved")
     }

    render() {
        return (
            <div>
                <h5 style={{ padding: "1%" }}>10th Details</h5>
                <Grid container spacing={1} style={{ padding: "1%" }} >
             <Grid item md={2}>
             <TextField 
              variant="outlined"
              size="small"
              label="Name of the School(10th)"
              />
             </Grid>
             <Grid item md={2}>
             <TextField
              variant="outlined"
              size="small"
              label="Exam Board Name(10th)" />
             </Grid>
             <Grid item md={1}>
             <Autocomplete
                           id="combo-box-demo"
                        options={this.choice}
                        getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Score Scale"
                              variant="outlined"
                            />
                            )}
                            />
             </Grid>
             <Grid item md={1}>
             <TextField
              variant="outlined"
              size="small"
              label="Score" />
             </Grid>
             <Grid item md={2}>
             <TextField
              variant="outlined"
              size="small"
              label="Name of the School(12th)" />
             </Grid>
             <Grid item md={2}>
             <TextField
              variant="outlined"
              size="small"
              label="Exam Board Name(12th)" />
             </Grid>
             <Grid item md={1}>
             <Autocomplete
                           id="combo-box-demo"
                        options={this.choice}
                        getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Score Scale"
                              variant="outlined"
                            />
                            )}
                            />
             </Grid>
             <Grid item md={1}>
             <TextField
              variant="outlined"
              size="small"
              label="Score" />
             </Grid>
              </Grid>
                <hr />
                <h5 style={{ padding: "1%" }}>UnderGraduate Degree Details</h5>
                 <Grid container spacing={2} md={11} >
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     label="Semester" />
                 </Grid>
                 <Grid item md={1}>
                 <Autocomplete
                           id="combo-box-demo"
                        options={this.choice}
                        getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Score Scale"
                              variant="outlined"
                            />
                            )}
                            />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     label="Score" />
                 </Grid>
                 <Grid item md ={2}>
                 <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     multiline
                     label="Top 3 Subjects" />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     label="#Active Backlogs" />
                 </Grid>
                 <Grid item md ={2}>
                     <TextField
                     variant="outlined"
                     size="small"
                     label="Backlog Subjects" />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     label="#Cleared Backlogs" />
                 </Grid>
                 <Grid item md ={2}>
                     <TextField
                     variant="outlined"
                     size="small"
                     label="Cleared Backlog Subjects" />
                 </Grid>
                 </Grid>
                 <Grid container md={11} spacing={2} >
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Semester" />
                 </Grid>
                 <Grid item md={1}>
                 <Autocomplete
                           id="combo-box-demo"
                        options={this.choice}
                        getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Score Scale"
                              variant="outlined"
                            />
                            )}
                            />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Score" />
                 </Grid>
                 <Grid item md ={2}>
                 <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     multiline
                     label="Top 3 Subjects" />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="#Active Backlogs" />
                 </Grid>
                 <Grid item md ={2}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Backlog Subjects" />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="#Cleared Backlogs" />
                 </Grid>
                 <Grid item md ={2}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Cleared Backlog Subjects" />
                 </Grid>
                 </Grid>
                 <Grid container spacing={2} md={11} >
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Semester" />
                 </Grid>
                 <Grid item md={1}>
                 <Autocomplete
                           id="combo-box-demo"
                        options={this.choice}
                        getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Score Scale"
                              variant="outlined"
                            />
                            )}
                            />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Score" />
                 </Grid>
                 <Grid item md ={2}>
                 <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     multiline
                     label="Top 3 Subjects" />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="#Active Backlogs" />
                 </Grid>
                 <Grid item md ={2}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Backlog Subjects" />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="#Cleared Backlogs" />
                 </Grid>
                 <Grid item md ={2}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Cleared Backlog Subjects" />
                 </Grid>
                 </Grid>
                 <Grid container spacing={2} md={11} >
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Semester" />
                 </Grid>
                 <Grid item md={1}>
                 <Autocomplete
                           id="combo-box-demo"
                        options={this.choice}
                        getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Score Scale"
                              variant="outlined"
                            />
                            )}
                            />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Score" />
                 </Grid>
                 <Grid item md ={2}>
                 <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     multiline
                     label="Top 3 Subjects" />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="#Active Backlogs" />
                 </Grid>
                 <Grid item md ={2}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Backlog Subjects" />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="#Cleared Backlogs" />
                 </Grid>
                 <Grid item md ={2}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Cleared Backlog Subjects" />
                 </Grid>
                 </Grid>
                 <Grid container spacing={2} md={11} >
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Semester" />
                 </Grid>
                 <Grid item md={1}>
                 <Autocomplete
                           id="combo-box-demo"
                        options={this.choice}
                        getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Score Scale"
                              variant="outlined"
                            />
                            )}
                            />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     fullWidth
                     size="small"
                     label="Score" />
                 </Grid>
                 <Grid item md ={2}>
                 <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     multiline
                     label="Top 3 Subjects" />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     fullWidth
                     size="small"
                     label="#Active Backlogs" />
                 </Grid>
                 <Grid item md ={2}>
                     <TextField
                     variant="outlined"
                     fullWidth
                     size="small"
                     label="Backlog Subjects" />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="#Cleared Backlogs" />
                 </Grid>
                 <Grid item md ={2}>
                     <TextField
                     variant="outlined"
                     fullWidth
                     size="small"
                     label="Cleared Backlog Subjects" />
                 </Grid>
                 </Grid>
                 <Grid container spacing={2} md={11} >
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Semester" />
                 </Grid>
                 <Grid item md={1}>
                 <Autocomplete
                           id="combo-box-demo"
                        options={this.choice}
                        getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Score Scale"
                              variant="outlined"
                            />
                            )}
                            />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Score" />
                 </Grid>
                 <Grid item md ={2}>
                 <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     multiline
                     label="Top 3 Subjects" />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="#Active Backlogs" />
                 </Grid>
                 <Grid item md ={2}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Backlog Subjects" />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="#Cleared Backlogs" />
                 </Grid>
                 <Grid item md ={2}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Cleared Backlog Subjects" />
                 </Grid>
                 </Grid>
                 <Grid container spacing={2} md={11} >
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Semester" />
                 </Grid>
                 <Grid item md={1}>
                 <Autocomplete
                           id="combo-box-demo"
                        options={this.choice}
                        getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Score Scale"
                              variant="outlined"
                            />
                            )}
                            />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Score" />
                 </Grid>
                 <Grid item md ={2}>
                 <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     multiline
                     label="Top 3 Subjects" />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     fullWidth
                     size="small"
                     label="#Active Backlogs" />
                 </Grid>
                 <Grid item md ={2}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Backlog Subjects" />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="#Cleared Backlogs" />
                 </Grid>
                 <Grid item md ={2}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Cleared Backlog Subjects" />
                 </Grid>
                 </Grid>
                 <Grid container spacing={2} md={11} >
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Semester" />
                 </Grid>
                 <Grid item md={1}>
                 <Autocomplete
                           id="combo-box-demo"
                        options={this.choice}
                        getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Score Scale"
                              variant="outlined"
                            />
                            )}
                            />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Score" />
                 </Grid>
                 <Grid item md ={2}>
                 <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     multiline
                     label="Top 3 Subjects" />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="#Active Backlogs" />
                 </Grid>
                 <Grid item md ={2}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Backlog Subjects" />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="#Cleared Backlogs" />
                 </Grid>
                 <Grid item md ={2}>
                     <TextField
                     variant="outlined"
                     fullWidth
                     size="small"
                     label="Cleared Backlog Subjects" />
                 </Grid>
                 </Grid>
                 <Grid container spacing={2} md={11} >
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Semester" />
                 </Grid>
                 <Grid item md={1}>
                 <Autocomplete
                           id="combo-box-demo"
                        options={this.choice}
                        getOptionLabel={(option) => option.title}
                        // value={}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Score Scale"
                              variant="outlined"
                            />
                            )}
                            />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Score" />
                 </Grid>
                 <Grid item md ={2}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     multiline
                     label="Top 3 Subjects" />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="#Active Backlogs" />
                 </Grid>
                 <Grid item md ={2}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Backlog Subjects" />
                 </Grid>
                 <Grid item md ={1}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="#Cleared Backlogs" />
                 </Grid>
                 <Grid item md ={2}>
                     <TextField
                     variant="outlined"
                     size="small"
                     fullWidth
                     label="Cleared Backlog Subjects" />
                 </Grid>
                 </Grid>
                 <Grid style={{padding:"1%"}}>
                     <Button variant="contained" color="primary" onClick={this.handleSaved}>Save</Button>
                 </Grid>
            </div>
        )
    }
}

export default AcademicData