import React, { Component } from 'react'
import {
    viewProduct,
    addProduct,
    updateProduct,
    deleteProduct,
} from "../../Actions/ProductAction"
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from "react-redux";
import { 
    Grid,
    CircularProgress,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Slide,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
 } from '@material-ui/core';
 import CloseIcon from "@material-ui/icons/Close";
 import AddIcon from "@material-ui/icons/Add";
 import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
 import TableComponent from "../TableComponent/TableComponent";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
export class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
             id : "",
             name : "",
             videos : [],
             show : false,
             update : null,
        }
    }
    componentDidMount(){
        this.props.viewProduct()
    }
    // Model Theme
  modeltheme = () =>
  createMuiTheme({
    overrides: {
      MuiDialog: {
        paperWidthSm: {
          width: 500,
        },
      },
      MuiDialogTitle: {
        root: {
          padding: "8px 24px",
        },
      },
      MuiTypography: {
        h6: {
          display: "flex",
          alignItems: "center",
        },
      },
      MuiSvgIcon: {
        root: {
          margin: 0,
        },
      },
      MuiDialogActions: {
        root: {
          justifyContent: "center",
        },
      },
      MuiDialogContentText: {
        root: {
          textAlign: "center",
          display: "block",
          marginBottom: 34,
          color: "rgba(0,0,0,0.7)",
        },
      },
      MuiTextField: {
        root: {
          marginBottom: 15,
        },
      },
    },
  });
    spinnerTheme = () =>
    createMuiTheme({
      overrides: {
        MuiCircularProgress: {
          colorPrimary: {
            color: "#009be5",
          },
        },
      },
    });
    getmuitheme = () =>
    createMuiTheme({
      palette: {
        primary: {
          main: "#007bff",
        },
      },
      overrides: {
        MuiTypography: {
          h6: {
            fontWeight: "bold",
          },
        },
        MuiIconButton: {
          root: {
            "&:hover": {
              backgroundColor: "none",
              borderRadius: 0,
            },
          },
        },
      },
    });
    col = [
        {
          title: "id",
          fieldName: "id"},
        { title: "Name", fieldName: "name" },
      ];
      rowClick = (data) => {
        // this.props.history.push(choicePath+data.id)
      };
      handleClickOpen = (e) => {
        this.setState({ 
          show: true,
          id : "",
          name : "",
        });
      };
      handleEdit = (data) => {
        this.setState({
          id : data.id,
          name : data.name,
          show : true,
        })
    };
    deleteHandler = (data) =>{
        // this.props.deleteQuestionSet(data.id)
        this.props.viewChoice()
      }
      // Add Product
      addProduct() {
        this.setState({ show: false });
        let productObj = {
          name: this.state.name,
        };
        if (this.state.name.length !== 0) {
          this.props.addProduct(productObj);
          this.setState({
            id : "",
          name : "",
          });
        }
        this.props.viewProduct() 
      }
      // Update Product
      updateProduct(){
        this.setState({ show: false });
        let productObj = {
          id : this.state.id,
          name: this.state.name,
        };
    if (this.state.name.length !== 0) {
      this.props.updateProduct(productObj);
      this.setState({
        id : "",
        name : "",
        update: true,
      });      
    }
    this.props.viewProduct()
  }
  render() {
        return (
            <ThemeProvider theme={this.getmuitheme()}>
            <div>
                <Grid container>
                
                <Grid item md={12}>
              {this.props.viewProductList.length !== 0 ? (
                <TableComponent
                  data={
                    this.props.viewProductList.length !== 0
                      ? this.props.viewProductList
                      : null
                  }
                  cols={this.col}
                  onRowClick={this.rowClick}
                  title={"Products"}
                  onDelete={true}
                  onDeleteClick={this.deleteHandler}
                  action={true}
                  onEdit={true}
                  onEditClick={this.handleEdit}
                  add={true}
                  onAddClick={this.handleClickOpen}
                />
              ) : (
                <ThemeProvider theme={this.spinnerTheme()}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "65vh",
                    }}
                  >
                    <CircularProgress
                      color="primary"
                      variant="indeterminate"
                      size="3rem"
                      thickness="3"
                    />
                  </div>
                </ThemeProvider>
              )}
            </Grid>
            </Grid>
          {/* Add and Edit Product */}
          <ThemeProvider theme={this.modeltheme()}>
            <Dialog
            TransitionComponent={Transition}
              open={this.state.show}
              onClose={(e) => this.setState({ show: false })}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0
                    ? "Edit Product"
                    : "Add Product"}
                </div>
                <div className="model-close-button">
                  <IconButton
                    aria-label="close"
                    onClick={(e) => this.setState({ show: false })}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </DialogTitle>
              <DialogContent>
               
              <TextField
                  variant="outlined"
                  color="primary"
                  label="Enter The Name"
                  fullWidth
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  multiline
                />
            
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={
                    this.state.id.length===0
                      ? this.addProduct.bind(this)
                      : this.updateProduct.bind(this)
                  }
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                >
                  {this.state.id.length !== 0 ? "Update" : "Add"}
                </Button>
              </DialogActions>
            </Dialog>
          </ThemeProvider>
            </div>
            </ThemeProvider>
        )
    }
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const mapStateToProps=(state)=>{
    return {
        viewProductList: state.ProductReducer.viewProductList,
    }
}
export default connect(mapStateToProps,{viewProduct,addProduct,updateProduct,deleteProduct})(Product)