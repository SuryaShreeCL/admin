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
  position : "absolute",
  bottom : "13%"
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
 },
 chartContainer : {
  height : "360px",
  border : "2px solid #f1f1f1",
  borderRadius : "8px",
  padding : "7px",
  width : "100%",
  display : "flex",
  flexDirection : "column",
  justifyContent : "center"
 },
 chartLegendContainer : {
   display : "flex",
  justifyContent : "flex-end",
  alignItems : "center",
  gridGap : "15px",
  paddingTop : "12px",
  paddingRight : "12px"
 },
 dotContainer : {
   display : "flex",
   alignItems : "center",
   gridGap : "7px"
 },

 blueDot : {
  height: "15px",
  width: "15px",
  backgroundColor: "#6495ED",
  borderRadius: "50%",
 },
 redDot : {
  height: "15px",
  width: "15px",
  backgroundColor: "#F08080",
  borderRadius: "50%",
 },
 tabTextStyle : {
   textTransform : "inherit"
 },
 academicSummaryLayout : {
   height : "70vh",
   overflow : "auto"
 }

}));