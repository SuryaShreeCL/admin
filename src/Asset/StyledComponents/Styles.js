import { createTheme, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  stageBoxLayoutStyle: {
    borderStyle: "groove",
    borderRadius: "10px",
    marginTop: "10px",
  },
  dividerStyle: {
    backgroundColor: "#D2D2D2",
  },
}));

export const customTheme = createTheme({
  palette: {
    contained: {
      backgroundColor: "#18AAE7",
      color: "#FFFFFF",
    },
    text: {
      color: "#18AAE7",
    },
    outlined: {
      color: "#18AAE7",
      borderColor: "#18AAE7",
    },
  },
});
