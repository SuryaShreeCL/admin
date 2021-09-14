import { TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Grid, Dialog, DialogTitle, DialogContent, TextField, Typography, IconButton, Icon, DialogActions, withStyles} from '@material-ui/core';
import React, { Component } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import {connect} from 'react-redux'
import {getAllProductImages,postvarientimage,updatevarientimage, getvarientByid} from '../../Actions/ProductAction'
import { isEmptyString } from '../Validation';
import MySnackBar from "../MySnackBar";
import Divider from '@material-ui/core/Divider';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import PrimaryButton from '../../Utils/PrimaryButton';
class ProductImages extends Component {
    constructor(){
        super();
        this.state={
            id:"",
            imgUrl:"",
            imgUrlErr:"",
            altTxt : "",
            altTxtErr : "",
            order : "",
            orderErr : "",
            show:false,
            snackMsg: "",
            snackVariant: "",
            showImgUrl : "",
            showAltTxt : "",
            snackOpen: false,
            dialogOpen : false,
        }
    }
    handleClick=(data)=>{
        this.setState({
            id:data.id,
            imgUrl:data.imagesUrl,
            altTxt : data.altText,
            order : data.orderOfImage
        })
    }
   componentDidMount(){
      //  this.props.getAllProductImages()
   }
   newhandelsaved=()=>{
       let helpertxt = "Please fill the Required Field"
       isEmptyString(this.state.imgUrl) ? this.setState({ imgUrlErr : helpertxt }) : this.setState({ imgUrlErr : ""})
       isEmptyString(this.state.altTxt) ? this.setState({ altTxtErr : helpertxt }) : this.setState({ altTxtErr : ""})
       isEmptyString(this.state.order) ? this.setState({ orderErr : helpertxt }) : this.setState({ orderErr : ""})
       if( 
         !isEmptyString(this.state.imgUrl) &&
         !isEmptyString(this.state.altTxt) &&
         !isEmptyString(this.state.order)
         ){
        console.log('Validate SuccessFully')
          let obj = {
            imagesUrl: this.state.imgUrl,
            altText: this.state.altTxt,
            orderOfImage: parseInt(this.state.order),
            products: {
              id: this.props.match.params.id,
            },
          };
        this.props.postvarientimage(obj)
        this.setState({
            snackMsg:"Added Successfully",
            snackOpen:true,
            snackVariant:"success",
            imgUrl : "",
            altTxt : "",
            order : ""
          })
       }
   }
  componentDidUpdate(prevProps,prevState){
    if(this.props.postvarientimageList !== prevProps.postvarientimageList || this.props.updatevarientimageList !== prevProps.updatevarientimageList){
        // this.props.getAllProductImages()
        this.props.getvarientByid(this.props.match.params.id)
    }
  }

   updatehandle=()=>{
    let helpertxt = "Please fill the Required Field"
    isEmptyString (this.state.imgUrl) ? this.setState({ imgUrlErr : helpertxt }) : this.setState({ imgUrlErr : ""})
    isEmptyString(this.state.altTxt) ? this.setState({ altTxtErr : helpertxt }) : this.setState({ altTxtErr : ""})
       isEmptyString(this.state.order) ? this.setState({ orderErr : helpertxt }) : this.setState({ orderErr : ""})
    if( 
      !isEmptyString(this.state.imgUrl) &&
      !isEmptyString(this.state.altTxt) &&
      !isEmptyString(this.state.order)
       ){
     console.log('Validate SuccessFully')
       let obj = {
         id: this.state.id,
         products: {
           id: this.props.match.params.id,
         },
         imagesUrl: this.state.imgUrl,
         altText: this.state.altTxt,
         orderOfImage: this.state.order,
       };
    
     this.props.updatevarientimage(obj)
     this.setState({
         snackMsg:"Updated Successfully",
         snackOpen:true,
         snackVariant:"success",
         id : "",
         imgUrl : "",
         altTxt : "",
         order : "",
       })
    }
    else{
        this.setState({
            imgUrlErr:""
        })
    }
   }

    render() {
      const { classes } = this.props
      console.log(this.props.getvarientByidList)
      console.log(this.state)
        return (
         
          <Grid container spacing={2}>
            <Grid item md={6}>
            <Grid container spacing={2}>
            <Grid item md={12}>
            <TextField
            variant={"standard"}
            multiline
            fullWidth
            label={"URL"}
            value={this.state.imgUrl || ""}
            onChange={(e)=>this.setState({imgUrl : e.target.value})}
            helperText={this.state.imgUrlErr}
            error={this.state.imgUrlErr.length > 0}
            rows={4}
            />
            </Grid>
            <Grid item md={12}>
            <TextField
            variant={"standard"}
            multiline
            fullWidth
            label={"ALT"}
            value={this.state.altTxt || ""}
            onChange={(e)=>this.setState({altTxt : e.target.value})}
            helperText={this.state.altTxtErr}
            error={this.state.altTxtErr.length > 0}
            rows={5}
            />
            </Grid>
            <Grid item md={2}>
            <TextField
            variant={"standard"}
            label={"Order"}
            type={"number"}
            value={this.state.order || ""}
            onChange={(e)=>this.setState({order : e.target.value})}
            helperText={this.state.orderErr}
            error={this.state.orderErr.length > 0}
            />
            </Grid>
            <Grid item md={8}></Grid>
            <Grid item md={12} align="center">
            <PrimaryButton onClick={this.state.id.length === 0 ? this.newhandelsaved : this.updatehandle} color="primary" variant={"contained"} >
              {this.state.id.length === 0 ?  "Add New Image" : "Save"}
              </PrimaryButton>
            </Grid>
            </Grid>
            </Grid>
            {/* <Divider orientation="vertical" flexItem /> */}
            <Grid item md={6}>
            <Grid container spacing={2}>
              {this.props.getvarientByidList.productImages.map((eachImage, index)=>{
                return (
                  <Grid item md={4}>
                  <div className={classes.cardContainer}>
                    <img alt={eachImage.altText} className={classes.preview} src={eachImage.imagesUrl}></img>
                    <div className={classes.bottomContainer}>
                    <IconButton onClick={()=>this.setState({
                      showImgUrl : eachImage.imagesUrl,
                      showAltTxt : eachImage.altText,
                      dialogOpen : true,
                      
                    })} size="small">
                      <VisibilityRoundedIcon fontSize={"small"} />
                    </IconButton>
                    <IconButton onClick={()=>this.handleClick(eachImage)} size="small">
                      <EditRoundedIcon fontSize={"small"} />
                    </IconButton>
                    <IconButton size="small">
                      <DeleteRoundedIcon fontSize={"small"} />
                    </IconButton>
                    </div>
                  </div>
                </Grid>
                )
              })}
             
            </Grid>
            </Grid>
              <Dialog open={this.state.dialogOpen} maxWidth={"lg"} onClose={()=>this.setState({dialogOpen : false})}> 
                <img src={this.state.showImgUrl}></img>
              </Dialog>
              <MySnackBar
              snackMsg={this.state.snackMsg}
              snackVariant={this.state.snackVariant}
              snackOpen={this.state.snackOpen}
              onClose={() => this.setState({ snackOpen: false })}
            />
          </Grid>
         
        );
    }
}



const mapStateToProps=(state)=>{
    return {
        getAllProductImagesList : state.ProductReducer.allProductImages,
        postvarientimageList : state.ProductReducer.postvarientimage,
        updatevarientimageList : state.ProductReducer.updatevarientimage,
        getvarientByidList : state.ProductReducer.getvarientByid,
    }
  }

  const useStyles = () =>({
    cardContainer : {
      display : "flex",
      flexDirection : "column",

    },
    bottomContainer : {
      display : "flex",
      justifyContent : "space-between",
      backgroundColor : "#fff",
      paddingTop : "5px"
    },
    preview : {
      maxHeight : "21vh"
    }
  })
    


  export default connect(mapStateToProps,{getAllProductImages,postvarientimage,updatevarientimage, getvarientByid})(withStyles(useStyles)(ProductImages))