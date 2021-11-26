import { Grid, IconButton, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { colors, HELPER_TEXT } from "../../Constant/Variables";
import DropDown from "../Controls/DropDown";
import TextFieldComponent from "../Controls/TextField";
import BottomContainer from "./BottomContainer";
import { AddButton, PageWrapper } from "./Components/StyledComponents";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import { useStyles } from "./Styles/Index";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../Actions/Course";
import {
  deleteStudentSpecializationTrack,
  getDefaultCareerTrack,
  getSpecializationTrack,
  getStudentSpecializationTrack,
  saveStudentSpecializationTrack,
} from "../../AsyncApiCall/PgaReport/SpecializationTrack";
import { isEmptyObject } from "../Validation";
import MySnackBar from "../MySnackBar";
function SpecializationTrack(props) {
  const [studentSpecializationTrack, setStudentSpecializationTrack] = useState([
    {
      id: null,
      pgaTrack: null,
      pgaCareerTrack: null,
      selectedCoursesOne: null,
      selectedCoursesTwo: null,
    },
  ]);
  const [trackNameList, setTrackNameList] = useState([]);
  const [careerTrackList, setCareerTrackList] = useState([]);
  const [snack, setSnack] = useState({
    snackOpen: false,
    snackMsg: "",
    snackColor: "",
  });
  const { CourseList } = useSelector((state) => state.CourseReducer);
  const dispatch = useDispatch();
  const classes = useStyles();

  const getAndSetStudentSpecializationTrack = () => {
    getStudentSpecializationTrack(
      props.match.params.studentId,
      props.match.params.productId
    ).then((response) => {
      if (response.status === 200) {
        if (response.data.data.length === 0) {
          setStudentSpecializationTrack([
            {
              id: null,
              pgaTrack: null,
              pgaCareerTrack: null,
              selectedCoursesOne: null,
              selectedCoursesTwo: null,
            },
          ]);
        } else {
          setStudentSpecializationTrack(response.data.data);
        }
      }
    });
  };

  useEffect(() => {
    dispatch(getCourses());
    getSpecializationTrack().then((response) => {
      if (response.status === 200) {
        setTrackNameList(response.data.data);
      }
    });
    getDefaultCareerTrack().then((response) => {
      if (response.status === 200) {
        setCareerTrackList(response.data.data);
      }
    });
    getAndSetStudentSpecializationTrack();
  }, []);

  const handleAddClick = () => {
    setStudentSpecializationTrack([
      ...studentSpecializationTrack,
      {
        id: null,
        pgaTrack: null,
        pgaCareerTrack: null,
        selectedCoursesOne: null,
        selectedCoursesTwo: null,
      },
    ]);
  };

  const handleDropDownChange = (value, index, name) => {
    let copyOf = [...studentSpecializationTrack];
    copyOf[index][name] = value;
    setStudentSpecializationTrack(copyOf);
  };

  const handleSave = () => {
    let error = { value: false, text: "" };
    for (let index = 0; index < studentSpecializationTrack.length; index++) {
      if (isEmptyObject(studentSpecializationTrack[index].pgaTrack)) {
        error.value = true;
        error.text = HELPER_TEXT.requiredField;
        break;
      }
      if (isEmptyObject(studentSpecializationTrack[index].pgaCareerTrack)) {
        error.value = true;
        error.text = HELPER_TEXT.requiredField;
        break;
      }
      if (isEmptyObject(studentSpecializationTrack[index].selectedCoursesOne)) {
        error.value = true;
        error.text = HELPER_TEXT.requiredField;
        break;
      }
      if (isEmptyObject(studentSpecializationTrack[index].selectedCoursesTwo)) {
        error.value = true;
        error.text = HELPER_TEXT.requiredField;
        break;
      }
      if (
        studentSpecializationTrack[index].selectedCoursesOne.id ===
        studentSpecializationTrack[index].selectedCoursesTwo.id
      ) {
        error.value = true;
        error.text = "Course One And Course Two Cannot Be Equal";
        break;
      }
    }
    if (!error.value) {
      saveStudentSpecializationTrack(
        props.match.params.studentId,
        props.match.params.productId,
        studentSpecializationTrack
      ).then((response) => {
        if (response.status === 200) {
          setSnack({
            snackMsg: "Saved Successfully",
            snackColor: "success",
            snackOpen: true,
          });
          getAndSetStudentSpecializationTrack();
        }
      });
    } else {
      setSnack({
        snackMsg: error.text,
        snackColor: "error",
        snackOpen: true,
      });
    }
  };

  const handleDelete = (spec, index) => {
    if (spec.id) {
      deleteStudentSpecializationTrack(
        props.match.params.studentId,
        props.match.params.productId,
        spec.id
      ).then((response) => {
        if (response.status === 200) {
          getAndSetStudentSpecializationTrack();
        }
      });
    } else {
      let copyOf = [...studentSpecializationTrack];
      if (copyOf.length !== 1) {
        copyOf.splice(index, 1);
        setStudentSpecializationTrack(copyOf);
      }
    }
  };

  return (
    <PageWrapper>
      <div className={classes.specializationWrapper}>
        <Grid container spacing={2}>
          <Grid item sm={10} md={10} xs={10} lg={10} xl={10}>
            <Typography variant={"h5"}>
              Suggested Specialization Tracks
            </Typography>
          </Grid>
          <Grid
            item
            sm={2}
            md={2}
            xs={2}
            lg={2}
            xl={2}
            container
            justifyContent={"flex-end"}
          >
            <AddButton onClick={handleAddClick} color={colors.primaryColor}>
              Add
            </AddButton>
          </Grid>
          {studentSpecializationTrack.map((eachSpec, index) => {
            return (
              <>
                <Grid item md={3}>
                  <DropDown
                    id="combo-box-demo"
                    options={trackNameList}
                    value={eachSpec.pgaTrack}
                    onChange={(e, value) =>
                      handleDropDownChange(value, index, "pgaTrack")
                    }
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextFieldComponent
                        {...params}
                        label="Track Name"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={9}></Grid>
                <Grid item md={3}>
                  <DropDown
                    id="combo-box-demo"
                    options={careerTrackList}
                    value={eachSpec.pgaCareerTrack}
                    onChange={(e, value) =>
                      handleDropDownChange(value, index, "pgaCareerTrack")
                    }
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextFieldComponent
                        {...params}
                        label="Career Track"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4}>
                  <DropDown
                    id="combo-box-demo"
                    options={CourseList}
                    value={eachSpec.selectedCoursesOne}
                    onChange={(e, value) =>
                      handleDropDownChange(value, index, "selectedCoursesOne")
                    }
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextFieldComponent
                        {...params}
                        label="Course One"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4}>
                  <DropDown
                    id="combo-box-demo"
                    options={CourseList}
                    value={eachSpec.selectedCoursesTwo}
                    onChange={(e, value) =>
                      handleDropDownChange(value, index, "selectedCoursesTwo")
                    }
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextFieldComponent
                        {...params}
                        label="Course Two"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  md={1}
                  container
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                >
                  <IconButton onClick={() => handleDelete(eachSpec, index)}>
                    <DeleteOutlineRoundedIcon color={"secondary"} />
                  </IconButton>
                </Grid>
              </>
            );
          })}
        </Grid>
        <BottomContainer onClick={handleSave} />
      </div>
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

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
];

export default SpecializationTrack;
