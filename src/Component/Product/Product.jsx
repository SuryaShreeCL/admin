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
  Breadcrumbs
} from "@material-ui/core";
import React, { Component } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import {
  getAllProductFamily,
  postproductfamily,
  updateproductfamily,
  updatefamily,
  deletefamily
} from "../../Actions/ProductAction";
import { connect } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { isEmptyString } from "../../Component/Validation";
import MySnackBar from "../MySnackBar";
import PrimaryButton from '../../Utils/PrimaryButton'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ReactExport from "react-export-excel";
import { ArrowUpward } from "@material-ui/icons";
import DataGridTable from "../Utils/DataGridTable";
import { Autocomplete } from "@material-ui/lab";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
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
      createdby: window.sessionStorage.getItem("role"),
      createdbyErr: "",
      createdon: new Date(),
      craetedonErr: "",
      updatedby: "",
      updatdebyErr: "",
      updatedon: "",
      updatedonErr: "",
      newFamilynameErr: "",
      tableColumns: [
        { field: "id", hide: true },
        { field: "codeName", headerName: "Product SKU", width: 140 },
        { field: "productName", headerName: "Product Family Name", width: 150 },
        { field: "varientCount", headerName: "Variant", width: 120 },
        { field: "createdBy", headerName: "Created By", width: 140 },
        { field: "dateOfCreation", headerName: "Created On", width: 140 },
        { field: "updatedBy", headerName: "Updated By", width: 135 },
        { field: "dateOfUpdate", headerName: "Updated On", width: 140 },
        {
          field: "action",
          headerName: "Action",
          sortable: false,
          width: 200,
          renderCell : (params) => (
            <PrimaryButton
                  onClick={()=>{
                    this.setState({
                              show: true,
                              id: params.row.id,
                              codeName: params.row.codeName,
                              // shortName:thisRow.shortName,
                              productName: params.row.productName,
                              createdby: params.row.createdBy,
                              createdon: params.row.dateOfCreation,
                              updatedby: params.row.updatedBy,
                              updatedon: params.row.dateOfUpdate,
                            })
                  }}
                  variant={"contained"}
                  color={"primary"}
                  size={"small"}
                  style={{ marginLeft: 16 }}
                >
                  Manage
                </PrimaryButton>
          ),
          // renderCell: (params) => {
          //   const onClick = () => {
          //     const api: GridApi = params.api;
          //     const fields = api
          //       .getAllColumns()
          //       .map((c) => c.field)
          //       .filter((c) => c !== "__check__" && !!c);
          //     const thisRow: Record<string, GridCellValue> = {};

          //     fields.forEach((f) => {
          //       thisRow[f] = params.getValue(f);
          //     });

          //     return (
          //       // console.log(thisRow)
          //       this.setState({
          //         show: true,
          //         id: thisRow.id,
          //         codeName: thisRow.codeName,
          //         // shortName:thisRow.shortName,
          //         productName: thisRow.productName,
          //         createdby: thisRow.createdBy,
          //         createdon: thisRow.dateOfCreation,
          //         updatedby: thisRow.updatedBy,
          //         updatedon: thisRow.dateOfUpdate,
          //       })
          //     );
          //     // alert(JSON.stringify(thisRow, null, 4));
          //   };
          //   return (
          //     <PrimaryButton
          //       onClick={onClick}
          //       variant={"contained"}
          //       color={"primary"}
          //       size={"small"}
          //       style={{ marginLeft: 16 }}
          //     >
          //       Manage
          //     </PrimaryButton>
          //   );
          // },
        },
      ],
      deletedialog :false,
      newFamilyname : ""
    };
  }
  componentDidMount() {
    this.props.getAllProductFamily();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.postproductfamilyList !== this.props.postproductfamilyList) {
      this.props.getAllProductFamily();
    }
    if(prevProps.updateproductfamilyList.productName !== this.props.updateproductfamilyList.productName){
      this.props.getAllProductFamily();
    }
  }
  

handleDelete=()=>{
  this.setState({
    deletedialog:true,
    show :false
  })
}
  handleClick = (data) => {
console.log(data)
    this.setState({
      show: true,
      id:data.id,
      codeName:data.codeName,
      shortName:data.shortName,
      productName:data.productName,
      createdby:data.createdBy,
      createdon:data.dateOfCreation,
      updatedby : data.updatedBy,
      updatedon:data.dateOfUpdate
    });
  };

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
        createdBy:window.sessionStorage.getItem("role"),
        updatedBy:window.sessionStorage.getItem("role"),
        dateOfCreation:new Date(),
        dateOfUpdate:new Date()
      };
      // console.log(obj)
      this.props.postproductfamily(obj);
      this.setState({
        snackMsg:"Added Successfully",
        snackOpen:true,
        snackVariant:"success",
        show:false
      })
    }
  };
  handleDatadelete = () => {
    console.log(this.state.id);
    console.log(this.state.newFamilyname.id);
    let helperText = "Please fill the Required Field";
    this.state.newFamilyname === ""
      ? this.setState({ newFamilynameErr: helperText })
      : this.setState({ newFamilynameErr: "" });
    if (this.state.newFamilyname !== "") {
      this.props.deletefamily(this.state.id, this.state.newFamilyname.id);
      this.setState({
        snackMsg: "Deleted Successfully",
        snackOpen: true,
        snackVariant: "success",
        deletedialog:false
      })
    }
  }
  updatehandleSaved = () => {
    console.log(this.state)
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
      // this.state.updatedby === ""
      // ? this.setState({ updatdebyErr: helpertxt })
      // : this.setState({ updatdebyErr: "" });
      // this.state.updatedon === null
      // ? this.setState({ updatedonErr: helpertxt })
      // : this.setState({ updatedonErr: "" });

      // isEmptyString(this.state.id)
      // ? this.setState({ idErr: helpertxt })
      // : this.setState({ idErr: "" });

    if (
      !isEmptyString(this.state.productName) &&
      !isEmptyString(this.state.shortName) &&
      !isEmptyString(this.state.codeName) &&
      !isEmptyString(this.state.id) 
      // !isEmptyString(this.state.updatedby) &&
      // this.state.updatedon !== null
    ) {
      //  console.log("validate Success")
      // let obj1 = {
      //   id: this.state.id,
      //   productName: this.state.productName,
      //   codeName: this.state.codeName,
      //   shortName: this.state.shortName,
      // };
      let obj2={
        id: this.state.id,
        codeName:this.state.codeName,
        productName:this.state.productName,
        updatedBy:window.sessionStorage.getItem("role"),
        dateOfUpdate:new Date(),
        shortName : this.state.shortName
    }
      //  this.props.updateproductfamily(obj1)
       this.props.updatefamily(obj2)
       this.setState({
        snackMsg:"Updated Successfully",
        snackOpen:true,
        snackVariant:"success",
        show:false
      })
    }
    console.log(this.state)
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  render() {
    console.log(window.sessionStorage.getItem("role"));
    console.log(this.props.getAllProductFamilyList)
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
          <div style={{
            display: "flex",
            flexDirection: "row",
          }}>
          <Button
            style={{ margin: "1%" }}
            onClick={this.handleClick}
            color="primary"
            size="small"
            startIcon={<AddIcon />}
            variant="contained"
          >
            Create_Family
          </Button>
          <ExcelFile 
          filename={"Product Family"}
          element={
            <Button
              variant="contained"
              size="small"
              color="primary"
            >
              Export Excel
            </Button>
          }
        >
               <ExcelSheet data={this.props.getAllProductFamilyList} name="Product Family">
                   <ExcelColumn label="Product Name" value="productName"/>
                   <ExcelColumn label="Product Shortname" value="shortName"/>
                   <ExcelColumn label="Product CodeName" value="codeName"/>
                   <ExcelColumn label="Created By " value="createdBy"/>
                   <ExcelColumn label="Created At" value="dateOfCreation"/>
                   <ExcelColumn label="Updated By" value="updatedBy"/>
                   <ExcelColumn label="Updated At" value="dateOfUpdate"/>
                   <ExcelColumn label="Varient Count" value="varientCount"/>
               </ExcelSheet>
           </ExcelFile>
          </div>
         
        </div>

      {/*  */}
      <Grid container>
          <Grid item md={12} style={{height : "500px"}}>
          <DataGridTable
      columns = {this.state.tableColumns}
      rows = {this.props.getAllProductFamilyList} 
      filterItems = {
        [
          { id : "", columnField: 'productName', operatorValue: 'contains' },
          { id : "", columnField: 'shortName', operatorValue: 'contains' },
          { id : "", columnField: 'codeName', operatorValue: 'contains' },
        ]
      }
      />
          </Grid>
      </Grid>
     
     
        <Dialog open={this.state.show}>
          <DialogTitle>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {isEmptyString(this.state.id)
                ? "Create New Product Family"
                : "Edit Profile Builder Family"}
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
              {/* {!isEmptyString(this.state.id) ? (
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
                </Grid>
              ) : null} */}
              <Grid item sm={6}>
                {/* {!isEmptyString(this.state.id) ? (
                  <Autocomplete
                    id="combo-box-demo"
                    options={this.props.getAllProductFamilyList}
                    getOptionLabel={(option) => option.productName}
                    value={this.state.productName}
                    onChange={(e, newValue) =>
                      this.setState({ productName: newValue })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Product Family"
                        variant="standard"
                        error={this.state.productNameErr.length > 0}
                        helperText={this.state.productNameErr}
                      />
                    )}
                  />
                ) : ( */}
                  <TextField
                    variant="standard"
                    color="primary"
                    label="Product Family"
                    fullWidth
                    value={this.state.productName}
                    error={this.state.productNameErr.length > 0}
                    helperText={this.state.productNameErr}
                    onChange={(e) =>
                      this.setState({ productName: e.target.value })
                    }
                    multiline
                  />
                {/* )} */}
              </Grid>
              <Grid item sm={6}>
                <TextField
                  variant="standard"
                  color="primary"
                  label="Product SKU"
                  // style={{ marginTop: "2%" }}
                  disabled={!isEmptyString(this.state.id)}
                  fullWidth
                  value={this.state.codeName}
                  error={this.state.codeNameErr.length > 0}
                  helperText={this.state.codeNameErr}
                  onChange={(e) => this.setState({ codeName: e.target.value })}
                  multiline
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  variant="standard"
                  color="primary"
                  label="ShortName"
                  name="ShortName"
                  fullWidth
                  style={{ width: "50%" }}
                  // disabled={!isEmptyString(this.state.id)}
                  value={this.state.shortName}
                  error={this.state.shortNameErr.length > 0}
                  helperText={this.state.shortNameErr}
                  onChange={(e) => this.setState({ shortName: e.target.value })}
                  multiline
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  variant="standard"
                  color="primary"
                  disabled
                  label="Created By"
                  name="Createdby"
                  fullWidth
                  value={window.sessionStorage.getItem("role")}
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
                    disabled
                    label="Created On"
                    variant="dialog"
                    format="yyyy-MM-dd"
                    value={this.state.createdon}
                    error={this.state.craetedonErr.length > 0}
                    helperText={this.state.craetedonErr}
                    onChange={(e, newValue) =>
                      this.setState({ createdon: newValue })
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              {!isEmptyString(this.state.id) ? (
                <>
                  <Grid item sm={6}>
                    <TextField
                      variant="standard"
                      color="primary"
                      label="Updated By"
                      disabled
                      name="updatedby"
                      fullWidth
                      value={this.state.updatedby}
                      error={this.state.updatdebyErr.length > 0}
                      helperText={this.state.updatdebyErr}
                      onChange={(e) =>
                        this.setState({ updatedby: e.target.value })
                      }
                      multiline
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Updated On"
                        disabled
                        variant="dialog"
                        format="yyyy-MM-dd"
                        value={this.state.updatedon}
                        onChange={(e,newValue)=>this.setState({ updatedon : newValue})}
                        error={this.state.updatedonErr.length > 0}
                        helperText={this.state.updatedonErr}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item md={6} align = "center">
                    <PrimaryButton
                      onClick={this.updatehandleSaved}
                      color={"primary"}
                      size={"small"}
                      variant={"contained"}
                    >
                      Update Family
                    </PrimaryButton>
                  </Grid>
                  <Grid item sm={6} align="center">
                  <PrimaryButton
                    onClick={this.handleDelete}
                    color={"secondary"}
                    size={"small"}
                    variant={"contained"}
                  >
                    Delete Family
                  </PrimaryButton>
              </Grid>
                </>
              ) : null}
              {isEmptyString(this.state.id) ? (
                <Grid item sm={12} align = "center">
                  <PrimaryButton
                    onClick={this.newhandleSaved}
                    color={"primary"}
                    size={"small"}
                    variant={"contained"}
                  >
                    Create Family
                  </PrimaryButton>
                </Grid>
              ) : null}
              
            </Grid>
          </DialogContent>
        </Dialog>
        <Dialog open={this.state.deletedialog} maxWidth="md">
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item md={11} sm={11}>
                <h6>Choose the Another Product Family</h6>
              </Grid>
              <Grid item md={1} sm={1}>
                <IconButton
                  onClick={() => this.setState({ deletedialog: false })}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid item sm={12} xs={12}>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.props.getAllProductFamilyList}
                  getOptionLabel={(option) => option.productName}
                  onChange={(e,newValue)=>this.setState({newFamilyname : newValue})}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Product Family"
                      variant="standard"
                      error={this.state.newFamilynameErr.length > 0}
                      helperText={this.state.newFamilynameErr}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={12} alignItems="center">
                <PrimaryButton
                  color={"secondary"}
                  size={"small"}
                  variant={"contained"}
                  onClick={()=>this.handleDatadelete()}
                >
                  Delete
                </PrimaryButton>
              </Grid>
            </Grid>
          </DialogContent>
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
    getAllProductFamilyList: state.ProductReducer.getAllProductFamily,
    postproductfamilyList: state.ProductReducer.postproductfamily,
    updateproductfamilyList:state.ProductReducer.updateproductfamily,
    updatefamilyList : state.ProductReducer.updatefamily,
  };
};

export default connect(mapStateToprops, {
  getAllProductFamily,
  postproductfamily,
  updateproductfamily,
  updatefamily,
  deletefamily
})(Product);
