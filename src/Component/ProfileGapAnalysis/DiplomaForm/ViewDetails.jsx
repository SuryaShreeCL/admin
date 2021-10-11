import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import "./DiplomaForm.css";

export default class ViewDetails extends Component {
  render() {
    const { item } = this.props;
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
            <Typography className={"viewDetails_title"} variant={"h6"}>
              {item.type}
            </Typography>
          </Grid>

          {/* empty grid */}
          <Grid item md={12} xs={12} sm={12} xl={12} lg={12}></Grid>
          
          {/* 1st grid item */}
          <Grid item md={4} xs={4} sm={4} xl={4} lg={4} display="flex">
            <div className={"grid_item1_div"}>
              <div className={"collegeName_div"}>
                <Typography color="textSecondary">College Name</Typography>
                <Typography>{item.college && item.college.name}</Typography>
              </div>
              <div className={"collegeName_div"}>
                <Typography color="textSecondary">University Name</Typography>
                <Typography>
                  {item.university && item.university.name}
                </Typography>
              </div>
            </div>
          </Grid>

          {/* 2nd grid item */}
          <Grid item md={4} xs={4} sm={4} xl={4} lg={4} display="flex">
            <div className={"grid_item1_div"}>
              <div className={"collegeName_div"}>
                <Typography color="textSecondary">Department</Typography>
                <Typography>
                  {item.department && item.department.name}
                </Typography>
              </div>
              <div className={"batch_div"}>
                <Typography color="textSecondary">Batch</Typography>
                <Typography>
                  {new Date(item.startDate).getFullYear()} -{" "}
                  {new Date(item.endDate).getFullYear()}
                </Typography>
              </div>
            </div>
          </Grid>

          {/* 3rd grid item */}
          <Grid item md={4} xs={4} sm={4} xl={4} lg={4} display="flex">
            <div className={"grid_item1_div"}>
              <div className={"grid_item3_div"}>
                <Typography color="textSecondary">Cumulative CGPA</Typography>
                <Typography>{item.score}%</Typography>
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
