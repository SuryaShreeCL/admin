import { makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  sessionContainer: {
    height: "80vh",
    border: "1px solid #D2D2D2",
    borderRadius: "10px",
    padding: "20px",
    marginTop: "15px",
    width: "100%",
  },
  strategyCard: {
    height: "98px",
    border: "1px solid #E7E7E7",
    borderRadius: "5px",
    opacity: 1,
    padding: "15px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  selectedStrategyCard: {
    height: "98px",
    border: "2px solid #18AAE7",
    borderRadius: "5px",
    opacity: 1,
    padding: "15px",
    width: "100%",
    boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  dateContainer: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  preStrategyWorkSheetContainer: {
    minHeight: "100vh",
    marginTop: "15px",
    borderStyle: "groove",
    borderRadius: "10px",
    marginTop: "10px",
  },
  saveContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "10px",
    borderTop: "1px solid #D2D2D2",
  },
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "80vh",
  },

  contentWrapper: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    padding: "25px",
  },
  mainContainer: {
    padding: "3%",
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardContainer: {
    padding: "20px",
    border: "1px solid lightGrey",
    borderRadius: "10px",
    marginBottom: "10px",
    backgroundColor: "white",
  },
  mainContainerStory: {
    padding: "20px",
  },
  UnalignedTextGraduate: {
    marginTop: "16px",
  },
  tabMenuFitWithGraduate: {
    marginBottom: "20px",
  },
  Button: {
    marginTop: "30px",
  },
  root: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    borderRadius: "20px",

    "&:hover": {
      backgroundColor: blue[700],
    },
  },
  buttonPosition: {
    top: "100px",
    padding: "20px",
  },
  popUpUpload: {
    border: "1px dotted blue",
  },
  documentDetails: {
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  dividerStyle: {
    backgroundColor: "#D2D2D2",
  },
  iconButtonStyle: {
    padding: "2px !important",
  },
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    background: "none",
  },
}));
