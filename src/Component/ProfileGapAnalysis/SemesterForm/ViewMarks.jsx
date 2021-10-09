import React, { Component } from "react";
import { Typography, Grid, TextField, withStyles } from "@material-ui/core";
import '../DiplomaForm/DiplomaForm.css';

class ViewMarks extends Component {
  
  

  render() {
    const { classes} = this.props;
    console.log(classes)
    const { semesterGpa, cgpa, formulaEmployed, percentage, gpaError, cgpaError, formulaError, percentageError } = this.props;
    console.log(this.props);
    return (
      <Grid container spacing={3} 
      style={{ padding: "12px" }}
      >
        <Grid item md={3}>
          <TextField
            label="Semester GPA"
            name="semesterGpa"
            value={semesterGpa}
            classes={{root:classes.textRoot}}

            onChange={this.props.handleChange}
            fullWidth
            error={gpaError.length > 0}
            helperText={gpaError}

          />
        </Grid>

        <Grid item md={3}>
          <TextField
            label="CGPA"
            value={cgpa}
            name="cgpa"
            classes={{root:classes.textRoot}}

            onChange={this.props.handleChange}
            fullWidth
            error={cgpaError.length > 0}
            helperText={cgpaError}
          />
        </Grid>

        <Grid item md={3}>
          <TextField
            label="Formula Employed"
            value={formulaEmployed}
            name="formulaEmployed"
            classes={{root:classes.textRoot}}

            onChange={this.props.handleChange}
            fullWidth
            error={formulaError.length > 0}
            helperText={formulaError}
          />
        </Grid>

        <Grid item md={3}>
          <TextField
            label="Percentage"
            value={percentage}
            name="percentage"
            classes={{root:classes.textRoot}}

            onChange={this.props.handleChange}
            fullWidth
            error={percentageError.length > 0}
            helperText={percentageError}
          />
        </Grid>
      </Grid>
    );
  }
}

const useStyles = (theme) => ({
  textRoot: {
    "& .MuiFormLabel-root": {
      fontSize: "12px !important" ,
      whiteSpace : "no-wrap"
    }  },
});

export default (withStyles(useStyles)(ViewMarks));

