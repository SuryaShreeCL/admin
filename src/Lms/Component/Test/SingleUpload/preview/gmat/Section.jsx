/**
 * (c) CareerLabs. All rights reserved.
 **/

import { Radio, Typography } from '@material-ui/core';
import React from 'react';
import {
  ButtonBox2,
  FormControlLabel,
  Main,
  MainStyle,
  OptionsDiv,
  RadioGroup,
} from '../../../../../assets/css/GmatStyles';
import ButtonImg from '../../../../../assets/images/ButtonImg.svg';
import PageLoader from '../../../../../utils/components/PageLoader';

function Section(props) {
  if (props.getInstructionsResponse)
    return (
      <MainStyle>
        <Typography variant='h3' color='textPrimary' className={'gmat_head'}>
          Section Ordering
        </Typography>
        <Main>
          <Typography variant='h5' color='textPrimary'>
            Select the order in which the exam sections are to be administrated.
          </Typography>
          <Typography
            variant='h4'
            color='textPrimary'
            className='gmat_section_title_padding'
          >
            Once you select your section order, you must view ALL questions in
            each section, in the order you have selected, before moving on to
            the next section. You will NOT be able to return to this screen.
          </Typography>

          <RadioGroup
            row
            onChange={e => props.handleRadioChange(e)}
            value={
              props.getInstructionsResponse &&
              props.getInstructionsResponse.data.selectedTestSection
            }
          >
            {props.getInstructionsResponse &&
              props.getInstructionsResponse.data.testSections.map(
                (item, index) => (
                  <FormControlLabel
                    value={index}
                    control={<Radio color='secondary' />}
                    label={item.map(listItem => (
                      <OptionsDiv>
                        <Typography variant='h4' color='textPrimary'>
                          {listItem.name}
                        </Typography>
                      </OptionsDiv>
                    ))}
                  />
                )
              )}
          </RadioGroup>
          <ButtonBox2>
            <Typography
              variant='h4'
              color='textPrimary'
              className='button_image_style'
            >
              Click &nbsp;
              <img src={ButtonImg} alt='' />
              &nbsp; button to start the exam. You will begin the GMAT exam on
              the next screen.
            </Typography>
          </ButtonBox2>
        </Main>
      </MainStyle>
    );
  else return <PageLoader />;
}

export default Section;
