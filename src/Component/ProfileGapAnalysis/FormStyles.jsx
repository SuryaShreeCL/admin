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
 },
 tableRowColor : {
   backgroundColor : "#f1f1f1"
 },
 cardContainer : {
   display : "flex",
   flexDirection : "column",
   height : "280px",
   border : "2px solid #f1f1f1",
   borderRadius : "8px",
   padding : "7px"
 },
 cardTitle : {
   display : "flex",
   justifyContent : "center",
   alignItems : "center"
 },
 cardTableContainer : {
   display : "flex",
   justifyContent : "center",
   alignItems : "center"
 },
 semTitle : {
   padding : "7px 0px",
 },
 containerSpacing : {
   padding : "10px"
 },
 tabStyle : {
   borderBottom : "1px solid #f1f1f1"
 }
}));