import {
  Box,
  Button,
  Dialog,
  Grid,
  Snackbar,
  Typography,
} from "@material-ui/core";

import ArchiveIcon from "@material-ui/icons/Archive";
import ShareIcon from "@material-ui/icons/Share";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import { Alert } from "@material-ui/lab";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { Component } from "react";
import { connect } from "react-redux";
import MomentUtils from '@date-io/moment';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { rescheduleTest } from "../../../AsyncApiCall/Student";
import { lms_add_test } from "../../../Component/RoutePaths";
import PublishIcon from "../../Assets/icons/Publish.svg";
import { Container, H1 } from "../../Assets/StyledComponents";
import {
  aeapproveTest,
  aedeleteTest,
  aedraftTest,
  aegetFilters,
  aegetQuestionSet,
  aepublishTest,
  // aereviewTest,
  approveTest,
  deleteTest,
  draftTest,
  getFilters,
  getQuestionSet,
  publishTest,
  reviewTest,
} from "../../Redux/Action/Test";
import DialogComponent from "../../Utils/DialogComponent";
import PaginationComponent from "../../Utils/PaginationComponent";
import PlusButton from "../../Utils/PlusButton";
import DropDownRack from "./DropDownRack";
import TableComp from "./TableComp";
import moment from "moment";

const INITIAL_PAGE_NO = 0;
const NO_OF_RESPONSE = 10;

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "uploadImage",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
    "MathType",
    "ChemType",
    "codeBlock",
    "imageTextAlternative",
    "|",
    "imageStyle:full",
    "imageStyle:side",
  ],
  styles: ["full", "alignLeft", "alignRight"],
};

class TestLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testType: "",
      topicId: "default",
      status: "default",
      order: [],
      field: [],
      role: "",
      anchorEl: null,
      popUpId: null,
      dialogStatus: false,
      dialogContent: null,
      currentPage: 0,
      alertState: false,
      alertMsg: "",
      alertSeverity: "",
      popupOpen: false,
      popupOpen1: false,
      eventDate: new Date(),
      eventEndDate: new Date(),
      openStatus: false,
      clickableStatus: "",
      department: "",
      deptName: "",
    };
  }

  componentDidMount() {
    const role = sessionStorage.getItem("role");
    var deptname = window.sessionStorage.getItem("department");
    console.log(deptname);
    this.setState({
      deptName: deptname,
    });
    deptname === "assessment_engine_admin"
      ? this.props.aegetFilters()
      : this.props.getFilters();
    // if (deptname === "assessment_engine_admin") {
    //   var paramObj = {
    //     page: INITIAL_PAGE_NO,
    //     size: NO_OF_RESPONSE,
    //     testType: TEST_TYPE,
    //   };
    // } else {
    //   var paramObj = { page: INITIAL_PAGE_NO, size: NO_OF_RESPONSE };
    // }
    var paramObj = {
      page: INITIAL_PAGE_NO,
      size: NO_OF_RESPONSE,
      testType: deptname === "assessment_engine_admin" ? "AE_TEST" : null,
    };
    deptname === "assessment_engine_admin"
      ? this.props.aegetQuestionSet(paramObj)
      : this.props.getQuestionSet(paramObj);

    this.setState({
      role: role,
      department: deptname,
      testType: deptname === "assessment_engine_admin" ? "" : "default",
      testType: "",
    });
  }

  handleDropDownChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      currentPage: 0,
    });
  };

  handlePageChange = (event, value) => {
    window.scroll(0, 0);
    this.setState({ currentPage: value - 1 });
    // let paramObj = { page: value - 1, size: NO_OF_RESPONSE };
    // this.props.getQuestionSet(paramObj);
  };

  handleSortNew = (index, order) => {
    const fields = { 1: "type", 4: "courseName", 6: "wkStatusValue" };
    this.setState({
      field: this.state.field.concat(fields[index]),
      order: this.state.order.concat(order),
    });
  };

  handleSortBlue = (fieldIndex) => {
    this.setState({
      field: this.state.field.filter((item, index) => {
        if (index !== fieldIndex) return item;
      }),
      order: this.state.order.filter((item, index) => {
        if (index !== fieldIndex) return item;
      }),
    });
  };

  handleSortBlur = (fieldIndex) => {
    if (this.state.order[fieldIndex] === "ASC") {
      let newOrder = this.state.order;
      newOrder.splice(fieldIndex, 1, "DESC");
      this.setState({ order: newOrder });
    } else {
      let newOrder = this.state.order;
      newOrder.splice(fieldIndex, 1, "ASC");
      this.setState({ order: newOrder });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      let deptName = window.sessionStorage.getItem("department");
      let paramObj = {
        page: this.state.currentPage,
        testType:
          deptName === "assessment_engine_admin"
            ? "AE_TEST"
            : this.state.testType !== "default"
            ? this.state.testType
            : null,

        topicId: this.state.topicId !== "default" ? this.state.topicId : null,
        status: this.state.status !== "default" ? this.state.status : null,
        field: this.state.field.length > 0 ? this.state.field : null,
        order: this.state.order.length > 0 ? this.state.order : null,
        size: NO_OF_RESPONSE,
      };
      this.state.department === "assessment_engine_admin"
        ? this.props.aegetQuestionSet(paramObj)
        : this.props.getQuestionSet(paramObj);
    }
  }

  handleThreeDotClick = (event, topicId, status) => {
    console.log(status);
    this.setState({
      anchorEl: event.currentTarget,
      popUpId: topicId,
      openStatus: !this.state.openStatus,
      clickableStatus: status,
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, popUpId: null, openStatus: false });
  };

  handleOptions = (text, topicName, topicId) => {
    console.log(topicName, "vvvvvvvvvvvv")
    if (text === "Edit") {
      this.props.history.push(
        lms_add_test + "?testQuestionSetId=" + this.state.popUpId
      );
    }
    if (text === "Archive") {
      const dialogContent = {
        type: "archive",
        icon: <ArchiveIcon style={{ fontSize: "48px", fill: "#1093FF" }} />,
        title: "Are you sure you want to Archive?",
        body: topicName,
        button1: "No",
        button2: "Yes",
      };
      this.setState({
        dialogStatus: true,
        dialogContent: dialogContent,
        anchorEl: null,
        openStatus: !this.state.openStatus,
        clickableStatus: null,
      });
    } else if (text === "Unarchive") {
      const dialogContent = {
        type: "unarchive",
        icon: <UnarchiveIcon style={{ fontSize: "48px", fill: "#1093FF" }} />,
        title: "Are you sure you want to Unarchive?",
        body: topicName,
        button1: "No",
        button2: "Yes",
      };
      this.setState({
        dialogStatus: true,
        dialogContent: dialogContent,
        anchorEl: null,
        openStatus: !this.state.openStatus,
        clickableStatus: null,
      });
    } else if (text === "Send Review") {
      const dialogContent = {
        type: "review",
        icon: <ShareIcon style={{ fontSize: "48px", fill: "#1093FF" }} />,
        title: "Are you sure you want to Send Review?",
        body: topicName,
        button1: "Cancel",
        button2: "Send",
      };
      this.setState({
        dialogStatus: true,
        dialogContent: dialogContent,
        anchorEl: null,
        openStatus: !this.state.openStatus,
        clickableStatus: null,
      });
    } else if (text === "Approve") {
      const dialogContent = {
        type: "approve",
        icon: <ThumbUpIcon style={{ fontSize: "48px", fill: "#1093ff" }} />,
        title: "Are you sure you want to Approve?",
        body: topicName,
        button1: "Cancel",
        button2: "Approve",
      };
      this.setState({
        dialogStatus: true,
        dialogContent: dialogContent,
        anchorEl: null,
        openStatus: !this.state.openStatus,
        clickableStatus: null,
      });
    } else if (text === "Publish Now") {
      var deptname = window.sessionStorage.getItem("department");
      const dialogContent = {
        type: "publish",
        icon: <img src={PublishIcon} width="64px" height="64px" />,
        title: "Are you sure you want to Publish? ",
        body: deptname !== "assessment_engine_admin" ? topicName : "",
        button1: "Cancel",
        button2: "Publish now",
      };
      this.setState({
        dialogStatus: true,
        dialogContent: dialogContent,
        anchorEl: null,
        openStatus: !this.state.openStatus,
        clickableStatus: null,
      });
    } 
    else if (text === "Reschedule") {      
      const { data: tableContent } = this.props.testData;

      if (tableContent) {
        let findObj = tableContent.content.filter(
          (el) => el.id === this.state.popUpId
        )[0];
        console.log(tableContent,findObj,"findObj.eventDate")

        if (findObj) {
          this.setState({
            eventDate: findObj.eventDate ? findObj.eventDate : new Date(),

            eventEndDate: findObj.eventEndDate
              ? findObj.eventEndDate
              : new Date(),
          });
        }
        console.log(this.props.testData,this.state.popUpId,findObj,"Reschedule")
      }
      this.setState({
        popupOpen: true,
      });      
    }

    else if (text === "Schedule") {        
      const { data: tableContent } = this.props.testData;

      if (tableContent) {
        let findObj = tableContent.content.map(
          (el) => el.id === this.state.popUpId
        );

        if (findObj) {
          this.setState({
            eventDate: findObj.eventDate ? findObj.eventDate : new Date(),

            eventEndDate: findObj.eventEndDate
              ? findObj.eventEndDate
              : new Date(),
          });
        }
        console.log(this.props.testData,this.state.popUpId,findObj,"Schedule")
      }

      this.setState({
        popupOpen1: true,
      });      
    }
  };

  handleButton1Click = () => {
    this.setState({
      dialogStatus: false,
      dialogContent: null,
    });
  };

  handleCloseIconClick = () => {
    this.setState({
      dialogStatus: false,
      dialogContent: null,
      anchorEl: null,
      popUpId: null,
    });
  };

  handlePrimaryButtonClick = () => {
    if (this.state.dialogContent.type === "archive") {
      this.props.deleteTest(this.state.popUpId, (response) => {
        if (response.success) {
          let paramObj = {
            page: INITIAL_PAGE_NO,
            size: NO_OF_RESPONSE,
            testType:
              this.state.testType !== "default" ? this.state.testType : null,
            topicId:
              this.state.topicId !== "default" ? this.state.topicId : null,
            status: this.state.status !== "default" ? this.state.status : null,
          };
          this.state.department === "assessment_engine_admin"
            ? this.props.aegetQuestionSet(paramObj)
            : this.props.getQuestionSet(paramObj);
          this.handleCloseIconClick();
        } else {
          //
          this.setState({
            alertState: true,
            alertMsg: response.message,
            alertSeverity: "error",
          });
          this.handleCloseIconClick();
        }
      });
      this.props.aedeleteTest(this.state.popUpId, (response) => {
        if (response.success) {
          let paramObj = {
            page: INITIAL_PAGE_NO,
            size: NO_OF_RESPONSE,
            testType:
              this.state.testType !== "default" ? this.state.testType : null,
            topicId:
              this.state.topicId !== "default" ? this.state.topicId : null,
            status: this.state.status !== "default" ? this.state.status : null,
          };

          this.state.department === "assessment_engine_admin"
            ? this.props.aegetQuestionSet(paramObj)
            : this.props.getQuestionSet(paramObj);

          this.handleCloseIconClick();
        } else {
          //
          this.setState({
            alertState: true,
            alertMsg: response.message,
            alertSeverity: "error",
          });
          this.handleCloseIconClick();
        }
      });
    } else if (this.state.dialogContent.type === "review") {
      this.props.reviewTest(this.state.popUpId, (response) => {
        if (response.success) {
          let paramObj = {
            page: INITIAL_PAGE_NO,
            size: NO_OF_RESPONSE,
            testType:
              this.state.testType !== "default" ? this.state.testType : null,
            topicId:
              this.state.topicId !== "default" ? this.state.topicId : null,
            status: this.state.status !== "default" ? this.state.status : null,
          };
          this.state.department === "assessment_engine_admin"
            ? this.props.aegetQuestionSet(paramObj)
            : this.props.getQuestionSet(paramObj);
          this.handleCloseIconClick();
        }
      });
      // this.props.aereviewTest(this.state.popUpId, (response) => {
      // if (response.success) {
      // let paramObj = {
      // page: INITIAL_PAGE_NO,
      // size: NO_OF_RESPONSE,
      // testType:
      // this.state.testType !== "default" ? this.state.testType : null,
      // topicId:
      // this.state.topicId !== "default" ? this.state.topicId : null,
      // status: this.state.status !== "default" ? this.state.status : null,
      // };
      // this.state.department === "assessment_engine_admin"
      // ? this.props.aegetQuestionSet(paramObj)
      // : this.props.getQuestionSet(paramObj);

      // this.handleCloseIconClick();
      // }
      // });
    } else if (this.state.dialogContent.type === "unarchive") {
      this.props.draftTest(this.state.popUpId, (response) => {
        if (response.success) {
          let paramObj = {
            page: INITIAL_PAGE_NO,
            size: NO_OF_RESPONSE,
            testType:
              this.state.testType !== "default" ? this.state.testType : null,
            topicId:
              this.state.topicId !== "default" ? this.state.topicId : null,
            status: this.state.status !== "default" ? this.state.status : null,
          };

          this.state.department === "assessment_engine_admin"
            ? this.props.aegetQuestionSet(paramObj)
            : this.props.getQuestionSet(paramObj);
          this.handleCloseIconClick();
        }
      });
      this.props.aedraftTest(this.state.popUpId, (response) => {
        if (response.success) {
          let paramObj = {
            page: INITIAL_PAGE_NO,
            size: NO_OF_RESPONSE,
            testType:
              this.state.testType !== "default" ? this.state.testType : null,
            topicId:
              this.state.topicId !== "default" ? this.state.topicId : null,
            status: this.state.status !== "default" ? this.state.status : null,
          };

          this.state.department === "assessment_engine_admin"
            ? this.props.aegetQuestionSet(paramObj)
            : this.props.getQuestionSet(paramObj);
          this.handleCloseIconClick();
        }
      });
    } else if (this.state.dialogContent.type === "approve") {
      this.props.approveTest(this.state.popUpId, (response) => {
        if (response.success) {
          let paramObj = {
            page: INITIAL_PAGE_NO,
            size: NO_OF_RESPONSE,
            testType:
              this.state.testType !== "default" ? this.state.testType : null,
            topicId:
              this.state.topicId !== "default" ? this.state.topicId : null,
            status: this.state.status !== "default" ? this.state.status : null,
          };

          this.state.department === "assessment_engine_admin"
            ? this.props.aegetQuestionSet(paramObj)
            : this.props.getQuestionSet(paramObj);
          this.handleCloseIconClick();
        }
      });
      this.props.aeapproveTest(this.state.popUpId, (response) => {
        if (response.success) {
          let paramObj = {
            page: INITIAL_PAGE_NO,
            size: NO_OF_RESPONSE,
            testType:
              this.state.testType !== "default" ? this.state.testType : null,
            topicId:
              this.state.topicId !== "default" ? this.state.topicId : null,
            status: this.state.status !== "default" ? this.state.status : null,
          };

          this.state.department === "assessment_engine_admin"
            ? this.props.aegetQuestionSet(paramObj)
            : this.props.getQuestionSet(paramObj);
          this.handleCloseIconClick();
        }
      });
    } else if (this.state.dialogContent.type === "publish") {
      this.state.department === "assessment_engine_admin"
        ? this.props.aepublishTest(this.state.popUpId, (response) => {
            if (response.success) {
              let paramObj = {
                page: INITIAL_PAGE_NO,
                size: NO_OF_RESPONSE,
                testType:
                  this.state.testType !== "default"
                    ? this.state.testType
                    : null,
                topicId:
                  this.state.topicId !== "default" ? this.state.topicId : null,
                status:
                  this.state.status !== "default" ? this.state.status : null,
              };
              this.props.aegetQuestionSet(paramObj);
              this.handleCloseIconClick();
            } else {
              //
              this.setState({
                alertState: true,
                alertMsg: response.message,
                alertSeverity: "error",
              });
              this.handleCloseIconClick();
            }
          })
        : this.props.publishTest(this.state.popUpId, (response) => {
            if (response.success) {
              let paramObj = {
                page: INITIAL_PAGE_NO,
                size: NO_OF_RESPONSE,
                testType:
                  this.state.testType !== "default"
                    ? this.state.testType
                    : null,
                topicId:
                  this.state.topicId !== "default" ? this.state.topicId : null,
                status:
                  this.state.status !== "default" ? this.state.status : null,
              };

              this.props.getQuestionSet(paramObj);
              this.handleCloseIconClick();
            } else {
              //
              this.setState({
                alertState: true,
                alertMsg: response.message,
                alertSeverity: "error",
              });
              this.handleCloseIconClick();
            }
          });
    }
  };

  /* For Reschedule popup */
  handleReschedule = () => {
    // if (this.state.eventDate && this.state.endEventDate) {
    console.log("reschedule");
    let obj = {
      startDateTime: this.state.eventDate,
      endDateTime: this.state.eventEndDate,
    };

    if (
      moment(this.state.eventEndDate).isSameOrBefore(this.state.eventDate) ||
      moment(this.state.eventDate).isBefore(moment()) ||
      moment(this.state.eventEndDate).isBefore(moment())
    ) {
      this.setState({
        alertState: true,
        alertSeverity: "warning",
        alertMsg: "Please add proper timing & date",
        popupOpen: true,
      });
    } else {
      rescheduleTest(this.state.popUpId, obj).then((response) => {
        if (response?.status === 200) {                
            this.setState({
              alertState: true,
              alertSeverity: "success",
              alertMsg: "Test rescheduled successfully",
              popupOpen: false,
            });
            this.handleClose()
            let paramObj = { page: INITIAL_PAGE_NO, size: NO_OF_RESPONSE };
            this.state.department !== "assessment_engine_admin"
            ? this.props.getQuestionSet(paramObj)
            : this.props.aegetQuestionSet(paramObj);                  
        } else {
          this.setState({
            alertState: true,
            alertSeverity: "error",
            alertMsg: response,
          });
        }
      });
    }
  };

  /* For Schedule popup */
  handleSchedule = () => {   
    console.log("schedule")
    let obj = {
      startDateTime: this.state.eventDate,
      endDateTime: this.state.eventEndDate,
    };

    if(moment(this.state.eventEndDate).isSameOrBefore(this.state.eventDate) || 
    moment(this.state.eventDate).isBefore(moment()) ||
    moment(this.state.eventEndDate).isBefore(moment())) 
    {
      this.setState({
        alertState: true,
        alertSeverity: "warning",
        alertMsg: "Please add proper timing & date",
        popupOpen1: true,
      });          
    } 

    else
    {
      rescheduleTest(this.state.popUpId, obj).then((response) => {
        if (response?.status === 200) {                
            this.setState({
              alertState: true,
              alertSeverity: "success",
              alertMsg: "Test Scheduled successfully",
              popupOpen1: false,
            });
            this.handleClose()
            let paramObj = { page: INITIAL_PAGE_NO, size: NO_OF_RESPONSE };
            this.state.department !== "assessment_engine_admin"
            ? this.props.getQuestionSet(paramObj)
            : this.props.aegetQuestionSet(paramObj);
        } else {
          this.setState({
            alertState: true,
            alertSeverity: "error",
            alertMsg: response,
          });
        }
      });
    }
  };

  render() {
    const { data: filterData } = this.props.filterData;
    const { data: tableContent } = this.props.testData;

    const {
      testType,
      topicId,
      status,
      field,
      order,
      role,
      anchorEl,
      popUpId,
      dialogStatus,
      dialogContent,
      popupOpen,
      popupOpen1,
      eventDate,
      eventEndDate,
    } = this.state;
    // var filterAE = this.props.testData?.filter(item=>item.type === "AE_TEST")
    //
    const {
      handleDropDownChange,
      handlePageChange,
      handleSortNew,
      handleSortBlue,
      handleSortBlur,
      handleThreeDotClick,
      handleClose,
      handleOptions,
      handleButton1Click,
      handleCloseIconClick,
      handlePrimaryButtonClick,
      // handleReschedule,
    } = this;
    return (
      <Container>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="space-between"
          style={{ marginBottom: "35px" }}
        >
          <H1>Test</H1>
          <PlusButton onClick={() => this.props.history.push(lms_add_test)}>
            Add
          </PlusButton>
        </Grid>
        {filterData && (
          <DropDownRack
            filterData={filterData}
            testType={testType ? testType : "default"}
            topicId={topicId}
            status={status}
            handleDropDownChange={handleDropDownChange}
          />
        )}
        {tableContent && (
          <TableComp
            deptname={this.state.deptName}
            tableContent={tableContent.content}
            handleSortNew={handleSortNew}
            field={field}
            order={order}
            handleSortBlue={handleSortBlue}
            handleSortBlur={handleSortBlur}
            role={role}
            handleThreeDotClick={handleThreeDotClick}
            anchorEl={anchorEl}
            popUpId={popUpId}
            handleClose={handleClose}
            handleOptions={handleOptions}
            openStatus={this.state.openStatus}
            clickedStatus={this.state.clickableStatus}
          />
        )}

        {tableContent !== undefined && (
          <PaginationComponent
            pageCount={tableContent?.totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* Archive PopUp*/}
        <DialogComponent
          open={dialogStatus}
          dialogContent={dialogContent}
          handleButton1Click={handleButton1Click}
          handleCloseIconClick={handleCloseIconClick}
          handleButton2Click={handlePrimaryButtonClick}
        />
        <Snackbar
          open={this.state.alertState}
          onClose={() => this.setState({ alertState: false })}
        >
          <Alert
            onClose={() => this.setState({ alertState: false })}
            severity={this.state.alertSeverity}
            variant="filled"
          >
            {this.state.alertMsg}
          </Alert>
        </Snackbar>

        {/*Reschedule popup*/}
        <Dialog
          open={popupOpen}
          onClose={() => this.setState({ popupOpen: !popupOpen })}
        >
          <Box position={"relative"}>
            <Grid
              container
              spacing={3}
              style={{ width: "auto", margin: 0, padding: "20px" }}
            >
              <Grid
                item
                xs={12}
                container
                alignItems="center"
                justifyContent="center"
              >             
                <ScheduleIcon style={{ fontSize: "48px", fill: "#1093FF" }} />
              </Grid>
              <Grid
                item
                xs={12}
                container
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="h4">Reschedule Test</Typography>
              </Grid>

              <Grid
                item
                xs={6}
                container
                alignItems="center"
                justifyContent="center"
              >
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DateTimePicker
                    label="Start date and time"
                    inputVariant="outlined"
                    disablePast
                    value={eventDate}
                    onChange={(value) => this.setState({ eventDate: value })}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid
                item
                xs={6}
                container
                alignItems="center"
                justifyContent="center"
              >
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DateTimePicker
                    label="End date and time"
                    inputVariant="outlined"
                    disablePast
                    value={eventEndDate}
                    disabled={eventEndDate === eventDate}
                    onChange={(value) => this.setState({ eventEndDate: value })}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid
                item
                xs={6}
                container
                alignItems="center"
                justifyContent="flex-end"
              >
                <Button
                  onClick={() => this.setState({ popupOpen: !popupOpen })}
                  variant={"outlined"}
                  color={"primary"}
                  size={"large"}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6} container alignItems="center">
                <Button
                  size={"large"}
                  onClick={() => this.handleReschedule()}
                  variant={"contained"}
                  color={"primary"}
                >
                  Reschedule
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Dialog>

        {/* Schedule popup */}
        <Dialog
          open={popupOpen1}
          onClose={() => this.setState({ popupOpen1: !popupOpen1 })}
        >
          <Box position={"relative"}>
            <Grid
              container
              spacing={3}
              style={{ width: "auto", margin: 0, padding: "20px" }}
            >              
              <Grid
                item
                xs={12}
                container
                alignItems="center"
                justifyContent="center"
              >
                <ScheduleIcon style={{ fontSize: "48px", fill: "#1093FF" }} />
              </Grid>
              <Grid
                item
                xs={12}
                container
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="h4">Schedule Test</Typography>
              </Grid>

              <Grid
                item
                xs={6}
                container
                alignItems="center"
                justifyContent="center"
              >
                <MuiPickersUtilsProvider  utils={MomentUtils}>
                <DateTimePicker
                  label="Start date and time"
                  inputVariant="outlined"
                  disablePast
                  value={eventDate}
                  onChange={(value) => this.setState({ eventDate: value })}
                /></MuiPickersUtilsProvider>
              </Grid>
              <Grid
                item
                xs={6}
                container
                alignItems="center"
                justifyContent="center"
              >
                <MuiPickersUtilsProvider  utils={MomentUtils}>
                <DateTimePicker
                  label="End date and time"
                  inputVariant="outlined"
                  disablePast
                  value={eventEndDate}
                  disabled ={eventEndDate === eventDate}
                  onChange={(value) => this.setState({ eventEndDate: value })}
                /></MuiPickersUtilsProvider>
              </Grid>
              <Grid
                item
                xs={6}
                container
                alignItems="center"
                justifyContent="flex-end"
              >
                <Button
                  onClick={() => this.setState({ popupOpen1: !popupOpen1 })}
                  variant={"outlined"}
                  color={"primary"}
                  size={"large"}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6} container alignItems="center">
                <Button
                  size={"large"}
                  onClick={()=>this.handleSchedule()}
                  variant={"contained"}
                  color={"primary"}
                >
                  Schedule
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Dialog>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filterData: state.TestReducer.filterData,
    testData: state.TestReducer.testData,
  };
};

export default connect(mapStateToProps, {
  getFilters,
  aegetFilters,
  getQuestionSet,
  aegetQuestionSet,
  deleteTest,
  aedeleteTest,
  reviewTest,
  // aereviewTest,
  approveTest,
  aeapproveTest,
  publishTest,
  aepublishTest,
  draftTest,
  aedraftTest,
})(TestLanding);
