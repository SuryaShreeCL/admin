import { Card, IconButton, Typography, Grid, Icon,Button } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import React, { Component } from "react";
import { productcomboPath } from "../RoutePaths";
import ReactExport from "react-export-excel";
import AddNewCard from "../Utils/AddNewCard";
import ComboCard from "../Utils/ComboCard";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
export default class ProductCombo extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {

  }
  // data = [
  //   {
  //     comboname: "My Combo",
  //     combo_sku: "Combo SKU",
  //     product_1: "Product_1",
  //     product_2: "Product_2",
  //     pricing: "12000",
  //     validity: "300 days",
  //     createdby: "Venkatesh",
  //     createdat: "12-Jan",
  //     combomonth: "March",
  //   },
  //   {
  //     comboname: "My Combo",
  //     combo_sku: "Combo SKU",
  //     product_1: "Product_1",
  //     product_2: "Product_2",
  //     pricing: "12000",
  //     validity: "300 days",
  //     createdby: "Venkatesh",
  //     createdat: "12-Jan",
  //     combomonth: "March",
  //   },
  // ];
  getcombo=[
    {
      "id": "ad8471f3-696c-4743-8907-f806f96d98ff",
      "comboName": "Profile Builder for Placements",
      "comboShortCode": "PBP",
      "comboSKU": "PBP_2022",
      "validity": "365",
      "endOfEnrollment": "2021-06-24T18:30:00.000+0000",
      "comboCostPrice": "50000",
      "comboSellingPrice": "20000",
      "dateOfCreation": "2021-06-22T00:00:00.000+0000",
      "createdBy": "Atharva",
      "updatedBy": "Atharva",
      "dateOfUpdate": "2021-06-22T00:00:00.000+0000",
"products": [
          {
              "id": "2",
              "name": "Profile builder for Masters",
              "shortName": "PB Masters",
              "codeName": "PBM",
              "validity": "365",
              "productOneliner": null,
              "productDescription": null,
              "variantSKU": null,
              "createdBy": null,
              "updatedBy": null,
              "dateOfCreation": null,
              "dateOfUpdate": null,
              "courseOpted": null,
              "googleDriveLink": null,
              "variantFamilySKU": null,
              "standaloneSellable": null,
              "endOfServiceDate": null,
              "endOfEnrollmentDate": null,
              "year": null,
              "costPrice": null,
              "sellingPrice": null,
              "intake": null,
              "wkStatus": null,
              "productTnc": null,
              "productFamily": {
                  "id": "1",
                  "productName": "Profile Builder Family",
                  "shortName": "PB",
                  "codeName": "PB",
                  "createdBy": null,
                  "updatedBy": null,
                  "varientCount": null,
                  "dateOfCreation": null,
                  "dateOfUpdate": null
              },
"productImages": [],
              "productVideos": [],
              "productQuestionAnswers": [
                  {
                      "id": "36fd798a-033c-4df2-bd74-28dab3d4d444",
                      "question": "questions",
                      "answer": "answers"
                  }
              ]
          },
          {
              "id": "1",
              "name": "Profile Builder for Placements",
              "shortName": "PB Placements",
              "codeName": "PBP",
              "validity": "365",
              "productOneliner": null,
              "productDescription": null,
              "variantSKU": null,
              "createdBy": null,
              "updatedBy": null,
              "dateOfCreation": null,
              "dateOfUpdate": null,
              "courseOpted": null,
              "googleDriveLink": null,
              "variantFamilySKU": null,
              "standaloneSellable": null,
              "endOfServiceDate": null,
              "endOfEnrollmentDate": null,
              "year": null,
              "costPrice": null,
              "sellingPrice": null,
              "intake": null,
              "wkStatus": "Live",
              "productTnc": null,
              "productFamily": {
                  "id": "1",
                  "productName": "Profile Builder Family",
                  "shortName": "PB",
                  "codeName": "PB",
                  "createdBy": null,
                  "updatedBy": null,
                  "varientCount": null,
                  "dateOfCreation": null,
                  "dateOfUpdate": null
              },
              "productImages": [],
              "productVideos": [],
              "productQuestionAnswers": [
                  {
                      "id": "2d1a5c70-ca4a-480f-8ae8-25ecd61eb0db",
                      "question": "question",
                      "answer": "answer"
                  },
                  {
                      "id": "f23bed8f-8bfc-41d6-8946-a15265c1e6f2",
                      "question": "ques",
                      "answer": "ans"
                  }
              ]
          }

  ]
}
  ]
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
                data={this.getcombo}
                name="Product Combo"
              >
                <ExcelColumn label="Combo Name" value="comboName" />
                <ExcelColumn label="Combo SKU" value="comboSKU" />
                <ExcelColumn label="Product_1" value="" />
                <ExcelColumn label="product_2" value="" />
                <ExcelColumn label="pricing" value="comboCostPrice" />
                <ExcelColumn label="validity" value="validity" />
                <ExcelColumn label="createdby" value="createdBy" />
                <ExcelColumn label="createdat" value="dateOfCreation" />
                <ExcelColumn label="combomonth" value="" />
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

