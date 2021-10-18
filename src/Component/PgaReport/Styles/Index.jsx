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
   deleteContentText : {
       marginBottom : "10px"
   },
   noSchoolTypo : {
       fontWeight : 500
   },
   quarterlyTypo : {
    fontWeight : 600

   },
   generalDetailsHeading : {
    fontWeight : 600,
    marginTop : "10px"
   }
}))