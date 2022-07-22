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
  complete: <Complete />,
  yettostart: <YetToStart />,
  ongoing: <OnGoing />,
};

function TableComponent({ handleTableRowClick, tableData }) {
  const headText = [
    "#",
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
            tableData.map((item) => {
              return (
                <TableRow
                  onClick={handleTableRowClick}
                  style={{ border: "0 0 0 0", cursor: "pointer" }}
                >
                  <BoldCell>{item.id}</BoldCell>
                  <BoldCell>{item.topicName}</BoldCell>
                  <BoldCell>{item.startDate}</BoldCell>
                  <BodyCell>{item.endDate}</BodyCell>
                  <BodyCell>{item.test}</BodyCell>
                  <BodyCell>{item.queAttempt}</BodyCell>
                  <BodyCell>{item.duration}</BodyCell>
                  <BodyCell>{item.score}</BodyCell>
                  <BodyCell>
                    <FlexView justifyContent={"start"} gap={"13px"}>
                      {ICONS[item.icon]}
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
