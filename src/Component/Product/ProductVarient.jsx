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
  import RemoveIcon from '@material-ui/icons/Remove';
  import EditIcon from '@material-ui/icons/Edit';
  import DeleteIcon from '@material-ui/icons/Delete';
  import CloseIcon from "@material-ui/icons/Close";
  import { withStyles,createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
  import { isEmptyString } from "../Validation";
  import {getProductVarient, postProductVarient} from "../../Actions/ProductAction"
  import { connect } from "react-redux";

export class ProductVarient extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            open: false,
            show: false,
            name: "",
            nameErr: "",
            shortName:"",
            shortNameErr:"",
            codeName:"",
            codeNameErr:"",
            oneliner:"",
            onelinerErr:"",
            description:"",
            descriptionErr:"",
            images:"",
            imagesErr:"",
            videos:"",
            videosErr:"",
            tnc:"",
            tncErr:"",
            question:"",
            questionErr:"",
            answer:"",
            answerErr:"",
            productImageArray: [1],
            productVideoArray: [1]

        }
    }
    componentDidMount(){
      this.props.getProductVarient()
  }

    handleSave = (event) => {
      console.log(this.state)

      let hlpTxt = "Please Fill The Required Feild"

      isEmptyString(this.state.shortName) ? this.setState({ shortNameErr : hlpTxt }) : this.setState({ shortNameErr : "" })
      isEmptyString(this.state.codeName) ? this.setState({ codeNameErr : hlpTxt }) : this.setState({ codeNameErr : "" })
      isEmptyString(this.state.oneliner) ? this.setState({ onelinerErr : hlpTxt }) : this.setState({ onelinerErr : "" })
      isEmptyString(this.state.description) ? this.setState({ descriptionErr : hlpTxt }) : this.setState({ descriptionErr : "" })
      isEmptyString(this.state.question) ? this.setState({ questionErr : hlpTxt }) : this.setState({ questionErr : "" })
      isEmptyString(this.state.tnc) ? this.setState({ tncErr : hlpTxt }) : this.setState({ tncErr : "" })
      isEmptyString(this.state.answer) ? this.setState({ answerErr : hlpTxt }) : this.setState({ answerErr : "" })
      isEmptyString(this.state.answer) ? this.setState({ answerErr : hlpTxt }) : this.setState({ answerErr : "" })
      isEmptyString(this.state.images) ? this.setState({ imagesErr : hlpTxt }) : this.setState({ imagesErr: "" })
      isEmptyString(this.state.videos) ? this.setState({ videosErr : hlpTxt }) : this.setState({ videosErr : "" })
      isEmptyString(this.state.name) ? this.setState({ nameErr : hlpTxt }) : this.setState({ nameErr : "" })

      if(
        !isEmptyString(this.state.shortName) &&
        !isEmptyString(this.state.codeName) &&
        !isEmptyString(this.state.oneliner) &&
        !isEmptyString(this.state.description) &&
        !isEmptyString(this.state.tnc) &&
        !isEmptyString(this.state.answer) &&
        !isEmptyString(this.state.images) &&
        !isEmptyString(this.state.videos) &&
        !isEmptyString(this.state.name) &&
        !isEmptyString(this.state.question)
       
      ){
        let obj = {
          "name":this.state.name,
          "codeName":this.state.codeName,
          "shortName":this.state.shortName,
          "validity":"365",
          "productTnc":this.state.tnc,
          "productDescription":this.state.description,
          "productOneliner": this.state.oneliner,
          "productVideos": [],
          "productImages": [],
          "productFamily":{
              "id":"1"
          },
          "productQuestionAnswers":[{
              "id":"1"
          },
          {
              "id":"2"
          },
          {
              "id":"3"
          },
          {
              "id":"4"
          }]
      }
      this.props.postProductVarient(obj)
      }
      // this.setState({ show: false});

      };
      handleChange = (e, name) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };
      handleClickOpen = (e) => {
        this.setState({ 
          show: true,
          name:"",
          shortName:"",
          codeName:"",
          oneliner:"",
          description:"",
          images:"",
          videos:"",
          tnc:"",
          question:"",
          answer:"",
        });
        
      };
      handleEdit = (data) => {
        this.setState({
          show : true,
          name : data.name,
          shortName: data.shortName,
          codeName: data.codeName,
          oneliner: data.oneliner,
          description: data.description,
          images: data.images,
          videos: data.videos,
          tnc: data.tnc,
          question: data.question,
          answer: data.answer

        })
    };
    handleAddVdo = () => {
      let arr = this.state.productVideoArray
      arr.push(arr.length +1)
      this.setState({productVideoArray : arr})
    }
    renderProductVdo =  () =>{
      return this.state.productVideoArray.map((product)=>{
        return <>
        <TextField 
        style={{margin:"2%",width:"70%"}}
        variant="outlined"
        color="primary"
        name="videos"
        label="Product videos"        
        error={this.state.videosErr.length > 0}
        helperText={this.state.videosErr}
        onChange={this.handleChange}       
        />
        <Button startIcon={<RemoveIcon/>} variant="contained" color="primary" 
                 size="medium"
                 style={{marginTop:25}} onClick={()=>{this.removeProduct()}}  ></Button>
        </>
      } )
    }
   renderProductImg =  () =>{
     return this.state.productImageArray.map((product)=>{
       return <>
       <TextField 
       style={{margin:"2%",width:"70%"}}
       variant="outlined"
       color="primary"
       name="images"
       label="Product images"
       error={this.state.imagesErr.length > 0}
        helperText={this.state.imagesErr}
       onChange={this.handleChange}       
       />
       <Button startIcon={<RemoveIcon/>} variant="contained" color="primary" 
                size="medium"
                style={{marginTop:25}} onClick={()=>{this.removeImg()}}  ></Button>
       </>
     } )
   }
   handleAddImg = () => {
     let arr = this.state.productImageArray
     arr.push(arr.length +1)
     this.setState({productImageArray : arr})
   }
   removeVdo = (index) => {
    let arr = this.state.productVideoArray
    arr.pop(arr.length -1)
    this.setState({productVideoArray : arr})
   }
   removeImg = (index) => {
    let arr = this.state.productImageArray
    arr.pop(arr.length -1)
    this.setState({productImageArray : arr})
   }
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
                <TableCell style={{fontWeight:"bold"}}>Varient Name</TableCell>
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
                      Profile Builder
                    </TableCell>
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
          <Dialog fullScreen
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
                    style={{left:"452px"}}
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
              <Grid item md={4}>
                   
                   <TextField
                      style={{margin:"2%",width:"80%"}}
                      variant="outlined"
                      color="primary"
                      label="Varient Name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      name="name"
                      error={this.state.nameErr.length > 0}
                      helperText={this.state.nameErr}
                    />
                    </Grid>
                <Grid item md={4}>
                   
               <TextField
                  style={{margin:"2%",width:"80%"}}
                  variant="outlined"
                  color="primary"
                  label="Short Name"
                  value={this.state.shortName}
                  onChange={this.handleChange}
                  name="shortName"
                  error={this.state.shortNameErr.length > 0}
                  helperText={this.state.shortNameErr}
                />
                </Grid>
                <Grid item md={4}>
                <TextField
                  style={{margin:"2%",width:"80%"}}
                  variant="outlined"
                  color="primary"
                  label="Code Name"
                  name="codeName"
                  onChange={this.handleChange}
                  value={this.state.codeName}
                  error={this.state.codeNameErr.length > 0}
                  helperText={this.state.codeNameErr}
                  
                />
                </Grid>

                <Grid item md={6}>
                <TextField
                  style={{margin:"2%",width:"80%"}}
                  variant="outlined"
                  color="primary"
                  label="Product Oneliner"
                  name="oneliner"
                  value={this.state.oneliner}
                  onChange={this.handleChange}
                  error={this.state.onelinerErr.length > 0}
                  helperText={this.state.onelinerErr}
                  fullWidth
                  multiline
                />
                </Grid>
                <Grid item md={6}>
                 <TextField
                  style={{margin:"2%",width:"80%"}}
                  variant="outlined"
                  color="primary"
                  label="Product description"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  error={this.state.descriptionErr.length > 0}
                  helperText={this.state.descriptionErr}
                  fullWidth
                  multiline
                />
                </Grid>
                <Grid item md={6}>
                 {this.renderProductImg()}
                <Button startIcon={<AddIcon/>} 
                variant="contained"
                color="primary" 
                size="medium"
                onClick={this.handleAddImg}
                style={{marginTop:25, marginLeft:7}}></Button>

                </Grid>

                <Grid item md={6}>
                 {this.renderProductVdo()}
                 <Button startIcon={<AddIcon/>} 
                variant="contained"
                color="primary" 
                size="medium"
                onClick={this.handleAddVdo}
                style={{marginTop:25,marginLeft:7}}></Button>

                </Grid>

                <Grid item md={12}>
                 <TextField
                  style={{margin:"1%", width:'95%'}}
                  variant="outlined"
                  color="primary"question
                  label="Product Tnc"
                  name="tnc"
                  onChange={this.handleChange}
                  value={this.state.tnc}
                  error={this.state.tncErr.length > 0}
                  helperText={this.state.tncErr}
                  multiline
                />
                </Grid>
                <Grid item md={12}>
                 <TextField
                  style={{margin:"1%",width:'85%'}}
                  variant="outlined"
                  color="primary"
                  label="Product Question"
                  name="question"
                  onChange={this.handleChange}
                  value={this.state.question}
                  error={this.state.questionErr.length > 0}
                  helperText={this.state.questionErr}
                 
                />
                 <Button startIcon={<AddIcon/>} 
                variant="contained"
                color="primary" 
                size="medium"
                style={{marginTop:25,marginLeft:7}}></Button>

                </Grid>
                <Grid item md={12}>
                 <TextField
                  style={{margin:"1%",width:'85%'}}
                  variant="outlined"
                  color="primary"
                  label="Product Answer"
                  name="answer"
                  onChange={this.handleChange}
                  value={this.state.answer}
                  error={this.state.answerErr.length > 0}
                  helperText={this.state.answerErr}
                  
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
                  onClick={this.handleSave}
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
const mapStateToProps=(state)=>{
  return {
    getProductVarientList: state.ProductReducer.getProductVarient,
    postProductVarientList:  state.ProductReducer.postProductVarient
  }
}
export default connect(mapStateToProps,{getProductVarient,postProductVarient})(ProductVarient)