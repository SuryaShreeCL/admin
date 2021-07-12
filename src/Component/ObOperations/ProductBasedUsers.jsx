import { Grid, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Onboarding from '../ObOnboarding/Onboarding';
import { ThemedTab, ThemedTabs } from '../Utils/ThemedComponents';

class ProductBasedUsers extends Component {
    constructor(props){
        super(props);
        this.state = {
            tabCount : 0
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
             <ThemedTab label="Onboarding" />
             <ThemedTab label="Profile Gap Analysis" />
             <ThemedTab label="Strategy Session" />
             <ThemedTab label="Application Stage" />
             <ThemedTab label="Post Admit Services" />
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

export default connect(mapStateToProps,{})(withStyles(useStyles)(ProductBasedUsers))