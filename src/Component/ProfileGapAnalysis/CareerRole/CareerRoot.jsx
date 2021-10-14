import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PrimaryButton from "../../../Utils/PrimaryButton";
import "../../../Asset/CareerRole.css";
import Typography from "@material-ui/core/Typography";
import CareerDetails from "./CareerDetails";
import GoalDetails from "./GoalDetails";
import Stepper from "./../../../Utils/Stepper";
import CustomisedStepper from "../../../Utils/CustomisedStepper";
export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      component: "Details",
    };
  }
  handleClick = (data) => {
    this.setState({
      component: data,
    });
  };
  data = [
    {
      monthYear: "June 2021",
      title: "ssc",
      subTitle: null,
      duration: "9 Months",
      breakTime: null,
    },
    {
      monthYear: "July 2024",
      title: "hsc",
      subTitle: null,
      duration: "19 Months",
      breakTime: "18 Months",
    },
    {
      monthYear: "December 2021",
      title: "diploma",
      subTitle: null,
      duration: "6 Months",
      breakTime: null,
    },
    {
      monthYear: "August 2021",
      title: "ug",
      subTitle: "B.Sc",
      duration: "2 Months",
      breakTime: null,
    },
    {
      monthYear: null,
      title: null,
      subTitle: null,
      duration: null,
      breakTime: null,
    },
    {
      monthYear: "December 2020",
      title: "HCL",
      subTitle: "SE",
      duration: "23 Months",
      breakTime: null,
    },
    {
      monthYear: "June 2022",
      title: "TCS",
      subTitle: "SDE",
      duration: "9 Months",
      breakTime: null,
    },
  ];
  handleContent(obj) {
    console.log(obj);
    return (
      <>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <Typography>
              {obj.map((element) => {
               return element.title;
              })}
            </Typography>
          </div>
          <div>
            <Typography>({obj.map((element) => {
               return element.duration;
              })})</Typography>
          </div>
        </div>
      </>
    );
  }
  render() {
    console.log(this.state);
    console.log(this.props);
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item md={8} className={"careerLeftContainer"}>
            <div className={"ttilebuttonstyle"}>
              <div className={"title"}>
                <Typography> 
                  {this.state.component === "Details"
                    ? "Career Details"
                    : "Goal Details"}
                </Typography>
              </div>
              <div className={"careerleftButton"}>
                <PrimaryButton
                  variant={"contained"}
                  color={"primary"}
                  onClick={() => this.handleClick("Details")}
                >
                  Details
                </PrimaryButton>
                <PrimaryButton
                  variant={"outlined"}
                  color={"primary"}
                  className={"careergoalButtonstyle"}
                  onClick={() => this.handleClick("Goals")}
                >
                  Goals
                </PrimaryButton>
              </div>
            </div>
            <div className={"leftdetails"}>
              {this.state.component === "Details" ? (
                <CareerDetails {...this.props} />
              ) : (
                <GoalDetails {...this.props} />
              )}
            </div>
          </Grid>
          <Grid item md={4} className={"careerrightcontent"}>
            <Grid container>
              <Grid item md={12}>
                <Typography className={"title"}>Career Graph</Typography>
              </Grid>
              <Grid item md={8}>
                {/* <Stepper
                  data={this.data}
                  orientation="vertical"
                  component="Career Role"
                  activeStep="null"
                  {...this.props}
                /> */}
                <CustomisedStepper {...this.props}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
