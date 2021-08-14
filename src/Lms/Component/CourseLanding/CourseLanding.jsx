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
  MenuItem,
} from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import DropDownRack from './DropDownRack';
import PlusButton from '../../Utils/PlusButton';
import DataTable from './DataTable';

export default class CourseLanding extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
  }

  componentDidMount() {
    let data = require('./course-material-landing.json');
    console.log(data.data.content);
    this.setState({ content: data.data.content });
  }

  render() {
    console.log(this.state);
    return (
      <Box display='flex' m={3}>
        {/* <ThemeProvider theme={ColorScheme}> */}
        <Container>
          <Grid container spacing={3}>
            <Grid
              item
              container
              alignItems='center'
              justifyContent='space-between'
              spacing={2}
              style={{ marginBottom: '35px' }}
            >
              <Grid item>
                <H1>Course Materials</H1>
              </Grid>
              <div>
                <Grid item container alignItems='center' spacing={2}>
                  <Grid item>
                    <ThemeProvider theme={textFieldTheme}>
                      <TextField variant='outlined' placeholder='Search' />
                    </ThemeProvider>
                  </Grid>
                  <Grid item>
                    <PlusButton>Add</PlusButton>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Box marginBottom='40px'>
              <DropDownRack />
            </Box>
            <Box flexGrow='1' width='200%' height='100vh'>
              <DataTable content={this.state.content} />
            </Box>
          </Grid>
        </Container>
        {/* </ThemeProvider> */}
      </Box>
    );
  }
}
