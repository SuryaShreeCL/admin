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
  updateproductfamily
} from "../../Actions/ProductAction";
import { connect } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { isEmptyString } from "../../Component/Validation";
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

  newhandleSaved = () => {
    console.log(this.state);
    let helpertxt = "Please fill the required field";
    isEmptyString(this.state.productName)
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
      };
      this.props.postproductfamily(obj);
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
       this.props.updateproductfamily(obj1)
    }
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  render() {
    console.log(this.state);
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography style={{ marginLeft: "20px" }}>Product Family</Typography>
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
            {this.props.getAllProductFamily !== undefined
              ? this.props.getAllProductFamilyList.map((eg) => (
                  <TableRow>
                    <TableCell>{eg.id}</TableCell>
                    <TableCell>{eg.productName}</TableCell>
                    <TableCell>{eg.codeName}</TableCell>
                    <TableCell>{eg.shortName}</TableCell>
                    <TableCell>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <Button
                          color="primary"
                          size="small"
                          variant="contained"
                          onClick={()=>this.handleClick(eg)}
                          startIcon={<EditIcon />}
                          style={{ margin: "3%" }}
                        >
                          Edit
                        </Button>
                        <Button
                          color="secondary"
                          size="small"
                          variant="contained"
                          startIcon={<DeleteIcon />}
                          style={{ margin: "3%" }}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </TableContainer>
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
            <Grid container>
              { !isEmptyString(this.state.id) ? 
               <Grid item sm={12}>
              <TextField
                  variant="outlined"
                  color="primary"
                  disabled
                  label="ID"
                  style={{ marginTop: "2%" }}
                  fullWidth
                  value={this.state.id}
                />
              </Grid> : null  }
             
              <Grid item sm={12}>
                <TextField
                  variant="outlined"
                  color="primary"
                  label="ProductName"
                  style={{ marginTop: "2%" }}
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
                  style={{ marginTop: "2%" }}
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
                  style={{ marginTop: "2%" }}
                  fullWidth
                  value={this.state.codeName}
                  error={this.state.codeNameErr.length > 0}
                  helperText={this.state.codeNameErr}
                  onChange={(e) => this.setState({ codeName: e.target.value })}
                  multiline
                />
              </Grid>
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
      </div>
    );
  }
}
const mapStateToprops = (state) => {
  console.log(state);
  return {
    getAllProductFamilyList: state.ProductReducer.productFamilyList,
    postproductfamilyList: state.ProductReducer.postproductfamily,
    updateproductfamilyList:state.ProductReducer.updateproductfamily
  };
};

export default connect(mapStateToprops, {
  getAllProductFamily,
  postproductfamily,
  updateproductfamily
})(Product);
