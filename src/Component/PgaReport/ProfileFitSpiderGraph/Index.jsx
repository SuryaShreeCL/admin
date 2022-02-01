import {
  Backdrop,
  Box,
  Grid,
  IconButton,
  Popper,
  TextField,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getDetails,
  getSpiderGraph,
  getSpiderGraphQuestions,
  putRemarks,
  putSpiderGraphAnswers,
} from '../../../Actions/ProfileFitSpiderGraph';
import {
  BottomContainer,
  ContentFlexWrapper,
  customTheme,
  FlexJustifyView,
  HeaderContainer,
  Paper,
  StyledButton,
  Typo,
  useStyles,
  Wrapper,
} from '../../../Asset/StyledComponents/ProfileFitSpiderGraph';
import MySnackBar from '../../MySnackBar';
import Loader from '../../Utils/controls/Loader';
import Popup from '../../Utils/controls/PopupModel';
import Details from './Details';
import EditQuestionsTable from './EditQuestionsTable';
import QuestionsTable from './QuestionsTable';
import SpiderGraph from './SpiderGraph';

const TITLE = {
  details: 'Profile fit Graph',
  graph: 'Profile fit Graph | Spider Graph',
};

const REQUIRED_ALL_FIELD = 'Please fill all the required field';
const UPDATE_SUCCESS = 'Updated Successfully';

function Index() {
  const classes = useStyles();
  const [state, setState] = useState({
    snackOpen: false,
    snackVariant: '',
    snackMsg: '',
    toggleName: 'details',
    isGraph: true,
    isEdit: true,
    isGenerate: false,
    questionsList: [],
    selectedValues: [],
    details: [],
    graphData: [],
  });
  const [info, setInfo] = useState({
    anchorEl: false,
    whereToMeasure: '',
    howToMeasure: '',
  });
  const [remarkDetails, setRemarkDetails] = useState({
    remark: null,
    remarkStatus: null,
    open: false,
    name: null,
    index: 0,
    questionId: null,
  });
  const {
    snackOpen,
    snackVariant,
    snackMsg,
    toggleName,
    isGraph,
    isEdit,
    isGenerate,
    selectedValues,
    questionsList,
    details,
  } = state;
  const params = useParams();
  const { studentId, productId } = params;
  const dispatch = useDispatch();
  const {
    isLoading,
    spiderGraphQuestions,
    answerUpdateStatus,
    spiderDetails,
    graph,
    updateRemark,
  } = useSelector(state => state.ProfileFitSpiderGraphReducer);

  const handleSnack = (open, color, message) => {
    setState({
      ...state,
      snackOpen: open,
      snackVariant: color,
      snackMsg: message,
    });
  };

  useEffect(() => {
    dispatch(getSpiderGraphQuestions(studentId, productId));
    dispatch(getDetails(studentId, productId));
    dispatch(getSpiderGraph(studentId, productId));
  }, []);

  useEffect(() => {
    if (spiderGraphQuestions) {
      if (spiderGraphQuestions.success) {
        const { data } = spiderGraphQuestions;
        let values =
          (data?.length !== 0 &&
            data.map(
              ({
                mbaSpiderQuestion,
                currentProfile,
                afterCompletingQuestionnaires,
                afterProfileBuilding,
                remarks,
              }) => ({
                mbaSpiderQuestionId: mbaSpiderQuestion?.id,
                currentProfile: currentProfile,
                afterCompletingQuestionnaires: afterCompletingQuestionnaires,
                afterProfileBuilding: afterProfileBuilding,
                remarks: remarks,
              })
            )) ||
          [];
        setState({
          ...state,
          questionsList: data,
          isGenerate: data.length !== 0 && data[0]['id'],
          isEdit: data.length !== 0 && !data[0]['id'],
          selectedValues: [...values],
        });
      } else {
        handleSnack(true, 'error', spiderGraphQuestions.message);
      }
    }
  }, [spiderGraphQuestions]);

  useEffect(() => {
    if (spiderDetails) {
      if (spiderDetails.success) {
        const { data } = spiderDetails;
        setState({ ...state, details: data });
      } else {
        handleSnack(true, 'error', spiderDetails.message);
      }
    }
  }, [spiderDetails]);

  useEffect(() => {
    if (graph) {
      if (graph.success) {
        const { data } = graph;
        setState({ ...state, graphData: data });
      } else {
        handleSnack(true, 'error', graph.message);
      }
    }
  }, [graph]);

  useEffect(() => {
    if (answerUpdateStatus) {
      if (answerUpdateStatus.success) {
        setState({
          ...state,
          isGraph: true,
          isEdit: false,
          snackOpen: true,
          snackMsg: UPDATE_SUCCESS,
          snackVariant: 'success',
        });
        dispatch(getSpiderGraphQuestions(studentId, productId));
        dispatch(getSpiderGraph(studentId, productId));
      } else {
        handleSnack(true, 'error', answerUpdateStatus.message);
      }
    }
  }, [answerUpdateStatus]);

  useEffect(() => {
    if (updateRemark) {
      if (updateRemark.success) {
        const { data } = updateRemark;
        let arr = [...selectedValues];
        arr[remarkDetails.index]['remarks'] = data?.remarks;
        let newQuestionList = [...questionsList];
        newQuestionList[remarkDetails.index]['createdBy'] = data?.createdBy;
        newQuestionList[remarkDetails.index]['remarkDate'] = data?.remarkDate;
        newQuestionList[remarkDetails.index]['remarks'] = data?.remarks;
        setState({
          ...state,
          selectedValues: arr,
          questionsList: newQuestionList,
        });
        setRemarkDetails({
          ...remarkDetails,
          open: false,
          remarkStatus: null,
          name: null,
          index: 0,
          remark: null,
          questionId: null,
        });
      } else {
        handleSnack(true, 'error', updateRemark.message);
      }
    }
  }, [updateRemark]);

  const handleToggleChange = (e, newVal) => {
    let value = newVal || toggleName;
    let displayGraph = (value === 'graph' && isGenerate) || value === 'details';
    setState({
      ...state,
      toggleName: value,
      isGraph: displayGraph,
      isEdit: !isGenerate,
    });
  };

  const handleInputChange = e => {
    const { id, name, value } = e.currentTarget;
    let arr = [...selectedValues];
    let oldValue = arr[id][name];
    let newValue = oldValue === parseFloat(value) ? null : parseFloat(value);
    arr[id][name] = newValue;
    setState({ ...state, selectedValues: arr });
  };

  const handleRemark = (index, value, createdBy, remarkDate, questionId) => {
    setRemarkDetails({
      ...remarkDetails,
      open: true,
      index: index,
      name: value ? 'viewRemark' : 'addRemark',
      remark: value,
      remarkStatus:
        createdBy &&
        remarkDate &&
        `${createdBy} | ${moment(new Date(remarkDate)).format('DD-MM-YYYY')}`,
      questionId: questionId,
    });
  };

  const handleEditRemark = () => {
    setRemarkDetails({
      ...remarkDetails,
      name: 'addRemark',
      remarkStatus: null,
    });
  };

  const handleChange = e => {
    const { value } = e.target;
    setRemarkDetails({
      ...remarkDetails,
      remark: value?.trim().length !== 0 ? value : null,
    });
  };

  const handleMouseOver = (whereToMeasure, howToMeasure, e) => {
    const { currentTarget } = e;
    setInfo({
      anchorEl: currentTarget,
      whereToMeasure: whereToMeasure,
      howToMeasure: howToMeasure,
    });
  };

  const handleMouseLeave = () => {
    setInfo({
      anchorEl: false,
      whereToMeasure: '',
      howToMeasure: '',
    });
  };

  const renderContent = () => {
    switch (toggleName) {
      case 'details':
        return <Details details={details} />;
      case 'graph': {
        if (isEdit)
          return (
            <EditQuestionsTable
              {...state}
              handleInputChange={handleInputChange}
              handleRemark={handleRemark}
              handleMouseOver={handleMouseOver}
              handleMouseLeave={handleMouseLeave}
            />
          );
        else
          return (
            <QuestionsTable
              {...state}
              handleMouseOver={handleMouseOver}
              handleMouseLeave={handleMouseLeave}
            />
          );
      }
      default:
        break;
    }
  };

  const isValidate = () => {
    let arr = [...selectedValues];
    let valid = false;
    if (arr.length !== 0) {
      let booleanArray = arr.map(
        ({
          currentProfile,
          afterCompletingQuestionnaires,
          afterProfileBuilding,
        }) => {
          if (
            currentProfile !== null &&
            afterCompletingQuestionnaires !== null &&
            afterProfileBuilding !== null
          )
            return true;
          else return false;
        }
      );
      valid = !booleanArray.includes(false);
    }
    return valid;
  };

  const handleClick = name => {
    switch (name) {
      case 'saveAndGenerate': {
        if (selectedValues.length !== 0) {
          if (isValidate()) {
            dispatch(
              putSpiderGraphAnswers(studentId, productId, selectedValues)
            );
          } else {
            handleSnack(true, 'error', REQUIRED_ALL_FIELD);
          }
        }
        break;
      }
      case 'edit': {
        setState({ ...state, isGraph: false, isEdit: true });
        break;
      }
      default:
        break;
    }
  };

  const renderButtons = () => {
    switch (toggleName) {
      case 'graph': {
        if (isEdit) {
          return (
            <StyledButton
              variant={'contained'}
              style={customTheme.palette.contained}
              onClick={() => handleClick('saveAndGenerate')}
            >
              {'Save & Generate'}
            </StyledButton>
          );
        } else {
          return (
            <StyledButton
              variant={'contained'}
              style={customTheme.palette.contained}
              onClick={() => handleClick('edit')}
            >
              {'Edit'}
            </StyledButton>
          );
        }
      }
      default:
        break;
    }
  };

  const renderPopperContent = () => {
    return (
      <Paper>
        <Typo variant={'body1'} color={'#666666'}>
          {'Where to Measure:'}
        </Typo>
        <Typo
          variant={'body1'}
          color={'#333333'}
          paragraph={true}
          className={classes.popperContent}
        >
          {info.whereToMeasure || 'NA'}
        </Typo>
        <Typo variant={'body1'} color={'#666666'}>
          {'How to Measure:'}
        </Typo>
        <Typo
          variant={'body1'}
          color={'#333333'}
          paragraph={true}
          className={classes.popperContent}
        >
          {info.howToMeasure || 'NA'}
        </Typo>
      </Paper>
    );
  };

  const renderDialogContent = () => {
    switch (remarkDetails.name) {
      case 'addRemark': {
        return (
          <div className={classes.addRemarkContainer}>
            <Typo variant={'subtitle2'} color={'#333333'}>
              {'Profile fit Graph | Spider Graph Remark'}
            </Typo>
            <TextField
              id={remarkDetails.index}
              type={'text'}
              value={remarkDetails.remark}
              placeholder={'Add Comments'}
              onChange={handleChange}
              fullWidth
            />
          </div>
        );
      }
      case 'viewRemark': {
        return (
          <div className={classes.viewRemarkContainer}>
            <FlexJustifyView>
              <Typo variant={'subtitle2'} color={'#333333'}>
                {'Profile fit Graph | Spider Graph Remark'}
              </Typo>
              <Typo variant={'subtitle2'} color={'#999999'}>
                <IconButton
                  color={'primary'}
                  className={classes.editIconStyle}
                  title={'Edit Remark'}
                  onClick={handleEditRemark}
                >
                  <CreateIcon />
                </IconButton>
                {remarkDetails.remarkStatus}
              </Typo>
            </FlexJustifyView>
            <Typo variant={'subtitle2'} color={'#333333'}>
              {remarkDetails.remark}
            </Typo>
          </div>
        );
      }
      default:
        return null;
    }
  };

  const handleLeftButton = () => {
    switch (remarkDetails.name) {
      case 'addRemark': {
        let requestBody = {
          mbaSpiderQuestionId: remarkDetails.questionId,
          remarks: remarkDetails.remark,
        };
        dispatch(putRemarks(studentId, productId, requestBody));
        break;
      }
      case 'viewRemark': {
        let requestBody = {
          mbaSpiderQuestionId: remarkDetails.questionId,
          remarks: null,
        };
        dispatch(putRemarks(studentId, productId, requestBody));
        break;
      }
      default:
        break;
    }
  };

  const handleCancel = () => {
    setRemarkDetails({
      ...remarkDetails,
      open: false,
      name: null,
      remark: null,
      remarkStatus: null,
      questionId: null,
      index: 0,
    });
  };

  const renderLeftButtonText = () => {
    if (remarkDetails.name === 'addRemark') return 'Add Remark';
    else return 'Delete';
  };

  const handleSnackClose = () => {
    setState({ ...state, snackOpen: false, snackVariant: '', snackMsg: '' });
  };

  const leftVariantSize = isGraph ? 8 : 12;
  return (
    <Box height={'80vh'}>
      <Wrapper>
        <ContentFlexWrapper>
          <Grid container className={classes.fullHeight}>
            <Grid
              item
              sm={12}
              md={leftVariantSize}
              className={classes.contentWrap}
            >
              <HeaderContainer>
                <Typo variant={'h6'} className={classes.title}>
                  {TITLE[toggleName]}
                </Typo>
                <ToggleButtonGroup
                  value={toggleName}
                  onChange={handleToggleChange}
                  className={classes.toggleButton}
                  exclusive
                >
                  <ToggleButton value='details'>{'Details'}</ToggleButton>
                  <ToggleButton value='graph'>{'Graph'}</ToggleButton>
                </ToggleButtonGroup>
              </HeaderContainer>
              {renderContent()}
            </Grid>
            {isGraph && (
              <Grid item sm={12} md={4} className={classes.fullHeight}>
                <SpiderGraph {...state} />
              </Grid>
            )}
          </Grid>
        </ContentFlexWrapper>
        {toggleName !== 'details' && (
          <BottomContainer>{renderButtons()}</BottomContainer>
        )}
      </Wrapper>
      <Popper
        open={Boolean(info.anchorEl)}
        anchorEl={info.anchorEl}
        placement={'bottom-start'}
      >
        {renderPopperContent()}
      </Popper>
      <Popup
        open={remarkDetails.open}
        title={'Spider Graph'}
        width={'660px'}
        leftButtonText={renderLeftButtonText()}
        rightButtonText={'Cancel'}
        handleLeftButton={handleLeftButton}
        handleRightButton={handleCancel}
        handleClose={handleCancel}
        dialogContent={renderDialogContent()}
      />
      <MySnackBar
        onClose={handleSnackClose}
        snackOpen={snackOpen}
        snackVariant={snackVariant}
        snackMsg={snackMsg}
      />
      <Backdrop className={classes.backdrop} open={isLoading}>
        <Loader />
      </Backdrop>
    </Box>
  );
}

export default Index;
