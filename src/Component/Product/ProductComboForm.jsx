import { Divider, Grid, TextField,Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Autocomplete } from "@material-ui/lab";
import PrimaryButton from "../../Utils/PrimaryButton";
import { getAllProductFamily,getProductByFamilyId } from "../../Actions/ProductAction";
import { connect } from "react-redux";
class ProductComboForm extends Component {
  constructor() {
    super();
    this.state = { family: "" };
  }
  componentDidMount() {
    this.props.getAllProductFamily();
    // this.props.getProductByFamilyId(this.state.family.id)
  }
  family = [
    { title: "Product Family" },
    { title: "Product Family" },
    { title: "Product Family" },
    { title: "Product Family" },
    { title: "Product Family" },
  ];
  render() {
    console.log(this.state.family);
    console.log(this.props.getProductByFamilyIdList)
    return (
      <div>
        <h5>Product Combo Generator for January 2021</h5>
        <Divider />
        <Grid container spacing={2} style={{ margin: "10px" }}>
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
                />
              )}
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              id="combo-box-demo"
              options={this.props.getProductByFamilyIdList}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Product Varient"
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item md={4}>
            <PrimaryButton color={"primary"} variant={"contained"}>
              Add
            </PrimaryButton>
          </Grid>
          <Grid item md={12}>
            <hr/>
          </Grid>
          <Grid item md={12}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Typography style={{color:"#1093FF",fontWeight:"bold"}}>Product 1</Typography>
              </Grid>
              <Grid item md={3}>
                <TextField disabled label="Product Family"/>
              </Grid>
              <Grid item md={3}>
                <TextField disabled label="Product Varient"/>
              </Grid>
              <Grid item md={2}>
                <TextField disabled label="Varient SKU"/>
              </Grid>
              <Grid item md={2}>
                <TextField disabled label="Standalone"/>
              </Grid>
              <Grid item md={2}>
                <TextField disabled label="Product Pricing Standalone"/>
              </Grid>
              <Grid item md={2}>
                <TextField disabled label="Pricing Combo"/>
              </Grid>
              <Grid item md={2}>
                <TextField disabled label="Product SKU combo"/>
              </Grid>
              <Grid item md={2}>
                <TextField disabled label="Product Validity"/>
              </Grid>
              <Grid item md={2}>
                <TextField disabled label="End of Service"/>
              </Grid>
              <Grid item md={2}>
                <TextField disabled label="End of Enrollment"/>
              </Grid>
              <Grid item md={2}>
              </Grid>
              {/* <Grid item md={12}>
                <Typography style={{color:"#1093FF",fontWeight:"bold"}}>Product 2</Typography>
              </Grid>
              <Grid item md={3}>
                <TextField disabled label="Product Family"/>
              </Grid>
              <Grid item md={3}>
                <TextField disabled label="Product Varient"/>
              </Grid>
              <Grid item md={2}>
                <TextField disabled label="Varient SKU"/>
              </Grid>
              <Grid item md={2}>
                <TextField disabled label="Standalone"/>
              </Grid>
              <Grid item md={2}>
                <TextField disabled label="Product Pricing Standalone"/>
              </Grid>
              <Grid item md={2}>
                <TextField disabled label="Pricing Combo"/>
              </Grid>
              <Grid item md={2}>
                <TextField disabled label="Product SKU combo"/>
              </Grid>
              <Grid item md={2}>
                <TextField disabled label="Product Validity"/>
              </Grid>
              <Grid item md={2}>
                <TextField disabled label="End of Service"/>
              </Grid>
              <Grid item md={2}>
                <TextField disabled label="End of Enrollment"/>
              </Grid>
              <Grid item md={2}>
              </Grid> */}
              <Grid item md={12}>
                <Typography style={{color:"#1093FF",fontWeight:"bold"}}>Combo Details</Typography>
              </Grid>
              <Grid item md={2}>
              <TextField label="Combo Details"/>
              </Grid>
              <Grid item md={2}>
              <TextField label="Combo SKU"/>
              </Grid>
              <Grid item md={2}>
              <TextField label="Combo Validity"/>
              </Grid>
              <Grid item md={2}>
              <TextField label="Combo Name"/>
              </Grid>
              <Grid item md={4}>
              </Grid>
              <Grid item md={12} align="center">
                <PrimaryButton color={"primary"} variant={"contained"}>Create Combo</PrimaryButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <hr />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    getAllProductFamilyList: state.ProductReducer.getAllProductFamily,
    getProductByFamilyIdList : state.ProductReducer.getProductByFamilyId
  };
};

export default connect(mapStateToProps, { getAllProductFamily,getProductByFamilyId })(
  ProductComboForm
);
