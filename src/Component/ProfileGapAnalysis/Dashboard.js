import { Grid, Paper, Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import Dot from "../../Utils/Dot";
import { connect } from "react-redux";
import MoreVertIcon from "@material-ui/icons/MoreVert";
class Dashboard extends Component {
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
                <Grid container spacing={1}>
                  <Grid item md={9}>
                    <Typography className={classes.mentorrightcontent}>
                      Personal Information
                    </Typography>
                  </Grid>
                  <Grid item md={3} align={"left"}>
                    <Dot color={"green"} />
                  </Grid>
                  <Grid item md={9}>
                    <Typography className={classes.mentorrightcontent}>
                      Personal Information
                    </Typography>
                  </Grid>
                  <Grid item md={3} align={"left"}>
                    <Dot color={"green"} />
                  </Grid>
                  <Grid item md={9}>
                    <Typography className={classes.mentorrightcontent}>
                      Personal Information
                    </Typography>
                  </Grid>
                  <Grid item md={3} align={"left"}>
                    <Dot color={"green"} />
                  </Grid>
                  <Grid item md={9}>
                    <Typography className={classes.mentorrightcontent}>
                      Personal Information
                    </Typography>
                  </Grid>
                  <Grid item md={3} align={"left"}>
                    <Dot color={"green"} />
                  </Grid>
                  <Grid item md={9}>
                    <Typography className={classes.mentorrightcontent}>
                      Personal Information
                    </Typography>
                  </Grid>
                  <Grid item md={3} align={"left"}>
                    <Dot color={"green"} />
                  </Grid>
                  <Grid item md={9}>
                    <Typography className={classes.mentorrightcontent}>
                      Personal Information
                    </Typography>
                  </Grid>
                  <Grid item md={3} align={"left"}>
                    <Dot color={"green"} />
                  </Grid>
                  <Grid item md={9}>
                    <Typography className={classes.mentorrightcontent}>
                      Personal Information
                    </Typography>
                  </Grid>
                  <Grid item md={3} align={"left"}>
                    <Dot color={"green"} />
                  </Grid>
                  <Grid item md={9}>
                    <Typography className={classes.mentorrightcontent}>
                      Personal Information
                    </Typography>
                  </Grid>
                  <Grid item md={3} align={"left"}>
                    <Dot color={"green"} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={12} style={{ marginTop: "10%" }}>
                <Typography className={classes.title}>
                  Mentoring Details
                </Typography>
              </Grid>
              <Grid container style={{marginLeft:"0px"}}>
                <Grid item md={5}>
                  <Typography className={classes.mentorleftcontent}>
                    Mentor :{" "}
                  </Typography>
                </Grid>
                <Grid item md={7}>
                  <Typography className={classes.mentorrightcontent}>
                    Krithika Srinivasan
                  </Typography>
                </Grid>
                <Grid item md={5}>
                  <Typography className={classes.mentorleftcontent}>
                    PPGA Owner :{" "}
                  </Typography>
                </Grid>
                <Grid item md={7}>
                  <Typography className={classes.mentorrightcontent}>
                    Krithika Srinivasan
                  </Typography>
                </Grid>
                <Grid item md={5}>
                  <Typography className={classes.mentorleftcontent}>
                    PGA Owner :{" "}
                  </Typography>
                </Grid>
                <Grid item md={7}>
                  <Typography className={classes.mentorrightcontent}>
                    Krithika Srinivasan
                  </Typography>
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
              <Grid item md={12}>
                <Paper className={classes.paper}>
                  <Grid container>
                    <Grid item md={11}>
                      <Typography style={{ fontWeight: "bold" }}>
                        Atharva Unde
                      </Typography>
                    </Grid>
                    <Grid item md={1}>
                      <MoreVertIcon />
                    </Grid>
                    <Grid item md={3}>
                      <Typography style={{ fontWeight: "bold" }}>
                        Call Type :
                      </Typography>
                    </Grid>
                    <Grid item md={9}>
                      <Typography
                        style={{ color: "green", fontWeight: "bold" }}
                      >
                        Preliminary Profile Gap Analysis
                      </Typography>
                    </Grid>
                    <Grid item md={3}>
                      <Typography style={{ fontWeight: "bold" }}>
                        Mentor :
                      </Typography>
                    </Grid>
                    <Grid item md={9}>
                      <Typography>Krithika Srinivasan</Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography style={{ fontWeight: "bold" }}>
                        Date and Time for Call :
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography>09/07/2021 05:30 PM IST</Typography>
                    </Grid>
                    <Grid item md={3}>
                      <Typography style={{ fontWeight: "bold" }}>
                        Call Status :
                      </Typography>
                    </Grid>
                    <Grid item md={9}>
                      <Typography>Completed</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item md={12}>
                <Paper className={classes.paper}>
                  <Grid container>
                    <Grid item md={11}>
                      <Typography style={{ fontWeight: "bold" }}>
                        Atharva Unde
                      </Typography>
                    </Grid>
                    <Grid item md={1}>
                      <MoreVertIcon />
                    </Grid>
                    <Grid item md={3}>
                      <Typography style={{ fontWeight: "bold" }}>
                        Call Type :
                      </Typography>
                    </Grid>
                    <Grid item md={9}>
                      <Typography
                        style={{ color: "green", fontWeight: "bold" }}
                      >
                        Preliminary Profile Gap Analysis
                      </Typography>
                    </Grid>
                    <Grid item md={3}>
                      <Typography style={{ fontWeight: "bold" }}>
                        Mentor :
                      </Typography>
                    </Grid>
                    <Grid item md={9}>
                      <Typography>Krithika Srinivasan</Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography style={{ fontWeight: "bold" }}>
                        Date and Time for Call :
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography>09/07/2021 05:30 PM IST</Typography>
                    </Grid>
                    <Grid item md={3}>
                      <Typography style={{ fontWeight: "bold" }}>
                        Call Status :
                      </Typography>
                    </Grid>
                    <Grid item md={9}>
                      <Typography>Completed</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const useStyles = (theme) => ({
  root: {
    padding: "10px",
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
});
const mapStateToProps = (state) => {
  console.log(state);
  return {};
};
export default connect(mapStateToProps, {})(withStyles(useStyles)(Dashboard));
