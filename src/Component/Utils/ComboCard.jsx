import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { Typography, Card } from '@material-ui/core'
class ComboCard extends Component {
    constructor(props) {
        super(props)
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
        // {
        //   comboname: "My Combo",
        //   combo_sku: "Combo SKU",
        //   product_1: "Product_1",
        //   product_2: "Product_2",
        //   pricing: "12000",
        //   validity: "300 days",
        //   createdby: "Venkatesh",
        //   createdat: "12-Jan",
        //   combomonth: "March",
        // },
    ];
    render() {
        return (
            <div>
                <Grid container>
                    {this.data.map((eg) => (
                        <Grid item md={4}>
                            <Card style={{ height: "auto", width: "330px", padding: "10px", boxShadow:" 0px 0px 7px rgba(183, 222, 255, 0.5)",borderRadius:8}}>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",

                                    }}
                                >
                                    <Grid style={{ padding: 5 }}>ComboName : {eg.comboname}</Grid>
                                    <Grid style={{ padding: 5 }}>Combo_SKU : {eg.combo_sku}</Grid>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Grid style={{ padding: 5 }}>Product : {eg.product_1},{eg.product_2}</Grid>
                                        {/* <Grid>{eg.product_2}</Grid> */}
                                    </div>
                                    <Grid container>
                                        <Grid item xs={6} style={{ padding: 5 }}>Pricing : {eg.pricing}</Grid>
                                        <Grid item xs={6} style={{ padding: 5, flex: 1 }}>Validity : {eg.validity}</Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6} style={{ padding: 5 }}>Createdat:{eg.createdat}</Grid>
                                        <Grid item xs={6} style={{ padding: 5, flex: 1 }}>Createdby:{eg.createdby}</Grid>
                                    </Grid>
                                    

                                    <Grid style={{ padding: 5 }}>Combo Month:{eg.combomonth}</Grid>
                                </div>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}

export default ComboCard;