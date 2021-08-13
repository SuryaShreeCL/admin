import React, { Component } from 'react';
import {
  ColorScheme,
  Container,
  H1,
  textFieldTheme,
} from '../../Assets/StyledComponents';
import {
  Grid,
  TextField,
  Box,
  ThemeProvider,
  Button,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import DropDownRack from './DropDownRack';
import PlusButton from '../../Utils/PlusButton';

export default class CourseLanding extends Component {
  render() {
    return (
      <Box m={3}>
        <ThemeProvider theme={ColorScheme}>
          <Container>
            <Grid container spacing={3}>
              <Grid
                item
                // xs={12}
                container
                alignItems='center'
                justifyContent='space-between'
                spacing={2}
              >
                <Grid item>
                  <H1>Course Materials</H1>{' '}
                </Grid>
                <div>
                  <Grid item container alignItems='center' spacing={2}>
                    <Grid item>
                      <ThemeProvider theme={textFieldTheme}>
                        <TextField variant='outlined' placeholder='Search' />
                      </ThemeProvider>
                    </Grid>
                    <Grid item>
                      {/* <Button
                        variant='contained'
                        color='secondary'
                        startIcon={<AddRoundedIcon />}
                        style={{ marginLeft: '12px' }}
                      >
                        Add
                      </Button> */}
                      <PlusButton>Add</PlusButton>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item container spacing={3}>
                <Grid item xs={12} lg={4}>
                  <DropDownRack />
                  {/* <FormControl>
                    <InputLabel>Course</InputLabel>
                  </FormControl>
                  <Select label=''></Select>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormControl>
                    <InputLabel>Subject</InputLabel>
                  </FormControl>
                  <Select label=''></Select>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormControl>
                    <InputLabel>Concept</InputLabel>
                  </FormControl>
                  <Select label='' fullWidth></Select> */}
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid container justifyContent='space-between'>
              <Grid item xs={12}>
                
                <Grid item container spacing={2}>
                  <Grid item>
                    
                  </Grid>
                  <Grid item>
                    
                  </Grid>
                </Grid>
              </Grid>
            </Grid> */}
          </Container>
        </ThemeProvider>
      </Box>
    );
  }
}
