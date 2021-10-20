import { Grid, IconButton, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { colors, HELPER_TEXT } from "../../Constant/Variables";
import DropDown from "../Controls/DropDown";
import TextFieldComponent from "../Controls/TextField";
import BottomContainer from "./BottomContainer";
import { AddButton, PageWrapper } from "./Components/StyledComponents";
import { useStyles } from "./Styles/Index";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import {
  deleteAdditionalPoints,
  getAllAdditionalPoints,
  getStudentAdditionalPoints,
  saveAdditionalPoints,
} from "../../AsyncApiCall/PgaReport/AdditionalPoint";
import MySnackBar from "../MySnackBar";
import { isEmptyObject, isEmptyString } from "../Validation";
function ProfileFit(props) {
  const classes = useStyles();
  const [allAdditionalPointsList, setAllAdditionalPointsList] = useState([]);
  const [studentAdditionalPoints, setStudentAdditionalPoints] = useState([]);
  const [snack, setSnack] = useState({
    snackOpen: false,
    snackMsg: "",
    snackColor: "",
  });
  const getAndSetStudentAdditionalPoints = () => {
    getStudentAdditionalPoints(
      props.match.params.studentId,
      props.match.params.productId
    ).then((response) => {
      if (response.status === 200) {
        if (response.data.data.length === 0) {
          setStudentAdditionalPoints([
            { id: null, pgaAdditionalPoint: null, remark: "" },
          ]);
        } else {
          setStudentAdditionalPoints(response.data.data);
        }
      }
    });
  };

  useEffect(() => {
    getAllAdditionalPoints().then((response) => {
      if (response.status === 200) {
        setAllAdditionalPointsList(response.data.data);
      }
    });
    getAndSetStudentAdditionalPoints();
  }, []);

  const handleAddClick = () => {
    setStudentAdditionalPoints([
      ...studentAdditionalPoints,
      { id: null, pgaAdditionalPoint: null, remark: "" },
    ]);
  };

  const handleAdditionalPointChange = (value, index) => {
    let copyOf = [...studentAdditionalPoints];
    copyOf[index].pgaAdditionalPoint = value;
    copyOf[index].remark = value ? value.remark : "";
    setStudentAdditionalPoints(copyOf);
  };

  const handleTextChange = (e, index) => {
    let copyOf = [...studentAdditionalPoints];
    copyOf[index][e.target.name] = e.target.value;
    setStudentAdditionalPoints(copyOf);
  };

  const handleSave = () => {
    let error = false;
    for (let index = 0; index < studentAdditionalPoints.length; index++) {
      if (isEmptyObject(studentAdditionalPoints[index].pgaAdditionalPoint)) {
        error = true;
        break;
      }
      if (isEmptyString(studentAdditionalPoints[index].remark)) {
        error = true;
        break;
      }
    }
    if (!error) {
      saveAdditionalPoints(
        props.match.params.studentId,
        props.match.params.productId,
        studentAdditionalPoints
      ).then((response) => {
        if (response.status === 200) {
          getAndSetStudentAdditionalPoints();
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

  const handleDelete = (item, index) => {
    if (item.id) {
      deleteAdditionalPoints(item.id).then((response) => {
        if (response.status === 200) {
          getAndSetStudentAdditionalPoints();
        }
      });
    } else {
      let copyOf = [...studentAdditionalPoints];
      if (copyOf.length !== 1) {
        copyOf.splice(index, 1);
        setStudentAdditionalPoints(copyOf);
      }
    }
  };
  return (
    <PageWrapper>
      <Grid container className={classes.containerStyle}>
        <Grid item md={8}>
          <Grid container spacing={2}>
            <Grid item md={10}>
              <Typography variant={"h5"}>Profile Fit Graph</Typography>
            </Grid>
            <Grid item md={2} container justifyContent={"flex-end"}>
              <AddButton color={colors.primaryColor} onClick={handleAddClick}>
                Add
              </AddButton>
            </Grid>
            {studentAdditionalPoints.map((eachItem, index) => {
              return (
                <>
                  <Grid item md={3}>
                    <DropDown
                      id="combo-box-demo"
                      options={allAdditionalPointsList}
                      getOptionLabel={(option) => option.name}
                      value={eachItem.pgaAdditionalPoint}
                      onChange={(e, value) =>
                        handleAdditionalPointChange(value, index)
                      }
                      renderInput={(params) => (
                        <TextFieldComponent
                          {...params}
                          label="Profile Fit"
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={9}></Grid>
                  <Grid item md={11}>
                    <TextFieldComponent
                      name={"remark"}
                      multiline
                      minRows={4}
                      onChange={(e) => handleTextChange(e, index)}
                      value={eachItem.remark}
                      label={"Description"}
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={1}>
                    <IconButton onClick={() => handleDelete(eachItem, index)}>
                      <DeleteOutlineRoundedIcon color={"secondary"} />
                    </IconButton>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Grid>
        <Grid item md={4}></Grid>
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

export default ProfileFit;
