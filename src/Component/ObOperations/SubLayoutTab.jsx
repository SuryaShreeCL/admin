import { Grid, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThemedTab, ThemedTabs } from '../Utils/ThemedComponents';
import PersonalInfo from "../ObOnboarding/personalInfo"
import AcademicInfo from "../ObOnboarding/academicInfo"


class SubLayoutTab extends Component {
    constructor(props){
        super(props);
        this.state = {
            tabCount : 0
        }
    }

    renderContent = (count) =>{
        try {
            if(count === 0){
                return <PersonalInfo {...this.props} />
            }else if (count === 1){
                return <AcademicInfo {...this.props} />
            }
        } catch (error) {
            
        }
    }

    render() {
        return (
           <Grid container>
                <Grid item md={12}>
               <ThemedTabs
             value={this.state.tabCount}
             textColor={"inherit"}
             onChange={(e, value) => this.setState({ tabCount: value })}
             aria-label="ant example"
           >
             <ThemedTab label="Personal Info" />
             <ThemedTab label="Academic Info" />
             <ThemedTab label="Work Experience" />
             <ThemedTab label="Aspiration Details" />
             <ThemedTab label="Graduate Admission Test" />
             <ThemedTab label="Test and Surveys" />
             <ThemedTab label="Others" />
           </ThemedTabs>
               </Grid>
               <Grid item md={12}>
                {this.renderContent(this.state.tabCount)}
               </Grid>
           </Grid>
        );
    }
}

const mapStateToProps = (state) =>({
    
})

const useStyles = () =>({

})


export default connect(mapStateToProps, {})(withStyles(useStyles)(SubLayoutTab))