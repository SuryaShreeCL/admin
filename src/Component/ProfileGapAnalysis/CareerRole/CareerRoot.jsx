import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PrimaryButton from "../../../Utils/PrimaryButton";
import "../../../Asset/All.css";
export default class Index extends Component {
  constructor() {
    super();
    this.state = {
        component : "Details"
    };
  }
  handleClick = (data) => {
    this.setState({
        component : data
    })
  }
  render() {
    console.log(this.state);
    console.log(this.props);
    return (
      <div>
        <Grid container>
          <Grid item md={7} className={"careerLeftContainer"}>
            <div className={"careerleftButton"}>
              <PrimaryButton
                variant={"contained"}
                color={"primary"}
                onClick={()=>this.handleClick("Details")}
              >
                Details
              </PrimaryButton>
              <PrimaryButton
                variant={"outlined"}
                color={"primary"}
                className={"careerDetailButtonstyle"}
                onClick={()=>this.handleClick("Goals")}
              >
                Goals
              </PrimaryButton>
            </div>
          </Grid>
          <Grid item md={5}>
            Stepper
          </Grid>
        </Grid>
      </div>
    );
  }
}
