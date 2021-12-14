import { Collapse } from '@material-ui/core'
import React from 'react'
import { DetailsBox, LeftText, StyledDetailsButton } from '../../../Asset/StyledComponent'
import { JustifyFlex } from './StyledComponents'

function CollapseViewer({children, show }) {
    return (
        <DetailsBox>
                <JustifyFlex>
                  <LeftText>{'Lee Solomon'}</LeftText>
                  <StyledDetailsButton
                    // onClick={() => handleShowDetails(1)}
                    outlined={true}
                    variant={'outlined'}
                  >
                    {'Show Details'}
                  </StyledDetailsButton>
                </JustifyFlex>
                <Collapse in={show}>
                  {children}
                </Collapse>
              </DetailsBox>
    )
}

export default CollapseViewer
