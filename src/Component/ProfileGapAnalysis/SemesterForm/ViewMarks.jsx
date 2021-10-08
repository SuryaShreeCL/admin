import React, { Component } from "react";
import { Typography, Grid, TextField } from "@material-ui/core";
import '../DiplomaForm/DiplomaForm.css';

export default class ViewMarks extends Component {
  
  //   setting state
  constructor(props) {
    super(props);

    this.state = {
      semesterGpa: "",
      cgpa: "",
      formulaEmployed: "",
      percentage: "",
    };
  }

  // function to handle the textField
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Grid container spacing={3} 
      style={{ padding: "12px" }}
      >
        <Grid item md={3}>
          <TextField
            label="Semester GPA"
            value={this.state.semesterGpa}
            onChange={(e) => this.handleChange(e)}
            fullWidth
          />
        </Grid>

        <Grid item md={3}>
          <TextField
            label="CGPA"
            value={this.state.cgpa}
            onChange={(e) => this.handleChange(e)}
            fullWidth
          />
        </Grid>

        <Grid item md={3}>
          <TextField
            label="Formula Employed"
            value={this.state.formulaEmployed}
            onChange={(e) => this.handleChange(e)}
            fullWidth
          />
        </Grid>

        <Grid item md={3}>
          <TextField
            label="Percentage"
            value={this.state.percentage}
            onChange={(e) => this.handleChange(e)}
            fullWidth
          />
        </Grid>
      </Grid>
    );
  }
}
