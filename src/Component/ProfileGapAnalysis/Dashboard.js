import { Grid, Paper, Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import Dot from "../../Utils/Dot";
import { connect } from "react-redux";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import GreenTick from "../../Asset/Images/greenTick.png";
import Warning from "../../Asset/Images/warningImg.png";

import { getdashboarddetails } from "../../Actions/ProfileGapAction";
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      verifydetails: [],
      mentorname: "",
      calldetails: "",
    };
  }
  componentDidMount() {
    this.props.getdashboarddetails(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      (response) => {
        console.log(response.data);
        if(response.status === 200){
          this.setState({
            verifydetails:
              response.data && response.data.onboardingVerificationStatus,
            mentorname: response.data && response.data.mentorDetails,
            calldetails: response.data && response.data.ppgaAndPgaDetails,
          });
        }
      }
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container className={classes.root} spacing={2}>
          <Grid item md={5} style={{ paddingLeft: "3%" }}>
            <Grid container spacing={1}>
              <Grid item md={12}>
                <Typography className={classes.title}>
                  Onboarding Verification Status
                </Typography>
              </Grid>
              <Grid item md={12}>
                <Grid container>
                { this.state.verifydetails && this.state.verifydetails.map((data) => {
                    return (
                      <>
                        <Grid item md={7}>
                          <Typography className={classes.mentorrightcontent}>
                            {data.sectionName}
                          </Typography>
                        </Grid>
                        <Grid item md={5} align={"left"}>
                          <img
                            src={
                              data.status === "Verified" ? GreenTick : Warning
                            }
                          />
                        </Grid>
                      </>
                    );
                  })}
                  {/* <Grid item md={7}>
                    <Typography className={classes.mentorrightcontent}>
                      Academic Details
                    </Typography>
                  </Grid>
                  <Grid item md={5} align={"left"}>
                    <img src={GreenTick} />
                  </Grid>
                  <Grid item md={7}>
                    <Typography className={classes.mentorrightcontent}>
                      Work Experience
                    </Typography>
                  </Grid>
                  <Grid item md={5} align={"left"}>
                    <img src={GreenTick} />
                  </Grid>
                  <Grid item md={7}>
                    <Typography className={classes.mentorrightcontent}>
                      Aspiration Details
                    </Typography>
                  </Grid>
                  <Grid item md={5} align={"left"}>
                    <img src={GreenTick} />
                  </Grid>
                  <Grid item md={7}>
                    <Typography className={classes.mentorrightcontent}>
                      Work Experience
                    </Typography>
                  </Grid>
                  <Grid item md={5} align={"left"}>
                    <img src={GreenTick} />
                  </Grid>
                  <Grid item md={7}>
                    <Typography className={classes.mentorrightcontent}>
                      Graduate Admission Test
                    </Typography>
                  </Grid>
                  <Grid item md={5} align={"left"}>
                    <img src={GreenTick} />
                  </Grid>
                  <Grid item md={7}>
                    <Typography className={classes.mentorrightcontent}>
                      Test and Surveys
                    </Typography>
                  </Grid>
                  <Grid item md={5} align={"left"}>
                    <img src={GreenTick} />
                  </Grid>
                  <Grid item md={7}>
                    <Typography className={classes.mentorrightcontent}>
                      Others
                    </Typography>
                  </Grid>
                  <Grid item md={5} align={"left"}>
                    <img src={GreenTick} />
                  </Grid> */}
                </Grid>
              </Grid>
              <Grid item md={12} style={{ marginTop: "10%" }}>
                <Typography className={classes.title}>
                  Mentoring Details
                </Typography>
              </Grid>
              <Grid item md={12}>
                <Grid container>
                  <Grid item md={4}>
                    <Typography className={classes.mentorleftcontent}>
                      Mentor :{" "}
                    </Typography>
                  </Grid>
                  <Grid item md={8}>
                    <Typography className={classes.mentorrightcontent}>
                      {this.state.mentorname && this.state.mentorname.mentorName}
                    </Typography>
                  </Grid>
                  <Grid item md={4}>
                    <Typography className={classes.mentorleftcontent}>
                      PPGA Owner :{" "}
                    </Typography>
                  </Grid>
                  <Grid item md={8}>
                    <Typography className={classes.mentorrightcontent}>
                      Krithika Srinivasan
                    </Typography>
                  </Grid>
                  <Grid item md={4}>
                    <Typography className={classes.mentorleftcontent}>
                      PGA Owner :{" "}
                    </Typography>
                  </Grid>
                  <Grid item md={8}>
                    <Typography className={classes.mentorrightcontent}>
                      Krithika Srinivasan
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={7}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Typography className={classes.title}>
                  PPGA/PGA Details
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              {this.state.calldetails &&
                this.state.calldetails.pga.map((data) => {
                  let date = new Date(data.datetime).getDate();
                  let month = new Date(data.datetime).getMonth() + 1;
                  let year = new Date(data.datetime).getFullYear();
                  return (
                    <Grid item md={6}>
                      <Paper className={classes.paper}>
                        <Grid container>
                          <Grid item md={11} className={classes.namegrid}>
                            <Typography className={classes.name}>
                              {data.firstName + " " + data.lastName}
                            </Typography>
                          </Grid>
                          <Grid item md={1}>
                            <MoreVertIcon className={classes.icon} />
                          </Grid>
                          <Grid item md={3}>
                            <Typography className={classes.paperleftfont}>
                              Call Type :
                            </Typography>
                          </Grid>
                          <Grid item md={9}>
                            <Typography
                              style={{
                                color: "green",
                                fontWeight: "bold",
                                fontSize: "12px",
                              }}
                            >
                              {data.callType}
                            </Typography>
                          </Grid>
                          <Grid item md={3}>
                            <Typography className={classes.paperleftfont}>
                              Mentor :
                            </Typography>
                          </Grid>
                          <Grid item md={9}>
                            <Typography className={classes.paperrightfont}>
                              {data.mentorName}
                            </Typography>
                          </Grid>
                          <Grid item md={6}>
                            <Typography className={classes.paperleftfont}>
                              Date and Time for Call :
                            </Typography>
                          </Grid>
                          <Grid item md={6}>
                            <Typography className={classes.paperrightfont}>
                              {date +
                                "/" +
                                month +
                                "/" +
                                year +
                                " " +
                                data.time +
                                " " +
                                "IST"}
                            </Typography>
                          </Grid>
                          <Grid item md={3}>
                            <Typography className={classes.paperleftfont}>
                              Call Status:
                            </Typography>
                          </Grid>
                          <Grid item md={9}>
                            <Typography  style={{
                                color:
                                  data.callStatus === "completed"
                                    ? "green"
                                    : "orange",
                                fontSize: "11px",
                                fontWeight: "bold",
                              }}>
                              {data.callStatus}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  );
                })}
              {this.state.calldetails &&
                this.state.calldetails.ppga.map((data) => {
                  let date = new Date(data.datetime).getDate();
                  let month = new Date(data.datetime).getMonth() + 1;
                  let year = new Date(data.datetime).getFullYear();
                  return (
                    <Grid item md={6}>
                      <Paper className={classes.paper}>
                        <Grid container>
                          <Grid item md={11} className={classes.namegrid}>
                            <Typography className={classes.name}>
                              {data.firstName + " " + data.lastName}
                            </Typography>
                          </Grid>
                          <Grid item md={1}>
                            <MoreVertIcon className={classes.icon} />
                          </Grid>
                          <Grid item md={3}>
                            <Typography className={classes.paperleftfont}>
                              Call Type :
                            </Typography>
                          </Grid>
                          <Grid item md={9}>
                            <Typography
                              style={{
                                color: "green",
                                fontWeight: "bold",
                                fontSize: "12px",
                              }}
                            >
                              {data.callType}
                            </Typography>
                          </Grid>
                          <Grid item md={3}>
                            <Typography className={classes.paperleftfont}>
                              Mentor :
                            </Typography>
                          </Grid>
                          <Grid item md={9}>
                            <Typography className={classes.paperrightfont}>
                              {data.mentorName}
                            </Typography>
                          </Grid>
                          <Grid item md={6}>
                            <Typography className={classes.paperleftfont}>
                              Date and Time for Call :
                            </Typography>
                          </Grid>
                          <Grid item md={6}>
                            <Typography className={classes.paperrightfont}>
                              {date +
                                "/" +
                                month +
                                "/" +
                                year +
                                " " +
                                data.time +
                                " " +
                                "IST"}
                            </Typography>
                          </Grid>
                          <Grid item md={3}>
                            <Typography className={classes.paperleftfont}>
                              Call Status:
                            </Typography>
                          </Grid>
                          <Grid item md={9}>
                            <Typography
                              style={{
                                color:
                                  data.callStatus === "completed"
                                    ? "green"
                                    : "orange",
                                fontSize: "11px",
                                fontWeight: "bold",
                              }}
                            >
                              {data.callStatus}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  );
                })}
              {/* <Grid item md={6}>
                <Paper className={classes.paper}>
                  <Grid container>
                    <Grid item md={11} className={classes.namegrid}>
                      <Typography className={classes.name}>
                        Atharva Unde
                      </Typography>
                    </Grid>
                    <Grid item md={1}>
                      <MoreVertIcon className={classes.icon} />
                    </Grid>
                    <Grid item md={3}>
                      <Typography className={classes.paperleftfont}>
                        Call Type :
                      </Typography>
                    </Grid>
                    <Grid item md={9}>
                      <Typography className={classes.productstyle}>
                        Preliminary Profile Gap Analysis
                      </Typography>
                    </Grid>
                    <Grid item md={3}>
                      <Typography className={classes.paperleftfont}>
                        Mentor :
                      </Typography>
                    </Grid>
                    <Grid item md={9}>
                      <Typography className={classes.paperrightfont}>
                        Krithika Srinivasan
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography className={classes.paperleftfont}>
                        Date and Time for Call :
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography className={classes.paperrightfont}>
                        09/07/2021 05:30 PM
                      </Typography>
                    </Grid>
                    <Grid item md={3}>
                      <Typography className={classes.paperleftfont}>
                        Call Status:
                      </Typography>
                    </Grid>
                    <Grid item md={9}>
                      <Typography className={classes.status}>
                        Completed
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const useStyles = (theme) => ({
  root: {
    padding: "5px",
  },
  title: {
    fontSize: "18px",
    color: "#2f9be5",
    fontWeight: "bolder",
  },
  paper: {
    padding: "10px",
  },
  mentorleftcontent: {
    fontSize: "16px",
    color: "#043455",
    fontWeight: "bolder",
  },
  mentorrightcontent: {
    fontSize: "16px",
  },
  paperrightfont: {
    fontSize: "11px",
  },
  paperleftfont: {
    fontWeight: "bold",
    fontSize: "11px",
  },
  productstyle: {
    color: "green",
    fontWeight: "bold",
    fontSize: "12px",
  },
  namegrid: {
    display: "flex",
    alignItems: "center",
  },
  paper: {
    padding: "11px",
  },
  name: {
    fontWeight: "bold",
    fontSize: "12px",
  },
  icon: {
    color: "#2f9be5",
  },
});
const mapStateToProps = (state) => {
  console.log(state);
  return {
    getdashboarddetailsList:
      state.ProfileGapAnalysisReducer.getdashboarddetails,
  };
};
export default connect(mapStateToProps, { getdashboarddetails })(
  withStyles(useStyles)(Dashboard)
);
