import { Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import Pie from "../../Asset/Images/Pie Blue.svg";
class TodayDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.top}>
          <Typography style={{ fontWeight: 700 }}>Today's Documents</Typography>
          <Typography color={"textSecondary"}>
            Documents That Needs To Be Closed Today
          </Typography>
        </div>
        <div className={classes.middle}>
          <img src={Pie} style={{ marginTop: "20px" }}></img>
        </div>
        <div className={classes.bottom}>
          <div className={classes.pallete}>
            <div style={{height : "14px", width : "14px", backgroundColor : "#855CF8", borderRadius : "50%"}}></div>
            <Typography variant="caption">ACS MS</Typography>
          </div>
          <div className={classes.pallete}>
            <div style={{height : "14px", width : "14px", backgroundColor : "#855CF8", borderRadius : "50%"}}></div>
            <Typography variant="caption">ACS MBA</Typography>
          </div>
          <div className={classes.pallete}>
            <div style={{height : "14px", width : "14px", backgroundColor : "#263238", borderRadius : "50%"}}></div>
            <Typography variant="caption">ACS MIM</Typography>
          </div>
          <div className={classes.pallete}>
            <div style={{height : "14px", width : "14px", backgroundColor : "#DCDEDF", borderRadius : "50%"}}></div>
            <Typography variant="caption">Profile Builder</Typography>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const useStyles = () => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
      marginTop : "20px",
    display: "flex",
    width : "100%",
    justifyContent : "space-evenly"
  },
  pallete: {
    display: "flex",
    flexDirection: "column",
  },
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(useStyles)(TodayDocument));
