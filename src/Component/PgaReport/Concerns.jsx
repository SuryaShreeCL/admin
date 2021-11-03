import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  deleteStudentPgaConcern,
  getPgaConcerns,
  getStudentConcerns,
  savePgaConcern,
} from "../../AsyncApiCall/PgaReport/Concerns";
import { colors, HELPER_TEXT } from "../../Constant/Variables";
import MySnackBar from "../MySnackBar";
import { isEmptyString } from "../Validation";
import BottomContainer from "./BottomContainer";
import DeleteList from "./Components/DeleteList";
import ListingContainer from "./Components/ListingContainer";
import { PageWrapper } from "./Components/StyledComponents";
import { useStyles } from "./Styles/Index";

function Concerns(props) {
  const [concernList, setConcernList] = useState([]);
  const [snack, setSnack] = useState({
    snackOpen: false,
    snackMsg: "",
    snackColor: "",
  });
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const classes = useStyles();
  const getAndSetSelectedConcerns = () => {
    getStudentConcerns(
      props.match.params.studentId,
      props.match.params.productId
    ).then((response) => {
      if (response.status === 200) {
        setSelectedConcerns(response.data.data);
      }
    });
  };

  useEffect(() => {
    getPgaConcerns().then((response) => {
      if (response.status === 200) {
        setConcernList(response.data.data);
      }
    });
    getAndSetSelectedConcerns();
  }, []);
  const handleAddClick = (concern) => {
    if (
      selectedConcerns.filter((el) => el.pgaConcerns.id === concern.id)
        .length === 0
    ) {
      setSelectedConcerns([
        ...selectedConcerns,
        { id: null, pgaConcerns: { ...concern }, concern: concern.concern },
      ]);
    }else{
      setSnack({
        snackOpen: true,
        snackMsg: "Concern Already Added",
        snackColor: "info",
      })
    }
  };
  const handleChange = (e, index) => {
    let copyOf = [...selectedConcerns];
    copyOf[index].concern = e.target.value;
    setSelectedConcerns(copyOf);
  };
  const handleDeleteClick = (concern, index) => {
    if (concern.id) {
      deleteStudentPgaConcern(
        props.match.params.studentId,
        props.match.params.productId,
        concern.id
      ).then((response) => {
        if (response.status === 200) {
          getAndSetSelectedConcerns();
        }
      });
    } else {
      let copyOf = [...selectedConcerns];
      copyOf.splice(index, 1);
      setSelectedConcerns(copyOf);
    }
  };

  const handleSave = () => {
    let error = false;
    for (let i = 0; i < selectedConcerns.length; i++) {
      if (isEmptyString(selectedConcerns[i].concern)) {
        error = true;
        break;
      }
    }
    if (!error) {
      savePgaConcern(
        props.match.params.studentId,
        props.match.params.productId,
        selectedConcerns
      ).then((response) => {
        if (response.status === 200) {
          getAndSetSelectedConcerns();
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
              <Typography variant={"h5"}>List of Concerns</Typography>
            </Grid>
            <Grid item md={12} lg={12} xl={12}>
              {concernList.map((eachConcern, index) => {
                return (
                  <ListingContainer
                    addText={
                      selectedConcerns.filter(
                        (el) => el.pgaConcerns.id === eachConcern.id
                      ).length > 0
                        ? "Added"
                        : "Add"
                    }
                    buttonColor={
                      selectedConcerns.filter(
                        (el) => el.pgaConcerns.id === eachConcern.id
                      ).length > 0
                        ? colors.green
                        : colors.primaryColor
                    }
                    handleAddClick={() => handleAddClick(eachConcern)}
                    containerColor={index % 2 === 0 && colors.ashColor}
                    content={eachConcern.concern}
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
              <Typography variant={"h5"}>Selected Concerns</Typography>
              <Typography color={"textSecondary"}>
                ({selectedConcerns.length})
              </Typography>
            </Grid>
            <Grid item md={12} lg={12} xl={12}>
              {selectedConcerns.map((eachCon, ind) => {
                return (
                  <DeleteList
                    value={eachCon.concern}
                    onChange={(e) => handleChange(e, ind)}
                    onDeleteClick={() => handleDeleteClick(eachCon, ind)}
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

export default Concerns;
