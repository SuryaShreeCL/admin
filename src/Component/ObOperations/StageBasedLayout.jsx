import { Box, createMuiTheme, Grid, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAdminLinkedProduct } from "../../Actions/AdminAction";
import { getvarientByid } from "../../Actions/ProductAction";
import AdmissionServices from '../ObCallSummary/admissionServices';
import AspirationDetails from "../ObCallSummary/aspirationDetails";
import GraduateTestResult from "../ObCallSummary/graduateTestResult";
import TestAndSurvey from "../ObCallSummary/testEngineResult";
import WorkExperience from "../ObCallSummary/workExperience";
import AcademicInfo from "../ObOnboarding/academicInfo";
import PersonalInfo from "../ObOnboarding/personalInfo";
import { ThemedTab, ThemedTabs } from '../Utils/ThemedComponents';
import SubLayoutTab from './SubLayoutTab';
import { getVariantStepsById } from "../../Actions/ProductAction"


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
            selectedItem : sortedArr[0].steps[0]
        })
    }

}   



    render() {
        console.log(this.state)
        console.log(this.props.adminLinkedProductDetails)
        var componentList = {
            "Personal Information" : "PersonalInfo",
            "Academic Information" : "AcademicInfo",
            "Work Experience" : "WorkExperience",
            "Aspiration Details" : "AspirationDetails",
            "Graduate Admission Test" : "GraduateTestResult",
            "Tests and Survey" : "TestAndSurvey",
            "Others" : "AdmissionServices"
        }
        console.log(this.state.selectedItem !== null && this.state.selectedItem.stepName)
        var obj = {
            PersonalInfo : PersonalInfo,
            AcademicInfo : AcademicInfo,
            WorkExperience : WorkExperience,
            AspirationDetails : AspirationDetails,
            GraduateTestResult : GraduateTestResult,
            TestAndSurvey : TestAndSurvey,
            Others : AdmissionServices
        }
        var selectedComponent = this.state.selectedItem !== null && componentList.[this.state.selectedItem.stepName]
        var Page = obj[selectedComponent];
        console.log("state...........",this.state)
        console.log("props..................",this.props)
        return (
        //  <ThemeProvider theme={theme}>
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
               })
               
               }
               <ThemedTab 
               textColor="primary"
               value={"Others"}
               label={"Others"}/>
               </ThemedTabs>
               </Grid>
               <Grid item md={12}>
                   {Page !== undefined && this.state.tabCount === 0 && this.state.selectedItem !== "Others" && <Page {...this.props} />  }  
                   {this.state.selectedItem === "Others" && <AdmissionServices {...this.props}/>}           
               </Grid>
         </Grid>
        //  </ThemeProvider>
        );
    }
}



const mapStateToProps = (state) =>({
    getvarientByidData : state.ProductReducer.getvarientByid,
    adminLinkedProductDetails : state.AdminReducer.adminLinkedProductDetails,
    variantStepList : state.ProductReducer.variantStepList

})

const useStyles = () =>({

})

export default connect(mapStateToProps,{ getvarientByid, getAdminLinkedProduct, getVariantStepsById })(withStyles(useStyles)(StageBasedLayout))