import { Box, createMuiTheme, Grid, withStyles,Breadcrumbs,Typography,ThemeProvider,createTheme,Button } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAdminLinkedProduct,updateVerificationStatus } from "../../Actions/AdminAction";
import { getvarientByid } from "../../Actions/ProductAction";
import AdmissionServices from '../ObCallSummary/admissionServices';
import AspirationDetails from "../ObCallSummary/aspirationDetails";
import GraduateTestResult from "../ObCallSummary/graduateTestResult";
import TestAndSurvey from "../ObCallSummary/testEngineResult";
import WorkExperience from "../ObCallSummary/workExperience";
import AcademicInfo from "../ObOnboarding/academicInfo";
import PersonalInfo from "../ObOnboarding/personalInfo";
import { ThemedTab, ThemedTabs } from '../Utils/ThemedComponents';
import SubLayoutTab from './SubLayoutTab';
import { getVariantStepsById } from "../../Actions/ProductAction"
import ProfileGapAnalysisTab from '../ProfileGapAnalysisTab';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import BackButton from '../../Asset/Images/backbutton.svg'
import {studentPath } from '../RoutePaths';
import ProfileGapRoot from '../ProfileGapAnalysis/Root';
import CallSummaryLayout from '../ObCallSummary/CallSummaryLayout';
import LockIcon from '@material-ui/icons/Lock';
import QueryString from "querystring"
import  qs from "qs"
import { classNames } from '@react-pdf-viewer/core';
import NotupdateDialog from '../../OnboardingRevamp/NotUpdateDialog';
import CompleteDialog from '../../OnboardingRevamp/CompleteDialog';
const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
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

class StageBasedLayout extends Component {
    constructor(props){
        super(props);
        this.state = {
            tabCount : 0,
            stepTabCount : 0,
            productDetails : null,
            selectedItem : null,
            open : false,
        }
    }

    renderContent = (count) =>{
        try {
            if(count === 0){
                return <SubLayoutTab {...this.props} />
            }
        } catch (error) {
            
        }
    }

  
componentDidMount() {
    
    this.props.getVariantStepsById(this.props.match.params.productId)
    const { stage } =  qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    })
   console.log(stage)
   if(stage === "pga"){
    this.setState({
      tabCount  : 1
    })
   }
}

tabTheme = createTheme({
  overrides: {
    MuiTab: {
      wrapper: {
        display: "flex",
        flexDirection: "row-reverse",
        gridGap: "5px",
      },
    },
  },
});

componentDidUpdate(prevProps, prevState) {    
    // if(this.props.adminLinkedProductDetails !== prevProps.adminLinkedProductDetails){
    //     if(this.props.adminLinkedProductDetails.products.length > 0){
    //         this.props.getVariantStepsById(this.props.adminLinkedProductDetails.products[0].id)
    //     }
    // }
    if(this.props.variantStepList !== prevProps.variantStepList){
        var sortedArr =  this.props.variantStepList.steps.length > 0 && this.props.variantStepList.steps.sort((a,b) => a.rank-b.rank)
        console.log(sortedArr)
        sortedArr !== false && sortedArr.map((it,ix)=>{
            it.steps.sort((c,d)=>c.rank - d.rank)
        })
        console.log(sortedArr)
        const { render } =  qs.parse(this.props.location.search, {
          ignoreQueryPrefix: true,
        })
        this.setState({
            productDetails : sortedArr,
            selectedItem : render ? "CallSummaryLayout" : sortedArr[0].steps[0]
        })
    }
}   
handleOBComplete = () => {
  this.setState({
    open  :true
  })
}
handleCompleted = (event) => {
  console.log(event)
}
handleIncomplete = (event) => {
console.log(event)
}
    render() {
        console.log(this.state)
        const {classes} = this.props
        var componentList = {
            "Personal Information" : "PersonalInfo",
            "Academic Information" : "AcademicInfo",
            "Work Experience" : "WorkExperience",
            "Aspiration Details" : "AspirationDetails",
            "Graduate Admission Test" : "GraduateTestResult",
            "Tests and Survey" : "TestAndSurvey",
            "OB Call Summary" : "CallSummaryLayout",
            "Others" : "AdmissionServices"
        }
        console.log(this.state.selectedItem !== null && this.state.selectedItem.stepName)
        var obj = {
            PersonalInfo : PersonalInfo,
            AcademicInfo : AcademicInfo,
            WorkExperience : WorkExperience,
            AspirationDetails : AspirationDetails,
            GraduateTestResult : GraduateTestResult,
            TestAndSurvey : TestAndSurvey,
            CallSummaryLayout : CallSummaryLayout,
            Others : AdmissionServices
        }
        var selectedComponent = this.state.selectedItem !== null && componentList[this.state.selectedItem.stepName]
        var Page = obj[selectedComponent];
        console.log("state...........",this.state)
        console.log("props..................",this.props)
        return (
          <div>
            <div
              style={{ display: "flex", flexDirection: "row", margin: "10px" }}
            >
              <img
                src={BackButton}
                style={{ cursor: "pointer", marginTop: "-10px" }}
                onClick={() => this.props.history.goBack()}
              />
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                <Typography
                  style={{
                    cursor: "pointer",
                    fontWeight: "600",
                    marginLeft: "10px",
                  }}
                  onClick={() => this.props.history.push(studentPath)}
                >
                  Home
                </Typography>
                <Typography style={{ cursor: "pointer", fontWeight: "600" }}>
                  Manage Client
                </Typography>
              </Breadcrumbs>
            </div>
            <Grid container>
              <Grid item md={8}>
                <ThemedTabs
                  value={this.state.tabCount}
                  textColor={"inherit"}
                  onChange={(e, value) => this.setState({ tabCount: value })}
                  aria-label="ant example"
                  variant="scrollable"
                >
                  {this.state.productDetails !== null &&
                    this.state.productDetails.map((item, index) => {
                      return (
                        <ThemedTab
                          label={item.stepName}
                          disabled={item.disabled}
                          icon={
                            item.disabled ? (
                              <LockIcon className={classes.iconstyle} />
                            ) : null
                          }
                        />
                      );
                    })}
                </ThemedTabs>
              </Grid>
              <Grid item md={4} align="right" className={classes.buttongrid}>
                <Button
                  color={"primary"}
                  variant={"contained"}
                  style={{ textTransform: "none" }}
                  onClick={(e)=>this.handleOBComplete(e)}
                >
                  Onboarding Complete
                </Button>
                <Button
                  color={"primary"}
                  variant={"outlined"}
                  style={{ textTransform: "none", marginLeft: "10px" }}
                >
                  Audit Trail
                </Button>
              </Grid>
              <Grid item md={12}>
                {this.state.tabCount === 0 && (
                  <ThemedTabs
                    value={this.state.selectedItem}
                    variant="scrollable"
                    textColor={"inherit"}
                    onChange={(e, value) =>
                      this.setState({ selectedItem: value })
                    }
                    aria-label="ant example"
                  >
                    {this.state.productDetails !== null &&
                      this.state.productDetails
                        .filter((it, ix) => ix === this.state.tabCount)
                        .map((item, index) => {
                          return item.steps.map((stepItem, stepIndex) => {
                            return (
                              <ThemedTab
                                value={stepItem}
                                label={stepItem.stepName}
                              />
                            );
                          });
                        })}
                    <ThemedTab
                      textColor="primary"
                      value={"CallSummaryLayout"}
                      label={"Ob Call Summary"}
                    />

                    <ThemedTab
                      textColor="primary"
                      value={"Others"}
                      label={"Others"}
                    />
                  </ThemedTabs>
                )}
              </Grid>
              <Grid item md={12}>
                <Grid container>
                  <Grid item md={12} className={classes.componentgrid}>
                    {Page !== undefined &&
                      this.state.tabCount === 0 &&
                      this.state.selectedItem !== "Others" && (
                        <Page {...this.props} />
                      )}
                    {this.state.tabCount === 0 &&
                      this.state.selectedItem === "Others" && (
                        <AdmissionServices {...this.props} />
                      )}
                    {this.state.tabCount === 0 &&
                      this.state.selectedItem === "CallSummaryLayout" && (
                        <CallSummaryLayout
                          hasBreadCrumbs={false}
                          {...this.props}
                        />
                      )}
                    {/* {this.state.tabCount === 1 && <ProfileGapAnalysisTab {...this.props}/> }     */}
                    {this.state.tabCount === 1 && (
                      <ProfileGapRoot {...this.props} />
                    )}
                  </Grid>
                  <Grid item md={12}>
                    <hr />
                  </Grid>
                  <Grid item md={12} align={"right"}>
                    <Button color={"secondary"} variant={"text" } onClick={()=>this.handleIncomplete(this.state.selectedItem)}>Incomplete</Button>
                    <Button color={"primary"} variant={"contained"} onClick={()=>this.handleCompleted(this.state.selectedItem)}>Completed</Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={12}></Grid>
            </Grid>
            <NotupdateDialog open={this.state.open} onClose={()=>this.setState({open : false})} {...this.props}/>
            {/* <CompleteDialog open={this.state.open} onClose={()=>this.setState({open : false})} {...this.props}/> */}
           </div>
        );
    }
}


const mapStateToProps = (state) =>({
    getvarientByidData : state.ProductReducer.getvarientByid,
    adminLinkedProductDetails : state.AdminReducer.adminLinkedProductDetails,
    variantStepList : state.ProductReducer.variantStepList,
    updateVerificationStatus : state.AdminReducer.updateVerificationResponse

})

const useStyles = (theme) =>({
  iconstyle : {
    color: "#007ef5", marginTop: "7px"
  },
  buttongrid : {
    display : "flex",
    alignItems : "center",
    justifyContent : "center"
  },
  componentgrid : {
    height : "106vh",overflowY:"scroll"
  }
})

export default connect(mapStateToProps,{ getvarientByid, getAdminLinkedProduct, getVariantStepsById,updateVerificationStatus })(withStyles(useStyles)(StageBasedLayout))