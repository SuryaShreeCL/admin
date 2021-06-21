import { TextField ,Grid,Button } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Autocomplete} from '@material-ui/lab'
import {postgeneraldetails} from '../../Actions/ProductAction'

 class VariantGeneralData extends Component {
    constructor(){
       super();
       this.state={
          productName : "",
          variantsku : "",
          variantfamilysku :"",
          shortName : "",
          endOfServiceDate:"",
          endOfEnrollmentDate:"",
          costPrice :"",
          sellingPrice:"",
          createdBy:"",
          dateOfCreation:"",
          standaloneSellable:"",
       }
    }
    family=[
            {title:"Profile Builder"},
            {title:"Profile Builder"},
            {title:"Profile Builder"},
            {title:"Profile Builder"},
            {title:"Profile Builder"}
         ]
         handlesaved = ()=>{
           console.log("hello")
          let obj = {
            "name": "acfekl",
            "variant_SKU": this.state.variantsku,
            "variant_family_SKU":this.state.variantfamilysku,
            "shortName": this.state.shortName,
            "endOfServiceDate":this.state.endOfServiceDate,
            "endOfEnrollmentDate":this.state.endOfEnrollmentDate,
            "costPrice":this.state.costPrice,
            "sellingPrice":this.state.sellingPrice,
            "createdBy":this.state.createdBy,
            "dateOfCreation":this.state.dateOfCreation,
            "standaloneSellable":this.state.standaloneSellable,
            "productFamily": {
                "id": "1"
            }
        }
        this.props.postgeneraldetails(obj)
         }
    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item md={3}>
                       {/* <TextField label="Product Family" /> */}
                       <Autocomplete
                        id="combo-box-demo"
                        options={this.family}
                        getOptionLabel={(option) => option.title}
                        // style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Product Family" variant="standard" />}
                        />
                    </Grid>
                    <Grid item md={3}>
                       <TextField label="Product Variant" />
                    </Grid>
                    <Grid item md={2}>
                       <TextField label="Varient SKU" />
                    </Grid>
                    <Grid item md={2}>
                       <TextField label="Standalone" />
                    </Grid>
                    <Grid item md={2}>
                       <TextField label="Pricing" />
                    </Grid>
                    <Grid item md={2}>
                       <TextField label="Product Selling Price" />
                    </Grid>
                    <Grid item md={2}>
                       <TextField label="Product End of Service" />
                    </Grid>
                    <Grid item md={2}>
                       <TextField label="Product End of Enrollment" />
                    </Grid>
                    <Grid item md={6}>

                    </Grid>
                    <Grid item md={2}>
                       <TextField label="Updated By" />
                    </Grid>
                    <Grid item md={2}>
                       <TextField label="Updated On" />
                    </Grid>
                    <Grid item md={2}>
                       <TextField label="Created By" />
                    </Grid>
                    <Grid item md={2}>
                       <TextField label="Created On" />
                    </Grid>
                    <Grid item md={12}>
                        <Button color="primary" variant="contained" onClick={this.handlesaved}>Create New Varient</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
      postgeneraldetailsList : state.ProductReducer.postgeneraldetails
    }
}

export default connect(mapStateToProps, {postgeneraldetails})(VariantGeneralData)