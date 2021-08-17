import { Card, Box, Grid } from "@material-ui/core";
import React, { Component } from "react";
import "../Assets/App.css";
import { CardTitle } from "../Assets/StyledComponents";
import DropDown from "../Utils/DropDown";
import PlusButton from "../Utils/PlusButton";
import TabBar from "./TabBar";
import Table from "./Table";
import PaginationComponent from "../Utils/PaginationComponent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export default class AddStudyPlans extends Component {
  render() {
    return (
      <div style={{ padding: "10px 5px 5px" }}>
        <Card className={"card"}>
          <Grid container spacing={3} style={{ padding: "12px" }}>
            {/* title */}
            <Grid item md={12}>
              <CardTitle>Add Study Plan</CardTitle>
            </Grid>

            {/* dropdown and button */}

            <Grid
              container
              //   justifyContent="space-between"
              style={{ padding: "12px" }}
            >
              <Grid item md={3} xs={3}>
                <DropDown fullWidth label="Course" name="course" />
              </Grid>
              <Grid item md={1}></Grid>
              <Grid item md={3}>
                <DropDown
                  fullWidth
                  label="Plan Duration"
                  name="plan duration"
                />
              </Grid>
               
            
            </Grid>
            {/* tabBar */}
            <Grid item md={12}>
              <TabBar />
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}
