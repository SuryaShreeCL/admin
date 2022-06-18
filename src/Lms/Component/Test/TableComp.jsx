import { IconButton, Table, TableBody, TableRow } from "@material-ui/core";
import { MoreVertRounded } from "@material-ui/icons";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import React from "react";
import { useDispatch } from "react-redux";
import Blue from "../../../Asset/icons/Down.svg";
import Blur from "../../../Asset/icons/Up.png";
import {
  BodyCell,
  BoldCell,
  Head,
  HeadCell,
  HeadInline,
  IconBox,
  TableBox,
} from "../../Assets/StyledTableComponents";
import { downloadTest } from "../../Redux/Action/Test";
import Menu from "./Menu";
let deptName = window.sessionStorage.getItem("department");
console.log(deptName);

const headText = deptName === "assessment_engine_admin" && window.sessionStorage.getItem('role') === 'SUPER ADMIN' ? [
  "Name",
  "Test Type",
  "#  Que Assignes",
  "# Que filled",
  "",
  "",
   "Status",
   
   
  "Download",
  "Test URL",
  "",
]:[
  "Name",
  "Test Type",
  "#  Que Assignes",
  "# Que filled",
  "Course",
  "Topic name",
  "Status",
  
  "",
];

// const handleOpen = (itemId, popUpId, role, status) => {
//   //
//   //
//   if (role === 'LMSEDITOR' && (status === 'Live' || status === 'In Review'))
//     return false;
//   else return itemId === popUpId;
// };

const handleShowThreeDot = (role, status) => {
  return !(
    role === "LMSEDITOR" &&
    (status === "Live" ||
      status === "In Review" ||
      status === "Approved" ||
      status === "Sheduled")
  );
};

export default function TableComp(props) {
  const dispatch = useDispatch();
  const handleDownload = (testQuestionSetId, downloadpath) => {
    // setScheduler(true);
    // setData(item);
    //

    dispatch(downloadTest(testQuestionSetId, downloadpath));
  };
  const {
    tableContent,
    field,
    order,
    handleSortNew,
    handleSortBlue,
    handleSortBlur,
    role,
    handleThreeDotClick,
    anchorEl,
    popUpId,
    handleClose,
    handleOptions,
    openStatus,
    clickedStatus,
  } = props;
  const aedept = window.sessionStorage.getItem("department");

  //Sort Icons
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
            alt="Up arrow"
            className={"up_arrow rotate"}
            id="type"
            onClick={() => {
              handleSortBlue(typeIndex);
            }}
          />
          <img
            src={Blur}
            alt="Down arrow"
            className={"down_arrow rotate"}
            id="type"
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
            alt="Up arrow"
            className={"up_arrow"}
            id="type"
            onClick={() => {
              handleSortBlur(typeIndex);
            }}
          />
          <img
            src={Blue}
            alt="Down arrow"
            className={"down_arrow"}
            id="type"
            onClick={() => handleSortBlue(typeIndex)}
          />
        </IconBox>
      );
    } else if (index === 4 && order[courseNameIndex] === "ASC") {
      return (
        <IconBox>
          <img
            src={Blue}
            alt="Up arrow"
            className={"up_arrow rotate"}
            id={"courseName"}
            onClick={() => handleSortBlue(courseNameIndex)}
          />
          <img
            src={Blur}
            alt="Down arrow"
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
            alt="Up arrow"
            className={"up_arrow"}
            id={"courseName"}
            onClick={() => handleSortBlur(courseNameIndex)}
          />
          <img
            src={Blue}
            alt="Down arrow"
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
    } else if (index === 6 && order[statusIndex] === "DESC") {
      return (
        <IconBox>
          <img
            src={Blur}
            alt="Up arrow"
            className={"up_arrow"}
            id={"courseName"}
            onClick={() => handleSortBlur(statusIndex)}
          />
          <img
            src={Blue}
            alt="Down arrow"
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
    <TableBox>
      <Table>
        <Head>
          <TableRow>
            {headText.map((item, index) => (
              <HeadCell>
                <HeadInline>
                  {item}
                  {(index === 1 || index === 4 || index === 6) &&
                    renderIcons(field, order, index)}
                </HeadInline>
              </HeadCell>
            ))}
          </TableRow>
        </Head>
        <TableBody>
          {tableContent &&
            tableContent.map((item) => {
              return (
                <TableRow key={item.id} style={{ border: "0 0 0 0" }}>
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
                  {item.testType === "AE_TEST" && aedept ==="assessment_engine_admin" ? (
                    <>
                      <BodyCell>
                        {/* {item.uniqueUrl} */}

                        {/* <Controls.ActionButton
                      disabled={!item.attemptedStudents}
                      href={`${process.env.REACT_APP_API_URL}`}
                    > */}
                        <CloudDownloadIcon
                          fontSize="small"
                          onClick={() => handleDownload(item.id)}
                        />
                        {/* </Controls.ActionButton> */}
                        {/* <Controls.ActionButton onClick={() => onSchedule(item)}> */}
                        {/* <ScheduleIcon fontSize='small' color='primary' /> */}
                        {/* </Controls.ActionButton> */}
                      </BodyCell>
                      <BodyCell>
                        <a href={`${item.uniqueUrl}`} target={"_blank"}>
                          {item.uniqueUrl}
                        </a>
                      </BodyCell>{" "}
                    </>
                  ) : (
                    <>
                      <BodyCell></BodyCell>
                      <BodyCell></BodyCell>
                    </>
                  )}
                  <BodyCell>
                    {handleShowThreeDot(role, item.status) &&
                      item.status !== "Approved" && (
                        <div>
                          <IconButton
                            aria-controls={item.id}
                            aria-haspopup="true"
                            onClick={(event) =>
                              handleThreeDotClick(event, item.id, item.status)
                            }
                            style={{ padding: "0px" }}
                          >
                            <MoreVertRounded style={{ fill: "#1093FF" }} />
                          </IconButton>
                          <Menu
                            role={role}
                            anchorEl={anchorEl}
                            open={openStatus}
                            // open={handleOpen(item.id, popUpId, role, item.status)}
                            handleClose={handleClose}
                            status={item.status}
                            handleOptions={handleOptions}
                            name={item.name}
                            topicId={item.id}
                            activeStatus={clickedStatus}
                          />
                        </div>
                      )}
                  </BodyCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableBox>
  );
}
