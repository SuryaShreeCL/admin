import {
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableRow,
} from "@material-ui/core";
import { MoreVertRounded } from "@material-ui/icons";
import React from "react";
import Blue from "../../../Asset/icons/Down.svg";
import Blur from "../../../Asset/icons/Up.png";
import {
  BlueCell,
  BodyCell,
  Head,
  HeadCell,
  HeadInline,
  IconBox,
} from "../../Assets/StyledTableComponents";
import Menu from "../Test/Menu";

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
  "Concept Name",
  "Topic Name",
  "No. of Tasks",
  "Uploaded by",
  "Status",
  "Created Date",
  "",
];

const getDateFormat = dateString => {
  let date = new Date(dateString);
  let day = date.getDate();
  let month = MONTH[date.getMonth()];
  let year = date.getFullYear();
  return day + " " + month + " " + year;
};

const handleShowThreeDot = (role, status) => {
    let deptName = window.sessionStorage.getItem("department");
  return !(
    deptName === "lms_editor" &&
    (status === "Live" || status === "In Review" || status === "Approved")
  );
};

export default function DataTable(props) {
  const {
    topics,
    anchorEl,
    handleThreeDotClick,
    handleClose,
    pageNo,
    popUpId,
    role,
    handleOptions,
    field,
    order,
    handleSortNew,
    handleSortBlue,
    handleSortBlur,
    clickableStatus,
  } = props;

  // console.log(topics);

  //Sort Icons
  const renderIcons = (field, order, index) => {
    // field:["name","wkStatusValue","createdAt"]
    // order:["DESC","ASC","ASC"]
    const nameIndex = field.indexOf("name");
    const statusIndex = field.indexOf("wkStatusValue");
    const createdIndex = field.indexOf("createdAt");
    const fields = ["name", "wkStatusValue", "createdAt"];
    if (index === 2 && order[nameIndex] === "ASC") {
      return (
        <IconBox>
          <img
            src={Blue}
            alt="Up arrow"
            className={"up_arrow rotate"}
            id="name"
            onClick={() => {
              handleSortBlue(nameIndex);
            }}
          />
          <img
            src={Blur}
            alt="Down arrow"
            className={"down_arrow rotate"}
            id="name"
            onClick={() => {
              handleSortBlur(nameIndex);
            }}
          />
        </IconBox>
      );
    } else if (index === 2 && order[nameIndex] === "DESC") {
      return (
        <IconBox>
          <img
            src={Blur}
            alt="Up arrow"
            className={"up_arrow"}
            id="name"
            onClick={() => {
              handleSortBlur(nameIndex);
            }}
          />
          <img
            src={Blue}
            alt="Down arrow"
            className={"down_arrow"}
            id="name"
            onClick={() => handleSortBlue(nameIndex)}
          />
        </IconBox>
      );
    } else if (index === 5 && order[statusIndex] === "ASC") {
      return (
        <IconBox>
          <img
            src={Blue}
            alt="Up arrow"
            className={"up_arrow rotate"}
            id={"wkStatusValue"}
            onClick={() => handleSortBlue(statusIndex)}
          />
          <img
            src={Blur}
            alt="Down arrow"
            className={"down_arrow rotate"}
            id={"wkStatusValue"}
            onClick={() => handleSortBlur(statusIndex)}
          />
        </IconBox>
      );
    } else if (index === 5 && order[statusIndex] === "DESC") {
      return (
        <IconBox>
          <img
            src={Blur}
            alt="Up arrow"
            className={"up_arrow"}
            id={"wkStatusValue"}
            onClick={() => handleSortBlur(statusIndex)}
          />
          <img
            src={Blue}
            alt="Down arrow"
            className={"down_arrow"}
            id={"wkStatusValue"}
            onClick={() => handleSortBlue(statusIndex)}
          />
        </IconBox>
      );
    } else if (index === 6 && order[createdIndex] === "ASC") {
      return (
        <IconBox>
          <img
            src={Blue}
            alt="Up arrow"
            className={"up_arrow rotate"}
            id={"createdAt"}
            onClick={() => handleSortBlue(createdIndex)}
          />
          <img
            src={Blur}
            alt="Down arrow"
            className={"down_arrow rotate"}
            id={"createdAt"}
            onClick={() => handleSortBlur(createdIndex)}
          />
        </IconBox>
      );
    } else if (index === 6 && order[createdIndex] === "DESC") {
      return (
        <IconBox>
          <img
            src={Blur}
            alt="Up arrow"
            className={"up_arrow"}
            id={"wkStatusValue"}
            onClick={() => handleSortBlur(createdIndex)}
          />
          <img
            src={Blue}
            alt="Down arrow"
            className={"down_arrow"}
            id={"wkStatusValue"}
            onClick={() => handleSortBlue(createdIndex)}
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
            alt="Up arrow"
            className={"up_arrow"}
            onClick={() => {
              handleSortNew(index, "ASC");
            }}
          />
          <img
            src={Blur}
            alt="Down arrow"
            className={"down_arrow rotate"}
            onClick={() => {
              handleSortNew(index, "DESC");
            }}
          />
        </IconBox>
      );
  };

  return (
    <React.Fragment>
      <Table>
        <Head>
          <TableRow>
            {columns.map((item, index) => (
              <HeadCell
                className={
                  index === 3 || index === 0 ? "table_center_align" : null
                }
                key={index}
              >
                <HeadInline>
                  {item}
                  {(index === 2 || index === 5 || index === 6) &&
                    renderIcons(field, order, index)}
                </HeadInline>
              </HeadCell>
            ))}
          </TableRow>
        </Head>
        <TableBody>
          {topics &&
            topics !== null &&
            topics.length !== 0 &&
            topics.map((item, index) => {
              return (
                <TableRow key={index} style={{ border: "0 0 0 0" }}>
                  <BodyCell className={"table_center_align"}>
                    {pageNo * 10 + index + 1}
                  </BodyCell>
                  <BodyCell>{item.conceptName}</BodyCell>
                  <BlueCell>{item.topicName}</BlueCell>
                  <BodyCell className={"table_center_align"}>
                    {item.noOfTasks}
                  </BodyCell>
                  <BodyCell>{item.uploadedBy}</BodyCell>
                  <BodyCell>{item.status}</BodyCell>
                  <BodyCell>{getDateFormat(item.createdAt)}</BodyCell>
                  <BlueCell>
                    {handleShowThreeDot(role, item.status) && (
                      <div>
                        <IconButton
                          aria-controls={item.id}
                          aria-haspopup="true"
                          onClick={(event) =>
                            handleThreeDotClick(item.id, event, item.status)
                          }
                        >
                          <MoreVertRounded style={{ fill: "#1093FF" }} />
                        </IconButton>
                        <Menu
                          role={role}
                          anchorEl={anchorEl}
                          open={item.id === popUpId}
                          handleClose={handleClose}
                          status={item.status}
                          handleOptions={handleOptions}
                          name={item.topicName}
                          topicId={item.id}
                          courseMaterial={true}
                          activeStatus={clickableStatus}
                        />
                      </div>
                    )}
                  </BlueCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
