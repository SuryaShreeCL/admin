import { Paper, Typography, Grid } from "@material-ui/core";
import React, { Component } from "react";
import GetAppIcon from "@material-ui/icons/GetApp";
import "./DiplomaForm.css";

export default class MarkSheetUpload extends Component {
  render() {
    const { department, university, semester, markSheet, score } = this.props;
    return (
      <div onClick={this.props.handleChange}>
        {/* markSheet card */}
        <Grid container>
          <Grid item md={12}>
            {/* paper */}
            <Paper
              variant="outlined"
              className={"markSheet_card"}
              onClick={this.handleClick}
            >
              {/* card 1st div */}
              <div className={"div"}>
                <div>
                  <Typography className={"card_header_left"}>
                    {department}
                  </Typography>
                </div>
                <div>
                  <Typography className={"card_header_right"}>
                    {semester}st Sem
                  </Typography>
                </div>
              </div>

              {/* card 2nd div */}
              <div>
                <Typography className={"line_spacing"}>{university}</Typography>
              </div>

              {/* card 3rd div */}
              <div className={"div"}>
                {/* 1st sem markSheet and icon (div) */}
                <div className={"div"}>
                  <div>
                    <Typography className={"card_header_right"}>
                      {markSheet}
                    </Typography>
                  </div>
                  <div className={"icon"}>
                    <GetAppIcon onClick={this.props.handleDownloadClick} />
                  </div>
                </div>

                {/* 90% div */}
                <div>
                  <Typography className={"card_header_right"}>
                    SGPA {score}%
                  </Typography>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
