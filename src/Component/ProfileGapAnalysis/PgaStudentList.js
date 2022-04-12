import { Box, Chip, Grid, IconButton, TextField } from "@material-ui/core";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { Autocomplete } from "@material-ui/lab";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getReferProductVariantByProductId } from "../../Actions/ProductAction";
import { getPgaList } from "../../Actions/ProfileGapAction";
import { getAllIntakeList, StudentStepDetails } from "../../Actions/Student";
import PrimaryButton from "../../Utils/PrimaryButton";
import MySnackBar from "../MySnackBar";
import { stagedTabsPath } from "../RoutePaths";
import Loader from "../Utils/controls/Loader";
import { isEmptyString } from "../Validation";
import DataGrid from "./DataGrid";

const NO_RESULT_FOUND = "No Result Found";
class PgaStudentList extends Component {
  constructor() {
    super();
    this.state = {
      shrink: false,
      listOfUsers: [],
      search: "",
      status: {
        pending: "Pending",
        completed: "Completed",
      },
      intake: null,
      intakeList: [],
      snackOpen: false,
      snackVariant: "",
      snackMsg: "",
      productVariantList: [],
      product: null,
      page: 0,
      pageSize: 20,
      rowCount: 0,
    };
  }

  filterStudentList = (keyword, size, activePage) => {
    const { match } = this.props;
    const { intake, product } = this.state;
    const productId = product?.id || match.params.productId;
    this.props.getPgaList(productId, size, activePage, intake?.year, keyword);
  };

  componentDidMount() {
    const { match } = this.props;
    const { search, page, pageSize } = this.state;

    // To get the users based on stages
    this.filterStudentList(search, pageSize, page);
    if (match.params.productId) {
      this.props.getReferProductVariantByProductId(match.params.productId);
    }
    this.props.getAllIntakeList();
  }

  componentDidUpdate(prevProps, prevState) {
    const { allIntakeList, pgaList, productVariant } = this.props;
    const { search, intake, product } = this.state;

    // Setting the users in state
    if (pgaList && pgaList !== prevProps.pgaList) {
      if (pgaList.success) {
        if (pgaList.data?.totalElements === 0) {
          this.setState({
            snackOpen: true,
            snackVariant: "error",
            snackMsg: NO_RESULT_FOUND,
            listOfUsers: [],
          });
        } else {
          this.setState({
            listOfUsers: pgaList.data.content || [],
            rowCount: pgaList.data.totalElements || 0,
          });
        }
      } else {
        this.setState({
          snackOpen: true,
          snackVariant: "error",
          snackMsg: pgaList.message,
          listOfUsers: [],
        });
      }
    }

    if (search !== prevState.search) {
      if (isEmptyString(search)) {
        const { pageSize } = this.state;
        this.filterStudentList("", pageSize, 0);
      }
    }

    if (intake !== prevState.intake || product !== prevState.product) {
      const { search, pageSize } = this.state;
      this.filterStudentList(search, pageSize, 0);
    }

    if (allIntakeList && allIntakeList !== prevProps.allIntakeList) {
      if (allIntakeList.success) {
        let arr = allIntakeList.data || [];
        let uniqueYearArr = arr.filter(
          (a, i) => arr.findIndex((s) => a.year === s.year) === i
        );
        this.setState({ intakeList: uniqueYearArr });
      } else {
        this.setState({
          snackOpen: true,
          snackVariant: "error",
          snackMsg: allIntakeList.message,
        });
      }
    }

    if (productVariant && productVariant !== prevProps.productVariant) {
      if (productVariant.success) {
        this.setState({
          productVariantList: productVariant.data || [],
        });
      } else {
        this.setState({
          snackMsg: productVariant.message,
          snackOpen: true,
          snackVariant: "error",
          productVariantList: [],
        });
      }
    }
  }

  renderPgaChip = (pgaCallStatus) => {
    if (pgaCallStatus.pgaCallStatus === "Completed") {
      return (
        <Chip
          label={this.state.status[pgaCallStatus.pgaCallStatus]}
          color={"primary"}
        />
      );
    } else if (pgaCallStatus.pgaCallStatus === null) {
      return <Chip label={"Pending"} color={"secondary"} />;
    } else {
      return (
        <Chip
          label={this.state.status[pgaCallStatus.pgaCallStatus]}
          color={"secondary"}
        />
      );
    }
  };

  renderPpgaChip = (ppgaCallStatus) => {
    return <Chip label={"Pending"} color={"secondary"} />;
  };

  handleManage = (eachItem) => {
    const productId = eachItem.productId;
    this.props.StudentStepDetails(eachItem.studentId, productId);
    this.props.history.push(
      `${stagedTabsPath}${eachItem.studentId}/${productId}/?stage=pga`
    );
  };

  renderManageButton = (eachItem) => {
    return (
      <PrimaryButton
        onClick={() => this.handleManage(eachItem)}
        variant={"contained"}
        color={"primary"}
        style={{ textTransform: "none", width: "100px" }}
      >
        {"Manage"}
      </PrimaryButton>
    );
  };

  shrink() {
    this.setState({ shrink: true });
  }

  // To handle search
  handleSearch = () => {
    const { search, pageSize } = this.state;
    if (!isEmptyString(search)) {
      this.filterStudentList(search, pageSize, 0);
    }
  };

  handleDropdownValueChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSnackClose = () => {
    this.setState({
      snackOpen: false,
      snackVariant: "",
      snackMsg: "",
    });
  };

  onPageChange = (newPage) => {
    const { pageSize, search } = this.state;
    this.setState({ page: newPage });
    this.filterStudentList(search, pageSize, newPage);
  };

  onPageSizeChange = (newPageSize) => {
    const { search } = this.state;
    this.setState({ pageSize: newPageSize, page: 0 });
    this.filterStudentList(search, newPageSize, 0);
  };

  render() {
    const { loading } = this.props;
    const {
      snackOpen,
      snackVariant,
      snackMsg,
      listOfUsers,
      intakeList,
      intake,
      productVariantList,
      product,
      page,
      pageSize,
      rowCount,
    } = this.state;
    const { HeadStyle, HeadDisplay } = style;
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item md={12}>
            <div style={HeadDisplay}>
              <Grid container spacing={3} alignItems={"center"}>
                <Grid item md={4}>
                  <p style={HeadStyle}>
                    {"List of Users in Profile Gap Analysis Stage"}
                  </p>
                </Grid>
                <Grid item md={3}>
                  <Autocomplete
                    id={"combo-box-product-variant"}
                    options={productVariantList}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, newValue) =>
                      this.handleDropdownValueChange(newValue, "product")
                    }
                    value={product}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Product variant"}
                        variant={"outlined"}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={2}>
                  <Autocomplete
                    id={"combo-box-intake"}
                    options={intakeList}
                    getOptionLabel={(option) => option.year.toString()}
                    onChange={(e, newValue) =>
                      this.handleDropdownValueChange(newValue, "intake")
                    }
                    value={intake}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Intake Year"}
                        variant={"outlined"}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={3}>
                  <Box display={"flex"}>
                    <TextField
                      label={
                        <span
                          style={{ fontSize: "13px", marginRight: "-20px" }}
                        >
                          {`Search by Email ID / Mobile / Full Name / CLS ID`}
                        </span>
                      }
                      variant='outlined'
                      value={this.state.search}
                      onChange={(e) => {
                        this.setState({ search: e.target.value });
                      }}
                      InputLabelProps={{
                        shrink: this.state.shrink,
                      }}
                      onFocus={() => this.shrink()}
                      onKeyUp={(e) => {
                        if (e.keyCode === 13) {
                          e.preventDefault();
                          document.getElementById("search").click();
                        }
                      }}
                      fullWidth
                    />
                    <IconButton
                      style={{ marginLeft: "8px" }}
                      onClick={this.handleSearch}
                      color='primary'
                      id={"search"}
                      aria-label='search'
                    >
                      <SearchRoundedIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item md={12}>
            {listOfUsers && listOfUsers.length !== 0 ? (
              <DataGrid
                data={this.state.listOfUsers}
                pgaCallStatus={this.renderPgaChip}
                ppgaCallStatus={this.renderPpgaChip}
                action={this.renderManageButton}
                page={page}
                pageSize={pageSize}
                rowCount={rowCount}
                onPageChange={this.onPageChange}
                onPageSizeChange={this.onPageSizeChange}
              />
            ) : loading ? (
              <Loader />
            ) : null}
          </Grid>
        </Grid>
        <MySnackBar
          snackOpen={snackOpen}
          snackMsg={snackMsg}
          snackVariant={snackVariant}
          onClose={this.handleSnackClose}
        />
      </div>
    );
  }
}
const style = {
  HeadStyle: {
    fontStyle: "Poppins",
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: "18px",
    color: "#052A4E",
    // padding:15
  },
  HeadDisplay: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 20,
  },
};
const mapStateToProps = (state) => {
  return {
    allIntakeList: state.StudentReducer.allIntakeList,
    loading: state.ProfileGapAnalysisReducer.loading,
    productVariant: state.ProductReducer.productVariant,
    pgaList: state.ProfileGapAnalysisReducer.getPgaList,
  };
};

export default connect(mapStateToProps, {
  getPgaList,
  StudentStepDetails,
  getAllIntakeList,
  getReferProductVariantByProductId,
})(PgaStudentList);
