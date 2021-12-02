import { Dialog, Grid, IconButton, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { colors, HELPER_TEXT } from '../../Constant/Variables';
import DropDown from '../Controls/DropDown';
import TextFieldComponent from '../Controls/TextField';
import BottomContainer from './BottomContainer';
import {
  AddButton,
  FlexView,
  PageWrapper,
  StyledButton,
  TransitionImg,
  WhiteBox,
} from './Components/StyledComponents';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import { useStyles } from './Styles/Index';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../Actions/Course';
import {
  deleteStudentSpecializationTrack,
  getDefaultCareerTrack,
  getSpecializationTrack,
  getStudentSpecializationTrack,
  saveStudentSpecializationTrack,
} from '../../AsyncApiCall/PgaReport/SpecializationTrack';
import { isEmptyObject } from '../Validation';
import MySnackBar from '../MySnackBar';
import Search from '../../Asset/icons/search.svg';
import { generateCareerTracks } from '../../Actions/PgaReportAction';
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
    snackMsg: '',
    snackColor: '',
  });
  const [open, setOpen] = useState(false);

  const { CourseList } = useSelector(state => state.CourseReducer);
  const dispatch = useDispatch();
  const classes = useStyles();

  const getAndSetStudentSpecializationTrack = () => {
    getStudentSpecializationTrack(
      props.match.params.studentId,
      props.match.params.productId
    ).then(response => {
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
    getSpecializationTrack().then(response => {
      if (response.status === 200) {
        setTrackNameList(response.data.data);
      }
    });
    getDefaultCareerTrack().then(response => {
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
    let error = { value: false, text: '' };
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
      // if (isEmptyObject(studentSpecializationTrack[index].selectedCoursesTwo)) {
      //   error.value = true;
      //   error.text = HELPER_TEXT.requiredField;
      //   break;
      // }
      // if (
      //   studentSpecializationTrack[index].selectedCoursesOne.id ===
      //   studentSpecializationTrack[index].selectedCoursesTwo.id
      // ) {
      //   error.value = true;
      //   error.text = 'Course One And Course Two Cannot Be Equal';
      //   break;
      // }
    }
    if (!error.value) {
      saveStudentSpecializationTrack(
        props.match.params.studentId,
        props.match.params.productId,
        studentSpecializationTrack
      ).then(response => {
        if (response.status === 200) {
          getAndSetStudentSpecializationTrack();
          props.handlePageChange('pgaResumeQuestionnaire');
        }
      });
    } else {
      setSnack({
        snackMsg: error.text,
        snackColor: 'error',
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
      ).then(response => {
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

  const { generateCareerTracksStatus } = useSelector(
    state => state.PgaReportReducer
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

  return (
    <PageWrapper>
      <div className={classes.specializationWrapper}>
        <Grid container spacing={2}>
          <Grid item sm={7} md={7} xs={7} lg={7} xl={7}>
            <Typography variant={'h5'}>
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
            justifyContent={'flex-end'}
          >
            <FlexView>
              <StyledButton
                isOutlined={false}
                variant={'contained'}
                onClick={handleCareerTrackClick}
              >
                {'Generate Career Tracks'}
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
                    id='combo-box-demo'
                    options={trackNameList}
                    value={eachSpec.pgaTrack}
                    onChange={(e, value) =>
                      handleDropDownChange(value, index, 'pgaTrack')
                    }
                    getOptionLabel={option => option.name}
                    renderInput={params => (
                      <TextFieldComponent
                        {...params}
                        label={'Plan Name'}
                        variant='standard'
                      />
                    )}
                  />
                </Grid>
                <Grid item md={9}></Grid>
                <Grid item md={3}>
                  <DropDown
                    id='combo-box-demo'
                    options={careerTrackList}
                    value={eachSpec.pgaCareerTrack}
                    onChange={(e, value) =>
                      handleDropDownChange(value, index, 'pgaCareerTrack')
                    }
                    getOptionLabel={option => option.name}
                    renderInput={params => (
                      <TextFieldComponent
                        {...params}
                        label='Career Track'
                        variant='standard'
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4}>
                  <DropDown
                    id='combo-box-demo'
                    options={CourseList}
                    value={eachSpec.selectedCoursesOne}
                    onChange={(e, value) =>
                      handleDropDownChange(value, index, 'selectedCoursesOne')
                    }
                    getOptionLabel={option => option.name}
                    renderInput={params => (
                      <TextFieldComponent
                        {...params}
                        label='Course One'
                        variant='standard'
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4}>
                  <DropDown
                    id='combo-box-demo'
                    options={CourseList}
                    value={eachSpec.selectedCoursesTwo}
                    onChange={(e, value) =>
                      handleDropDownChange(value, index, 'selectedCoursesTwo')
                    }
                    getOptionLabel={option => option.name}
                    renderInput={params => (
                      <TextFieldComponent
                        {...params}
                        label='Course Two'
                        variant='standard'
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  md={1}
                  container
                  justifyContent={'flex-end'}
                  alignItems={'center'}
                >
                  <IconButton onClick={() => handleDelete(eachSpec, index)}>
                    <DeleteOutlineRoundedIcon color={'secondary'} />
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
            snackMsg: '',
            snackColor: '',
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
    </PageWrapper>
  );
}

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
];

export default SpecializationTrack;
