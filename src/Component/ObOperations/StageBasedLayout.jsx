import { Grid, withStyles, Box } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThemedTab, ThemedTabs } from '../Utils/ThemedComponents';
import SubLayoutTab from './SubLayoutTab';
import { getvarientByid } from "../../Actions/ProductAction"
import ProdDetails from "./ProdDetails.json"
import { Typography } from '@material-ui/core';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    );
  }

class StageBasedLayout extends Component {
    constructor(props){
        super(props);
        this.state = {
            tabCount : 0,
            stepTabCount : 0,
            productDetails : null,
            selectedItem : null,
        }
    }

    renderContent = (count) =>{
        try {
            if(count === 0){
                return <SubLayoutTab {...this.props} />
            }
        } catch (error) {
            
        }
    }

  
componentDidMount() {
    // this.props.getvarientByid("1")
    this.setState({
        selectedItem : ProdDetails.steps[0].steps[0]
    })
}

componentDidUpdate(prevProps, prevState) {
   
}



    render() {
        var componentList = {
            "Personal Information" : "PGA",
            "Educational Details" : "APPLICATION_STAGE",
            "Professional experience" : "SubLayoutTab"
        }
        console.log(this.state.selectedItem !== null && this.state.selectedItem.stepName)
        var obj = {
            SubLayoutTab : SubLayoutTab,
            PGA : PGA,
            APPLICATION_STAGE : APPLICATION_STAGE,
        }
        var selectedComponent = this.state.selectedItem !== null && componentList.[this.state.selectedItem.stepName]
        var Page = obj[selectedComponent];
        console.log(this.state)
        return (
         <Grid container>
            <Grid item md={12}>
               <ThemedTabs
             value={this.state.tabCount}
             textColor={"inherit"}
             onChange={(e, value) => this.setState({tabCount : value})}
             aria-label="ant example"
           >
            
               {ProdDetails.steps.map((item,index)=>{
                   return (
                    <ThemedTab label={item.stepName} />
                   )    
               })}
         
           </ThemedTabs>
               </Grid>
               <Grid item md={12}>
               <ThemedTabs
             value={this.state.selectedItem}
             textColor={"inherit"}
             onChange={(e, value) => this.setState({ selectedItem : value })}
             aria-label="ant example"
           >
               {ProdDetails.steps.filter((it,ix)=> ix === this.state.tabCount).map((item,index)=>{
                   console.log("item",item)
                   return item.steps.map((stepItem,stepIndex)=>{
                    console.log("stepItem",stepItem)
                       return (
                        <ThemedTab value={stepItem} label={stepItem.stepName} />
                       )
                   })
               })}
               </ThemedTabs>
               </Grid>
               <Grid item md={12}>
                   {Page !== undefined && <Page {...this.props} />  }             
               </Grid>
         </Grid>
        );
    }
}

const PGA = () =>{
    return <Typography>PGA</Typography>
}

const APPLICATION_STAGE = () =>{
    return <Typography>APPLICATION_STAGE</Typography>
}


const mapStateToProps = (state) =>({
    getvarientByidData : state.ProductReducer.getvarientByid
})

const useStyles = () =>({

})

export default connect(mapStateToProps,{ getvarientByid })(withStyles(useStyles)(StageBasedLayout))