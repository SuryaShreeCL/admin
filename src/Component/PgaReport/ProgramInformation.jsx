import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  deleteStudentPgaProgramInfo,
  getPgaProgramInfo,
  getStudentProgramInfo,
  savePgaProgramInfo,
} from "../../AsyncApiCall/PgaReport/ProgramInfo";
import { colors, HELPER_TEXT } from "../../Constant/Variables";
import MySnackBar from "../MySnackBar";
import { isEmptyString } from "../Validation";
import BottomContainer from "./BottomContainer";
import DeleteList from "./Components/DeleteList";
import ListingContainer from "./Components/ListingContainer";
import { PageWrapper } from "./Components/StyledComponents";
import { useStyles } from "./Styles/Index";

function ProgramInformation(props) {
  const [programList, setProgramList] = useState([]);
  const [snack, setSnack] = useState({
    snackOpen: false,
    snackMsg: "",
    snackColor: "",
  });
  const [selectedProgram, setSelectedProgram] = useState([]);
  const classes = useStyles();
  const getAndSetSelectedProgram = () => {
    getStudentProgramInfo(
      props.match.params.studentId,
      props.match.params.productId
    ).then((response) => {
      if (response.status === 200) {
        setSelectedProgram(response.data.data);
      }
    });
  };

  useEffect(() => {
    getPgaProgramInfo().then((response) => {
      if (response.status === 200) {
        setProgramList(response.data.data);
      }
    });
    getAndSetSelectedProgram();
  }, []);
  const handleAddClick = (program) => {
    if (
      selectedProgram.filter((el) => el.pgaProgramInformation.id === program.id)
        .length === 0
    ) {
      setSelectedProgram([
        ...selectedProgram,
        {
          id: null,
          pgaProgramInformation: { ...program },
          information: program.information,
        },
      ]);
    }
  };
  const handleChange = (e, index) => {
    let copyOf = [...selectedProgram];
    copyOf[index].information = e.target.value;
    setSelectedProgram(copyOf);
  };
  const handleDeleteClick = (program, index) => {
    if (program.id) {
      deleteStudentPgaProgramInfo(
        props.match.params.studentId,
        props.match.params.productId,
        program.id
      ).then((response) => {
        if (response.status === 200) {
          getAndSetSelectedProgram();
        }
      });
    } else {
      let copyOf = [...selectedProgram];
      copyOf.splice(index, 1);
      setSelectedProgram(copyOf);
    }
  };

  const handleSave = () => {
    let error = false;
    for (let i = 0; i < selectedProgram.length; i++) {
      if (isEmptyString(selectedProgram[i].information)) {
        error = true;
        break;
      }
    }
    if (!error) {
      savePgaProgramInfo(
        props.match.params.studentId,
        props.match.params.productId,
        selectedProgram
      ).then((response) => {
        if (response.status === 200) {
          getAndSetSelectedProgram();
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
                List Of Program Information
              </Typography>
            </Grid>
            <Grid item md={12} lg={12} xl={12}>
              {programList.map((eachProgram, index) => {
                return (
                  <ListingContainer
                    addText={
                      selectedProgram.filter(
                        (el) => el.pgaProgramInformation.id === eachProgram.id
                      ).length > 0
                        ? "Added"
                        : "Add"
                    }
                    buttonColor={
                      selectedProgram.filter(
                        (el) => el.pgaProgramInformation.id === eachProgram.id
                      ).length > 0
                        ? colors.green
                        : colors.primaryColor
                    }
                    handleAddClick={() => handleAddClick(eachProgram)}
                    containerColor={index % 2 === 0 && colors.ashColor}
                    content={eachProgram.information}
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
              <Typography variant={"h5"}>Selected Program</Typography>
              <Typography color={"textSecondary"}>
                ({selectedProgram.length})
              </Typography>
            </Grid>
            <Grid item md={12} lg={12} xl={12}>
              {selectedProgram.map((eachPro, ind) => {
                return (
                  <DeleteList
                    value={eachPro.information}
                    onChange={(e) => handleChange(e, ind)}
                    onDeleteClick={() => handleDeleteClick(eachPro, ind)}
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

export default ProgramInformation;
