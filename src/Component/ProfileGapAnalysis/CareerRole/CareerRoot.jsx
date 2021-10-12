import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PrimaryButton from "../../../Utils/PrimaryButton";
import "../../../Asset/CareerRole.css";
import Typography from "@material-ui/core/Typography";
import CareerDetails from './CareerDetails';
import GoalDetails from './GoalDetails'
import StepperComponent from './Stepper'
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
  render() {
    console.log(this.state);
    console.log(this.props);
    return (
      <div>
        <Grid container>
          <Grid item md={8} className={"careerLeftContainer"}>
            <div className={"ttilebuttonstyle"}>
              <div className={"title"}>
                <Typography>{this.state.component === "Details" ? "Career Details" : "Goal Details"}</Typography>
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
            {this.state.component === "Details" ? <CareerDetails {...this.props}/> : <GoalDetails {...this.props} />}
            </div>
          </Grid>
          <Grid item md={4}>
            <StepperComponent/>
          </Grid>
        </Grid>
      </div>
    );
  }
}
