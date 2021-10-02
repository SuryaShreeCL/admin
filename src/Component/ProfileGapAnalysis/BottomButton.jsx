import React, { Component } from "react";
import { Grid, Button } from "@material-ui/core";
import "./DiplomaForm/DiplomaForm.css";

export default class BottomButton extends Component {
  render() {
    return (
      <div>
        {/* divider and button */}
        <hr className={"bottom_divider"} />
        <Button className={"button"} variant={"contained"} color={"primary"}>
          Save
        </Button>
      </div>
    );
  }
}
