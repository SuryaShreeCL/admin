import { Box, Card, Grid, Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { SubHeading, SubPara } from '../../../assets/css/StyledComponent';
import ClockImage from '../../../assets/images/ClockImage.png';

function TaskTitleCard({ topicResponse, t }) {
  return (
    <Card className={'test-topic-title-card'}>
      <Grid container justifyContent='space-between'>
        <Grid item>
          <SubHeading style={{ padding: 15 }}>
            {topicResponse && topicResponse.title}
          </SubHeading>
        </Grid>
        <Grid
          item
          xs={3}
          container
          alignItems='flex-end'
          justifyContent='flex-end'
          wrap='nowrap'
          // style={{ paddingRight: '40px' }}
        >
          <SubPara>
            {' '}
            <img src={ClockImage} alt='clockImage' style={{ width: 17 }} />
            &nbsp;&nbsp;&nbsp;
            {topicResponse && topicResponse.duration}
          </SubPara>

          <SubHeading>
            {topicResponse && topicResponse.completedTasks} /
            {topicResponse && topicResponse.totalTasks} {t('Task')}
          </SubHeading>
        </Grid>
      </Grid>

      <Box height={55}>
        {topicResponse && topicResponse.progress === 0 ? null : (
          <Box className={'test-progress-bar'}>
            <Box display='flex'>
              <Box minWidth={35} zIndex={2}>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  style={{ paddingLeft: 15 }}
                >
                  Progress{' '}
                  {`${Math.round(topicResponse && topicResponse.progress)}%`}
                </Typography>
              </Box>
            </Box>

            <Box>
              <LinearProgress
                variant='determinate'
                value={topicResponse && topicResponse.progress}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Card>
  );
}

export default TaskTitleCard;
