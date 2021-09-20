import React, { Component } from "react";
import { Grid, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import GeneralDetails from "./GeneralDetails";
import { connect } from "react-redux";
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
    };
  }
  render() {
    return (
      <div>
        <Grid container>
          <Grid
            item
            md={8}
            style={{
              margin: "5px",
              borderStyle: "groove",
              borderRadius: "10px",
            }}
          >
            <Paper square style={{ margin: "10px" }}>
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
                  style={{ textTransform: "none" }}
                />
              </Tabs>
            </Paper>
            <TabPanel value={this.state.value} index={0}>
              Item one
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
             <GeneralDetails {...this.props}/>
            </TabPanel>
            <TabPanel value={this.state.value} index={2}>
              Item Two
            </TabPanel>
            <TabPanel value={this.state.value} index={3}>
              Item Three
            </TabPanel>
            <TabPanel value={this.state.value} index={4}>
              Item Four
            </TabPanel>
            <TabPanel value={this.state.value} index={5}>
              Item Five
            </TabPanel>
            <TabPanel value={this.state.value} index={6}>
              Item Six
            </TabPanel>
          </Grid>
          <Grid item md={4}></Grid>
        </Grid>
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
