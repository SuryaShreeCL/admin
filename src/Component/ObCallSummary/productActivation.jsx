import React, { Component } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import { ExpandMore } from "@material-ui/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Slide,
  Button,
  Icon,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {
  getAwaitingUsersByAdminId,
  activateStudentProduct,
} from "../../Actions/AdminAction";
// import button from './button';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import PrimaryButton from "../../Utils/PrimaryButton";
import { Autocomplete } from "@material-ui/lab";
import { connect } from "react-redux";

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
    };
  }
  handleClose = (e) => {
    this.setState({ show: false });
  };

  componentDidMount() {
    this.props.getAwaitingUsersByAdminId();
  }

  handleShowPopUp = () =>{
    this.setState({
        show : true
    })
  }

  render() {
    console.log(this.props);
    return (
      <div style={{ padding: 10 }}>
        <AntTabs
          value={this.state.tabCount}
          textColor={"inherit"}
          // onChange={(e, value) => this.setState({ tabCount: value })}
          aria-label="ant example"
        >
          <AntTab label="Awaiting Allocation" />
        </AntTabs>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">CLS ID</TableCell>
                <TableCell align="center">Client Name</TableCell>
                <TableCell align="center">College</TableCell>
                <TableCell align="center">Dept</TableCell>
                <TableCell align="center">Degree</TableCell>
                <TableCell align="center">Product Varient</TableCell>
                <TableCell align="center">Order Punch Date</TableCell>
                <TableCell align="center">Amount Paid</TableCell>
                <TableCell align="center">Activated</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.awaitingUsersForActivationList.length !== 0 &&
                this.props.awaitingUsersForActivationList.map(
                  (eachData, index) => {
                    return (
                      <TableRow>
                        <TableCell align="center">{eachData.clsId}</TableCell>
                        <TableCell align="center">
                          {eachData.fullName}
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
                          {eachData.orderDate}
                        </TableCell>
                        <TableCell align="center">
                          {eachData.paymentProvider}
                        </TableCell>
                        <TableCell align="center">{eachData.stage}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={this.handleShowPopUp}
                          >
                            <AddCircleRoundedIcon
                              style={{ color: "#1093FF" }}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ borderRadius: 10 }}>
          <Dialog
            maxWidth="lg"
            fullWidth={true}
            open={this.state.show}
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
          >
            <DialogTitle id="customized-dialog-title">
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
            </DialogTitle>
            {/* <DialogContent> */}
            <Grid
              container
              spacing={4}
              style={{ width: "85%", paddingLeft: "20%" }}
            >
              <Grid item xs={3}>
                <TextField
                  color="primary"
                  label="Client Name"
                  fullWidth
                  // value={this.state.name}
                  // onChange={(e) => this.setState({ name: e.target.value })}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  color="primary"
                  label="Contact Number"
                  fullWidth
                  // value={this.state.name}
                  // onChange={(e) => this.setState({ name: e.target.value })}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  color="primary"
                  label="Email Address"
                  fullWidth
                  // value={this.state.name}
                  // onChange={(e) => this.setState({ name: e.target.value })}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
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
                  options={this.props.getDegreeList}
                  getOptionLabel={(option) => option.name}
                  //   style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Mentor From Dropdown"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  color="primary"
                  label="Product Family"
                  fullWidth
                  // value={this.state.name}
                  // onChange={(e) => this.setState({ name: e.target.value })}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  color="primary"
                  label="Intake"
                  fullWidth
                  // value={this.state.name}
                  // onChange={(e) => this.setState({ name: e.target.value })}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  color="primary"
                  label="Year"
                  fullWidth
                  // value={this.state.name}
                  // onChange={(e) => this.setState({ name: e.target.value })}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  color="primary"
                  label="Product Validity"
                  fullWidth
                  // value={this.state.name}
                  // onChange={(e) => this.setState({ name: e.target.value })}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  color="primary"
                  label="End Of Service Date"
                  fullWidth
                  // value={this.state.name}
                  // onChange={(e) => this.setState({ name: e.target.value })}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  color="primary"
                  label="Amount Paid"
                  fullWidth
                  // value={this.state.name}
                  // onChange={(e) => this.setState({ name: e.target.value })}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  color="primary"
                  label="BDA Name(person Who Punches Order)"
                  fullWidth
                  // value={this.state.name}
                  // onChange={(e) => this.setState({ name: e.target.value })}
                />
              </Grid>
            </Grid>

            {/* </DialogContent> */}
            {/* <DialogActions> */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "10%",
                paddingBottom: "5%",
              }}
            >
              <PrimaryButton variant={"contained"} color={"primary"}>
                Save Changes
              </PrimaryButton>
            </div>
            {/* </DialogActions> */}
          </Dialog>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    awaitingUsersForActivationList:
      state.AdminReducer.awaitingUsersForActivationList,
      productActivationResponse : state.AdminReducer.productActivationResponse
  };
};

export default connect(mapStateToProps, {
  getAwaitingUsersByAdminId,
  activateStudentProduct,
})(ProductActivation);
