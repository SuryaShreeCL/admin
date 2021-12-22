import { Grid, Snackbar } from "@material-ui/core";
import ArchiveIcon from "@material-ui/icons/Archive";
import ShareIcon from "@material-ui/icons/Share";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import { Alert } from "@material-ui/lab";
import React, { Component } from "react";
import { connect } from "react-redux";
import { lms_add_test } from "../../../Component/RoutePaths";
import PublishIcon from "../../Assets/icons/Publish.svg";
import { Container, H1 } from "../../Assets/StyledComponents";
import {
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
      testType: "default",
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
    };
  }

  componentDidMount() {
    const role = sessionStorage.getItem("role");
    this.props.getFilters();
    let paramObj = { page: INITIAL_PAGE_NO, size: NO_OF_RESPONSE };
    this.props.getQuestionSet(paramObj);
    this.setState({ role: role });
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
      let paramObj = {
        page: this.state.currentPage,
        testType:
          this.state.testType !== "default" ? this.state.testType : null,
        topicId: this.state.topicId !== "default" ? this.state.topicId : null,
        status: this.state.status !== "default" ? this.state.status : null,
        field: this.state.field.length > 0 ? this.state.field : null,
        order: this.state.order.length > 0 ? this.state.order : null,
        size: NO_OF_RESPONSE,
      };
      this.props.getQuestionSet(paramObj);
    }
  }

  handleThreeDotClick = (event, topicId) => {
    this.setState({
      anchorEl: event.currentTarget,
      popUpId: topicId,
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, popUpId: null });
  };

  handleOptions = (text, topicName, topicId) => {
    if (text === "Edit") {
      this.props.history.push(lms_add_test + "?testQuestionSetId=" + topicId);
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
      this.setState({ dialogStatus: true, dialogContent: dialogContent });
    } else if (text === "Send Review") {
      const dialogContent = {
        type: "review",
        icon: <ShareIcon style={{ fontSize: "48px", fill: "#1093FF" }} />,
        title: "Are you sure you want to Send Review?",
        body: topicName,
        button1: "Cancel",
        button2: "Send",
      };
      this.setState({ dialogStatus: true, dialogContent: dialogContent });
    } else if (text === "Approve") {
      const dialogContent = {
        type: "approve",
        icon: <ThumbUpIcon style={{ fontSize: "48px", fill: "#1093ff" }} />,
        title: "Are you sure you want to Approve?",
        body: topicName,
        button1: "Cancel",
        button2: "Approve",
      };
      this.setState({ dialogStatus: true, dialogContent: dialogContent });
    } else if (text === "Publish Now") {
      const dialogContent = {
        type: "publish",
        icon: <img src={PublishIcon} width="64px" height="64px" />,
        title: "Are you sure you want to Publish? ",
        body: topicName,
        button1: "Cancel",
        button2: "Publish now",
      };
      this.setState({ dialogStatus: true, dialogContent: dialogContent });
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
          this.props.getQuestionSet(paramObj);
          this.handleCloseIconClick();
        }
      });
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
          this.props.getQuestionSet(paramObj);
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
          this.props.getQuestionSet(paramObj);
          this.handleCloseIconClick();
        }
      });
    } else if (this.state.dialogContent.type === "publish") {
      this.props.publishTest(this.state.popUpId, (response) => {
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
    } = this.state;
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
            testType={testType}
            topicId={topicId}
            status={status}
            handleDropDownChange={handleDropDownChange}
          />
        )}
        {tableContent && (
          <TableComp
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
          />
        )}
        {tableContent !== undefined && (
          <PaginationComponent
            pageCount={tableContent.totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* PopUp Components */}
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
  getQuestionSet,
  deleteTest,
  reviewTest,
  approveTest,
  publishTest,
  draftTest,
})(TestLanding);
