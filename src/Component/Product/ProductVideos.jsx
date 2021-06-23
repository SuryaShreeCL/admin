import { Grid, TextField , Button, Table, TableContainer, TableRow, TableHead, TableBody, TableCell, Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    DialogActions,
    withStyles,} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { Component } from 'react'
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from '@material-ui/icons/Remove';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from "@material-ui/icons/Close";
import { isEmptyString } from "../Validation";
import { connect } from "react-redux";
import {getAllProductVideos,postProductVideos, updateProductVideos, getvarientByid} from "../../Actions/ProductAction"
import MySnackBar from "../MySnackBar";
import Divider from '@material-ui/core/Divider';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import PrimaryButton from '../../Utils/PrimaryButton';
import ReactPlayer from "react-player";

export class ProductVideos extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            show:false,
            video:"",
            videoAlt : "",
            videoAltErr : "",
            videoErr : "",
            videoOrder : "",
            videoOrderErr : "",
            id:"",
            productFamily : null,
            snackOpen: false,
            snackMessage: null,
            snackVariant: null,
            showVidUrl : ""
        }
    }

componentDidMount(){
        // this.props.getAllProductVideos()
    }

componentDidUpdate(prevProps,prevState){
        if(prevProps.postProductVideosList !== this.props.postProductVideosList || prevProps.updateProductVideosList !== this.props.updateProductVideosList){
            // this.props.getAllProductVideos()
            this.props.getvarientByid(this.props.match.params.id)
        }  
}

handleChange = (e, name) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };

handleClickOpen = (e) => {
    this.setState({ 
      show: true,
      id : "",
      video:"",
      videoAlt : "",
      videoOrder : "",
    });
 }
handleEdit = (data) => {
    console.log(data)
     this.setState({
        show : true,
        id : data.id,
        video: data.videoUrl,
        });
}
handleSave = (event) => {
    console.log(this.state)

    let hlpTxt = "Please Fill The Required Feild"
    isEmptyString(this.state.video) ? this.setState({ videoErr : hlpTxt }) : this.setState({ videoErr : "" })
    isEmptyString(this.state.videoAlt) ? this.setState({ videoAltErr : hlpTxt }) : this.setState({ videoAltErr : "" })
    isEmptyString(this.state.videoOrder) ? this.setState({ videoOrderErr : hlpTxt }) : this.setState({ videoOrderErr : "" })
    if(
        !isEmptyString(this.state.video) &&
        !isEmptyString(this.state.videoAlt) &&
        ! isEmptyString(this.state.videoOrder)
        ){
     let obj = {
       videoUrl: this.state.video,
       altText: this.state.videoAlt,
       orderOfImage: parseInt(this.state.videoOrder),
       products: {
         id: this.props.match.params.id,
       },
     };
  
     console.log(obj)
     this.props.postProductVideos(obj)
     this.setState({
        snackMessage : "Data Saved Successfully",
        snackVariant : "success",
        snackOpen : true,
        video : "",
        videoAlt : "",
        videoOrder : "",
      })
      
    }

}
handleUpdate = () => {
    console.log(this.state)

    let hlpTxt = "Please Fill The Required Feild"
    isEmptyString(this.state.video) ? this.setState({ videoErr : hlpTxt }) : this.setState({ videoErr : "" })
    isEmptyString(this.state.videoAlt) ? this.setState({ videoAltErr : hlpTxt }) : this.setState({ videoAltErr : "" })
    isEmptyString(this.state.videoOrder) ? this.setState({ videoOrderErr : hlpTxt }) : this.setState({ videoOrderErr : "" })
    if(
        !isEmptyString(this.state.video) &&
        !isEmptyString(this.state.videoAlt) &&
        ! isEmptyString(this.state.videoOrder)
     ){
     let obj = {
       id: this.state.id,
       videoUrl: this.state.video,
       altText: this.state.videoAlt,
       orderOfImage: parseInt(this.state.videoOrder),
       products: {
         id: this.props.match.params.id,
       },
     };
     console.log(obj)
     this.props.updateProductVideos(obj)
     this.setState({
        snackMessage : "Data Updated Successfully",
        snackVariant : "success",
        snackOpen : true,
        id : '',
        video : "",
        videoAlt : "",
        videoOrder : "",
      })
  
    }

}
    render() {

      const { classes } = this.props

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
          value={this.state.video || ""}
          onChange={(e)=>this.setState({video : e.target.value})}
          helperText={this.state.videoErr}
          error={this.state.videoErr.length > 0}
          rows={4}
          />
          </Grid>
          <Grid item md={12}>
          <TextField
          variant={"standard"}
          multiline
          fullWidth
          label={"ALT"}
          value={this.state.videoAlt || ""}
          onChange={(e)=>this.setState({videoAlt : e.target.value})}
          helperText={this.state.videoAltErr}
          error={this.state.videoAltErr.length > 0}
          rows={5}
          />
          </Grid>
          <Grid item md={2}>
          <TextField
          variant={"standard"}
          label={"Order"}
          type={"number"}
          value={this.state.videoOrder || ""}
          onChange={(e)=>this.setState({videoOrder : e.target.value})}
          helperText={this.state.videoOrderErr}
          error={this.state.videoOrderErr.length > 0}
          />
          </Grid>
          <Grid item md={8}></Grid>
          <Grid item md={12} align="center">
          <PrimaryButton
          onClick={this.state.id.length === 0 ? this.handleSave : this.handleUpdate} 
           color="primary" variant={"contained"} >
            {this.state.id.length === 0 ? "Add New Video" : "Save"}
            </PrimaryButton>
          </Grid>
          </Grid>
          </Grid>
          {/* <Divider orientation="vertical" flexItem /> */}
          <Grid item md={6}>
          <Grid container spacing={2}>
            {this.props.getvarientByidList.productVideos.map((eachVideo,index)=>{
              return (
                <Grid item md={4}>
                <div className={classes.cardContainer}>
                <ReactPlayer
                controls
                url={eachVideo.videoUrl}
                height="140px"
                width="100%"
              />
                  <div className={classes.bottomContainer}>
                  <IconButton size="small" 
                  onClick={()=>this.setState({
                    showVidUrl : eachVideo.videoUrl,
                    show : true
                  })}
                  >
                    <VisibilityRoundedIcon fontSize={"small"} />
                  </IconButton>
                  <IconButton size="small" onClick={()=>this.setState({
                    id : eachVideo.id,
                    video : eachVideo.videoUrl,
                    videoAlt : eachVideo.altText,
                    videoOrder : eachVideo.orderOfImage
                  })}>
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
          <Dialog open={this.state.show} maxWidth={"lg"} onClose={()=>this.setState({show : false})}> 
          <ReactPlayer
                controls
                url={this.state.showVidUrl}
                height="90vh"
                width="100%"
              />
              </Dialog>
            <MySnackBar
            snackMsg={this.state.snackMessage}
            snackVariant={this.state.snackVariant}
            snackOpen={this.state.snackOpen}
            onClose={() => this.setState({ snackOpen: false })}
          />
        </Grid>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
      allProductVideosList : state.ProductReducer.allProductVideos, 
      postProductVideosList : state.ProductReducer.postProductVideos,
      updateProductVideosList : state.ProductReducer.updateProductVideos,
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

  export default connect(mapStateToProps,{getAllProductVideos,postProductVideos,updateProductVideos, getvarientByid})(withStyles(useStyles)(ProductVideos))