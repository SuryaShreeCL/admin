import { Box, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  deleteFocus,
  filterFocus,
  getFocusList,
  getPlanOfAction,
  savePlanOfAction,
  saveSingleFocus,
} from "../../AsyncApiCall/PgaReport/PlanOfAction";
import { HELPER_TEXT } from "../../Constant/Variables";
import TextFieldComponent from "../Controls/TextField";
import MySnackBar from "../MySnackBar";
import BottomContainer from "./BottomContainer";
import BlueTable from "./Components/BlueTable";
import { CardViewComponent } from "./Components/CardView";
import CollapseViewer from "./Components/CollapseViewer";
import { ProfileSimilarityCheckerPopup } from "./Components/ProfileSimilarityCheckerPopup";
import { PageWrapper } from "./Components/StyledComponents";
import { useStyles } from "./Styles/Index";

function PlanOfAction(props) {
  const classes = useStyles();
  const [focusList, setFocusList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [planOfAction, setPlanOfAction] = useState({
    criteriaCGPA: "",
    rows: [],
    plans: [],
  });
  const [snack, setSnack] = useState({
    snackOpen: false,
    snackMsg: "",
    snackVariant: "",
  });
  const [filteredData, setFilteredData] = useState([]);
  const [studentIdList, setStudentIdList] = useState([]);
  const [ selectedQuarterId, setSelectedQuarterId ] = useState([]);

  const getAndSetPlanOfAction = (idList) => {
    getPlanOfAction(
      props.match.params.studentId,
      props.match.params.productId,
      idList
    ).then((response) => {
      if (response.status === 200) {
        setPlanOfAction({ ...response.data.data });
      }
    });
  };

  useEffect(() => {
    getFocusList().then((response) => {
      if (response.status === 200) {
        setFocusList(response.data.data);
      }
    });
    getAndSetPlanOfAction("");
  }, []);

  useEffect(()=>{
    if( selectedQuarterId.length !== 0 ){
      const commaSeparatedId = selectedQuarterId.join(",");
      getAndSetPlanOfAction(commaSeparatedId)
    }else{
      getAndSetPlanOfAction("")
    }
  }, [selectedQuarterId])

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

  const handleFocusChange = (
    value,
    focusNo,
    planId,
    name,
    rowIndex,
    cellIndex
  ) => {
    if (value) {
      let copyOf = { ...planOfAction };
      copyOf.rows[rowIndex][cellIndex].name = value;
      setPlanOfAction(copyOf);
      let requestBody = {
        planId: planId,
        focusNo: parseInt(focusNo),
        pgaPoaFocus: value,
      };

      saveSingleFocus(
        props.match.params.studentId,
        props.match.params.productId,
        requestBody
      ).then((response) => {
        if (response.status === 200) {
          getAndSetPlanOfAction("");
        }
      });
    } else {
      let copyOf = { ...planOfAction };
      copyOf.rows[rowIndex][cellIndex].name = value;
      let quarterIndex = copyOf.plans.findIndex((el) => el.id === planId);
      let focusIndex = copyOf.plans[quarterIndex].pgaStudentPoaFocus.findIndex(
        (el) => el.orderNo === focusNo
      );
      copyOf.plans[quarterIndex].pgaStudentPoaFocus[
        focusIndex
      ].pgaPoaFocus = null;
      setPlanOfAction(copyOf);
    }
  };

  const handleTextChange = (e, quarterIndex, focusIndex) => {
    let copyOf = { ...planOfAction };
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
            getAndSetPlanOfAction("");
          }
        }
      );
    } else {
      if (copyOf[quarterIndex].pgaStudentPoaFocus.length !== 1) {
        copyOf[quarterIndex].pgaStudentPoaFocus.splice(focusIndex, 1);
        setPlanOfAction(copyOf);
      }
    }
  };

  const handleSave = () => {
    let error = false;

    if (!error) {
      savePlanOfAction(
        props.match.params.studentId,
        props.match.params.productId,
        planOfAction.plans
      ).then((response) => {
        if (response.status === 200) {
          getAndSetPlanOfAction("");
          setSnack({
            snackMsg: "Saved Successfully",
            snackVariant: "success",
            snackOpen: true,
          });
        } else {
          setSnack({
            snackMsg: response,
            snackVariant: "error",
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

  const handleDropDownChange = (evt, value) => {
    if (value) {
      filterFocus(
        props.match.params.studentId,
        props.match.params.productId,
        value.value
      ).then((response) => {
        if (response.status === 200) {
          setFilteredData(response.data.data);
        } else {
          setSnack({
            snackOpen: true,
            snackMsg: response,
            snackVariant: "error",
          });
        }
      });
    }
    setSelectedFilter(value);
  };

  const handleShowDetails = (ind) => {
    let indexOfStudentId = studentIdList.indexOf(ind);
    if (indexOfStudentId === -1) {
      setStudentIdList((prev) => [...prev, ind]);
    } else {
      let tempList = [...studentIdList];
      tempList.splice(indexOfStudentId, 1);
      setStudentIdList(tempList);
    }
  };

  const handleAddQuarterClick = ( id ) =>{
    let indexOfQuarterId = selectedQuarterId.indexOf(id)
    if(indexOfQuarterId === -1){
      setSelectedQuarterId(prev=>([
        ...prev,
        id
      ]))
    }else{
      let tempList = [...selectedQuarterId]
      tempList.splice(indexOfQuarterId, 1)
      setSelectedQuarterId(tempList)
    }
  }

  console.log(selectedQuarterId, "============")
  return (
    <PageWrapper>
      <div className={classes.containerStyle}>
        <div className={classes.planOfActionContainer}>
          <Typography variant={"h5"}>Quarterly Plan of Action</Typography>
          <Box display={"flex"} alignItems={"center"} gridGap={"5px"}>
            <Typography>Student Category</Typography>
            <Typography color={"secondary"}>
              {planOfAction.criteriaCGPA}
            </Typography>
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
                  return (
                    <>
                      <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
                        <Typography>{"Focus " + eachFocus.orderNo}</Typography>
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
                          multiline
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
      <ProfileSimilarityCheckerPopup
        dialogOpen={props.popupStatus}
        handlePopupClose={props.handleDialogClose}
        value={selectedFilter}
        handleDropdownChange={handleDropDownChange}
      >
        {filteredData.map((el, i) => (
          <CollapseViewer
            handleShowDetails={() => handleShowDetails(i)}
            title={el.studentName}
            show={studentIdList.includes(i)}
          >
            <Grid container spacing={2}>
              {el.result.map((eachIt, ind) => {
                return (
                  <Grid item md={6}>
                    <CardViewComponent
                      height={"100%"}
                      handleClick={()=> handleAddQuarterClick(eachIt.id)}
                      mb={"10px"}
                      titleText={eachIt.quarterPlan}
                      buttonText={"Add"}
                      buttonStatus={selectedQuarterId.includes(eachIt.id)}
                      leftContent={eachIt.pgaStudentPoaFocus.map(
                        (el, indexOfEl) => `Focus ${indexOfEl + 1}`
                      )}
                      rightContent={eachIt.pgaStudentPoaFocus.map(
                        (el) => el.activity
                      )}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </CollapseViewer>
        ))}
      </ProfileSimilarityCheckerPopup>
    </PageWrapper>
  );
}

export default PlanOfAction;
