import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  Accordian: {
    width: "100%",
  },
  Icon: {
    backgroundColor: "#1093FF",
    borderRadius: "20px",
    color: "white",
  },
  heading: {
    flexBasis: "85%",
    flexShrink: 0,
  },

  heading1: {
    fontSize: "18px",
    flexBasis: "8%",
    flexShrink: 0,
  },
  score: {
    fontWeight: "600px",
    fontSize: "20px",
  },
  vertical: {
    height: "20px",
  },
}));
