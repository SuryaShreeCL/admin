import { TextField, Grid, Button } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import { postgeneraldetails,getAllProductFamily,getProductVarient } from "../../Actions/ProductAction";
import DateFnsUtils from "@date-io/date-fns";
import PrimaryButton from '../../Utils/PrimaryButton'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {isEmptyString} from '../Validation'
class VariantGeneralData extends Component {
  constructor() {
    super();
    this.state = {
      productName: "",
      productnameErr:"",
      variantsku: "",
      varientErr:"",
      variantfamilysku: "",
      variantfamilyskuErr:"",
      shortName: "",
      endOfServiceDate: new Date(),
      endOfServiceDateErr:"",
      endOfEnrollmentDate: new Date(),
      endOfEnrollmentDateErr:"",
      costPrice: "",
      costPriceErr : "",
      sellingPrice: "",
      sellingPriceErr:"",
      createdBy: window.sessionStorage.getItem("role"),
      createdByErr:"",
      createdOn: new Date(),
      createdOnErr:"",
      standaloneSellable: "",
      standaloneSellableErr:"",
      updatedBy: window.sessionStorage.getItem("role"),
      UpdatedOn: new Date(),
    };
  }
  componentDidMount(){
     this.props.getAllProductFamily()
     this.props.getProductVarient()
  }
  data=[
     {title : "Yes"},
     {title : "No"}
  ]
  handlesaved = () => {
   //  console.log("hello");
   let hlptxt = "Please Fill the Required Field"
   this.state.productName === "" ? this.setState({productnameErr : hlptxt}) : this.setState({productnameErr : ""})
   isEmptyString(this.state.variantfamilysku) ? this.setState({variantfamilyskuErr : hlptxt}) : this.setState({variantfamilyskuErr : ""})
   isEmptyString(this.state.variantsku) ? this.setState({varientErr : hlptxt}) : this.setState({varientErr : ""})
   this.state.endOfEnrollmentDate === null ? this.setState({endOfEnrollmentDateErr : hlptxt}) : this.setState({endOfEnrollmentDateErr:""})
   isEmptyString(this.state.costPrice) ? this.setState({costPriceErr : hlptxt}) : this.setState({ costPriceErr :""})
   isEmptyString(this.state.sellingPrice) ? this.setState({ sellingPriceErr :hlptxt}) : this.setState({ sellingPriceErr : ""})
   this.state.endOfServiceDate === null ? this.setState({endOfServiceDateErr : hlptxt}):this.setState({endOfServiceDateErr : ""})
   this.state.createdOn === null ? this.setState({ createdOnErr : hlptxt}) : this.setState({ createdOnErr : ""})
   isEmptyString(this.state.createdBy) ? this.setState({ createdByErr : hlptxt}) : this.setState({createdByErr : ""})
   this.state.standaloneSellable === "" ? this.setState({ standaloneSellableErr : hlptxt}) : this.setState({ standaloneSellableErr : ""})
   if(
      !isEmptyString(this.state.variantfamilysku) &&
      !isEmptyString(this.state.variantsku) &&
      !isEmptyString(this.state.costPrice) &&
      !isEmptyString(this.state.sellingPrice) &&
      !isEmptyString(this.state.createdBy) &&
      this.state.endOfServiceDate !== null &&
      this.state.createdOn !== null &&
      this.state.endOfEnrollmentDate !== null &&
      this.state.productName !== "" &&
      this.state.standaloneSellable !== ""
   ){
      let obj = {
         name: this.state.variantfamilysku,
         variant_SKU: this.state.variantsku,
         variant_family_SKU: null ,
         shortName: this.state.productName.shortName,
         endOfServiceDate: this.state.endOfServiceDate,
         endOfEnrollmentDate: this.state.endOfEnrollmentDate,
         costPrice: this.state.costPrice,
         sellingPrice: this.state.sellingPrice,
         createdBy: this.state.createdBy,
         dateOfCreation: this.state.createdOn,
         standaloneSellable: this.state.standaloneSellable.title,
         productFamily: {
           id: this.state.productName.id,
         },
         dateOfUpdate:new Date(),
         updatedBy:window.sessionStorage.getItem("role")
       };
       this.props.postgeneraldetails(obj);
   }
   console.log(this.state)
  };
  render() {
    console.log(this.props)
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item md={3}>
            {/* <TextField label="Product Family" /> */}
            <Autocomplete
              id="combo-box-demo"
              options={this.props.getAllProductFamilyList}
              getOptionLabel={(option) => option.productName}
              value={this.state.productName}
              // style={{ width: 300 }}
              onChange={(e, newValue) =>
                this.setState({ productName: newValue })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Product Family"
                  error={this.state.productnameErr.length > 0}
                  helperText={this.state.productnameErr}
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              label="Product Variant"
              variant="standard"
              value={this.state.variantfamilysku}
              name="variantfamilysku"
              onChange={(e) =>
                this.setState({ variantfamilysku: e.target.value })
              }
              error={this.state.variantfamilyskuErr.length > 0}
              helperText={this.state.variantfamilyskuErr}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              label="Varient SKU"
              variant="standard"
              value={this.state.variantsku}
              onChange={(e) => this.setState({ variantsku: e.target.value })}
              error={this.state.varientErr.length > 0}
              helperText={this.state.varientErr}
            />
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              options={this.data}
              getOptionLabel={(option) => option.title}
              value={this.state.standaloneSellable}
              // style={{ width: 300 }}
              onChange={(e, newValue) =>
                this.setState({ standaloneSellable: newValue })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Standalone"
                  variant="standard"
                  error={this.state.standaloneSellableErr.length > 0}
                  helperText={this.state.standaloneSellableErr}
                />
              )}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              label="Pricing"
              type="number"
              value={this.state.costPrice}
              error={this.state.costPriceErr.length > 0}
              helperText={this.state.costPriceErr}
              onChange={(e) => this.setState({ costPrice: e.target.value })}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              label="Product Selling Price"
              type="number"
              size="small"
              value={this.state.sellingPrice}
              error={this.state.sellingPriceErr.length > 0}
              helperText={this.state.sellingPriceErr}
              onChange={(e) => this.setState({ sellingPrice: e.target.value })}
            />
          </Grid>
          <Grid item md={2}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="End of Service"
                format="yyyy-MM-dd"
                error={this.state.endOfServiceDateErr.length > 0}
                helperText={this.state.endOfServiceDateErr}
                value={this.state.endOfServiceDate}
                onChange={(e, newValue) =>
                  this.setState({ endOfServiceDate: newValue })
                }
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={2}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="End of Enrollment"
                disableFuture
                error={this.state.endOfEnrollmentDateErr.length > 0}
                helperText={this.state.endOfEnrollmentDateErr}
                format="yyyy-MM-dd"
                value={this.state.endOfEnrollmentDate}
                onChange={(e, newValue) =>
                  this.setState({ endOfEnrollmentDate: newValue })
                }
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={6}></Grid>
          <Grid item md={2}>
            <TextField
              label="Created By"
              disabled
              value={this.state.createdBy}
            //   error={this.state.createdByErr.length > 0}
            //   helperText={this.state.createdByErr}
              onChange={(e) => this.setState({ createdBy: e.target.value })}
            />
          </Grid>
          <Grid item md={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Created On"
                format="yyyy-MM-dd"
                disabled
                value={this.state.createdOn}
                error={this.state.createdOnErr.length > 0}
                helperText={this.state.createdOnErr}
                onChange={(e, newValue) =>
                  this.setState({ createdOn: newValue })
                }
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          {/* <Grid item md={12}>
            <Button
              color="primary"
              variant="contained"
              style={{ borderRadius: "30px" }}
              onClick={this.handlesaved}
            >
              Create New Varient
            </Button>
          </Grid> */}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postgeneraldetailsList: state.ProductReducer.postgeneraldetails,
    getAllProductFamilyList : state.ProductReducer.getAllProductFamily,
    getProductVarientList : state.ProductReducer.getProductVarient
  };
};

export default connect(mapStateToProps, { postgeneraldetails,getAllProductFamily,getProductVarient })(
  VariantGeneralData
);
