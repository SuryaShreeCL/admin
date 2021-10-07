import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import "./DiplomaForm.css";

export default class ViewDetails extends Component {
  render() {
    const { item } = this.props;
    console.log(new Date(item.startDate).getFullYear())
    console.log(item)
    return (
      <div>
        {/* grid container */}
        <Grid container display="flex" direction="row">
          {/* title grid */}
          <Grid
            item
            // container
            md={12}
            xs={12}
            sm={12}
            xl={12}
            lg={12}
            display="flex"
            style={{ padding: "19px" }}
          >
            <Typography className={"viewDetails_title"} variant={"h6"}>{item.type}</Typography>
          </Grid>

          {/* empty grid */}
          <Grid item md={12} xs={12} sm={12} xl={12} lg={12}></Grid>

          {/* 1st grid item  */}
          <Grid
            item
            container
            md={4}
            xs={4}
            sm={4}
            xl={4}
            lg={4}
            display="flex"
            direction="row"
            justify="space-around"
          >
            {/* college name and university (div) */}
            <div className={"main_div1"}>
              <div>
                <Typography
                  color="textSecondary"
                  className={"text_line_height"}
                >
                  College Name
                </Typography>
              </div>
              <div>
                <Typography color="textSecondary">University Name</Typography>
              </div>
            </div>

            {/* computer science and year (div) */}
            <div className={"main_div1"}>
              <div>
                <Typography className={"center_text_line_height"}>
                  {item.college && item.college.name}
                </Typography>
              </div>
              <div>
                <Typography>{item.university && item.university.name}</Typography>
              </div>
            </div>
          </Grid>

          {/* 2nd grid item */}
          <Grid
            item
            container
            md={4}
            xs={4}
            sm={4}
            xl={4}
            lg={4}
            display="flex"
            direction="row"
            justify="space-around"
          >
            {/* department and batch (div) */}
            <div className={"main_div1"}>
              <div>
                <Typography
                  color="textSecondary"
                  className={"text_line_height"}
                >
                  Department
                </Typography>
              </div>
              <div>
                <Typography color="textSecondary">Batch</Typography>
              </div>
            </div>

            {/* computer science and year (div) */}
            <div className={"main_div1"}>
              <div>
                <Typography className={"text_line_height"}>
                  {item.department && item.department.name}
                </Typography>
              </div>
              <div>
                <Typography>
                 {new Date(item.startDate).getFullYear()} - {new Date(item.endDate).getFullYear()}
                </Typography>
              </div>
            </div>
          </Grid>

          {/* 3rd grid item */}
          <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
            {/* CGPA and 60% (div) */}
            <div className={"main_grid"}>
              <div>
                <Typography
                  color="textSecondary"
                  className={"text_line_height"}
                >
                  Cumulative CGPA
                </Typography>
              </div>
              <div>
                <Typography className={"text_line_height"}>{item.score}%</Typography>
              </div>
            </div>
          </Grid>

          {/* empty grid */}
          <Grid item md={12} xs={12} sm={12} xl={12} lg={12}></Grid>
        </Grid>
      </div>
    );
  }
}
