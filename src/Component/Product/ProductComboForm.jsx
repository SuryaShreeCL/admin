import { Divider, Grid, TextField, Typography,Breadcrumbs } from "@material-ui/core";
import React, { Component } from "react";
import { Autocomplete } from "@material-ui/lab";
import PrimaryButton from "../../Utils/PrimaryButton";
import {
  getAllProductFamily,
  getProductByFamilyId,
  addproductcombo,
} from "../../Actions/ProductAction";
import DateFnsUtils from '@date-io/date-fns';
import MySnackBar from "../MySnackBar";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { connect } from "react-redux";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import BackButton from '../../Asset/Images/backbutton.svg'
import {studentPath} from '../RoutePaths'
class ProductComboForm extends Component {
  constructor() {
    super();
    this.state = {
      family: null,
      varient: null,
      combo: [],
      comboname: "",
      comboshortcode: "",
      combosku: "",
      validity: "",
      endofenrollment: null,
      combocostprice: "",
      updateddate: new Date(),
      combonameErr: "",
      validityErr: "",
      comboskuErr: "",
      costPriceErr: "",
      combosellprice : "",
      combosellpriceErr:"",
      comboshortcodeErr : "",
      snackMsg: "",
      snackVariant: "",
      snackOpen: false,
      familyErr : "",
      varientErr : ""

    };
  }
  componentDidMount() {
    this.props.getAllProductFamily();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.family !== prevState.family) {
      this.props.getProductByFamilyId(this.state.family !== null ? this.state.family.id : "");
    }
  }
  handleAdd = () => {
    let hlptxt = "Please fill the required field";
    this.state.varient === null
    ? this.setState({ varientErr: hlptxt })
    : this.setState({ varientErr: "" });
    this.state.family === null
    ? this.setState({ familyErr: hlptxt })
    : this.setState({ familyErr: "" });
    if (this.state.varient !== null) {
      let arr = this.state.combo;
      arr.push({
        id: this.state.varient.id,
        familyname: this.state.varient.productFamily.productName,
        productvarient: this.state.varient.name,
        varientsku: this.state.varient.variantSKU,
        standalone: this.state.varient.standaloneSellable,
        costprice: this.state.varient.costPrice,
        validity: this.state.varient.validity,
        endofservice: this.state.varient.endOfServiceDate,
        endofenrollment: this.state.varient.endOfEnrollmentDate,
      });
      this.setState({ combo: arr });
    }
  };
  handelSaved = () => {
    let hlptxt = "Please fill the required field";
    this.state.comboname === ""
      ? this.setState({ combonameErr: hlptxt })
      : this.setState({ combonameErr: "" });
    this.state.validity === ""
      ? this.setState({ validityErr: hlptxt })
      : this.setState({ validityErr: "" });
    this.state.combosku === ""
      ? this.setState({ comboskuErr: hlptxt })
      : this.setState({ comboskuErr: "" });
    this.state.combocostprice === ""
      ? this.setState({ costPriceErr: hlptxt })
      : this.setState({ costPriceErr: "" });
      this.state.combosellprice === ""
      ? this.setState({ combosellpriceErr: hlptxt })
      : this.setState({ combosellpriceErr: "" });
      this.state.comboshortcode === ""
      ? this.setState({ comboshortcodeErr: hlptxt })
      : this.setState({ comboshortcodeErr: "" });
      this.state.varient === null
      ? this.setState({ varientErr: hlptxt })
      : this.setState({ varientErr: "" });
      this.state.family === null
      ? this.setState({ familyErr: hlptxt })
      : this.setState({ familyErr: "" });
    if (
      this.state.comboname !== "" &&
      this.state.validity !== "" &&
      this.state.combosku !== "" &&
      this.state.combocostprice !== "" &&
      this.state.combosellprice !== "" &&
      this.state.comboshortcode !== "" &&
      this.state.validity !== null &&
      this.state.family !== null
    )
     {
    let productid = this.state.combo.map((item) => {
      return { id: item.id};
    });;
    let obj = {
      comboName: this.state.comboname,
      comboShortCode: this.state.comboshortcode,
      comboSKU: this.state.combosku,
      validity: "365",
      endOfEnrollment: this.state.validity,
      comboCostPrice: this.state.combocostprice,
      comboSellingPrice: this.state.combosellprice,
      dateOfCreation: new Date(),
      createdBy: window.sessionStorage.getItem("role"),
      updatedBy: window.sessionStorage.getItem("role"),
      dateOfUpdate: new Date(),
      products: productid,
    };
    this.props.addproductcombo(obj);
    this.setState({
      snackMsg:"Added Successfully",
      snackOpen:true,
      snackVariant:"success"
    })
    this.props.history.goBack()
  };
  }
  render() {
    // console.log(this.state.family);
    console.log(this.state.varient);
    // console.log(this.props.getProductByFamilyIdList)
    console.log(this.state.combo);
    console.log(this.state);
    return (
      <div>
         <div style={{display:"flex",flexDirection:"row",margin:"10px"}}>
          <img
            src={BackButton}
            style={{ cursor: "pointer",marginTop:"-10px" }}
            onClick={() => this.props.history.goBack()}
             />
               <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              <Typography style={{ cursor: "pointer", fontWeight: "600",marginLeft:"10px" }} onClick={()=>this.props.history.push(studentPath)}>
                Home
              </Typography>
              <Typography style={{ cursor: "pointer", fontWeight: "600" }}  onClick={() => this.props.history.goBack()}>
                Product
              </Typography>
              <Typography style={{ cursor: "pointer", fontWeight: "600" }}>
                Product Combo
              </Typography>
            </Breadcrumbs>
            </div>
        <Typography>Product Combo</Typography>
        <hr />
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Autocomplete
              id="combo-box-demo"
              options={this.props.getAllProductFamilyList}
              getOptionLabel={(option) => option.productName}
              onChange={(e, newValue) => this.setState({ family: newValue })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Product Family"
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
              onClick={() => this.handleAdd()}
            >
              Add
            </PrimaryButton>
          </Grid>
          <Grid item md={12}>
            <hr />
          </Grid>
        </Grid>
        {this.state.combo.map((data) => {
          let servicedate = new Date(data.endofservice).getDate();
          let servicemonth = new Date(data.endofservice).getMonth();
          let serviceyear = new Date(data.endofservice).getFullYear();
          let endofservicedate =
            servicedate + "-" + servicemonth + "-" + serviceyear;
          let enrolldate = new Date(data.endofenrollment).getDate();
          let enrollmonth = new Date(data.endofenrollment).getMonth();
          let enrollyear = new Date(data.endofenrollment).getFullYear();
          let endofenrollment =
            enrolldate + "-" + enrollmonth + "-" + enrollyear;
          return (
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Typography style={{ color: "#1093FF", fontWeight: "bold" }}>
                  Product
                </Typography>
              </Grid>
              <Grid item md={3}>
                <TextField
                  disabled
                  label="Product Family"
                  value={data.familyname}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  disabled
                  label="Product Varient"
                  value={data.productvarient}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  disabled
                  label="Varient SKU"
                  value={data.varientsku}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  disabled
                  label="Standalone"
                  value={data.standalone}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  disabled
                  label="Pricing Standalone"
                  value={data.costprice}
                />
              </Grid>
              <Grid item md={2}>
                <TextField disabled label="Pricing Combo" />
              </Grid>
              <Grid item md={2}>
                <TextField disabled label="Product SKU combo" />
              </Grid>
              <Grid item md={2}>
                <TextField
                  disabled
                  label="Product Validity"
                  value={data.validity}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  disabled
                  label="End of Service"
                  value={endofservicedate}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  disabled
                  label="End of Enrollment"
                  value={endofenrollment}
                />
              </Grid>
              <Grid item md={2}></Grid>
              <Grid item md={12}>
                <hr />
              </Grid>
            </Grid>
          );
        })}
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography style={{ color: "#1093FF", fontWeight: "bold" }}>
              Combo Details
            </Typography>
          </Grid>
          <Grid item md={3}>
            <TextField
              label="Combo Cost Pricing"
              type="number"
              value={this.state.combocostprice}
              onChange={(e) =>
                this.setState({ combocostprice: e.target.value })
              }
              error={this.state.costPriceErr.length > 0}
              helperText={this.state.costPriceErr}
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              label="Combo SKU"
              value={this.state.combosku}
              onChange={(e) => this.setState({ combosku: e.target.value })}
              error={this.state.comboskuErr.length > 0}
              helperText={this.state.comboskuErr}
            />
          </Grid>
          <Grid item md={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Combo Sell Validity"
                format="yyyy-MM-dd"
                value={this.state.validity}
                onChange={(e,newValue)=>this.setState({validity : newValue})}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={this.state.validityErr.length > 0}
              helperText={this.state.validityErr}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={3}>
            <TextField
              label="Combo Name"
              value={this.state.comboname}
              onChange={(e) => this.setState({ comboname: e.target.value })}
              error={this.state.combonameErr.length > 0}
              helperText={this.state.combonameErr}
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              label="Combo Sell Price"
              type="number"
              value={this.state.combosellprice}
              onChange={(e) =>
                this.setState({ combosellprice: e.target.value })
              }
              error={this.state.combosellpriceErr.length > 0}
              helperText={this.state.combosellpriceErr}
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              label="Combo Short Code"
              value={this.state.comboshortcode}
              onChange={(e) =>
                this.setState({ comboshortcode: e.target.value })
              }
              error={this.state.comboshortcodeErr.length > 0}
              helperText={this.state.comboshortcodeErr}
            />
          </Grid>
          <Grid item md={12} align="center">
            <PrimaryButton
              color={"primary"}
              variant={"contained"}
              onClick={() => this.handelSaved()}
            >
              Create Combo
            </PrimaryButton>
          </Grid>
        </Grid>
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
    getAllProductFamilyList: state.ProductReducer.getAllProductFamily,
    getProductByFamilyIdList: state.ProductReducer.getProductByFamilyId,
    addproductcomboList: state.ProductReducer.addproductcombo,
  };
};

export default connect(mapStateToProps, {
  getAllProductFamily,
  getProductByFamilyId,
  addproductcombo,
})(ProductComboForm);
