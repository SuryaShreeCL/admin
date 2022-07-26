import { Box, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
import TopicTestReport from "./TopicTestReport";
import PaginationComponent from "../../../../Utils/PaginationComponent";
import {
  getTopicName,
  postTopicTestList,
} from "../../../../Redux/Action/Student";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "../../../../Utils/DropDown";

const NO_OF_RESPONSE = 10;
const DEFAULT_OBJ = { id: "default", title: "Select" };
const STATUS = [
  { id: "Complete", title: "Complete" },
  { id: "Yet to start", title: "Yet to start" },
  { id: "On going", title: "On going" },
];
function Index({ studentId, courseId }) {
  const [state, setState] = useState({
    currentPage: 0,
    statusOptions: [],
    status: [],
    topicId: null,
    topicValue: null,
    field: [],
    order: [],
  });
  const { currentPage, topicId } = state;

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
    if (topicId !== "default") {
      let paramObj = {
        page: currentPage,
        size: NO_OF_RESPONSE,
      };
      dispatch(postTopicTestList(studentId, courseId, paramObj));
    }
  }, [studentId, courseId, currentPage, topicId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "topicName") {
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
    console.log(id);
  };
  const handlePageChange = (event, value) => {
    window.scroll(0, 0);
    setState({ ...state, currentPage: value - 1 });
  };
  const dispatch = useDispatch();

  const { topics, topicList } = useSelector((state) => state.LmsStudentReducer);

  const tableData = topicList.data;

  console.log(topics?.data);
  return (
    <Box padding={"0 20px !important"}>
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
    </Box>
  );
}
export default Index;
