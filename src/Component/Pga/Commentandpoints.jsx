import { Grid, TextField, Icon, IconButton } from '@material-ui/core'
import React, { Component } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import AddCircleIcon from '@material-ui/icons/AddCircle';


export default class commentandpoints extends Component {
    choice=[
        {title:"Option 1"},
        {title:"Option 2"},
        {title:"Option 3"},
        {title:"Option 4"},
        {title:"Option 5"},
    ]
    status=[
      {title:"Not started"},
      {title:"In progress"},
      {title:"Completed"},
      {title:"Backlog"},
    ]
    render() {
        return (
            <div>
                <h6 style={{padding:"1%"}}>Following Block Reports for Each Quarter in the given Year</h6>
                <Grid container spacing={2} style={{padding:"2%"}}>
                    <Grid item md={2}>
                        <h6>Focus 1 (Focus_Quarter)</h6>
                    </Grid>
                    <Grid item md={2}>
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
                                  label="Focus 1"
                                  variant="outlined"
                                />
                            )} />
                    </Grid>
                    <Grid item md={3}>
                      <TextField
                      variant="outlined"
                      size="small"
                      label="Category Description" />
                    </Grid>
                    <Grid item md={3}>
                        <TextField
                         variant="outlined"
                         size="small"
                         label="Category Remark" />
                    </Grid>
                    <Grid item md={2}>
                    <Autocomplete
                            id="combo-box-demo"
                            options={this.status}
                            getOptionLabel={(option) => option.title}
                            // value={}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Status"
                                  variant="outlined"
                                />
                            )} />
                    </Grid>
                    <Grid item md={2}>
                        <h6>Focus 2 (Focus_Quarter)</h6>
                    </Grid>
                    <Grid item md={2}>
                    <Autocomplete
                            id="combo-box-demo"
                            // options={}
                            // value={}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Focus 2"
                                  variant="outlined"
                                />
                            )} />
                    </Grid>
                    <Grid item md={3}>
                      <TextField
                      variant="outlined"
                      size="small"
                      label="Category Description" />
                    </Grid>
                    <Grid item md={3}>
                        <TextField
                         variant="outlined"
                         size="small"
                         label="Category Remark" />
                    </Grid>
                    <Grid item md={2}>
                    <Autocomplete
                            id="combo-box-demo"
                            options={this.status}
                            getOptionLabel={(option) => option.title}
                            // value={}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Status"
                                  variant="outlined"
                                />
                            )} />
                    </Grid>
                    <Grid item md={2}>
                        <h6>Focus 3 (Focus_Quarter)</h6>
                    </Grid>
                    <Grid item md={2}>
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
                                  label="Focus 3"
                                  variant="outlined"
                                />
                            )} />
                    </Grid>
                    <Grid item md={3}>
                      <TextField
                      variant="outlined"
                      size="small"
                      label="Category Description" />
                    </Grid>
                    <Grid item md={3}>
                        <TextField
                         variant="outlined"
                         size="small"
                         label="Category Remark" />
                    </Grid>
                    <Grid item md={2}>
                    <Autocomplete
                            id="combo-box-demo"
                            options={this.status}
                            getOptionLabel={(option) => option.title}
                            // value={}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Status"
                                  variant="outlined"
                                />
                            )} />
                    </Grid>
                    <Grid item md={2}>
                        <h6>Focus 4 (Focus_Quarter)</h6>
                    </Grid>
                    <Grid item md={2}>
                    <Autocomplete
                            id="combo-box-demo"
                            // value={}
                            options={this.choice}
                            getOptionLabel={(option) => option.title}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Focus 4"
                                  variant="outlined"
                                />
                            )} />
                    </Grid>
                    <Grid item md={3}>
                      <TextField
                      variant="outlined"
                      size="small"
                      label="Category Description" />
                    </Grid>
                    <Grid item md={3}>
                        <TextField
                         variant="outlined"
                         size="small"
                         label="Category Remark" />
                    </Grid>
                    <Grid item md={2}>
                    <Autocomplete
                            id="combo-box-demo"
                            // value={}
                            options={this.status}
                            getOptionLabel={(option) => option.title}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Status"
                                  variant="outlined"
                                />
                            )} />
                    </Grid>
                </Grid>
                <hr />
                <h6 style={{padding:"1%"}}>Additional Points</h6>
                <Grid container spacing={2} style={{padding:"1%"}}>
                    <Grid item md={2}>
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
                                  label="Category"
                                  variant="outlined"
                                />
                            )} />
                    </Grid>
                    <Grid item md={8}>
                       <TextField 
                       fullWidth
                       variant="outlined"
                       size="small"
                       label="Category Remark" />
                    </Grid>
                    <Grid item md={2}>
                    <IconButton>
                             <Icon>
                                 <AddCircleIcon />
                             </Icon>
                         </IconButton> 
                    </Grid>
                </Grid>
            </div>
        )
    }
}
