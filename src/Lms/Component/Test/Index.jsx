import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { Container, H1 } from '../../Assets/StyledComponents';
import PlusButton from '../../Utils/PlusButton';
import DropDownRack from './DropDownRack';

export default class TestLanding extends Component {
  render() {
    return (
      <Container>
        <Grid
          item
          container
          alignItems='center'
          justifyContent='space-between'
          style={{ marginBottom: '35px' }}
        >
          <H1>Test</H1>
          <PlusButton>Add</PlusButton>
        </Grid>
        <DropDownRack />
      </Container>
    );
  }
}
