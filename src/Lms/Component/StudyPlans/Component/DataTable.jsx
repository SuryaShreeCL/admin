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

const role = sessionStorage.getItem("role");

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
  "Plan Name",
  "Plan Duration",
  "Plan Uploaded",
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

const handleShowThreeDot = (status, isUploaded) => {
  let deptName = window.sessionStorage.getItem("department");
  return true;
};

const CENTER_ALIGN_INDEXES = [0, 3, 4];

export default function DataTable({
  data,
  anchorEl,
  handleThreeDotClick,
  handleClose,
  pageNo,
  handleOptions,
  order,
  handleSort,
  studyPlanDetails,
}) {
  //Sort Icons
  const renderIcons = (index) => {
    if (index === 5) {
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
                      {pageNo * 10 + index + 1}
                    </BodyCell>
                    <BodyCell>{item.name}</BodyCell>
                    <BlueCell>
                      {item.duration ? `${item.duration} month` : "-"}
                    </BlueCell>
                    <BodyCell className={"table_center_align"}>
                      {item.isUploaded ? "Yes" : "No"}
                    </BodyCell>
                    <BodyCell className={"table_center_align"}>
                      {item.uploadedBy || "-"}
                    </BodyCell>
                    <BodyCell>{item.wkStatus.value}</BodyCell>
                    <BodyCell>
                      {item.createdAt ? getDateFormat(item.createdAt) : "NA"}
                    </BodyCell>
                    <BlueCell>
                      {handleShowThreeDot(
                        item.wkStatus.value,
                        item.isUploaded
                      ) && (
                        <div>
                          <IconButton
                            id={item.wkStatus.id}
                            onClick={(event) =>
                              handleThreeDotClick(event, {
                                ...item,
                                status: item.wkStatus.value,
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
        studyPlanDetails={studyPlanDetails}
      />
    </React.Fragment>
  );
}
