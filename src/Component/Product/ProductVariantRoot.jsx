import { Breadcrumbs, Grid, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Product from './Product';
import ProductVariant from "./ProductVarient"
import VariantGeneralData from './VariantGeneralData';
import VariantDescription from './VariantDescription';
import VariantImgVidLanding from './VariantImgVidLanding';
import VariantTnc from './VariantTnc';
import VarriantQna from './VarriantQna';
import PrimaryButton from '../../Utils/PrimaryButton';
import {publishvarient} from '../../Actions/ProductAction'
import { productVariantPath } from '../RoutePaths';
import Link from '@material-ui/core/Link';
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


 class ProductVariantRoot extends Component {
   constructor(props) {
     super(props);
     this.state = {
      tabCount : 0,
     };
   }
    handlepublish=()=>{
      console.log("Hello")
      let obj={
        id:this.props.match.params.id,
        wkStatus:"Live"
      }
      this.props.publishvarient(obj)
    }
   renderContent = (value) => {
     try {
       if (value === 0) {
         return (
           <VariantGeneralData {...this.props} />
         );
       } else if (value === 1) {
         return (
           <VariantDescription  {...this.props} />
         );
       }else if (value === 2) {
        return (
          <VariantImgVidLanding  {...this.props} />
        );
      }else if (value === 3) {
        return (
          <VariantTnc  {...this.props} />
        );
      }else if (value === 4) {
        return (
          <VarriantQna  {...this.props} />
        );
      }
     } catch (error) {
       console.log(error);
     }
   };


  


   render() {
    console.log(this.props.match.params.id)
     return (
       <Grid container spacing={2}>
           <Grid item md={12}>
             <Breadcrumbs separator="›">
              <Link color="primary" onClick={() => this.props.history.goBack()}>
              Product Varient
            </Link>
            <Typography color="textPrimary">General Data</Typography>
             </Breadcrumbs>
           </Grid>
         <Grid item md={12}>
           <AntTabs
             value={this.state.tabCount}
             textColor={"inherit"}
             onChange={(e, value) => this.setState({ tabCount: value })}
             aria-label="ant example"
           >
             <AntTab label="General Data" />
             <AntTab disabled={this.props.match.params.id === undefined} label="Product Description" />
             <AntTab disabled={this.props.match.params.id === undefined} label="Product Images/Videos" />
             <AntTab disabled={this.props.match.params.id === undefined} label="Product TnC" />
             <AntTab disabled={this.props.match.params.id === undefined} label="Product QnA" />
           </AntTabs>
         </Grid>
         <Grid item md={12}>
           {this.renderContent(this.state.tabCount)}
         </Grid>
         <Grid item md={12} align="center">
            <PrimaryButton
            onClick={()=>this.handlepublish()}
            color={"primary"}
            disabled={this.props.match.params.id === undefined}
            variant={"contained"}
            >Publish Variant</PrimaryButton>
         </Grid>
       </Grid>
     );
   }
 }

const mapStateToProps = (state) =>{
    return {
      publishvarientList : state.ProductReducer.publishvarient
    }
}


export default connect(mapStateToProps, {publishvarient})(ProductVariantRoot)