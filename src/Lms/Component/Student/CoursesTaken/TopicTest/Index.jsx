import { Box, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
import PaginationComponent from "../../../../Utils/PaginationComponent";
import {
  getTopicName,
  getTopicTestReport,
  postTopicTestList,
} from "../../../../Redux/Action/Student";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "../../../../Utils/DropDown";
import TopicTestReport from "./TopicTestReport/Index";

const NO_OF_RESPONSE = 10;
const DEFAULT_OBJ = { id: "default", title: "Select" };
const STATUS = [
  { id: "Completed", title: "Completed" },
  { id: "Yet to start", title: "Yet to start" },
  { id: "On going", title: "On going" },
];
function Index({ studentId, courseId }) {
  const [state, setState] = useState({
    currentPage: 0,
    status: null,
    topicId: null,
    topicValue: null,
    isReport: false,
    field: [],
    order: [],
  });
  const { currentPage, topicId, status, isReport } = state;

  useEffect(() => {
    if (studentId && courseId)
      dispatch(
        getTopicName(studentId, courseId, (response) => {
          setState({
            ...state,
            topicId: response.data[0].id,
          });
        })
      );
  }, [studentId, courseId]);

  useEffect(() => {
    if (status !== "default")
      if (topicId !== "default") {
        let paramObj = {
          page: currentPage,
          size: NO_OF_RESPONSE,
        };
        dispatch(
          postTopicTestList(studentId, courseId, paramObj, status, topicId)
        );
      }
  }, [studentId, courseId, status, topicId, currentPage]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "status") {
      setState({
        ...state,
        status: value,
        currentPage: 0,
      });
    } else if (name === "topicName") {
      setState({
        ...state,
        topicId: value,
        currentPage: 0,
      });
    } else {
      setState({
        ...state,
        [name]: value,
        currentPage: 0,
      });
    }
  };

  const handleTableRowClick = (event) => {
    const { id } = event.currentTarget;
    dispatch(
      getTopicTestReport(studentId, id, (response) => {
        if (response.success) {
          console.log(response, "xdfgvhjnkml,;.");
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
  };
  const handlePageChange = (event, value) => {
    window.scroll(0, 0);
    setState({ ...state, currentPage: value - 1 });
  };
  const dispatch = useDispatch();

  const { topics, topicList, topicReport } = useSelector(
    (state) => state.LmsStudentReducer
  );
  const data = topicReport.data;
  const tableData = topicList.data;
  return (
    <Box padding={"0 20px !important"}>
      {isReport ? (
        data && (
          <TopicTestReport data={data} handleClickBack={handleClickBack} />
        )
      ) : (
        <Grid
          container
          spacing={3}
          style={{ dispaly: "flex", marginTop: "20px" }}
        >
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
              name={"topicName"}
              items={[DEFAULT_OBJ, ...(topics?.data || [])]}
              value={topicId || "default"}
              onChange={handleChange}
            />
          </Grid>
          {tableData && (
            <TableComponent
              tableData={tableData.content}
              handleTableRowClick={handleTableRowClick}
            />
          )}
          {tableData !== undefined && (
            <PaginationComponent
              pageCount={tableData.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </Grid>
      )}
    </Box>
  );
}
export default Index;
