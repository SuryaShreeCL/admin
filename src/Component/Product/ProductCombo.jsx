import { Card, IconButton, Typography, Grid, Icon,Button } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import React, { Component } from "react";
import { productcomboPath } from "../RoutePaths";
import ReactExport from "react-export-excel";
import {getproductcombo} from '../../Actions/ProductAction'
import { connect } from "react-redux";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
class ProductCombo extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.getproductcombo()
  }
  data = [
    {
      comboname: "My Combo",
      combo_sku: "Combo SKU",
      product_1: "Product_1",
      product_2: "Product_2",
      pricing: "12000",
      validity: "300 days",
      createdby: "Venkatesh",
      createdat: "12-Jan",
      combomonth: "March",
    },
    {
      comboname: "My Combo",
      combo_sku: "Combo SKU",
      product_1: "Product_1",
      product_2: "Product_2",
      pricing: "12000",
      validity: "300 days",
      createdby: "Venkatesh",
      createdat: "12-Jan",
      combomonth: "March",
    },
  ];

  render() {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item md={11}>
            <Typography>Product Combo</Typography>
          </Grid>
          <Grid item md={1}>
          <ExcelFile
              filename={"Product Combo"}
              element={
                <Button variant="contained" size="small" color="primary">
                  Export Excel
                </Button>
              }
            >
              <ExcelSheet
                data={this.props.getproductcomboList}
                name="Product Combo"
              >
                <ExcelColumn label="Combo Name" value="comboName" />
                <ExcelColumn label="Combo SKU" value="comboSKU" />
                <ExcelColumn label="Combo Short Code" value="comboShortCode" />
                <ExcelColumn label="Product_1" value="name" />
                <ExcelColumn label="product_2" value="name" />
                <ExcelColumn label="Combo Cost Price" value="comboCostPrice" />
                <ExcelColumn label="Combo Sell Price" value="comboSellingPrice" />
                <ExcelColumn label="validity" value="validity" />
                <ExcelColumn label="Created By" value="createdBy" />
                <ExcelColumn label="Created At" value="dateOfCreation" />
                <ExcelColumn label="Updated By" value="updatedBy" />
                <ExcelColumn label="Updated At" value="dateOfUpdate" />
              </ExcelSheet>
            </ExcelFile>
          </Grid>
          <Grid item md={4}>
            <Card style={{ height: "180px", width: "300px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "40px",
                }}
              >
                <IconButton onClick={()=>this.props.history.push(productcomboPath)}>
                    <AddCircle fontSize="large" color="primary"/>
                </IconButton>
                <Typography style={{color:"#1093FF"}}>Create a New Product combo</Typography>
              </div>
            </Card>
          </Grid>

          {this.data.map((eg) => (
            <Grid item md={4}>
              <Card style={{ height: "180px", width: "340px",padding:"10px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px",
                  }}
                >
                  <Typography>ComboName : {eg.comboname}</Typography>
                  <Typography>Combo_SKU : {eg.combo_sku}</Typography>
                  <div style={{ display: "flex",justifyContent:"space-between" }}>
                    <Typography>Product : {eg.product_1},{eg.product_2}</Typography>
                    {/* <Typography>{eg.product_2}</Typography> */}
                  </div>
                  <div style={{ display: "flex" ,justifyContent:"space-between" }}>
                    <Typography>Pricing:{eg.pricing}</Typography>
                    <Typography>Validity:{eg.validity}</Typography>
                  </div>
                  <div style={{ display: "flex",justifyContent:"space-between"  }}>
                    <Typography>Createdat:{eg.createdat}</Typography>
                    <Typography>Createdby:{eg.createdby}</Typography>
                  </div>
                  <Typography>Combo Month:{eg.combomonth}</Typography>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    getproductcomboList :  state.ProductReducer.getproductcombo
  };
};

export default connect(mapStateToProps, {
  getproductcombo
})(ProductCombo);
