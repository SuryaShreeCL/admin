import { Grid, withStyles, Box } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThemedTab, ThemedTabs } from '../Utils/ThemedComponents';
import SubLayoutTab from './SubLayoutTab';
import { getvarientByid } from "../../Actions/ProductAction"
import { getAdminLinkedProduct } from "../../Actions/AdminAction"
import ProdDetails from "./ProdDetails.json"
import { Typography } from '@material-ui/core';
import PersonalInfo from "../ObOnboarding/personalInfo"
import AcademicInfo from "../ObOnboarding/academicInfo"
import WorkExperience from "../ObCallSummary/workExperience"
import AspirationDetails from "../ObCallSummary/aspirationDetails"
import GraduateTestResult from "../ObCallSummary/graduateTestResult"
import TestAndSurvey from "../ObCallSummary/testEngineResult"

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
    // this.props.getvarientByid("fd08541f-d7e8-4497-8fbc-ae5128e16315")
    this.props.getAdminLinkedProduct()
    // this.setState({
    //     selectedItem : ProdDetails.steps[0].steps[0]
    // })
}

componentDidUpdate(prevProps, prevState) {
    
    if(this.props.adminLinkedProductDetails !== prevProps.adminLinkedProductDetails){
        var sortedArr = this.props.adminLinkedProductDetails.products[0].steps.sort((a,b) => a.rank-b.rank)
        console.log(sortedArr)
        sortedArr.map((it,ix)=>{
            it.steps.sort((c,d)=>c.rank - d.rank)
        })
        console.log(sortedArr)
        this.setState({
            productDetails : sortedArr,
        })
    }

}   



    render() {
        var componentList = {
            "Personal Information" : "PersonalInfo",
            "Academic Information" : "AcademicInfo",
            "Work Experience" : "WorkExperience",
            "Aspiration Details" : "AspirationDetails",
            "Graduate Application Tests" : "GraduateTestResult",
            "Tests and Surveys" : "TestAndSurvey"
        }
        console.log(this.state.selectedItem !== null && this.state.selectedItem.stepName)
        var obj = {
            PersonalInfo : PersonalInfo,
            AcademicInfo : AcademicInfo,
            WorkExperience : WorkExperience,
            AspirationDetails : AspirationDetails,
            GraduateTestResult : GraduateTestResult,
            TestAndSurvey : TestAndSurvey
        }
        var selectedComponent = this.state.selectedItem !== null && componentList.[this.state.selectedItem.stepName]
        var Page = obj[selectedComponent];
        console.log("state...........",this.state)
        console.log("props..................",this.props)
        return (
         <Grid container>
            <Grid item md={12}>
               <ThemedTabs
             value={this.state.tabCount}
             textColor={"inherit"}
             onChange={(e, value) => this.setState({tabCount : value})}
             aria-label="ant example"
           >
            
               {this.state.productDetails !== null && this.state.productDetails.map((item,index)=>{
                   return (
                    <ThemedTab label={item.stepName} />
                   )    
               })}
         
           </ThemedTabs>
               </Grid>
               <Grid item md={12}>
               <ThemedTabs
             value={this.state.selectedItem}
             variant="scrollable"
             textColor={"inherit"}
             onChange={(e, value) => this.setState({ selectedItem : value })}
             aria-label="ant example"
           >
               {this.state.productDetails !== null && this.state.productDetails.filter((it,ix)=> ix === this.state.tabCount).map((item,index)=>{
                   return item.steps.map((stepItem,stepIndex)=>{
                       return (
                        <ThemedTab value={stepItem} label={stepItem.stepName} />
                       )
                   })
               })}
               <ThemedTab value={{stepItem : "Others"}} label={"Others"} />
               </ThemedTabs>
               </Grid>
               <Grid item md={12}>
                   {Page !== undefined && this.state.tabCount === 0 && <Page {...this.props} />  }             
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
    getvarientByidData : state.ProductReducer.getvarientByid,
    adminLinkedProductDetails : state.AdminReducer.adminLinkedProductDetails
})

const useStyles = () =>({

})

export default connect(mapStateToProps,{ getvarientByid, getAdminLinkedProduct })(withStyles(useStyles)(StageBasedLayout))