import { Box, Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
import PaginationComponent from "../../../../Utils/PaginationComponent";
import {
  clearFieldValue,
  getTopicName,
  getTopicTestReport,
  postTopicTestList,
  topicTestExport,
  topicTestReportExport,
} from "../../../../Redux/Action/Student";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "../../../../Utils/DropDown";
import TopicTestReport from "./TopicTestReport/Index";
import { CenterText, FlexView } from "../../../../Assets/StyledComponents";
import LoadingSpinner from "../../../../Utils/LoadingSpinner";
import { SnackBar } from "../../../../Utils/SnackBar";

const NO_OF_RESPONSE = 10;

const DEFAULT_OBJ = { id: "default", title: "Select" };

const STATUS = [
  { id: "Completed", title: "Completed" },
  { id: "Yet to start", title: "Yet to start" },
  { id: "Progress", title: "On going" },
];

const defaultState = {
  topicId: null,
  status: null,
  isReport: false,
  currentPage: 0,
};

function Index({ studentId, courseId }) {
  const [state, setState] = useState({
    ...defaultState,
  });

  const { currentPage, topicId, status, isReport } = state;

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    color: "",
  });

  const { open, message, color } = snack;

  const { topics, topicList, topicReport, loading } = useSelector(
    (state) => state.LmsStudentReducer
  );

  const dispatch = useDispatch();

  const handleSnackClose = () => {
    setSnack({
      open: false,
      message: "",
      color: "",
    });
  };

  const getTopicList = (status, topicId, page) => {
    let paramObj = {
      page: page,
      size: NO_OF_RESPONSE,
    };
    dispatch(postTopicTestList(studentId, courseId, paramObj, status, topicId));
  };

  useEffect(() => {
    if (studentId && courseId) {
      setState({ ...state, ...defaultState });
      dispatch(clearFieldValue("topics"));
      dispatch(clearFieldValue("topicList"));
      dispatch(clearFieldValue("topicReport"));
      dispatch(getTopicName(studentId, courseId));
      getTopicList(null, null, 0);
    }
  }, [studentId, courseId]);

  // useEffect(() => {
  //   if (topicList && !topicList.success) {
  //     setSnack({
  //       open: true,
  //       message: topicList.message,
  //       color: "error",
  //     });
  //   }
  // }, [topicList]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newVal = value === "default" ? null : value;
    setState({
      ...state,
      [name]: newVal,
      currentPage: 0,
    });
    if (name === "status") getTopicList(newVal, topicId, 0);
    else getTopicList(status, newVal, 0);
  };

  const handleTableRowClick = (event) => {
    const { id } = event.currentTarget;
    dispatch(
      getTopicTestReport(studentId, id, (response) => {
        if (response.success) {
          setState({
            ...state,
            isReport: true,
          });
        }
      })
    );
  };

  const handleClickBack = () => {
    setState({
      ...state,
      isReport: false,
    });
    dispatch(clearFieldValue("topicReport"));
  };

  const handlePageChange = (event, value) => {
    setState({ ...state, currentPage: value - 1 });
    getTopicList(status, topicId, value - 1);
  };

  const handleTopicTestExport = () => {
    dispatch(topicTestExport(studentId, courseId));
  };

  const handleTopicTestReportExport = () => {
    dispatch(topicTestReportExport(studentId, courseId));
  };

  const data = topicReport?.data || {};
  const tableData = topicList?.data || {};

  return (
    <>
      {!loading && (topics?.data || []).length !== 0 && (
        <Box padding={"0 0 10px !important"}>
          <FlexView gap={"20px"} justifyContent={"end"}>
            <Button variant='contained' onClick={handleTopicTestExport}>
              {"Export TopicTest"}
            </Button>
            <Button variant='contained' onClick={handleTopicTestReportExport}>
              {"Export TopicTestReport"}
            </Button>
          </FlexView>
        </Box>
      )}
      <Box padding={"0 20px !important"} position={"relative"}>
        {loading ? (
          <LoadingSpinner loading={loading} />
        ) : (topics?.data || []).length === 0 ? (
          <CenterText paddingTop={"200px !important"}>
            {"Topic Test not yet Initiated"}
          </CenterText>
        ) : (
          <>
            {isReport ? (
              <TopicTestReport data={data} handleClickBack={handleClickBack} />
            ) : (
              <>
                <Grid container spacing={3} style={{ marginTop: "10px" }}>
                  <Grid item xs={4} md={4}>
                    <DropDown
                      label={"Status"}
                      name={"status"}
                      items={[DEFAULT_OBJ, ...STATUS]}
                      value={status || "default"}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <DropDown
                      label={"Topic Name"}
                      name={"topicId"}
                      items={[DEFAULT_OBJ, ...(topics?.data || [])]}
                      value={topicId || "default"}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                {tableData && (
                  <TableComponent
                    tableData={tableData.content}
                    handleTableRowClick={handleTableRowClick}
                    pageNo={currentPage}
                  />
                )}
                <Box paddingTop={"10px !important"}>
                  {tableData &&
                    tableData.content &&
                    tableData.content.length !== 0 && (
                      <PaginationComponent
                        page={currentPage + 1}
                        pageCount={tableData.totalPages}
                        onPageChange={handlePageChange}
                      />
                    )}
                </Box>
              </>
            )}
          </>
        )}
        <SnackBar
          snackData={{
            open,
            snackClose: handleSnackClose,
            snackType: color,
            message: message,
          }}
        />
      </Box>
    </>
  );
}
export default Index;
