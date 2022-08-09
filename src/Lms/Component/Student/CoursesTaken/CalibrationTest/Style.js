import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  icon: {
    backgroundColor: "#1093FF",
    borderRadius: "20px",
    color: "white",
  },
  heading1: {
    fontWeight: 400,
    fontSize: "14px",
    color: "#052A4E",
  },
  score: {
    fontWeight: 700,
    fontSize: "20px",
    color: "#052A4E",
    minWidth: "25px",
  },
  vertical: {
    height: "20px",
  },
  accordionSummaryStyle: {
    alignItems: "center",
    margin: "15px 10px 15px 8px !important",
    justifyContent: "space-between",
  },
  insightStyle: {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "16px",
    color: "#1093FF",
    textAlign: "center",
    padding: "12px",
  },
  accordionPaperStyle: {
    background: "#FFFFFF",
    boxShadow: "0px 0px 7px rgba(183, 222, 255, 0.5) !important",
    borderRadius: "16px !important",
  },
  subText: {
    color: "#002D18 !important",
    fontWeight: "500 !important",
  },
  subLeftText: {
    color: "#052A4E !important",
  },
  subRightText: {
    color: "#052A4E !important",
    fontWeight: "500 !important",
  },
}));
