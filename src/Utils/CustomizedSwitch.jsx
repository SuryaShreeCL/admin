import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);
  
  export default function CustomizedSwitches({onChange ,value,label}) {         
    return (
      <FormGroup>       
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item xs={12} sm={12} md={12}  >
              <Typography component={'h5'}>
              {label}
              </Typography>
            </Grid>
            <Grid item>
              <AntSwitch checked={value} onChange={onChange} name="checkedC" />
            </Grid>            
          </Grid>
        </Typography>
      </FormGroup>
    );
  }