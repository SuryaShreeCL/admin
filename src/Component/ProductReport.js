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
import {
  clearCustomData,
  generateProductReport,
  getProductReport,
} from "../Actions/Reports";
import BackButton from "../Asset/Images/backbutton.svg";
import {
  BlueCell,
  BodyCell,
  BreadCrumpContainer,
  Head,
  HeadCell,
  HeadInline,
  typographyStyle,
  useStyles,
} from "../Asset/StyledComponents/ReportStyles";
import PaginationComponent from "../Component/Utils/CustomPaginationComponent";
import TextFieldComponent from "./Controls/TextField";
import Snack from "./MySnackBar";
import { studentPath } from "./RoutePaths";
import { ReactComponent as RefreshIcon } from "../Asset/icons/refresh.svg";

const SIZE = 20;

function ProductReport(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    startDate: null,
    endDate: null,
    endDateHelperText: null,
    isDisabled: true,
    snackOpen: false,
    snackMsg: "",
    productReportList: [],
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
    productReportList,
  } = state;

  const dispatch = useDispatch();
  const { productReport } = useSelector(
    (stateValue) => stateValue.ReportReducer
  );

  useEffect(() => {
    dispatch(getProductReport(0, SIZE));
  }, []);

  useEffect(() => {
    if (productReport) {
      if (productReport.success) {
        if (productReport.content && productReport.content.length !== 0) {
          setState({
            ...state,
            productReportList: productReport.content || [],
            totalPage: productReport.totalPages || 0,
          });
        } else {
          setState({
            ...state,
            productReportList: [],
            totalPage: 0,
            page: 0,
            snackOpen: true,
            snackMsg: "No results found",
          });
        }
      } else {
        setState({
          ...state,
          productReportList: [],
          totalPage: 0,
          page: 0,
          snackOpen: true,
          snackMsg: productReport.message,
        });
      }
      dispatch(clearCustomData("productReport"));
    }
  }, [productReport]);

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
      productReportList: [],
    });
    dispatch(generateProductReport(startDate, endDate));
    dispatch(getProductReport(0, SIZE));
  };

  const handleRefresh = () => {
    setState({
      ...state,
      page: 0,
      totalPage: 0,
      productReportList: [],
    });
    dispatch(getProductReport(0, SIZE));
  };

  const handleSnackClose = () => {
    setState({ ...state, snackOpen: false, snackMsg: "" });
  };

  const handlePageChange = (event, value) => {
    setState({ ...state, page: value - 1 });
    dispatch(getProductReport(value - 1, SIZE));
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
                  {productReportList &&
                    productReportList.length !== 0 &&
                    productReportList.map(
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
              max: moment(new Date()).format("YYYY-MM-DD"),
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
          {productReportList && productReportList.length !== 0 && renderTable()}
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

export default ProductReport;
