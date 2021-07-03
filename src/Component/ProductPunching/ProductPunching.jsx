import React, { Component } from "react";
import { Divider, Grid, Box, Typography, TextField } from "@material-ui/core";
import PrimaryButton from "../../Utils/PrimaryButton";
import { Autocomplete } from "@material-ui/lab";
import {
  getAllProductFamily,
  getProductByFamilyId,
  updateProductPunching,
  getpunchingdata,
  postpunchingdata,
} from "../../Actions/ProductAction";
import { connect } from "react-redux";
import MySnackBar from "../MySnackBar";

class ProductPunching extends Component {
  constructor(props) {
    super(props);

    this.state = {
      family: null,
      varient: null,
      familyErr: "",
      varientErr: "",
      id: "",
      punching: [],
      idarr: [],
      snackMsg: "",
      snackVariant: "",
      snackOpen: false,
    };
  }

  componentDidMount() {
    this.props.getAllProductFamily();
    this.props.getpunchingdata(this.props.match.params.id);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.family !== prevState.family) {
      this.props.getProductByFamilyId(this.state.family.id);
    }
    if (
      this.props.updateProductPunchingList !==
      prevProps.updateProductPunchingList
    ) {
      this.props.getpunchingdata(this.props.match.params.id);
    }
    if (this.props.postpunchingdataList !== prevProps.postpunchingdataList) {
      this.props.getpunchingdata(this.props.match.params.id);
    }
  }
  handleAdd = () => {
    let hlptxt = " Please fill the required field";
    this.state.varient === null
      ? this.setState({ varientErr: hlptxt })
      : this.setState({ varientErr: "" });
    this.state.family === null
      ? this.setState({ familyErr: hlptxt })
      : this.setState({ familyErr: "" });
    if (this.state.varient !== null) {
      let arr = this.state.punching;
      arr.push({
        id: this.state.varient.id,
        familyName: this.state.varient.productFamily.productName,
        productVarient: this.state.varient.name,
        varientSku: this.state.varient.variantSKU,
        standalone: this.state.varient.standaloneSellable,
        productPriceStandalone: this.state.varient.sellingPrice,
        productPriceCombo: this.state.varient.costPrice,
        productSku: this.state.varient.codeName,
        validity: this.state.varient.validity,
        endofservice: this.state.varient.endOfServiceDate,
        // paymentProvider:
        // paymentId :
      });
      this.setState({ punching: arr });
    }
  };

  handleUpdate = () => {
    let arr = [];
    let req = [];
    for (const [key, value] of Object.entries(this.state)) {
      if (key.startsWith("pay")) {
        // let provider = key.substring(key.lastIndexOf("_"),key.indexOf("_"))
        let a = key.substring(key.lastIndexOf("_") + 1, key.length);
        console.log(a, "hello");
        let obj = {
          [key.substring(0, key.lastIndexOf("_"))]: value,
          productId: a,
        };
        let payarr = arr.findIndex((item) => item.productId === obj.productId);
        console.log(payarr);
        if (payarr !== -1) {
          arr[payarr] = {
            ...arr[payarr],
            ...obj,
          };
        } else {
          arr.push(obj);
        }
        console.log(obj);
        // if(key.substring(key.indexOf("_")+2,key.indexOf("_")) === "_i"){
        //  let idarray = this.state.punching.map(item =>  {
        //   return { id: item.id};
        // })
      }
    }
    console.log(arr);
    arr.map((data) =>
      req.push({
        paymentProvider: data.payment_provider,
        paymentId: data.payment_id,
        productId: data.productId,
      })
    );
    console.log(req);
    if(req.length !== 0){
      let obj = {
        studentId: this.props.match.params.id,
        productPaymentModels: req,
      };
      this.props.updateProductPunching(obj);
      let postdata = {
        studentId: this.props.match.params.id,
        productPaymentModels: req,
      };
      this.props.postpunchingdata(postdata);
      this.setState({
        snackMsg: "Updated Successfully",
        snackOpen: true,
        snackVariant: "success",
      });
    }
    
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.props.match.params.id);
    console.log(this.state);
    console.log(this.props.getpunchingdataList)
    return (
      <div> 
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
        </Grid>
        {this.props.getpunchingdataList.length !== 0 && this.props.getpunchingdataList.map(data=>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Typography style={{fontWeight:"bold"}}>Product</Typography>
            </Grid>
            <Grid item md={6}>
            <TextField
                  disabled
                  label="Student ID"
                  value={data.studentId}
                  fullWidth
                />
            </Grid>
            <Grid item md={6}>
            <TextField
                  disabled
                  fullWidth
                  label="Product ID"
                  value={data.products.id}
                />
            </Grid>
            <Grid item md={6}>
            <TextField
                  disabled
                  fullWidth
                  label="Payment ID"
                  // name={"payment_id_" + data.id}
                  onChange={(e) => this.handleChange(e)}
                  value={data.paymentId}
                />
            </Grid>
            <Grid item md={6}>
            <TextField
                  disabled
                  fullWidth
                  label="Payment Provider"
                  // name={"payment_provider_" + data.id}
                  onChange={(e) => this.handleChange(e)}
                  value={data.paymentProvider}
                />
            </Grid>
          </Grid>
          )}
        {this.state.punching.map((data) => {
          let servicedate = new Date(data.endofservice).getDate();
          let servicemonth = new Date(data.endofservice).getMonth();
          let serviceyear = new Date(data.endofservice).getFullYear();
          let endofservicedate =
            servicedate + "-" + servicemonth + "-" + serviceyear;
          return (
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Box pt={3}>
                  <Typography
                    variant={"h6"}
                    style={{ color: "#1093FF", fontWeight: "bold" }}
                  >
                    Product
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={2}>
                <TextField
                  disabled
                  label="Product Family"
                  value={data.familyName}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  disabled
                  label="Product Varient"
                  value={data.productVarient}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  disabled
                  label="Varient SKU (Standalone)"
                  value={data.varientSku}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  disabled
                  label="Standalone Sellable?"
                  value={data.standalone}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  disabled
                  label="Product Pricing (Standane)"
                  value={data.productPriceStandalone}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  disabled
                  label="Product Pricing (Combo)"
                  value={data.productPriceCombo}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  disabled
                  label="Product SKU (Combo)"
                  value={data.productSku}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  disabled
                  label="Product Validity"
                  value={data.validity}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  disabled
                  label="End of Service"
                  value={endofservicedate}
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  // disabled
                  label="Payment Provider"
                  name={"payment_provider_" + data.id}
                  // name="payment_provider_"
                  // value={this.state.payment_provider_}
                  onChange={(e) => this.handleChange(e)}
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  // disabled
                  label="Payment ID"
                  name={"payment_id_" + data.id}
                  // type="number"
                  // value={this.state.payment_id}
                  onChange={(e) => this.handleChange(e)}
                />
              </Grid>
              <Grid item md={2}></Grid>
            </Grid>
          );
        })}
        <Grid
          item
          md={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box pt={3}>
            <PrimaryButton
              color={"primary"}
              variant={"contained"}
              onClick={() => this.handleUpdate()}
            >
              Update Details
            </PrimaryButton>
          </Box>
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

const mapStateToprops = (state) => {
  console.log(state);
  return {
    getAllProductFamilyList: state.ProductReducer.getAllProductFamily,
    getProductByFamilyIdList: state.ProductReducer.getProductByFamilyId,
    updateProductPunchingList: state.ProductReducer.updateProductPunching,
    getpunchingdataList: state.ProductReducer.getpunchingdata,
    postpunchingdataList: state.ProductReducer.postpunchingdata,
  };
};

export default connect(mapStateToprops, {
  getAllProductFamily,
  getProductByFamilyId,
  updateProductPunching,
  getpunchingdata,
  postpunchingdata,
})(ProductPunching);
