import { ListItemIcon, MenuItem, Typography } from "@material-ui/core";
import { CloudUpload, Visibility } from "@material-ui/icons";
import ArchiveIcon from "@material-ui/icons/Archive";
import ShareIcon from "@material-ui/icons/Share";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import React from "react";
import PublishIcon from "../../../Assets/icons/Publish.svg";
import { MuiMenu } from "../../../Assets/StyledTableComponents";
import { ROLES } from "../../../Constants";

export default function Menu({
  role,
  open,
  anchorEl,
  handleClose,
  studyPlanDetails,
  handleOptions,
}) {
  const makerChoices = [
    { text: "View", icon: <Visibility style={{ fill: "#1093ff" }} /> },
    { text: "Upload", icon: <CloudUpload style={{ fill: "#1093FF" }} /> },
    { text: "Archive", icon: <ArchiveIcon style={{ fill: "#1093ff" }} /> },
  ];

  const checkerChoices = [
    { text: "View", icon: <Visibility style={{ fill: "#1093ff" }} /> },
    { text: "Upload", icon: <CloudUpload style={{ fill: "#1093FF" }} /> },
    { text: "Archive", icon: <ArchiveIcon style={{ fill: "#1093ff" }} /> },
    { text: "Approve", icon: <ThumbUpIcon style={{ fill: "#1093ff" }} /> },
    { text: "Publish Now", icon: <img src={PublishIcon} alt='Publish' /> },
  ];

  const filterMaker = (array) => {
    const { status, isUploaded } = studyPlanDetails;
    if (status === "Draft") {
      if (isUploaded) array.splice(1, 1);
      else {
        array.splice(0, 1);
        array.splice(1, 1);
      }
      return array;
    } else if (status === "Live" && isUploaded) {
      array.length = 1;
      return array;
    } else if (status === "Approved" && isUploaded) {
      array.length = 1;
      return array;
    } else {
      array.length = 1;
      return array;
    }
  };

  const filterChecker = (array) => {
    const { status, isUploaded } = studyPlanDetails;
    if (status === "Draft") {
      if (isUploaded) array.splice(1, 1);
      else {
        array.splice(0, 1);
        array.splice(1, 3);
      }
      return array;
    } else if (status === "Live" && isUploaded) {
      array.length = 1;
      return array;
    } else if (status === "Approved" && isUploaded) {
      array.splice(1, 1);
      array.splice(2, 1);
      return array;
    } else {
      array.length = 1;
      return array;
    }
  };

  if (role === ROLES.lms_editor) {
    return (
      <MuiMenu
        open={open}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        {filterMaker(makerChoices).map((item) => (
          <MenuItem onClick={() => handleOptions(item.text)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Typography className={"menu-item-text"}>{item.text}</Typography>
          </MenuItem>
        ))}
      </MuiMenu>
    );
  }

  if (role === ROLES.lms_checker) {
    return (
      <MuiMenu
        open={open}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        {filterChecker(checkerChoices).map((item) => (
          <MenuItem
            onClick={() => handleOptions(item.text)}
            className={"menu-item-text"}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Typography>{item.text}</Typography>
          </MenuItem>
        ))}
      </MuiMenu>
    );
  } else return null;
}
