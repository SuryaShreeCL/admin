import React, { Component } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    TextField,
    DialogActions,
    Slide,
    Typography,
    Grid
  } from "@material-ui/core";
  import AddIcon from "@material-ui/icons/Add";
  import EditIcon from '@material-ui/icons/Edit';
  import DeleteIcon from '@material-ui/icons/Delete';
  import CloseIcon from "@material-ui/icons/Close";
  import { withStyles,createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export class ProductVarient extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            open: false,
            show: false,
            id : "",
            name : "",
            shortName:"",
            codeName:"",
            oneliner:"",
            description:"",
            images:"",
            videos:"",
            tnc:"",
            question:"",

        }
    }
    addTermDialogHandler = (event) => {
        this.setState({
          open : true,
        });
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


    render() {
        return (
            <div>
                <div style={{display:'flex',flexDirection:"row", justifyContent:'space-between', margin:"2%" }}>
                <h4>Product Varient</h4>
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

               <TableContainer >
            <Table>
              <TableHead >
                <TableRow>
                <TableCell style={{fontWeight:"bold"}}>Varient short Name</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Code Name</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Product Oneliner</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Product description</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Product Images</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Product Videos</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Product Tnc</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Product Q&A</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow>
                      <TableCell> 
                       Profile Builder for Placements
                      </TableCell>
                      <TableCell> 
                        PBP
                      </TableCell>
                      <TableCell> 
                       Profile Builder
                      </TableCell>
                      <TableCell> 
                      Description of Profile builder
                      </TableCell>
                      <TableCell> 
                       Profile Builder Images
                      </TableCell>
                      <TableCell> 
                      Profile Builder Videos
                      </TableCell>
                      <TableCell> 
                      Profile Builder Terms and conditions
                      </TableCell>
                      <TableCell> 
                      Profile builder Q and Ans
                      </TableCell>
                      <TableCell > 
                        <div style={{display:'flex', flexDirection:"row"}}>
                      <Button size="small" variant="contained" color="primary" style={{margin:"5px"}} startIcon={<EditIcon/>} onClick={this.handleClickOpen}>Edit</Button>
                      <Button size="small" variant="contained" color="secondary" style={{margin:"5px"}} startIcon={<DeleteIcon/>}>Delete</Button>
                        </div>
                      </TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog 
            // TransitionComponent={Transition}
              open={this.state.show}
              onClose={(e) => this.setState({ show: false })}
              aria-labelledby="customized-dialog-title"
              maxWidth="sm"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0
                    ? "Edit Product"
                    : "Add Product Varient"}
                    <IconButton
                    style={{left:"152px"}}
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
              <Grid>
                <Grid item md={12}>
                   
               <TextField
                  style={{margin:"1%"}}
                  variant="outlined"
                  color="primary"
                  label="Short Name"
                  fullWidth
                  value={this.state.name}
                  error={this.state.name.length < 0 ? true: false}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  multiline
                />
                <TextField
                  style={{margin:"1%"}}
                  variant="outlined"
                  color="primary"
                  label="Code Name"
                  fullWidth
                />
                <TextField
                  style={{margin:"1%"}}
                  variant="outlined"
                  color="primary"
                  label="Product Oneliner"
                  fullWidth
                />
                 <TextField
                  style={{margin:"1%"}}
                  variant="outlined"
                  color="primary"
                  label="Product description"
                  fullWidth
                />
                 <TextField
                  style={{margin:"1%"}}
                  variant="outlined"
                  color="primary"
                  label="Product Images"
                  fullWidth
                />
                 <TextField
                  style={{margin:"1%"}}
                  variant="outlined"
                  color="primary"
                  label="Product Videos"
                  fullWidth
                />
                 <TextField
                  style={{margin:"1%"}}
                  variant="outlined"
                  color="primary"
                  label="Product Tnc"
                  fullWidth
                />
                 <TextField
                  style={{margin:"1%"}}
                  variant="outlined"
                  color="primary"
                  label="Product Q&A"
                  fullWidth
                />
                </Grid>
              </Grid>
              </DialogContent>
              <DialogActions style={{alignSelf:"center"}}>
                <Button
                  // onClick={
                  //   this.state.id.length===0
                  //     ? this.addProduct.bind(this)
                  //     : this.updateProduct.bind(this)
                  // }
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon/>}
                >
                  {this.state.id.length !== 0 ? "Update" : "Add"}
                </Button>
              </DialogActions>
            </Dialog>
            </div>
        )
    }
}

export default ProductVarient