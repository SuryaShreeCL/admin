import { ListItemIcon, MenuItem, Typography } from "@material-ui/core";
import { CloudUpload, Visibility } from "@material-ui/icons";
import ArchiveIcon from "@material-ui/icons/Archive";
import ShareIcon from "@material-ui/icons/Share";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import React from "react";
import PublishIcon from "../../../Assets/icons/Publish.svg";
import { MuiMenu } from "../../../Assets/StyledTableComponents";
import EditIcon from "@material-ui/icons/Edit";
import { ROLES } from "../../../Constants";

export default function Menu({
  role,
  open,
  anchorEl,
  handleClose,
  status,
  handleOptions,
}) {
  const makerChoices = [
    { text: "Send Review", icon: <ShareIcon style={{ fill: "#1093ff" }} /> },
    { text: "Edit", icon: <EditIcon style={{ fill: "#1093FF" }} /> },
    { text: "Archive", icon: <ArchiveIcon style={{ fill: "#1093ff" }} /> },
    { text: "Unarchive", icon: <UnarchiveIcon style={{ fill: "#1093ff" }} /> },
  ];

  const checkerChoices = [
    { text: "Edit", icon: <EditIcon style={{ fill: "#1093FF" }} /> },
    { text: "Archive", icon: <ArchiveIcon style={{ fill: "#1093ff" }} /> },
    { text: "Approve", icon: <ThumbUpIcon style={{ fill: "#1093ff" }} /> },
    { text: "Publish Now", icon: <img src={PublishIcon} alt='Publish' /> },
    { text: "Unarchive", icon: <UnarchiveIcon style={{ fill: "#1093ff" }} /> },
  ];

  const filterMaker = (array) => {
    if (status === "Draft") {
      array.length = 3;
      return array;
    }
    if (status === "Archived") {
      return array.splice(3, 1);
    } else return [];
  };

  const filterChecker = (array) => {
    if (status === "Draft") {
      array.length = 3;
      return array;
    }
    if (status === "Archived") {
      return array.splice(4, 1);
    }

    if (status === "Live") {
      return array.splice(0, 2);
    }
    if (status === "In Review") {
      array.splice(2, 1);
      array.splice(3, 1);
      return array;
    }
    if (status === "Approved") {
      array.splice(2, 1);
      array.splice(3, 1);
      return array;
    } else return [];
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
