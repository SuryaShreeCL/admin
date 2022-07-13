import { IconButton, Table, TableBody, TableRow } from "@material-ui/core";
import { MoreVertRounded } from "@material-ui/icons";
import React from "react";
import {
  BoldCell,
  Head,
  HeadCell,
  HeadInline,
  TableBox,
} from "../../Assets/StyledTableComponents";
import Menu from "./Menu";
import { TableData } from "./TableData";

const handleShowThreeDot = (role, passage) => {
  let deptName = window.sessionStorage.getItem("department");
  return !(deptName === "lms_editor" && passage === "Passage");
};

function TableComponent({
  handleThreeDotClick,
  handleClose,
  handleOptions,
  anchorEl,
  passageId,
}) {
  const headText = ["Passage Name", "Date", "Action"];

  return (
    <TableBox>
      <Table>
        <Head>
          <TableRow>
            {headText.map((item, index) => (
              <HeadCell>
                <HeadInline style={{ alignContent: "center" }}>
                  {item}
                </HeadInline>
              </HeadCell>
            ))}
          </TableRow>
        </Head>
        <TableBody>
          {TableData.map((item, index) => {
            return (
              <TableRow style={{ border: "0 0 0 0" }}>
                <BoldCell>{item.passageName}</BoldCell>
                <BoldCell>{item.date}</BoldCell>
                <BoldCell>
                  {handleShowThreeDot() && (
                    <>
                      <IconButton
                        aria-controls={item.id}
                        aria-haspopup="true"
                        onClick={handleThreeDotClick}
                        id={item.id}
                        style={{ padding: "0px" }}
                      >
                        <MoreVertRounded style={{ fill: "#1093FF" }} />
                      </IconButton>
                    </>
                  )}
                </BoldCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Menu
        handleClose={handleClose}
        anchorEl={anchorEl}
        passageId={passageId}
        handleOptions={handleOptions}
      />
    </TableBox>
  );
}
export default TableComponent;
