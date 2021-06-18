import { TextField ,Grid,Button } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Autocomplete} from '@material-ui/lab'

 class VariantGeneralData extends Component {
    family=[
            {title:"Profile Builder"},
            {title:"Profile Builder"},
            {title:"Profile Builder"},
            {title:"Profile Builder"},
            {title:"Profile Builder"}
         ]
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
                       <TextField label="Product Service End" />
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
                        <Button color="primary" variant="contained">Create New Varient</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {

    }
}

export default connect(mapStateToProps, {})(VariantGeneralData)