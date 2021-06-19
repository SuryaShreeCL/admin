import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
} from "@material-ui/core";
import React, { Component } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import {
  getAllProductFamily,
  postproductfamily,
  updateproductfamily,
  updatefamily
} from "../../Actions/ProductAction";
import { connect } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { isEmptyString } from "../../Component/Validation";
import MySnackBar from "../MySnackBar";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { ArrowUpward } from "@material-ui/icons";
import DataGridTable from "../Utils/DataGridTable";
class Product extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      id: "",
      idErr:"",
      productName: "",
      shortName: "",
      codeName: "",
      productNameErr: "",
      shortNameErr: "",
      codeNameErr: "",
      snackMsg: "",
      snackVariant: "",
      snackOpen: false,
      createdby : "",
      createdbyErr:"",
      createdon : null ,
      craetedonErr : "",
      updatedby : "",
      updatdebyErr : "",
      updatedon : null,
      updatedonErr : "",
      tableColumns : [
        {field : "id", hide : true},
        {field : "productName", headerName : "Product Name", width : 300},
        {field : "shortName", headerName : "Short Name", width : 150},
        {field : "codeName", headerName : "Code Name", width : 150}
      ]
    };
  }
  componentDidMount() {
    this.props.getAllProductFamily();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.postproductfamilyList !== this.props.postproductfamilyList || prevProps.updateproductfamilyList !== this.props.updateproductfamilyList) {
      this.props.getAllProductFamily();
    }
  }
  

  handleClick = (data) => {
console.log(data)
    this.setState({
      show: true,
      id:data.id,
      codeName:data.codeName,
      shortName:data.shortName,
      productName:data.productName
    });
  };
handleSort = () => {
      let sortdata = this.props.getAllProductFamilyList.map(eg =>eg.shortName)
     console.log(sortdata.sort()) 
}
// handleDescSort = () => {
//   let productdata = this.props.getAllProductFamilyList.map(eg =>eg.productName)
//   let shortNamedata = this.props.getAllProductFamilyList.map(eg =>eg.shortName)
//   let codedata = this.props.getAllProductFamilyList.map(eg =>eg.codeName)
//      console.log(productdata.sort()) 
// }
// handleAsecSort = () =>{
//   let sortdata = this.props.getAllProductFamilyList.map(eg =>eg.shortName)
//   console.log(sortdata.sort()) 
// }
  newhandleSaved = () => {
    console.log(this.state);
    let helpertxt = "Please fill the required field";
    isEmptyString(this.state.codeName)
      ? this.setState({ codeNameErr: helpertxt })
      : this.setState({ codeNameErr: "" });
    isEmptyString(this.state.shortName)
      ? this.setState({ shortNameErr: helpertxt })
      : this.setState({ shortNameErr: "" });
    isEmptyString(this.state.productName)
      ? this.setState({ productNameErr: helpertxt })
      : this.setState({ productNameErr: "" });
    if (
      !isEmptyString(this.state.productName) &&
      !isEmptyString(this.state.shortName) &&
      !isEmptyString(this.state.codeName)
    ) {
      //  console.log("validate Success")
      let obj = {
        productName: this.state.productName,
        codeName: this.state.codeName,
        shortName: this.state.shortName,
        createdBy:this.state.createdby,
        updatedBy:this.state.updatedby,
        dateOfCreation:this.state.createdon,
        dateOfUpdate:this.state.updatedon
      };
      this.props.postproductfamily(obj);
      this.setState({
        snackMsg:"Added Successfully",
        snackOpen:true,
        snackVariant:"success"
      })
    }
  };
  updatehandleSaved = () => {
    let helpertxt = "Please fill the required field";
    isEmptyString(this.state.codeName)
      ? this.setState({ codeNameErr: helpertxt })
      : this.setState({ codeNameErr: "" });
    isEmptyString(this.state.shortName)
      ? this.setState({ shortNameErr: helpertxt })
      : this.setState({ shortNameErr: "" });
    isEmptyString(this.state.productName)
      ? this.setState({ productNameErr: helpertxt })
      : this.setState({ productNameErr: "" });
      // isEmptyString(this.state.id)
      // ? this.setState({ idErr: helpertxt })
      // : this.setState({ idErr: "" });

    if (
      !isEmptyString(this.state.productName) &&
      !isEmptyString(this.state.shortName) &&
      !isEmptyString(this.state.codeName) &&
      !isEmptyString(this.state.id)
    ) {
      //  console.log("validate Success")
      let obj1 = {
        id: this.state.id,
        productName: this.state.productName,
        codeName: this.state.codeName,
        shortName: this.state.shortName,
      };
      let obj2={
        codeName:this.state.codeName,
        productName:this.state.productName,
        updatedBy:this.state.updatedby,
        dateOfUpdate:this.state.updatedon
    }
       this.props.updateproductfamily(obj1)
       this.props.updatefamily(obj2)
       this.setState({
        snackMsg:"Updated Successfully",
        snackOpen:true,
        snackVariant:"success"
      })
    }
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography style={{ marginLeft: "20px" }}></Typography>
          <Button
            style={{ margin: "1%" }}
            onClick={this.handleClick}
            color="primary"
            size="small"
            startIcon={<AddIcon />}
            variant="contained"
          >
            Add
          </Button>
        </div>

      {/*  */}
      <Grid container>
          <Grid item md={12} style={{height : "400px"}}>
          <DataGridTable
      columns = {this.state.tableColumns}
      rows = {this.props.getAllProductFamilyList} 
      filterItems = {
        [
          { columnField: 'productName', operatorValue: 'contains' },
          { columnField: 'shortName', operatorValue: 'contains' },
          { columnField: 'codeName', operatorValue: 'contains' }
        ]
      }
      />
          </Grid>
      </Grid>
     
     
        <Dialog open={this.state.show}>
          <DialogTitle>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {isEmptyString(this.state.id) ? "Add Product" : "Edit Product"}
              <IconButton
                onClick={this.handleClose}
                style={{ position: "absolute", right: "53px" }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              { !isEmptyString(this.state.id) ? 
               <Grid item sm={12}>
              <TextField
                  variant="outlined"
                  color="primary"
                  disabled
                  label="ID"
                  // style={{ marginTop: "2%" }}
                  fullWidth
                  value={this.state.id}
                />
              </Grid> : null  }
             
              <Grid item sm={12}>
                <TextField
                  variant="outlined"
                  color="primary"
                  label="ProductName"
                  // style={{ marginTop: "2%" }}
                  fullWidth
                  value={this.state.productName}
                  error={this.state.productNameErr.length > 0}
                  helperText={this.state.productNameErr}
                  onChange={(e) =>
                    this.setState({ productName: e.target.value })
                  }
                  multiline
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  variant="outlined"
                  color="primary"
                  label="ShortName"
                  name="ShortName"
                  fullWidth
                  // style={{ marginTop: "2%" }}
                  value={this.state.shortName}
                  error={this.state.shortNameErr.length > 0}
                  helperText={this.state.shortNameErr}
                  onChange={(e) => this.setState({ shortName: e.target.value })}
                  multiline
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  variant="outlined"
                  color="primary"
                  label="CodeName"
                  name="CodeName"
                  // style={{ marginTop: "2%" }}
                  fullWidth
                  value={this.state.codeName}
                  error={this.state.codeNameErr.length > 0}
                  helperText={this.state.codeNameErr}
                  onChange={(e) => this.setState({ codeName: e.target.value })}
                  multiline
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  variant="outlined"
                  color="primary"
                  // disabled={!isEmptyString(this.state.createdby)}
                  label="Created By"
                  name="Createdby"
                  // style={{ marginTop: "2%" }}
                  fullWidth
                  value={this.state.createdby}
                  error={this.state.createdbyErr.length > 0}
                  helperText={this.state.createdbyErr}
                  onChange={(e) => this.setState({ createdby: e.target.value })}
                  multiline
                />
              </Grid>
              <Grid item sm={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    // disabled={this.state.createdon !== null }
                    label="Created On"
                    variant = "dialog"
                    format="yyyy-MM-dd"
                    value={this.state.createdon}
                    onChange={(e,newValue)=>this.setState({ createdon : newValue})}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  </MuiPickersUtilsProvider>
              </Grid>
              {/* {!isEmptyString(this.state.id) ? */}
              {/* <> */}
              <Grid item sm={6}>
                <TextField
                  variant="outlined"
                  color="primary"
                  label="Updated By"
                  name="updatedby"
                  style={{ marginTop: "2%" }}
                  fullWidth
                  value={this.state.updatedby}
                  error={this.state.updatdebyErr.length > 0}
                  helperText={this.state.updatdebyErr}
                  onChange={(e) => this.setState({ updatedby: e.target.value })}
                  multiline
                />
              </Grid>
               <Grid item sm={6}>
               <MuiPickersUtilsProvider utils={DateFnsUtils}>
                 <KeyboardDatePicker
                     margin="normal"
                     id="date-picker-dialog"
                     label="Updated On"
                     variant = "dialog"
                     format="yyyy-MM-dd"
                     value={this.state.updatedon}
                     onChange={(e,newValue)=>this.setState({ updatedon : newValue})}
                     KeyboardButtonProps={{
                       'aria-label': 'change date',
                     }}
                   />
                   </MuiPickersUtilsProvider>
               </Grid>
               {/* </> */}
               {/* : null */}
               {/* } */}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={
                !isEmptyString(this.state.id)
                  ? this.updatehandleSaved
                  : this.newhandleSaved
              }
              size="small"
              variant="contained"
              color="primary"
            >
              {!isEmptyString(this.state.id) ? "Update" : "Add"}
            </Button>
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
const mapStateToprops = (state) => {
  console.log(state);
  return {
    getAllProductFamilyList: state.ProductReducer.productFamilyList,
    postproductfamilyList: state.ProductReducer.postproductfamily,
    updateproductfamilyList:state.ProductReducer.updateproductfamily,
    updatefamilyList : state.ProductReducer.updatefamily
  };
};

export default connect(mapStateToprops, {
  getAllProductFamily,
  postproductfamily,
  updateproductfamily,
  updatefamily
})(Product);
