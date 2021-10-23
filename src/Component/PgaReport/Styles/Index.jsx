import { makeStyles } from "@material-ui/core";
import { colors } from "../../../Constant/Variables";

export const useStyles = makeStyles((theme)=>({
    contentContainer : {
        flexGrow : 1,
    },
    addContainer : {
        display : "flex",
        justifyContent : "center",
        alignItems : "center"
    },
    tableRowColor : {
        backgroundColor : colors.ashColor
    },
    leftContainer : {
        padding : "20px",
    },
    containerStyle : {
        height : "80vh",
        overflowY : "auto",
        padding : "20px"
    },
    specializationWrapper : {
        height : "80vh",
        overflowY : "auto",
        padding : "20px"
    },
   planOfActionContainer : {
        padding : "20px"
   },
   planOfActionWrapper : {
    height : "70vh",
    overflowY : "auto",
    padding : "20px"
   },
   autoCompleteStyle : {
       width : 300
   },
   noSchoolTypo : {
       fontWeight : "bolder"
   },
   quarterlyTypo : {
    fontWeight : 600

   },
   generalDetailsHeading : {
    fontWeight : 600,
    marginTop : "10px"
   },
   schoolLeftContainer : {
    padding : "20px",
    borderRight : "2px solid #f1f1f1"
   },
   columnDivider : {
    borderRight : "2px solid #f1f1f1"
   },
   sampleSchoolHeading : {
       gridGap : "5px"
   }
}))