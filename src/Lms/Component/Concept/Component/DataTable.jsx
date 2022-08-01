import {
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import { MoreVertRounded } from "@material-ui/icons";
import React from "react";
import Blue from "../../../../Asset/icons/Down.svg";
import Blur from "../../../../Asset/icons/Up.png";
import {
  BlueCell,
  BodyCell,
  Head,
  HeadCell,
  HeadInline,
  IconBox,
} from "../../../Assets/StyledTableComponents";
import Menu from "./Menu";

const MONTH = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const columns = [
  "No.",
  "Concept Name",
  "Uploaded by",
  "Status",
  "Created Date",
  "",
];

const getDateFormat = (dateString) => {
  let date = new Date(dateString);
  let day = date.getDate();
  let month = MONTH[date.getMonth()];
  let year = date.getFullYear();
  return day + " " + month + " " + year;
};

const handleShowThreeDot = (status) => {
  let deptName = window.sessionStorage.getItem("department");
  return !(
    deptName === "lms_editor" &&
    (status === "Live" || status === "In Review" || status === "Approved")
  );
};

const CENTER_ALIGN_INDEXES = [0];

export default function DataTable({
  data,
  anchorEl,
  handleThreeDotClick,
  handleClose,
  pageNo,
  handleOptions,
  order,
  handleSort,
  status,
  size,
}) {
  const role = sessionStorage.getItem("department");

  //Sort Icons
  const renderIcons = (index) => {
    if (index === 3) {
      return (
        <IconBox>
          <img
            src={order.match("ASC") ? Blue : Blur}
            alt={"Up arrow"}
            className={`up_arrow${order.match("ASC") ? " rotate" : ""}`}
            onClick={() => handleSort(order.match("ASC") ? "" : "ASC")}
          />
          <img
            src={order.match("DESC") ? Blue : Blur}
            alt={"Down arrow"}
            className={`down_arrow${order.match("DESC") ? "" : " rotate"}`}
            onClick={() => handleSort(order.match("DESC") ? "" : "DESC")}
          />
        </IconBox>
      );
    } else return null;
  };

  return (
    <React.Fragment>
      <TableContainer style={{ maxHeight: 870, minHeight: 870 }}>
        <Table stickyHeader>
          <Head>
            <TableRow>
              {columns.map((item, index) => (
                <HeadCell
                  className={
                    CENTER_ALIGN_INDEXES.includes(index)
                      ? "table_center_align"
                      : ""
                  }
                  key={index}
                >
                  <HeadInline>
                    {item}
                    {renderIcons(index)}
                  </HeadInline>
                </HeadCell>
              ))}
            </TableRow>
          </Head>
          <TableBody>
            {data &&
              data.length !== 0 &&
              data.map((item, index) => {
                return (
                  <TableRow key={index} style={{ border: "0 0 0 0" }}>
                    <BodyCell className={"table_center_align"}>
                      {pageNo * size + index + 1}
                    </BodyCell>
                    <BlueCell>{item.name}</BlueCell>
                    <BodyCell>{item.updatedBy}</BodyCell>
                    <BodyCell>{item.wkStatus}</BodyCell>
                    <BodyCell>
                      {item.createdAt ? getDateFormat(item.createdAt) : ""}
                    </BodyCell>
                    <BlueCell>
                      {handleShowThreeDot(item.wkStatus) && (
                        <div>
                          <IconButton
                            id={item.id}
                            onClick={(event) =>
                              handleThreeDotClick(event, {
                                ...item,
                                status: item.wkStatus,
                              })
                            }
                          >
                            <MoreVertRounded style={{ fill: "#1093FF" }} />
                          </IconButton>
                        </div>
                      )}
                    </BlueCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        role={role}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        handleClose={handleClose}
        handleOptions={handleOptions}
        status={status}
      />
    </React.Fragment>
  );
}
