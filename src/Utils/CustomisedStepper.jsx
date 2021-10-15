import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid'
import React, { Component } from "react";
import "../Asset/Stepper.css";
export default class CustomisedStepper extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.data && this.props.data.map((el,index) => {
          console.log(index)
          return (
              <Grid container>
                <Grid item md={4} align="right">
                  <div>{el.monthYear}</div>
                </Grid>
                <Grid item md={1}>
                  <div className={"stepper_vertical_center_content"}>
                    <div className={ el.title.indexOf("B") === -1 ? "stepper_circle_green" : "stepper_circle_red"}></div>
                    { index < this.props.data.length - 1 && <div className={this.props.data[index+1].title.indexOf("B") === -1 ? "stepper_line_green" : "stepper_line_red"}></div>}
                  </div>
                </Grid>
              <Grid item md={7}>
                <div>
                  <div className={"stepper_title_div"}>
                  <Typography>{el.title}</Typography>
                  { el.duration !== null ?  <Typography>({el.duration})</Typography> : null}
                  </div>
                  <Typography>{el.subTitle}</Typography>
                </div>
              </Grid>
              </Grid>
          );
        })}
      </div>
    );
  }
}
