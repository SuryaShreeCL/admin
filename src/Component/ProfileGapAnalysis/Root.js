import React, { Component } from "react";
import { Grid, Menu, MenuItem, withStyles, createTheme, ThemeProvider } from "@material-ui/core";
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
import Dashboard from "./Dashboard";
import TenthForm from "./TenthForm";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './InterestDetail.css'

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

  // renderRightContainer = () => {
  //   if (this.state.value === 1) {
  //     return <CvViewer doctype={"cv"} {...this.props} />;
  //   } else if (this.state.value === 3) {
  //     return <TestResultsGraph {...this.props} />;
  //   } else if (this.state.value === 4) {
  //     return <CvViewer doctype={"cv"} {...this.props} />;
  //   }
  // };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  menuOpen = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
      value : 6
    });
  };

  tabTheme = createTheme({
    overrides : {
    
      MuiTab : {
        wrapper : {
          display : "flex",
          flexDirection : "row-reverse",
          gridGap : "5px"
        },
        root : {
          "&.MuiTab-root" : {
            padding : "5px"
          }
        }
      }
      
    }
  })

  

  render() {
    return (
      <div>
        <Grid container style={{ marginTop: "10px" }}>
          <Grid item md={12} 
            // md={this.state.value === 5 ? 12 : 7}
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
                // variant="scrollable"
              >
                <Tab label="Dashboard" style={{ textTransform: "none",minWidth:"135px"}} />
                <Tab
                  label="General Details"
                  style={{ textTransform: "none",minWidth:"135px"}}
                />
                <Tab 
                  label="Interest Details"
                  style={{ textTransform: "none",minWidth:"135px"}}
                />
                <Tab label="Test Results" style={{ textTransform: "none",minWidth:"135px",}} />
                <Tab label="CV" style={{ textTransform: "none",minWidth:"135px"}} />
                <Tab 
                  label="PPGA Call Notes"
                  style={{ textTransform: "none",minWidth:"135px"}}
                />
                <ThemeProvider theme={this.tabTheme}>
                <Tab style={{ minWidth:"135px",paddingRight:"0px"}}
                  label="Academic Details"
                  icon={<ExpandMoreIcon style={{color: "black",marginTop:"7px"}}/>}
                  style={{ textTransform: "none"}}
                  onClick={(e) => this.menuOpen(e)}
                />
                </ThemeProvider>
               
              </Tabs>
            </Paper>
            <TabPanel value={this.state.value} index={0}>
              <Dashboard {...this.props}/>
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
              <GeneralDetails {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={2}>
              <InterestDetail {...this.props} />
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
              <TenthForm {...this.props} />
            </TabPanel>
          </Grid>
          {/* <Grid item md={this.state.value === 5 ? 0 : 5} xs={5} sm={5}>
            {this.renderRightContainer()}
          </Grid> */}
        </Grid>
        <Menu
          style={{top:"65px"}}
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MenuItem onClick={()=>this.setState({value : 6, open : false})}>10th</MenuItem>
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
