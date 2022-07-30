import {
  createMuiTheme,
  Divider,
  Grid,
  Typography,
  ThemeProvider,
  withStyles,
  Breadcrumbs,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import TodayDocument from "./TodayDocument";
import TodayWorkCompletion from "./TodayWorkCompletion";
import add from "../../Asset/Images/add.svg";
import pbResource from "../../Asset/Images/PB resource icon.svg";
import {
  listUsersProdBasedPath,
  productActivationPath,
  studentPath,
} from "../RoutePaths";
import { getAdminLinkedProduct } from "../../Actions/AdminAction";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import BackButton from "../../Asset/Images/backbutton.svg";
class ObOperationLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminDepartment: null,
    };
  }
  theme = createMuiTheme({
    overrides: {
      MuiDivider: {
        root: {
          margin: "revert",
        },
      },
    },
  });

  componentDidMount() {
    // To get admin department
    this.props.getAdminLinkedProduct();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.adminLinkedProductDetails,prevProps.adminLinkedProductDetails)
    if (
      this.props.adminLinkedProductDetails !==
      prevProps.adminLinkedProductDetails
    ) {
      this.setState({
        adminDepartment: this.props.adminLinkedProductDetails?.department,
      });
      // window.sessionStorage.setItem(
      //   "adminLinkedProduct",
      //   JSON.stringify(this.props.adminLinkedProductDetails)
      // );
    }
  }

  handleProductActivate = () => {
    this.props.history.push(
      productActivationPath + "/" + this.props.match.params.productId
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row", margin: "10px" }}>
          <img
            src={BackButton}
            style={{ cursor: "pointer", marginTop: "-10px" }}
            onClick={() => this.props.history.push(studentPath)}
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
              Operation
            </Typography>
          </Breadcrumbs>
        </div>
        <Grid container>
          <Grid item md={4}>
            <Grid container spacing={2}>
              <Grid item md={12} sm={12}>
                <TodayWorkCompletion {...this.props} />
              </Grid>
              <Grid item md={12} sm={12}>
                <TodayDocument {...this.props} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={1}>
            <ThemeProvider theme={this.theme}>
              <Divider
                orientation={"vertical"}
                style={{ backgroundColor: "#cacaca", height: "100vh" }}
              />
            </ThemeProvider>
          </Grid>
          <Grid item md={7}>
            <div
              style={{
                width: "100%",
                height: "40vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                boxShadow: "0px 0px 8px 1px rgba(72, 166, 227, 0.1)",
                cursor: "pointer",
              }}
            >
              <img src={add}></img>
              <Typography color="primary">Add new widget</Typography>
            </div>
            <div className={classes.quickAccess}>
              <Typography style={{ fontWeight: 600 }}>Quick Access</Typography>
              <div className={classes.rowContainer}>
                <div
                  onClick={() =>
                    this.props.history.push(
                      listUsersProdBasedPath +
                        "/" +
                        this.props.match.params.productId
                    )
                  }
                  className={classes.items}
                >
                  <img src={pbResource}></img>
                  <Typography variant="caption" style={{ fontWeight: 600 }}>
                    Manage Students
                  </Typography>
                </div>
                <div
                  className={classes.items}
                  onClick={this.handleProductActivate}
                >
                  <img src={pbResource}></img>
                  <Typography variant="caption" style={{ fontWeight: 600 }}>
                    Product Activate
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  adminLinkedProductDetails: state.AdminReducer.adminLinkedProductDetails,
});

const useStyles = () => ({
  quickAccess: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: "100px",
  },
  rowContainer: {
    display: "flex",
  },
  items: {
    marginRight: "25px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    boxShadow: "0px 0px 8px 1px rgba(72, 166, 227, 0.1)",
  },
});

export default connect(mapStateToProps, { getAdminLinkedProduct })(
  withStyles(useStyles)(ObOperationLanding)
);
