import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import styled from "styled-components";
import { COLORS } from "../../Utils/Shared";
import React, { useState } from "react";
export const useStyles = makeStyles((theme) => ({
  contentWrapperStyle: {
    // border:"1px solid #E7E7E7",
    // borderRadius:"3px",
  },
  gridMargin: {
    marginTop: "25px",
    marginLeft: "25px",
  },
  table: {
    minWidth: 650,
  },
  tableCell: {
    border: "2px solid #488DFF",
  },

  gridMarginTop: {
    marginTop: "25px",
  },
  universityNameInTableRow: {
    textAlign: "left",
  },
  textEllipsis: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxWidth: "10em",
  },
  buttonWidth: {
    // padding: "0.15em 2em",
    whiteSpace: "nowrap",
    width: "11em",
  },
  contentWrapperStyles: {
    border: "1px solid #E7E7E7",
    borderRadius: "3px",
    height: "300px",
    overflow: "scroll",
  },
  tooltip: {
    color: "#343B89",
    backgroundColor: "#343B89",
    fontSize: "12px",
    padding: "10px",
    left: 0,
    // right: "-4px",
    top: "-8px",
  },
  arrow: {
    color: "#343B89",
    width: "20px",
  },

  breadCrumpsStyle: {
    display: "flex",
    flexDirection: "row",
  },
  mainLayoutStyle: {
    backgroundColor: "#ffffff",

    height: "100%",
    "& *": {
      fontFamily: "'Poppins', sans-serif !important",
      msOverflowStyle: "none !important",
      scrollbarWidth: "none !important",
      "&::-webkit-scrollbar": {
        display: "none !important",
      },
    },
  },
  bottomPanel: {
    display: "flex",
    alignItems: "center",
    position: "sticky",
    justifyContent: "flex-end",
    padding: "15px",
    gap: "15px",
    borderTop: "1px solid #E7E7E7",
    marginBottom: "0px",
  },
  stepLabel: {
    color: `${COLORS.white} !important`,
  },
  stageNamefont: {
    color: `${COLORS.white} !important`,
  },
  breadCrumpsText: {
    lineHeight: "normal",
    paddingLeft: "5px",
    color: "#333333",
    fontSize: "16px",
    cursor: "pointer",

    "&:active": {
      color: "#1093ff",
    },
  },

  breadCrumpsArrow: {
    fill: "#666666 !important",
    fontSize: "22px !important",
    marginLeft: "6px",
  },
  bannerStyle: {
    width: "100%",
    height: "90%",
  },
  leftContainer: {
    border: "1px solid #c8c8c8",
    borderRadius: "10px",
    display: "flex",
    minHeight: "598px",
    height: "100%",
    overflowY: "scroll",
    padding: "10px 0px",
    background: "#ffffff",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    whiteSpace: "nowrap !important",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  filterLeftPad: {
    borderBottom: "3px solid rgba(0, 0, 0, 0.12) !important",
    "& p": {
      paddingLeft: "10px",
      paddingBottom: "5px",
    },
  },
  leftTitleText: {
    fontSize: "20px !important",
    fontWeight: "bold !important",
    margin: "3% !important",
  },
  bannerImage: {
    backgroundImage: "url('../../Asset/Images/DeadlineBanner.png')",
    backgroundRepeat: "no-repeat",
    display: "flex",
    width: "100%",
    height: "100%",
  },
  bannerCard: {
    width: "100%",
    height: "100%",
    opacity: "1 !important",
    borderRadius: "10px !important",
    backgroundImage: "url('../../Asset/Images/DeadlineBanner.png') !important",
    backgroundRepeat: "no-repeat !important",
  },
  titleDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightContainer: {
    display: "flex !important",
    flexDirection: "column !important",
    width: "100% !important",
    height: "100% !important",
    paddingTop: "0px !important",
  },
  contentPad: {
    padding: "0px 10px",
  },
  rightContentStyle: {
    padding: "10px 15px",
    height: "100%",
  },
  tableStyle: {
    width: "100% !important",
    borderBottom: "1px solid #c8c8c8 !important",
    height: "100% !important",
  },
  listTypography: {
    display: "flex !important",
    alignItems: "center !important",
    fontSize: "14px !important",
    paddingRight: "10px !important",
    whiteSpace: "normal",
  },
  listText: {
    color: "#333333 !important",
    fontSize: "12px !important",
    letterSpacing: "0.84px !important",
    opacity: "1 !important",
  },
  checkIcon: {
    width: "10px !important",
    height: "10px !important",
  },
  dialogText: {
    fontSize: "12px !important",
    padding: "2px !important",
    height: "60px !important",
    display: "flex !important",
    justifyContent: "center !important",
    alignItems: "center !important",
    cursor: "pointer !important",
  },
  monthText: {
    fontWeight: "700 !important",
    color: "#333333 !important",
    opacity: "1 !important",
    fontSize: "23px !important",
  },
  countText: {
    fontSize: "13px !important",
    fontWeight: "600 !important",
    marginLeft: "5px !important",
  },
  closeButtonStyle: {
    textTransform: "none !important",
    fontSize: "15px !important",
    color: "#18AAE7 !important",
    fontWeight: "600 !important",
    marginRight: "24px !important",
  },
  pageContent: {
    height: "100%",
    overflowY: "auto !important",
    padding: "8px 0px 16px",
  },
  popupDivider: {
    width: "600px !important",
    marginLeft: "-25px !important",
    marginTop: "10px !important",
    marginBottom: "10px !important",
  },
  alphabetArr: {
    border: "1px solid #eaeaea !important",
    borderRadius: "45% !important",
    height: "23px !important",
    width: "23px !important",
    display: "flex !important",
    alignItems: "center !important",
    justifyContent: "center !important",
    flexDirection: "row !important",
    margin: "5px !important",
  },
  selectedAlphabetArr: {
    border: "1px solid #eaeaea !important",
    borderRadius: "45% !important",
    height: "23px !important",
    width: "23px !important",
    display: "flex !important",
    alignItems: "center !important",
    justifyContent: "center !important",
    flexDirection: "row !important",
    margin: "5px !important",
    backgroundColor: "#3b1bca !important",
    color: "#ffffff !important",
  },
  alphabetArrDiv: {
    display: "flex !important",
    flexDirection: "row !important",
    alignItems: "center !important",
    justifyContent: "center !important",
  },
  autoCompleteStyle: {
    width: "300px !important",
    display: "flex !important",
    alignItems: "flex-start !important",
    justifyContent: "flex-start !important",
    marginBottom: "8px !important",
    "& input": {
      height: "30px !important",
      fontSize: "14px !important",
      fontStyle: "italic !important",
      "&::selection": {
        background: "none",
      },
    },

    "& svg": {
      width: "20px !important",
      height: "20px !important",
      padding: "1px",
    },
    "& path": {
      fill: "#333333 !important",
    },
  },
  searchIconStyle: {
    fill: "none !important",
    width: "20px !important",
    height: "20px !important",
    marginRight: "15px !important",
  },
  accordionListStyle: {
    display: "flex",
    flexDirection: "row",
  },
  checkListStyle: {
    border: "1px solid lightgray",
  },
  bannerText: {
    position: "absolute",
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "30px !important",
    fontWeight: "600 !important",
  },
  rowWiseDiv: {
    display: "flex",
    flexDirection: "row",
    gap: "15px",
    padding: "6px 0px 12px !important",
    overflowX: "scroll",
  },
  leftStyle: {
    width: "100%",
  },
  titleText: {
    fontWeight: "600 !important",
  },
  schoolCard: {
    height: "30px !important",
    overflowY: "hidden !important",
    whiteSpace: "nowrap !important",
    width: "100% !important",
    overflowX: "hidden !important",
    margin: "6px 0px !important",
    display: "flex !important",
    alignItems: "center !important",
    padding: "5px !important",
    borderRadius: "0px !important",
    cursor: "pointer !important",
  },
  hoverText: {
    fontSize: "13px !important",
    letterSpacing: "0px !important",
    color: "#333333 !important",
    fontWeight: "600 !important",
    opacity: "1 !important",
    display: "flex !important",
    alignItems: "center !important",
  },
  leftHoverText: {
    fontSize: "13px !important",
    letterSpacing: "0px !important",
    color: "#333333 !important",
    opacity: "1 !important",
  },
  hoverTitle: {
    paddingRight: "16px !important",
    height: "50px !important",
    fontSize: "13px !important",
    letterSpacing: "0px !important",
    color: "#333333 !important",
    opacity: "1 !important",
    display: "flex !important",
    alignItems: "center !important",
    justifyContent: "center !important",
  },
  paginationPad: {
    paddingLeft: "30px",
    paddingBottom: "5px",
  },
  positionedDivider: {
    position: "absolute !important",
    top: "8px !important",
    left: "-24px !important",
    right: "-24px !important",
  },
  hoverRound: {
    borderRadius: "20px !important",
    fontSize: "15px !important",
    display: "flex !important",
    justifyContent: "center !important",
    alignItems: "center !important",
    marginLeft: "-50% !important",
    marginTop: "-4% !important",
    padding: "3px !important",
    marginBottom: "6px !important",
  },
  linkStyle: {
    display: "flex",
    flexDirection: "row",

    "& svg": {
      transform: "rotate(145deg)",
    },
  },
  hoverCount: {
    fontSize: "10px !important",
    display: "flex !important",
    alignItems: "center !important",
    justifyContent: "center !important",
  },
  dialogDateStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
  },
  roundHoverWrapper: {
    width: "calc(100% + 26px) !important",
    marginLeft: "-16px !important",
  },
  hoverInnerWrapper: {
    marginLeft: "-12px !important",
    padding: "0px 12px !important",
  },
  bottomContainer: {
    border: "1px solid #FFFFFF !important",
    padding: "5px 0px !important",
    position: "absolute !important",
    bottom: "-22px",
    left: "-14px",
    right: 0,
    minWidth: "calc(100% + 34px) !important",
    background: "#FFFFFF !important",
    boxShadow: "-3px 0px 6px #488DFF !important",
    borderRadius: "4px !important",
    zIndex: 2,
  },
  popoverStyle: {
    position: "relative",
    width: "320px !important",
    height: "275px !important",
    padding: "10px !important",
    background: "#FFFFFF",
    boxShadow: "0px 3px 6px #00000029",
    border: "1px solid #E7E7E7",
    borderRadius: "10px",
    top: 28,

    msOverflowStyle: "none",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  inputTextBoxStyle: {
    height: "36px",
    fontSize: "14px",
    fontStyle: "italic",
  },
  cardPadding: {
    padding: "30px 16px 0px 4px !important",
  },
  iconPad: {
    padding: "5px !important",
  },
  linkIconStyle: {
    width: "18px",
    height: "16px",
  },
  dropDownPadTop: {
    paddingTop: "10px",
  },
  hideUnderLine: {
    width: "280px",
    "& input": {
      color: "#333333 !important",
      fontWeight: "600 !important",
      "&::selection": {
        background: "none !important",
      },
    },
    "& .MuiInput-underline:before": {
      border: "none !important",
    },
    "& svg": {
      width: "20px !important",
      height: "20px !important",
      padding: "1px",
      "& path": {
        fill: "#333333 !important",
      },
    },
  },
  paddingBoth: {
    padding: "16px 0 24px",
  },
  paddingTop: {
    paddingTop: 12,
  },
  tableHead: {
    fontSize: "16px",
    fontWeight: 600,
    padding: "6px",
    color: "#333333",
  },
  defaultTableHead: {
    fontSize: "16px",
    fontWeight: 500,
    color: "#333333",
  },
  tablePadTop: {
    marginTop: "20px",
  },
  fixedDownloadIcon: {
    position: "fixed !important",
    right: "40px !important",
    bottom: "40px !important",
  },
  activeSideIcon: {
    fill: "#ffffff",
    fontSize: "22px",
  },
  sideIcon: {
    fill: "#333333",
    fontSize: "22px",
  },
  listPadding: {
    padding: "0 10px",
  },
  typeListStyle: {
    padding: "0 10px",
    overflow: "auto",
  },
  tracker: {
    padding: "0px 8px",
    position: "relative",
    zIndex: 3,
  },
  sliderText: {
    color: "#666666 !important",
    fontSize: "14px !important",
    paddingBottom: "4px !important",
  },
  divider: {
    borderBottom: "3px solid rgba(0, 0, 0, 0.12) !important",
  },
  cityTableHeadStyle: {
    minWidth: "260px",
  },
  countryTableHeadStyle: {
    minWidth: "420px",
  },
  cardBoxStyle: {
    background: "#FFFFFF",
    boxShadow: "0px 3px 6px #00000029",
    border: "1px solid #E7E7E7",
    borderRadius: "5px",
    padding: "10px",
  },
  layoutCardStyle: {
    border: "1px solid #3C56FD",
    padding: "20px 20px 30px",
    background: "#FFFFFF",
    borderRadius: "10px",
    height: "calc(100% - 52px)",
  },
  cardTitle: {
    flex: 1,
    fontSize: "18px",
    textAlign: "center",
    fontWeight: 600,
    color: COLORS.darkBlue,
  },
  countyCardStyle: {
    background: "#FFFFFF",
    border: "1px solid #3C56FD",
    borderRadius: "10px",
    padding: "30px",
  },
  overFlowWrap: {
    overflowWrap: "break-word",
  },
  countryMapCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "35px 80px",
    background: "#FFFFFF",
    border: "1px solid #E7E7E7",
    borderRadius: "10px",
  },
  verticalDivider: {
    top: "42px",
    left: "calc(50% + 10px)",
    border: "0",
    height: "calc(100% - 72px)",
    position: "absolute",
    borderLeft: "1px solid #E1E1E1",
  },
  dividerColor: {
    position: "relative",
    borderColor: "#E1E1E1",
    left: "30px",
    width: "calc(100% - 45px)",
  },
  popupCustomTitleStyle: {
    padding: 0,
    textAlign: "center",
    color: COLORS.white,
    fontSize: 18,
  },
  sideBarWrapper: {
    paddingBottom: "26px",
    height: "calc(100% - 26px)",
  },
  rootWrapper: {
    position: "relative",
    height: "100%",
  },
  rotate: {
    transition: "all 0.3s ease-out",
    transform: ({ rotate }) => rotate && "rotate(180deg)",
  },
  compareButtonStyle: {
    borderRadius: "25px",
    width: "136px",
    height: "46px",
  },
  compareButtonPositionStyle: {
    position: "absolute",
    right: "0",
    bottom: "45px",
  },
  emptyPadding: {
    padding: "0px",
  },
  pointerCursor: {
    cursor: "pointer",
  },
  compareDeleteIconPositionStyle: {
    position: "relative",
    float: "right",
    top: 8,
    right: 5,
  },
  iconButtonStyle: {
    alignItems: "right",
    color: "#488DFF",
  },
  tooltip: {
    fontSize: "1em",
  },
  buttonCompleteInGraduationListCard: {
    borderRadius: "4px",
    padding: "0.3em 0.9em",
    margin: "0em 0.4em",
    opacity: 0.68,
    backgroundColor: "#81C14F",
    color: "black !important",
    "&:hover": {
      background: "#81C14F",
    },
  },
  buttonInterestedInGraduationListCard: {
    borderRadius: "4px",
    padding: "0.3em 0.9em",
    margin: "0em 0.4em",
    backgroundColor: "#D8D8D8",
    opacity: 0.68,
    color: "black",
    "&:hover": {
      background: "#D8D8D8",
    },
  },
  buttonNotInterestedInGraduationListCard: {
    borderRadius: "4px",
    padding: "0.3em 0.9em",
    margin: "0em 0.4em",
    backgroundColor: "#FFB6B6",
    color: "black !important",
    "&:hover": {
      background: "#FFB6B6",
    },
  },
  displayNameWithButton: {
    whiteSpace: "nowrap",
    display: "flex",
  },
  toggleButtonSize: {
    border: "1px solid #488dff !important",
    borderRadius: "11px % !important",
    height: "34px !important",
    overflow: "hidden !important",
    minWidth: "20px !important",
  },
  addedButton: {
    color: "rgb(4, 129, 9) !important",
    backgroundColor: "transparent !important",
    padding: "2px 15px !important",
    border: "2px solid rgb(4, 129, 9) !important",
    borderRadius: "5px !important",
    minWidth: "80px !important",
    textTransform: "capitalize !important",
  },
  addButton: {
    color: "rgb(47, 155, 229) !important",
    backgroundColor: "transparent !important",
    padding: "2px 15px !important",
    border: "2px solid rgb(47, 155, 229) !important",
    borderRadius: "5px !important",
    minWidth: "80px !important",
    cursor: "pointer !important",
    textTransform: "capitalize !important",
  },
  // tableData:{
  //   width: "100%",
  //   borderCollapse: "separate",
  //   borderSpacing: 0,
  //   border: "2px solid #488dff",
  //   borderTopLeftRadius: "10px",
  //   borderBottomLeftRadius: "10px",
  //   overflow: "auto !important"
  //   left: 0px;
  //   ::-webkit-scrollbar {
  //     width: 8px,
  //     height: 52px,
  //   }

  //   tr th,
  //   tr td {
  //     border-left: 2px solid #488dff,
  //     border-bottom: 2px solid #488dff,
  //     padding: 5px,
  //   }

  //   tr th:first-child,
  //   tr td:first-child {
  //     border-left: none,
  //   }

  //   tr:last-child td {
  //     border-bottom: none,
  //   }

  //   tr:first-child th {
  //     border-top-left-radius: 10px,
  //   }

  //   tr:last-child td {
  //     border-bottom-left-radius: 10px,
  //   }

  //   tr:last-child th {
  //     border-bottom: none !important,
  //   }

  //   tr:first-child td {
  //     border-top-left-radius: 10px,
  //   }
  // }
}));

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 30px 0px;
  gap: 8px;
  position: relative;
  height: calc(100% - 20px);
`;

export const FlexView = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const BannerBody = styled.div`
  width: 100%;
  position: relative;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const BannerImg = styled.img`
  width: 100%;
  height: 20vh;
`;
export const StageIcons = styled.div`
  position: absolute;
  width: 65%;
  top: 20%;
  left: 20%;
  color: white;
`;
export const BannerTitle = styled.div`
  position: absolute;
  width: 100%;
  top: calc(10% - 5px);
  left: 2%;
  text-align: left;
  font-size: 30px;
  font-weight: 600;
  color: #343b89;
`;

export const BannerRightImage = styled.img`
  position: absolute;
  right: 2%;

  top: 7%;
  width: 9%;
`;
