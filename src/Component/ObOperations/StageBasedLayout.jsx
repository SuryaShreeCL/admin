import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {
  createTheme,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAdminLinkedProduct,
  updateVerificationStatus,
} from "../../Actions/AdminAction";
import { getvarientByid } from "../../Actions/ProductAction";
import AdmissionServices from "../ObCallSummary/admissionServices";
import AspirationDetails from "../ObCallSummary/aspirationDetails";
import GraduateTestResult from "../ObCallSummary/graduateTestResult";
import TestAndSurvey from "../ObCallSummary/testEngineResult";
import WorkExperience from "../ObCallSummary/workExperience";
import AcademicInfo from "../ObOnboarding/academicInfo";
import PersonalInfo from "../ObOnboarding/personalInfo";
import { ThemedTab, ThemedTabs } from "../Utils/ThemedComponents";
import SubLayoutTab from "./SubLayoutTab";
import { getVariantStepsById } from "../../Actions/ProductAction";
import ProfileGapAnalysisTab from "../ProfileGapAnalysisTab";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import BackButton from "../../Asset/Images/backbutton.svg";
import { studentPath } from "../RoutePaths";
import ProfileGapRoot from "../ProfileGapAnalysis/Root";
import CallSummaryLayout from "../ObCallSummary/CallSummaryLayout";
import {
  StudentStepDetails,
  ObComplete,
  ObIncomplete,
} from "../../Actions/Student";
import LockIcon from "@material-ui/icons/Lock";
import QueryString from "querystring";
import qs from "qs";
import MySnackBar from "../MySnackBar";
import Dot from "../../Utils/Dot";
import "../../Asset/All.css";
import PrimaryButton from "../../Utils/PrimaryButton";
import RevampDialog from "../../OnboardingRevamp/RevampDialog";
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
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

class StageBasedLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabCount: 0,
      stepTabCount: 0,
      productDetails: null,
      selectedItem: null,
      open: false,
      snackMsg: "",
      snackVariant: "",
      snackOpen: false,
      othersstatus: "",
      stagelist: [],
      comments: "",
      tabIndex : "",
      componentList : {
        "Personal Information": "PersonalInfo",
        "Academic Information": "AcademicInfo",
        "Work Experience": "WorkExperience",
        "Aspiration Details": "AspirationDetails",
        "Graduate Admission Test": "GraduateTestResult",
        "Tests and Survey": "TestAndSurvey",
        "OB Call Summary": "CallSummaryLayout",
        Others: "AdmissionServices",
      }
    };
  }

  renderContent = (count) => {
    try {
      if (count === 0) {
        return <SubLayoutTab {...this.props} />;
      }
    } catch (error) {}
  };
  renderdialogcontent() {
    if (this.state.othersstatus === "NotVerified") {
      return (
        <Grid container spacing={1}>
          <Grid item md={12}>
            <Typography className={"dialog_title"}>Not Updated</Typography>
          </Grid>
          <Grid item md={12}>
            <hr />
          </Grid>
          <Grid item md={12}>
            <Typography className={"incomplete_text"}>
              Below Mentioned sections status are not updated
            </Typography>
          </Grid>
          <Grid item md={12}>
            {this.state.stagelist.map((data) => {
              return (
                <ul>
                  <li>{data.stepName}</li>
                </ul>
              );
            })}
          </Grid>
        </Grid>
      );
    } else if (this.state.othersstatus === "Mismatched") {
      return (
        <Grid container spacing={1}>
          <Grid item md={12}>
            <Typography className={"dialog_title"}>Incomplete</Typography>
          </Grid>
          <Grid item md={12}>
            <hr />
          </Grid>
          <Grid item md={12}>
            <Typography style={{ display: "flex" }}>
              Below Mentioned sections status are marked{this.handletext()}
            </Typography>
          </Grid>
          <Grid item md={12}></Grid>
          <Grid item md={12}>
            {this.state.stagelist.map((data) => {
              return (
                <ul>
                  <li>{data.stepName}</li>
                </ul>
              );
            })}
          </Grid>
          <Grid item md={12}>
            <TextField label="Add Comments" 
            fullWidth 
            value={this.state.comments}
            onChange={(e) => this.setState({ comments: e.target.value })}/>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container>
          <Grid item md={12}>
            <Typography className={"dialog_title"}>Confirmation</Typography>
          </Grid>
          <Grid item md={12}>
            <hr />
          </Grid>
          <Grid item md={12}>
            <Typography>Your marking Onboarding complete</Typography>
          </Grid>
        </Grid>
      );
    }
  }
  handletext() {
    return (
      <Typography className={"incomplete_text"}>{" incomplete"}</Typography>
    );
  }
  handleIncomplete = () => {
    console.log("Incomplete");
    let obj = {
      comments: this.state.comments,
    };
    console.log(obj)
    this.props.ObIncomplete(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      obj,
      (response) => {
        if (response.status === 200) {
          this.setState({
            snackOpen: true,
            snackMsg: "Successfully Updated",
            snackVariant: "success",
            open: false,
          });
        }
      }
    );
  };
  OnboardingComplete = () => {
    console.log("Complete");
    this.props.ObComplete(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      (response) => {
        if (response.status === 200) {
          this.setState({
            snackOpen: true,
            snackMsg: response.data,
            snackVariant: "success",
            open: false,
          });
        }
      }
    );
  };
  renderdialogaction() {
    if (this.state.othersstatus !== "NotVerified") {
      if (this.state.othersstatus === "Mismatched") {
        return (
          <Button
            color={"primary"}
            variant={"contained"}
            onClick={() => this.handleIncomplete()}
          >
            Onboarding Incomplete
          </Button>
        );
      } else {
        return (
          <PrimaryButton
            color={"primary"}
            variant={"contained"}
            onClick={() => this.OnboardingComplete()}
          >
            Onboarding Complete
          </PrimaryButton>
        );
      }
    }
  }
  componentDidMount() {
    this.props.getVariantStepsById(this.props.match.params.productId);
    this.props.StudentStepDetails(
      this.props.match.params.studentId,
      this.props.match.params.productId
    );
    const { stage } = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    console.log(stage);
    if (stage === "pga") {
      this.setState({
        tabCount: 1,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.variantStepList !== prevProps.variantStepList
    ) {
      let stage = this.props.variantStepList.steps.find(
        (el) => el.stepName === "Onboarding"
      );
      console.log(stage);
      var sortedArr =
        this.props.variantStepList.steps.length > 0 &&
        this.props.variantStepList.steps.sort((a, b) => a.rank - b.rank);
      console.log(sortedArr);
      sortedArr !== false &&
        sortedArr.map((it, ix) => {
          it.steps.sort((c, d) => c.rank - d.rank);
        });
      console.log(sortedArr);
      const { render } = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true,
      });
      console.log(render)
      let rank = this.state.selectedItem !== null && this.state.selectedItem !== undefined ?  this.state.selectedItem.rank - 1 : 0
      this.setState({
        productDetails: sortedArr,
        selectedItem: render ? "CallSummaryLayout" : this.state.selectedItem !== null && this.state.selectedItem !== undefined ?  sortedArr[0].steps[rank] : sortedArr[0].steps[0],
      });

      let incompletearr = stage.steps.filter(
        (el) => el.verificationStatus === "Mismatched"
      );
      this.setState({
        stagelist: incompletearr,
      });
      let nvArr = stage.steps.filter(nvData => nvData.verificationStatus === "NotVerified")
      let verifyArr = stage.steps.filter(nvData => nvData.verificationStatus === "Verified")
      let mismatchArr = stage.steps.filter(nvData => nvData.verificationStatus === "Mismatched")
      if(verifyArr.length > 0 && nvArr.length === 0 && mismatchArr.length === 0){
        return this.setState({
                othersstatus: "Verified",
              });
      }
      if(nvArr.length > 0){
      return this.setState({
              othersstatus: "NotVerified",
              stagelist : nvArr
            });
      }
      if(nvArr.length === 0 && verifyArr.length > 0 && mismatchArr.length > 0){
        return this.setState({
                othersstatus: "Mismatched",
                stagelist : mismatchArr,
              });
      }
    }
  }
  handleOBComplete = () => {
    this.setState({
      open: true,
    });
  };
  renderbutton() {
    if (this.state.tabCount === 0) {
      return (
        <>
          <Grid item md={12}>
            <hr />
          </Grid>
          <Grid item md={12} align={"right"}>
            <PrimaryButton
              color={"secondary"}
              variant={"text"}
              onClick={() =>
                this.handleCompleted(this.state.selectedItem, "Mismatched")
              }
            >
              Incomplete
            </PrimaryButton>
            <PrimaryButton
              color={"primary"}
              variant={"contained"}
              onClick={() =>
                this.handleCompleted(this.state.selectedItem, "Verified")
              }
            >
              Completed
            </PrimaryButton>
          </Grid>
        </>
      );
    }
  }
  handleStatus(data) {
    if (data.verificationStatus === "NotVerified") {
      return "orange";
    }
    if (data.verificationStatus === "Verified") {
      return "green";
    }
    if (data.verificationStatus === "Mismatched") {
      return "red";
    }
  }

  handleCompleted = (event, status) => {
    let obj = {
      student: {
        id: this.props.match.params.studentId,
      },
      section: {
        name: event.stepName,
      },
      remark: "",
      status: status,
      updatedDate: new Date(),
    };
    this.props.updateVerificationStatus(obj, (response) => {
      console.log(response);
      this.props.StudentStepDetails(
        this.props.match.params.studentId,
        this.props.match.params.productId
      );
      if (response.status === 200) {
        this.setState({
          snackMsg: "Status Updated",
          snackVariant: "success",
          snackOpen: true,
        });
      }
    });
  };
  render() {
    console.log(this.state);
    var componentList = {
      "Personal Information": "PersonalInfo",
      "Academic Information": "AcademicInfo",
      "Work Experience": "WorkExperience",
      "Aspiration Details": "AspirationDetails",
      "Graduate Admission Test": "GraduateTestResult",
      "Tests and Survey": "TestAndSurvey",
      "OB Call Summary": "CallSummaryLayout",
      Others: "AdmissionServices",
    };
    var obj = {
      PersonalInfo: PersonalInfo,
      AcademicInfo: AcademicInfo,
      WorkExperience: WorkExperience,
      AspirationDetails: AspirationDetails,
      GraduateTestResult: GraduateTestResult,
      TestAndSurvey: TestAndSurvey,
      CallSummaryLayout: CallSummaryLayout,
      Others: AdmissionServices,
    };
    var selectedComponent =
      this.state.selectedItem !== null && typeof this.state.selectedItem === "object" ?  
      componentList[this.state.selectedItem.stepName] : componentList[this.state.selectedItem] ;
    var Page = obj[selectedComponent];
    console.log("state...........", this.state);
    console.log("props..................", this.props);
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row", margin: "10px" }}>
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
          
          {this.state.tabCount === 0 ?
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
                           <LockIcon className={"icon_style"} />
                         ) : null
                       }
                     />
                   );
                 })}
             </ThemedTabs>
           </Grid>
             <Grid item md={4} align="right" className={"button_grid"}>
             <PrimaryButton
               color={"primary"}
               variant={"contained"}
               onClick={() => this.handleOBComplete()}
             >
               Onboarding Complete
             </PrimaryButton>
             <PrimaryButton
               color={"primary"}
               variant={"outlined"}
               className={"flex_button"}
             >
               Audit Trail
             </PrimaryButton>
           </Grid>
           <Grid item md={12}>
           {this.state.tabCount === 0 && (
             <ThemedTabs
               value={this.state.selectedItem}
               variant="scrollable"
               textColor={"inherit"}
               onChange={(e, value) => this.setState({ selectedItem: value })}
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
                           icon={
                             <Dot
                               className={"icon_style"}
                               color={this.handleStatus(stepItem)}
                             />
                           }
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
                 label={"Allocate Mentor"}
                 disabled={
                   this.state.othersstatus === "NotVerified" ||
                   this.state.othersstatus === "Mismatched"
                 }
                 icon={
                   this.state.othersstatus === "NotVerified" ||
                   this.state.othersstatus === "Mismatched" ? (
                     <LockIcon className={"icon_style"} />
                   ) : null
                 }
               />
             </ThemedTabs>
           )}
         </Grid>
         <Grid item md={12}>
           <Grid container>
             <Grid item md={12} className={"component_grid"}>
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
                   <CallSummaryLayout hasBreadCrumbs={false} {...this.props} />
                 )}
               {/* {this.state.tabCount === 1 && <ProfileGapAnalysisTab {...this.props}/> }     */}
               {this.state.tabCount === 1 && (
                 <ProfileGapRoot {...this.props} />
               )}
             </Grid>
             {this.state.tabCount === 0 && this.renderbutton()}
           </Grid>
         </Grid>
         </Grid>
         : 
         <Grid container>
         <Grid item md={12}>
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
                       <LockIcon className={"icon_style"} />
                     ) : null
                   }
                 />
               );
             })}
         </ThemedTabs>
       </Grid>
       <Grid item md={12}>
       {this.state.tabCount === 0 && (
         <ThemedTabs
           value={this.state.selectedItem}
           variant="scrollable"
           textColor={"inherit"}
           onChange={(e, value) => this.setState({ selectedItem: value })}
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
                       icon={
                         <Dot
                           className={"icon_style"}
                           color={this.handleStatus(stepItem)}
                         />
                       }
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
             label={"Allocate Mentor"}
             disabled={
               this.state.othersstatus === "NotVerified" ||
               this.state.othersstatus === "Mismatched"
             }
             icon={
               this.state.othersstatus === "NotVerified" ||
               this.state.othersstatus === "Mismatched" ? (
                 <LockIcon className={"icon_style"} />
               ) : null
             }
           />
         </ThemedTabs>
       )}
     </Grid>
     <Grid item md={12}>
       <Grid container>
         <Grid item md={12} className={"component_grid"}>
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
               <CallSummaryLayout hasBreadCrumbs={false} {...this.props} />
             )}
           {/* {this.state.tabCount === 1 && <ProfileGapAnalysisTab {...this.props}/> }     */}
           {this.state.tabCount === 1 && (
             <ProfileGapRoot {...this.props} />
           )}
         </Grid>
         {this.state.tabCount === 0 && this.renderbutton()}
       </Grid>
     </Grid>
     </Grid>
          }
        <RevampDialog
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          action={this.renderdialogaction()}
          {...this.props}
        >
          {this.renderdialogcontent()}
        </RevampDialog>
        <MySnackBar
          snackMsg={this.state.snackMsg}
          snackVariant={this.state.snackVariant}
          snackOpen={this.state.snackOpen}
          onClose={() => this.setState({ snackOpen: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getvarientByidData: state.ProductReducer.getvarientByid,
  adminLinkedProductDetails: state.AdminReducer.adminLinkedProductDetails,
  variantStepList: state.ProductReducer.variantStepList,
  updateVerificationStatus: state.AdminReducer.updateVerificationResponse,
  StudentStepDetailsList: state.StudentReducer.StudentStepDetails,
});

const useStyles = (theme) => ({});

export default connect(mapStateToProps, {
  getvarientByid,
  getAdminLinkedProduct,
  getVariantStepsById,
  updateVerificationStatus,
  StudentStepDetails,
  ObComplete,
  ObIncomplete,
})(withStyles(useStyles)(StageBasedLayout));
