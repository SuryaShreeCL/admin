import { Box, Grid } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NAVIGATE_TO } from "../../../Component/RoutePaths";
import { Card, TestTitle } from "../../Assets/StyledComponents";
import {
  addStudyPlanMonth,
  createFileUpload,
  downloadTaskList,
  getCourses,
  getStudyPlan,
  updateStudyPlanStatus,
  getThisMonthStudyPlanLive,
} from "../../Redux/Action/CourseMaterial";
import { getCsvTemplate } from "../../Redux/Action/Student";
import DialogComponent from "../../Utils/DialogComponent";
import PaginationComponent from "../../Utils/PaginationComponent";
import { SnackBar } from "../../Utils/SnackBar";
import AddStudyPlanMonth from "./Component/AddStudyPlanMonth";
import DataTable from "./Component/DataTable";
import HeaderContainer from "./Component/HeaderContainer";
import Popup from "./Component/Popup";
import { STATUS_POPUP_CONTENT } from "./Component/StatusPopupContent";
import UploadStudyPlan from "./Component/UploadStudyPlan";

const POPUP_NAMES = {
  addStudyPlanMonth: "ADD_STUDY_PLAN_MONTH",
  uploadStudyPlan: "UPLOAD_STUDY_PLAN",
};

const FILE_REQUIRED_MESSAGE = "Please select a file";
const FILE_SELECT_INVALID =
  "Please select a valid format (.csv/.xlsx/.xls) file";
const FILE_SIZE_MESSAGE = "Please upload an file within 5MB size";
const SIZE = 10;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseValue: null,
      studyPlanPopupOpen: false,
      popupName: "",
      file: null,
      studyPlanDetails: {},
      planCourseValue: null,
      planDuration: null,
      planName: null,
      page: 0,
      totalPage: 0,
      studyPlanList: [],
      studyPlanData: [],
      order: "",
      anchorEl: null,
      anchorId: null,
      dialogOpen: false,
      dialogContent: {},
      snackOpen: false,
      snackColor: "",
      snackMessage: "",
    };
    this.handleThreeDotClick = this.handleThreeDotClick.bind(this);
  }

  sortedArray = (order, data) => {
    let arr = [...data];
    arr.sort((a1, b1) => {
      switch (order) {
        case "ASC":
          return a1.wkStatus.value.localeCompare(b1.wkStatus.value);
        case "DESC":
          return b1.wkStatus.value.localeCompare(a1.wkStatus.value);
        default:
          return 0;
      }
    });
    return arr;
  };

  componentDidMount() {
    this.props.getCourses(() => {});
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, order } = this.state;
    if (
      this.props.coursesResponse &&
      prevProps.coursesResponse !== this.props.coursesResponse &&
      this.props.coursesResponse?.data[0]
    ) {
      this.setState({
        courseValue: this.props.coursesResponse?.data[0] || null,
      });
      this.props.getStudyPlan(
        this.props.coursesResponse.data[0]["id"],
        page,
        SIZE
      );
    }
    if (this.props.studyPlan && prevProps.studyPlan !== this.props.studyPlan) {
      const { studyPlan } = this.props;
      if (studyPlan.success) {
        const { data } = this.props.studyPlan;
        this.setState({
          studyPlanList: data.content,
          studyPlanData:
            data.content.length !== 0
              ? this.sortedArray(order, data.content)
              : [],
          totalPage: data.totalPages,
        });
      } else {
        this.setState({
          snackOpen: true,
          snackColor: "error",
          snackMessage: studyPlan.message,
          studyPlanData: [],
          studyPlanList: [],
          totalPage: 0,
        });
      }
    }
  }

  handleCourseChange = (e, newValue) => {
    if (newValue) {
      this.setState({ courseValue: newValue, page: 0 });
      this.props.getStudyPlan(newValue.id, 0, SIZE);
    }
  };

  handlePopupOpen = (e) => {
    const { name } = e.currentTarget;
    this.setState({
      studyPlanPopupOpen: true,
      popupName: name,
    });
  };

  handlePopupClose = () => {
    this.setState({
      studyPlanPopupOpen: false,
      popupName: "",
      anchorEl: null,
      anchorId: null,
      studyPlanDetails: {},
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSnackClose = () => {
    this.setState({
      snackOpen: false,
      snackMessage: "",
      snackColor: "",
    });
  };

  handleDownloadTaskList = () => {
    const { courseValue } = this.state;
    if (courseValue) {
      this.props.downloadTaskList(courseValue.id, (res) => {
        if (!res.success) {
          setTimeout(() => {
            this.setState({
              snackOpen: true,
              snackColor: "error",
              snackMessage: res.message,
            });
          }, 200);
        }
      });
    }
  };

  handleDrop = (files) => {
    if (files && files.length !== 0) {
      let fileSize = files[0]["size"] / 1024 / 1024;
      if (fileSize < 5) this.setState({ file: files[0] });
      else
        setTimeout(() => {
          this.setState({
            snackOpen: true,
            snackColor: "error",
            snackMessage: FILE_SIZE_MESSAGE,
          });
        }, 200);
    } else {
      setTimeout(() => {
        this.setState({
          snackOpen: true,
          snackColor: "error",
          snackMessage: FILE_SELECT_INVALID,
        });
      }, 200);
    }
  };

  handleDelete = () => {
    this.setState({
      file: null,
    });
  };

  handleSave = () => {
    const { planCourseValue, planDuration, planName, courseValue } = this.state;
    if (
      planCourseValue?.courseId &&
      planDuration &&
      planName &&
      planName.trim().length !== 0
    ) {
      let obj = {
        name: planName,
        course: {
          id: planCourseValue.courseId,
        },
        duration: planDuration,
      };
      this.props.addStudyPlanMonth(obj, (res) => {
        if (res.success) {
          setTimeout(() => {
            this.setState({
              snackOpen: true,
              snackColor: "success",
              snackMessage: "Study Plan Created Successfully",
              planCourseValue: null,
              planDuration: null,
              planName: null,
              studyPlanPopupOpen: false,
              popupName: "",
              page: 0,
            });
          }, 500);
          this.props.getStudyPlan(courseValue.id, 0, SIZE);
        } else {
          this.setState({
            snackOpen: true,
            snackColor: "error",
            snackMessage: res.message,
          });
        }
      });
    } else {
      this.setState({
        snackOpen: true,
        snackColor: "error",
        snackMessage: "Please fill all the required fields",
      });
    }
  };

  handlePreview = () => {
    this.props.getCsvTemplate((response) => {
      if (response.success) {
        window.open(response.data.url);
      }
    });
  };

  handleThreeDotClick(e, item) {
    this.setState({
      anchorEl: e.currentTarget,
      anchorId: e.currentTarget.id,
      studyPlanDetails: item,
    });
  }

  handleClose = () => {
    this.setState({ anchorEl: null, anchorId: null, studyPlanDetails: {} });
  };

  renderOption(name, planName, id, isThisMonthStudyPlanLive) {
    switch (name) {
      case "Upload": {
        this.setState({
          popupName: POPUP_NAMES.uploadStudyPlan,
          studyPlanPopupOpen: true,
        });
        break;
      }
      case "View": {
        this.props.history.push(NAVIGATE_TO.viewStudyPlanPath(id));
        break;
      }
      case "Archive": {
        this.setState({
          dialogOpen: true,
          dialogContent: STATUS_POPUP_CONTENT(planName).Archive,
        });
        break;
      }
      case "Unarchive": {
        this.setState({
          dialogOpen: true,
          dialogContent: STATUS_POPUP_CONTENT(planName).Unarchive,
        });
        break;
      }
      case "Send Review": {
        this.setState({
          dialogOpen: true,
          dialogContent: STATUS_POPUP_CONTENT(planName)["Send Review"],
        });
        break;
      }
      case "Approve": {
        this.setState({
          dialogOpen: true,
          dialogContent: STATUS_POPUP_CONTENT(planName).Approve,
        });
        break;
      }
      case "Publish Now": {
        this.setState({
          dialogOpen: true,
          dialogContent: STATUS_POPUP_CONTENT(
            planName,
            isThisMonthStudyPlanLive
          )["Publish Now"],
        });
        break;
      }
      default:
        break;
    }
  }

  handleOptions = (statusTest) => {
    const { name: planName, id } = this.state.studyPlanDetails;
    if (statusTest === "Publish Now") {
      this.props.getThisMonthStudyPlanLive(id, (val) => {
        this.renderOption(statusTest, planName, id, val);
      });
    } else {
      this.renderOption(statusTest, planName, id, false);
    }
  };

  handleUpload = () => {
    const { file, studyPlanDetails, courseValue } = this.state;

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      this.props.createFileUpload(studyPlanDetails.id, formData, (res) => {
        if (res.success) {
          setTimeout(() => {
            this.setState({
              snackOpen: true,
              snackColor: "success",
              snackMessage: res.message,
              popupName: "",
              studyPlanPopupOpen: false,
              page: 0,
            });
          }, 500);
          this.props.getStudyPlan(courseValue.id, 0, SIZE);
        } else {
          this.setState({
            snackOpen: true,
            snackColor: "error",
            snackMessage: res.message,
          });
        }
      });
    } else {
      this.setState({
        snackOpen: true,
        snackColor: "error",
        snackMessage: FILE_REQUIRED_MESSAGE,
      });
    }
  };

  renderPopupContent = () => {
    const { handleChange, handleDrop, handleDelete } = this;
    const {
      popupName,
      file,
      studyPlanDetails,
      planCourseValue,
      planDuration,
      planName,
    } = this.state;
    const { coursesResponse } = this.props;

    switch (popupName) {
      case POPUP_NAMES.addStudyPlanMonth:
        return (
          <AddStudyPlanMonth
            onChange={handleChange}
            courseOptions={coursesResponse?.data || []}
            durationOptions={Array.from({ length: 6 }, (_, i) => i + 1)}
            planDuration={planDuration}
            planName={planName}
            planCourseValue={planCourseValue}
          />
        );
      case POPUP_NAMES.uploadStudyPlan:
        return (
          <UploadStudyPlan
            file={file}
            onDrop={handleDrop}
            onDelete={handleDelete}
            disabled={Boolean(file?.name)}
            planName={studyPlanDetails.name}
            planDuration={studyPlanDetails.duration}
          />
        );
      default:
        return null;
    }
  };

  handleSort = (newOrder) => {
    const { studyPlanList } = this.state;
    this.setState({
      order: newOrder,
      studyPlanData: this.sortedArray(newOrder, studyPlanList),
    });
  };

  handlePageChange = (e, newPage) => {
    this.setState({
      page: newPage - 1,
    });
    this.props.getStudyPlan(this.state.courseValue.id, newPage - 1, SIZE);
  };

  handleButton1Click = () => {
    this.setState({
      dialogOpen: false,
      dialogContent: {},
    });
  };

  handleCloseIconClick = () => {
    this.setState({
      dialogOpen: false,
      dialogContent: null,
      anchorEl: null,
      anchorId: null,
      studyPlanDetails: {},
    });
  };

  handleSuccess = (res) => {
    this.setState({
      snackOpen: true,
      snackColor: "success",
      snackMessage: res.message,
      dialogOpen: false,
      dialogContent: null,
      anchorEl: null,
      anchorId: null,
      studyPlanDetails: {},
      page: 0,
    });
  };

  handleFail = (res) => {
    this.setState({
      snackOpen: true,
      snackColor: "error",
      snackMessage: res.message,
      dialogOpen: false,
      dialogContent: null,
      anchorEl: null,
      anchorId: null,
      studyPlanDetails: {},
    });
  };

  handleButton2Click = () => {
    const {
      studyPlanDetails: { id },
      dialogContent,
      courseValue,
    } = this.state;
    this.props.updateStudyPlanStatus(id, dialogContent.name, (response) => {
      if (response.success) {
        this.props.getStudyPlan(courseValue.id, 0, SIZE);
        this.handleSuccess(response);
      } else this.handleFail(response);
    });
  };

  render() {
    const {
      studyPlanPopupOpen,
      popupName,
      snackOpen,
      snackColor,
      snackMessage,
      order,
      studyPlanData,
      totalPage,
      page,
      anchorEl,
      anchorId,
      studyPlanDetails,
      dialogContent,
      dialogOpen,
      courseValue,
    } = this.state;
    const {
      handlePopupOpen,
      handlePopupClose,
      renderPopupContent,
      handleDownloadTaskList,
      handleSnackClose,
      handleSave,
      handlePreview,
      handleUpload,
      handleSort,
      handlePageChange,
      handleThreeDotClick,
      handleClose,
      handleOptions,
      handleButton1Click,
      handleButton2Click,
      handleCloseIconClick,
      handleCourseChange,
    } = this;

    const { coursesResponse } = this.props;
    const isAddStudyPlanMonth = POPUP_NAMES.addStudyPlanMonth.match(popupName);
    const popupProps = {
      open: studyPlanPopupOpen,
      title: isAddStudyPlanMonth ? "Add Study Plan Month" : "Upload Study Plan",
      isAddStudyPlanMonth: isAddStudyPlanMonth,
      onCancel: handlePopupClose,
      onSave: handleSave,
      onPreview: handlePreview,
      onUpload: handleUpload,
    };

    return (
      <div>
        <Card>
          <Grid container>
            <Grid item sm={12} md={12} style={{ padding: "20px" }}>
              <TestTitle>{"Study Plan"}</TestTitle>
            </Grid>
            <Grid item sm={12} md={12} style={{ padding: "20px" }}>
              <HeaderContainer
                courseOptions={coursesResponse.data || []}
                courseValue={courseValue}
                handleCourseChange={handleCourseChange}
                handlePopupOpen={handlePopupOpen}
                handleDownloadTaskList={handleDownloadTaskList}
                buttonName={POPUP_NAMES.addStudyPlanMonth}
              />
            </Grid>
            <Grid item xs={12}>
              <Box padding={"0px 20px 30px !important"}>
                <DataTable
                  pageNo={page}
                  data={studyPlanData}
                  anchorEl={anchorEl}
                  anchorId={anchorId}
                  handleThreeDotClick={handleThreeDotClick}
                  handleClose={handleClose}
                  handleOptions={handleOptions}
                  order={order}
                  handleSort={handleSort}
                  studyPlanDetails={studyPlanDetails}
                />
                <PaginationComponent
                  pageCount={totalPage}
                  onPageChange={handlePageChange}
                  page={page + 1}
                />
              </Box>
            </Grid>
          </Grid>
        </Card>
        <Popup {...popupProps}>{renderPopupContent()}</Popup>
        <SnackBar
          snackData={{
            open: snackOpen,
            snackClose: handleSnackClose,
            snackType: snackColor,
            message: snackMessage,
          }}
        />
        <DialogComponent
          open={dialogOpen}
          dialogContent={dialogContent}
          handleButton1Click={handleButton1Click}
          handleCloseIconClick={handleCloseIconClick}
          handleButton2Click={handleButton2Click}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    coursesResponse: state.CourseMaterialReducer.courses,
    studyPlan: state.CourseMaterialReducer.studyPlan,
  };
};

export default connect(mapStateToProps, {
  getCourses,
  downloadTaskList,
  addStudyPlanMonth,
  getStudyPlan,
  getCsvTemplate,
  updateStudyPlanStatus,
  createFileUpload,
  getThisMonthStudyPlanLive,
})(Index);
