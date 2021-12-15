import { Collapse } from '@material-ui/core';
import React from 'react';
import {
  DetailsBox,
  LeftText,
  StyledDetailsButton,
} from '../../../Asset/StyledComponent';
import { JustifyFlex } from './StyledComponents';

function CollapseViewer({ children, show, title, id, handleShowDetails }) {
  return (
    <DetailsBox>
      <JustifyFlex>
        <LeftText>{title}</LeftText>
        <StyledDetailsButton
          onClick={() => handleShowDetails(id)}
          outlined={true}
          variant={'outlined'}
        >
          {'Show Details'}
        </StyledDetailsButton>
      </JustifyFlex>
      <Collapse in={show}>{children}</Collapse>
    </DetailsBox>
  );
}

export default CollapseViewer;
