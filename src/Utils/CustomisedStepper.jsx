import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import "../Asset/Stepper.css";
export default class CustomisedStepper extends Component {
  render() {
    return (
      <div>
        <div className={"stepper_vertical"}>
          <div>March 2014</div>
          <div className={"stepper_vertical_center_content"}>
            <div className={"stepper_circle_green"}></div>
            <div className={"stepper_line_green"}></div>
          </div>
          <div>
            {" "}
            <Typography>title</Typography>
            <Typography>Sub title</Typography>
          </div>
        </div>
        <div className={"stepper_vertical"}>
          <div>
            <Typography>March 2014</Typography>
          </div>
          <div className={"stepper_vertical_center_content"}>
            <div className={"stepper_circle_green"}></div>
            <div className={"stepper_line_green"}></div>
          </div>
          <div>
            {" "}
            <Typography>title</Typography>
            <Typography>Sub title</Typography>
          </div>
        </div>
        <div className={"stepper_vertical"}>
          <div>
            <Typography>March 2014</Typography>
          </div>
          <div className={"stepper_vertical_center_content"}>
            <div className={"stepper_circle_green"}></div>
            <div className={"stepper_line_green"}></div>
          </div>
          <div>
            <Typography>title</Typography>
            <Typography>Sub title</Typography>
          </div>
        </div>
        <div className={"stepper_vertical"}>
          <div>
            <Typography>March 2014</Typography>
          </div>
          <div className={"stepper_vertical_center_content"}>
            <div className={"stepper_circle_green"}></div>
            <div className={"stepper_line_green"}></div>
          </div>
          <div>
            <Typography>title</Typography>
            <Typography>Sub title</Typography>
          </div>
        </div>
        <div className={"stepper_vertical"}>
          <div>
            <Typography>March 2014</Typography>
          </div>
          <div className={"stepper_vertical_center_content"}>
            <div className={"stepper_circle_green"}></div>
            <div className={"stepper_line_green"}></div>
          </div>
          <div>
            <Typography>title</Typography>
            <Typography>Sub title</Typography>
          </div>
        </div>
      </div>
    );
  }
}
