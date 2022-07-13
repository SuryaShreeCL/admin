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
import LatexViewer from "../../Utils/LatexViewer";
import Menu from "./Menu";

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
  passageData,
}) {
  const headText = ["Passage Name", "Description", "Action"];

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
          {passageData &&
            passageData.length !== 0 &&
            passageData.map((item) => {
              return (
                <TableRow style={{ border: "0 0 0 0" }}>
                  <BoldCell>{item.name}</BoldCell>
                  <BoldCell>
                    <div style={{ flexGrow: 1 }}>
                      <LatexViewer math={item.content} />
                    </div>
                  </BoldCell>
                  <BoldCell>
                    {handleShowThreeDot() && (
                      <>
                        <IconButton
                          aria-controls={item.id}
                          aria-haspopup='true'
                          onClick={(e) => handleThreeDotClick(e, item)}
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
