import { TableBody, TableCell, TableContainer, TableHead, TableRow,Button, Typography, Dialog,TextField,DialogActions,DialogContent, DialogTitle, IconButton } from '@material-ui/core'
import React, { Component } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import {getAllProductFamily,postproductfamily} from '../../Actions/ProductAction';
import {connect} from 'react-redux'
import CloseIcon from '@material-ui/icons/Close';
import {isEmptyString} from '../../Component/Validation'
class Product extends Component {
  constructor(){
    super()
    this.state={
      show:false,
      id:"",
      productName:"",
      shortName:"",
      codeName:"",
      productNameErr:"",
      shortNameErr:"",
      codeNameErr:""
    }
  }
  componentDidMount(){
     this.props.getAllProductFamily()
  }
  // componentDidUpdate(prevProps,prevState){
  //  if(prevProps.getAllProductFamilyList !== this.props.getAllProductFamilyList ){
  //    this.props.getAllProductFamily()
  //  }
  // }

handleClick=()=>{
  this.setState({
    show:true
  })
  
}

handleSaved=()=>{
  console.log(this.state)
  let helpertxt = "Please fill the required field"
  isEmptyString(this.state.productName) ? this.setState({codeNameErr:helpertxt}) : this.setState({codeNameErr:""}) 
  isEmptyString(this.state.shortName) ? this.setState({shortNameErr:helpertxt}) : this.setState({shortNameErr:""})
  isEmptyString(this.state.productName) ? this.setState({productNameErr:helpertxt}) : this.setState({productNameErr:""}) 
   if(
    this.state.codeName !== null &&
    this.state.shortName !== null &&
    this.state.productName !== null
   ){
    //  console.log("validate Success")
     let obj={
      "productName":this.state.productName,
      "codeName":this.state.codeName,
      "shortName":this.state.shortName
     }
     this.props.postproductfamily(obj)
   }
}

handleClose=()=>{
  this.setState({
    show:false
  })
}
  render() {
    return (
      <div>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
        <Typography style={{marginLeft:"20px"}}>Product Family</Typography>
        <Button style={{margin:"1%"}} onClick={this.handleClick} color="primary" size="small" startIcon={<AddIcon/>} variant="contained">Add</Button>
        </div>
        <TableContainer>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>ProductName</TableCell>
              <TableCell>CodeName</TableCell>
              <TableCell>ShortName</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          { this.props.getAllProductFamily !== undefined ? this.props.getAllProductFamilyList.map(eg=>
             <TableRow>
             <TableCell>{eg.id}</TableCell>
              <TableCell>{eg.productName}</TableCell>
             <TableCell>{eg.codeName}</TableCell>
             <TableCell>{eg.shortName}</TableCell>
             <TableCell>
               <div style={{display:"flex",flexDirection:"row"}}>
               <Button color="primary" size="small" variant="contained" onClick={this.handleClick} startIcon={<EditIcon/>} style={{margin:"3%"}}>Edit</Button>
               <Button color="secondary" size="small" variant="contained" startIcon={<DeleteIcon/>} style={{margin:"3%"}}>Delete</Button>
               </div>
             </TableCell>
             </TableRow>
             ) : null }
          </TableBody>
        </TableContainer>
        <Dialog open={this.state.show}>
          <DialogTitle>
            <div style={{display:"flex",justifyContent:"center"}}>
              {/* {this.props.getAllProductFamilyList.map(eg=>eg.id) === null ?  */}
              <Typography>Add Product</Typography>
              {/*  : <Typography>Edit Product</Typography> } */}
              <IconButton onClick={this.handleClose} style={{position:"absolute", right:"53px"}}>
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
          <TextField
                  variant="outlined"
                  color="primary"
                  label="ProductName"
                  style={{marginTop:"2%"}}
                  fullWidth
                  value={this.state.productName}
                  error={this.state.productNameErr.length > 0}
                  helperText={this.state.productNameErr}
                  onChange={(e) => this.setState({ productName: e.target.value })}
                  multiline
                />
                <TextField
                  variant="outlined"
                  color="primary"
                  label="ShortName"
                  name="ShortName"
                  fullWidth
                  style={{marginTop:"2%"}}
                  value={this.state.shortName}
                  error={this.state.shortNameErr.length >0}
                  helperText={this.state.shortNameErr}
                  onChange={(e) => this.setState({ shortName: e.target.value })}
                  multiline
                />
                <TextField
                  variant="outlined"
                  color="primary"
                  label="CodeName"
                  name="CodeName"
                  style={{marginTop:"2%"}}
                  fullWidth
                  value={this.state.codeName}
                  error={this.state.codeNameErr.length > 0}
                  helperText={this.state.codeNameErr}
                  onChange={(e) => this.setState({ codeName: e.target.value })}
                  multiline
                />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSaved} size="small" variant="contained" color="primary">Add</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
const mapStateToprops=(state)=>{
  console.log(state);
  return{
    getAllProductFamilyList:state.ProductReducer.productFamilyList,
    postproductfamilyList:state.ProductReducer.postproductfamily
  }
}

export default connect(mapStateToprops,{getAllProductFamily,postproductfamily})(Product)
