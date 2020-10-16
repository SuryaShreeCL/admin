import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "../Asset/EditCourse.css";
import $ from "jquery";
import axios from "axios";
import Select from "react-select";
import {connect} from 'react-redux'
import {getCoursesById,updateCourse} from '../Actions/Course'
import { coursePath } from './RoutePaths'


export class EditCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      option: [
        { value: "Starter", label: "Starter" },
        { value: "Regular", label: "Regular" },
        { value: "Advance", label: "Advance" },
      ],
      courseId:'',
      courseName:'',
      courseDescription:'',      
      lmsUrl:'',
      displayUrl:'',
      thumbnailUrl:'',      
    };
  }

  options = [{ value: "chocolate", label: "Chocolate" }];

  componentDidMount() {
   this.props.getCoursesById(this.props.match.params.id);
    $("#inputGroupFile01").on("change", function() {
      //get the file name
      var fileName0 = $(this).val();
      //replace the "Choose a file" label
      $(this)
        .next(".f1")
        .html(fileName0);
    });
    $("#inputGroupFile02").on("change", function() {
      //get the file name
      var fileName1 = $(this).val();
      //replace the "Choose a file" label
      $(this)
        .next(".f2")
        .html(fileName1);
    });
    $("#inputGroupFile03").on("change", function() {
      //get the file name
      var fileName2 = $(this).val();
      //replace the "Choose a file" label
      $(this)
        .next(".f3")
        .html(fileName2);
    });
  }

  getmuitheme = () =>
    createMuiTheme({
      palette: {
        primary: {
          main: "#007bff",
        },
      },
      overrides: {
        MuiFormLabel: {
          root: {
            fontSize: "16px",
          },
        },
      },
    });

    handleClick(e){  
      if(this.state.courseId !==''){
        let courseObj={
          courseId: this.state.courseId,
          name: this.state.courseName,
          description: this.state.courseDescription,
          lmsURL: this.state.lmsUrl,
          displayImageURL: this.state.displayUrl,
          thumnailImageURL: this.state.thumbnailUrl,
          courseLevel:'',
        };
        this.props.updateCourse(this.props.CourseListById.id,courseObj);
        this.props.history.push(coursePath);
      }      
    }   
    componentDidUpdate(prevProps,nextProps){
      if(prevProps !==nextProps){
        if(this.state.courseId===''){
          this.setState({
            courseId:this.props.CourseListById.courseId,
            courseName:this.props.CourseListById.name,
            courseDescription:this.props.CourseListById.description,
            lmsUrl:this.props.CourseListById.lmsURL,
            displayUrl:this.props.CourseListById.displayImageURL,
            thumbnailUrl:this.props.CourseListById.thumnailImageURL,
          });  
        }    
      }
    }

  render() {                                 
    return (
      <ThemeProvider theme={this.getmuitheme()}>
        <div>          
          <div className="edit-course-root container">
            <div className="edit-course-content">
              <div className="edit-form-header">
                <div className="edit-header-label">
                  <label>Edit Course Detail</label>
                </div>
              </div>
              <div className="edit-body">
                <div className="edit-row-1 ">
                  <TextField                    
                    label="Course Id"                    
                    variant="outlined"
                    type='text'
                    size="small"
                    className="edit-text-box t1 col-xs-12"
                    value={this.state.courseId}
                    onChange={(e)=>this.setState({courseId:e.target.value})}
                    disabled
                  />
                  <TextField                    
                    label="Course Name"                    
                    variant="outlined"
                    type='text'
                    size="small"
                    className="edit-text-box t2"
                    value={this.state.courseName}
                    onChange={(e)=>this.setState({courseName:e.target.value})}
                  />
                </div>
                <div className="edit-row-2 ">
                  <TextField                    
                    label="Course Description"                    
                    variant="outlined"
                    type='text'
                    size="small"
                    fullWidth
                    multiline
                    className="course-desc"
                    value={this.state.courseDescription}
                    onChange={(e)=>this.setState({courseDescription:e.target.value})}
                  />
                </div>
                <div className="edit-row-3">
                  {/* <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="inputGroupFile01" />
                                        <label class="custom-file-label f1" for="inputGroupFile01">lms Url</label>
                                    </div>

                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="inputGroupFile02" />
                                        <label class="custom-file-label f2" for="inputGroupFile02">display Image URL</label>
                                    </div>

                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="inputGroupFile03" />
                                        <label class="custom-file-label f3" for="inputGroupFile03">thumnail Image URL</label>
                                    </div> */}

                  <TextField                    
                    label="Lms Url"                    
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    className="course-desc"
                    value={(this.state.lmsUrl !== null) ? this.state.lmsUrl : '' }
                    onChange={(e)=>this.setState({lmsUrl:e.target.value})}
                  />

                  <TextField                    
                    label="Display Image Url"                    
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    className="course-desc"
                    value={this.state.displayUrl}
                    onChange={(e)=>this.setState({displayUrl:e.target.value})}
                  />

                  <TextField                    
                    label="thumnail Image URL"                    
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    className="course-desc"
                    value={this.state.thumbnailUrl}
                    onChange={(e)=>this.setState({thumbnailUrl:e.target.value})}
                  />
                </div>
                <div className="edit-row-4">
                  <Select
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    isClearable={true}
                    options={this.state.option}
                    placeholder="Course Level"
                  />

                  <Select
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    isClearable={true}
                    options={this.state.option}
                    placeholder="tags"
                  />
                </div>
                <div className="edit-row-5">
                  <Select
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    isClearable={true}
                    options={this.state.option}
                    placeholder="Similar Courses"
                  />

                  <Select
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    isClearable={true}
                    options={this.state.option}
                    placeholder="vendor"
                  />
                </div>
                <div className="edit-row-6">
                  <Select
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    isClearable={true}
                    fullWidth
                    options={this.state.option}
                    placeholder="Skill  provided"
                  />
                </div>
                <div className="edit-row-7">
                <Button
                  variant="contained"
                  color="secondary"                                    
                  size="medium"    
                  onClick={(e)=>this.props.history.push(coursePath)}                            
                >
                 Cancel
                </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    className='margin-left-space'
                    size="medium"
                    startIcon={<SaveIcon />}
                    onClick={this.handleClick.bind(this)}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToprops=(state)=>{  
  return{CourseListById:state.CourseReducer.CourseById}
}

export default connect(mapStateToprops,{getCoursesById,updateCourse})(EditCourse);

