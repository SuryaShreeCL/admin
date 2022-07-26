import UnarchiveIcon from "@material-ui/icons/Unarchive";
import ShareIcon from "@material-ui/icons/Share";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import PublishIcon from "../../../Assets/icons/Publish.svg";
import React from "react";

export const STATUS_POPUP_CONTENT = (planName) => ({
  Archive: {
    type: "archive",
    name: "Archive",
    icon: <UnarchiveIcon style={{ fontSize: "48px", fill: "#1093FF" }} />,
    title: "Are you sure you want to Archive?",
    body: planName,
    button1: "No",
    button2: "Yes",
  },
  Unarchive: {
    type: "unarchive",
    name: "Draft",
    icon: <UnarchiveIcon style={{ fontSize: "48px", fill: "#1093FF" }} />,
    title: "Are you sure you want to Unarchive?",
    body: planName,
    button1: "No",
    button2: "Yes",
  },
  "Send Review": {
    type: "review",
    name: "Review",
    icon: <ShareIcon style={{ fontSize: "48px", fill: "#1093FF" }} />,
    title: "Are you sure you want to Send Review?",
    body: planName,
    button1: "Cancel",
    button2: "Send",
  },
  Approve: {
    type: "approve",
    name: "Approved",
    icon: <ThumbUpIcon style={{ fontSize: "48px", fill: "#1093ff" }} />,
    title: "Are you sure you want to Approve?",
    body: planName,
    button1: "Cancel",
    button2: "Approve",
  },
  "Publish Now": {
    type: "publish",
    name: "Live",
    icon: <img src={PublishIcon} width='64px' height='64px' />,
    title: "Are you sure you want to Publish? ",
    body: planName,
    button1: "Cancel",
    button2: "Publish now",
  },
});
