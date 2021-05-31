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
  import { isEmptyString } from "../Validation";

export class ProductVarient extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            open: false,
            show: false,
            id : "",
            name : "",
            shortName:"",
            shortNameErr:"",
            codeName:"",
            codeNameErr:"",
            oneliner:"",
            onelinerErr:"",
            description:"",
            descriptionErr:"",
            images:"",
            videos:"",
            tnc:"",
            tncErr:"",
            question:"",
            questionErr:""

        }
    }
    addTermDialogHandler = (event) => {
      
      let hlpTxt = "Please Fill The Required Feild"

      isEmptyString(this.state.shortName) ? this.setState({ shortNameErr : hlpTxt }) : this.setState({ shortNameErr : "" })
      isEmptyString(this.state.codeName) ? this.setState({ codeNameErr : hlpTxt }) : this.setState({ codeNameErr : "" })
      isEmptyString(this.state.oneliner) ? this.setState({ onelinerErr : hlpTxt }) : this.setState({ onelinerErr : "" })
      isEmptyString(this.state.description) ? this.setState({ descriptionErr : hlpTxt }) : this.setState({ descriptionErr : "" })
      isEmptyString(this.state.question) ? this.setState({ questionErr : hlpTxt }) : this.setState({ questionErr : "" })
      isEmptyString(this.state.tnc) ? this.setState({ tncErr : hlpTxt }) : this.setState({ tncErr : "" })

      if(
        !isEmptyString(this.state.shortName) &&
        !isEmptyString(this.state.codeName) &&
        !isEmptyString(this.state.oneliner) &&
        !isEmptyString(this.state.description) &&
        !isEmptyString(this.state.tnc) &&
        !isEmptyString(this.state.question)
       
      ){}
     
      this.setState({ show: false});

      };
      handleChange = (e, name) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };
      handleClickOpen = (e) => {
        this.setState({ 
          show: true,
          shortName:"",
          codeName:"",
          oneliner:"",
          description:"",
          images:"",
          videos:"",
          tnc:"",
          question:"",
        });
        
      };
      handleEdit = (data) => {
        this.setState({
          show : true,
          shortName: data.shortName,
          codeName: data.codeName,
          oneliner: data.oneliner,
          description: data.description,
          images: data.images,
          videos: data.videos,
          tnc: data.tnc,
          question: data.question,

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
                  {this.state.shortName.length !== 0
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
                  onChange={(e) => this.setState({ name: e.target.value })}
                  name="short name"
                  error={this.state.shortNameErr.length > 0}
                  helperText={this.state.shortNameErr}
                  multiline
                />
                <TextField
                  style={{margin:"1%"}}
                  variant="outlined"
                  color="primary"
                  label="Code Name"
                  name="code name"
                  error={this.state.codeNameErr.length > 0}
                  helperText={this.state.codeNameErr}
                  fullWidth
                />
                <TextField
                  style={{margin:"1%"}}
                  variant="outlined"
                  color="primary"
                  label="Product Oneliner"
                  name="product onliner"
                  error={this.state.onelinerErr.length > 0}
                  helperText={this.state.onelinerErr}
                  fullWidth
                />
                 <TextField
                  style={{margin:"1%"}}
                  variant="outlined"
                  color="primary"
                  label="Product description"
                  name="product description"
                  error={this.state.descriptionErr.length > 0}
                  helperText={this.state.descriptionErr}
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
                  color="primary"question
                  label="Product Tnc"
                  name="product Tnc"
                  error={this.state.tncErr.length > 0}
                  helperText={this.state.tncErr}
                  fullWidth
                />
                 <TextField
                  style={{margin:"1%"}}
                  variant="outlined"
                  color="primary"
                  label="Product Q&A"
                  name="product Q&A"
                  error={this.state.questionErr.length > 0}
                  helperText={this.state.questionErr}
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
                  onClick={this.addTermDialogHandler}
                  startIcon={<AddIcon/>}
                >
                  {this.state.shortName.length !== 0 ? "Update" : "Add"}
                </Button>
              </DialogActions>
            </Dialog>
            </div>
        )
    }
}

export default ProductVarient