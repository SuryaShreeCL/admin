/**
 * (c) CareerLabs. All rights reserved.
 **/

import { Typography } from '@material-ui/core';
import QueryString from 'qs';
import React, { Component } from 'react';
import { ButtonBox2, Main } from '../../../../../assets/css/GmatStyles';
import ButtonImg from '../../../../../assets/images/ButtonImg.svg';

export class EndSection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { testQuestionSetId, section } = QueryString.parse(
      this.props.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );
    this.props.getInstructions(testQuestionSetId, response => {});
  }
  render() {
    return (
      <div>
        <Typography variant='h3' color='textPrimary' className='gmat_head'>
          End Section
        </Typography>
        <Main>
          <Typography variant='h4' color='textPrimary'>
            When you take the GMAT exam, you will have a specific amount of time
            to spend on this screen. This screen is not timed in the GMAT
            Official Practice Exams.
          </Typography>
          <ButtonBox2>
            <Typography
              variant='h4'
              color='textPrimary'
              className='button_image_style'
            >
              Click &nbsp;
              <img src={ButtonImg} alt='' />
              &nbsp; to continue
            </Typography>
          </ButtonBox2>
        </Main>
      </div>
    );
  }
}

export default EndSection;
