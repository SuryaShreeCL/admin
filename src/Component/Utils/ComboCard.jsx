import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { Typography, Card } from '@material-ui/core'
class ComboCard extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let createddate = new Date(this.props.createdat).getDate()
        let createdmonth = new Date(this.props.createdat).getMonth()
        let craetedyear = new Date(this.props.createdat).getFullYear()
        let createdat = createddate+"-"+createdmonth+"-"+craetedyear
       console.log(this.props.product)
        return (
            <div>
                <Grid container>
                        <Grid item md={4}>
                            <Card style={{ height: "auto", width: "330px", padding: "10px", boxShadow:" 0px 8px 7px rgba(183, 222, 255, 0.5)",borderRadius:8}}>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",

                                    }}
                                >
                                    <Grid style={{ padding: 5 }}>ComboName : {this.props.comboname}</Grid>
                                    <Grid style={{ padding: 5 }}>Combo_SKU : {this.props.combosku}</Grid>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        {/* <Grid style={{ padding: 5 }}>Product : { this.props.product.map( data =>{return( data.name !== null && data.name+",")})}</Grid> */}
                                        <Grid style={{ padding: 5 }}>Product : { this.props.product}</Grid>

                                        {/* <Grid>{eg.product_2}</Grid> */}
                                    </div>
                                    <Grid container>
                                        <Grid item xs={6} style={{ padding: 5 }}>Pricing : {this.props.pricing}</Grid>
                                        <Grid item xs={6} style={{ padding: 5, flex: 1 }}>Validity : {this.props.validity}</Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6} style={{ padding: 5 }}>Createdat:{createdat}</Grid>
                                        <Grid item xs={6} style={{ padding: 5, flex: 1 }}>Createdby:{this.props.createdby}</Grid>
                                    </Grid>
                                    

                                    <Grid style={{ padding: 5 }}>Combo Month: March</Grid>
                                </div>
                            </Card>
                        </Grid>
                </Grid>
            </div>
        );
    }
}

export default ComboCard;