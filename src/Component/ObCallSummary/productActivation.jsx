import {
  Breadcrumbs,
  CircularProgress,
  createMuiTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
// import{getsearchlist} from '../../Actions/Calldetails'
// import button from './button';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import { ExpandMore } from "@material-ui/icons";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import CloseIcon from "@material-ui/icons/Close";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import SearchIcon from "@material-ui/icons/Search";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { Autocomplete } from "@material-ui/lab";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  activateStudentProduct,
  getAwaitingUsersByAdminId,
} from "../../Actions/AdminAction";
import {
  getAllProductFamily,
  getProductByFamilyId,
  getProductVarient,
  searchProductActivationList,
} from "../../Actions/ProductAction";
import BackButton from "../../Asset/Images/backbutton.svg";
import PrimaryButton from "../../Utils/PrimaryButton";
import MySnackBar from "../MySnackBar";
import { studentPath } from "../RoutePaths";
import Loader from "../Utils/controls/Loader";
import { isEmptyArray, isEmptyString } from "../Validation";
import * as moment from "moment";

const AntTabs = withStyles({
  root: {
    borderBottom: "2px solid #A2D3FC",
  },
  indicator: {
    backgroundColor: "#1890ff",
    height: "5px",
    borderRadius: "6px 6px 0px 0px",
  },
})(Tabs);

const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      root: {
        whiteSpace: "nowrap",
        fontSize: "inherit",
      },
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: "0px",
        marginBottom: "0px",
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: "20px",
      },
    },
  },
});
const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&$selected": {
      color: "#000",
      fontWeight: theme.typography.fontWeightBold,
    },
    "&:focus": {
      color: "#000",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

class ProductActivation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabCount: 0,
      show: false,
      id: "",
      clientName: null,
      contactNumber: null,
      email: null,
      clsId: null,
      productFamily: null,
      productVariant: null,
      intake: null,
      year: null,
      validity: null,
      endServiceDate: null,
      amountPaid: null,
      bdaName: null,
      studentId: null,
      snackOpen: false,
      snackColor: null,
      snackMsg: null,
      shrink: false,
      listOfUsers: [],
      keyword: "",
      intakehlpTxt: "",
      yearhlpTxt: "",
      yearArr: [],
      currentYear: new Date().getFullYear(),
      loading: false,
    };
  }
  handleClose = (e) => {
    this.setState({ show: false });
  };
  intakeSession = [{ title: "Fall" }, { title: "Summer" }, { title: "Spring" }];
  componentDidMount() {
    // this.props.getAwaitingUsersByAdminId();
    this.props.getAllProductFamily();
    this.props.getProductVarient();
    this.props.searchProductActivationList(
      this.props.match.params.productId,
      this.state.keyword
    );
    for (let i = 0; i < 10; i++) {
      let arr = this.state.currentYear + i;
      this.state.yearArr.push({ title: arr.toString() });
    }
    this.setState({ loading: true });
  }
  shrink() {
    this.setState({ shrink: true });
  }

  handleShowPopUp = (data) => {
    this.setState({
      show: true,
      clientName:
        data.fullName === null ? data.firstName + data.lastName : data.fullName,
      contactNumber: data.phoneNumber,
      email: data.emailId,
      clsId: data.clsId,
      productFamily: data.products.productFamily,
      productVariant: data.products,
      intake: data.products.intake,
      year: data.year,
      validity: data.products.validity,
      endServiceDate: data.products.endOfServiceDate,
      amountPaid: data.products.sellingPrice,
      bdaName: data.punchedBy,
      studentId: data.studentId,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.productActivationResponse !==
      prevProps.productActivationResponse
    ) {
      this.setState({
        snackOpen: true,
        snackColor: "success",
        snackMsg: "Product activated successfully",
        show: false,
        isLoading: false,
      });
    }
    if (
      this.props.awaitingUsersForActivationList !==
      prevProps.awaitingUsersForActivationList
    ) {
      this.setState({
        listOfUsers: this.props.awaitingUsersForActivationList.content,
        loading: false,
      });
    }

    if (this.props.searchActivationList !== prevProps.searchActivationList) {
      const { searchActivationList } = this.props;
      if (
        searchActivationList &&
        typeof searchActivationList === "object" &&
        searchActivationList.content
      ) {
        if (searchActivationList.content?.length !== 0) {
          this.setState({
            listOfUsers: searchActivationList.content,
            loading: false,
          });
        } else {
          this.setState({
            listOfUsers: [],
            loading: false,
          });
        }
      } else {
        this.setState({
          snackOpen: true,
          snackColor: "error",
          snackMsg: "Exception failed",
          loading: false,
        });
      }
    }
    if (this.state.keyword !== prevState.keyword) {
      if (isEmptyString(this.state.keyword)) {
        this.props.searchProductActivationList(
          this.props.match.params.productId,
          this.state.keyword
        );
        this.setState({ loading: true });
      }
    }
  }

  handleActivate = () => {
    let helperText = "Please fill the required field";
    this.state.intake === null
      ? this.setState({
          intakehlpTxt: helperText,
        })
      : this.setState({
          intakehlpTxt: "",
        });
    this.state.year === null
      ? this.setState({
          yearhlpTxt: helperText,
        })
      : this.setState({
          yearhlpTxt: "",
        });
    this.setState({ isLoading: true });
    let obj = {
      studentId: this.state.studentId,
      productPaymentModels: [
        {
          productId: this.state.productVariant.id,
          stage: "Activated",
          activatedBy: window.sessionStorage.getItem("adminUserId"),
          intakeTerm: this.state.intake && this.state.intake.title,
          intakeYear: this.state.year && this.state.year.title,
        },
      ],
    };
    if (this.state.intake !== null && this.state.year !== null) {
      this.props.activateStudentProduct(obj, (response) => {
        if (response.data === "updated") {
          this.setState({
            snackOpen: true,
            snackColor: "success",
            snackMsg: "Product activated successfully",
            show: false,
            isLoading: false,
          });
          this.props.searchProductActivationList(
            this.props.match.params.productId,
            this.state.keyword
          );
        }
      });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };

  // To handle search

  handleSearch = () => {
    this.props.searchProductActivationList(
      this.props.match.params.productId,
      this.state.keyword
    );
    this.setState({ loading: true });
  };

  render() {
    return (
      <div style={{ padding: 10 }}>
        <div style={{ display: "flex", flexDirection: "row", margin: "10px" }}>
          <img
            src={BackButton}
            style={{ cursor: "pointer", marginTop: "-10px" }}
            onClick={() => this.props.history.goBack()}
          />
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <Typography
              style={{
                cursor: "pointer",
                fontWeight: "600",
                marginLeft: "10px",
              }}
              onClick={() => this.props.history.push(studentPath)}
            >
              Home
            </Typography>
            <Typography style={{ cursor: "pointer", fontWeight: "600" }}>
              Product Activation
            </Typography>
          </Breadcrumbs>
        </div>
        <ThemeProvider theme={theme}>
          {/* <div style={{ display: 'flex', flexDirection: 'row', }}> */}

          <AntTabs
            value={this.state.tabCount}
            textColor={"inherit"}
            // onChange={(e, value) => this.setState({ tabCount: value })}
            aria-label="ant example"
          >
            <AntTab label="Awaiting Allocation" />
          </AntTabs>
          <TextField
            label="&nbsp; &nbsp;&nbsp;&nbsp;   Search by Email ID / Mobile / Full Name / CLS ID"
            variant="outlined"
            value={this.state.keyword}
            onChange={(e) => this.setState({ keyword: e.target.value })}
            InputLabelProps={{
              shrink: this.state.shrink,
            }}
            // onKeyUp={(e) => {
            //   if (e.keyCode === 13) {
            //     this.props.searchProductActivationList(
            //       this.props.match.params.productId,
            //       this.state.keyword
            //     );
            //   }
            // }}
            // label=""

            onFocus={() => this.shrink()}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                e.preventDefault();
                document.getElementById("search").click();
              }
            }}
            // type="search"
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">
            //       <SearchIcon />
            //     </InputAdornment>
            //   ),
            // }}
            style={{ width: "40%", marginLeft: "50%", bottom: 65 }}
          />
          <IconButton
            style={{ marginLeft: "8px", top: -60 }}
            onClick={this.handleSearch}
            color="primary"
            id={"search"}
            aria-label="search"
          >
            <SearchRoundedIcon />
          </IconButton>
          {/* </div> */}

          <TableContainer>
            <Table>
              <TableHead>
                {this.state.listOfUsers.length !== 0 ? (
                  <TableRow>
                    <TableCell align="center">CLS ID</TableCell>
                    <TableCell align="center">Client Name</TableCell>
                    <TableCell align="center">College</TableCell>
                    <TableCell align="center">Dept</TableCell>
                    <TableCell align="center">Degree</TableCell>
                    <TableCell align="center">Product Variant</TableCell>
                    <TableCell align="center">Order Punch Date</TableCell>
                    <TableCell align="center">Amount Paid</TableCell>
                    <TableCell align="center">Activated</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                ) : (
                  this.state.loading && <Loader />
                )}
              </TableHead>
              <TableBody>
                {this.state.listOfUsers.length !== 0 &&
                  this.state.listOfUsers.map((eachData, index) => {
                    // let date = new Date(eachData.orderDate).getDate();
                    // let month = new Date(eachData.orderDate).getMonth() + 1;
                    // let monthInWords = moment(new Date(month)).format('MMM');
                    // let year = new Date(eachData.orderDate).getFullYear();
                    // let newDate =
                    //   eachData.orderDate !== null
                    //     ? monthInWords + '/' + year
                    //     : null;
                    return (
                      <TableRow>
                        <TableCell align="center">{eachData.clsId}</TableCell>
                        <TableCell align="center">
                          {eachData.firstName + eachData.lastName}
                        </TableCell>
                        <TableCell align="center">{eachData.college}</TableCell>
                        <TableCell align="center">
                          {eachData.department}
                        </TableCell>
                        <TableCell align="center">{eachData.degree}</TableCell>
                        <TableCell align="center">
                          {eachData.products.name}
                        </TableCell>
                        <TableCell align="center">
                          {moment(new Date(eachData.orderDate)).format(
                            "MMM yyyy"
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {eachData.paymentProvider}
                        </TableCell>
                        <TableCell align="center">{eachData.stage}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => this.handleShowPopUp(eachData)}
                          >
                            <AddCircleRoundedIcon
                              style={{ color: "#1093FF" }}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
              {/* <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                    //   colSpan={3}
                      count={this.props.searchActivationList.content}
                      rowsPerPage={10}
                      page={1}
                      SelectProps={{
                        inputProps: { "aria-label": "rows per page" },
                        native: true,
                      }}
                    //   onPageChange={handleChangePage}
                    //   onRowsPerPageChange={handleChangeRowsPerPage}
                    //   ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter> */}
            </Table>
          </TableContainer>
          <div style={{ borderRadius: 10 }}>
            <Dialog
              maxWidth="lg"
              fullWidth={true}
              open={this.state.show}
              onClose={this.handleClose}
              // maxHeight='lg'
              aria-labelledby="customized-dialog-title"
            >
              {/* <Dialog id="customized-dialog-title" > */}
              <div className="flex-1 text-center"></div>
              <div
                className="model-close-button"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <IconButton aria-label="close" onClick={this.handleClose}>
                  <CloseIcon
                    style={{
                      background: "#ADD8E6",
                      borderRadius: 20,
                      color: "#1093FF",
                      backgroundSize: 20,
                    }}
                  />
                </IconButton>
              </div>
              {/* </DialogTitle> */}
              <DialogContent style={{ height: "300px" }}>
                <Grid
                  container
                  spacing={4}
                  style={{ width: "90%", paddingLeft: 50 }}
                >
                  <Grid item xs={6} sm={3}>
                    <TextField
                      color="primary"
                      label="Client Name"
                      fullWidth
                      disabled
                      value={this.state.clientName}
                      // value={this.state.name}
                      // onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      color="primary"
                      label="Contact Number"
                      fullWidth
                      disabled
                      value={this.state.contactNumber}
                      // value={this.state.name}
                      // onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      color="primary"
                      label="Email Address"
                      fullWidth
                      disabled
                      value={this.state.email}
                      // value={this.state.name}
                      // onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      disabled
                      value={this.state.clsId}
                      color="primary"
                      label="CLS ID"
                      fullWidth
                      // value={this.state.name}
                      // onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Autocomplete
                      popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                      id="combo-box-demo"
                      disabled
                      value={this.state.productFamily}
                      options={this.props.getAllProductFamilyList}
                      getOptionLabel={(option) => option.productName}
                      //   style={{ width: 300 }}
                      onChange={(e, value) =>
                        this.setState({ productFamily: value })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Product Family"
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Autocomplete
                      popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                      id="combo-box-demo"
                      disabled
                      value={this.state.productVariant}
                      options={this.props.getProductVarientList}
                      getOptionLabel={(option) => option.name}
                      onChange={(e, value) =>
                        this.setState({ productVariant: value })
                      }
                      //   style={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Product Variant"
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Autocomplete
                      popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                      options={this.intakeSession}
                      getOptionLabel={(option) => option.title}
                      value={this.state.intake}
                      onChange={(e, newValue) =>
                        this.setState({ intake: newValue })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          value={this.state.intake}
                          label="Intake"
                          error={this.state.intakehlpTxt}
                          helperText={this.state.intakehlpTxt}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Autocomplete
                      popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                      options={this.state.yearArr}
                      getOptionLabel={(option) => option.title}
                      value={this.state.year}
                      onChange={(e, newValue) =>
                        this.setState({ year: newValue })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          value={this.state.intake}
                          color="primary"
                          label="Year"
                          error={this.state.yearhlpTxt}
                          helperText={this.state.yearhlpTxt}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      disabled
                      value={this.state.validity}
                      color="primary"
                      label="Product Validity"
                      fullWidth
                      // value={this.state.name}
                      // onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      disabled
                      value={this.state.endServiceDate}
                      color="primary"
                      label="End Of Service Date"
                      fullWidth
                      // value={this.state.name}
                      // onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      disabled
                      value={this.state.amountPaid}
                      color="primary"
                      label="Amount Paid"
                      fullWidth
                      // value={this.state.name}
                      // onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      disabled
                      value={this.state.bdaName}
                      color="primary"
                      label="BDA Name"
                      fullWidth
                      // value={this.state.name}
                      // onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              {/* <DialogActions> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "10%",
                  paddingBottom: "5%",
                }}
              >
                <PrimaryButton
                  onClick={this.handleActivate}
                  variant={"contained"}
                  color={"primary"}
                  disabled={this.state.isLoading}
                  style={{ textTransform: "none" }}
                >
                  {this.state.isLoading && (
                    <CircularProgress
                      disableShrink
                      style={{
                        color: "#fff",
                        width: 20,
                        height: 20,
                        marginRight: 10,
                      }}
                    />
                  )}
                  Activate
                </PrimaryButton>
              </div>
              {/* </DialogActions> */}
            </Dialog>
          </div>
        </ThemeProvider>
        <MySnackBar
          onClose={() => this.setState({ snackOpen: false })}
          snackOpen={this.state.snackOpen}
          snackVariant={this.state.snackColor}
          snackMsg={this.state.snackMsg}
        />
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    awaitingUsersForActivationList:
      state.AdminReducer.awaitingUsersForActivationList,
    productActivationResponse: state.AdminReducer.productActivationResponse,
    getAllProductFamilyList: state.ProductReducer.getAllProductFamily,
    getProductByFamilyIdList: state.ProductReducer.getProductByFamilyId,
    getProductVarientList: state.ProductReducer.getProductVarient,
    searchActivationList: state.ProductReducer.searchActivationList,
    // getsearchlistResonse : state.CallReducer.getsearchlist
  };
};

export default connect(mapStateToProps, {
  getAwaitingUsersByAdminId,
  activateStudentProduct,
  getProductByFamilyId,
  getAllProductFamily,
  getProductVarient,
  searchProductActivationList,
  // getsearchlist
})(ProductActivation);
