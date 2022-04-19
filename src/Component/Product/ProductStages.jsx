import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Breadcrumbs,
  Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  postproductstructure,
  putproductstructure,
  getproductsteps,
} from "../../Actions/ProductAction";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import PrimaryButton from "../../Utils/PrimaryButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { isEmptyString } from "../Validation";
import MySnackBar from "../MySnackBar";
import { productstructurePath } from "../RoutePaths";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import BackButton from "../../Asset/Images/backbutton.svg";
import { studentPath } from "../RoutePaths";
class ProductStages extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      stepname: "",
      stepnameErr: "",
      description: "",
      descriptionErr: "",
      startMonth: new Date(),
      startMonthErr: "",
      endMonthErr: "",
      endMonth: new Date(),
      href: "",
      hrefErr: "",
      image: "",
      imageErr: "",
      lockimage: "",
      lockimageErr: "",
      maxtat: "",
      maxtatErr: "",
      mintatErr: "",
      mintat: "",
      rank: "",
      rankErr: "",
      open: false,
      checkedB: false,
      varient: "",
      drop: true,
      family: "",
      snackMsg: "",
      snackVariant: "",
      snackOpen: false,
      familyErr: "",
      varientErr: "",
      icon: "",
      iconCompleted: "",
      iconErr: "",
      iconCompletedErr: "",
      stepId: "",
      stageId: "",
    };
  }
  componentDidMount() {
    this.props.getproductsteps(this.props.match.params.id);
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.postproductstructureList !== prevProps.postproductstructureList
    ) {
      this.props.getproductsteps(this.props.match.params.id);
    }
    if (
      this.props.putproductstructureList !== prevProps.putproductstructureList
    ) {
      this.props.getproductsteps(this.props.match.params.id);
    }
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.getproductsteps(this.props.match.params.id);
    }
  }
  handleOpen = () => {
    this.setState({
      open: true,
      stepname: "",
      description: "",
      disabled: "",
      href: "",
      startMonth: new Date(),
      endMonth: new Date(),
      rank: "",
      image: "",
      lockimage: "",
      mintat: "",
      maxtat: "",
      drop: true,
      icon: "",
      iconCompleted: "",
    });
  };
  handelAdd = () => {
    let hlptxt = "Please Fill the Required Field";
    isEmptyString(this.state.stepname)
      ? this.setState({ stepnameErr: hlptxt })
      : this.setState({ stepnameErr: "" });
    isEmptyString(this.state.image)
      ? this.setState({ imageErr: hlptxt })
      : this.setState({ imageErr: "" });
    isEmptyString(this.state.lockimage)
      ? this.setState({ lockimageErr: hlptxt })
      : this.setState({ lockimageErr: "" });
    isEmptyString(this.state.href)
      ? this.setState({ hrefErr: hlptxt })
      : this.setState({ hrefErr: "" });
    this.state.startMonth === null
      ? this.setState({ startMonthErr: hlptxt })
      : this.setState({ startMonthErr: "" });
    this.state.endMonth === null
      ? this.setState({ endMonthErr: hlptxt })
      : this.setState({ endMonthErr: "" });
    isEmptyString(this.state.rank)
      ? this.setState({ rankErr: hlptxt })
      : this.setState({ rankErr: "" });
    isEmptyString(this.state.maxtat)
      ? this.setState({ maxtatErr: hlptxt })
      : this.setState({ maxtatErr: "" });
    isEmptyString(this.state.mintat)
      ? this.setState({ mintatErr: hlptxt })
      : this.setState({ mintatErr: "" });
    isEmptyString(this.state.description)
      ? this.setState({ descriptionErr: hlptxt })
      : this.setState({ descriptionErr: "" });
    isEmptyString(this.state.icon)
      ? this.setState({ iconErr: hlptxt })
      : this.setState({ iconErr: "" });
    isEmptyString(this.state.iconCompleted)
      ? this.setState({ iconCompletedErr: hlptxt })
      : this.setState({ iconCompletedErr: "" });
    if (
      !isEmptyString(this.state.stepname) &&
      !isEmptyString(this.state.image) &&
      !isEmptyString(this.state.lockimage) &&
      !isEmptyString(this.state.href) &&
      !isEmptyString(this.state.rank) &&
      !isEmptyString(this.state.maxtat) &&
      !isEmptyString(this.state.mintat) &&
      !isEmptyString(this.state.description) &&
      this.state.startMonth !== null &&
      this.state.endMonth !== null &&
      !isEmptyString(this.state.icon) &&
      !isEmptyString(this.state.iconCompleted)
    ) {
      let obj = {
        description: this.state.description,
        endMonth: this.state.endMonth,
        href: this.state.href,
        image: this.state.image,
        lockImg: this.state.lockimage,
        isChild: true,
        isParent: false,
        orderNo: this.state.rank,
        parent: { id: this.props.match.params.id },
        product: { id: this.props.match.params.id },
        rank: this.state.rank,
        startMonth: this.state.startMonth,
        stepName: this.state.stepname,
        icon: this.state.icon,
        iconCompleted: this.state.iconCompleted,
        color: null,
        max_tat: this.state.maxtat,
        min_tat: this.state.mintat,
      };

      // {
      //   stepName: this.state.stepname,
      //   description: this.state.description,
      //   disabled: this.state.checkedB === true ? "true" : "false",
      //   endMonth: this.state.endMonth,
      //   startMonth: this.state.startMonth,
      //   href: this.state.href,
      //   image: this.state.image,
      //   lockImg: this.state.lockimage,
      //   max_tat: this.state.maxtat,
      //   min_tat: this.state.mintat,
      //   rank: this.state.rank,
      //   parent: {
      //     id: this.props.match.params.id,
      //   },
      //   product: null,
      //   icon: this.state.icon,
      //   iconCompleted: this.state.iconCompleted,
      // };
      this.props.postproductstructure(obj, (response) => {
        if (response?.data?.body?.success) {
          this.setState({
            snackMsg: "Added Successfully",
            snackOpen: true,
            snackVariant: "success",
            open: false,
          });
        } else {
          this.setState({
            snackMsg: response.message,
            snackOpen: true,
            snackVariant: "error",
            open: false,
          });
        }
      });
    }
  };
  handleUpdate = () => {
    let hlptxt = "Please Fill the Required Field";
    isEmptyString(this.state.stepname)
      ? this.setState({ stepnameErr: hlptxt })
      : this.setState({ stepnameErr: "" });
    isEmptyString(this.state.image)
      ? this.setState({ imageErr: hlptxt })
      : this.setState({ imageErr: "" });
    isEmptyString(this.state.lockimage)
      ? this.setState({ lockimageErr: hlptxt })
      : this.setState({ lockimageErr: "" });
    isEmptyString(this.state.href)
      ? this.setState({ hrefErr: hlptxt })
      : this.setState({ hrefErr: "" });
    this.state.startMonth === null
      ? this.setState({ startMonthErr: hlptxt })
      : this.setState({ startMonthErr: "" });
    this.state.endMonth === null
      ? this.setState({ endMonthErr: hlptxt })
      : this.setState({ endMonthErr: "" });
    isEmptyString(this.state.rank)
      ? this.setState({ rankErr: hlptxt })
      : this.setState({ rankErr: "" });
    isEmptyString(this.state.maxtat)
      ? this.setState({ maxtatErr: hlptxt })
      : this.setState({ maxtatErr: "" });
    isEmptyString(this.state.mintat)
      ? this.setState({ mintatErr: hlptxt })
      : this.setState({ mintatErr: "" });
    isEmptyString(this.state.description)
      ? this.setState({ descriptionErr: hlptxt })
      : this.setState({ descriptionErr: "" });
    isEmptyString(this.state.icon)
      ? this.setState({ iconErr: hlptxt })
      : this.setState({ iconErr: "" });
    isEmptyString(this.state.iconCompleted)
      ? this.setState({ iconCompletedErr: hlptxt })
      : this.setState({ iconCompletedErr: "" });
    if (
      !isEmptyString(this.state.stepname) &&
      !isEmptyString(this.state.image) &&
      !isEmptyString(this.state.lockimage) &&
      !isEmptyString(this.state.href) &&
      !isEmptyString(this.state.rank) &&
      !isEmptyString(this.state.maxtat) &&
      !isEmptyString(this.state.mintat) &&
      !isEmptyString(this.state.description) &&
      this.state.startMonth !== null &&
      this.state.endMonth !== null &&
      !isEmptyString(this.state.icon) &&
      !isEmptyString(this.state.iconCompleted)
    ) {
      let obj = {
        id: this.state.id,
        stepId: this.state.stepId,
        stagesId: this.state.stageId,
        description: this.state.description,
        endMonth: this.state.endMonth,
        href: this.state.href,
        image: this.state.image,
        lockImg: this.state.lockimage,
        isChild: true,
        isParent: false,
        max_tat: this.state.maxtat,
        min_tat: this.state.mintat,
        orderNo: this.state.rank,
        parent: {
          id: this.state.id,
        },
        product: {
          id: this.props.match.params.id,
        },
        rank: this.state.rank,
        color: null,
        startMonth: this.state.startMonth,
        stepName: this.state.stepname,
        icon: this.state.icon,
        iconCompleted: this.state.iconCompleted,
      };
      this.props.putproductstructure(obj, (response) => {
        if (response?.data?.body?.success) {
          this.setState({
            snackMsg: "Updated Successfully",
            snackOpen: true,
            snackVariant: "success",
            open: false,
          });
        } else {
          this.setState({
            snackMsg: response.message,
            snackOpen: true,
            snackVariant: "error",
            open: false,
          });
        }
      });
    }
  };
  handleClick = (data) => {
    this.setState({
      open: true,
      stepname: data.stepName,
      description: data.description,
      disabled: data.disabled,
      href: data.href,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
      rank: data.rank,
      image: data.image,
      lockimage: data.lockImg,
      mintat: data.min_tat,
      maxtat: data.max_tat,
      drop: false,
      id: data.id,
      stepId: data.stepId,
      stageId: data.stageId,
    });
  };
  render() {
    return (
      <div>
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
              Product Stage
            </Typography>
          </Breadcrumbs>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h5>Product Stages</h5>
          <PrimaryButton
            color={"primary"}
            variant={"contained"}
            onClick={() => this.handleOpen()}
          >
            Add
          </PrimaryButton>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>StepName</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Disabled</TableCell>
                <TableCell>StartMonth</TableCell>
                <TableCell>EndMonth</TableCell>
                <TableCell>Href</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Lockimage</TableCell>
                <TableCell>Maxtat</TableCell>
                <TableCell>Mintat</TableCell>
                <TableCell>Rank</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.getproductstepsList.length !== 0 &&
                this.props.getproductstepsList.steps.map((eachdata) => (
                  <TableRow>
                    <TableCell
                      onClick={() =>
                        this.props.history.push(
                          productstructurePath.concat(eachdata.id)
                        )
                      }
                    >
                      {eachdata.id}
                    </TableCell>
                    <TableCell>{eachdata.stepName}</TableCell>
                    <TableCell>{eachdata.description}</TableCell>
                    <TableCell>
                      {eachdata.disabled === true ? "true" : "false"}
                    </TableCell>
                    <TableCell>
                      {new Date(eachdata.startMonth).getMonth()}
                    </TableCell>
                    <TableCell>
                      {new Date(eachdata.endMonth).getMonth()}
                    </TableCell>
                    <TableCell>{eachdata.href}</TableCell>
                    <TableCell>{eachdata.image}</TableCell>
                    <TableCell>{eachdata.lockImg}</TableCell>
                    <TableCell>{eachdata.max_tat}</TableCell>
                    <TableCell>{eachdata.min_tat}</TableCell>
                    <TableCell>{eachdata.rank}</TableCell>
                    <TableCell>
                      <PrimaryButton
                        color={"primary"}
                        variant={"contained"}
                        onClick={(e) => this.handleClick(eachdata)}
                      >
                        Manage
                      </PrimaryButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          maxWidth="md"
        >
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <TextField
                  name="stepname"
                  fullWidth
                  value={this.state.stepname}
                  label="Step Name"
                  error={this.state.stepnameErr.length > 0}
                  helperText={this.state.stepnameErr}
                  onChange={(e) => this.setState({ stepname: e.target.value })}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="description"
                  fullWidth
                  value={this.state.description}
                  label="Description"
                  error={this.state.descriptionErr.length > 0}
                  helperText={this.state.descriptionErr}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </Grid>
              <Grid item md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkedB}
                      onChange={(e) =>
                        this.setState({ checkedB: e.target.checked })
                      }
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Disabled"
                />
              </Grid>
              <Grid item md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    fullWidth
                    id="date-picker-dialog"
                    label="Start Month"
                    format="MM"
                    value={this.state.startMonth}
                    // onChange={handleDateChange}
                    onChange={(e, newValue) =>
                      this.setState({ startMonth: newValue })
                    }
                    error={this.state.startMonthErr.length > 0}
                    helperText={this.state.startMonthErr}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    fullWidth
                    id="date-picker-dialog"
                    label="End Month"
                    format="MM"
                    value={this.state.endMonth}
                    disableFuture
                    // onChange={handleDateChange}
                    onChange={(e, newValue) =>
                      this.setState({ endMonth: newValue })
                    }
                    error={this.state.endMonthErr.length > 0}
                    helperText={this.state.endMonthErr}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="href"
                  fullWidth
                  value={this.state.href}
                  label="href"
                  error={this.state.hrefErr.length > 0}
                  helperText={this.state.hrefErr}
                  onChange={(e) => this.setState({ href: e.target.value })}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="image"
                  fullWidth
                  value={this.state.image}
                  label="Image"
                  error={this.state.imageErr.length > 0}
                  helperText={this.state.imageErr}
                  onChange={(e) => this.setState({ image: e.target.value })}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="lockimage"
                  fullWidth
                  value={this.state.lockimage}
                  label="Lockimage"
                  error={this.state.lockimageErr.length > 0}
                  helperText={this.state.lockimageErr}
                  onChange={(e) => this.setState({ lockimage: e.target.value })}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="maxtat"
                  value={this.state.maxtat}
                  label="Maxtat"
                  type="number"
                  fullWidth
                  error={this.state.maxtatErr.length > 0}
                  helperText={this.state.maxtatErr}
                  onChange={(e) => this.setState({ maxtat: e.target.value })}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="mintat"
                  value={this.state.mintat}
                  type="number"
                  label="Mintat"
                  fullWidth
                  error={this.state.mintatErr.length > 0}
                  helperText={this.state.mintatErr}
                  onChange={(e) => this.setState({ mintat: e.target.value })}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="rank"
                  value={this.state.rank}
                  label="Rank"
                  type="number"
                  fullWidth
                  error={this.state.rankErr.length > 0}
                  helperText={this.state.rankErr}
                  onChange={(e) => this.setState({ rank: e.target.value })}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="icon"
                  value={this.state.icon}
                  label="Icon"
                  type="text"
                  fullWidth
                  error={this.state.iconErr.length > 0}
                  helperText={this.state.iconErr}
                  onChange={(e) => this.setState({ icon: e.target.value })}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="iconCompleted"
                  value={this.state.iconCompleted}
                  label="Icon Completed"
                  type="text"
                  fullWidth
                  error={this.state.iconCompletedErr.length > 0}
                  helperText={this.state.iconCompletedErr}
                  onChange={(e) =>
                    this.setState({ iconCompleted: e.target.value })
                  }
                />
              </Grid>
              <Grid item md={6}></Grid>
              <Grid item md={12} align="center">
                <PrimaryButton
                  color={"primary"}
                  variant={"contained"}
                  onClick={() => {
                    this.state.drop === true
                      ? this.handelAdd()
                      : this.handleUpdate();
                  }}
                >
                  {this.state.drop === true ? "Add" : "Update"}
                </PrimaryButton>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
        <MySnackBar
          snackMsg={this.state.snackMsg}
          snackVariant={this.state.snackVariant}
          snackOpen={this.state.snackOpen}
          onClose={() => this.setState({ snackOpen: false })}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    postproductstructureList: state.ProductReducer.postproductstructure,
    putproductstructureList: state.ProductReducer.putproductstructure,
    getproductstepsList: state.ProductReducer.getproductsteps,
  };
};

export default connect(mapStateToProps, {
  postproductstructure,
  putproductstructure,
  getproductsteps,
})(ProductStages);
