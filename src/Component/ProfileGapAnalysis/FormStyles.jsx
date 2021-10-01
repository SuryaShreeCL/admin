import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme)=>({
  root: {
    "& .MuiFormLabel-root": {
      fontSize: "13px !important" 
    }
  },
  leftContainer: {
    padding: "23px !important",
    position: "relative",
  },
  tableWrapper: {
    marginTop: "40px",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    marginLeft: "-15px",
  },
  bottomBtn: {
    float: "right",
    top: "5px",
    right: "20px",
  },
  nextStudies: {
    [theme.breakpoints.up("md")] : {
      marginTop : "17%"
     }
  },
 twelthFieldBottomContainer : {
  //  marginTop : "260px",
   [theme.breakpoints.up("md")] : {
    marginTop : "10%"
   }
 }
}));