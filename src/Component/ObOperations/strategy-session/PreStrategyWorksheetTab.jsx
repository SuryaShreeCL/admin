import React, { useEffect, useState } from "react";
import SaveContainer from "./components/SaveContainer";
import { useStyles } from "./Styles";
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple , blue } from '@material-ui/core/colors';
import { isEmptyObject } from '../../Validation';
import { getLatestCv } from '../../../AsyncApiCall/Student';
import PdfViewer from '../../../Utils/PdfViewer'   
import { useParams } from "react-router-dom";
import CvViewer from "../../ProfileGapAnalysis/CvViewer";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor:blue[500],
    
    marginTop:"20px",
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
}))(Button);



const theme = createTheme({
  palette: {
    primary:purple,
  },
});

function ProgramPreference(props) {
    
console.log(props,'hellosadooasd')
   
  const classes = useStyles();

 
  return (
     <><div className={classes.buttonPosition}>
    <ColorButton variant="contained" color="primary" className={classes.margin}>
      upload
    </ColorButton>
    </div>

 <CvViewer doctype={"cv"} {...props} />
    
    </>
  )
}

export default ProgramPreference;
