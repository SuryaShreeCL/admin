import { Grid, Typography, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DropDown from "../Controls/DropDown";
import TextFieldComponent from "../Controls/TextField";
import BottomContainer from "./BottomContainer";
import { PageWrapper } from "./Components/StyledComponents";
import { useStyles } from "./Styles/Index";
import DatePick from "./Components/DatePick";
import { getSchoolProgram } from "../../AsyncApiCall/PgaReport/SampleSchool";
import {
  getPgaReportIntake,
  getPgaRound,
  getStudentGeneralDetails,
  savePgaReportGeneralDetails,
} from "../../AsyncApiCall/PgaReport/GeneralDetails";
import { useDispatch } from "react-redux";
import { getAllSpecialization } from "../../Actions/Aspiration";
import { isEmptyObject, isEmptyString, isNumber } from "../Validation";
import { HELPER_TEXT } from "../../Constant/Variables";
import MySnackBar from "../MySnackBar";
import moment from "moment";
import { data } from "jquery";
function GeneralDetails(props) {
  const classes = useStyles();
  const [id, setId] = useState(null);
  const [selectedDate, handleDateChange] = useState({
    value: null,
    
    helperText: "",
  });
  const [preferredProgramList, setPreferredProgramList] = useState([]);
  const [intakeList, setIntakeList] = useState([]);
  const [allSpecializationList, setAllSpecializationList] = useState([]);
  const [preferredProgram, setPreferredProgram] = useState({
    value: null,
    helperText: "",
  });
  const [areaOfSpec, setAreaOfSpec] = useState({ value: null, helperText: "" });
  const [currentSem, setCurrentSem] = useState({ value: null, helperText: "" });
  const [contextDesc, setContextDesc] = useState({ value: "", helperText: "" });
  const [intake, setIntake] = useState({ value: null, helperText: "" });
  const [round, setRound] = useState({ value: null, helperText: "" });
  const [timelineDesc, setTimelineDesc] = useState({
    value: "",
    helperText: "",
  });
  const [roundList, setRoundList] = useState([]);
  const [snack, setSnack] = useState({
    snackOpen: false,
    snackMsg: "",
    snackColor: "",
  });

  const dispatch = useDispatch();

  const getAndSetStudentGeneralDetails = () => {
    getStudentGeneralDetails(
      props.match.params.studentId,
      props.match.params.productId
    ).then((response) => {
      if (response.status === 200) {
        if (!isEmptyObject(response.data.data)) {
          const {
            id,
            contextDescription,
            date,
            preferredProgram,
            areaOfSpecialization,
            inTake,
            pgaRound,
            currentSemester,
            timeLineDescription,
            strDate,
          } = response.data.data;
          setId(id);
          console.log(date)
          setPreferredProgram((prev) => ({ ...prev, value: preferredProgram }));
          setContextDesc((prev) => ({ ...prev, value: contextDescription }));
          handleDateChange((prev) => ({ ...prev,value:date? moment(new Date(date)).format("YYYY-MM-DD") : null}));
          setAreaOfSpec((prev) => ({ ...prev, value: areaOfSpecialization }));
          setIntake((prev) => ({ ...prev, value: inTake }));
          setRound((prev) => ({ ...prev, value: pgaRound }));
          setCurrentSem((prev) => ({ ...prev, value: currentSemester }));
          setTimelineDesc((prev) => ({ ...prev, value: timeLineDescription }));
        }
      }
    });
  };

  useEffect(() => {
    dispatch(
      getAllSpecialization((response) => {
        if (response.status === 200) {
          setAllSpecializationList(response.data);
        }
      })
    );
    getSchoolProgram(props.match.params.productId).then((response) => {
      
      if (response.status === 200) {
        setPreferredProgramList(response.data.data);
      }
    });
    getPgaReportIntake().then((response) => {
      if (response.status === 200) {
        setIntakeList(response.data.data);
      }
    });
    getPgaRound().then((response) => {
      if (response.status === 200) {
        setRoundList(response.data.data);
        
      }
    });
    getAndSetStudentGeneralDetails();
    
  }, []);
   
  const handleSave = () => {
    const findObj = props.adminLinkedProductDetails.products.find(
      (el) => el.id === props.match.params.productId
    );
    const isAcsMs = findObj.codeName === "ACS_MS" ? true : false;

    let requestBody = {
      id: id,
      contextDescription: contextDesc.value,
      currentSemester: parseInt(currentSem.value),
      timeLineDescription: timelineDesc.value,
      strDate: selectedDate.value ? selectedDate.value : null,
      preferredProgram: preferredProgram.value,
      areaOfSpecialization: areaOfSpec.value,
      inTake: intake && intake.value,
      pgaRound: round.value,
    };

    savePgaReportGeneralDetails(
      props.match.params.studentId,
      props.match.params.productId,
      requestBody
    ).then((response) => {
      if (response.status === 200) {
        getAndSetStudentGeneralDetails();
        setSnack({
          snackMsg: "Saved Successfully",
          snackColor: "success",
          snackOpen: true,
        });
      } else {
        setSnack({
          snackMsg: response,
          snackColor: "error",
          snackOpen: true,
        });
      }
    });
  };

  return (
    <PageWrapper>
      <Grid container className={classes.containerStyle}>
        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
              <Typography variant={"h5"}>General Details</Typography>
            </Grid>
            <Grid item md={4} lg={4} xl={4}>
              <DropDown
                id='combo-box-demo'
                options={preferredProgramList}
                value={preferredProgram.value}
                onChange={(e, value) => {
                  setPreferredProgram((prevPref) => ({
                    helperText: "",
                    value: value,
                  }));
                }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextFieldComponent
                    {...params}
                    helperText={preferredProgram.helperText}
                    error={preferredProgram.helperText.length > 0}
                    label='Preferred Program'
                    variant='standard'
                  />
                )}
              />
            </Grid>
            <Grid item md={4} lg={4} xl={4}>
              <DropDown
                id='combo-box-demo'
                options={allSpecializationList}
                value={areaOfSpec.value}
                onChange={(e, value) =>
                  setAreaOfSpec({ value: value, helperText: "" })
                }
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextFieldComponent
                    {...params}
                    helperText={areaOfSpec.helperText}
                    error={areaOfSpec.helperText.length > 0}
                    label='Area of Specialization'
                    variant='standard'
                  />
                )}
              />
            </Grid>
            <Grid item md={2} lg={2} xl={2}>
              <TextFieldComponent
                value={currentSem.value || ""}
                onKeyPress={(evt) => {
                  if (isNumber(evt)) evt.preventDefault();
                }}
                onChange={(e) =>
                  setCurrentSem({ value: e.target.value, helperText: "" })
                }
                helperText={currentSem.helperText}
                error={currentSem.helperText.length > 0}
                label={"Current Semester"}
                inputProps={{ maxLength: 2 }}
                fullWidth
              />
            </Grid>
            <Grid item md={2} lg={2} xl={2} container alignItems={"flex-end"}>
              {console.log(selectedDate)}
              <TextField
                label={"Date"}
                value={ selectedDate.value || ""}
                helperText={selectedDate.helperText}
                error={selectedDate.helperText.length > 0}
                onChange={(e) =>
                  {console.log(e.target.value); handleDateChange({ value: e.target.value, helperText: "" })}
                }
                type='date'
                InputLabelProps={{ shrink: true }}
              />
              {/* <DatePick
               
                format="dd/MM/yyyy"
              /> */}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography className={classes.generalDetailsHeading}>
                Context
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextFieldComponent
                value={contextDesc.value || ""}
                onChange={(e) =>
                  setContextDesc({ value: e.target.value, helperText: "" })
                }
                helperText={contextDesc.helperText}
                error={contextDesc.helperText.length > 0}
                label={"Description"}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography className={classes.generalDetailsHeading}>
                Application Timeline best suited to you
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <DropDown
                id='combo-box-demo'
                options={intakeList}
                value={intake.value}
                onChange={(e, value) =>
                  setIntake({ value: value, helperText: "" })
                }
                disabled={true}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextFieldComponent
                    {...params}
                    helperText={intake.helperText}
                    error={intake.helperText.length > 0}
                    label='Intake'
                    variant='standard'
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <DropDown
                id='combo-box-demo'
                options={roundList}
                value={round.value}
                onChange={(e, value) =>
                  setRound({ value: value, helperText: "" })
                }
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextFieldComponent
                    {...params}
                    label='Round'
                    helperText={round.helperText}
                    error={round.helperText.length > 0}
                    variant='standard'
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextFieldComponent
                value={timelineDesc.value || ""}
                onChange={(e) =>
                  setTimelineDesc({ value: e.target.value, helperText: "" })
                }
                helperText={timelineDesc.helperText}
                error={timelineDesc.helperText.length > 0}
                label={"Description"}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}></Grid>
      </Grid>
      <BottomContainer onClick={handleSave} />
      <MySnackBar
        onClose={() =>
          setSnack({
            snackOpen: false,
            snackMsg: "",
            snackColor: "",
          })
        }
        snackOpen={snack.snackOpen}
        snackVariant={snack.snackColor}
        snackMsg={snack.snackMsg}
      />
    </PageWrapper>
  );
}

export default GeneralDetails;
