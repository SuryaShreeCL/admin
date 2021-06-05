import { Grid, TextField , Button, Table, TableContainer, TableRow, TableHead, TableBody, TableCell, Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    DialogActions,} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { Component } from 'react'
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from '@material-ui/icons/Remove';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from "@material-ui/icons/Close";
import { isEmptyString } from "../Validation";
import { connect } from "react-redux";
import {getAllProductVideos,postProductVideos, updateProductVideos} from "../../Actions/ProductAction"
import Alert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";


export class ProductVideos extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            show:false,
            videos:"",
            videosErr: "",
            id:"",
            productFamily : null,
            snackOpen: false,
            snackMessage: null,
            snackVariant: null,
        }
    }

componentDidMount(){
        this.props.getAllProductVideos()
    }

componentDidUpdate(prevProps,prevState){
        if(prevProps.postProductVideosList !== this.props.postProductVideosList || prevProps.updateProductVideosList !== this.props.updateProductVideosList){
            this.props.getAllProductVideos()
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
      videos:[],
    });
 }
handleEdit = (data) => {
    console.log(data)
     this.setState({
        show : true,
        id : data.id,
        videos: data.videoUrl,
        });
}
handleSave = (event) => {
    console.log(this.state)

    let hlpTxt = "Please Fill The Required Feild"
    isEmptyString(this.state.videos) ? this.setState({ videosErr : hlpTxt }) : this.setState({ videosErr : "" })
    if(
        !isEmptyString(this.state.videos) 
        ){
     let obj = {
        "videoUrl": this.state.videos
     }
     console.log(obj)
     this.props.postProductVideos(obj)
     this.setState({
        snackMessage : "Data Saved Successfully",
        snackVariant : "success",
        snackOpen : true
      })
      this.setState({
          show: false
      })
    }

}
handleUpdate = () => {
    console.log(this.state)

    let hlpTxt = "Please Fill The Required Feild"
    isEmptyString(this.state.videos) ? this.setState({ videosErr : hlpTxt }) : this.setState({ videosErr : "" })
    if(
        !isEmptyString(this.state.videos) 
     ){
     let obj = {
        "id":this.state.id,
        "videoUrl": this.state.videos
     }
     console.log(obj)
     this.props.updateProductVideos(obj)
     this.setState({
        snackMessage : "Data Updated Successfully",
        snackVariant : "success",
        snackOpen : true
      })
      this.setState({
        show: false
    })
    }

}
    render() {
        return (
           <div>
             <div style={{display:'flex',flexDirection:"row", justifyContent:'space-between', margin:"2%" }}>
             <h5>Product Videos</h5>
                <Button 
                startIcon={<AddIcon/>} 
                variant="contained"
                color="primary" 
                size="medium"
                onClick={this.handleClickOpen}
                >
                  Add
                  </Button>
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                        <TableRow>

                    <TableCell style={{fontWeight:"bold"}}>ID</TableCell>
                    <TableCell style={{fontWeight:"bold"}}>Product Videos</TableCell>
                    <TableCell ali style={{fontWeight:"bold"}}>Action</TableCell>
                     </TableRow>
                     </TableHead>
                     <TableBody>
                     {this.props.allProductVideosList.map((eachVideo)=>{
                  return (
                    <TableRow>
                        <TableCell>
                        {eachVideo.id}
                      </TableCell>
                      <TableCell>
                        {eachVideo.videoUrl}
                      </TableCell>
                      <TableCell>
                      <div style={{display:'flex', flexDirection:"row"}}>
                      <Button size="small" variant="contained" color="primary" style={{margin:"5px"}} startIcon={<EditIcon/>} onClick={()=>this.handleEdit(eachVideo)}>Edit</Button>
                      <Button size="small" variant="contained" color="secondary" style={{margin:"5px"}} startIcon={<DeleteIcon/>}>Delete</Button>
                        </div>

                      </TableCell>
                      </TableRow>
                  )
                     })}
                    </TableBody>
                    </Table>   
                </TableContainer>  
                <Dialog 
              open={this.state.show}
              onClose={(e) => this.setState({ show: false })}
              aria-labelledby="customized-dialog-title"
              maxWidth="sm"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0
                    ? "Edit Product video"
                    : "Add Product Video"}
                    <IconButton
                    style={{position:"absolute", right:'10px', top :5}}
                    aria-label="close"
                    onClick={(e) => this.setState({ show: false })}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                  
                </div>
              </DialogTitle>
              <DialogContent>
              <Grid container>
              { !isEmptyString(this.state.id) ? 
                     <Grid item sm={12}>
                     <TextField
                       label="ID"
                       variant="outlined"
                       color="primary"
                       fullWidth
                       name="id"
                       disabled
                       value={this.state.id}
                       style={{margin:"1%"}}
                     />
                   </Grid> 
                   :
                   null
                }
                <Grid item sm={12}>
                <TextField
                variant="outlined"
                color="primary"
                label="Product Video"
                value={this.state.videos}
                onChange={this.handleChange}
                fullWidth
                name="videos"
                error={this.state.videosErr.length > 0}
                helperText={this.state.videosErr}
                style={{margin:"1%"}}
                /> 
                </Grid>
                </Grid> 
              </DialogContent>
              <DialogActions style={{alignSelf:"center"}}>
                <Button

                  variant="contained"
                  color="primary"
                  onClick={this.state.id.length === 0 ? this.handleSave : this.handleUpdate}
                  startIcon={<AddIcon/>}
                >
                  {this.state.id.length !== 0 ? "Update" : "Add"}
                </Button>
              </DialogActions>
              </Dialog>
              <Snackbar
          open={this.state.snackOpen}
          autoHideDuration={3000}
          onClose={() => this.setState({ snackOpen: false })}
        >
          <Alert
            variant="filled"
            onClose={() => this.setState({ snackOpen: false })}
            severity={this.state.snackVariant}
          >
            {this.state.snackMessage}
          </Alert>
        </Snackbar>

            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
      allProductVideosList : state.ProductReducer.allProductVideos, 
      postProductVideosList : state.ProductReducer.postProductVideos,
      updateProductVideosList : state.ProductReducer.updateProductVideos,
    }
  }
  export default connect(mapStateToProps,{getAllProductVideos,postProductVideos,updateProductVideos})(ProductVideos)