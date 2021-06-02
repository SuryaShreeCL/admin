import { TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Grid, Dialog, DialogTitle, DialogContent, TextField, Typography, IconButton, Icon, DialogActions} from '@material-ui/core';
import React, { Component } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import {connect} from 'react-redux'
import {getAllProductImages,postvarientimage,updatevarientimage} from '../../Actions/ProductAction'
import { isEmptyString } from '../Validation';
import MySnackBar from "../MySnackBar";

class ProductImages extends Component {
    constructor(){
        super();
        this.state={
            id:"",
            images:"",
            imagesErr:"",
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
            images:data.imagesUrl
        })
    }
   componentDidMount(){
       this.props.getAllProductImages()
   }
   newhandelsaved=()=>{
       let helpertxt = "Please fill the Required Field"
       isEmptyString(this.state.images) ? this.setState({ imagesErr : helpertxt }) : this.setState({ imagesErr : ""})
       if( !isEmptyString(this.state.images) ){
        console.log('Validate SuccessFully')
          let obj=
          {
            "imagesUrl": this.state.images
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
    isEmptyString (this.state.images) ? this.setState({ imagesErr : helpertxt }) : this.setState({ imagesErr : ""})
    if( !isEmptyString(this.state.images) ){
     console.log('Validate SuccessFully')
       let obj=
       {
           "id" : this.state.id,
         "imagesUrl": this.state.images
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
            imagesErr:""
        })
    }
   }
    render() {
        return (
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "1%",
              }}
            >
              <h5>Product Images</h5>
              <Button
                size="small"
                variant="contained"
                startIcon={<AddIcon />}
                color="primary"
                onClick={this.handleClick}
              >
                Add
              </Button>
            </div>
            <TableContainer>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Images</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {this.props.getAllProductImagesList.map((eg)=>
                     <TableRow>
                     <TableCell>{eg.id}</TableCell>
                 <TableCell>{eg.imagesUrl}</TableCell>
                 <TableCell>
                     <div style={{display:"flex",flexDirection:"row"}}>
                     <Button
                     style={{margin:"1%"}}
                     size="small"
                     variant="contained"
                     color="primary"
                     startIcon={<EditIcon />}
                     onClick={()=>this.handleClick(eg)}
                   >
                     Edit
                   </Button>
                   <Button
                     style={{margin:"1%"}}
                     size="small"
                     variant="contained"
                     color="secondary"
                     startIcon={<DeleteIcon />}
                   >
                     Delete
                   </Button>
                     </div>
                 </TableCell>
                     </TableRow>
                )}
                </TableBody>

             
            </TableContainer>
            <Dialog
              open={this.state.show}
              onClose={() => this.setState({ show: false })}
            >
              <DialogTitle>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                {isEmptyString(this.state.id) ? <Typography>Add Images</Typography> : <Typography>Edit Images</Typography> }
                  <IconButton onClick={() => this.setState({ show: false })}>
                    <Icon>
                      <CloseIcon />
                    </Icon>
                  </IconButton>
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
                      label="Images"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      name="images"
                      error={this.state.imagesErr.length > 0 }
                      helperText={this.state.imagesErr}
                      style={{margin:"1%"}}
                      value={this.state.images}
                      onChange={(e, newValue) =>
                        this.setState({ images: e.target.value })
                      }
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                  { isEmptyString(this.state.id) ? 
                    <Button size="small" variant="contained" color="primary" startIcon={<AddIcon/>} onClick={this.newhandelsaved}>Add</Button> :
                    <Button size="small" variant="contained" color="primary" startIcon={<AddIcon/>} onClick={this.updatehandle}>Update</Button>
                }
              </DialogActions>
            </Dialog>
            <MySnackBar
              snackMsg={this.state.snackMsg}
              snackVariant={this.state.snackVariant}
              snackOpen={this.state.snackOpen}
              onClose={() => this.setState({ snackOpen: false })}
            />
          </div>
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
  export default connect(mapStateToProps,{getAllProductImages,postvarientimage,updatevarientimage})(ProductImages)