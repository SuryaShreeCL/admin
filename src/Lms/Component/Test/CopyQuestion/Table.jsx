import { Table, TableBody, TableRow } from "@material-ui/core";
import React from "react";
import {
  BoldCell,
  Head,
  HeadCell,
  HeadInline,
  IconBox,
  TableBox,
} from "../../../Assets/StyledTableComponents";

function TableComponent({ handleTableRowClick, tableData }) {
  const headText = [
    "Name",
    "Test Type",
    "#  Que Assignes",
    "# Que filled",
    "Status",
  ];

  const renderIcons = (field, order, index) => {
    const typeIndex = field.indexOf("type");
    const courseNameIndex = field.indexOf("courseName");
    const statusIndex = field.indexOf("wkStatusValue");
    const fields = ["type", "courseName", "wkStatusValue"];
    //   if (index === 1 && order[typeIndex] === "ASC") {
    //     return (
    //       <IconBox>
    //         <img
    //           src={Blue}
    //           alt="Up arrow"
    //           className={"up_arrow rotate"}
    //           id="type"
    //           // onClick={() => {
    //           //   handleSortBlue(typeIndex);
    //           // }}
    //         />
    //         <img
    //           src={Blur}
    //           alt="Down arrow"
    //           className={"down_arrow rotate"}
    //           id="type"
    //           // onClick={() => {
    //           //   handleSortBlur(typeIndex);
    //           // }}
    //         />
    //       </IconBox>
    //     );
    //   } else if (index === 1 && order[typeIndex] === "DESC") {
    //     return (
    //       <IconBox>
    //         <img
    //           src={Blur}
    //           alt="Up arrow"
    //           className={"up_arrow"}
    //           id="type"
    //           // onClick={() => {
    //           //   handleSortBlur(typeIndex);
    //           // }}
    //         />
    //         <img
    //           src={Blue}
    //           alt="Down arrow"
    //           className={"down_arrow"}
    //           id="type"
    //           // onClick={() => handleSortBlue(typeIndex)}
    //         />
    //       </IconBox>
    //     );
    //   } else if (index === 4 && order[courseNameIndex] === "ASC") {
    //     return (
    //       <IconBox>
    //         <img
    //           src={Blue}
    //           alt="Up arrow"
    //           className={"up_arrow rotate"}
    //           id={"courseName"}
    //           // onClick={() => handleSortBlue(courseNameIndex)}
    //         />
    //         <img
    //           src={Blur}
    //           alt="Down arrow"
    //           className={"down_arrow rotate"}
    //           id={"courseName"}
    //           // onClick={() => handleSortBlur(courseNameIndex)}
    //         />
    //       </IconBox>
    //     );
    //   } else if (index === 4 && order[courseNameIndex] === "DESC") {
    //     return (
    //       <IconBox>
    //         <img
    //           src={Blur}
    //           alt="Up arrow"
    //           className={"up_arrow"}
    //           id={"courseName"}
    //           // onClick={() => handleSortBlur(courseNameIndex)}
    //         />
    //         <img
    //           src={Blue}
    //           alt="Down arrow"
    //           className={"down_arrow"}
    //           id={"courseName"}
    //           // onClick={() => handleSortBlue(courseNameIndex)}
    //         />
    //       </IconBox>
    //     );
    //   } else if (index === 6 && order[statusIndex] === "ASC") {
    //     return (
    //       <IconBox>
    //         <img
    //           src={Blue}
    //           alt="Up arrow"
    //           className={"up_arrow rotate"}
    //           id={"wkStatusValue"}
    //           // onClick={() => handleSortBlue(statusIndex)}
    //         />
    //         <img
    //           src={Blur}
    //           alt="Down arrow"
    //           className={"down_arrow rotate"}
    //           id={"wkStatusValue"}
    //           // onClick={() => handleSortBlur(statusIndex)}
    //         />
    //       </IconBox>
    //     );
    //   } else if (index === 6 && order[statusIndex] === "DESC") {
    //     return (
    //       <IconBox>
    //         <img
    //           src={Blur}
    //           alt="Up arrow"
    //           className={"up_arrow"}
    //           id={"courseName"}
    //           // onClick={() => handleSortBlur(statusIndex)}
    //         />
    //         <img
    //           src={Blue}
    //           alt="Down arrow"
    //           className={"down_arrow"}
    //           id={"courseName"}
    //           // onClick={() => handleSortBlue(statusIndex)}
    //         />
    //       </IconBox>
    //     );
    //   }
    //   // Default
    //   else
    //     return (
    //       <IconBox>
    //         <img
    //           src={Blur}
    //           alt="Up arrow"
    //           className={"up_arrow"}
    //           onClick={() => {
    //             // handleSortNew(index, "ASC");
    //           }}
    //         />
    //         <img
    //           src={Blur}
    //           alt="Down arrow"
    //           className={"down_arrow rotate"}
    //           onClick={() => {
    //             // handleSortNew(index, "DESC");
    //           }}
    //         />
    //       </IconBox>
    //     );
  };

  return (
    <TableBox>
      <Table>
        <Head>
          <TableRow>
            {headText.map((item) => {
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
                <TableRow id={item.id} onClick={handleTableRowClick}>
                  <BoldCell>{item.name}</BoldCell>
                  <BoldCell>{item.testType}</BoldCell>
                  <BoldCell>{item.queAssigns}</BoldCell>
                  <BoldCell>{item.queFilled}</BoldCell>
                  <BoldCell>{item.status}</BoldCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableBox>
  );
}
export default TableComponent;
