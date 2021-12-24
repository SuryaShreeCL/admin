import { Box, Grid } from '@material-ui/core';
import React, { Component } from 'react';
import '../../../../../Assets/css/Preview/Preview.css';
import { TaskContainer } from '../../../../../Assets/css/Preview/TaskDetailsStyledComponent';
import BreadCrumbsModel from '../../../../../Utils/BreadCrumbsModel';
import LeftCard from './LeftCard';
import RightCard from './RightCard';
import TaskTitleCard from './TaskTitleCard';

class TaskDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const leftCardProps = {
      location: this.props.location,
      history: this.props.history,
      topicResponse: this.props.topics && this.props.topics.data,
      selectedStep: this.props.selectedStep,
    };

    const rightCardProps = {
      content:
        this.props.topics &&
        this.props.topics.data.contents
          .filter((item, index) => index === this.props.selectedStep && item)
          .pop(),
      isBookmarked: false,
    };

    return (
      <TaskContainer>
        <Box className={'bread_crumbs_pad'}>
          <BreadCrumbsModel topics={this.props.topics} backEvent={false} />
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <TaskTitleCard
              topicResponse={this.props.topics && this.props.topics.data}
            />
          </Grid>
          <Grid item xs={3}>
            <LeftCard {...leftCardProps} />
          </Grid>

          <Grid item xs={9}>
            <RightCard {...rightCardProps} />
          </Grid>
        </Grid>
      </TaskContainer>
    );
  }
}

export default TaskDetail;
