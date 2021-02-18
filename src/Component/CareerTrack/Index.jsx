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
      courseId: null,
      departmentId: null,
      displayImageURL: "",
      type: "",
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
    this.setState({ openModel: true, label: "Create" ,name:'' ,type :'' ,departmentId :null,courseId :null });
  };

  openUpdateModel=(data)=>{
      // Update Model
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
                onChange={(e,newValue)=>this.setState({courseId : newValue.id})}
                getOptionLabel={(option) => option.name}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Course Name" variant="outlined" />}
              />
              </Grid>             
              <Grid item xs={12} sm={6} md={6}>
                {/* Select Department */}
                <Autocomplete
                id="combo-box-demo"
                options={this.props.departmentList}
                onChange={(e,newValue)=>this.setState({departmentId : newValue.id})}
                getOptionLabel={(option) => option.name}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Department Name" variant="outlined" />}
              />
              </Grid>             

              <Grid item xs={12} sm={6} md={6}>
                {/* Type */}
                <TextField
                  label={"Type"}
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

  doUpdateCareerTrackApp=()=>{
      // Update Career Track App
      const {name,type,courseId,departmentId,displayImageURL,id} = this.state
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

  handleRowClick=(rowData)=>{
    history.push(careerTrackPath+`/${rowData.id}`+careerTrackVideoSetPath)
  }

  componentDidMount(){
    this.props.getCourses()
    this.props.getBranches()
    this.props.viewAllCareerTrack()
  }


  render() {            
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

