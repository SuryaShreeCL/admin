import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  deleteStudentPgaStrength,
  getPgaStrength,
  getStudentPgaStrength,
  savePgaStrength,
} from "../../AsyncApiCall/PgaReport/Strength";
import { colors, HELPER_TEXT } from "../../Constant/Variables";
import MySnackBar from "../MySnackBar";
import { isEmptyString } from "../Validation";
import BottomContainer from "./BottomContainer";
import DeleteList from "./Components/DeleteList";
import ListingContainer from "./Components/ListingContainer";
import { PageWrapper } from "./Components/StyledComponents";
import { useStyles } from "./Styles/Index";

function Strengths(props) {
  const [strengthList, setStrengthList] = useState([]);
  const [snack, setSnack] = useState({
    snackOpen: false,
    snackMsg: "",
    snackColor: "",
  });
  const [selectedStrengths, setSelectedStrengths] = useState([]);
  const classes = useStyles();
  const getAndSetSelectedStrength = () => {
    getStudentPgaStrength(
      props.match.params.studentId,
      props.match.params.productId
    ).then((response) => {
      if (response.status === 200) {
        setSelectedStrengths(response.data.data);
      }
    });
  };

  useEffect(() => {
    getPgaStrength().then((response) => {
      if (response.status === 200) {
        setStrengthList(response.data.data);
      }
    });
    getAndSetSelectedStrength();
  }, []);
  const handleAddClick = (strength) => {
    if (
      selectedStrengths.filter((el) => el.pgaStrength.id === strength.id)
        .length === 0
    ) {
      setSelectedStrengths([
        ...selectedStrengths,
        { id: null, pgaStrength: { ...strength }, strength: strength.strength },
      ]);
    }else{
      setSnack({
        snackOpen: true,
        snackMsg: "This Strength Already Added",
        snackColor: "info",
      })
    }
  };
  const handleChange = (e, index) => {
    let copyOf = [...selectedStrengths];
    copyOf[index].strength = e.target.value;
    setSelectedStrengths(copyOf);
  };
  const handleDeleteClick = (strength, index) => {
    if (strength.id) {
      deleteStudentPgaStrength(
        props.match.params.studentId,
        props.match.params.productId,
        strength.id
      ).then((response) => {
        if (response.status === 200) {
          getAndSetSelectedStrength();
        }
      });
    } else {
      let copyOf = [...selectedStrengths];
      copyOf.splice(index, 1);
      setSelectedStrengths(copyOf);
    }
  };

  const handleSave = () => {
    let error = false;
    for (let i = 0; i < selectedStrengths.length; i++) {
      if (isEmptyString(selectedStrengths[i].strength)) {
        error = true;
        break;
      }
    }
    if (!error) {
      savePgaStrength(
        props.match.params.studentId,
        props.match.params.productId,
        selectedStrengths
      ).then((response) => {
        if (response.status === 200) {
          getAndSetSelectedStrength();
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
              <Typography variant={"h5"}>List of Strengths</Typography>
            </Grid>
            <Grid item md={12} lg={12} xl={12}>
              {strengthList.map((eachStrength, index) => {
                return (
                  <ListingContainer
                    addText={
                      selectedStrengths.filter(
                        (el) => el.pgaStrength.id === eachStrength.id
                      ).length > 0
                        ? "Added"
                        : "Add"
                    }
                    buttonColor={
                      selectedStrengths.filter(
                        (el) => el.pgaStrength.id === eachStrength.id
                      ).length > 0
                        ? colors.green
                        : colors.primaryColor
                    }
                    handleAddClick={() => handleAddClick(eachStrength)}
                    containerColor={index % 2 === 0 && colors.ashColor}
                    content={eachStrength.strength}
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
              className={classes.sampleSchoolHeading}
              container
              alignItems={"center"}
            >
              <Typography variant={"h5"}>Selected Strengths</Typography>
              <Typography color={"textSecondary"}>
                ({selectedStrengths.length})
              </Typography>
            </Grid>
            <Grid item md={12} lg={12} xl={12}>
              {selectedStrengths.map((eachStr, ind) => {
                return (
                  <DeleteList
                    value={eachStr.strength}
                    onChange={(e) => handleChange(e, ind)}
                    onDeleteClick={() => handleDeleteClick(eachStr, ind)}
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

export default Strengths;
