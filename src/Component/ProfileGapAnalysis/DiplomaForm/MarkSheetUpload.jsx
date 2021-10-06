import { Paper, Typography } from "@material-ui/core";
import React, { Component } from "react";
import GetAppIcon from "@material-ui/icons/GetApp";
import "./DiplomaForm.css";
import SemesterForm from "../SemesterForm/Index";

export default class MarkSheetUpload extends Component {
  //  handleClick function to view the semesterForm
  handleClick = () => {
    console.log("click");
    return <SemesterForm />;
  };

  render() {
    return (
      <div>
        {/* markSheet card */}
        <Paper
          variant="outlined"
          className={"markSheet_card"}
          onClick={this.handleClick}
        >
          {/* card 1st div */}
          <div className={"div"}>
            <div>
              <Typography className={"card_header_left"}>
                Computer Science
              </Typography>
            </div>
            <div>
              <Typography className={"card_header_right"}>1st Sem</Typography>
            </div>
          </div>

          {/* card 2nd div */}
          <div>
            <Typography className={"line_spacing"}>
              Savitribai phule Pune University
            </Typography>
          </div>

          {/* card 3rd div */}
          <div className={"div"}>
            {/* 1st sem markSheet and icon (div) */}
            <div className={"div"}>
              <div>
                <Typography className={"card_header_right"}>
                  1st Sem marksheet
                </Typography>
              </div>
              <div className={"icon"}>
                <GetAppIcon />
              </div>
            </div>

            {/* 90% div */}
            <div>
              <Typography className={"card_header_right"}>SGPA 90%</Typography>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}
