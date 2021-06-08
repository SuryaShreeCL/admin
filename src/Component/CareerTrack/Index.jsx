import React, { Component } from "react";
import TableComponent from "../TableComponent/TableComponent";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Grid, TextField } from "@material-ui/core";
import {getCourses} from "../../Actions/Course";
import {getBranches} from "../../Actions/College"
import {viewAllCareerTrack,addCareerTrack ,updateCareerTrack} from "../../Actions/CareerTrackAction"
import { careerTrackPath, careerTrackVideoSetPath } from "../RoutePaths";
import history from '../History'
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios";
import {connect} from 'react-redux';
import { isEmptyString } from "../Validation";
export class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      careerTrackAppList: [
        {
          name: "INTERNET_OF_THINGS",
          courseName: "Starter Pack",
          departmentName: "Computer Science",
          displayImageURL:
            "https://mobileapp-clabs.s3.ap-south-1.amazonaws.com/19362653.jpg",
          type: "null",
        },
      ],
      openModel: false,
      name: "",
      nameErr : "",
      courseId: null,
      courseErr : "",
      departmentId: null,
      deptErr : "",
      displayImageURL: "",
      imgUrlErr : "",
      type: "",
      typeErr : "",
      label: "",
      id:"",
    };
  }

  column = [
    { title: "Name", fieldName: "name" },
    { title: "Course Id", fieldName: "courseId" },
    { title: "Department Name", fieldName: "belongsTo.name" },
    { title: "Display Image Url", fieldName: "displayImageURL" },
    { title: "Type", fieldName: "type" },
  ];

  openCreateModel = () => {
    this.setState({ openModel: true,
       label: "Create" ,
       name:'' ,type :'' ,
       departmentId :null,
       courseId :null,
       displayImageURL : "",
       nameErr : "",
       deptErr : "",
       courseErr : "",
       imgUrlErr : ""
       });
  };

  openUpdateModel=(data)=>{
      // Update Model
      console.log(data)
      this.setState({
          openModel:true,          
          name:data.name,
          type:data.type,
          label:'Update',
          displayImageURL: data.displayImageURL,
          id:data.id          
      })
  }

  renderCreateModel = () => {
   
    const { openModel, label, courseList } = this.state;
    const { doCreateCareerTrackApp ,doUpdateCareerTrackApp } =this
    return (
      <Dialog
        fullWidth={"sm"}
        maxWidth={"md"}
        aria-labelledby="max-width-dialog-title"
        open={openModel}
      >
        <DialogTitle id="max-width-dialog-title">{label}</DialogTitle>

        <DialogContent>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                {/* Name */}
                <TextField
                  label={"Name"}
                  helperText={this.state.nameErr}
                  error={this.state.nameErr.length > 0}
                  variant={"outlined"}
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                {/* Select Course */}
                <Autocomplete
                id="combo-box-demo"
                options={this.props.courseList}
                onChange={(e,newValue)=>
                  // this.setState({courseId : newValue.id})
                // console.log(newValue)
                this.setState({courseId : newValue !== null ? newValue.id : null})
                }
                getOptionLabel={(option) => option.name}
                fullWidth
                renderInput={(params) => <TextField 
                  {...params} 
                  helperText={this.state.courseErr}
                  error={this.state.courseErr.length > 0}
                  label="Course Name" 
                  variant="outlined" />}
              />
              </Grid>             
              <Grid item xs={12} sm={6} md={6}>
                {/* Select Department */}
                <Autocomplete
                id="combo-box-demo"
                options={this.props.departmentList}
                onChange={(e,newValue)=>this.setState({departmentId : newValue !== null ? newValue.id : null})}
                getOptionLabel={(option) => option.name}
                fullWidth
                renderInput={(params) => <TextField
                   {...params}
                    label="Department Name" 
                    helperText={this.state.deptErr}
                    error={this.state.deptErr.length > 0}
                    variant="outlined" />}
              />
              </Grid>             

              <Grid item xs={12} sm={6} md={6}>
                {/* Type */}
                <TextField
                  label={"Type"}
                  helperText={this.state.typeErr}
                  error={this.state.typeErr.length > 0}
                  variant={"outlined"}
                  value={this.state.type}
                  onChange={(e) => this.setState({ type: e.target.value })}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                {/* display image url */}
                <TextField
                  label={"Display Image URL"}
                  variant={"outlined"}
                  helperText={this.state.imgUrlErr}
                  error={this.state.imgUrlErr.length > 0}
                  value={this.state.displayImageURL}
                  onChange={(e) => this.setState({ displayImageURL: e.target.value })}
                  fullWidth
                />
              </Grid>

            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={(e) => this.setState({ openModel: false })}
          >
            Close
          </Button>
          <Button
            color="primary"
            onClick={label==='Create' ? doCreateCareerTrackApp : doUpdateCareerTrackApp}
          >
            {label}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  doCreateCareerTrackApp=()=>{      
      //Create Career Track      

      const {name,type,courseId,departmentId,displayImageURL} = this.state
      let hlpTxt = "Please Fill The Required Feild"
      isEmptyString(name) ? this.setState({nameErr : hlpTxt}) : this.setState({nameErr : ""})
      isEmptyString(type) ? this.setState({typeErr : hlpTxt}) : this.setState({typeErr : ""})
      isEmptyString(courseId) ? this.setState({courseErr : hlpTxt}) : this.setState({courseErr : ""})
      isEmptyString(departmentId) ? this.setState({deptErr : hlpTxt}) : this.setState({deptErr : ""})
      isEmptyString(displayImageURL) ? this.setState({imgUrlErr : hlpTxt}) : this.setState({imgUrlErr : ""})
      
      if(
        !isEmptyString(name) &&
        !isEmptyString(type) &&
        !isEmptyString(courseId) &&
        !isEmptyString(departmentId) &&
        !isEmptyString(displayImageURL)
      ){
        let obj = {
          name: name,
          courseId: courseId,
          belongsTo: {
            departmentId: departmentId,
          },
          displayImageURL:
            displayImageURL,
          type: type,
        };
        this.props.addCareerTrack(obj)
        this.props.viewAllCareerTrack()
        this.setState({openModel:false})
  
      }

     
  }

  doUpdateCareerTrackApp=()=>{
      // Update Career Track App
      const {name,type,courseId,departmentId,displayImageURL,id} = this.state
      let hlpTxt = "Please Fill The Required Feild"
      isEmptyString(name) ? this.setState({nameErr : hlpTxt}) : this.setState({nameErr : ""})
      isEmptyString(type) ? this.setState({typeErr : hlpTxt}) : this.setState({typeErr : ""})
      isEmptyString(courseId) ? this.setState({courseErr : hlpTxt}) : this.setState({courseErr : ""})
      isEmptyString(departmentId) ? this.setState({deptErr : hlpTxt}) : this.setState({deptErr : ""})
      isEmptyString(displayImageURL) ? this.setState({imgUrlErr : hlpTxt}) : this.setState({imgUrlErr : ""})
     
      if(
        !isEmptyString(name) &&
        !isEmptyString(type) &&
        !isEmptyString(courseId) &&
        !isEmptyString(departmentId) &&
        !isEmptyString(displayImageURL)
      ){
        let obj={        
          name:name,
          type:type,
          courseId:courseId,
          belongsTo: {
            departmentId:departmentId
        },
          displayImageURL:displayImageURL,   
          id:id
        }
        this.props.updateCareerTrack(obj,(response)=>{
          this.props.viewAllCareerTrack()
          this.setState({openModel:false})
        })
      }

      
  }

  handleRowClick=(rowData)=>{
    this.props.history.push(careerTrackVideoSetPath+rowData.id)
  }

  componentDidMount(){
    this.props.getCourses()
    this.props.getBranches()
    this.props.viewAllCareerTrack()
  }


  render() {           
    console.log(this.state) 
    const { careerTrackList } = this.props;
    const { column, openCreateModel ,openUpdateModel ,handleRowClick} = this;
    return (
      <div>        
        <TableComponent
          title={"Career Track"}
          data={careerTrackList.length !== 0 ? careerTrackList : null}
          cols={column}
          add={true}
          action={true}
          onEdit={true}
          onDelete={true}
          // Actions
          onAddClick={openCreateModel}
          onEditClick={openUpdateModel}
          onRowClick={handleRowClick}

          // Paginate
          paginate={()=>{}}
          totalCount={careerTrackList.length}          
          pageCount={careerTrackList.length}

        />             

        {this.renderCreateModel()}
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
    courseList: state.CourseReducer.CourseList,
    departmentList: state.CollegeReducer.BranchList,
    careerTrackList : state.CareerTrackReducer.careerTrackList,
  }
}
export default connect(mapStateToProps,{getCourses,getBranches,viewAllCareerTrack,addCareerTrack ,updateCareerTrack})(Index)

