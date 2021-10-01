import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Typography, makeStyles, Grid, Divider } from "@material-ui/core";
import PrimaryButton from "../../Utils/PrimaryButton";
import SubjectInfoTable from "./SubjectInfoTable";
function Accordian(props) {
  const useStyles = makeStyles((theme) => ({
    titleContainer: {
      display: "flex",
      alignItems: "center",
    },
    headerContainer : {
        display : "flex",
        justifyContent : "space-between",
        width : "100%"
    },
    leftHeader : {
        display : "flex",
        flexDirection : "column",
        gridGap : "10px"
    },
    innerContainer : {
        display : "flex",
        gridGap : "15px"
    },
    rightContainer : {
        display : "flex",
        justifyContent : "center",
        alignItems : "center"
    },
    userName : {
        fontWeight : 600
    },
    dividerStyle : {
        width : "92%",
        marginTop : "0px",
        marginBottom : "0px"
    },
    accordianSummaryStyle : {
        margin : "16px 16px",
        "&$expanded" : {
          margin : "16px 16px",
        }
    }
  }));
  const classes = useStyles();
  return (
    <Accordion classes={{root : classes.accordianSummaryStyle}}>
      <AccordionSummary
        // expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div className={classes.headerContainer}>
          <div className={classes.leftHeader}>
            <Typography className={classes.userName}>My Name</Typography>
            <div className={classes.innerContainer}>
                <Typography color={"textSecondary"}>Yearof pass</Typography>
                <Typography>2016 - 2017</Typography>
            </div>
          </div>
          <div className={classes.rightContainer}>
              <PrimaryButton onClick={(e)=>e.stopPropagation()} size={"small"} variant={"outlined"} color={"primary"}>Use Template</PrimaryButton>
          </div>
        </div>
      </AccordionSummary>
      <hr className={classes.dividerStyle} />
      <AccordionDetails>
       <SubjectInfoTable />
      </AccordionDetails>
    </Accordion>
  );
}

export default Accordian;
