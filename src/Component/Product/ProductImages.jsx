import { TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Grid, Dialog, DialogTitle, DialogContent, TextField, Typography, IconButton, Icon, DialogActions, withStyles} from '@material-ui/core';
import React, { Component } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import {connect} from 'react-redux'
import {getAllProductImages,postvarientimage,updatevarientimage} from '../../Actions/ProductAction'
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
            snackOpen: false,
        }
    }
    handleClick=(data)=>{
        this.setState({
            show:true,
            id:data.id,
            imgUrl:data.imagesUrl
        })
    }
   componentDidMount(){
       this.props.getAllProductImages()
   }
   newhandelsaved=()=>{
       let helpertxt = "Please fill the Required Field"
       isEmptyString(this.state.imgUrl) ? this.setState({ imgUrlErr : helpertxt }) : this.setState({ imgUrlErr : ""})
       if( !isEmptyString(this.state.imgUrl) ){
        console.log('Validate SuccessFully')
          let obj=
          {
            "imagesUrl": this.state.imgUrl
          }
        this.props.postvarientimage(obj)
        this.setState({
            snackMsg:"Added Successfully",
            snackOpen:true,
            snackVariant:"success",
          })
       }
   }
  componentDidUpdate(prevProps,prevState){
    if(this.props.postvarientimageList !== prevProps.postvarientimageList || this.props.updatevarientimageList !== prevProps.updatevarientimageList){
        this.props.getAllProductImages()
    }
  }

   updatehandle=()=>{
    let helpertxt = "Please fill the Required Field"
    isEmptyString (this.state.imgUrl) ? this.setState({ imgUrlErr : helpertxt }) : this.setState({ imgUrlErr : ""})
    if( !isEmptyString(this.state.imgUrl) ){
     console.log('Validate SuccessFully')
       let obj=
       {
           "id" : this.state.id,
         "imagesUrl": this.state.imgUrl
       }
     this.props.updatevarientimage(obj)
     this.setState({
         snackMsg:"Updated Successfully",
         snackOpen:true,
         snackVariant:"success"
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
      console.log(classes)
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
            value={this.state.imgUrl}
            onChange={(e)=>this.setState({imgUrl : e.target.valu})}
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
            value={this.state.altTxt}
            onChange={(e)=>this.setState({altTxt : e.target.valu})}
            helperText={this.state.altTxtErr}
            error={this.state.altTxtErr.length > 0}
            rows={5}
            />
            </Grid>
            <Grid item md={2}>
            <TextField
            variant={"standard"}
            label={"Order"}
            value={this.state.order}
            onChange={(e)=>this.setState({order : e.target.valu})}
            helperText={this.state.orderErr}
            error={this.state.orderErr.length > 0}
            />
            </Grid>
            <Grid item md={8}></Grid>
            <Grid item md={12} align="center">
            <PrimaryButton color="primary" variant={"contained"} >
              Add New Image
              </PrimaryButton>
            </Grid>
            </Grid>
            </Grid>
            {/* <Divider orientation="vertical" flexItem /> */}
            <Grid item md={6}>
            <Grid container spacing={2}>
              <Grid item md={4}>
                <div className={classes.cardContainer}>
                  <img className={classes.preview} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Shaqi_jrvej.jpg/1200px-Shaqi_jrvej.jpg"}></img>
                  <div className={classes.bottomContainer}>
                  <IconButton size="small">
                    <VisibilityRoundedIcon fontSize={"small"} />
                  </IconButton>
                  <IconButton size="small">
                    <EditRoundedIcon fontSize={"small"} />
                  </IconButton>
                  <IconButton size="small">
                    <DeleteRoundedIcon fontSize={"small"} />
                  </IconButton>
                  </div>
                </div>
              </Grid>
            </Grid>
            </Grid>
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
        updatevarientimageList : state.ProductReducer.updatevarientimage
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
    


  export default connect(mapStateToProps,{getAllProductImages,postvarientimage,updatevarientimage})(withStyles(useStyles)(ProductImages))