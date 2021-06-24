import React, { Component } from "react";
import { Divider, Grid, Box, Typography, TextField } from "@material-ui/core";
import PrimaryButton from "../../Utils/PrimaryButton";
import { Autocomplete } from "@material-ui/lab";
import {getAllProductFamily,getProductByFamilyId} from "../../Actions/ProductAction"
import { connect } from "react-redux";



class ProductPunching extends Component {
  constructor(props) {
    super(props)
  
    this.state = { 
      family: null,
      varient: null,
    };
  }
  

  componentDidMount() {
    this.props.getAllProductFamily();
    
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.family !== prevState.family) {
      this.props.getProductByFamilyId(this.state.family.id);
    }
  }



  render() {
   
    return (
      <div>
        <Grid container style={{}} spacing={4}>
        <Grid item md={4}>
          <Box pt={3}>
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
                />
              )}
            />
            </Box>
          </Grid>
          <Grid item md={4}>
          <Box pt={3}>
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
                />
              )}
            />
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box pt={5} >
            <PrimaryButton color={"primary"} variant={"contained"}>
              Add
            </PrimaryButton>
            </Box>
          </Grid>
          <Grid item md={12} align="center">
                <PrimaryButton color={"primary"} variant={"contained"}>Update Details</PrimaryButton>
              </Grid>
          {/* <Grid item md={12}>
            <Typography variant={"h6"}>Product 1 </Typography>
          </Grid>
          <Grid item xs={12} md={2} sm={2} lg={2} xl={2}>
            <TextField
              label="Product Family"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={2} sm={2} lg={2} xl={2}>
            <TextField
              label="Product Varient"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
            <TextField
              label="Varient SKU (Standalone)"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
            <TextField
              label="Standalone Sellable?"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={2} sm={2} lg={2} xl={2}>
            <TextField
              label="Product Pricing (Standane)"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>

          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
            <TextField
              label="Product Pricing (Combo)"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
            <TextField
              label="Product SKU (Combo)"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={2} sm={2} lg={2} xl={2}>
            <TextField
              label="Product Validity "
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
            <TextField
              label="Product End of Service"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>

          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
            <TextField
              label="Payment Provider"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
            <TextField
              label="Payment ID"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item md={12}>
            <Typography variant={"h6"}>Product 1 </Typography>
          </Grid>
          <Grid item xs={12} md={2} sm={2} lg={2} xl={2}>
            <TextField
              label="Product Family"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={2} sm={2} lg={2} xl={2}>
            <TextField
              label="Product Varient"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
            <TextField
              label="Varient SKU (Standalone)"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
            <TextField
              label="Standalone Sellable?"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={2} sm={2} lg={2} xl={2}>
            <TextField
              label="Product Pricing (Standane)"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>

          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
            <TextField
              label="Product Pricing (Combo)"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
            <TextField
              label="Product SKU (Combo)"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={2} sm={2} lg={2} xl={2}>
            <TextField
              label="Product Validity "
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
            <TextField
              label="Product End of Service"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>

          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
            <TextField
              label="Payment Provider"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
            <TextField
              label="Payment ID"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid> */}
         
        </Grid>
      </div>
    );
  }
}

const mapStateToprops = (state) => {
  console.log(state);
  return {
    getAllProductFamilyList: state.ProductReducer.getAllProductFamily,
    getProductByFamilyIdList : state.ProductReducer.getProductByFamilyId
  };
};

export default connect(mapStateToprops, {
  getAllProductFamily,getProductByFamilyId
})(ProductPunching);
