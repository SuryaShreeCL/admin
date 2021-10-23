import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  deleteStudentPgaActivitiesGmat,
  getPgaActivitiesGmat,
  getStudentActivitiesGmat,
  savePgaActivitiesGmat,
} from "../../AsyncApiCall/PgaReport/ActivitiesGmat";
import { colors, HELPER_TEXT } from "../../Constant/Variables";
import MySnackBar from "../MySnackBar";
import { isEmptyString } from "../Validation";
import BottomContainer from "./BottomContainer";
import DeleteList from "./Components/DeleteList";
import ListingContainer from "./Components/ListingContainer";
import { PageWrapper } from "./Components/StyledComponents";
import { useStyles } from "./Styles/Index";

function ActivitiesForGmat(props) {
  const [activityList, setActivityList] = useState([]);
  const [snack, setSnack] = useState({
    snackOpen: false,
    snackMsg: "",
    snackColor: "",
  });
  const [selectedActivity, setSelectedActivity] = useState([]);
  const classes = useStyles();
  const getAndSetSelectedActivity = () => {
    getStudentActivitiesGmat(
      props.match.params.studentId,
      props.match.params.productId
    ).then((response) => {
      if (response.status === 200) {
        setSelectedActivity(response.data.data);
      }
    });
  };

  useEffect(() => {
    getPgaActivitiesGmat().then((response) => {
      if (response.status === 200) {
        setActivityList(response.data.data);
      }
    });
    getAndSetSelectedActivity();
  }, []);
  const handleAddClick = (activity) => {
    if (
      selectedActivity.filter((el) => el.pgaActivities.id === activity.id)
        .length === 0
    ) {
      setSelectedActivity([
        ...selectedActivity,
        {
          id: null,
          pgaActivities: { ...activity },
          activities: activity.activities,
        },
      ]);
    }
  };

  const handleChange = (e, index) => {
    let copyOf = [...selectedActivity];
    copyOf[index].activities = e.target.value;
    setSelectedActivity(copyOf);
  };

  const handleDeleteClick = (activity, index) => {
    if (activity.id) {
      deleteStudentPgaActivitiesGmat(
        props.match.params.studentId,
        props.match.params.productId,
        activity.id
      ).then((response) => {
        if (response.status === 200) {
          getAndSetSelectedActivity();
        }
      });
    } else {
      let copyOf = [...selectedActivity];
      copyOf.splice(index, 1);
      setSelectedActivity(copyOf);
    }
  };

  const handleSave = () => {
    let error = false;
    for (let i = 0; i < selectedActivity.length; i++) {
      if (isEmptyString(selectedActivity[i].activities)) {
        error = true;
        break;
      }
    }
    if (!error) {
      savePgaActivitiesGmat(
        props.match.params.studentId,
        props.match.params.productId,
        selectedActivity
      ).then((response) => {
        if (response.status === 200) {
          getAndSetSelectedActivity();
          setSnack({
            snackMsg: "Saved Successfully",
            snackColor: "success",
            snackOpen: true,
          });
        }
      });
    } else {
      setSnack({
        snackMsg: HELPER_TEXT.requiredField,
        snackColor: "error",
        snackOpen: true,
      });
    }
  };

  return (
    <PageWrapper>
      <Grid container spacing={2} className={classes.containerStyle}>
        <Grid item md={6} lg={6} xl={6} className={classes.columnDivider}>
          <Grid container spacing={2}>
            <Grid item md={12} lg={12} xl={12}>
              <Typography variant={"h5"}>
                List Of Activities After GMAT
              </Typography>
            </Grid>
            <Grid item md={12} lg={12} xl={12}>
              {activityList.map((eachAct, index) => {
                return (
                  <ListingContainer
                    addText={
                      selectedActivity.filter(
                        (el) => el.pgaActivities.id === eachAct.id
                      ).length > 0
                        ? "Added"
                        : "Add"
                    }
                    buttonColor={
                      selectedActivity.filter(
                        (el) => el.pgaActivities.id === eachAct.id
                      ).length > 0
                        ? colors.green
                        : colors.primaryColor
                    }
                    handleAddClick={() => handleAddClick(eachAct)}
                    containerColor={index % 2 === 0 && colors.ashColor}
                    content={eachAct.activities}
                  />
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <Grid container spacing={2}>
            <Grid
              item
              md={12}
              lg={12}
              xl={12}
              container
              alignItems={"center"}
              className={classes.sampleSchoolHeading}
            >
              <Typography variant={"h5"}>
                Selected List Of Activities After GMAT
              </Typography>
              <Typography color={"textSecondary"}>
                ({selectedActivity.length})
              </Typography>
            </Grid>
            <Grid item md={12} lg={12} xl={12}>
              {selectedActivity.map((eachAct, ind) => {
                return (
                  <DeleteList
                    value={eachAct.activities}
                    onChange={(e) => handleChange(e, ind)}
                    onDeleteClick={() => handleDeleteClick(eachAct, ind)}
                  />
                );
              })}
            </Grid>
          </Grid>
        </Grid>
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

export default ActivitiesForGmat;
