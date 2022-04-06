import { Grid, withStyles, Breadcrumbs, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import Onboarding from "../ObOnboarding/Onboarding";
import { ThemedTab, ThemedTabs } from "../Utils/ThemedComponents";
import { getAdminLinkedProduct } from "../../Actions/AdminAction";
import { getVariantStepsById } from "../../Actions/ProductAction";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import BackButton from "../../Asset/Images/backbutton.svg";
import { studentPath } from "../RoutePaths";
import PgaStudentList from "../ProfileGapAnalysis/PgaStudentList";
import StrategySessionStudentList from "../StrategySession/ManageStudent";
import ApplicationStageStudentList from "../ApplicationStage/ManageStudent";
import ProfileMentoringStudentList from "../ProfileMentoring/ManageStudent";
import LockIcon from "@material-ui/icons/Lock";
import "../../Asset/All.css";
class ProductBasedUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabCount: 0,
      selectedItem: null,
      productDetails: null,
      adminUserDetails: JSON.parse(
        window.sessionStorage.getItem("adminLinkedProduct")
      ),
    };
  }

  renderContent = (count) => {
    try {
      if (count === 0) {
        return <Onboarding {...this.props} />;
      }
    } catch (error) {}
  };

  componentDidMount() {
    // this.props.getAdminLinkedProduct()
    this.props.getVariantStepsById(`${this.props.match.params.productId}`);
  }

  componentDidUpdate(prevProps, prevState) {
    // if(this.props.adminLinkedProductDetails !== prevProps.adminLinkedProductDetails){
    //     console.log(this.props.adminLinkedProductDetails)
    //     if(this.props.adminLinkedProductDetails.products.length > 0){
    //         this.props.getVariantStepsById(this.props.adminLinkedProductDetails.products[0].id)
    //     }

    // }

    if (this.props.variantStepList !== prevProps.variantStepList) {
      var sortedArr =
        this.props.variantStepList?.steps?.length > 0 &&
        this.props.variantStepList?.steps?.sort((a, b) => a.rank - b.rank);
      sortedArr !== false &&
        sortedArr.map((it, ix) => {
          it.steps.sort((c, d) => c.rank - d.rank);
        });
      console.log(sortedArr, "------------------------");
      this.setState({
        productDetails: sortedArr,
        selectedItem: sortedArr[0],
      });
    }
  }

  render() {
    const { classes } = this.props;

    var componentList = {
      Onboarding: "Onboarding",
      "Profile Gap Analysis": "Profile Gap Analysis",
      "Strategy Session": "StrategySession",
      "Application Stage": "ApplicationStage",
      "Profile Mentoring": "ProfileMentoring",
    };

    var obj = {
      Onboarding: Onboarding,
      ["Profile Gap Analysis"]: PgaStudentList,
      StrategySession: StrategySessionStudentList,
      ApplicationStage: ApplicationStageStudentList,
      ProfileMentoring: ProfileMentoringStudentList,
    };

    var selectedComponent =
      this.state.selectedItem &&
      componentList[this.state.selectedItem.stepName];
    var Page = obj[selectedComponent];
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row", margin: "10px" }}>
          <img
            src={BackButton}
            style={{ cursor: "pointer", marginTop: "-10px" }}
            onClick={() => this.props.history.goBack()}
          />
          <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />}>
            <Typography
              style={{
                cursor: "pointer",
                fontWeight: "600",
                marginLeft: "10px",
              }}
              onClick={() => this.props.history.push(studentPath)}
            >
              {"Home"}
            </Typography>
            <Typography style={{ cursor: "pointer", fontWeight: "600" }}>
              {"Manage Student"}
            </Typography>
          </Breadcrumbs>
        </div>
        <Grid container>
          <Grid item md={12}>
            <ThemedTabs
              value={this.state.selectedItem}
              textColor={"inherit"}
              onChange={(e, value) => this.setState({ selectedItem: value })}
              aria-label='ant example'
            >
              {this.state.productDetails &&
                this.state.productDetails.map((item, index) => {
                  return <ThemedTab value={item} label={item.stepName} />;
                })}
            </ThemedTabs>
          </Grid>
          <Grid item md={12}>
            {Page !== undefined && (
              <Page
                productId={
                  this.state.adminUserDetails &&
                  this.state.adminUserDetails.products[0].id
                }
                stageDetails={this.state.selectedItem}
                {...this.props}
              />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  adminLinkedProductDetails: state.AdminReducer.adminLinkedProductDetails,
  variantStepList: state.ProductReducer.variantStepList,
});

const useStyles = (theme) => ({});

export default connect(mapStateToProps, {
  getAdminLinkedProduct,
  getVariantStepsById,
})(withStyles(useStyles)(ProductBasedUsers));
