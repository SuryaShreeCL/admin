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
  import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

  import AddIcon from "@material-ui/icons/Add";
  import RemoveIcon from '@material-ui/icons/Remove';
  import EditIcon from '@material-ui/icons/Edit';
  import DeleteIcon from '@material-ui/icons/Delete';
  import CloseIcon from "@material-ui/icons/Close";
  import { isEmptyString } from "../Validation";
  import {getProductVarient, postProductVarient, updateProductVarient, getAllProductImages, getAllProductVideos, getAllProductQuesAns, getAllProductFamily} from "../../Actions/ProductAction"
  import { connect } from "react-redux";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';
import { productVariantPath } from '../RoutePaths';

export class ProductVarient extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            open: false,
            show: false,
            id : "",
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
            images: [],
            imagesErr:"",
            videos: [],
            videosErr:"",
            productFamily : null,
            productFamilyErr : "",
            tnc:"",
            tncErr:"",
            question: [],
            questionErr:"",
            answer:"",
            answerErr:"",
            productImageArray: [1],
            productVideoArray: [1],
            snackOpen: false,
            snackMessage: null,
            snackVariant: null,
            endOfServiceDate : new Date(),
            endOfEnrollmentDate : new Date(),
            intake : null,
            year : null,
            pricing : null,
            endOfEnrollmentDateErr : "",
            endOfServiceDateErr:"",
            intakeErr : "",
            yearErr:"",
            pricingErr:""

        }
    }
    componentDidMount(){
      this.props.getProductVarient()
      this.props.getAllProductImages()
      this.props.getAllProductVideos()
      this.props.getAllProductQuesAns()
      this.props.getAllProductFamily()
  }
  componentDidUpdate(prevProps,prevState){
    if(prevProps.postProductVarientList !== this.props.postProductVarientList || prevProps.updateProductVarientList !== this.props.updateProductVarientList){
      this.props.getProductVarient()
      this.props.getAllProductFamily()
    }
  }

    handleSave = (event) => {
      console.log(this.state)
     
      let hlpTxt = "Please Fill The Required Feild"

      isEmptyString(this.state.shortName) ? this.setState({ shortNameErr : hlpTxt }) : this.setState({ shortNameErr : "" })
      isEmptyString(this.state.codeName) ? this.setState({ codeNameErr : hlpTxt }) : this.setState({ codeNameErr : "" })
      isEmptyString(this.state.oneliner) ? this.setState({ onelinerErr : hlpTxt }) : this.setState({ onelinerErr : "" })
      isEmptyString(this.state.description) ? this.setState({ descriptionErr : hlpTxt }) : this.setState({ descriptionErr : "" })
      this.state.question.length === 0 ? this.setState({ questionErr : hlpTxt }) : this.setState({ questionErr : "" })
      isEmptyString(this.state.tnc) ? this.setState({ tncErr : hlpTxt }) : this.setState({ tncErr : "" })
      isEmptyString(this.state.answer) ? this.setState({ answerErr : hlpTxt }) : this.setState({ answerErr : "" })
      this.state.images.length === 0 ? this.setState({ imagesErr : hlpTxt }) : this.setState({ imagesErr: "" })
      this.state.videos.length === 0 ? this.setState({ videosErr : hlpTxt }) : this.setState({ videosErr : "" })
      isEmptyString(this.state.name) ? this.setState({ nameErr : hlpTxt }) : this.setState({ nameErr : "" })
      this.state.year === null ? this.setState({yearErr : hlpTxt}) : this.setState({yearErr : ""})
      this.state.intake === null ? this.setState({intakeErr : hlpTxt}) : this.setState({intakeErr : ""})
      this.state.pricing === null ? this.setState ({pricingErr : hlpTxt }) : this.setState({pricingErr : ""})
      this.state.endOfEnrollmentDate === null ? this.setState ({endOfEnrollmentDateErr : hlpTxt }) : this.setState ({endOfEnrollmentDateErr : ""})
      this.state.endOfServiceDate === null ? this.setState ({ endOfServiceDateErr : hlpTxt}) : this.setState({ endOfServiceDateErr : ""})
      
      if(
        !isEmptyString(this.state.shortName) &&
        !isEmptyString(this.state.codeName) &&
        !isEmptyString(this.state.oneliner) &&
        !isEmptyString(this.state.description) &&
        !isEmptyString(this.state.tnc) &&
        this.state.images.length !== 0 &&
        this.state.videos.length !== 0 &&
        !isEmptyString(this.state.name) &&
        this.state.endOfServiceDate !== null &&
        this.state.endOfEnrollmentDate !== null &&
        this.state.intake !== null &&
        this.state.year !== null &&
        this.state.pricing !== null
        // && this.state.question.length !== 0
       
      ){
        let postVideoArr = this.state.videos.map((eachVideo)=>{
          return {id : eachVideo.id}
        })
        let postImageArr = this.state.images.map((eachImage)=>{
          return {id : eachImage.id}
        })
        let postQuesArr = this.state.question.map((eachQues)=>{
          return {id : eachQues.id}
        })
        
      //   let obj = {
      //     "name":this.state.name,
      //     "codeName":this.state.codeName,
      //     "shortName":this.state.shortName,
      //     "validity":"365",
      //     "productTnc":this.state.tnc,
      //     "productDescription":this.state.description,
      //     "productOneliner": this.state.oneliner,
      //     "productVideos": postVideoArr,
      //     "productImages": postImageArr,
      //     "productFamily":{
      //         id : this.state.productFamily.id
      //     },
      //     "productQuestionAnswers": postQuesArr
      // }
      let obj = {
        "name": this.state.name,
        "codeName": this.state.codeName,
        "shortName": this.state.shortName,
        "validity": "365",
        "productTnc": this.state.tnc,
        "productDescription": this.state.description,
        "productOneliner": this.state.oneliner,
        "productVideos": postVideoArr,
        "productImages": postImageArr,
        "endOfServiceDate":this.state.endOfServiceDate,
        "endOfEnrollmentDate":this.state.endOfEnrollmentDate,
        "year":this.state.year,
        "pricing":this.state.pricing,
        "intake":this.state.intake,
        "productFamily": {
            "id": this.state.productFamily.id
        },
        "productQuestionAnswers": postQuesArr
    }
      console.log(obj)
      this.props.postProductVarient(obj)
      this.setState({
        snackMessage : "Data Saved Successfully",
        snackVariant : "success",
        snackOpen : true
      })
      this.setState({ show: false});
      }
      
     

      };
      handleChange = (e, name) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };
      handleClickOpen = (e) => {
        this.setState({ 
          show: true,
          id : "",
          name:"",
          shortName:"",
          codeName:"",
          oneliner:"",
          description:"",
          images:[],
          videos:[],
          tnc:"",
          question:[],
          productFamily : null,

        });
        
      };
      handleEdit = (data) => {
        console.log(data)
        this.setState({
          show : true,
          id : data.id,
          name : data.name,
          shortName: data.shortName,
          codeName: data.codeName,
          oneliner: data.productOneliner,
          description: data.productDescription,
          images: data.productImages,
          videos: data.productVideos,
          tnc: data.productTnc,
          question: data.productQuestionAnswers,
          productFamily : data.productFamily
        })
    };
  
    handleUpdate = () =>{
      let hlpTxt = "Please Fill The Required Feild"

      isEmptyString(this.state.shortName) ? this.setState({ shortNameErr : hlpTxt }) : this.setState({ shortNameErr : "" })
      isEmptyString(this.state.codeName) ? this.setState({ codeNameErr : hlpTxt }) : this.setState({ codeNameErr : "" })
      isEmptyString(this.state.oneliner) ? this.setState({ onelinerErr : hlpTxt }) : this.setState({ onelinerErr : "" })
      isEmptyString(this.state.description) ? this.setState({ descriptionErr : hlpTxt }) : this.setState({ descriptionErr : "" })
      this.state.question.length === 0 ? this.setState({ questionErr : hlpTxt }) : this.setState({ questionErr : "" })
      isEmptyString(this.state.tnc) ? this.setState({ tncErr : hlpTxt }) : this.setState({ tncErr : "" })
      isEmptyString(this.state.answer) ? this.setState({ answerErr : hlpTxt }) : this.setState({ answerErr : "" })
      this.state.images.length === 0 ? this.setState({ imagesErr : hlpTxt }) : this.setState({ imagesErr: "" })
      this.state.videos.length === 0 ? this.setState({ videosErr : hlpTxt }) : this.setState({ videosErr : "" })
      isEmptyString(this.state.name) ? this.setState({ nameErr : hlpTxt }) : this.setState({ nameErr : "" })
      this.state.year === null ? this.setState({yearErr : hlpTxt}) : this.setState({yearErr : ""})
      this.state.intake === null ? this.setState({intakeErr : hlpTxt}) : this.setState({intakeErr : ""})
      this.state.pricing === null ? this.setState ({pricingErr : hlpTxt }) : this.setState({pricingErr : ""})
      this.state.endOfEnrollmentDate === null ? this.setState ({endOfEnrollmentDateErr : hlpTxt }) : this.setState ({endOfEnrollmentDateErr : ""})
      this.state.endOfServiceDate === null ? this.setState ({ endOfServiceDateErr : hlpTxt}) : this.setState({ endOfServiceDateErr : ""})
      if(
        !isEmptyString(this.state.shortName) &&
        !isEmptyString(this.state.codeName) &&
        !isEmptyString(this.state.oneliner) &&
        !isEmptyString(this.state.description) &&
        !isEmptyString(this.state.tnc) &&
        this.state.images.length !== 0 &&
        this.state.videos.length !== 0 &&
        !isEmptyString(this.state.name) &&
        this.state.question.length !== 0 &&
        this.state.endOfServiceDate !== null &&
        this.state.endOfEnrollmentDate !== null &&
        this.state.intake !== null &&
        this.state.year !== null &&
        this.state.pricing !== null
       
      ){
        let postVideoArr = this.state.videos.map((eachVideo)=>{
          return {id : eachVideo.id}
        })
        let postImageArr = this.state.images.map((eachImage)=>{
          return {id : eachImage.id}
        })
        let postQuesArr = this.state.question.map((eachQues)=>{
          return {id : eachQues.id}
        })
        
        let obj = {
          "id" : this.state.id,
          "name":this.state.name,
          "codeName":this.state.codeName,
          "shortName":this.state.shortName,
          "validity":"365",
          "productTnc":this.state.tnc,
          "productDescription":this.state.description,
          "productOneliner": this.state.oneliner,
          "productVideos": postVideoArr,
          "productImages": postImageArr,
          "productFamily":{
              id : this.state.productFamily.id
          },
          "productQuestionAnswers": postQuesArr
      }
      console.log(obj)
      this.props.updateProductVarient(obj)
      this.setState({
        snackMessage : "Data Updated Successfully",
        snackVariant : "success",
        snackOpen : true
      })
      this.setState({ show: false});
      }
     
      
    }
   
   
    render() {
      console.log(this.state)
        return (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div>
                <div style={{display:'flex',flexDirection:"row", justifyContent:'space-between', margin:"2%" }}>
                <h4>Product Varient</h4>
                <Button 
                startIcon={<AddIcon/>} 
                variant="contained"
                color="primary" 
                size="medium"
                onClick={
                  // this.handleClickOpen
                  ()=>this.props.history.push(productVariantPath)
                }
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
                {/* <TableCell style={{fontWeight:"bold"}}>Product Images</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Product Videos</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Product Tnc</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Product Q&A</TableCell> */}
                <TableCell ali style={{fontWeight:"bold"}}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.getProductVarientList.map((eachVariant)=>{
                  return (
                    <TableRow>
                      <TableCell>
                        {eachVariant.name}
                      </TableCell>
                      <TableCell>
                        {eachVariant.shortName}
                      </TableCell>
                      <TableCell>
                        {eachVariant.codeName}
                      </TableCell>
                      <TableCell>
                        {eachVariant.productOneliner}
                      </TableCell>
                      <TableCell>
                        {eachVariant.productDescription}
                      </TableCell>
                      <TableCell > 
                        <div style={{display:'flex', flexDirection:"row"}}>
                      <Button size="small" variant="contained" color="primary" style={{margin:"5px"}} startIcon={<EditIcon/>} onClick={()=>this.handleEdit(eachVariant)}>Edit</Button>
                      <Button size="small" variant="contained" color="secondary" style={{margin:"5px"}} startIcon={<DeleteIcon/>}>Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>

                  )
                })}
                
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
                  {this.state.id.length !== 0
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
              <Grid container spacing={2}>
                <Grid item md={3}>
                <Autocomplete
                value={this.state.productFamily}
                  onChange={(e,newValue)=>this.setState({productFamily : newValue})}
                  id="combo-box-demo"
                  options={this.props.productFamilyList}
                  getOptionLabel={(option) => option.productName}
                    fullWidth
                  renderInput={(params) => <TextField {...params} label="Product Family" variant="outlined" />}
                />
                </Grid>
              <Grid item md={3}>
                   
                   <TextField
                      variant="outlined"
                      fullWidth
                      color="primary"
                      label="Varient Name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      name="name"
                      error={this.state.nameErr.length > 0}
                      helperText={this.state.nameErr}
                    />
                    </Grid>
                <Grid item md={3}>
                   
               <TextField
                  variant="outlined"
                  color="primary"
                  fullWidth
                  label="Short Name"
                  value={this.state.shortName}
                  onChange={this.handleChange}
                  name="shortName"
                  error={this.state.shortNameErr.length > 0}
                  helperText={this.state.shortNameErr}
                  
                />
                </Grid>
                <Grid item md={3}>
                <TextField
                  variant="outlined"
                  color="primary"
                  label="Code Name"
                  fullWidth
                  name="codeName"
                  onChange={this.handleChange}
                  value={this.state.codeName}
                  error={this.state.codeNameErr.length > 0}
                  helperText={this.state.codeNameErr}
                  
                />
                </Grid>

                <Grid item md={6}>
                <TextField
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
                  variant="outlined"
                  color="primary"
                  rows={4}
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
                <Autocomplete
                  id="combo-box-demo"
                  multiple
                  filterSelectedOptions
                  value={this.state.images}
                  onChange={(e,newValue)=>this.setState({images : newValue})}
                  options={this.props.allProductImages}
                  getOptionLabel={(option) => option.imagesUrl}
                    fullWidth
                  renderInput={(params) => <TextField {...params} label="Product Image" variant="outlined" />}
                />
                </Grid>

                <Grid item md={6}>
                <Autocomplete
                multiple
                filterSelectedOptions
                value={this.state.videos}
                  onChange={(e,newValue)=>this.setState({videos : newValue})}
                  id="combo-box-demo"
                  options={this.props.allProductVideos}
                  getOptionLabel={(option) => option.videoUrl}
                    fullWidth
                  renderInput={(params) => <TextField {...params} label="Product Video" variant="outlined" />}
                />

                </Grid>

                <Grid item md={12}>
                 <TextField
                  variant="outlined"
                  color="primary"question
                  label="Product Tnc"
                  name="tnc"
                  fullWidth
                  rows={4}
                  onChange={this.handleChange}
                  value={this.state.tnc}
                  error={this.state.tncErr.length > 0}
                  helperText={this.state.tncErr}
                  multiline
                />
                </Grid>
                <Grid item md={12}>
                <Autocomplete
                  id="combo-box-demo"
                  multiple
                  value={this.state.question}
                  onChange={(e,newValue)=>this.setState({question : newValue})}
                  filterSelectedOptions
                  options={this.props.allProductQuesAns}
                  getOptionLabel={(option) => option.question}
                    fullWidth
                  renderInput={(params) => <TextField {...params} label="Product Question" variant="outlined" />}
                />

                </Grid>

              </Grid>
              <Grid container spacing={2}>
                    <Grid item md>
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    error={this.state.endOfServiceDateErr.length > 0 }
                    helperText={this.state.endOfServiceDateErr}
                    id="date-picker-inline"
                    label="End Of Service Date"
                    value={this.state.endOfServiceDate}
                    onChange={(value)=>this.setState({endOfServiceDate : value})}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                    </Grid>
                    <Grid item md>
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    error={this.state.endOfEnrollmentDateErr.length > 0 }
                    helperText={this.state.endOfEnrollmentDateErr}
                    margin="normal"
                    id="date-picker-inline"
                    label="End Of Enrollment Date"
                    value={this.state.endOfEnrollmentDate}
                    onChange={(value)=>this.setState({endOfEnrollmentDate : value})}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                    </Grid>
                    <Grid item md>
                  <TextField
                  label={"Intake"}
                  error={this.state.intakeErr.length > 0}
                  helperText={this.state.intakeErr}
                  value={this.state.intake}
                  name={"intake"}
                  onChange={this.handleChange}
                  />
                    </Grid>
                    <Grid item md>
                  <TextField
                  label={"Year"}
                  value={this.state.year}
                  error={this.state.yearErr.length > 0}
                  helperText={this.state.yearErr}
                  name={"year"}
                  type="number"
                  onChange={this.handleChange}
                  />
                    </Grid>
                    <Grid item md>
                  <TextField
                  label={"Pricing"}
                  value={this.state.pricing}
                  name={"pricing"}
                  type="number"
                  error={this.state.pricingErr.length > 0}
                  helperText={this.state.pricingErr}
                 InputProps={{startAdornment : "₹"}}
                  onChange={this.handleChange}
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
            </MuiPickersUtilsProvider>
        )
    }
}
const mapStateToProps=(state)=>{
  return {
    getProductVarientList: state.ProductReducer.getProductVarient,
    postProductVarientList:  state.ProductReducer.postProductVarient,
    updateProductVarientList: state.ProductReducer.updateProductVarient,
    allProductImages : state.ProductReducer.allProductImages,
    allProductVideos : state.ProductReducer.allProductVideos,
    allProductQuesAns : state.ProductReducer.allProductQuesAns,
    productFamilyList : state.ProductReducer.productFamilyList
    
  }
}
export default connect(mapStateToProps,{getProductVarient,postProductVarient, updateProductVarient, getAllProductImages, getAllProductVideos, getAllProductQuesAns, getAllProductFamily})(ProductVarient)