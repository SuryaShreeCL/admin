import { Grid, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Onboarding from '../ObOnboarding/Onboarding';
import { ThemedTab, ThemedTabs } from '../Utils/ThemedComponents';
import { getAdminLinkedProduct } from "../../Actions/AdminAction"
class ProductBasedUsers extends Component {
    constructor(props){
        super(props);
        this.state = {
            tabCount : 0,
            selectedItem : null,
            productDetails : null,
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
            var sortedArr =  this.props.adminLinkedProductDetails.products.length > 0 && this.props.adminLinkedProductDetails.products[0].steps.sort((a,b) => a.rank-b.rank)
            console.log(sortedArr)
            sortedArr !== false && sortedArr.map((it,ix)=>{
                it.steps.sort((c,d)=>c.rank - d.rank)
            })
            console.log(sortedArr)
            this.setState({
                productDetails : sortedArr,
            })
        }
    }
    
    

    render() {
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
            
               {this.state.productDetails !== null && this.state.productDetails.map((item,index)=>{
                   return (
                    <ThemedTab value={item} label={item.stepName} />
                   )    
               })}
         
           </ThemedTabs>
               </Grid>
               <Grid item md={12}>
               {Page !== undefined && <Page stageDetails={this.state.selectedItem} {...this.props} />  }             
               </Grid>
           </Grid>
        );
    }
}

 const mapStateToProps = (state) =>({
    adminLinkedProductDetails : state.AdminReducer.adminLinkedProductDetails
})

const useStyles = () =>({

})

export default connect(mapStateToProps,{ getAdminLinkedProduct })(withStyles(useStyles)(ProductBasedUsers))