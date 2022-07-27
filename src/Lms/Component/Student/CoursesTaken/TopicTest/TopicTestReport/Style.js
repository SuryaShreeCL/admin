import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  icon: {
    backgroundColor: "#1093FF",
    borderRadius: "20px",
    color: "white",
    height: "40px",
    width: "40px",
    padding: "10px",
  },
  heading: {
    fontSize: "30px",
  },

  heading2: {
    fontSize: "25px",
    color: "#1093FF",
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
