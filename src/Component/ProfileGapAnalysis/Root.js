import { createTheme, Grid, Menu, MenuItem, ThemeProvider, withStyles, IconButton } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { Component } from "react";
import { connect } from "react-redux";
import CV from "./CV";
import Dashboard from "./Dashboard";
import GeneralDetails from "./GeneralDetails";
import InterestDetail from "./InterestDetail";
import PpgaCallNotes from "./PpgaCallNotes";
import TenthForm from "./TenthForm";
import TestResults from "./TestResults";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
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
          {children}
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
    const { classes } = this.props
    console.log(classes, "///////////")
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
            <Paper square className={classes.paperStyle}>
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
              <IconButton className={classes.iconButtonStyle} color="primary" aria-label="add to shopping cart">
              <AccountCircleRoundedIcon fontSize={"large"} />
            </IconButton>
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
const useStyles = (theme) => ({
  paperStyle : {
    position : "relative"
  },
  iconButtonStyle : {
    position : "absolute",
    top : "7px",
    right : "0px"
  }
});
const mapStateToProps = (state) => {
  return {};
};
export default connect(
  mapStateToProps,
  {}
)(withStyles(useStyles)(ProfileGapRoot));
