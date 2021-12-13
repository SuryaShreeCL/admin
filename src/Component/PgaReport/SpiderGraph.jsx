import { Box, Grid, IconButton, Popper, Typography } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSpiderGraph,
  profileScoreGenerate,
  postSpiderGraph,
} from '../../Actions/PgaReportAction';
import MySnackBar from '../MySnackBar';
import RadarChart from './Components/RadarCharts';
import {
  Bolder,
  CardRightBox,
  CardText,
  CenteredIcon,
  CenteredText,
  ClickableBox,
  CustomList,
  FlexView,
  FloatImage,
  PageWrapper,
  Paragraph,
  ParagraphHead,
  PopoverBox,
  PositionedArrow,
  SideIcon,
  StyledButton,
} from './Components/StyledComponents';
import { useStyles } from './Styles/Index';
import GraphImage from '../../Asset/Images/RadarGraphImage.png';

const popoverList = [
  'Academic Fit',
  'Practical Experience',
  'Domain Fit for the Career Track you are exploring',
  'Competencies and Skills',
  'Impact and Interpersonal Skills',
];

function SpiderGraph(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { studentId, productId } = props.match.params;
  const [snack, setSnack] = useState({
    snackOpen: false,
    snackMsg: '',
    snackColor: '',
  });
  const [graphData, setGraphData] = useState([]);
  const [activeGraphIndex, setActiveGraphIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMouseOver = event => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = event => {
    event.preventDefault();
    setAnchorEl(null);
  };

  const { spiderGraph, profileScoreStatus } = useSelector(
    state => state.PgaReportReducer
  );

  useEffect(() => {
    dispatch(getSpiderGraph(studentId, productId));
  }, [dispatch]);

  useEffect(() => {
    if (
      spiderGraph &&
      spiderGraph.success &&
      spiderGraph.data &&
      spiderGraph.data.lenth !== 0
    ) {
      setGraphData(
        spiderGraph.data.map(item => ({ ...item, color: getRandomColor() }))
      );
      setActiveGraphIndex(0);
    }
  }, [spiderGraph]);

  useEffect(() => {
    if (profileScoreStatus && profileScoreStatus.success) {
      dispatch(getSpiderGraph(studentId, productId));
    }
  }, [profileScoreStatus]);

  const getGraphData = ({
    currentProfileScore,
    idealProfileScore,
    postServiceProfileScore,
  }) => {
    if (currentProfileScore && idealProfileScore && postServiceProfileScore)
      return {
        currentProfileScore: [
          currentProfileScore.academicFit,
          currentProfileScore.practicalExperience,
          currentProfileScore.domainFit,
          currentProfileScore.competencies,
          currentProfileScore.impactInterPersonalSkills,
        ],
        idealProfileScore: [
          idealProfileScore.academicFit,
          idealProfileScore.practicalExperience,
          idealProfileScore.domainFit,
          idealProfileScore.competencies,
          idealProfileScore.impactInterPersonalSkills,
        ],
        postServiceProfileScore: [
          postServiceProfileScore.academicFit,
          postServiceProfileScore.practicalExperience,
          postServiceProfileScore.domainFit,
          postServiceProfileScore.competencies,
          postServiceProfileScore.impactInterPersonalSkills,
        ],
      };
    else return null;
  };

  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleBoxClick = (e, index) => {
    setActiveGraphIndex(parseInt(index));
  };

  const handleActionButton = (e, id, addedGraphImg) => {
    e.stopPropagation();
    dispatch(profileScoreGenerate(studentId, productId, id));
    var canvas = document.getElementById('spider_graph');
    var dataURL = canvas.toDataURL();
    if (!addedGraphImg)
      dispatch(
        postSpiderGraph(studentId, productId, id, dataUrlToFormDate(dataURL))
      );
  };

  const renderPopover = () => {
    return (
      <PopoverBox>
        <PositionedArrow />
        <div>
          <FloatImage src={GraphImage} />
          <ParagraphHead>
            {'How to read this Profile Fitment Spider Graph?'}
          </ParagraphHead>
          <div id={'pad'}>
            <Paragraph fontWeight={600}>
              {'5 Foundational Areas of Building Profile'}
            </Paragraph>
            <CustomList>
              {popoverList.map(item => (
                <li>{item}</li>
              ))}
            </CustomList>
          </div>
        </div>
        <div>
          <ParagraphHead>
            {'There are 3 states of Profile Fit Levels you can exist'}
          </ParagraphHead>
          <Paragraph>
            <Bolder fontWeight={600}>{'Ideal Profile: '}</Bolder>
            {
              'This is the ideal profile of a student who is the first pick for a Job role in this Career Track that you are exploring now.'
            }
          </Paragraph>
          <Paragraph>
            <Bolder fontWeight={600}>{'Your Present Profile: '}</Bolder>
            {
              'This spider graph indicates your present scale of profile for this Career Track that you are exploring now.'
            }
          </Paragraph>
          <Paragraph>
            <Bolder fontWeight={600}>{'After Profile Building: '}</Bolder>
            {
              'If you consciously start building your profile and work towards improving your Profile using CareerLabs Profile Builder Platform, this is where you will be within few months!'
            }
          </Paragraph>
        </div>
      </PopoverBox>
    );
  };

  const dataUrlToFormDate = dataURL => {
    var blobBin = atob(dataURL.split(',')[1]);
    var array = [];
    for (var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    var file = new Blob([new Uint8Array(array)], { type: 'image/png' });

    var formData = new FormData();
    formData.append('file', file, 'spider_graph.png');
    return formData;
  };

  const open = Boolean(anchorEl);
  return (
    <PageWrapper>
      <Grid container className={classes.containerStyle}>
        <Grid item sm={6}>
          <Grid container spacing={2}>
            <Grid item md={12} className={classes.fullWidth}>
              <Typography variant={'h5'}>{'Spider Graph'}</Typography>
            </Grid>
            {graphData.length !== 0 &&
              graphData.map(
                (
                  { addPGA, addedGraphImg, id, careerTrackTitle, color },
                  index
                ) => (
                  <Grid item sm={4} md={4}>
                    <ClickableBox
                      onClick={
                        activeGraphIndex !== index &&
                        (e => handleBoxClick(e, index))
                      }
                      active={activeGraphIndex === index}
                    >
                      <SideIcon color={color} />
                      <CardRightBox>
                        <CardText>{careerTrackTitle}</CardText>
                        <StyledButton
                          variant={addPGA ? 'contained' : 'outlined'}
                          className={classes.buttonPad}
                          isOutlined={!addPGA}
                          onClick={e =>
                            handleActionButton(e, id, addedGraphImg)
                          }
                        >
                          {addPGA ? 'Added' : 'Add to PGA'}
                        </StyledButton>
                      </CardRightBox>
                    </ClickableBox>
                  </Grid>
                )
              )}
          </Grid>
        </Grid>
        {graphData.length !== 0 && (
          <Grid item sm={6}>
            <Box className={classes.boxPadding}>
              <Grid container spacing={2} className={classes.rightContainerPad}>
                <Grid item xs={12}>
                  <Typography variant={'h6'}>{`${graphData.length !== 0 &&
                    `${graphData[activeGraphIndex]['careerTrackTitle']} | `}Spider Graph`}</Typography>
                </Grid>
                <Grid xs={12}>
                  <FlexView>
                    <IconButton
                      className={classes.infoBorder}
                      onMouseOver={handleMouseOver}
                      onMouseLeave={handleMouseLeave}
                      disableRipple
                    >
                      <InfoOutlinedIcon fontSize={'small'} />
                    </IconButton>
                    <Popper
                      open={open}
                      anchorEl={anchorEl}
                      placement={'bottom-end'}
                    >
                      {renderPopover()}
                    </Popper>
                  </FlexView>
                </Grid>
                <Grid item xs={12}>
                  {graphData.length !== 0 && (
                    <RadarChart
                      graphData={getGraphData(graphData[activeGraphIndex])}
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        )}
        {graphData.length === 0 && (
          <Grid item md={12}>
            <CenteredIcon />
            <CenteredText>
              {'Kindly answer Resume Questionnaire to get Spider Graph'}
            </CenteredText>
          </Grid>
        )}
      </Grid>
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
    </PageWrapper>
  );
}

export default SpiderGraph;
