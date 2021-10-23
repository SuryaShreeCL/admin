import {
  createTheme,
  Grid,
  Menu,
  MenuItem,
  ThemeProvider,
  withStyles,
  IconButton,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { Component } from "react";
import { connect } from "react-redux";
import CV from "./CV";
import Dashboard from "./Dashboard";
import InterestDetail from "./InterestDetail";
import PpgaCallNotes from "./PpgaCallNotes";
import TenthForm from "./TenthForm";
import TestResults from "./TestResults";
import DiplomaForm from "./DiplomaForm/Index";
import SemesterForm from "./SemesterForm/Index";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import "./InterestDetail.css";
import {
  setPoperAnchorEl,
  getAcademicType,
  isClickedSem,
} from "../../Actions/HelperAction";
import TwelthForm from "./TwelthForm";
import Index from "./AcademicSummary/Index";
import GeneralDetails from "./GeneralDetails" ;
import PgaGeneralDetails from "../PgaReport/GeneralDetails";
import SelectSchool from "../PgaReport/SelectSchool";
import AdditionalPointsForm from "../PgaReport/AdditionalPointsForm";
import SpecializationTrack from "../PgaReport/SpecializationTrack";
import PlanOfAction from "../PgaReport/PlanOfAction";
import CriticalSuccessFactor from "../PgaReport/CriticalSuccessFactor";
import { getPgaTabDropDown } from "../../AsyncApiCall/PgaReport/PgaReport";
import ProfileFit from "../PgaReport/ProfileFit";
import Strengths from "../PgaReport/Strengths";
import Concerns from "../PgaReport/Concerns";
import ProgramInformation from "../PgaReport/ProgramInformation";
import ActivitiesForGmat from "../PgaReport/ActivitiesForGmat";
import AllRoundActivities from "../PgaReport/AllRoundActivities";
import Preview from "../PgaReport/Preview";
import TopBSchool from "../PgaReport/TopBSchool";
import CareerRoot from './CareerRole/CareerRoot'
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
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
class ProfileGapRoot extends Component {
  constructor() {
    super();
    this.state = {
      value: "dashboard",
      open: false,
      anchorEl: null,
      pgaOpen: false,
      pgaAnchorEl: null,
      pgaReportDropDown: [],
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

  handleClose = (event) => {
    this.setState({
      open: false,
      anchorEl: null,
    });
  };
  menuOpen = (event) => {
    if (this.state.anchorEl !== event.currentTarget) {
      this.setState({
        anchorEl: event.currentTarget,
        // value: 6,
      });
    }
  };
  menuClose = (event) => {
    this.setState({
      open: false,
      anchorEl: null,
      // value: 6,
    });
  };

  // While hovering pga menu

  pgaMenuOpen = (e) => {
    this.setState({
      pgaOpen: true,
      pgaAnchorEl: e.currentTarget,
    });
  };

  // While closing pga menu

  pgaMenuClose = (e) => {
    this.setState({
      pgaOpen: false,
      pgaAnchorEl: null,
    });
  };

  tabTheme = createTheme({
    overrides: {
      MuiTab: {
        wrapper: {
          display: "flex",
          flexDirection: "row-reverse",
          gridGap: "5px",
        },
        root: {
          "&.MuiTab-root": {
            padding: "5px",
          },
        },
      },
    },
  });

  handlePopupClick = (event) => {
    this.props.setPoperAnchorEl(
      this.props.popperAnchorEl ? null : event.currentTarget
    );
  };

  // diploma handling
  handleDiplomaClick = () => {
    console.log("diploma");
    this.setState({ value: "diplomaForm", open: false });
    this.props.getAcademicType("diploma");
  };

  // ug handling
  handleUgClick = () => {
    console.log("ug");
    this.setState({
      value: "ugForm",
      open: false,
    });
    this.props.getAcademicType("ug");
  };

  // pg handling
  handlePgClick = () => {
    console.log("pg");
    this.setState({
      value: "pgForm",
      open: false,
    });
    this.props.getAcademicType("pg");
  };

  // Component Did Mount

  componentDidMount() {
    getPgaTabDropDown(this.props.match.params.productId).then((response) => {
      if (response.status === 200) {
        this.setState({
          pgaReportDropDown: response.data.data,
        });
      }
    });
  }

  // Component Did Update

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props, prevProps);
    if (this.props.clickedSem !== prevProps.clickedSem) {
      this.setState({
        value: "semForm",
      });
    }
  }

  backHandler = () => {
    if(this.props.academicTypes === "ug"){
      this.setState({
        value: "ugForm",
      });
    }else if(this.props.academicTypes === "pg"){
      this.setState({
        value: "pgForm",
      });
    }else{
      this.setState({
        value: "diplomaForm",
      });
    }
   
  };

  academicMenus = [
    {
      label: "10th",
      value: "tenthForm",
      handler: () => this.setState({ value: "tenthForm", open: false }),
    },
    {
      label: "12th",
      value: "twelthForm",
      handler: () => this.setState({ value: "twelthForm", open: false }),
    },
    { label: "Diploma", value: "diplomaForm", handler: () => this.handleDiplomaClick() },
    { label: "Undergraduate", value: "ugForm", handler: () => this.handleUgClick() },
    { label: "Postgraduate", value: "pgForm", handler: () => this.handlePgClick() },
    {
      label: "Academics Summary",
      value: "index",
      handler: () => this.setState({ value: "index", open: false }),
    },
  ];

  renderIconButton = () =>{
    const { classes } = this.props;
    const open = Boolean(this.props.popperAnchorEl);
    const id = open ? "simple-popper" : undefined;
    if(
      this.state.value === "tenthForm" ||
      this.state.value === "twelthForm" ||
      this.state.value === "diplomaForm" || 
      this.state.value === "ugForm" ||
      this.state.value === "pgForm" 
      ){
      return (
        <IconButton
        id={id}
        onClick={this.handlePopupClick}
        className={classes.iconButtonStyle}
        color="primary"
        aria-label="add to shopping cart"
      >
        <AccountCircleRoundedIcon fontSize={"large"} />
      </IconButton>
      )
    }
  }


  render() {
    const { classes } = this.props;
    console.log(this.props.clickedBack);
    // console.log(object)
   
    return (
      <div>
        <Grid container style={{ marginTop: "10px" }}>
          <Grid
            item
            md={12}
            style={{
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
                <Tab
                  label="Dashboard"
                  value={"dashboard"}
                  style={{ textTransform: "none", minWidth: "135px" }}
                />
                <Tab
                  label="General Details"
                  value={"generalDetails"}
                  style={{ textTransform: "none", minWidth: "135px" }}
                />
                <Tab
                  label="Interest Details"
                  value={"interestDetails"}
                  style={{ textTransform: "none", minWidth: "135px" }}
                />
                <Tab
                  label="Test Results"
                  value={"testResult"}
                  style={{ textTransform: "none", minWidth: "135px" }}
                />
                <Tab
                  label="CV"
                  value={"cv"}
                  style={{ textTransform: "none", minWidth: "135px" }}
                />
                <Tab
                  label="PPGA Call Notes"
                  value={"ppgaCallNotes"}
                  style={{ textTransform: "none", minWidth: "135px" }}
                />
                <ThemeProvider theme={this.tabTheme}>
                  <Tab
                    style={{ minWidth: "135px", paddingRight: "0px" }}
                    label="Academic Details"
                    value={"academicDetails"}
                    onMouseOver={(e) => {
                      this.menuOpen(e);
                    }}
                    icon={
                      <ExpandMoreIcon
                        style={{ color: "black", marginTop: "7px" }}
                      />
                    }
                    style={{ textTransform: "none" }}
                    onClick={(e) => this.menuOpen(e)}
                  />
               
                  <Tab
                    style={{ minWidth: "135px", paddingRight: "0px" }}
                    label="PGA Report"
                    value={"pgaReport"}
                    onMouseEnter={(e) => {
                      this.pgaMenuOpen(e);
                    }}
                    icon={
                      <ExpandMoreIcon
                        style={{ color: "black", marginTop: "7px" }}
                      />
                    }
                    style={{ textTransform: "none" }}
                    onClick={(e) => this.pgaMenuOpen(e)}
                  />
                </ThemeProvider>
                <Tab
                  label="Career Role"
                  style={{ textTransform: "none", minWidth: "135px" }}
                  value={"careerRole"}
                />
              </Tabs>
             {this.renderIconButton()}
            </Paper>
          
            <TabPanel value={this.state.value} index={"dashboard"}>
              <Dashboard {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"generalDetails"}>
              <GeneralDetails {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"interestDetails"}>
              <InterestDetail {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"testResult"}>
              <TestResults {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"cv"}>
              <CV {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"ppgaCallNotes"}>
              <PpgaCallNotes {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"tenthForm"}>
              <TenthForm {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"twelthForm"}>
              <TwelthForm {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"diplomaForm"}>
              <DiplomaForm {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"ugForm"}>
              <DiplomaForm {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"pgForm"}>
              <DiplomaForm {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"index"}>
              <Index {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"semForm"}>
              <SemesterForm backHandler={this.backHandler} {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"pgaGeneralDetails"}>
              <PgaGeneralDetails {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"pgaSelectSchool"}>
              <SelectSchool {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"pgaPlanOfAction"}>
              <PlanOfAction {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"pgaCriticalSuccessFactor"}>
              <CriticalSuccessFactor {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"pgaAdditionalForm"}>
              <AdditionalPointsForm {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"suggestedSpecializationTracks"}>
              <SpecializationTrack {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"profileFitGraph"}>
              <ProfileFit {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"strengths"}>
              <Strengths {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"concerns"}>
              <Concerns {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"programInformation"}>
              <ProgramInformation {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"activitiesAfterGmat"}>
              <ActivitiesForGmat {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"allRoundActivities"}>
              <AllRoundActivities {...this.props} />
            </TabPanel> 
            <TabPanel value={this.state.value} index={"pgaTopBSchoolByRegion"}>
              <TopBSchool {...this.props} />
            </TabPanel> 
            <TabPanel value={this.state.value} index={"preview"}>
              <Preview {...this.props} />
            </TabPanel> 
            <TabPanel value={this.state.value} index={"careerRole"}>
              <CareerRoot {...this.props} />
            </TabPanel>
          </Grid>

        </Grid>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          getContentAnchorEl={null}
          MenuListProps={{ onMouseLeave: this.handleClose }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          {this.academicMenus.map((eachMenu, index) => {
            return (
              <MenuItem
                classes={{ selected: classes.menuItemStyle }}
                selected={eachMenu.value === this.state.value}
                onClick={eachMenu.handler}
              >
                {eachMenu.label}
              </MenuItem>
            );
          })}
        </Menu>
        {/* Menu Items for PGA */}
        <Menu
          anchorEl={this.state.pgaAnchorEl}
          open={Boolean(this.state.pgaAnchorEl)}
          onClose={this.pgaMenuClose}
          MenuListProps={{ onMouseLeave: this.pgaMenuClose }}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          {this.state.pgaReportDropDown.length > 0 &&
            this.state.pgaReportDropDown.map((eachMenu, index) => {
              return (
                <MenuItem
                  classes={{ selected: classes.menuItemStyle }}
                  selected={eachMenu.value === this.state.value}
                  onClick={() => this.setState({ value: eachMenu.value })}
                >
                  {eachMenu.label}
                </MenuItem>
              );
            })}
        </Menu>
      </div>
    );
  }
}
const useStyles = (theme) => ({
  paperStyle: {
    position: "relative",
  },
  iconButtonStyle: {
    position: "absolute",
    top: "7px",
    right: "0px",
  },
  menuItemStyle: {
    backgroundColor: "#ffffff !important",
    color: "#009be5",
  },
});
const mapStateToProps = (state) => {
  return {
    popperAnchorEl: state.HelperReducer.popperState.popperAnchorEl,
    academicTypes: state.HelperReducer.academicType,
    clickedSem: state.HelperReducer.clickedSem,
  };
};
export default connect(mapStateToProps, {
  setPoperAnchorEl,
  getAcademicType,
  isClickedSem,
})(withStyles(useStyles)(ProfileGapRoot));
