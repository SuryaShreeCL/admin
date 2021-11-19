import { Box, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  deleteFocus,
  getFocusList,
  getPlanOfAction,
  savePlanOfAction,
  saveSingleFocus
} from "../../AsyncApiCall/PgaReport/PlanOfAction";
import { HELPER_TEXT } from "../../Constant/Variables";
import TextFieldComponent from "../Controls/TextField";
import MySnackBar from "../MySnackBar";
import { isEmptyObject, isEmptyString } from "../Validation";
import BottomContainer from "./BottomContainer";
import BlueTable from "./Components/BlueTable";
import { PageWrapper } from "./Components/StyledComponents";
import { useStyles } from "./Styles/Index";

function PlanOfAction(props) {
  const classes = useStyles();
  const [focusList, setFocusList] = useState([]);
  const [planOfAction, setPlanOfAction] = useState({
    criteriaCGPA : "",
    rows : [],
    plans : []
  });
  const [snack, setSnack] = useState({
    snackOpen: false,
    snackMsg: "",
    snackVariant: "",
  });
  const getAndSetPlanOfAction = () => {
    getPlanOfAction(
      props.match.params.studentId,
      props.match.params.productId
    ).then((response) => {
      if (response.status === 200) {
        setPlanOfAction({...response.data.data});
      }
    });
  };

  useEffect(() => {
    getFocusList().then((response) => {
      if (response.status === 200) {
        setFocusList(response.data.data);
      }
    });
    getAndSetPlanOfAction();
  }, []);

  const handleAddClick = (index) => {
    let planOfActionCopy = [...planOfAction];
    planOfActionCopy[index].pgaStudentPoaFocus.push({
      id: null,
      activity: "",
      remark: "",
      pgaPoaFocus: null,
    });
    setPlanOfAction(planOfActionCopy);
  };

  const handleFocusChange = (value, focusNo, planId, name, rowIndex, cellIndex) => {
    console.log(value, focusNo, planId, name, rowIndex, cellIndex, "-------")
    let copyOf = {...planOfAction};
    copyOf.rows[rowIndex][cellIndex].name = value;
    setPlanOfAction(copyOf)
    if(value){
      let requestBody = {
        planId: planId,
        focusNo: parseInt(focusNo),
        pgaPoaFocus: value,
      }; 
      console.log(requestBody, "======")
      saveSingleFocus(props.match.params.studentId, props.match.params.productId, requestBody)
      .then(response=>{
        if(response.status === 200){
          getAndSetPlanOfAction()
        }
      })
    }
  };

  const handleTextChange = (e, quarterIndex, focusIndex) => {
    let copyOf = {...planOfAction};
    copyOf.plans[quarterIndex].pgaStudentPoaFocus[focusIndex][e.target.name] =
    e.target.value;
    setPlanOfAction(copyOf);
  };

  const handleDeleteFocus = (quarterIndex, focusIndex) => {
    let copyOf = [...planOfAction];
    if (copyOf[quarterIndex].pgaStudentPoaFocus[focusIndex].id) {
      deleteFocus(copyOf[quarterIndex].pgaStudentPoaFocus[focusIndex].id).then(
        (response) => {
          if (response.status === 200) {
            getAndSetPlanOfAction();
          }
        }
      );
    } else {
        if( copyOf[quarterIndex].pgaStudentPoaFocus.length !== 1 ){
          copyOf[quarterIndex].pgaStudentPoaFocus.splice(focusIndex, 1);
          setPlanOfAction(copyOf);
        }
    }
  };

  const handleSave = () => {
    let error = false;
    for (
      let quarterIndex = 0;
      quarterIndex < planOfAction.length;
      quarterIndex++
    ) {
      for (
        let focusIndex = 0;
        focusIndex < planOfAction[quarterIndex].pgaStudentPoaFocus.length;
        focusIndex++
      ) {
        if (
          isEmptyString(
            planOfAction[quarterIndex].pgaStudentPoaFocus[focusIndex].activity
          )
        ) {
          error = true;
          break;
        }
        if (
          isEmptyString(
            planOfAction[quarterIndex].pgaStudentPoaFocus[focusIndex].remark
          )
        ) {
          error = true;
          break;
        }
        if (
          isEmptyObject(
            planOfAction[quarterIndex].pgaStudentPoaFocus[focusIndex]
              .pgaPoaFocus
          )
        ) {
          error = true;
          break;
        }
      }
    }
    if (!error) {
      savePlanOfAction(
        props.match.params.studentId,
        props.match.params.productId,
        planOfAction
      ).then((response) => {
        if (response.status === 200) {
          getAndSetPlanOfAction();
          setSnack({
            snackMsg: "Saved Successfully",
            snackVariant: "success",
            snackOpen: true,
          });
        }
      });
    } else {
      setSnack({
        snackMsg: HELPER_TEXT.requiredField,
        snackVariant: "error",
        snackOpen: true,
      });
    }
  };

  console.log(planOfAction, )

  return (
    <PageWrapper>
      <div className={classes.containerStyle}>
        <div className={classes.planOfActionContainer}>
          <Typography variant={"h5"}>Quarterly Plan of Action</Typography>
          <Box display={"flex"} alignItems={"center"} gridGap={"5px"}>
          <Typography>Student Category</Typography>
          <Typography color={"secondary"}>{planOfAction.criteriaCGPA}</Typography>
          </Box>
        </div>
        <Grid container spacing={2} className={classes.planOfActionContainer}>
          <Grid item xs={12}>
          <BlueTable
          data={planOfAction.rows}
          focusList={focusList}
          handleFocusChange={handleFocusChange}
          />
          </Grid>
          {planOfAction.plans.map((eachPlan, quarterIndex) => {
            return (
              <>
                <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
                  <Typography className={classes.quarterlyTypo}>
                    {`Quarter ${eachPlan.quarterPlan}`}
                  </Typography>
                </Grid>
                {eachPlan.pgaStudentPoaFocus.map((eachFocus, focusIndex) => {
                  let focusNumber = focusIndex + 1;
                  return (
                    <>
                      <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
                        <Typography>{"Focus " + focusNumber}</Typography>
                      </Grid>
                      {/* <Grid item md={3} xs={12} sm={12} lg={3} xl={3}>
                        <DropDown
                          id="combo-box-demo"
                          options={focusList}
                          value={eachFocus.pgaPoaFocus}
                          onChange={(e, newValue) =>
                            handleFocusChange(
                              newValue,
                              focusIndex,
                              quarterIndex
                            )
                          }
                          getOptionLabel={(option) => option.activity}
                          renderInput={(params) => (
                            <TextFieldComponent
                              {...params}
                              label="Focus Name"
                              variant="standard"
                            />
                          )}
                        />
                      </Grid> */}
                      <Grid item md={6} xs={12} sm={12}>
                        <TextFieldComponent
                          value={eachFocus.activity}
                          name={"activity"}
                          onChange={(e) =>
                            handleTextChange(e, quarterIndex, focusIndex)
                          }
                          label={"Activity"}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={6} xs={12} sm={12}>
                        <TextFieldComponent
                          name={"remark"}
                          value={eachFocus.remark}
                          onChange={(e) =>
                            handleTextChange(e, quarterIndex, focusIndex)
                          }
                          label={"Remarks"}
                          fullWidth
                        />
                      </Grid>
                      {/* <Grid
                        item
                        md={1}
                        xl={1}
                        lg={1}
                        container
                        justifyContent={"flex-end"}
                      >
                        {focusIndex ===
                          eachPlan.pgaStudentPoaFocus.length - 1 && (
                          <IconButton
                            size={"small"}
                            onClick={() => handleAddClick(quarterIndex)}
                          >
                            <AddCircleOutlineOutlinedIcon color={"primary"} />
                          </IconButton>
                        )}

                        <IconButton
                          size={"small"}
                          onClick={() =>
                            handleDeleteFocus(quarterIndex, focusIndex)
                          }
                        >
                          <DeleteOutlineRoundedIcon color={"secondary"} />
                        </IconButton>
                      </Grid> */}
                    </>
                  );
                })}
              </>
            );
          })}
        </Grid>
      </div>

      <BottomContainer onClick={handleSave} />
      <MySnackBar
        onClose={() =>
          setSnack({
            snackOpen: false,
            snackMsg: "",
            snackVariant: "",
          })
        }
        snackOpen={snack.snackOpen}
        snackVariant={snack.snackVariant}
        snackMsg={snack.snackMsg}
      />
    </PageWrapper>
  );
}

export default PlanOfAction;
