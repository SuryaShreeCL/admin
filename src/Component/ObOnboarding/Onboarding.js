import {
  Chip,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { Autocomplete } from "@material-ui/lab";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllAdminUsers,
  getStudentByStages,
} from "../../Actions/AdminAction";
import { getAllTerms } from "../../Actions/Aspiration";
import { getBranches } from "../../Actions/College";
import { getReferProductVariantByProductId } from "../../Actions/ProductAction";
import {
  filterStageBaseUsers,
  getAllIntakeList,
  searchStudentInStages,
  StudentStepDetails,
} from "../../Actions/Student";
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

  componentDidMount() {
    const { match, stageDetails } = this.props;
    // To get the users based on stages
    this.props.getStudentByStages(
      match.params.productId,
      stageDetails.stepName,
      "",
      null
    );
    if (match.params.productId) {
      this.props.getReferProductVariantByProductId(match.params.productId);
    }
    this.props.getBranches();
    this.props.getAllTerms();
    this.props.getAllAdminUsers();
    this.props.getAllIntakeList();
  }

  handleManage = (eachItem) => {
    this.props.StudentStepDetails(
      eachItem.studentId,
      this.props.match.params.productId
    );
    this.props.getVariantStepsById(
      this.props.match.params.productId + `?studentId=${eachItem.studentId}`
    );
    this.props.history.push(
      stagedTabsPath +
        eachItem.studentId +
        "/" +
        this.props.match.params.productId +
        `?stage=OnBoarding`
    );
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      allIntakeList,
      studentsByStagesList,
      match,
      stageDetails,
      productVariant,
    } = this.props;
    const { search, intake } = this.state;

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

    //Setting the filtered users in state
    if (
      this.props.filteredStageBasedUsers !== prevProps.filteredStageBasedUsers
    ) {
      let listOfUsersArr = [];
      this.props.filteredStageBasedUsers.map((eachUser, index) => {
        listOfUsersArr.push({
          activatedBy: eachUser.adminUser,
          allocatedAt: eachUser.allocatedAt,
          allocatedBy: eachUser.allocatedBy,
          amountPaid: eachUser.product.sellingPrice,
          clsId: eachUser.student.studentID,
          college:
            eachUser.student.college !== null && eachUser.student.college.name,
          degree:
            eachUser.student.ugDegree !== null &&
            eachUser.student.ugDegree.name,
          department:
            eachUser.student.department !== null &&
            eachUser.student.department.name,
          emailId: eachUser.student.emailId,
          firstName: eachUser.student.firstName,
          fullName: eachUser.student.fullName,
          lastName: eachUser.student.lastName,
          obCallStatus: null,
          orderDate: eachUser.enrollmentDate,
          paymentId: eachUser.paymentId,
          paymentProvider: eachUser.paymentProvider,
          percentage: null,
          phoneNumber: eachUser.student.phoneNumber,
          products: null,
          punchedBy: eachUser.adminUsers,
          stage: eachUser.stage,
          studentId: eachUser.student.id,
        });
      });
      this.setState({
        listOfUsers: listOfUsersArr,
      });
    }

    if (search !== prevState.search) {
      if (isEmptyString(search)) {
        this.props.getStudentByStages(
          match.params.productId,
          stageDetails.stepName,
          "",
          ""
        );
      }
    }

    if (intake !== prevState.intake) {
      this.props.getStudentByStages(
        match.params.productId,
        stageDetails.stepName,
        "",
        intake?.year
      );
    }

    if (allIntakeList && allIntakeList !== prevProps.allIntakeList) {
      if (allIntakeList.success) {
        this.setState({ intakeList: allIntakeList.data || [] });
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

  shrink() {
    this.setState({ shrink: true });
  }

  renderChip = (obCallStatus) => {
    const { product } = this.state;
    const { match } = this.props;
    const productId = product?.id || match.params.productId;

    if (obCallStatus.obCallStatus === "Completed") {
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
    } else if (obCallStatus.obCallStatus === null) {
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
    } else {
      return (
        <Chip
          onClick={() => {
            this.props.history.push(
              `${stagedTabsPath}${obCallStatus.studentId}/${productId}?render=pga`
            );
          }}
          label={obCallStatus.obCallStatus}
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
    if (!isEmptyString(this.state.search)) {
      this.props.getStudentByStages(
        this.props.match.params.productId,
        this.props.stageDetails.stepName,
        this.state.search,
        ""
      );
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
        <Grid container spacing={3}>
          <Grid item md={12}>
            <div style={HeadDisplay}>
              <p style={HeadStyle}>{"List of Users in On Boarding Stage"}</p>
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
                    variant={"standard"}
                  />
                )}
              />
              <Autocomplete
                id={"combo-box-intake"}
                options={intakeList}
                getOptionLabel={(option) => option.name}
                onChange={(e, newValue) =>
                  this.handleDropdownValueChange(newValue, "intake")
                }
                value={intake}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Intake"}
                    variant={"standard"}
                  />
                )}
              />
              <div>
                <TextField
                  label={
                    <Typography style={{ fontSize: "13px", marginLeft: 30 }}>
                      {"Search by Email ID / Mobile / Full Name / CLS ID"}
                    </Typography>
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
              </div>
            </div>
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
    padding: 20,
  },
};

const mapStateToProps = (state) => {
  return {
    studentsByStagesList: state.AdminReducer.studentsByStagesList,
    getBranchesList: state.CollegeReducer.BranchList,
    getAspTermsList: state.AspirationReducer.allTermList,
    adminUserList: state.AdminReducer.adminUserList,
    filteredStageBasedUsers: state.StudentReducer.filteredStageBasedUsers,
    searchedList: state.StudentReducer.searchedList,
    StudentStepDetailsList: state.StudentReducer.StudentStepDetails,
    allIntakeList: state.StudentReducer.allIntakeList,
    loading: state.AdminReducer.loading,
    productVariant: state.ProductReducer.productVariant,
  };
};

export default connect(mapStateToProps, {
  getStudentByStages,
  getBranches,
  getAllTerms,
  getAllAdminUsers,
  filterStageBaseUsers,
  searchStudentInStages,
  StudentStepDetails,
  getAllIntakeList,
  getReferProductVariantByProductId,
})(Onboarding);
