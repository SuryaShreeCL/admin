import { Table, TableBody, TableRow } from "@material-ui/core";
import React from "react";
import {
  BodyCell,
  BoldCell,
  Head,
  HeadCell,
  HeadInline,
  TableBox,
} from "../../../../Assets/StyledTableComponents";
import { ReactComponent as Complete } from "../../../../Assets/icons/complete.svg";
import { ReactComponent as YetToStart } from "../../../../Assets/icons/NotStarted.svg";
import { ReactComponent as OnGoing } from "../../../../Assets/icons/Progress.svg";
import { FlexView } from "../../../../Assets/StyledComponents";
import { makeStyles } from "@material-ui/core";

const ICONS = {
  Completed: <Complete />,
  "Yet to Start": <YetToStart />,
  "On Going": <OnGoing />,
};

const useStyles = makeStyles((theme) => ({
  complete: {
    cursor: "pointer",
  },
  incomplete: {
    cursor: "default",
  },
}));

function TableComponent({ handleTableRowClick, tableData, pageNo }) {
  const classes = useStyles();
  const headText = [
    { title: "#", style: { textAlign: "center" } },
    { title: "Topic name", style: {} },
    { title: "Start Date", style: { textAlign: "center" } },
    { title: "End Date", style: { textAlign: "center" } },
    { title: "Test", style: {} },
    { title: "Que Attempted", style: { textAlign: "center" } },
    { title: "Duration", style: { textAlign: "center" } },
    { title: "Score", style: { textAlign: "center" } },
    { title: "Status", style: {} },
  ];
  return (
    <TableBox>
      <Table>
        <Head>
          <TableRow>
            {headText.map(({ title, style }, index) => {
              return (
                <HeadCell style={style}>
                  <HeadInline>{title}</HeadInline>
                </HeadCell>
              );
            })}
          </TableRow>
        </Head>
        <TableBody>
          {tableData &&
            tableData.length !== 0 &&
            tableData.map((item, index) => {
              return (
                <TableRow
                  onClick={handleTableRowClick}
                  id={item.testExecutionId}
                  className={
                    item.status === "Completed"
                      ? classes.complete
                      : classes.incomplete
                  }
                >
                  <BoldCell style={{ textAlign: "center" }}>
                    {pageNo * 10 + index + 1}
                  </BoldCell>
                  <BoldCell>{item.topicName}</BoldCell>
                  <BoldCell style={{ textAlign: "center" }}>
                    {item.startDate || "-"}
                  </BoldCell>
                  <BodyCell style={{ textAlign: "center" }}>
                    {item.status === "Completed" ? `${item.endDate}` : "-"}
                  </BodyCell>
                  <BodyCell>{item.testName}</BodyCell>
                  <BodyCell style={{ textAlign: "center" }}>
                    {item.status === "Completed"
                      ? `${item.attemptQuestions}/${item.noOfQuestions}`
                      : "-"}
                  </BodyCell>
                  <BodyCell style={{ textAlign: "center" }}>
                    {item.status === "Completed" ? `${item.duration}` : "-"}
                  </BodyCell>
                  <BodyCell style={{ textAlign: "center" }}>
                    {item.status === "Completed"
                      ? `${item.score}/${item.TotalScore}`
                      : "-"}
                  </BodyCell>
                  <BodyCell style={{ whiteSpace: "nowrap" }}>
                    <FlexView justifyContent={"start"} gap={"13px"}>
                      {ICONS[item.status]}
                      {item.status}
                    </FlexView>
                  </BodyCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableBox>
  );
}
export default TableComponent;
