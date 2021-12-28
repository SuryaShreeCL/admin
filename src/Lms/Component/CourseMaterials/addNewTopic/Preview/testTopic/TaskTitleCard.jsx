import { Box, Card, Grid } from '@material-ui/core';
import React from 'react';
import '../../../../../Assets/css/Preview/Preview.css';
import {
  SubHeading,
  SubPara,
} from '../../../../../Assets/css/Preview/TaskDetailsStyledComponent';
import ClockImage from '../../../../../Assets/images/ClockImage.png';

function TaskTitleCard({ topicResponse }) {
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
        >
          <SubPara>
            {' '}
            <img src={ClockImage} alt='clockImage' className={'image_size'} />
            &nbsp;&nbsp;&nbsp;
            {topicResponse && topicResponse.duration}
          </SubPara>

          <SubHeading>
            {topicResponse && topicResponse.completedTasks} /
            {topicResponse && topicResponse.totalTasks} {'Task'}
          </SubHeading>
        </Grid>
      </Grid>

      <Box height={55}></Box>
    </Card>
  );
}

export default TaskTitleCard;
