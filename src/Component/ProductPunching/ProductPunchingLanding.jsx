import { Card, Grid } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ProductPunching from './ProductPunching';
import UserData from './UserData';
import "./ProductPunching.css"

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


 class ProductPunchingLanding extends Component {
   constructor(props) {
     super(props);
     this.state = {
      tabCount : 0
     };
   }

   renderContent = (value) => {
     try {
       if (value === 0) {
         return (
           <UserData {...this.props} />
         );
       } else if (value === 1) {
         return (
           <ProductPunching  {...this.props} />
         );
       }
     } catch (error) {
       console.log(error);
     }
   };


  


   render() {
    
     return (
       
       <Grid container spacing={2} >
       <Card style={{padding : "0px 30px",height: "70%", width: "100%"}}>
         <Grid item md={12}>
           <AntTabs
             value={this.state.tabCount}
             textColor={"inherit"}
             onChange={(e, value) => this.setState({ tabCount: value })}
             aria-label="ant example"
           >
             <AntTab className="landing_heading"
             label="User Data" />
             <AntTab className="landing_heading"
             label="Product Punching" />
             
           </AntTabs>
         </Grid>
         <Grid item md={12}>
           {this.renderContent(this.state.tabCount)}
         </Grid>
         </Card>
       </Grid>
       
     );
   }
 }

const mapStateToProps = (state) =>{
    return {
    }
}


export default connect(mapStateToProps, {})(ProductPunchingLanding)

// import React, { Component } from 'react'

// export default class ProductPunchingLanding extends Component {
//     render() {
//         return (
//             <div>
                
//             </div>
//         )
//     }
// }
