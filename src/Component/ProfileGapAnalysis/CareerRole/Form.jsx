import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
export default class Form extends Component {
  constructor() {
    super();
    this.state = {};
  }
  renderContent() {
    if (this.props.type === "X" || this.props.type === "XII") {
      return (
        <>
          <Grid item md={8}>
            <TextField label="School Name" disabled value={this.props.data.name}/>
          </Grid>
          <Grid item md={4}>
            {/* <TextField label="Cumulative" disabled /> */}
          </Grid>
        </>
      );
    }
    if (this.props.type === "Diploma" || this.props.type === "Undergraduate" || this.props.type === "Postgraduate") {
      return (
        <>
          <Grid item md={5}>
            <TextField label="College Name" disabled value={this.props.data.name}/>
          </Grid>
          <Grid item md={5}>
            <TextField label="Degree" disabled value={this.props.data.degreeName}/>
          </Grid>
          <Grid item md={2}>
            {/* <TextField label="Cumulative" disabled /> */}
          </Grid>
        </>
      );
    }
    if (this.props.type === "Work") {
      return (
        <>
          <Grid item md={8}>
            <TextField label="Job Role" disabled value={this.props.data.role}/>
          </Grid>
          <Grid item md={4}>
            <TextField label="Cumulative" disabled />
          </Grid>
        </>
      );
    }
  }
  render() {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography className={"title"}>{this.props.title}</Typography>
          </Grid>
          {this.renderContent()}
          <Grid item md={3}>
            <TextField label="Marks" disabled value={this.props.data.score} />
          </Grid>
          <Grid item md={3}>
            <TextField label="Start Month" disabled value={this.props.data.startDate}/>
          </Grid>
          <Grid item md={3}>
            <TextField label="End Month" disabled value={this.props.data.endDate}/>
          </Grid>
          <Grid item md={3}>
            <TextField label="Duration" disabled value={this.props.data.duration}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}
