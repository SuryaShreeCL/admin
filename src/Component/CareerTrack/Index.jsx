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
import { careerTrackPath, careerTrackVideoSetPath } from "../RoutePaths";
import history from '../History'

export default class Index extends Component {
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
      courseId: "",
      departmentId: "",
      displayImageURL: "",
      type: "",
      label: "",
    };
  }

  column = [
    { title: "Name", fieldName: "name" },
    { title: "Course Name", fieldName: "courseName" },
    { title: "Department Name", fieldName: "departmentName" },
    { title: "Display Image Url", fieldName: "displayImageURL" },
    { title: "Type", fieldName: "type" },
  ];

  openCreateModel = () => {
    this.setState({ openModel: true, label: "Create" ,name:'' ,type :'' });
  };

  openUpdateModel=(data)=>{
      // Update Model
      this.setState({
          openModel:true,          
          name:data.name,
          type:data.type,
          label:'Update',
          displayImageURL: data.displayImageURL     
      })
  }

  renderCreateModel = () => {
    const { openModel, label } = this.state;
    const { doCreateCareerTrackApp } =this
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
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Course Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.courseId}
                    onChange={(e) => {
                      this.setState({ courseId: e.target.value });
                    }}
                    label="Course Name"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Starter Pack</MenuItem>                    
                  </Select>
                </FormControl>
              </Grid>             
              <Grid item xs={12} sm={6} md={6}>
                {/* Select Department */}
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Department Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.departmentId}
                    onChange={(e) => {
                      this.setState({ departmentId: e.target.value });
                    }}
                    label="Department Name"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Computer Science</MenuItem>                    
                  </Select>
                </FormControl>
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
            onClick={doCreateCareerTrackApp}
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
      let obj={        
        name:name,
        type:type,
        courseId:courseId,
        departmentId:departmentId,      
        displayImageURL:displayImageURL,
      }
      console.log("data is created",obj)
  }

  doUpdateCareerTrackApp=()=>{
      // Update Career Track App
      const {name,type,courseId,departmentId,displayImageURL} = this.state
      let obj={        
        name:name,
        type:type,
        courseId:courseId,
        departmentId:departmentId,   
        displayImageURL:displayImageURL,   
      }      
  }

  handleRowClick=(rowData)=>{
    history.push(careerTrackPath+careerTrackVideoSetPath)
  }

  

  render() {
    const { careerTrackAppList } = this.state;
    const { column, openCreateModel ,openUpdateModel ,handleRowClick} = this;
    return (
      <div>        
        <TableComponent
          title={"Career Track"}
          data={careerTrackAppList.length !== 0 ? careerTrackAppList : null}
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
          totalCount={careerTrackAppList.length}          
          pageCount={careerTrackAppList.length}

        />             

        {this.renderCreateModel()}
      </div>
    );
  }
}
