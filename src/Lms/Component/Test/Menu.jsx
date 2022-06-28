import { ListItemIcon, MenuItem, Typography } from "@material-ui/core";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import ArchiveIcon from "@material-ui/icons/Archive";
import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from "@material-ui/icons/Share";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import React from "react";
import PublishIcon from "../../Assets/icons/Publish.svg";
import { MuiMenu } from "../../Assets/StyledTableComponents";

export default function Menu(props) {
  const ROLES = { editor: "LMSEDITOR", checker: "LMSCHECKER" };

  const makerChoices = [
    { text: "Send Review", icon: <ShareIcon style={{ fill: "#1093ff" }} /> },
    { text: "Edit", icon: <EditIcon style={{ fill: "#1093FF" }} /> },
    { text: "Archive", icon: <ArchiveIcon style={{ fill: "#1093ff" }} /> },
    { text: "Unarchive", icon: <UnarchiveIcon style={{ fill: "#1093ff" }} /> },
  ];
  const aeChecker = [
    { text: "Edit", icon: <EditIcon style={{ fill: "#1093FF" }} /> },
    { text: "Archive", icon: <ArchiveIcon style={{ fill: "#1093ff" }} /> },
    { text: "Publish Now", icon: <img src={PublishIcon} alt="Publish" /> },
    { text: "Approve", icon: <ThumbUpIcon style={{ fill: "#1093ff" }} /> },
    {
      text: "Reschedule",
      icon: <AccessTimeOutlinedIcon style={{ fill: "#1093ff" }} />,
    },
    {
      text: "Schedule",
      icon: <AccessTimeOutlinedIcon style={{ fill: "#1093ff" }} />,
    },
    { text: "Unarchive", icon: <UnarchiveIcon style={{ fill: "#1093ff" }} /> },
  ];
  const checkerChoices = [
    { text: "Edit", icon: <EditIcon style={{ fill: "#1093FF" }} /> },
    { text: "Archive", icon: <ArchiveIcon style={{ fill: "#1093ff" }} /> },
    { text: "Approve", icon: <ThumbUpIcon style={{ fill: "#1093ff" }} /> },
    { text: "Publish Now", icon: <img src={PublishIcon} alt="Publish" /> },
    {
      text: "Reschedule",
      icon: <AccessTimeOutlinedIcon style={{ fill: "#1093ff" }} />,
    },
    { text: "Unarchive", icon: <UnarchiveIcon style={{ fill: "#1093ff" }} /> },
  ];

  const filterMaker = (array, status) => {
    if (status === "Draft") {
      array.length = 3;
      return array;
    }
    if (status === "Archived") {
      return array.splice(3, 1);
    } else return [];
  };

  const filterChecker = (array, status) => {
    if (status === "Draft") {
      array.length = 3;
      return array;
    }
    if (status === "Scheduled") {
      array.splice(2, 1);
      array.splice(3, 1);
      return array;
    }
    if (status === "Archived") {
      return array.splice(5, 1);
    }

    if (status === "Live") {
      return array.splice(0, 2);
      // if (props.courseMaterial) return array.splice(0, 2);
      // else return array.splice(1, 1);
    }
    if (status === "In Review") {
      array.splice(2, 1);
      array.splice(3, 2);
      return array;
    }
    if (status === "Approved") {
      array.splice(2, 1);
      array.splice(3, 2);
      return array;
    } else return [];
  };

  const filterSuperAdmin = (array, status) => {
    if (status === "Draft") {
      array.splice(3, 6);

      return array;
    }
    if (status === "Approved") {
      array.splice(2, 2);
      return array;
    }
    if (status === "Live") {
      array.splice(2, 6);
      array.splice(0, 1);
      return array;
    }
    if (status === "Archived") {
      const arr = [];
      arr.push(array[0]);
      arr.push(array[5]);
      arr.push(array[2]);
      return arr;
    }
    if (status === "Scheduled") {
      const arr = [];
      arr.push(array[0]);
      arr.push(array[1]);
      arr.push(array[4]);
      return arr;
    } else return [];
    
  };

  const {
    role,
    topicId,
    open,
    anchorEl,
    handleClose,
    status,
    handleOptions,
    name,
    activeStatus,
  } = props;
  if (role === ROLES.editor) {
    return (
      <MuiMenu
        id={topicId}
        open={open}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        {filterMaker(makerChoices, activeStatus).map((item) => (
          <MenuItem onClick={() => handleOptions(item.text, name, topicId)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Typography className={"menu-item-text"}>{item.text}</Typography>
          </MenuItem>
        ))}
      </MuiMenu>
    );
  }

  if (role === "SUPER ADMIN") {
    return (
      <MuiMenu
        id={topicId}
        open={open}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        {filterSuperAdmin(aeChecker, activeStatus).map((item) => (
          <MenuItem
            onClick={() => handleOptions(item.text, name, topicId)}
            className={"menu-item-text"}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Typography>{item.text}</Typography>
          </MenuItem>
        ))}
      </MuiMenu>
    );
  }

  if (role === ROLES.checker) {
    return (
      <MuiMenu
        id={topicId}
        open={open}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        {filterChecker(checkerChoices, activeStatus).map((item) => (
          <MenuItem
            onClick={() => handleOptions(item.text, name, topicId)}
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