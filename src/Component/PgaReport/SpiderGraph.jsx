import { Box, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSpiderGraph,
  profileScoreGenerate,
} from '../../Actions/PgaReportAction';
import MySnackBar from '../MySnackBar';
import RadarChart from './Components/RadarCharts';
import {
  CardRightBox,
  CardText,
  CenteredIcon,
  CenteredText,
  ClickableBox,
  PageWrapper,
  SideIcon,
  StyledButton,
} from './Components/StyledComponents';
import { useStyles } from './Styles/Index';

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

  const handleActionButton = (e, id) => {
    e.stopPropagation();
    dispatch(profileScoreGenerate(studentId, productId, id));
  };

  return (
    <PageWrapper>
      <Grid container className={classes.containerStyle}>
        <Grid item md={8}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Typography variant={'h5'}>{'Spider Graph'}</Typography>
            </Grid>
            {graphData.length !== 0 &&
              graphData.map(
                ({ addPGA, id, careerTrackTitle, color }, index) => (
                  <Grid item md={4} lg={3}>
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
                          onClick={e => handleActionButton(e, id)}
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
          <Grid item md={4}>
            <Box className={classes.boxPadding}>
              <Grid container spacing={2} className={classes.rightContainerPad}>
                <Grid item md={12}>
                  <Typography variant={'h6'}>{`${graphData.length !== 0 &&
                    `${graphData[activeGraphIndex]['careerTrackTitle']} | `}Spider Graph`}</Typography>
                </Grid>
                <Grid item md={12}>
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
