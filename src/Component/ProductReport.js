import { Breadcrumbs, Button, Grid, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../Asset/Images/backbutton.svg';
import {
  BreadCrumpContainer,
  typographyStyle,
  useStyles,
} from '../Asset/StyledComponents/ReportStyles';
import Loader from '../Lms/Utils/Loader';
import TextFieldComponent from './Controls/TextField';
import { studentPath } from './RoutePaths';
import Snack from './MySnackBar';
import { clearCustomData, downloadProductReport } from '../Actions/Reports';

function ProductReport(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    isDownloading: false,
    startDate: null,
    endDate: null,
    endDateHelperText: null,
    isDisabled: true,
    snackOpen: false,
    snackMsg: '',
  });
  const {
    startDate,
    endDate,
    endDateHelperText,
    isDisabled,
    isDownloading,
    snackOpen,
    snackMsg,
  } = state;
  const dispatch = useDispatch();
  const { productReport } = useSelector(
    (stateValue) => stateValue.ReportReducer
  );

  useEffect(() => {
    if (productReport && isDownloading) {
      if (productReport.success) {
        const downloadUrl = window.URL.createObjectURL(
          new Blob([productReport.data])
        );
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'Report.xls');
        document.body.appendChild(link);
        link.click();
        link.remove();
        setState({ ...state, isDownloading: false });
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackMsg: productReport.message,
          isDownloading: false,
        });
      }
      dispatch(clearCustomData('productReport'));
    }
  }, [productReport, isDownloading]);

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
        setState({
          ...state,
          endDateHelperText: 'Please select a valid date',
          isDisabled: true,
        });
      } else {
        setState({ ...state, endDateHelperText: null, isDisabled: false });
      }
    } else {
      setState({ ...state, endDateHelperText: null, isDisabled: true });
    }
  }, [startDate, endDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleDownloadClick = () => {
    setState({
      ...state,
      isDownloading: true,
    });
    dispatch(downloadProductReport(startDate, endDate));
  };

  const handleSnackClose = () => {
    setState({ ...state, snackOpen: false, snackMsg: '' });
  };

  return isDownloading ? (
    <Loader />
  ) : (
    <div>
      <BreadCrumpContainer>
        <img
          src={BackButton}
          className={classes.imgStyle}
          onClick={() => props.history.goBack()}
        />
        <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />}>
          <Typography
            onClick={() => props.history.push(studentPath)}
            style={typographyStyle}
          >
            {'Home'}
          </Typography>
          <Typography className={classes.textSTyle}>{'Report'}</Typography>
        </Breadcrumbs>
      </BreadCrumpContainer>
      <Grid container spacing={2}>
        <Grid xs={12} item />
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
            onKeyDown={(event) => {
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
            onKeyDown={(event) => {
              event.preventDefault();
            }}
            fullWidth
          />
        </Grid>
        <Grid
          item
          xs={6}
          justifyContent={'flex-end'}
          alignItems={'flex-start'}
          container
        >
          <Button
            disabled={isDownloading || isDisabled}
            color={'primary'}
            onClick={handleDownloadClick}
            variant={'contained'}
          >
            {'Download'}
          </Button>
        </Grid>
      </Grid>
      <Snack
        snackOpen={snackOpen}
        snackVariant={'error'}
        snackMsg={snackMsg}
        onClose={handleSnackClose}
      />
    </div>
  );
}

export default ProductReport;
