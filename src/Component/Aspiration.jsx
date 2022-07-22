import React, { Component } from "react";
import MaterialTable from "material-table";
import { tableIcons } from "./MaterialTableIcon";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios"
import {URL} from "../Actions/URL"
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  Tab,
  Tabs,
  Snackbar,
} from "@material-ui/core";
import Axios from "axios";
import { event } from "jquery";
export default class Aspiration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addTermDialog: false,
      addDegereeDialog: false,
      addFeildOfStudyDialog: false,
      addCountryDreamClg: false,
      addDreamCollegeDialog: false,
      specializationDialog: false,
      feildOfStudy : null,
      viewFeildOfStudy : [],
      degree : null,
      viewDegree : [],
      country : null,
      viewCountry : [],
      term : null,
      viewTerm : [],
      area : null,
      viewArea : [],
      college : null,
      viewCollege : [],
      countryForUniv : null,
      snack : false,
      tabValue : null,

    };
  }
  getmuitheme = () =>
    createTheme({
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
  // Add Term Dialog
  addTermDialogHandler = (event) => {
    this.setState({
      addTermDialog: true,
    });
  };
  // Add Degeree Dialog
  addDegereeDialogHandler = (event) => {
    this.setState({
      addDegereeDialog: true,
    });
  };
  // Add Feild Of Study Dialog
  addFeildOfStudyDialogHandler = (event) => {
    this.setState({
      addFeildOfStudyDialog: true,
    });
  };
  // Add Country Dream College Dialog
  addCountryOfDreamClgHandler = (event) => {
    this.setState({
      addCountryDreamClg: true,
    });
  };
  // Add Dream College Dialog
  addDreamCollegeDialog = (event) => {
    this.setState({
      addDreamCollegeDialog: true,
    });
  };
  // Add Area Of Specialization Dialog
  addSpecializationDialogHandler = (event) => {
    this.setState({
      specializationDialog: true,
    });
  };
  countryForUnivHandler = (event,value) =>{
    this.setState({
      countryForUniv : value
    })
  }
  // Post Feild Of Study
  postFeildOfStudy = (event) =>{
    let feildOfStudyObj = {
      name : this.state.feildOfStudy,
    }
    let feildOfStudyUrl = URL+"/aspiration/branch"
    axios
      .post(feildOfStudyUrl, feildOfStudyObj)
      .then((response) => {
       console.log(response.data)
       this.setState({addFeildOfStudyDialog : false, snack : true})
      })
      .catch((error) => {
       console.log(error)
      });
  }
  // Post Degeree
    postDegeree = (event) =>{
      let degreeObj = {
        name : this.state.degree,
      }
      let degreePostUrl = URL+"/aspiration/degree"
      axios
        .post(degreePostUrl, degreeObj)
        .then((response) => {
         console.log(response.data)
         this.setState({addDegereeDialog : false, snack : true})
        })
        .catch((error) => {
         console.log(error)
        });
    }
    // Post Country
    postCountry = (event) =>{
      let countryObj = {
        name : this.state.country,
      }
      let countryPostUrl = URL+"/aspiration/country"
      axios
        .post(countryPostUrl, countryObj)
        .then((response) => {
         console.log(response.data)
         this.setState({addCountryDreamClg : false, snack : true})
        })
        .catch((error) => {
         console.log(error)
        });
    }
    // Post Term
    postTerm = (event) =>{
      let termObj = {
        name : this.state.term,
      }
      let termPostUrl = URL+"/aspiration/terms"
      axios
        .post(termPostUrl, termObj)
        .then((response) => {
         console.log(response.data)
         this.setState({addTermDialog : false,snack : true})

        })
        .catch((error) => {
         console.log(error)
        });
    }
    // Post Area Of Specialization
    postArea = (event) =>{
      let areaObj = {
        name : this.state.area,
      }
      let areaPostUrl = URL+"/aspiration/specialization/create"
      axios
        .post(areaPostUrl, areaObj)
        .then((response) => {
         console.log(response.data)
         this.setState({specializationDialog : false, snack : true})
        })
        .catch((error) => {
         console.log(error)
        });
    }
    // Post College
    postCollege = (event) =>{
      let collegeObj = {
        name : this.state.college,
        country : {
          id : this.state.countryForUniv.id,
        }
      }
      let collegePostUrl = URL+"/aspiration/university/post"
      axios
        .post(collegePostUrl, collegeObj)
        .then((response) => {
         console.log(collegeObj)
         this.setState({addDreamCollegeDialog : false, snack : true})
        })
        .catch((error) => {
         console.log(error)
        });
    }
  // Component Did Mount
  componentDidMount(){
    // Get Feild Of Study
    let getFeildOfStudyUrl = URL+"/aspiration/branch";
    axios
      .get(getFeildOfStudyUrl)
      .then((response) => {
       this.setState({
        viewFeildOfStudy : response.data
       })
      })
      .catch((error) =>{
        console.log(error);
      });
      // Get Degree
      let getDegreeUrl = URL+"/aspiration/degree";
    axios
      .get(getDegreeUrl)
      .then((response) => {
        console.log(response.data)
       this.setState({
        viewDegree : response.data
       })
      })
      .catch((error) =>{
        console.log(error);
      });
      // Get Country
      let getCountryUrl = URL+"/aspiration/country";
    axios
      .get(getCountryUrl)
      .then((response) => {
        console.log(response.data)
       this.setState({
        viewCountry : response.data
       })
      })
      .catch((error) =>{
        console.log(error);
      });
      // Get Term
      let getTermUrl = URL+"/aspiration/terms";
    axios
      .get(getTermUrl)
      .then((response) => {
        console.log(response.data)
       this.setState({
        viewTerm : response.data
       })
      })
      .catch((error) =>{
        console.log(error);
      });
      // Get Area
      let getAreaUrl = URL+"/aspiration/specialization";
      axios
        .get(getAreaUrl)
        .then((response) => {
          console.log(response.data)
         this.setState({
          viewArea : response.data
         })
        })
        .catch((error) =>{
          console.log(error);
        });
         // Get College
      let getCollegeUrl = URL+"/aspiration/university";
      axios
        .get(getCollegeUrl)
        .then((response) => {
          console.log(response.data)
         this.setState({
          viewCollege : response.data
         })
        })
        .catch((error) =>{
          console.log(error);
        });
  }
  
  render() {
    var snackMessage = null
    if(this.state.term !== null){
      snackMessage = "Term Added Successfully"
    }else if(this.state.degree !== null){
      snackMessage = "Degree added Successfully"
    }else if(this.state.feildOfStudy !== null){
      snackMessage = "Feild Of Sudy added Successfully"
    }else if(this.state.country !== null){
      snackMessage = "Country added Successfully"
    }else if(this.state.area !== null){
      snackMessage = "Area added Successfully"
    }else if(this.state.college !== null){
      snackMessage = "College added Successfully"
    }
    return (
      <ThemeProvider theme={this.getmuitheme()}>
        <div className="aspiration">
          <Paper elevation={3}>
            <Grid container spacing={3} style={{ padding: "1%" }}>
              <Grid
                item
                md={12}
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #2c3e50, #bdc3c7)",
                  maxWidth: "98%",
                  marginLeft: "1%",
                }}
              >
                <Typography
                  variant="h6"
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Aspiration
                </Typography>
              </Grid>
              <Grid item md={12}>
              </Grid>
              <Grid item md={12}>
                {/* Term Table */}
                <MaterialTable
                  columns={[
                    {title : "ID", field : "id"},
                    {title : "Term", field : "name"}
                  ]}
                  data={this.state.viewTerm}
                  title="Term"
                  onRowClick=""
                  icons={tableIcons}
                  options={{
                    headerStyle: {
                      backgroundColor: "#01579b",
                      color: "#FFF",
                    },
                    rowStyle: {
                      background: "#f1f1f1",
                    },
                  }}
                  actions={[
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddIcon />}
                          onClick={this.addTermDialogHandler}
                          size="small"
                        >
                          Add Term
                        </Button>
                      ),
                      tooltip: "Add Term",
                      isFreeAction: true,
                      //  onClick: (event, rowData) => {
                      // history.push(addCoursePath);
                      // }
                    },
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<EditIcon />}
                          size="small"
                        >
                          Edit
                        </Button>
                      ),
                      tooltip: "Edit Term",
                      // onClick: (event, rowData) => {
                      //     history.push('courses/edit/' + rowData.id);
                      // },
                    },
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<DeleteIcon />}
                          size="small"
                          disabled
                        >
                          Delete
                        </Button>
                      ),
                      tooltip: "Delete Term",
                      // onClick: (event, rowData) => {
                      //     history.push(editCoursePath + rowData.id);
                      // }
                    },
                  ]}
                  options={{
                    actionsColumnIndex: -1,
                    headerStyle: {
                      fontWeight: "bold",
                    },
                    minBodyHeight: "420px",
                    maxBodyHeight: "420px",
                  }}
                />
              </Grid>
              <Grid item md={12}>
                {/* Degeree Table */}
                <MaterialTable
                  columns={[
                    {title : "ID", field : "id"},
                    {title : "Degeree", field : "name"}
                  ]}
                  data={this.state.viewDegree}
                  title="Degeree"
                  onRowClick=""
                  icons={tableIcons}
                  options={{
                    headerStyle: {
                      backgroundColor: "#01579b",
                      color: "#FFF",
                    },
                    rowStyle: {
                      background: "#f1f1f1",
                    },
                  }}
                  actions={[
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddIcon />}
                          onClick={this.addDegereeDialogHandler}
                          size="small"
                        >
                          Add Degeree
                        </Button>
                      ),
                      tooltip: "Add Degeree",
                      isFreeAction: true,
                      //  onClick: (event, rowData) => {
                      // history.push(addCoursePath);
                      // }
                    },
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<EditIcon />}
                          size="small"
                        >
                          Edit
                        </Button>
                      ),
                      tooltip: "Edit Degeree",
                      // onClick: (event, rowData) => {
                      //     history.push('courses/edit/' + rowData.id);
                      // },
                    },
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<DeleteIcon />}
                          size="small"
                          disabled
                        >
                          Delete
                        </Button>
                      ),
                      tooltip: "Delete Degeree",
                      // onClick: (event, rowData) => {
                      //     history.push(editCoursePath + rowData.id);
                      // }
                    },
                  ]}
                  options={{
                    actionsColumnIndex: -1,
                    headerStyle: {
                      fontWeight: "bold",
                    },
                    minBodyHeight: "420px",
                    maxBodyHeight: "420px",
                  }}
                />
              </Grid>
              <Grid item md={12}>
                {/* Feild Of Study Table It is also called as branch*/}
                <MaterialTable
                  columns={[
                      {title : "ID", field : "id"},
                      {title : "Feild Of Study", field : "name"},
                  ]}
                  data={this.state.viewFeildOfStudy}
                  title="Feild Of Study"
                  onRowClick=""
                  icons={tableIcons}
                  options={{
                    headerStyle: {
                      backgroundColor: "#01579b",
                      color: "#FFF",
                    },
                    rowStyle: {
                      background: "#f1f1f1",
                    },
                  }}
                  actions={[
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddIcon />}
                          onClick={this.addFeildOfStudyDialogHandler}
                          size="small"
                        >
                          Add Feild Of Study
                        </Button>
                      ),
                      tooltip: "Add Feild Of Study",
                      isFreeAction: true,
                      //  onClick: (event, rowData) => {
                      // history.push(addCoursePath);
                      // }
                    },
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<EditIcon />}
                          size="small"
                        >
                          Edit
                        </Button>
                      ),
                      tooltip: "Edit Feild Of Study",
                      // onClick: (event, rowData) => {
                      //     history.push('courses/edit/' + rowData.id);
                      // },
                    },
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<DeleteIcon />}
                          size="small"
                          disabled
                        >
                          Delete
                        </Button>
                      ),
                      tooltip: "Delete Feild Of Study",
                      // onClick: (event, rowData) => {
                      //     history.push(editCoursePath + rowData.id);
                      // }
                    },
                  ]}
                  options={{
                    actionsColumnIndex: -1,
                    headerStyle: {
                      fontWeight: "bold",
                    },
                    minBodyHeight: "420px",
                    maxBodyHeight: "420px",
                  }}
                />
              </Grid>
              <Grid item md={12}>
                {/* Country Of Dream College Table */}
                <MaterialTable
                  columns={[
                    {title : "ID", field : "id"},
                    {title : "Country", field : "name"},
                  ]}
                  data={this.state.viewCountry}
                  title="Country Of Dream College"
                  onRowClick=""
                  icons={tableIcons}
                  options={{
                    headerStyle: {
                      backgroundColor: "#01579b",
                      color: "#FFF",
                    },
                    rowStyle: {
                      background: "#f1f1f1",
                    },
                  }}
                  actions={[
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddIcon />}
                          onClick={this.addCountryOfDreamClgHandler}
                          size="small"
                        >
                          Add Country Of Dream Colege
                        </Button>
                      ),
                      tooltip: "Add Country Of Dream College",
                      isFreeAction: true,
                      //  onClick: (event, rowData) => {
                      // history.push(addCoursePath);
                      // }
                    },
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<EditIcon />}
                          size="small"
                        >
                          Edit
                        </Button>
                      ),
                      tooltip: "Edit Country Of Dream College",
                      // onClick: (event, rowData) => {
                      //     history.push('courses/edit/' + rowData.id);
                      // },
                    },
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<DeleteIcon />}
                          size="small"
                          disabled
                        >
                          Delete
                        </Button>
                      ),
                      tooltip: "Delete Country Of Dream College",
                      // onClick: (event, rowData) => {
                      //     history.push(editCoursePath + rowData.id);
                      // }
                    },
                  ]}
                  options={{
                    actionsColumnIndex: -1,
                    headerStyle: {
                      fontWeight: "bold",
                    },
                    minBodyHeight: "420px",
                    maxBodyHeight: "420px",
                  }}
                />
              </Grid>
              <Grid item md={12}>
                {/* Dream College Table */}
                <MaterialTable
                  columns={[
                    {title : "ID", field : "id"},
                    {title : "College", field : "name"},
                    {title : "Country", field : "country.name"}
                  ]}
                  data={this.state.viewCollege}
                  title="Dream College"
                  onRowClick=""
                  icons={tableIcons}
                  options={{
                    headerStyle: {
                      backgroundColor: "#01579b",
                      color: "#FFF",
                    },
                    rowStyle: {
                      background: "#f1f1f1",
                    },
                  }}
                  actions={[
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddIcon />}
                          onClick={this.addDreamCollegeDialog}
                          size="small"
                        >
                          Add Dream College
                        </Button>
                      ),
                      tooltip: "Add Dream College",
                      isFreeAction: true,
                      //  onClick: (event, rowData) => {
                      // history.push(addCoursePath);
                      // }
                    },
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<EditIcon />}
                          size="small"
                        >
                          Edit
                        </Button>
                      ),
                      tooltip: "Edit Dream College",
                      // onClick: (event, rowData) => {
                      //     history.push('courses/edit/' + rowData.id);
                      // },
                    },
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<DeleteIcon />}
                          size="small"
                          disabled
                        >
                          Delete
                        </Button>
                      ),
                      tooltip: "Delete Dream College",
                      // onClick: (event, rowData) => {
                      //     history.push(editCoursePath + rowData.id);
                      // }
                    },
                  ]}
                  options={{
                    actionsColumnIndex: -1,
                    headerStyle: {
                      fontWeight: "bold",
                    },
                    minBodyHeight: "420px",
                    maxBodyHeight: "420px",
                  }}
                />
              </Grid>
              <Grid item md={12}>
                {/* Area Of Specialization Table */}
                <MaterialTable
                  columns={[
                    {title : "ID", field : "id"},
                    {title : "Area Of Specialization", field : "name"}
                  ]}
                  data={this.state.viewArea}
                  title="Area Of Specialization"
                  onRowClick=""
                  icons={tableIcons}
                  options={{
                    headerStyle: {
                      backgroundColor: "#01579b",
                      color: "#FFF",
                    },
                    rowStyle: {
                      background: "#f1f1f1",
                    },
                  }}
                  actions={[
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddIcon />}
                          onClick={this.addSpecializationDialogHandler}
                          size="small"
                        >
                          Add Area Of Specialization
                        </Button>
                      ),
                      tooltip: "Add Area Of Specialization",
                      isFreeAction: true,
                      //  onClick: (event, rowData) => {
                      // history.push(addCoursePath);
                      // }
                    },
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<EditIcon />}
                          size="small"
                        >
                          Edit
                        </Button>
                      ),
                      tooltip: "Edit Area Of Specialization",
                      // onClick: (event, rowData) => {
                      //     history.push('courses/edit/' + rowData.id);
                      // },
                    },
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<DeleteIcon />}
                          size="small"
                          disabled
                        >
                          Delete
                        </Button>
                      ),
                      tooltip: "Delete Area Of Specialization",
                      // onClick: (event, rowData) => {
                      //     history.push(editCoursePath + rowData.id);
                      // }
                    },
                  ]}
                  options={{
                    actionsColumnIndex: -1,
                    headerStyle: {
                      fontWeight: "bold",
                    },
                    minBodyHeight: "420px",
                    maxBodyHeight: "420px",
                  }}
                />
              </Grid>
            </Grid>
            {/* Add Term Dialog */}
            <Dialog
              open={this.state.addTermDialog}
              onClose={(e) => this.setState({ addTermDialog: false })}
              TransitionComponent={Transition}
            >
              <DialogTitle>Add Term</DialogTitle>
              <DialogContent>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  onChange = {(e)=>this.setState({term : e.target.value})}
                  label="Term"
                  variant="outlined"
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={(e) => this.setState({ addTermDialog: false })}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={this.postTerm}
                  color="primary"
                >
                  Add Term
                </Button>
              </DialogActions>
            </Dialog>
            {/* Add Degeree Dialog */}
            <Dialog
            TransitionComponent={Transition}
              open={this.state.addDegereeDialog}
              onClose={(e) => this.setState({ addDegereeDialog: false })}
            >
              <DialogTitle>Add Degeree</DialogTitle>
              <DialogContent>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  onChange={(e)=>this.setState({degree : e.target.value})}
                  label="Degeree"
                  variant="outlined"
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={(e) => this.setState({ addDegereeDialog: false })}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={this.postDegeree}
                  color="primary"
                >
                  Add Degeree
                </Button>
              </DialogActions>
            </Dialog>
            {/* Add Feild Of Study Or Branch Dialog */}
            <Dialog
            TransitionComponent={Transition}
              open={this.state.addFeildOfStudyDialog}
              onClose={(e) => this.setState({ addFeildOfStudyDialog: false })}
            >
              <DialogTitle>Add Feild Of Study</DialogTitle>
              <DialogContent>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  onChange={(e)=>this.setState({feildOfStudy : e.target.value})}
                  label="Add Feild Of Study"
                  variant="outlined"
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={(e) =>
                    this.setState({ addFeildOfStudyDialog: false })
                  }
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={this.postFeildOfStudy}
                  color="primary"
                >
                  Add Feild Of Study
                </Button>
              </DialogActions>
            </Dialog>
            {/* Add Country Of Dream College Dialog */}
            <Dialog
            TransitionComponent={Transition}
              open={this.state.addCountryDreamClg}
              onClose={(e) => this.setState({ addCountryDreamClg: false })}
            >
              <DialogTitle>Add Country Of Dream College</DialogTitle>
              <DialogContent>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  onChange = {(e)=>this.setState({country : e.target.value})}
                  label="Country Of Dream College"
                  variant="outlined"
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={(e) => this.setState({ addCountryDreamClg: false })}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={this.postCountry}
                  color="primary"
                >
                  Add Country Of Dream College
                </Button>
              </DialogActions>
            </Dialog>
            {/* Add Dream College Dialog */}
            <Dialog
              open={this.state.addDreamCollegeDialog}
              TransitionComponent={Transition}
              onClose={(e) => this.setState({ addDreamCollegeDialog: false })}
            >
              <DialogTitle>Add Dream College</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item md={12}>
              <Autocomplete
                id="combo-box-demo"
                options={this.state.viewCountry}
                getOptionLabel={(option) => option.name}
                onChange={this.countryForUnivHandler}
                renderInput={(params) => <TextField 
                  {...params} 
                  label="Select Country"
                  fullWidth
                   variant="outlined" />}
              />
              </Grid>
              <Grid item md={12}>
                <TextField
                onChange = {(e)=>this.setState({college : e.target.value})}
                  id="outlined-basic"
                  fullWidth
                  label="Dream College"
                  variant="outlined"
                />
                </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={(e) =>
                    this.setState({ addDreamCollegeDialog: false })
                  }
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={this.postCollege}
                  color="primary"
                >
                  Add Dream College
                </Button>
              </DialogActions>
            </Dialog>
            {/* Add Area Of Specialization Dialog */}
            <Dialog
              open={this.state.specializationDialog}
              TransitionComponent={Transition}
              onClose={(e) => this.setState({ specializationDialog: false })}
            >
              <DialogTitle>Add Area Of Specialization</DialogTitle>
              <DialogContent>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  onChange = {(e)=>this.setState({area : e.target.value})}
                  label="Area Of Specialization"
                  variant="outlined"
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={(e) =>
                    this.setState({ specializationDialog: false })
                  }
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={this.postArea}
                  color="primary"
                  
                >
                  Add Area Of Specialization
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
          <Snackbar
        open={this.state.snack}
        autoHideDuration={3000}
        onClose={(e)=>this.setState({snack : false})}
        TransitionComponent={Transition}
        message={snackMessage}
      />
        </div>
      </ThemeProvider>
    );
  }
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
