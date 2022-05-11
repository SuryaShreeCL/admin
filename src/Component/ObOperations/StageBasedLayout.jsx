import { CircularProgress } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/Lock";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import qs from "qs";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAdminLinkedProduct,
  updateVerificationStatus,
} from "../../Actions/AdminAction";
import {
  getVariantStepsById,
  getvarientByid,
} from "../../Actions/ProductAction";
import {
  IncompleteStatus,
  ObComplete,
  ObIncomplete,
  StudentStepDetails,
  opsStageComplete,
  getCompletedStages,
  getStageLockStatus,
} from "../../Actions/Student";
import "../../Asset/All.css";
import BackButton from "../../Asset/Images/backbutton.svg";
import RevampDialog from "../../OnboardingRevamp/RevampDialog";
import Dot from "../../Utils/Dot";
import PrimaryButton from "../../Utils/PrimaryButton";
import MySnackBar from "../MySnackBar";
import AdmissionServices from "../ObCallSummary/admissionServices";
import AspirationDetails from "../ObCallSummary/aspirationDetails";
import CallSummaryLayout from "../ObCallSummary/CallSummaryLayout";
import GraduateTestResult from "../ObCallSummary/graduateTestResult";
import TestAndSurvey from "../ObCallSummary/testEngineResult";
import UploadCV from "../ObCallSummary/UploadCV";
import WorkExperience from "../ObCallSummary/workExperience";
import AcademicInfo from "../ObOnboarding/academicInfo";
import PersonalInfo from "../ObOnboarding/personalInfo";
import ProfileGapRoot from "../ProfileGapAnalysis/Root";
import { stagedTabsPath, studentPath } from "../RoutePaths";
import { ThemedTab, ThemedTabs } from "../Utils/ThemedComponents";
import SubLayoutTab from "./SubLayoutTab";
import StrategySession from "../StrategySession/Index";
import ProfileMentoring from "../ProfileMentoring/Index";
import ApplicationStage from "../ApplicationStage/Index";

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
const STAGES = [
  {
    name: "Onboarding",
    stageName: "OnBoarding",
    component: null,
    isCompleteButton: true,
    buttonText: "Onboarding Complete",
    buttonCompletedText: "Onboarding Completed",
  },
  {
    name: "Profile Gap Analysis",
    stageName: "pga",
    component: (props) => <ProfileGapRoot {...props} />,
    isCompleteButton: false,
    buttonText: "Profile Gap Analysis Complete",
    buttonCompletedText: "Profile Gap Analysis Completed",
  },
  {
    name: "Profile Mentoring",
    stageName: "ProfileMentoring",
    component: (props) => <ProfileMentoring {...props} />,
    isCompleteButton: true,
    buttonText: "Profile Mentoring Complete",
    buttonCompletedText: "Profile Mentoring Completed",
  },
  {
    name: "Strategy Session",
    stageName: "StrategySession",
    component: (props) => <StrategySession {...props} />,
    isCompleteButton: true,
    buttonText: "Strategy Session Complete",
    buttonCompletedText: "Strategy Session Completed",
  },
  {
    name: "Application Stage",
    stageName: "ApplicationStage",
    component: (props) => <ApplicationStage {...props} />,
    isCompleteButton: true,
    buttonText: "Application Stage Complete",
    buttonCompletedText: "Application Stage Completed",
  },
  {
    name: "Post Admit Services",
    stageName: "PostAdmitServices",
    component: () => null,
    isCompleteButton: false,
    buttonText: "Post Admit Services Complete",
    buttonCompletedText: "Post Admit Services Completed",
  },
];

class StageBasedLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabCount: 0,
      productDetails: null,
      selectedItem: null,
      open: false,
      snackMsg: "",
      snackVariant: "",
      snackOpen: false,
      othersStatus: "",
      stageList: [],
      comments: "",
      tabIndex: "",
      customStageIndex: 0,
      isLoading: false,
      componentList: {
        "Personal Information": "PersonalInfo",
        "Academic Information": "AcademicInfo",
        "Work Experience": "WorkExperience",
        "Aspiration Details": "AspirationDetails",
        "Graduate Admission Test": "GraduateTestResult",
        "Tests and Survey": "TestAndSurvey",
        "OB Call Summary": "CallSummaryLayout",
        "Uplaod CV": "UploadCV",
        Others: "AdmissionServices",
      },
      completedStagesList: [],
      verifiedStages: [],
    };
  }

  renderContent = (count) => {
    try {
      if (count === 0) {
        return <SubLayoutTab {...this.props} />;
      }
    } catch (error) {}
  };

  renderDialogContent() {
    if (this.state.othersStatus === "NotVerified") {
      return (
        <Grid container spacing={1}>
          <Grid item md={12}>
            <Typography className={"dialog_title"}>{"Not Updated"}</Typography>
          </Grid>
          <Grid item md={12}>
            <hr />
          </Grid>
          <Grid item md={12}>
            <Typography className={"incomplete_text"}>
              {"Below Mentioned sections status are not updated"}
            </Typography>
          </Grid>
          <Grid item md={12}>
            {this.state.stageList.map((data) => {
              return (
                <ul>
                  <li>{data.stepName}</li>
                </ul>
              );
            })}
          </Grid>
        </Grid>
      );
    } else if (this.state.othersStatus === "Mismatched") {
      return (
        <Grid container spacing={1}>
          <Grid item md={12}>
            <Typography className={"dialog_title"}>{"Incomplete"}</Typography>
          </Grid>
          <Grid item md={12}>
            <hr />
          </Grid>
          <Grid item md={12}>
            <Typography style={{ display: "flex" }}>
              {"Below Mentioned sections status are marked"}
              {this.handleText()}
            </Typography>
          </Grid>
          <Grid item md={12}></Grid>
          <Grid item md={12}>
            {this.state.stageList.map((data) => {
              return (
                <ul>
                  <li>{data.stepName}</li>
                </ul>
              );
            })}
          </Grid>
          <Grid item md={12}>
            <TextField
              label='Add Comments'
              fullWidth
              value={this.state.comments}
              onChange={(e) => this.setState({ comments: e.target.value })}
            />
          </Grid>
        </Grid>
      );
    } else if (this.state.othersStatus === "Verified") {
      return (
        <Grid container>
          <Grid item md={12}>
            <Typography className={"dialog_title"}>{"Confirmation"}</Typography>
          </Grid>
          <Grid item md={12}>
            <hr />
          </Grid>
          <Grid item md={12}>
            <Typography>{"Your marking Onboarding complete"}</Typography>
          </Grid>
        </Grid>
      );
    }
  }

  handleText() {
    return (
      <Typography className={"incomplete_text"}>{" incomplete"}</Typography>
    );
  }

  checkStageVerified = (stageName) => {
    const { verifiedStages } = this.state;
    let verified = false;
    if (verifiedStages && verifiedStages.length !== 0) {
      let arr = verifiedStages.filter(({ name }) => name === stageName);
      if (arr.length !== 0) {
        verified = arr[0]["status"] !== "Verified";
      }
    }
    return verified;
  };

  handleIncomplete = () => {
    this.setState({
      isLoading: true,
    });

    let obj = {
      comments: this.state.comments,
      productId: this.props.match.params.productId,
    };

    this.props.IncompleteStatus(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      (response) => {
        if (response.status === 200) {
          this.props.getVariantStepsById(
            this.props.match.params.productId +
              `?studentId=${this.props.match.params.studentId}`
          );
          this.setState({
            open: false,
            isLoading: false,
          });
        }
      }
    );
    this.props.ObIncomplete(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      obj,
      (response) => {
        if (response.status === 200) {
          this.props.getVariantStepsById(
            this.props.match.params.productId +
              `?studentId=${this.props.match.params.studentId}`
          );
          this.setState({
            snackOpen: true,
            snackMsg: "Successfully Updated",
            snackVariant: "success",
            open: false,
            isLoading: false,
          });
        }
      }
    );
  };

  OnboardingComplete = () => {
    this.setState({
      isLoading: true,
    });

    this.props.ObComplete(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      (response) => {
        if (response.status === 200) {
          this.props.getVariantStepsById(
            this.props.match.params.productId +
              `?studentId=${this.props.match.params.studentId}`
          );
          this.setState({
            snackOpen: true,
            snackMsg: response.data,
            snackVariant: "success",
            open: false,
            isLoading: false,
          });
        }
      }
    );
  };

  renderDialogAction() {
    if (this.state.othersStatus !== "NotVerified") {
      if (this.state.othersStatus === "Mismatched") {
        return (
          <Button
            color={"primary"}
            variant={"contained"}
            disabled={this.state.isLoading}
            onClick={() => this.handleIncomplete()}
          >
            {this.state.isLoading && (
              <CircularProgress
                disableShrink
                style={{
                  color: "#fff",
                  width: 20,
                  height: 20,
                  marginRight: 10,
                }}
              />
            )}
            {"Onboarding Incomplete"}
          </Button>
        );
      } else if (this.state.othersStatus === "Verified") {
        return (
          <PrimaryButton
            color={"primary"}
            variant={"contained"}
            disabled={this.state.isLoading}
            onClick={() => this.OnboardingComplete()}
          >
            {this.state.isLoading && (
              <CircularProgress
                disableShrink
                style={{
                  color: "#fff",
                  width: 20,
                  height: 20,
                  marginRight: 10,
                }}
              />
            )}
            {"Onboarding Complete"}
          </PrimaryButton>
        );
      }
    }
  }

  componentDidMount() {
    const { match } = this.props;
    const studentId = match.params.studentId;
    const productId = match.params.productId;
    this.props.getVariantStepsById(
      this.props.match.params.productId +
        `?studentId=${this.props.match.params.studentId}`
    );
    this.props.getCompletedStages(studentId, productId);
    this.props.getStageLockStatus(studentId, productId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.tabCount !== prevState.tabCount) {
      const { match } = this.props;
      const { tabCount, productDetails } = this.state;
      let index = STAGES.findIndex(
        ({ name }) => name === productDetails?.[tabCount]?.["stepName"]
      );
      this.setState({ customStageIndex: index });
      this.props.history.push(
        `${stagedTabsPath}${match.params.studentId}/${match.params.productId}?stage=${STAGES[index]?.["stageName"]}`
      );
    }

    if (this.props.variantStepList !== prevProps.variantStepList) {
      let stage = this.props.variantStepList.steps.find(
        (el) => el.stepName === "Onboarding"
      );

      var sortedArr =
        this.props.variantStepList.steps.length > 0 &&
        this.props.variantStepList.steps.sort((a, b) => a.rank - b.rank);

      sortedArr !== false &&
        sortedArr.map((it, ix) => {
          it.steps.sort((c, d) => c.rank - d.rank);
        });

      const { render } = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true,
      });

      let rank =
        this.state.selectedItem !== null &&
        this.state.selectedItem !== undefined
          ? this.state.selectedItem.rank - 1
          : 0;

      const { stage: newStageName } = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true,
      });
      let index =
        STAGES.findIndex(({ stageName }) => stageName === newStageName) || 0;
      let activeTab =
        sortedArr.findIndex(
          ({ stepName }) => stepName === STAGES[index]?.["name"]
        ) || 0;

      this.setState({
        productDetails: sortedArr,
        tabCount: activeTab,
        selectedItem: render
          ? "CallSummaryLayout"
          : this.state.selectedItem !== null &&
            this.state.selectedItem !== undefined
          ? sortedArr[0].steps[rank]
          : sortedArr[0].steps[0],
      });

      let incompletearr = stage.steps.filter(
        (el) => el.verificationStatus === "Mismatched"
      );
      this.setState({
        stageList: incompletearr,
      });
      let nvArr = stage.steps.filter(
        (nvData) => nvData.verificationStatus === "NotVerified"
      );
      let verifyArr = stage.steps.filter(
        (nvData) => nvData.verificationStatus === "Verified"
      );
      let mismatchArr = stage.steps.filter(
        (nvData) => nvData.verificationStatus === "Mismatched"
      );

      if (
        verifyArr.length > 0 &&
        nvArr.length === 0 &&
        mismatchArr.length === 0
      ) {
        return this.setState({
          othersStatus: "Verified",
        });
      }
      if (nvArr.length > 0) {
        return this.setState({
          othersStatus: "NotVerified",
          stageList: nvArr,
        });
      }
      if (
        nvArr.length === 0 &&
        verifyArr.length >= 0 &&
        mismatchArr.length > 0
      ) {
        return this.setState({
          othersStatus: "Mismatched",
          stageList: mismatchArr,
        });
      }
    }
    if (
      this.props.StudentStepDetailsList !== prevProps.StudentStepDetailsList
    ) {
      this.props.getVariantStepsById(
        this.props.match.params.productId +
          `?studentId=${this.props.match.params.studentId}`
      );
    }
    if (
      this.props.opsStageCompleteStatus &&
      this.props.opsStageCompleteStatus !== prevProps.opsStageCompleteStatus
    ) {
      if (this.props.opsStageCompleteStatus.success) {
        const { match } = this.props;
        const studentId = match.params.studentId;
        const productId = match.params.productId;
        this.setState({
          snackMsg: "Successfully Updated",
          snackVariant: "success",
          snackOpen: true,
        });
        this.props.getCompletedStages(studentId, productId);
        this.props.getStageLockStatus(studentId, productId);
      } else {
        this.setState({
          snackMsg: this.props.opsStageCompleteStatus.message,
          snackVariant: "error",
          snackOpen: true,
        });
      }
    }
    if (
      this.props.completedStages &&
      this.props.completedStages !== prevProps.completedStages
    ) {
      const { completedStages } = this.props;
      if (completedStages.success) {
        this.setState({
          completedStagesList: completedStages.data || [],
        });
      } else {
        this.setState({
          snackMsg: completedStages.message,
          snackVariant: "error",
          snackOpen: true,
          completedStagesList: [],
        });
      }
    }
    if (
      this.props.stageLockStatus &&
      this.props.stageLockStatus !== prevProps.stageLockStatus
    ) {
      const { stageLockStatus } = this.props;
      if (stageLockStatus.success) {
        this.setState({
          verifiedStages: stageLockStatus.data || [],
        });
      } else {
        this.setState({
          snackMsg: stageLockStatus.message,
          snackVariant: "error",
          snackOpen: true,
          verifiedStages: [],
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
    if (
      this.state.tabCount === 0 &&
      typeof this.state.selectedItem === "object"
    ) {
      return (
        <>
          <Grid item md={12}>
            <hr />
          </Grid>
          <Grid item md={12} align={"right"}>
            <PrimaryButton
              color={"secondary"}
              variant={"text"}
              disabled={this.props.variantStepList.adminObComplete}
              onClick={() =>
                this.handleCompleted(this.state.selectedItem, "Mismatched")
              }
            >
              Incomplete
            </PrimaryButton>
            <PrimaryButton
              color={"primary"}
              variant={"contained"}
              disabled={this.props.variantStepList.adminObComplete}
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
      product: {
        id: this.props.match.params.productId,
      },
    };
    this.props.updateVerificationStatus(obj, (response) => {
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

  renderComponent = () => {
    const { customStageIndex } = this.state;
    return customStageIndex > 0
      ? STAGES[customStageIndex].component(this.props)
      : null;
  };

  handleStageComplete = () => {
    const { customStageIndex } = this.state;
    const { match } = this.props;
    const studentId = match.params.studentId;
    const productId = match.params.productId;
    switch (STAGES[customStageIndex]["stageName"]) {
      case STAGES[0]["stageName"]: {
        break;
      }
      case STAGES[1]["stageName"]: {
        break;
      }
      case STAGES[2]["stageName"]: {
        this.props.opsStageComplete(studentId, productId, STAGES[2]["name"]);
        break;
      }
      case STAGES[3]["stageName"]: {
        this.props.opsStageComplete(studentId, productId, STAGES[3]["name"]);
        break;
      }
      case STAGES[4]["stageName"]: {
        this.props.opsStageComplete(studentId, productId, STAGES[4]["name"]);
        break;
      }
      case STAGES[5]["stageName"]: {
        break;
      }
      default:
        break;
    }
  };

  isStageCompleted = () => {
    const { customStageIndex, completedStagesList } = this.state;
    return completedStagesList.includes(STAGES[customStageIndex]["name"]);
  };

  renderHeaderTabsAndButtonContainer = () => {
    const { customStageIndex, productDetails, tabCount } = this.state;
    const isCompleteButtonContainer =
      customStageIndex > 0
        ? STAGES[customStageIndex]["isCompleteButton"]
        : false;
    return customStageIndex > 0 ? (
      <>
        <Grid item md={isCompleteButtonContainer ? 8 : 12}>
          <ThemedTabs
            value={tabCount}
            textColor={"inherit"}
            onChange={(e, value) => this.setState({ tabCount: value })}
            aria-label={"ant example"}
            variant={"scrollable"}
          >
            {productDetails &&
              productDetails.map((item, index) => {
                return (
                  <ThemedTab
                    key={index}
                    label={item.stepName}
                    disabled={this.checkStageVerified(item.stepName)}
                    icon={
                      this.checkStageVerified(item.stepName) ? (
                        <LockIcon className={"icon_style"} />
                      ) : null
                    }
                  />
                );
              })}
          </ThemedTabs>
        </Grid>
        {isCompleteButtonContainer && (
          <Grid item md={4} align='right' className={"button_grid"}>
            <PrimaryButton
              color={"primary"}
              variant={"contained"}
              disabled={this.isStageCompleted()}
              onClick={() => this.handleStageComplete()}
            >
              {
                STAGES[customStageIndex][
                  this.isStageCompleted() ? "buttonCompletedText" : "buttonText"
                ]
              }
            </PrimaryButton>
            <PrimaryButton
              color={"primary"}
              variant={"outlined"}
              className={"flex_button"}
            >
              {"Audit Trail"}
            </PrimaryButton>
          </Grid>
        )}
      </>
    ) : null;
  };

  render() {
    var componentList = {
      "Personal Information": "PersonalInfo",
      "Academic Information": "AcademicInfo",
      "Work Experience": "WorkExperience",
      "Aspiration Details": "AspirationDetails",
      "Graduate Admission Test": "GraduateTestResult",
      "Tests and Survey": "TestAndSurvey",
      "OB Call Summary": "CallSummaryLayout",
      "Upload CV": "UploadCV",
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
      UploadCV: UploadCV,
    };
    var selectedComponent =
      this.state.selectedItem !== null &&
      typeof this.state.selectedItem === "object"
        ? componentList[this.state.selectedItem.stepName]
        : componentList[this.state.selectedItem];
    var Page = obj[selectedComponent];
    console.log(this.state.tabCount, "++++++++++++++++");
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row", margin: "10px" }}>
          <img
            src={BackButton}
            style={{ cursor: "pointer", marginTop: "-10px" }}
            onClick={() => this.props.history.goBack()}
          />
          <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />}>
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

        {this.state.tabCount === 0 ? (
          <Grid container>
            <Grid item md={8}>
              <ThemedTabs
                value={this.state.tabCount}
                textColor={"inherit"}
                onChange={(e, value) => this.setState({ tabCount: value })}
                aria-label='ant example'
                variant='scrollable'
              >
                {this.state.productDetails !== null &&
                  this.state.productDetails.map((item, index) => {
                    return (
                      <ThemedTab
                        label={item.stepName}
                        disabled={this.checkStageVerified(item.stepName)}
                        icon={
                          this.checkStageVerified(item.stepName) ? (
                            <LockIcon className={"icon_style"} />
                          ) : null
                        }
                      />
                    );
                  })}
              </ThemedTabs>
            </Grid>
            <Grid item md={4} align='right' className={"button_grid"}>
              <PrimaryButton
                color={"primary"}
                variant={"contained"}
                disabled={this.props.variantStepList.adminObComplete}
                onClick={() => this.handleOBComplete()}
              >
                {/* Onboarding Complete */}
                {this.props.variantStepList &&
                this.props.variantStepList.adminObComplete &&
                this.props.variantStepList.adminObComplete
                  ? "Onboarding Completed"
                  : "Onboarding Complete"}
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
                  variant='scrollable'
                  textColor={"inherit"}
                  onChange={(e, value) =>
                    this.setState({ selectedItem: value })
                  }
                  aria-label='ant example'
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
                    textColor='primary'
                    value={"CallSummaryLayout"}
                    label={"Ob Call Summary"}
                  />

                  <ThemedTab
                    textColor='primary'
                    value={"Others"}
                    label={"Allocate Mentor"}
                    disabled={
                      this.props.variantStepList.adminObComplete === null ||
                      this.props.variantStepList.adminObComplete === false
                    }
                    icon={
                      this.props.variantStepList.adminObComplete === null ||
                      this.props.variantStepList.adminObComplete === false ? (
                        <LockIcon className={"icon_style"} />
                      ) : null
                    }
                  />
                </ThemedTabs>
              )}
            </Grid>
            <Grid item md={12}>
              <Grid container>
                <Grid item md={12}>
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
                </Grid>
                {this.state.tabCount === 0 && this.renderbutton()}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            {this.renderHeaderTabsAndButtonContainer()}
            <Grid item md={12}>
              {this.state.tabCount === 0 && (
                <ThemedTabs
                  value={this.state.selectedItem}
                  variant='scrollable'
                  textColor={"inherit"}
                  onChange={(e, value) =>
                    this.setState({ selectedItem: value })
                  }
                  aria-label='ant example'
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
                    textColor='primary'
                    value={"CallSummaryLayout"}
                    label={"Ob Call Summary"}
                  />

                  <ThemedTab
                    textColor='primary'
                    value={"Others"}
                    label={"Allocate Mentor"}
                    disabled={
                      this.state.othersStatus === "NotVerified" ||
                      this.state.othersStatus === "Mismatched"
                    }
                    icon={
                      this.state.othersStatus === "NotVerified" ||
                      this.state.othersStatus === "Mismatched" ? (
                        <LockIcon className={"icon_style"} />
                      ) : null
                    }
                  />
                </ThemedTabs>
              )}
            </Grid>
            <Grid item md={12}>
              <Grid container>
                <Grid item md={12}>
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
                  {this.renderComponent()}
                </Grid>
                {this.state.tabCount === 0 && this.renderbutton()}
              </Grid>
            </Grid>
          </Grid>
        )}
        <RevampDialog
          open={this.state.open}
          onClose={() => this.setState({ open: false, isLoading: false })}
          action={this.renderDialogAction()}
          {...this.props}
        >
          {this.renderDialogContent()}
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
  opsStageCompleteStatus: state.StudentReducer.opsStageCompleteStatus,
  completedStages: state.StudentReducer.completedStages,
  stageLockStatus: state.StudentReducer.stageLockStatus,
});

export default connect(mapStateToProps, {
  getvarientByid,
  getAdminLinkedProduct,
  getVariantStepsById,
  updateVerificationStatus,
  StudentStepDetails,
  ObComplete,
  ObIncomplete,
  IncompleteStatus,
  opsStageComplete,
  getCompletedStages,
  getStageLockStatus,
})(StageBasedLayout);
