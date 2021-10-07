import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme)=>({
  root: {
    "& .MuiFormLabel-root": {
      fontSize: "13px !important" 
    }
  },
  container: {
    height: "95vh",
    overflowY: "scroll",
    overflowX: "hidden",
    width: "100%",
  }
  
  
}));