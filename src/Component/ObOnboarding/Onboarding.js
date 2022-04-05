import { Box, Chip, Grid, IconButton, TextField } from "@material-ui/core";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { Autocomplete } from "@material-ui/lab";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getStudentByStages } from "../../Actions/AdminAction";
import { getReferProductVariantByProductId } from "../../Actions/ProductAction";
import { getAllIntakeList, StudentStepDetails } from "../../Actions/Student";
import Call from "../../Asset/Images/callImg.png";
import PrimaryButton from "../../Utils/PrimaryButton";
import MySnackBar from "../MySnackBar";
import { stagedTabsPath } from "../RoutePaths";
import Loader from "../Utils/controls/Loader";
import { isEmptyString } from "../Validation";
import DataGrid from "./DataGrid";

const NO_RESULT_FOUND = "No Result Found";
export class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shrink: false,
      draweropen: false,
      college: null,
      department: null,
      intake: null,
      city: null,
      bda: null,
      search: null,
      listOfUsers: [],
      intake: null,
      intakeList: [],
      snackOpen: false,
      snackVariant: "",
      snackMsg: "",
      productVariantList: [],
      product: null,
    };
  }

  filterStudentList = (keyword, size, page) => {
    const { match, stageDetails } = this.props;
    const { intake, product, search } = this.state;
    const productId = product?.id || match.params.productId;
    this.props.getStudentByStages(
      productId,
      stageDetails.stepName,
      size || 20,
      page || 0,
      intake?.year,
      keyword || search
    );
  };

  componentDidMount() {
    const { match } = this.props;

    // To get the users based on stages
    this.filterStudentList();
    if (match.params.productId) {
      this.props.getReferProductVariantByProductId(match.params.productId);
    }
    this.props.getAllIntakeList();
  }

  componentDidUpdate(prevProps, prevState) {
    const { allIntakeList, studentsByStagesList, productVariant } = this.props;
    const { search, intake, product } = this.state;

    // Setting the users in state
    if (
      studentsByStagesList &&
      studentsByStagesList !== prevProps.studentsByStagesList
    ) {
      if (studentsByStagesList.success) {
        if (studentsByStagesList.data?.totalElements === 0) {
          this.setState({
            snackOpen: true,
            snackVariant: "error",
            snackMsg: NO_RESULT_FOUND,
            listOfUsers: [],
          });
        } else {
          this.setState({
            listOfUsers: studentsByStagesList.data.content || [],
          });
        }
      } else {
        this.setState({
          snackOpen: true,
          snackVariant: "error",
          snackMsg: studentsByStagesList.message,
          listOfUsers: [],
        });
      }
    }

    if (search !== prevState.search) {
      if (isEmptyString(search)) {
        this.filterStudentList("");
      }
    }

    if (intake !== prevState.intake || product !== prevState.product) {
      this.filterStudentList();
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

  handleManage = (eachItem) => {
    const productId = eachItem.productId;
    this.props.StudentStepDetails(eachItem.studentId, productId);
    this.props.getVariantStepsById(
      `${productId}?studentId=${eachItem.studentId}&platform=old`
    );
    this.props.history.push(
      `${stagedTabsPath}${eachItem.studentId}/${productId}?stage=OnBoarding`
    );
  };

  shrink() {
    this.setState({ shrink: true });
  }

  renderChip = (obCallStatus) => {
    const { product } = this.state;
    const { match } = this.props;
    const productId = product?.id || match.params.productId;

    if (obCallStatus.obCallStatus) {
      return (
        <Chip
          onClick={() => {
            this.props.history.push(
              `${stagedTabsPath}${obCallStatus.studentId}/${productId}?render=pga`
            );
          }}
          label={obCallStatus.obCallStatus}
          color={"primary"}
        />
      );
    } else {
      return (
        <Chip
          onClick={() => {
            this.props.history.push(
              `${stagedTabsPath}${obCallStatus.studentId}/${productId}?render=pga`
            );
          }}
          label={"Pending"}
          color={"secondary"}
        />
      );
    }
  };

  renderManageButton = (eachItem) => {
    const { product } = this.state;
    const { match } = this.props;
    const productId = product?.id || match.params.productId;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <img
          onClick={() =>
            this.props.history.push(
              `${stagedTabsPath}${eachItem.studentId}/${productId}?render=pga`
            )
          }
          src={Call}
          style={{
            height: 30,
            width: 30,
            marginRight: 10,
          }}
        />
        <PrimaryButton
          onClick={() => this.handleManage(eachItem)}
          variant={"contained"}
          color={"primary"}
          size={"small"}
          style={{ textTransform: "none" }}
        >
          {"Manage"}
        </PrimaryButton>
      </div>
    );
  };

  // To handle search
  handleSearch = () => {
    const { search } = this.state;
    if (!isEmptyString(search)) {
      this.filterStudentList(search);
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
                    {"List of Users in On Boarding Stage"}
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
                          {`Search by Email ID / Mobile / Full Name / CLS ID `}
                        </span>
                      }
                      variant="outlined"
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
                      color="primary"
                      id={"search"}
                      aria-label="search"
                    >
                      <SearchRoundedIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item md={12}>
            {listOfUsers.length !== 0 ? (
              <DataGrid
                data={listOfUsers}
                obCallStatus={this.renderChip}
                action={this.renderManageButton}
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
    padding: "20px 20px 15px",
  },
};

const mapStateToProps = (state) => {
  return {
    studentsByStagesList: state.AdminReducer.studentsByStagesList,
    allIntakeList: state.StudentReducer.allIntakeList,
    loading: state.AdminReducer.loading,
    productVariant: state.ProductReducer.productVariant,
  };
};

export default connect(mapStateToProps, {
  getStudentByStages,
  StudentStepDetails,
  getAllIntakeList,
  getReferProductVariantByProductId,
})(Onboarding);
