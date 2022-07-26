import { Table, TableBody, TableRow } from "@material-ui/core";
import React from "react";
import {
  BodyCell,
  BoldCell,
  Head,
  HeadCell,
  HeadInline,
  IconBox,
  TableBox,
} from "../../../../Assets/StyledTableComponents";
import { ReactComponent as Complete } from "../../../../Assets/icons/complete.svg";
import { ReactComponent as YetToStart } from "../../../../Assets/icons/NotStarted.svg";
import { ReactComponent as OnGoing } from "../../../../Assets/icons/Progress.svg";
import { FlexView, LevelContent } from "../../../../Assets/StyledComponents";

const ICONS = {
  Completed: <Complete />,
  "Yet to Started": <YetToStart />,
  ongoing: <OnGoing />,
};

function TableComponent({ handleTableRowClick, tableData }) {
  const headText = [
    "Topic name",
    "Start Date",
    "End Date",
    "Test",
    "Que Attempted",
    "Duration",
    "Score",
    "Status",
  ];
  return (
    <TableBox>
      <Table>
        <Head>
          <TableRow>
            {headText.map((item, index) => {
              return (
                <HeadCell>
                  <HeadInline>{item}</HeadInline>
                </HeadCell>
              );
            })}
          </TableRow>
        </Head>
        <TableBody>
          {tableData &&
            tableData.length !== 0 &&
            tableData.map((item) => {
              return (
                <TableRow
                  onClick={handleTableRowClick}
                  id={item.id}
                  style={{ border: "0 0 0 0", cursor: "pointer" }}
                >
                  <BoldCell>{item.topicName}</BoldCell>
                  <BoldCell>
                    {item.status === "Completed" ? `${item.startDate}` : "-"}
                  </BoldCell>
                  <BodyCell>
                    {item.status === "Completed" ? `${item.endDate}` : "-"}
                  </BodyCell>
                  <BodyCell>{item.testName}</BodyCell>
                  <BodyCell>
                    {item.status === "Completed"
                      ? `${item.attemptQuestions}/${item.noOfQuestions}`
                      : "-"}
                  </BodyCell>
                  <BodyCell>
                    {item.status === "Completed" ? `${item.duration}` : "-"}
                  </BodyCell>
                  <BodyCell>
                    {item.status === "Completed"
                      ? `${item.score}/${item.TotalScore}`
                      : "-"}
                  </BodyCell>
                  <BodyCell>
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
