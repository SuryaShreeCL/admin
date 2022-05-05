import { Dialog, Grid, IconButton, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { colors, HELPER_TEXT } from "../../Constant/Variables";
import DropDown from "../Controls/DropDown";
import TextFieldComponent from "../Controls/TextField";
import BottomContainer from "./BottomContainer";
import {
  AddButton,
  FlexView,
  PageWrapper,
  StyledButton,
  TransitionImg,
  WhiteBox,
} from "./Components/StyledComponents";
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
import Search from "../../Asset/icons/search.svg";
import {
  generateCareerTracks,
  careerTrackProfileSimilarity,
} from "../../Actions/PgaReportAction";
import {
  filterOptions,
  ProfileSimilarityCheckerPopup,
} from "./Components/ProfileSimilarityCheckerPopup";
import CollapseViewer from "./Components/CollapseViewer";
import { CardViewComponent } from "./Components/CardView";
import {
  CardTitle,
  CardView,
  SingleText,
  StyledList,
} from "../../Asset/StyledComponent";

const starterPacksList = [
  "Career Plan",
  "Preferred Career Track",
  "Course Selection 1",
  "Course Selection 2",
];
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
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
  const [isFilterChange, setIsFilterChange] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [collapseList, setCollapseList] = useState([]);
  const [addedList, setAddedList] = useState([]);

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
    handleFilterChangeChange(null, selectedFilter);
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
    }
    if (!error.value) {
      saveStudentSpecializationTrack(
        props.match.params.studentId,
        props.match.params.productId,
        studentSpecializationTrack
      ).then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("yes");
          setSnack({
            snackMsg: "Saved Successfully",
            snackColor: "success",
            snackOpen: true,
          });
          getAndSetStudentSpecializationTrack();
          props.handlePageChange("pgaResumeQuestionnaire");
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
          handleRemoveCareerTack(spec.trackId);
        }
      });
    } else {
      let copyOf = [...studentSpecializationTrack];
      if (copyOf.length !== 1) {
        copyOf.splice(index, 1);
        setStudentSpecializationTrack(copyOf);
      }
      handleRemoveCareerTack(spec.trackId);
    }
  };

  const handleRemoveCareerTack = (id) => {
    if (id) {
      let arr = [...addedList];
      let index = arr.indexOf(id);
      if (index > -1) arr.splice(index, 1);
      setAddedList(arr);
    }
  };

  const { generateCareerTracksStatus, trackProfileSimilarity } = useSelector(
    (state) => state.PgaReportReducer
  );

  useEffect(() => {
    if (
      generateCareerTracksStatus &&
      generateCareerTracksStatus.success &&
      !open
    ) {
      getAndSetStudentSpecializationTrack();
    }
  }, [generateCareerTracksStatus, open]);

  useEffect(() => {
    if (
      trackProfileSimilarity &&
      trackProfileSimilarity.success &&
      isFilterChange
    ) {
      setDialogData(trackProfileSimilarity.data);
    }
  }, [trackProfileSimilarity, isFilterChange]);

  const handleCareerTrackClick = () => {
    dispatch(
      generateCareerTracks(
        props.match.params.studentId,
        props.match.params.productId
      )
    );
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3500);
  };

  const handleFilterChangeChange = (event, value) => {
    if (value) {
      setSelectedFilter(value);
      const { studentId, productId } = props.match.params;
      dispatch(careerTrackProfileSimilarity(studentId, productId, value.value));
      setIsFilterChange(true);
    }
  };

  const handleShowDetails = (id) => {
    let arr = [...collapseList];
    let index = arr.indexOf(id);
    if (index > -1) arr.splice(index, 1);
    else arr.push(id);
    setCollapseList(arr);
  };

  const handleAddCareerTack = (object) => {
    const { id, trackId, value } = object;
    let arr = [...addedList];
    let index = arr.indexOf(trackId);
    let specializationTrack = [...studentSpecializationTrack];
    let addValueIndex = specializationTrack.findIndex(
      (element) => element.id === value.id && value.id
    );

    if (index > -1) {
      arr.splice(index, 1);
      specializationTrack.splice(addValueIndex, 1);
    } else {
      arr.push(trackId);
      if (addValueIndex > -1) specializationTrack[addValueIndex] = value;
      else specializationTrack.push(value);
    }
    setAddedList(arr);
    setStudentSpecializationTrack(specializationTrack);
  };

  const renderDialogMainContent = () => {
    return (
      dialogData &&
      dialogData.lenth !== 0 &&
      dialogData.map(
        ({
          studentName,
          studentId,
          advancedCourses,
          areaOfInterests,
          result,
        }) => {
          return (
            <CollapseViewer
              show={collapseList.indexOf(studentId) > -1}
              title={studentName}
              id={studentId}
              handleShowDetails={handleShowDetails}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CardTitle>{"Starter Packs"}</CardTitle>
                </Grid>
                {result &&
                  result.length !== 0 &&
                  result.map((item, index) => {
                    const {
                      id,
                      trackId,
                      pgaCareerTrack,
                      pgaTrack,
                      selectedCoursesOne,
                      selectedCoursesTwo,
                    } = item;
                    return (
                      <Grid item xs={6}>
                        <CardViewComponent
                          titleText={`Starter Packs ${index + 1}`}
                          buttonText={
                            addedList.indexOf(trackId) > -1 ? "Added" : "Add"
                          }
                          buttonStatus={addedList.indexOf(trackId) > -1}
                          handleClick={handleAddCareerTack}
                          leftContent={starterPacksList}
                          rightContent={[
                            pgaTrack && pgaTrack.name,
                            pgaCareerTrack && pgaCareerTrack.name,
                            selectedCoursesOne && selectedCoursesOne.name,
                            selectedCoursesTwo && selectedCoursesTwo.name,
                          ]}
                          object={{ id: id, trackId: trackId, value: item }}
                        />
                      </Grid>
                    );
                  })}
                <Grid item xs={12}>
                  <CardTitle>{"Advanced Courses"}</CardTitle>
                </Grid>
                {advancedCourses &&
                  advancedCourses.length !== 0 &&
                  advancedCourses.map(({ name }) => {
                    return (
                      <Grid item xs={6}>
                        <CardView>
                          <SingleText>{name}</SingleText>
                        </CardView>
                      </Grid>
                    );
                  })}
                <Grid item xs={12}>
                  <CardTitle>{"Interest Details"}</CardTitle>
                </Grid>
                {areaOfInterests && areaOfInterests.length !== 0 && (
                  <Grid item xs={6}>
                    <CardView>
                      <StyledList>
                        {areaOfInterests.map(({ interest }) => {
                          return (
                            <li>
                              <span>{interest}</span>
                            </li>
                          );
                        })}
                      </StyledList>
                    </CardView>
                  </Grid>
                )}
              </Grid>
            </CollapseViewer>
          );
        }
      )
    );
  };
console.log(CourseList)
  return (
    <PageWrapper>
      <div className={classes.specializationWrapper}>
        <Grid container spacing={2}>
          <Grid item sm={7} md={7} xs={7} lg={7} xl={7}>
            <Typography variant={"h5"}>
              Suggested Specialization Tracks
            </Typography>
          </Grid>
          <Grid
            item
            sm={5}
            md={5}
            xs={5}
            lg={5}
            xl={5}
            container
            justifyContent={"flex-end"}
          >
            <FlexView>
              <StyledButton
                isOutlined={false}
                variant={"contained"}
                onClick={handleCareerTrackClick}
              >
                {"Generate Career Tracks"}
              </StyledButton>
              <AddButton onClick={handleAddClick} color={colors.primaryColor}>
                Add
              </AddButton>
            </FlexView>
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
                        label={"Plan Name"}
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
                    getOptionLabel={(option) => option.displayName}
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
                    getOptionLabel={(option) => option.displayName}
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
      <Dialog
        open={open}
        classes={{ paper: classes.paperBorder }}
        disableBackdropClick
      >
        <WhiteBox>
          <TransitionImg src={Search} />
        </WhiteBox>
      </Dialog>

      <ProfileSimilarityCheckerPopup
        dialogOpen={props.popupStatus}
        handlePopupClose={props.handleDialogClose}
        value={selectedFilter}
        handleDropdownChange={handleFilterChangeChange}
        count={dialogData && dialogData.length}
      >
        <Grid container spacing={1}>
          <Grid item={12} className={"details_box_style"}>
            {renderDialogMainContent()}
          </Grid>
        </Grid>
      </ProfileSimilarityCheckerPopup>
    </PageWrapper>
  );
}

export default SpecializationTrack;
