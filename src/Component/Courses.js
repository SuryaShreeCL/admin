import React, { Component,forwardRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
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
     Slide
    } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from "@material-ui/icons/Close";
import {connect} from 'react-redux'
import {getCourses, getPaginateCourse,addCourses,updateCourse, deleteCourse} from '../Actions/Course'
import TableComponent from "./TableComponent/TableComponent";

export class Courses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            id : "",
            name : "",
            shortName : "",
            description : "",
            lmsURL : "",
            displayImageURL : "",
            thumnailImageURL : "",
            bannerURL : "",
            show : false,
        }
    }

    
      rowClick = (rowData) => {
      };
    componentDidMount() { 
        this.props.getPaginateCourse(0, 20,null);         
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
    console.log(data)
    this.setState({
      id : data.id,
      name : data.name,
      show : true,
    })
  } 
   // Dialog Open
   handleClickOpen = (e) => {
    this.setState({
       show: true,
      id : "",
      name : "",
      description : "",
      });
  };
  // Delete
    handleDelete = (data) =>{
      // this.props.deleteCourse(data.courseId)
    }
    // Add Course
    newCourse = () =>{
      this.setState({ show: false });
      let newCourseObj = {
        name: this.state.name,
        description : this.state.description,
      };
      if (this.state.name.length !== 0) {
        this.props.addCourses(newCourseObj);
        this.setState({
          id: "",
          name: "",
          description : "",
        });
      }
      this.props.getPaginateCourse(0, 20,null);    
      }
  // Update Course
  updateCourse = () =>{
      this.setState({ show: false });
  let newCourseObj = {
    id : this.state.id,
    name: this.state.name,
    description : this.state.description,
  };
  if (this.state.name.length !== 0) {
    this.props.updateCourse(newCourseObj);
    this.setState({
      id: "",
      name: "",
      description : "",
      update: true,
    });      
  }
  this.props.getPaginateCourse(0, 20,null);    
}
 column = [
    { title: 'Id', fieldName:'courseId'},
    { title: 'Name', fieldName:'name'},
];
    render() {  
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
                  onDelete = {true}
                  onDeleteClick = {this.handleDelete}
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
                  <TextField
                      variant="outlined"
                      color="primary"
                      label="Enter Course Name"
                      fullWidth
                      value={this.state.name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                      multiline
                    />
                    <TextField
                      variant="outlined"
                      color="primary"
                      label="Description"
                      rowsMin={3}
                      multiline
                      fullWidth
                      value={this.state.description}
                      onChange={(e) =>
                        this.setState({ description: e.target.value })
                      }
                    /> 
                   
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
    }
}

export default connect(mapStateToprops,{getCourses,getPaginateCourse,addCourses,updateCourse,deleteCourse})(Courses)
