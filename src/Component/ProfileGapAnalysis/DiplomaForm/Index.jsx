import React, { Component } from "react";
import MarkSheetUpload from "./MarkSheetUpload";
import ViewDetails from "./ViewDetails";
import { Grid, Divider, Button } from "@material-ui/core";
import "./DiplomaForm.css";
import BottomButton from "../BottomButton";

export default class Index extends Component {
  render() {
    return (
      <div>
        <Grid container position="relative" height="100vh">
          <Grid item md={12}>
            <Grid container>
              {/* View details */}
              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <ViewDetails />
              </Grid>

              {/* divider grid */}
              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <hr className={"divider"} />
              </Grid>

              {/* markSheet card */}
              <Grid
                item
                md={4}
                xs={4}
                sm={4}
                xl={4}
                lg={4}
                spacing={3}
                style={{ padding: "15px" }}
              >
                <MarkSheetUpload />
              </Grid>
            </Grid>
          </Grid>

          {/* divider and button grid */}

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
        </Grid>
      </div>
    );
  }
}
