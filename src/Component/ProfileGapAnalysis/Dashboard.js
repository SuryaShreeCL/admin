import {
  Grid,
  Paper,
  Typography,
  withStyles,
  ThemeProvider,
  createTheme,
} from "@material-ui/core";
import React, { Component } from "react";
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
        if (response.status === 200) {
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
  theme = createTheme({
    overrides: {
      Dashboard: {
        paper: {
          padding: "5px",
        },
      },
    },
  });
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container className={classes.root} spacing={2}>
          <Grid item md={5}>
            <Grid container spacing={1}>
              <Grid item md={12}>
                <Typography className={classes.title}>
                  Onboarding Verification Status
                </Typography>
              </Grid>
              <Grid item md={12}>
                <Grid container>
                  {this.state.verifydetails &&
                    this.state.verifydetails.sort((a,b)=>parseInt(a.orderNO)-parseInt(b.orderNO)).map((data) => {
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
                </Grid>
              </Grid>
              <Grid item md={12} className={classes.mentorstyle}>
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
                      {this.state.mentorname &&
                        this.state.mentorname.mentorName}
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
                            <Typography className={classes.callType}>
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
                             className={data.callStatus === "completed" ? classes.completedstatus : classes.scheduledstatus}
                            >
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
                      <ThemeProvider theme={this.theme}>
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
                              <Typography className={classes.callType}>
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
                              className={data.callStatus === "completed" ? classes.completedstatus : classes.scheduledstatus}
                              >
                                {data.callStatus}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </ThemeProvider>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const useStyles = (theme) => ({
  root: {
    padding: "3%",
  },
  title: {
    fontSize: "18px",
    color: "#2f9be5",
    fontWeight: "bolder",
  },
  paper: {
    padding: "5px",
  },
  mentorleftcontent: {
    fontSize: "16px",
    color: "#043455",
    fontWeight: "bolder",
  },
  mentorrightcontent: {
    fontSize: "17px",
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
    padding: "5px",
  },
  name: {
    fontWeight: "bold",
    fontSize: "12px",
  },
  icon: {
    color: "#2f9be5",
  },
  leftgrid: {
    paddingLeft: "3%",
  },
  mentorstyle: {
    marginTop: "10%",
  },
  callType: {
    color: "green",
    fontWeight: "bold",
    fontSize: "12px",
  },
  completedstatus : {
    fontSize: "11px",
    fontWeight: "bold",
    color:"green"
  },
  scheduledstatus : {
    fontSize: "11px",
    fontWeight: "bold",
    color:"orange"
  }
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
