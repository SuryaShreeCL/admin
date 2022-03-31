import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearCustomData,
  generateMasterReport,
  getMasterReport,
} from "../../Actions/Reports";
import { ReactComponent as RefreshIcon } from "../../Asset/icons/refresh.svg";
import BackButton from "../../Asset/Images/backbutton.svg";
import {
  BlueCell,
  BodyCell,
  BreadCrumpContainer,
  Head,
  HeadCell,
  HeadInline,
  typographyStyle,
  useStyles,
} from "../../Asset/StyledComponents/ReportStyles";
import PaginationComponent from "../../Component/Utils/CustomPaginationComponent";
import TextFieldComponent from "./../Controls/TextField";
import Snack from "./../MySnackBar";
import { studentPath } from "./../RoutePaths";

const SIZE = 20;

function MasterReport(props) {
  const classes = useStyles();
  const { reportName } = useParams();
  const [state, setState] = useState({
    startDate: null,
    endDate: null,
    endDateHelperText: null,
    isDisabled: true,
    snackOpen: false,
    snackMsg: "",
    masterReportList: [],
    page: 0,
    totalPage: 0,
  });
  const {
    startDate,
    endDate,
    endDateHelperText,
    isDisabled,
    snackOpen,
    snackMsg,
    page,
    totalPage,
    masterReportList,
  } = state;

  const dispatch = useDispatch();
  const { masterReport, generateMasterReportStatus } = useSelector(
    (stateValue) => stateValue.ReportReducer
  );

  useEffect(() => {
    dispatch(getMasterReport(0, SIZE, reportName));
  }, []);

  useEffect(() => {
    if (generateMasterReportStatus) {
      if (
        generateMasterReportStatus.status &&
        generateMasterReportStatus.status <= 500
      ) {
        if (generateMasterReportStatus.success)
          dispatch(getMasterReport(0, SIZE, reportName));
        else {
          setState({
            ...state,
            snackOpen: true,
            snackMsg: generateMasterReportStatus.message,
          });
        }
      }
      dispatch(clearCustomData("generateMasterReportStatus"));
    }
  }, [generateMasterReportStatus]);

  useEffect(() => {
    if (masterReport) {
      if (masterReport.success) {
        if (masterReport.content && masterReport.content.length !== 0) {
          setState({
            ...state,
            masterReportList: masterReport.content || [],
            totalPage: masterReport.totalPages || 0,
          });
        } else {
          setState({
            ...state,
            masterReportList: [],
            totalPage: 0,
            page: 0,
            snackOpen: true,
            snackMsg: "No results found",
          });
        }
      } else {
        setState({
          ...state,
          masterReportList: [],
          totalPage: 0,
          page: 0,
          snackOpen: true,
          snackMsg: masterReport.message,
        });
      }
      dispatch(clearCustomData("masterReport"));
    }
  }, [masterReport]);

  const compare = (dateTimeA, dateTimeB) => {
    if (dateTimeA && dateTimeB) {
      var momentA = moment(new Date(dateTimeA), "DD/MM/YYYY");
      var momentB = moment(new Date(dateTimeB), "DD/MM/YYYY");
      if (momentA > momentB) return true;
      else return false;
    } else return false;
  };

  useEffect(() => {
    if (startDate && endDate) {
      if (compare(startDate, endDate)) {
        setState({
          ...state,
          endDateHelperText: "Please select a valid date",
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

  const handleDownloadClick = (link) => {
    if (link) {
      window.location.href = link;
    }
  };

  const handleGenerateClick = () => {
    setState({
      ...state,
      page: 0,
      totalPage: 0,
    });
    dispatch(generateMasterReport(startDate, endDate, reportName));
    setTimeout(() => {
      dispatch(getMasterReport(0, SIZE, reportName));
    }, 200);
  };

  const handleRefresh = () => {
    setState({
      ...state,
      page: 0,
      totalPage: 0,
      masterReportList: [],
    });
    dispatch(getMasterReport(0, SIZE, reportName));
  };

  const handleSnackClose = () => {
    setState({ ...state, snackOpen: false, snackMsg: "" });
  };

  const handlePageChange = (event, value) => {
    setState({ ...state, page: value - 1 });
    dispatch(getMasterReport(value - 1, SIZE, reportName));
  };

  const renderButtonText = (value) => {
    let text = "Inprogress";
    if (value) {
      text = "Download";
    }
    return text;
  };

  const renderTable = () => {
    const columns = ["Created date", "Selection range", "Created by", ""];

    return (
      <Box>
        <Box>
          <Fragment>
            <TableContainer style={{ maxHeight: 596 }}>
              <Table stickyHeader>
                <Head>
                  <TableRow>
                    {columns.map((item, index) => (
                      <HeadCell key={index}>
                        <HeadInline>{item}</HeadInline>
                      </HeadCell>
                    ))}
                  </TableRow>
                </Head>
                <TableBody>
                  {masterReportList &&
                    masterReportList.length !== 0 &&
                    masterReportList.map(
                      (
                        { createdAt, userSelectedDate, downloadLink, userRole },
                        index
                      ) => {
                        return (
                          <TableRow key={index} style={{ border: "0 0 0 0" }}>
                            <BodyCell>{createdAt || "NA"}</BodyCell>
                            <BodyCell>{userSelectedDate || "NA"}</BodyCell>
                            <BlueCell>{userRole?.username || "NA"}</BlueCell>
                            <BodyCell align={"right"}>
                              <Button
                                disabled={!Boolean(downloadLink)}
                                color={"primary"}
                                onClick={() =>
                                  handleDownloadClick(downloadLink)
                                }
                                variant={"contained"}
                              >
                                {renderButtonText(downloadLink)}
                              </Button>
                            </BodyCell>
                          </TableRow>
                        );
                      }
                    )}
                </TableBody>
              </Table>
            </TableContainer>
          </Fragment>
        </Box>
        {totalPage > 1 && (
          <PaginationComponent
            page={page + 1}
            pageCount={totalPage}
            onPageChange={handlePageChange}
          />
        )}
      </Box>
    );
  };

  return (
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
            {"Home"}
          </Typography>
          <Typography className={classes.textSTyle}>{"Report"}</Typography>
        </Breadcrumbs>
      </BreadCrumpContainer>
      <Grid container spacing={2}>
        <Grid xs={12} item />
        <Grid item xs={3}>
          <TextFieldComponent
            type={"date"}
            color={"primary"}
            variant={"outlined"}
            label={"Start Date"}
            name={"startDate"}
            value={startDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: moment()
                .subtract(1, "days")
                .format("YYYY-MM-DD"),
            }}
            onKeyDown={(event) => {
              event.preventDefault();
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextFieldComponent
            type={"date"}
            color={"primary"}
            variant={"outlined"}
            label={"End Date"}
            name={"endDate"}
            value={endDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: moment(new Date()).format("YYYY-MM-DD"),
            }}
            error={Boolean(endDateHelperText)}
            helperText={endDateHelperText || " "}
            onKeyDown={(event) => {
              event.preventDefault();
            }}
            fullWidth
          />
        </Grid>
        <Grid
          item
          xs={6}
          justifyContent={"flex-end"}
          alignItems={"center"}
          container
        >
          <Button
            disabled={isDisabled}
            color={"primary"}
            onClick={handleGenerateClick}
            variant={"contained"}
          >
            {"Generate"}
          </Button>
          <Box margin={"0px 10px 0px 30px"}>
            <IconButton onClick={handleRefresh} title={"Refresh"}>
              <RefreshIcon color={"#009be5"} width={"26px"} height={"26px"} />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {masterReportList && masterReportList.length !== 0 && renderTable()}
        </Grid>
      </Grid>
      <Snack
        snackOpen={snackOpen}
        snackVariant={"error"}
        snackMsg={snackMsg}
        onClose={handleSnackClose}
      />
    </div>
  );
}

export default MasterReport;
