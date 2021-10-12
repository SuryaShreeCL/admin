import React, { Component } from "react";
import Form from "./Form";
import Grid from "@material-ui/core/Grid";
export default class CareerDetails extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <Form title="X Class" type="School" {...this.props} />
          </Grid>
          <Grid item md={12}>
            <Form title="XII Class" type="School" {...this.props} />
          </Grid>
           <Grid item md={12}>
            <Form title="Diploma" type="College" {...this.props} />
          </Grid>
         <Grid item md={12}>
            <Form title="Undergraduate" type="College" {...this.props} />
          </Grid>
          <Grid item md={12}>
            <Form title="PostGraduate" type="College"  {...this.props} />
          </Grid>
          <Grid item md={12}>
            <Form title="Work Experience" type="Work" {...this.props} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
