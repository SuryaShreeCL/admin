import { Box, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
import { tableContent } from "./tableContent";
import TopicTestReport from "./TopicTestReport";
import PaginationComponent from "../../../../Utils/PaginationComponent";
import { getTopicName } from "../../../../Redux/Action/Student";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "../../../../Utils/DropDown";

const NO_OF_RESPONSE = 10;
const DEFAULT_OBJ = { id: "all", title: "Select" };
const STATUS = [
  { id: "Complete", title: "Complete" },
  { id: "Yet to start", title: "Yet to start" },
  { id: "On going", title: "On going" },
];
function Index({ studentId, courseId }) {
  const tableData = tableContent;
  const [state, setState] = useState({
    currentPage: 0,
    statusOptions: [],
    status: [],
  });
  const { currentPage, status } = state;

  useEffect(() => {
    if ((studentId, courseId)) dispatch(getTopicName(studentId, courseId));
  }, []);
  console.log(studentId, courseId);

  const handlePageChange = (event, value) => {
    window.scroll(0, 0);
    setState({ ...state, currentPage: value - 1 });
  };
  const dispatch = useDispatch();

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
            items={[DEFAULT_OBJ]}
          />
        </Grid>
        {tableData && <TableComponent tableData={tableData} />}
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
