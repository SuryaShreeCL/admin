import { Box, Divider } from '@material-ui/core';
import React from 'react';
import {
  ContentWrapper,
  StyledList,
  Typo,
  useStyles,
} from '../../../Asset/StyledComponents/ProfileFitSpiderGraph';

function Details({ details }) {
  const classes = useStyles();
  return (
    <ContentWrapper>
      <Box className={classes.detailContainer}>
        {details.length !== 0 &&
          details.map(({ content, description, tittle }) => (
            <div>
              <div className={classes.subDetails}>
                {/* SubTitle */}
                <Typo variant={'body1'} color={'#333333'}>
                  {tittle}
                </Typo>
                {/* Description */}
                <p>
                  <Typo
                    variant={'caption'}
                    color={'#333333'}
                    className={classes.description}
                  >
                    {'Description'}
                  </Typo>
                  <Typo variant={'body2'} color={'#333333'}>
                    {description}
                  </Typo>
                </p>
                {content.length !== 0 && (
                  <StyledList>
                    {content.map(text => (
                      <li>{text}</li>
                    ))}
                  </StyledList>
                )}
              </div>
              <Divider className={classes.dividerStyle} />
            </div>
          ))}
      </Box>
    </ContentWrapper>
  );
}

export default Details;
