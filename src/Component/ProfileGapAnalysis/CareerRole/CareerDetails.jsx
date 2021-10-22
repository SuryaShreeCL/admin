import React, { Component } from "react";
import Form from "./Form";
import Grid from "@material-ui/core/Grid";
import {Gridtheme} from './FormStyle'
import { ThemeProvider } from "@material-ui/core/styles";
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
                  <Form id={el.type} type={el && el.type} title={el && el.type} data={el} />
                </Grid>
              );
            })}
          {this.props.data.length !== 0 &&
            this.props.data.careerRoleEmployeeModels.map((el) => {
              return (
                <Grid item md={12}>
                  <Form id={el.organization} type="Work" data={el} title={el.organization} />
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