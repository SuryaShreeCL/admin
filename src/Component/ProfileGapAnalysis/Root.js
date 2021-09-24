import React, { Component } from "react";
import { Grid, Menu, MenuItem, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import GeneralDetails from "./GeneralDetails";
import { connect } from "react-redux";
import TestResults from "./TestResults";
import TestResultsGraph from "./TestResultsGraph";
import CV from "./CV";
import CvViewer from "./CvViewer";
import InterestDetail from "./InterestDetail";
import PpgaCallNotes from "./PpgaCallNotes";
import { Button } from "bootstrap";
import { ArrowDropDown } from "@material-ui/icons";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
class ProfileGapRoot extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      open: false,
      anchorEl: null,
    };
  }

  renderRightContainer = () => {
    if (this.state.value === 3) {
      return <TestResultsGraph {...this.props} />;
    } else if (this.state.value === 4) {
      return <CvViewer {...this.props} />;
    }
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  menuOpen = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  render() {
    return (
      <div>
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          <Grid
            item
            md={this.state.value === 5 ? 12 : 7}
            style={{
              // margin: "5px",
              borderStyle: "groove",
              borderRadius: "10px",
            }}
          >
            <Paper square>
              <Tabs
                value={this.state.value}
                indicatorColor="none"
                textColor="primary"
                onChange={(e, newValue) => this.setState({ value: newValue })}
                variant="scrollable"
              >
                <Tab label="Dashboard" style={{ textTransform: "none" }} />
                <Tab
                  label="General Details"
                  style={{ textTransform: "none" }}
                />
                <Tab
                  label="Interest Details"
                  style={{ textTransform: "none" }}
                />
                <Tab label="Test Results" style={{ textTransform: "none" }} />
                <Tab label="CV" style={{ textTransform: "none" }} />
                <Tab
                  label="PPGA Call Notes"
                  style={{ textTransform: "none" }}
                />
                <Tab
                  label="Academic Details"
                  style={{ textTransform: "none"}}
                  onClick={(e) => this.menuOpen(e)}
                />
              </Tabs>
            </Paper>
            <TabPanel value={this.state.value} index={0}>
              Item one
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
              <GeneralDetails {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={2}>
              <InterestDetail />
            </TabPanel>
            <TabPanel value={this.state.value} index={3}>
              <TestResults {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={4}>
              <CV {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={5}>
              <PpgaCallNotes {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={6}>
              Item Six
            </TabPanel>
          </Grid>
          <Grid item md={this.state.value === 5 ? 0 : 5} xs={5} sm={5}>
            {this.renderRightContainer()}
          </Grid>
        </Grid>
        <Menu
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>10th</MenuItem>
          <MenuItem onClick={this.handleClose}>12th</MenuItem>
          <MenuItem onClick={this.handleClose}>Diploma</MenuItem>
          <MenuItem onClick={this.handleClose}>Undergraduate</MenuItem>
          <MenuItem onClick={this.handleClose}>Postgraduate</MenuItem>
          <MenuItem onClick={this.handleClose}>Academic Summary</MenuItem>
        </Menu>
      </div>
    );
  }
}
const useStyles = (theme) => ({});
const mapStateToProps = (state) => {
  return {};
};
export default connect(
  mapStateToProps,
  {}
)(withStyles(useStyles)(ProfileGapRoot));
