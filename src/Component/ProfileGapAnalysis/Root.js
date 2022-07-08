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
import GeneralDetails from "./GeneralDetails";
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
import CareerRoot from "./CareerRole/CareerRoot";
import Edx from "../PgaReport/Edx";
import EdxSampleCourse from "../PgaReport/EdxSampleCourse";
import ResumeQuestionnaire from "../PgaReport/ResumeQuestionnaire";
import SpiderGraph from "../PgaReport/SpiderGraph";
import { ExpandLess } from "@material-ui/icons";
import ProfileFitSpiderGraph from "../PgaReport/ProfileFitSpiderGraph/Index";
import CvReview from "./CvReview";

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
      arrowOpenName: null,
      collapseId: null,
      dialogOpen: false,
      cvAnchorEl: null,
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
      arrowOpenName: null,
    });
  };

  menuOpen = (event, name) => {
    if (this.state.anchorEl !== event.currentTarget) {
      this.setState({
        anchorEl: event.currentTarget,
        arrowOpenName: name,
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

  pgaMenuOpen = (e, name) => {
    this.setState({
      pgaOpen: true,
      pgaAnchorEl: e.currentTarget,
      arrowOpenName: name,
    });
  };

  // While closing pga menu

  pgaMenuClose = (e) => {
    this.setState({
      pgaOpen: false,
      pgaAnchorEl: null,
      arrowOpenName: null,
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
    const { value } = this.state;
    if (
      value === "pgaPlanOfAction" ||
      value === "suggestedSpecializationTracks"
    )
      this.setState({ dialogOpen: true });
    else
      this.props.setPoperAnchorEl(
        this.props.popperAnchorEl ? null : event.currentTarget
      );
  };

  /**10th handling */
  handleTenthClick = () => {
    this.setState({
      value: "tenthForm",
      open: false,
      anchorEl: null,
      arrowOpenName: null,
    });
    this.props.getAcademicType("tenth");
  };

  /**12th handling */
  handleTwelfthClick = () => {
    this.setState({
      value: "twelthForm",
      open: false,
      anchorEl: null,
      arrowOpenName: null,
    });
    this.props.getAcademicType("twelfth");
  };

  // diploma handling
  handleDiplomaClick = () => {
    console.log("diploma");
    this.setState({
      value: "diplomaForm",
      open: false,
      anchorEl: null,
      arrowOpenName: null,
    });
    this.props.getAcademicType("diploma");
  };

  // ug handling
  handleUgClick = () => {
    console.log("ug");
    this.setState({
      value: "ugForm",
      open: false,
      anchorEl: null,
      arrowOpenName: null,
    });
    this.props.getAcademicType("ug");
  };

  // pg handling
  handlePgClick = () => {
    console.log("pg");
    this.setState({
      value: "pgForm",
      open: false,
      anchorEl: null,
      arrowOpenName: null,
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
    if (this.props.academicTypes === "ug") {
      this.setState({
        value: "ugForm",
      });
    } else if (this.props.academicTypes === "pg") {
      this.setState({
        value: "pgForm",
      });
    } else {
      this.setState({
        value: "diplomaForm",
      });
    }
  };

  academicMenus = [
    {
      label: "10th",
      value: "tenthForm",
      handler: () => this.handleTenthClick(),
      // handler: () => this.setState({ value: "tenthForm", open: false }),
    },
    {
      label: "12th",
      value: "twelthForm",
      handler: () => this.handleTwelfthClick(),
      // handler: () => this.setState({ value: "twelthForm", open: false }),
    },
    {
      label: "Diploma",
      value: "diplomaForm",
      handler: () => this.handleDiplomaClick(),
    },
    {
      label: "Undergraduate",
      value: "ugForm",
      handler: () => this.handleUgClick(),
    },
    {
      label: "Postgraduate",
      value: "pgForm",
      handler: () => this.handlePgClick(),
    },
    {
      label: "Academics Summary",
      value: "index",
      handler: () =>
        this.setState({
          value: "index",
          open: false,
          anchorEl: null,
          arrowOpenName: null,
        }),
    },
  ];

  renderIconButton = () => {
    const { classes } = this.props;
    const open = Boolean(this.props.popperAnchorEl);
    const id = open ? "simple-popper" : undefined;
    const { value } = this.state;
    if (
      value === "tenthForm" ||
      value === "twelthForm" ||
      value === "diplomaForm" ||
      value === "ugForm" ||
      value === "pgForm" ||
      value === "semForm" ||
      value === "pgaPlanOfAction" ||
      value === "suggestedSpecializationTracks"
    ) {
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
      );
    }
  };

  handlePageChange = (value) => this.setState({ value: value });
  renderArrowIcon = (name) => {
    const { classes } = this.props;
    const { arrowOpenName } = this.state;
    if (arrowOpenName && name === arrowOpenName)
      return <ExpandLess className={classes.arrowStyle} />;
    else return <ExpandMoreIcon className={classes.arrowStyle} />;
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleCvMenuClose = () => {
    this.setState({
      cvAnchorEl: null,
      arrowOpenName: null,
    });
  };

  handleMenuItem = (value) => {
    this.setState({ value: value, cvAnchorEl: null, arrowOpenName: null });
  };

  handleCvMenuOpen = (e, name) => {
    const { currentTarget } = e;
    this.setState({
      cvAnchorEl: currentTarget,
      arrowOpenName: name,
    });
  };

  visibleCvReview = () => {
    return this.props?.variantStepList?.referProductCodeName === "ACS_MBA";
  };

  render() {
    const { cvAnchorEl } = this.state;
    const { classes } = this.props;
    const { handleDialogClose } = this;

    const CV_MENU = [
      {
        name: "cvInfo",
        label: "CV Info",
        visible: true,
      },
      {
        name: "cvReview",
        label: "CV Review",
        visible: this.visibleCvReview(),
      },
    ];

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
                <ThemeProvider theme={this.tabTheme}>
                  <Tab
                    style={{
                      minWidth: "135px",
                      paddingRight: "0px",
                      textTransform: "none",
                    }}
                    label={"CV"}
                    value={"cv"}
                    icon={this.renderArrowIcon("cv")}
                    onClick={(e) => this.handleCvMenuOpen(e, "cv")}
                  />
                </ThemeProvider>
                <Tab
                  label="PPGA Call Notes"
                  value={"ppgaCallNotes"}
                  style={{ textTransform: "none", minWidth: "135px" }}
                />
                <ThemeProvider theme={this.tabTheme}>
                  <Tab
                    style={{
                      minWidth: "135px",
                      paddingRight: "0px",
                      textTransform: "none",
                    }}
                    label="Academic Details"
                    value={"academicDetails"}
                    // onMouseOver={(e) => {
                    //   this.menuOpen(e, 'academicDetails');
                    // }}
                    icon={this.renderArrowIcon("academicDetails")}
                    onClick={(e) => this.menuOpen(e, "academicDetails")}
                  />
                  <Tab
                    style={{
                      minWidth: "135px",
                      paddingRight: "0px",
                      textTransform: "none",
                    }}
                    label="PGA Report"
                    value={"pgaReport"}
                    // onMouseEnter={e => {
                    //   this.pgaMenuOpen(e,'pgaReport');
                    // }}
                    icon={this.renderArrowIcon("pgaReport")}
                    onClick={(e) => this.pgaMenuOpen(e, "pgaReport")}
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
            <TabPanel value={this.state.value} index={"cvInfo"}>
              <CV {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"cvReview"}>
              <CvReview {...this.props} />
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
              <PlanOfAction
                popupStatus={this.state.dialogOpen}
                handleDialogClose={handleDialogClose}
                {...this.props}
              />
            </TabPanel>
            <TabPanel
              value={this.state.value}
              index={"pgaCriticalSuccessFactor"}
            >
              <CriticalSuccessFactor {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"pgaAdditionalForm"}>
              <AdditionalPointsForm {...this.props} />
            </TabPanel>
            <TabPanel
              value={this.state.value}
              index={"suggestedSpecializationTracks"}
            >
              <SpecializationTrack
                popupStatus={this.state.dialogOpen}
                handleDialogClose={handleDialogClose}
                {...this.props}
                handlePageChange={this.handlePageChange}
              />
              {console.log(this.state.value)}
            </TabPanel>
            <TabPanel value={this.state.value} index={"profileFitGraph"}>
              <ProfileFit {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"profileFitSpiderGraph"}>
              <ProfileFitSpiderGraph {...this.props} />
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
            <TabPanel value={this.state.value} index={"pgaEdx"}>
              <Edx {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"pgaEdxSampleCourse"}>
              <EdxSampleCourse {...this.props} />
            </TabPanel>
            <TabPanel value={this.state.value} index={"pgaResumeQuestionnaire"}>
              <ResumeQuestionnaire
                {...this.props}
                handlePageChange={this.handlePageChange}
              />
            </TabPanel>
            <TabPanel value={this.state.value} index={"pgaSpiderGraph"}>
              <SpiderGraph {...this.props} />
            </TabPanel>
          </Grid>
        </Grid>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          getContentAnchorEl={null}
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
          // MenuListProps={{ onMouseLeave: this.pgaMenuClose }}
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
                  onClick={() =>
                    this.setState({
                      value: eachMenu.value,
                      pgaAnchorEl: null,
                      arrowOpenName: null,
                    })
                  }
                >
                  {eachMenu.label}
                </MenuItem>
              );
            })}
        </Menu>

        <Menu
          anchorEl={cvAnchorEl}
          open={Boolean(cvAnchorEl)}
          onClose={this.handleCvMenuClose}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          {CV_MENU.map(({ name, label, visible }) => {
            return visible ? (
              <MenuItem
                classes={{ selected: classes.menuItemStyle }}
                selected={name === this.state.value}
                onClick={() => this.handleMenuItem(name)}
              >
                {label}
              </MenuItem>
            ) : null;
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
  arrowStyle: {
    color: "black",
    marginTop: "7px",
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
