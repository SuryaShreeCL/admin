import React, { Component } from "react";
import Form from "./Form";
import Grid from "@material-ui/core/Grid";
import {Gridtheme} from './FormStyle'
import { ThemeProvider, withStyles } from "@material-ui/core";
class CareerDetails extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <ThemeProvider theme={Gridtheme}>
        <Grid container spacing={3}>
          {this.props.data.length !== 0 &&
            this.props.data.careerRoleEduDetails.map((el) => {
              return (
                <Grid item md={12}>
                  <Form type={el && el.type} title={el && el.type} data={el} />
                </Grid>
              );
            })}
          {this.props.data.length !== 0 &&
            this.props.data.careerRoleEmployeeModels.map((el) => {
              return (
                <Grid item md={12}>
                  <Form type="Work" data={el} title={el.organization} />
                </Grid>
              );
            })}
        </Grid>
        </ThemeProvider>
      </div>
    );
  }
}
export default CareerDetails