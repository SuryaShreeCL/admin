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
  deleteStudentProfileFit,
  getPgaProfileFitList,
  getStudentProfileFit,
  savePgaProfileFit,
} from "../../AsyncApiCall/PgaReport/ProfileFit";
import MySnackBar from "../MySnackBar";
import { isEmptyObject, isEmptyString } from "../Validation";
function ProfileFit(props) {
  const classes = useStyles();
  const [profileFitList, setProfileFitList] = useState([]);
  const [studentProfileFit, setStudentProfileFit] = useState([]);
  const [snack, setSnack] = useState({
    snackOpen: false,
    snackMsg: "",
    snackColor: "",
  });
  const getAndSetStudentProfileFit = () => {
    getStudentProfileFit(
      props.match.params.studentId,
      props.match.params.productId
    ).then((response) => {
      if (response.status === 200) {
        if (response.data.data.length === 0) {
          setStudentProfileFit([
            { id: null, pgaProfileFit: null, description: "" },
          ]);
        } else {
          setStudentProfileFit(response.data.data);
        }
      }
    });
  };

  useEffect(() => {
    getPgaProfileFitList().then((response) => {
      if (response.status === 200) {
        setProfileFitList(response.data.data);
      }
    });
    getAndSetStudentProfileFit();
  }, []);

  const handleAddClick = () => {
    setStudentProfileFit([
      ...studentProfileFit,
      { id: null, pgaProfileFit: null, description: "" },
    ]);
  };

  const handleProfileFitChange = (value, index) => {
    let copyOf = [...studentProfileFit];
    copyOf[index].pgaProfileFit = value;
    copyOf[index].description = value ? value.description : "";
    setStudentProfileFit(copyOf);
  };

  const handleTextChange = (e, index) => {
    let copyOf = [...studentProfileFit];
    copyOf[index][e.target.name] = e.target.value;
    setStudentProfileFit(copyOf);
  };

  const handleSave = () => {
    let error = false;
    for (let index = 0; index < studentProfileFit.length; index++) {
      if (isEmptyObject(studentProfileFit[index].pgaProfileFit)) {
        error = true;
        break;
      }
      if (isEmptyString(studentProfileFit[index].description)) {
        error = true;
        break;
      }
    }
    if (!error) {
      savePgaProfileFit(
        props.match.params.studentId,
        props.match.params.productId,
        studentProfileFit
      ).then((response) => {
        if (response.status === 200) {
          getAndSetStudentProfileFit();
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
      deleteStudentProfileFit(props.match.params.studentId, props.match.params.productId ,item.id).then((response) => {
        if (response.status === 200) {
          getAndSetStudentProfileFit();
        }
      });
    } else {
      let copyOf = [...studentProfileFit];
      if (copyOf.length !== 1) {
        copyOf.splice(index, 1);
        setStudentProfileFit(copyOf);
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
            {studentProfileFit.map((eachItem, index) => {
              return (
                <>
                  <Grid item md={3}>
                    <DropDown
                      id="combo-box-demo"
                      options={profileFitList}
                      getOptionLabel={(option) => option.profileFit}
                      value={eachItem.pgaProfileFit}
                      onChange={(e, value) =>
                        handleProfileFitChange(value, index)
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
                      name={"description"}
                      multiline
                      minRows={4}
                      onChange={(e) => handleTextChange(e, index)}
                      value={eachItem.description}
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
