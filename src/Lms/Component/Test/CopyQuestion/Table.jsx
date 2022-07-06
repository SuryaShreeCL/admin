import { Table, TableBody, TableRow } from "@material-ui/core";
import React from "react";

import {
  BoldCell,
  Head,
  HeadCell,
  HeadInline,
  TableBox,
} from "../../../Assets/StyledTableComponents";

function TableComp() {
  const headText = [
    "Name",
    "Test Type",
    "#  Que Assignes",
    "# Que filled",
    "",
    "",
    "Status",
  ];
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
          <TableRow>
            <BoldCell>dfcgvhbjnk</BoldCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableBox>
  );
}
export default TableComp;
