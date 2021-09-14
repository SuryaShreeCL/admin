import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import StarterPackTable from './StarterPackTable';
const AntTabs = withStyles({
    root: {
      borderBottom: '2px solid #A2D3FC',
    },
    indicator: {
      backgroundColor: '#1890ff',
      height : "5px",
      borderRadius : "6px 6px 0px 0px"
    },
    
  })(Tabs);
  
  const AntTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        color: '#40a9ff',
        opacity: 1,
      },
      '&$selected': {
        color: '#000',
        fontWeight: theme.typography.fontWeightBold,
      },
      '&:focus': {
        color: '#000',
      },
    },
    selected: {
       
    },
  }))((props) => <Tab disableRipple {...props} />);


 class ProductBasedRoot extends Component {
     constructor(props){
         super(props);
         this.state = {
             tabCount : 0
         }
     }


     renderContent = (value) =>{
        try {
            if(value === 0){
                return 
            }else if(value === 1){
              return 
            }else if(value === 2){
                return <StarterPackTable {...this.props} />
            }
        } catch (error) {
            console.log(error)
        }
     }

    render() {
        return (
            <Grid container spacing={2}>
               
                <Grid item md={12}>
                <AntTabs value={this.state.tabCount} textColor={"inherit"} onChange={(e,value)=>this.setState({tabCount : value})} aria-label="ant example">
                <AntTab label="Onboarding"  />
                <AntTab label="PGA / PM"  />
                <AntTab label="Starter Packs"  />
                <AntTab label="Advanced Courses"  />
                <AntTab label="Placements / Internships"  />
                </AntTabs>
                </Grid>
                <Grid item md={12}>
                {this.renderContent(this.state.tabCount)}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = () =>{
    return {

    }
}


export default connect(mapStateToProps, {})(ProductBasedRoot)