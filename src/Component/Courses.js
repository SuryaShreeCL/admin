import React, { Component,forwardRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import {
     Button,
     Dialog,
     DialogTitle,
     IconButton,
     TextField,
     DialogActions,
     DialogContent, 
     CircularProgress,
     Slide,
     Grid,
    } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from "@material-ui/icons/Close";
import {connect} from 'react-redux'
import {getCourses, getPaginateCourse,addCourses,updateCourse, deleteCourse,getAdvanceCourse,getDomain,getProductVarient} from '../Actions/Course'
import TableComponent from "./TableComponent/TableComponent";
import {isEmptyString} from './Validation'
import MySnackBar from './MySnackBar';

export class Courses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            id : "",
            courseId : "",
            name : "",
            shortName : "",
            description : "",
            lmsURL : "",
            displayImageURL : "",
            thumnailImageURL : "",
            bannerURL : "",
            show : false,
            nameErr:"",
            shortNameErr:"",
            descErr:"",
            lmsErr:"",
            displayImageURLErr:"",
            thumbnailErr:"",
            bannerURLErr:"",
            snackMsg: "",
            snackVariant: "",
            snackOpen: false,
            domain : "",
            subdomain : "",
            productvariant : "",
            advancecourse : "",
            domainList : [],
            subdomainList : [],
            advancedCourseList : [],
        }
    }

    
      rowClick = (rowData) => {
      };
    componentDidMount() { 
        this.props.getPaginateCourse(0, 20,null);  
        this.props.getDomain("domain",(response => {
          if(response.data.success){
             this.setState({
               domainList : response.data
             })
          }
        }))    
        this.props.getDomain("subDomain",(response => {
          if(response.data.success){
             this.setState({
               subdomainList : response.data
             })
          }
        }))       
        this.props.getProductVarient();
    }
    componentDidUpdate(prevProps,prevState){
      if(this.props.getAdvanceCourseList !== prevProps.getAdvanceCourseList){
        this.setState({
          advancedCourseList : this.props.getAdvanceCourseList.data
        })
      }
      if(this.props.courseFilterList !== prevProps.courseFilterList){
        this.setState({
          advancedCourseList : this.props.courseFilterList.content
        })
      }
    }
    // Paginate For Course
    paginate = (page, size, keyword) => {
        this.props.getPaginateCourse(page, size, keyword);
      };
    // Table Theme
    tableTheme = () =>
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
spinnerTheme = () =>createMuiTheme({
    overrides :{
      MuiCircularProgress :  {
        colorPrimary:{
          color: "#009be5"
        }
      }
    }
  });
  handleEdit = (data) =>{
    this.props.getAdvanceCourse(data.id,(response => {
      if(response.status === 200){
        this.setState({
          advancedCourseList : response.data.data,
          show: true,
        })
      }
    }))
    console.log(data)
    this.setState({
      name : "Edit",
      id: data.id,
      name: data.name,
      courseId: data.courseId,
      description: data.description,
      lmsURL: data.lmsURL,
      shortName: data.shortName,
      displayImageURL: data.displayImageURL,
      thumnailImageURL: data.thumnailImageURL,
      advancecourse: data.advancedCourse,
      domain: data.domain,
      subdomain: data.subDomains,
      productvariant: data.productVariant,
    });
  } 
   // Dialog Open
   handleClickOpen = (e) => {
    this.setState({
       show: true,
       id: "",
          courseId : "",
          name: "",
          shortName : "",
          description : "",
          lmsURL : "",
          displayImageURL : "",
          thumnailImageURL : "",
          domain : "",
          subdomain : "",
          productvariant : "",
          advancecourse : "",
      });

  };
  // Delete
    handleDelete = (data) =>{
      // this.props.deleteCourse(data.id)
    }
    // Add Course
    newCourse = () =>{
      let hlptxt = "please fill the Required field"
      isEmptyString(this.state.name) ? this.setState ({ nameErr: hlptxt }) : this.setState({ nameErr :""})
      isEmptyString(this.state.lmsURL) ? this.setState ({ lmsErr : hlptxt }) : this.setState({ lmsErr :""})
      isEmptyString(this.state.shortName) ? this.setState ({ shortNameErr: hlptxt }) : this.setState({ shortNameErr :""})
      isEmptyString(this.state.description) ? this.setState ({ descErr: hlptxt }) : this.setState({descErr :""})
      isEmptyString(this.state.displayImageURL) ? this.setState ({ displayImageURLErr: hlptxt }) : this.setState({ displayImageURLErr:""})
      isEmptyString(this.state.thumnailImageURL) ? this.setState ({ thumbnailErr: hlptxt }) : this.setState({thumbnailErr :""})
      // this.setState({ show: false });
      let newCourseObj = {
        courseId : this.state.courseId,
        name: this.state.name,
        shortName : this.state.shortName,
        description : this.state.description,
        lmsURL : this.state.lmsURL,
        displayImageURL : this.state.displayImageURL,
        thumnailImageURL : this.state.thumnailImageURL,
        advancedCourse: [this.state.advancecourse],
        courseDomains: [this.state.domain],
        courseSubDomains: [this.state.subdomain],
        productVariant: [this.state.productvariant],
      };
      if (this.state.name.length !== 0 &&
            !isEmptyString(this.state.lmsURL) &&
            !isEmptyString(this.state.description) &&
            !isEmptyString(this.state.displayImageURL) &&
            !isEmptyString(this.state.thumnailImageURL) &&
            !isEmptyString(this.state.shortName) 
        ) {
        this.props.updateCourse(newCourseObj);
        this.setState({
          show : false,
          id: "",
          courseId : "",
          name: "",
          shortName : "",
          description : "",
          lmsURL : "",
          displayImageURL : "",
          thumnailImageURL : "",
          snackMsg:"Added Successfully",
          snackOpen:true,
          snackVariant:"success",
          domain : "",
          subdomain : "",
          productvariant : "",
          advancecourse : "",
        });
      }
      this.props.getPaginateCourse(0, 20,null);    
      }
  // Update Course
  updateCourse = () =>{
    let hlptxt = "please fill the Required field"
    isEmptyString(this.state.name) ? this.setState ({ nameErr: hlptxt }) : this.setState({ nameErr :""})
    isEmptyString(this.state.lmsURL) ? this.setState ({ lmsErr : hlptxt }) : this.setState({ lmsErr :""})
    // isEmptyString(this.state.shortName) ? this.setState ({ shortNameErr: hlptxt }) : this.setState({ shortNameErr :""})
    isEmptyString(this.state.description) ? this.setState ({ descErr: hlptxt }) : this.setState({descErr :""})
    isEmptyString(this.state.displayImageURL) ? this.setState ({ displayImageURLErr: hlptxt }) : this.setState({ displayImageURLErr:""})
    isEmptyString(this.state.thumnailImageURL) ? this.setState ({ thumbnailErr: hlptxt }) : this.setState({thumbnailErr :""})
      // this.setState({ show: false });
  let newCourseObj = {
    id: this.state.id,
    courseId: this.state.courseId,
    name: this.state.name,
    shortName: this.state.shortName,
    description: this.state.description,
    lmsURL: this.state.lmsURL,
    displayImageURL: this.state.displayImageURL,
    thumnailImageURL: this.state.thumnailImageURL,
    advancedCourse: [this.state.advancecourse],
    courseDomains: [this.state.domain],
    courseSubDomains: [this.state.subdomain],
    productVariant: [this.state.productvariant],
  };
  if (this.state.name.length !== 0 &&
    !isEmptyString(this.state.lmsURL) &&
    !isEmptyString(this.state.description) &&
    !isEmptyString(this.state.displayImageURL) &&
    !isEmptyString(this.state.thumnailImageURL) &&
    !isEmptyString(this.state.shortName) 
    ) {
    this.props.updateCourse(newCourseObj);
    this.setState({
      id: "",
      show :false,
      courseId : "",
      name: "",
      shortName : "",
      description : "",
      lmsURL : "",
      displayImageURL : "",
      thumnailImageURL : "",
      update: true,
      snackMsg:"Updated Successfully",
      snackOpen:true,
      snackVariant:"success",
      domain : "",
      subdomain : "",
      productvariant : "",
      advancecourse : "",
    });      
  }
  this.props.getPaginateCourse(0, 20,null);    
}
 column = [
    { title: 'Id', fieldName:'courseId'},
    { title: 'Name', fieldName:'name'},
    { title: 'Parent Branch', fieldName:'parentBranchVal'},
];
renderOption = () => {
  if(this.state.id === ""){
    return this.props.getPaginateCourse.content
  }
  else {
    return this.props.getAdvanceCourseList.data
  }
}
    render() {  
      console.log(this.props)
      console.log(this.state)
        return (
            <ThemeProvider theme={this.tableTheme()}>
            <div>
               {this.props.courseFilterList.length !== 0 ? (
                <TableComponent
                  data={
                    this.props.courseFilterList.length !== 0
                      ? this.props.courseFilterList.content
                      : null
                  }
                  cols={this.column}
                  onRowClick={this.rowClick}
                  add={true}
                  action={true}
                  onEdit={true}  
                  // onDelete = {true}
                  // onDeleteClick = {this.handleDelete}
                  onEditClick={this.handleEdit} 
                  onAddClick={this.handleClickOpen}
                   onSearch={this.paginate}
                  paginate={this.paginate}
                  totalCount={this.props.courseFilterList.totalElements}
                  title={"Course"}
                  pageCount={this.props.courseFilterList.totalPages}
                />
              ) : (
                <ThemeProvider theme={this.spinnerTheme()}>
                <div style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "65vh",
                }}>
              <CircularProgress
             color="primary"
              variant="indeterminate"
              size = "3rem"
              thickness="3"
               />
               </div>
              </ThemeProvider>
              )} 
            </div>
             {/* add and edit Course */}
             <ThemeProvider theme={this.modeltheme()}>
                <Dialog
                maxWidth={'lg'}
                TransitionComponent={Transition}
                  open={this.state.show}
                  onClose={(e)=>this.setState({show : false})}
                  aria-labelledby="customized-dialog-title"
                >
                  <DialogTitle id="customized-dialog-title">
                    <div className="flex-1 text-center">
                      {this.state.id.length !== 0 ? "Edit Course" : "Add Course"}
                    </div>
                    <div className="model-close-button">
                      <IconButton aria-label="close" onClick={(e)=>this.setState({show : false})}>
                        <CloseIcon />
                      </IconButton>
                    </div>
                  </DialogTitle>
                  <DialogContent>
                  <Grid container spacing={2}>
                  <Grid item md={2}>
                  <TextField
                      variant="outlined"
                      color="primary"
                      label="Enter Course ID"
                      fullWidth
                      value={this.state.courseId}
                      onChange={(e) => this.setState({ courseId: e.target.value })}
                      multiline
                    />
                    </Grid>
                    <Grid item md={2}>
                  <TextField
                      variant="outlined"
                      color="primary"
                      label="Enter Course Name"
                      error={this.state.nameErr.length > 0}
                      helperText={this.state.nameErr}
                      fullWidth
                      value={this.state.name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                      multiline
                    />
                    </Grid>
                    <Grid item md={4}>
                  <TextField
                      variant="outlined"
                      color="primary"
                      label="Enter Short Name"
                      error={this.state.shortNameErr.length > 0}
                      helperText={this.state.shortNameErr}
                      fullWidth
                      value={this.state.shortName}
                      onChange={(e) => this.setState({ shortName: e.target.value })}
                      multiline
                    />
                    </Grid>
                    <Grid item md={4}>
                    <TextField
                      variant="outlined"
                      color="primary"
                      label="Description"
                      rowsMin={3}
                      multiline
                      error={this.state.descErr.length > 0}
                      helperText={this.state.descErr}
                      fullWidth
                      value={this.state.description}
                      onChange={(e) =>
                        this.setState({ description: e.target.value })
                      }
                    /> 
                    </Grid>
                    <Grid item md={4}>
                  <TextField
                      variant="outlined"
                      color="primary"
                      label="Enter LMS Url"
                      fullWidth
                      value={this.state.lmsURL}
                      error={this.state.lmsErr.length > 0}
                      helperText={this.state.lmsErr}
                      onChange={(e) => this.setState({ lmsURL: e.target.value })}
                      multiline
                    />
                    </Grid>
                    <Grid item md={4}>
                  <TextField
                      variant="outlined"
                      color="primary"
                      label="Enter Display Image Url"
                      fullWidth
                      value={this.state.displayImageURL}
                      error={this.state.displayImageURLErr.length > 0}
                      helperText={this.state.displayImageURLErr}
                      onChange={(e) => this.setState({ displayImageURL: e.target.value })}
                      multiline
                    />
                    </Grid>
                    <Grid item md={4}>
                  <TextField
                      variant="outlined"
                      color="primary"
                      label="Enter Thumbnail Image Url"
                      fullWidth
                      value={this.state.thumnailImageURL}
                      error={this.state.thumbnailErr.length > 0}
                      helperText={this.state.thumbnailErr}
                      onChange={(e) => this.setState({ thumnailImageURL: e.target.value })}
                      multiline
                    />
                    </Grid>
                    <Grid item md={4}>
                    <Autocomplete
                        // multiple
                        options={this.state.domainList.data || []}
                        getOptionLabel={(option) => option.name}
                        value={this.state.domain}
                        onChange={(e,newValue)=>this.setState({ domain : newValue})}
                        renderInput={(params) => 
                        <TextField {...params} 
                        label="Domain" 
                        variant="outlined" />}
                      />
                    </Grid>
                    <Grid item md={4}>
                    <Autocomplete
                        // multiple
                        options={this.state.subdomainList.data || []}
                        getOptionLabel={(option) => option.name}
                        value={this.state.subdomain}
                        onChange={(e,newValue)=>this.setState({ subdomain : newValue})}
                        renderInput={(params) => 
                        <TextField {...params} 
                        label="Sub Domain" 
                        variant="outlined" />}
                      />
                    </Grid>
                    <Grid item md={4}>
                    <Autocomplete
                        // multiple
                        options={this.props.getProductVarientList.data || []}
                        getOptionLabel={(option) => option.name}
                        value={this.state.productvariant}
                        onChange={(e,newValue)=>this.setState({ productvariant : newValue})}
                        renderInput={(params) => 
                        <TextField {...params} 
                          label="Product Variant" 
                          variant="outlined" 
                        />}
                      />
                    </Grid>
                    <Grid item md={4}>
                    <Autocomplete
                        // multiple
                        options={this.state.advancedCourseList || []}
                        getOptionLabel={(option) => option.name}
                        value={this.state.advancecourse}
                        onChange={(e,newValue)=>this.setState({ advancecourse : newValue})}
                        renderInput={(params) => 
                        <TextField {...params} 
                            label="Advanced Course" 
                            variant="outlined" 
                        />
                      }
                      />
                    </Grid>
                   </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={
                        this.state.id.length === 0
                          ? this.newCourse
                          : this.updateCourse
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
             <MySnackBar
               snackMsg={this.state.snackMsg}
               snackVariant={this.state.snackVariant}
               snackOpen={this.state.snackOpen}
               onClose={() => this.setState({ snackOpen: false })}
             />
          </ThemeProvider>

        )
    }
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const mapStateToprops=(state)=>{
    console.log(state);
    return{
      CourseList:state.CourseReducer.CourseList,
      courseFilterList: state.CourseReducer.courseFilterList,
      getAdvanceCourseList : state.CourseReducer.AdvanceCourse,
      getProductVarientList : state.CourseReducer.ProductVariant
    }
}

export default connect(mapStateToprops,{getCourses,getPaginateCourse,addCourses,updateCourse,deleteCourse,getAdvanceCourse,getDomain,getProductVarient})(Courses)
