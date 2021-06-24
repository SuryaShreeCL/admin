import { Card, IconButton, Typography, Grid, Icon,Button } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import React, { Component } from "react";
import { productcomboPath } from "../RoutePaths";
import ReactExport from "react-export-excel";
import {getproductcombo} from '../../Actions/ProductAction'
import { connect } from "react-redux";
import ComboCard from "../Utils/ComboCard"
import AddNewCard from "../Utils/AddNewCard"
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
                <ExcelColumn label="Product_1" value="name" />
                <ExcelColumn label="product_2" value="name" />
                <ExcelColumn label="pricing" value="comboCostPrice" />
                <ExcelColumn label="validity" value="validity" />
                <ExcelColumn label="createdby" value="createdBy" />
                <ExcelColumn label="createdat" value="dateOfCreation" />
                <ExcelColumn label="combomonth" value="month" />
              </ExcelSheet>
            </ExcelFile>
          </Grid>
          <Grid item md={4}>
            <AddNewCard />
          </Grid>
            <Grid item md={4}>
              <ComboCard/>
            </Grid>
          
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
