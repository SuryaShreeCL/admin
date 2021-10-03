import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import LocalLibraryOutlinedIcon from "@material-ui/icons/LocalLibraryOutlined";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import React from "react";

const SECTION={
personalDetail:"Personal Details",
workExperience:"Work Experience",
graduateDetail:"Graduate Details",
testDetail:"Test Details",
contactDetail:"Contact Details",
educationDetail:"Educational Details",
accountDetail:"Account Status",
aspirationDetail:"Aspiration Details",
supportingDocument:"Supporting Documents",
// workExperience:"Work Experience",
addressDetail:"Address Details",
socialMedia:"Social Media",
}

export {SECTION};

export const HELPER_TEXT = {
  requiredField : "Please Fill The Required Field"
}

export const menu = [
  {
    icon: <HomeOutlinedIcon />,
    title: "Home",
    items: []
  },
  {
    icon: <LocalLibraryOutlinedIcon />,
    title: "Education",
    items: [
      {
        title: "Technical Analysis",
        items: [
          {
            title: "The Dow Theory",
            to: "/thedowtheory"
          },
          {
            title: "Charts & Chart Patterns",
            to: "/chart"
          },
          {
            title: "Trend & Trend Lines",
            to: "/trendlines"
          },
          {
            title: "Support & Resistance",
            to: "/sandr"
          }
        ]
      },
      {
        title: "Fundamental Analysis",
        items: [
          {
            title: "The Dow Theory",
            to: "/thedowtheory"
          },
          {
            title: "Charts & Chart Patterns",
            to: "/chart"
          },
          {
            title: "Trend & Trend Lines",
            to: "/trendlines"
          },
          {
            title: "Support & Resistance",
            to: "/sandr"
          }
        ]
      },
      {
        title: "Elliot Wave Analysis",
        items: [
          {
            title: "The Dow Theory",
            to: "/thedowtheory"
          },
          {
            title: "Charts & Chart Patterns",
            to: "/chart"
          },
          {
            title: "Trend & Trend Lines",
            to: "/trendlines"
          },
          {
            title: "Support & Resistance",
            to: "/sandr"
          }
        ]
      }
    ]
  },
  {
    icon: <TrendingUpOutlinedIcon />,
    title: "Options"
  },
  {
    icon: <DescriptionOutlinedIcon />,
    title: "Blog"
  }
];
