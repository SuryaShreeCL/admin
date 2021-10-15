import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "../../../Asset/CareerRole.css";
import Typography from "@material-ui/core/Typography";
import CareerDetails from "./CareerDetails";
import GoalDetails from "./GoalDetails";
import CustomisedStepper from "../../../Utils/CustomisedStepper";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import {
  getGraphDetails,
  getCareerDetails,
} from "../../../Actions/CareerRoleGraph";
class Index extends Component {
  constructor() {
    super();
    this.state = {
      component: "Details",
      careerDetails: [],
      graphDetails: [],
    };
  }
  handleClick = (data) => {
    this.setState({
      component: data,
    });
  };
  componentDidMount() {
    this.props.getGraphDetails(
      this.props.match.params.studentId,
      (response) => {
        if (response.status === 200) {
          this.setState({
            graphDetails: response.data,
          });
        }
      }
    );
    this.props.getCareerDetails(
      this.props.match.params.studentId,
      (response) => {
        if (response.status === 200) {
          this.setState({
            careerDetails: response.data,
          });
        }
      }
    );
  }
  handleContent(obj) {
    return (
      <>
        <div className={"careerstepper"}>
          <div>
            <Typography>
              {obj.map((element) => {
                return element.title;
              })}
            </Typography>
          </div>
          <div>
            <Typography>
              (
              {obj.map((element) => {
                return element.duration;
              })}
              )
            </Typography>
          </div>
        </div>
      </>
    );
  }
  render() {
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
                <Button
                  variant={"contained"}
                  color={"primary"}
                  onClick={() => this.handleClick("Details")}
                >
                  Details
                </Button>
                <Button
                  variant={"outlined"}
                  color={"primary"}
                  onClick={() => this.handleClick("Goals")}
                >
                  Goals
                </Button>
              </div>
            </div>
            <div className={"leftdetails"}>
              {this.state.component === "Details" ? (
                <CareerDetails
                  data={this.state.careerDetails}
                  {...this.props}
                />
              ) : (
                <GoalDetails {...this.props} />
              )}
            </div>
          </Grid>
          <Grid item md={4} className={"careerrightcontent"}>
            <Grid container spacing={3}>
              <Grid item md={12}>
                <Typography className={"title"}>Career Graph</Typography>
              </Grid>
              <Grid item md={11} className={"leftdetails"}>
                <CustomisedStepper
                  data={this.state.graphDetails}
                  {...this.props}
                />
              </Grid>
              <Grid item md={1}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, { getGraphDetails, getCareerDetails })(
  Index
);
