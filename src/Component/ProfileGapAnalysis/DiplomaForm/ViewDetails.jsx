import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import './DiplomaForm.css';

export default class ViewDetails extends Component {
  render() {
    return (
      <div>
        <Grid container style={{ display: "flex", flexDirection: "row" }}>
          <Grid
            item
            container
            md={12}
            style={{ display: "flex", padding: "19px" }}
          >
            <Typography>Diploma</Typography>
          </Grid>
          <Grid item md={12}></Grid>

          <Grid
            item
            md={4}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <div>
                <Typography color="textSecondary" style={{ lineHeight: "37px", }}>
                  College Name
                </Typography>
              </div>
              <div>
                <Typography>Computer Science</Typography>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <div>
                <Typography style={{ lineHeight: "37px" }}>
                  University Name
                </Typography>
              </div>
              <div>
                <Typography>2021-2024</Typography>
              </div>
            </div>
          </Grid>

          <Grid
            item
            md={4}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <div>
                <Typography style={{ lineHeight: "40px" }}>
                  Department
                </Typography>
              </div>
              <div>
                <Typography>Batch</Typography>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <div>
                <Typography style={{ lineHeight: "40px" }}>
                  Computer Science
                </Typography>
              </div>
              <div>
                <Typography>2021-2024</Typography>
              </div>
            </div>
          </Grid>

          <Grid item md={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <div>
                <Typography style={{ lineHeight: "40px" }}>
                  Cumulative CGPA
                </Typography>
              </div>
              <div>
                <Typography style={{ lineHeight: "40px" }}>60%</Typography>
              </div>
            </div>
          </Grid>

          <Grid item md={12}></Grid>

          <Grid item md={12}>
            <hr style={{ width: "96%" }} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
