import React, { Component } from "react";
import { Divider, Grid, Box, Typography, TextField } from "@material-ui/core";
import PrimaryButton from "../../Utils/PrimaryButton";
import { Autocomplete } from "@material-ui/lab";
import {getAllProductFamily,getProductByFamilyId,updateProductPunching} from "../../Actions/ProductAction"
import { connect } from "react-redux";



class ProductPunching extends Component {
  constructor(props) {
    super(props)
  
    this.state = { 
      family: null,
      varient: null,
      id :"",
      punching : [],
      
    };
    for (const [key, value] of Object.entries(this.state)) {
    
  }
  }
  

  componentDidMount() {
    this.props.getAllProductFamily();
    
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.family !== prevState.family) {
      this.props.getProductByFamilyId(this.state.family.id);
    }
  }
  handleAdd = () => {
    if (this.state.varient !== null) {
      let arr = this.state.punching;
      arr.push({
        id: this.state.varient.id,
        familyName: this.state.varient.productFamily.productName,
        productVarient: this.state.varient.name,
        varientSku: this.state.varient.variantSKU,
        standalone: this.state.varient.standaloneSellable,
        productPriceStandalone: this.state.varient.sellingPrice,
        productPriceCombo :this.state.varient.costPrice,
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
    let obj={
      
}


    
    this.props.updateProductPunching(obj);
    console.log("updated")
  }
  handleChange = (e) => {
    
    this.setState({[e.target.name] : e.target.value})

  }

  



  render() {
   console.log(this.state)
   console.log(this.state.varient)
   console.log(this.state.punching)
   
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
                  <Typography variant={"h6"} style={{ color: "#1093FF", fontWeight: "bold" }}>
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
                  <TextField disabled label="Product SKU (Combo)"
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
                    name={"payment_provider_"+ data.id}
                    onChange={ (e) => this.handleChange(e)}
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    // disabled
                    label="Payment ID"
                    name={"payment_id_"+ data.id}
                    onChange={ (e) => this.handleChange(e)}
                  />
                </Grid>
                <Grid item md={2}></Grid>
                
                
              </Grid>
              
              
            );
          })}
          <Grid item md={12} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
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
          
      </div>
    );
  }
}

const mapStateToprops = (state) => {
  console.log(state);
  return {
    getAllProductFamilyList: state.ProductReducer.getAllProductFamily,
    getProductByFamilyIdList : state.ProductReducer.getProductByFamilyId,
    updateProductPunchingList: state.ProductReducer.updateProductPunching
  };
};

export default connect(mapStateToprops, {
  getAllProductFamily,getProductByFamilyId,updateProductPunching
})(ProductPunching);
