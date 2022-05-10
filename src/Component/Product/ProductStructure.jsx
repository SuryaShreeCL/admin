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
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getproductstructure,
  postproductstructure,
  putproductstructure,
  getProductVarient,
  getAllProductFamily,
  getProductByFamilyId,
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
class ProductStructure extends Component {
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
    };
  }
  componentDidMount() {
    this.props.getproductstructure();
    this.props.getProductVarient();
    this.props.getAllProductFamily();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.family !== prevState.family) {
      this.props.getProductByFamilyId(
        this.state.family !== null ? this.state.family.id : null
      );
    }
    if (
      this.props.postproductstructureList !== prevProps.postproductstructureList
    ) {
      this.props.getproductstructure();
    }
    if (
      this.props.putproductstructureList !== prevProps.putproductstructureList
    ) {
      this.props.getproductstructure();
    }
  }
  handleClick = (data) => {
    console.log(data);
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
      varient: data.product.id,
    });
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
      this.state.endMonth !== null
    ) {
      let obj = {
        id: this.state.id,
        stepName: this.state.stepname,
        description: this.state.description,
        disabled: this.state.checkedB,
        endMonth: this.state.endMonth,
        startMonth: this.state.startMonth,
        href: this.state.href,
        image: this.state.image,
        lockImg: this.state.lockimage,
        max_tat: this.state.maxtat,
        min_tat: this.state.mintat,
        rank: this.state.rank,
        parent: null,
        product: this.state.varient,
      };
      this.props.putproductstructure(obj);
      this.setState({
        snackMsg: "Updated Successfully",
        snackOpen: true,
        snackVariant: "success",
        open: false,
      });
    }
  };
  handleOpen = () => {
    let hlptxt = "Please Fill the Required Field";
    this.state.family === ""
      ? this.setState({ familyErr: hlptxt })
      : this.setState({ familyErr: "" });
    this.state.varient === ""
      ? this.setState({ varientErr: hlptxt })
      : this.setState({ varientErr: "" });
    if (this.state.family !== "" && this.state.varient !== "") {
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
      });
    }
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
    console.log(this.state);
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
      this.state.endMonth !== null
    ) {
      let obj = {
        stepName: this.state.stepname,
        description: this.state.description,
        disabled: this.state.checkedB === true ? true : false,
        endMonth: this.state.endMonth,
        startMonth: this.state.startMonth,
        href: this.state.href,
        image: this.state.image,
        lockImg: this.state.lockimage,
        max_tat: this.state.maxtat,
        min_tat: this.state.mintat,
        rank: this.state.rank,
        parent: null,
        product: this.state.varient,
      };
      this.props.postproductstructure(obj);
      console.log(obj);
      this.setState({
        snackMsg: "Added Successfully",
        snackOpen: true,
        snackVariant: "success",
        open: false,
      });
    }
  };
  render() {
    console.log(this.props.getproductstructureList);
    console.log(this.state);
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h5>Product Structure</h5>
          {/* <PrimaryButton
            color={"primary"}
            variant={"contained"}
            onClick={() => this.handleOpen()}
          >
            Add
          </PrimaryButton> */}
        </div>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Autocomplete
              id="combo-box-demo"
              fullWidth
              options={this.props.getAllProductFamilyList}
              getOptionLabel={(option) =>
                option.productName === "LMS" ? "Test Prep" : option.productName
              }
              onChange={(e, newValue) => this.setState({ family: newValue })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Product Family"
                  variant="standard"
                  error={this.state.familyErr.length > 0}
                  helperText={this.state.familyErr}
                />
              )}
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              id="combo-box-demo"
              options={this.props.getProductByFamilyIdList}
              getOptionLabel={(option) => option.name}
              onChange={(e, newValue) => this.setState({ varient: newValue })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Product Varient"
                  variant="standard"
                  error={this.state.varientErr.length > 0}
                  helperText={this.state.varientErr}
                />
              )}
            />
          </Grid>
          <Grid item md={4}>
            <PrimaryButton
              color={"primary"}
              variant={"contained"}
              onClick={() => this.handleOpen()}
            >
              Add
            </PrimaryButton>
          </Grid>
          <Grid item md={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Product Variant</TableCell>
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
                  {this.props.getproductstructureList.length !== 0 &&
                    this.props.getproductstructureList.map((eachdata) => (
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
                        <TableCell>{eachdata.product.name}</TableCell>
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
          </Grid>
        </Grid>

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
              {/* <Grid item md={6}>
                  <Autocomplete
                    id="combo-box-demo"
                    fullWidth
                    options={this.props.getProductVarientList}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, newValue) =>
                      this.setState({ varient: newValue })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Product"
                        variant="standard"
                      />
                    )}
                  />
                </Grid> */}
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
    getproductstructureList: state.ProductReducer.getproductstructure,
    postproductstructureList: state.ProductReducer.postproductstructure,
    putproductstructureList: state.ProductReducer.putproductstructure,
    getProductVarientList: state.ProductReducer.getProductVarient,
    getAllProductFamilyList: state.ProductReducer.getAllProductFamily,
    getProductByFamilyIdList: state.ProductReducer.getProductByFamilyId,
  };
};

export default connect(mapStateToProps, {
  getproductstructure,
  postproductstructure,
  putproductstructure,
  getProductVarient,
  getAllProductFamily,
  getProductByFamilyId,
})(ProductStructure);
