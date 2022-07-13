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
} from "../../../Assets/StyledTableComponents";
import Blur from "../../../../Asset/icons/Up.png";
import Blue from "../../../../Asset/icons/Down.svg";

function TableComponent({
  handleTableRowClick,
  tableData,
  handleSortNew,
  handleSortBlue,
  handleSortBlur,
  field,
  order,
}) {
  const headText = [
    "Name",
    "Test Type",
    "#  Que Assignes",
    "# Que filled",
    "Course",
    "Topic name",
    "Status",
  ];

  const renderIcons = (field, order, index) => {
    const typeIndex = field.indexOf("type");
    const courseNameIndex = field.indexOf("courseName");
    const statusIndex = field.indexOf("wkStatusValue");
    const fields = ["type", "courseName", "wkStatusValue"];
    if (index === 1 && order[typeIndex] === "ASC") {
      return (
        <IconBox>
          <img
            src={Blue}
            alt='Up arrow'
            className={"up_arrow rotate"}
            id='type'
            onClick={() => {
              handleSortBlue(typeIndex);
            }}
          />
          <img
            src={Blur}
            alt='Down arrow'
            className={"down_arrow rotate"}
            id='type'
            onClick={() => {
              handleSortBlur(typeIndex);
            }}
          />
        </IconBox>
      );
    } else if (index === 1 && order[typeIndex] === "DESC") {
      return (
        <IconBox>
          <img
            src={Blur}
            alt='Up arrow'
            className={"up_arrow"}
            id='type'
            onClick={() => {
              handleSortBlur(typeIndex);
            }}
          />
          <img
            src={Blue}
            alt='Down arrow'
            className={"down_arrow"}
            id='type'
            onClick={() => handleSortBlue(typeIndex)}
          />
        </IconBox>
      );
    } else if (index === 4 && order[courseNameIndex] === "ASC") {
      return (
        <IconBox>
          <img
            src={Blue}
            alt='Up arrow'
            className={"up_arrow rotate"}
            id={"courseName"}
            onClick={() => handleSortBlue(courseNameIndex)}
          />
          <img
            src={Blur}
            alt='Down arrow'
            className={"down_arrow rotate"}
            id={"courseName"}
            onClick={() => handleSortBlur(courseNameIndex)}
          />
        </IconBox>
      );
    } else if (index === 4 && order[courseNameIndex] === "DESC") {
      return (
        <IconBox>
          <img
            src={Blur}
            alt='Up arrow'
            className={"up_arrow"}
            id={"courseName"}
            onClick={() => handleSortBlur(courseNameIndex)}
          />
          <img
            src={Blue}
            alt='Down arrow'
            className={"down_arrow"}
            id={"courseName"}
            onClick={() => handleSortBlue(courseNameIndex)}
          />
        </IconBox>
      );
    } else if (index === 6 && order[statusIndex] === "ASC") {
      return (
        <IconBox>
          <img
            src={Blue}
            alt='Up arrow'
            className={"up_arrow rotate"}
            id={"wkStatusValue"}
            onClick={() => handleSortBlue(statusIndex)}
          />
          <img
            src={Blur}
            alt='Down arrow'
            className={"down_arrow rotate"}
            id={"wkStatusValue"}
            onClick={() => handleSortBlur(statusIndex)}
          />
        </IconBox>
      );
    } else if (index === 6 && order[statusIndex] === "DESC") {
      return (
        <IconBox>
          <img
            src={Blur}
            alt='Up arrow'
            className={"up_arrow"}
            id={"courseName"}
            onClick={() => handleSortBlur(statusIndex)}
          />
          <img
            src={Blue}
            alt='Down arrow'
            className={"down_arrow"}
            id={"courseName"}
            onClick={() => handleSortBlue(statusIndex)}
          />
        </IconBox>
      );
    }
    // Default
    else
      return (
        <IconBox>
          <img
            src={Blur}
            alt='Up arrow'
            className={"up_arrow"}
            onClick={() => {
              handleSortNew(index, "ASC");
            }}
          />
          <img
            src={Blur}
            alt='Down arrow'
            className={"down_arrow rotate"}
            onClick={() => {
              handleSortNew(index, "DESC");
            }}
          />
        </IconBox>
      );
  };

  return (
    <TableBox>
      <Table>
        <Head>
          <TableRow>
            {headText.map((item, index) => {
              return (
                <HeadCell>
                  <HeadInline>
                    {item}
                    {(index === 1 || index === 4 || index === 6) &&
                      renderIcons(field, order, index)}
                  </HeadInline>
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
                  id={item.id}
                  onClick={handleTableRowClick}
                  style={{ border: "0 0 0 0", cursor: "pointer" }}
                >
                  <BoldCell>{item.name}</BoldCell>
                  <BoldCell>{item.testType}</BoldCell>
                  <BoldCell className={"table_center_align"}>
                    {item.queAssigns}
                  </BoldCell>
                  <BodyCell className={"table_center_align"}>
                    {item.queFilled}
                  </BodyCell>
                  <BodyCell>{item.courseName}</BodyCell>
                  <BodyCell>{item.topicName}</BodyCell>
                  <BodyCell>{item.status}</BodyCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableBox>
  );
}
export default TableComponent;
