import { Breadcrumbs, Button, Grid, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCareerExpoReport,
  viewCvReport,
  viewDiagTestReport,
  viewMarkSheetReport,
  viewMydetailsReport,
  viewTechTestReport,
  viewTermsAndConReports,
  viewTestRating,
  getTestList,
} from '../Actions/Reports';
import BackButton from '../Asset/Images/backbutton.svg';
import { downloadReport } from '../AsyncApiCall/Student';
import { studentPath } from './RoutePaths';
import DropDown from '../Utils/DropDown';
import {
  typographyStyle,
  BreadCrumpContainer,
  useStyles,
} from '../Asset/StyledComponents/ReportStyles';
import Loader from '../Lms/Utils/Loader';
import { useState } from 'react';
import TextFieldComponent from './Controls/TextField';
import moment from 'moment';

function StudentReport(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    isDownloading: false,
    startDate: null,
    endDate: null,
    endDateHelperText: null,
    isDisabled: true,
  });
  const {
    startDate,
    endDate,
    endDateHelperText,
    isDisabled,
    isDownloading,
  } = state;
  const dispatch = useDispatch();
  const { markSheetReport } = useSelector(
    stateValue => stateValue.ReportReducer
  );

  const compare = (dateTimeA, dateTimeB) => {
    if (dateTimeA && dateTimeB) {
      var momentA = moment(new Date(dateTimeA), 'DD/MM/YYYY');
      var momentB = moment(new Date(dateTimeB), 'DD/MM/YYYY');
      if (momentA > momentB) return true;
      else return false;
    } else return false;
  };

  useEffect(() => {
    if (startDate && endDate) {
      if (compare(startDate, endDate)) {
        setState({ ...state, endDateHelperText: 'Please select a valid date' });
      } else {
        setState({ ...state, endDateHelperText: null, isDisabled: false });
      }
    } else {
      setState({ ...state, endDateHelperText: null, isDisabled: true });
    }
  }, [startDate, endDate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleDownloadClick = () => {
    setState({
      ...state,
      isDownloading: true,
    });
    // downloadReport().then(response => {
    //   if (response.status === 201) {
    //     const downloadUrl = window.URL.createObjectURL(
    //       new Blob([response.data])
    //     );
    //     const link = document.createElement('a');
    //     link.href = downloadUrl;
    //     link.setAttribute('download', `${title}.xls`);
    //     document.body.appendChild(link);
    //     link.click();
    //     link.remove();
    //     this.setState({
    //       isDownloading: false,
    //     });
    //   } else {
    //     this.setState({
    //       isDownloading: false,
    //     });
    //   }
    // });
  };

  return isDownloading ? (
    <Loader />
  ) : (
    <div>
      <BreadCrumpContainer>
        <img
          src={BackButton}
          style={{ cursor: 'pointer', marginTop: '-10px' }}
          onClick={() => props.history.goBack()}
        />
        <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />}>
          <Typography
            onClick={() => props.history.push(studentPath)}
            style={typographyStyle}
          >
            {'Home'}
          </Typography>
          <Typography style={{ cursor: 'pointer', fontWeight: '600' }}>
            {'Report'}
          </Typography>
        </Breadcrumbs>
      </BreadCrumpContainer>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextFieldComponent
            type={'date'}
            color={'primary'}
            variant={'outlined'}
            label={'Start Date'}
            name={'startDate'}
            value={startDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: moment(new Date()).format('YYYY-MM-DD'),
            }}
            onKeyDown={event => {
              event.preventDefault();
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextFieldComponent
            type={'date'}
            color={'primary'}
            variant={'outlined'}
            label={'End Date'}
            name={'endDate'}
            value={endDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: moment(new Date()).format('YYYY-MM-DD'),
            }}
            error={Boolean(endDateHelperText)}
            helperText={endDateHelperText || ' '}
            onKeyDown={event => {
              event.preventDefault();
            }}
            fullWidth
          />
        </Grid>
        <Grid
          item
          xs={12}
          justifyContent={'space-between'}
          alignItems={'center'}
          className={classes.boxTopStyle}
          container
        >
          <Typography variant='h6'>{'Reports'}</Typography>
          <Button
            disabled={isDownloading || isDisabled}
            color={'primary'}
            onClick={() => this.handleDownloadClick()}
            variant={'contained'}
          >
            {'Download'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default StudentReport;
