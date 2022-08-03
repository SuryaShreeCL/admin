import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Status1 from "../../../../../Assets/images/status1.png";
import Status2 from "../../../../../Assets/images/status2.png";
import Status3 from "../../../../../Assets/images/status3.png";
import PaginationComponent from "../../../../../Utils/PaginationComponent";
import {
  StatusToolTip,
  TableBodyStyle,
  TableHeader,
  TableHeaderCell,
  TableItem,
} from "../../../../../Assets/css/StyledCourseTakenComponent/StyledCourseTaken";

const SIZE = 10;
function TableComp({ tableData }) {
  const [state, setState] = useState({
    count: 0,
    content: [],
  });

  const { count, content } = state;

  const getDataModel = (page) => {
    const totalCount = tableData.length;
    const startIndex = page * SIZE;
    const selectedItems = tableData.slice(startIndex, startIndex + SIZE);
    return {
      ...state,
      content: selectedItems,
      count: Math.ceil(totalCount / SIZE),
    };
  };

  useEffect(() => {
    if (tableData && tableData.length !== 0) {
      setState(getDataModel(0));
    }
  }, [tableData]);

  const handlePageChange = (e, page) => {
    setState(getDataModel(page - 1));
  };

  const convertTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (minutes !== 0 && seconds !== 0) return minutes + "m " + seconds + "s";
    if (minutes === 0) return seconds + "s";
    if (seconds === 0) return minutes + "m";
  };
  const headText = [
    "#",
    "Topic",
    "Concept",
    "Difficulty",
    "Time Taken",
    "Cumulative Time",
    "Attempt Status",
  ];
  return (
    <>
      <TableContainer style={{ maxHeight: 710, minHeight: 710 }}>
        <Table stickyHeader>
          <TableHeader>
            <TableHeaderCell>{"#"}</TableHeaderCell>
            <TableHeaderCell style={{ textAlign: "left" }}>
              {"Topic"}
            </TableHeaderCell>
            <TableHeaderCell style={{ textAlign: "left" }}>
              {"Concept"}
            </TableHeaderCell>
            <TableHeaderCell style={{ textAlign: "left" }}>
              {"Difficulty"}
            </TableHeaderCell>
            <TableHeaderCell>{"Time Taken"}</TableHeaderCell>
            <TableHeaderCell>{"Cumulative Time"}</TableHeaderCell>
            <TableHeaderCell>{"Attempt Status"}</TableHeaderCell>
          </TableHeader>
          <TableBodyStyle>
            {content &&
              content.map((item) => {
                return (
                  <TableRow>
                    <TableItem>{item.quesNo}</TableItem>
                    <TableItem style={{ textAlign: "left" }}>
                      {item.topic}
                    </TableItem>
                    <TableItem style={{ textAlign: "left" }}>
                      {item.concept}
                    </TableItem>
                    <TableItem style={{ textAlign: "left" }}>
                      {item.difficulty}
                    </TableItem>
                    <TableItem>{convertTime(item.timeTaken)}</TableItem>
                    <TableItem>{convertTime(item.cumulativeTime)}</TableItem>
                    <TableItem>
                      {
                        <StatusToolTip
                          arrow
                          placement="bottom-end"
                          title={item.attemptStatus}
                        >
                          <img
                            src={
                              item.attemptStatus === "Not Attempted"
                                ? Status1
                                : item.attemptStatus === "Correct"
                                ? Status2
                                : item.attemptStatus === "Incorrect"
                                ? Status3
                                : null
                            }
                            alt={item.attemptStatus}
                          />
                        </StatusToolTip>
                      }
                    </TableItem>
                  </TableRow>
                );
              })}
          </TableBodyStyle>
        </Table>
      </TableContainer>
      <Box padding={"5px 0px 30px !important"} marginLeft={"49%"}>
        <PaginationComponent
          pageCount={count}
          onPageChange={handlePageChange}
        />
      </Box>
    </>
  );
}
export default TableComp;
