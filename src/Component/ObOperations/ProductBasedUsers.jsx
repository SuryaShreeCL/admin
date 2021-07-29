import { Grid, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Onboarding from '../ObOnboarding/Onboarding';
import { ThemedTab, ThemedTabs } from '../Utils/ThemedComponents';
import { getAdminLinkedProduct } from "../../Actions/AdminAction"
import { getVariantStepsById } from "../../Actions/ProductAction"
class ProductBasedUsers extends Component {
    constructor(props){
        super(props);
        this.state = {
            tabCount : 0,
            selectedItem : null,
            productDetails : null,
            adminUserDetails : JSON.parse(window.sessionStorage.getItem("adminLinkedProduct"))
        }
    }

    renderContent = (count) =>{
        try {
            if(count === 0){
                return <Onboarding {...this.props} />
            }
        } catch (error) {
            
        }
    }

    componentDidMount() {
        this.props.getAdminLinkedProduct()
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.adminLinkedProductDetails !== prevProps.adminLinkedProductDetails){
            console.log(this.props.adminLinkedProductDetails)
            if(this.props.adminLinkedProductDetails.products.length > 0){
                this.props.getVariantStepsById(this.props.adminLinkedProductDetails.products[0].id)
            }
            
        }
        if(this.props.variantStepList !== prevProps.variantStepList){
             var sortedArr =  this.props.variantStepList.steps.length > 0 && this.props.variantStepList.steps.sort((a,b) => a.rank-b.rank)
            console.log(sortedArr)
            sortedArr !== false && sortedArr.map((it,ix)=>{
                it.steps.sort((c,d)=>c.rank - d.rank)
            })
            console.log(sortedArr)
            this.setState({
                productDetails : sortedArr,
                selectedItem : sortedArr[0]
            })
        }
    }
    
    

    render() {
        console.log(this.props)
        console.log(this.state)
        var componentList = {
            "Onboarding" : "Onboarding",
        }
        console.log(this.state.selectedItem !== null && this.state.selectedItem.stepName)
        var obj = {
            Onboarding : Onboarding,
          
        }
        var selectedComponent = this.state.selectedItem !== null && componentList.[this.state.selectedItem.stepName]
        var Page = obj[selectedComponent];
        return (
           <Grid container>
               <Grid item md={12}>
               <ThemedTabs
             value={this.state.selectedItem}
             textColor={"inherit"}
             onChange={(e, value) => this.setState({selectedItem : value})}
             aria-label="ant example"
           >
            
               {this.state.productDetails && this.state.productDetails.map((item,index)=>{
                   return (
                    <ThemedTab value={item} label={item.stepName} />
                   )    
               })}
         
           </ThemedTabs>
               </Grid>
               <Grid item md={12}>
               {Page !== undefined && <Page productId={this.state.adminUserDetails.products[0].id} stageDetails={this.state.selectedItem} {...this.props} />  }             
               </Grid>
           </Grid>
        );
    }
}

 const mapStateToProps = (state) =>({
    adminLinkedProductDetails : state.AdminReducer.adminLinkedProductDetails,
    variantStepList : state.ProductReducer.variantStepList
})

const useStyles = () =>({

})

export default connect(mapStateToProps,{ getAdminLinkedProduct, getVariantStepsById })(withStyles(useStyles)(ProductBasedUsers))