import { Collapse } from '@material-ui/core';
import React from 'react';
import {
  DetailsBox,
  LeftText,
  StyledDetailsButton,
} from '../../../Asset/StyledComponent';
import { JustifyFlex } from './StyledComponents';
import '../../../Asset/DialogStyles.css';

function CollapseViewer({ children, show, title, id, handleShowDetails }) {
  return (
    <DetailsBox>
      <JustifyFlex>
        <LeftText>{title}</LeftText>
        <StyledDetailsButton
          onClick={() => handleShowDetails(id)}
          outlined={!show}
          variant={show ? 'contained' : 'outlined'}
        >
          {`${show ? 'Hide' : 'Show'} Details`}
        </StyledDetailsButton>
      </JustifyFlex>
      <Collapse in={show} className={'padding_top'}>
        {children}
      </Collapse>
    </DetailsBox>
  );
}

export default CollapseViewer;
