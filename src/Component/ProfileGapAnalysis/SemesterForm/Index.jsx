import React, { Component } from "react";
import ViewMarks from "./ViewMarks";
import ViewSemesterDetails from "./ViewSemesterDetails";
import { Grid } from "@material-ui/core";
import "../DiplomaForm/DiplomaForm.css";
import BottomButton from "../BottomButton";

export default class Index extends Component {
  render() {
    return (
      <div>
        <Grid container position="relative" height="100vh">
          {/*  left container*/}

          {/* semester details */}
          <Grid item md={7}>
            <ViewSemesterDetails />

            <ViewMarks />
          </Grid>

          {/* divider and button */}
          <Grid
            item
            md={12}
            xs={12}
            sm={12}
            xl={12}
            lg={12}
            position="absolute"
            bottom="0px"
            width="100%"
          >
            <BottomButton />
          </Grid>

          {/* right container - markSheet */}
          <Grid item md={5}></Grid>
        </Grid>
      </div>
    );
  }
}
