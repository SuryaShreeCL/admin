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
import { ThemeProvider } from "@material-ui/core/styles";
import { Gridtheme } from "./FormStyle";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

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
        console.log(response);
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
  handleScroll = (event, data) => {
    if (this.state.component === "Details") {
      document.getElementById(data.title).scrollIntoView();
    }
  };
  render() {
    return (
      <div>
        <ThemeProvider theme={Gridtheme}>
          <Grid container spacing={1}>
            <Grid item md={8} className={"careerLeftContainer"}>
              <div className={"ttilebuttonstyle"}>
                <div className={"titlediv"}>
                  <Typography className={"title"}>
                    {this.state.component === "Details"
                      ? "Career Details"
                      : "Goal Details"}
                  </Typography>
                </div>
                <div className={"careerleftButton"}>
                  <ToggleButtonGroup>
                    <ToggleButton
                      className={
                        this.state.component === "Details"
                          ? "select"
                          : "not-select"
                      }
                      onClick={() => this.handleClick("Details")}
                    >
                      Details
                    </ToggleButton>
                    <ToggleButton
                      className={
                        this.state.component === "Goals"
                          ? "select"
                          : "not-select"
                      }
                      onClick={() => this.handleClick("Goals")}
                    >
                      Goals
                    </ToggleButton>
                  </ToggleButtonGroup>
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
                <Grid item md={12} className={"leftdetails"}>
                  <CustomisedStepper
                    data={this.state.graphDetails}
                    handleClick={(e, data) => this.handleScroll(e, data)}
                    {...this.props}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ThemeProvider>
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
