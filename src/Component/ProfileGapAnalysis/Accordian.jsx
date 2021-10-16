import { makeStyles, Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import React from "react";
import { useDispatch } from "react-redux";
import { saveCopyData } from "../../Actions/HelperAction";
import PrimaryButton from "../../Utils/PrimaryButton";
import SubjectInfoTable from "./SubjectInfoTable";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useSelector } from "react-redux"
function Accordian(props) {
  // Setting up initial styles for this component
  const useStyles = makeStyles((theme) => ({
    titleContainer: {
      display: "flex",
      alignItems: "center",
    },
    headerContainer: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
    leftHeader: {
      display: "flex",
      flexDirection: "column",
      gridGap: "10px",
    },
    innerContainer: {
      display: "flex",
      gridGap: "15px",
    },
    rightContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    userName: {
      fontWeight: 600,
    },
    dividerStyle: {
      width: "92%",
      marginTop: "0px",
      marginBottom: "0px",
    },
    accordianSummaryStyle: {
      margin: "16px 16px",
      "&$expanded": {
        margin: "16px 16px",
      },
    },
    accordianSummary : {
      flexDirection : "row-reverse",
    },
    expandIconStyle : {
      marginRight : "3px"
    },
    buttonStyle : {
        color : "#4CA24A",
        border : "1px solid #4CA24A"
    
    }
  }));
  const classes = useStyles();
  const { templateData }  = useSelector(state => state.HelperReducer)

  // Setting up dispatch for making API calls
  const dispatch = useDispatch();
  // This function copies the template of a student and pass the data to the student subject details table
  const handleUseTemplate = (e) => {
    e.stopPropagation();
    dispatch(saveCopyData(props.data.studentSubjectDetails));
  };
  console.log(props.data.studentSubjectDetails)
  return (
    <Accordion classes={{ root: classes.accordianSummaryStyle }}>
      <AccordionSummary classes={{ root : classes.accordianSummary, expandIcon : classes.expandIconStyle  }} aria-controls="panel1a-content" id="panel1a-header" expandIcon={<ExpandMoreIcon />}>
        <div className={classes.headerContainer}>
          <div className={classes.leftHeader}>
            <Typography className={classes.userName}>
              {props.data.fullName}
            </Typography>
            <div className={classes.innerContainer}>
              <Typography color={"textSecondary"}>Year of pass</Typography>
              <Typography>{props.data.year}</Typography>
            </div>
          </div>
          <div className={classes.rightContainer}>
            <PrimaryButton
              onClick={handleUseTemplate}
              size={"small"}
              className={props.data.studentSubjectDetails === templateData && classes.buttonStyle}
              variant={"outlined"}
              color={"primary"}
            >
              {props.data.studentSubjectDetails === templateData ? "Copied Template" : "Use Template"}
            </PrimaryButton>
          </div>
        </div>
      </AccordionSummary>
      <hr className={classes.dividerStyle} />
      <AccordionDetails>
        <SubjectInfoTable
          studentSubjectDetails={props.data.studentSubjectDetails ? props.data.studentSubjectDetails : props.studentSubjectDetails[0].subjectDetailsUgPgDiploma}
        />
      </AccordionDetails>
    </Accordion>
  );
}

export default Accordian;
