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
     Slide,
     Grid,
     Breadcrumbs,
     Typography
    } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from "@material-ui/icons/Close";
import {connect} from 'react-redux'
import {viewnotification,addnotification,updatenotification,deletenotification} from '../Actions/Notification'
import TableComponent from "./TableComponent/TableComponent";
import MySnackBar from "./MySnackBar";
import { isEmptyString } from './Validation';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import {studentPath } from "./RoutePaths";
import BackButton from '../Asset/Images/backbutton.svg'
import Loader from './Utils/controls/Loader';

export class Notification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            id : "",
            code :"",
            featureName : "",
            completedTask : "",
            firstDay : "",
            secondDay : "",
            thirdDay : "",
            fourthDay : "",
            fifthDay : "",
            sixthDay : "",
            seventhDay : "",
            tenMinutes : "",
            show : false,
            deleteshow: false,
            snackMsg: "",
            snackVariant: "",
            snackOpen: false,
            featureNameErr:"",
            codeErr:"",
            completedTaskErr:"",
            firstDayErr:"",
            secondDayErr:"",
            thirdDayErr:"",
            fourthDayErr:"",
            fifthDayErr:"",
            sixthDayErr:"",
            seventhDayErr:"",
            tenMinutesErr:""
        }
    }

    rowClick = (rowData) => {
      };

    componentDidMount() { 

    this.props.viewnotification()
    // setInterval((this.props.viewnotification), 2000);
    }

    componentDidUpdate(prevProps, prevState) {
      if(this.props.updatenotificationList !== prevProps.updatenotificationList){
        this.props.viewnotification()
      }
      // if (this.props !== prevProps) {
      //   if (this.props.data !== null) {
      //     this.setState({ tableColumn: this.props.cols });
      //     this.setState({Data: this.props.data });
          // this.props.viewnotification()
          // this.forceUpdate();
        // }} 
    }

      // Paginate For Notification
    // paginate = (page, size, keyword) => {
    //   this.props.getPaginateNotification(page, size, keyword);
    // };
   
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
    this.setState({
      id : data.id,
      code:data.code,
      featureName : data.featureName,
      completedTask : data.completedTask,
      firstDay : data.firstDay,
      secondDay : data.secondDay,
      thirdDay : data.thirdDay,
      fourthDay : data.fourthDay,
      fifthDay : data.fifthDay,
      sixthDay : data.sixthDay,
      seventhDay : data.seventhDay,
      tenMinutes : data.tenMinutes,
      show : true,
    })
  } 

   // Dialog Open
   handleClickOpen = (e) => {
    this.setState({
       show: true,
       id :"",
       code:"",
          featureName : "",
          completedTask: "",
          tenMinutes : "",
          firstDay : "",
          secondDay : "",
          thirdDay : "",
          fourthDay : "",
          fifthDay : "",
          sixthDay : "",
          seventhDay : "",
          notificationId:"",
      });
  };


  // Delete
    handleDelete = (data) =>{
      console.log(data)
      this.setState({
        deleteshow:true,
        notificationId:data.id
      });
    }

    //cancel
    cancel=()=>{
      // alert("cancel")
      this.setState({deleteshow:false})
  }
 
//confirm
    confirm=()=>{
      // alert("confirm")      
    this.props.deletenotification(this.state.notificationId);
    this.setState({
      deleteshow:false,
      snackMsg: "Deleted Suceessfully ",
      snackVariant: "success",
      snackOpen: true,
    })
    }

    // Add Notification
    newNotify = () =>{
      let helperTxt = "Please fill the Required Field";
      isEmptyString(this.state.code) ? this.setState({codeErr:helperTxt}) : this.setState({codeErr:""})
      isEmptyString(this.state.featureName) ? this.setState({featureNameErr:helperTxt}) : this.setState({featureNameErr:""})
      isEmptyString(this.state.completedTask) ? this.setState({completedTaskErr:helperTxt}) : this.setState({completedTaskErr:""})
      isEmptyString(this.state.firstDay) ? this.setState({firstDayErr:helperTxt}) : this.setState({firstDayErr:""})
      isEmptyString(this.state.secondDay) ? this.setState({secondDayErr:helperTxt}) : this.setState({secondDayErr:""})
      isEmptyString(this.state.thirdDay) ? this.setState({thirdDayErr:helperTxt}) : this.setState({thirdDayErr:""})
      isEmptyString(this.state.fourthDay) ? this.setState({fourthDayErr:helperTxt}) : this.setState({fourthDayErr:""})
      isEmptyString(this.state.fifthDay) ? this.setState({fifthDayErr:helperTxt}) : this.setState({fifthDayErr:""})
      isEmptyString(this.state.sixthDay) ? this.setState({sixthDayErr:helperTxt}) : this.setState({sixthDayErr:""})
      isEmptyString(this.state.seventhDay) ? this.setState({seventhDayErr:helperTxt}) : this.setState({seventhDayErr:""})
      isEmptyString(this.state.tenMinutes) ? this.setState({tenMinutesErr:helperTxt}) : this.setState({tenMinutesErr:""})
      {
        // this.setState({ show: false });
        let obj = {
          code: parseInt(this.state.code),
          featureName: this.state.featureName,
          completedTask : this.state.completedTask,
          firstDay : this.state.firstDay,
          secondDay : this.state.secondDay,
          thirdDay : this.state.thirdDay,
          fourthDay : this.state.fourthDay,
          fifthDay : this.state.fifthDay,
          sixthDay : this.state.sixthDay,
          seventhDay : this.state.seventhDay,
          tenMinutes : this.state.tenMinutes,
  
        };
        if (this.state.id.length === 0 &&
          !isEmptyString(this.state.code) &&
          !isEmptyString(this.state.featureName) &&
          !isEmptyString(this.state.completedTask) &&
          !isEmptyString(this.state.firstDay) &&
          !isEmptyString(this.state.secondDay) &&
          !isEmptyString(this.state.thirdDay) &&
          !isEmptyString(this.state.fourthDay) &&
          !isEmptyString(this.state.fifthDay) &&
          !isEmptyString(this.state.sixthDay) &&
          !isEmptyString(this.state.seventhDay) &&
          !isEmptyString(this.state.tenMinutes) 
          ) {
          this.props.addnotification(obj);
          this.setState({
            id: "",
            code:"",
            featureName : "",
            completedTask: "",
            firstDay : "",
            secondDay : "",
            thirdDay : "",
            fourthDay : "",
            fifthDay : "",
            sixthDay : "",
            seventhDay : "",
            tenMinutes : "",
            snackMsg: "Added Suceessfully ",
            snackVariant: "success",
            snackOpen: true,
          });
        }
      } 
      // this.props.getPaginateNotification(0, 20,null);    
      }

  // Update Notification
  updateNotify = () =>{
    let helperTxt = "Please fill the Required Field";
    isEmptyString(this.state.code) ? this.setState({codeErr:helperTxt}) : this.setState({codeErr:""})
    isEmptyString(this.state.featureName) ? this.setState({featureNameErr:helperTxt}) : this.setState({featureNameErr:""})
    isEmptyString(this.state.completedTask) ? this.setState({completedTaskErr:helperTxt}) : this.setState({completedTaskErr:""})
    isEmptyString(this.state.firstDay) ? this.setState({firstDayErr:helperTxt}) : this.setState({firstDayErr:""})
    isEmptyString(this.state.secondDay) ? this.setState({secondDayErr:helperTxt}) : this.setState({secondDayErr:""})
    isEmptyString(this.state.thirdDay) ? this.setState({thirdDayErr:helperTxt}) : this.setState({thirdDayErr:""})
    isEmptyString(this.state.fourthDay) ? this.setState({fourthDayErr:helperTxt}) : this.setState({fourthDayErr:""})
    isEmptyString(this.state.fifthDay) ? this.setState({fifthDayErr:helperTxt}) : this.setState({fifthDayErr:""})
    isEmptyString(this.state.sixthDay) ? this.setState({sixthDayErr:helperTxt}) : this.setState({sixthDayErr:""})
    isEmptyString(this.state.seventhDay) ? this.setState({seventhDayErr:helperTxt}) : this.setState({seventhDayErr:""})
    isEmptyString(this.state.tenMinutes) ? this.setState({tenMinutesErr:helperTxt}) : this.setState({tenMinutesErr:""})
    {
      // this.setState({ show: false });
      let 
      obj1 = {
        id : this.state.id,
        code:this.state.code,
        featureName: this.state.featureName,
        completedTask : this.state.completedTask,
        firstDay : this.state.firstDay,
        secondDay : this.state.secondDay,
        thirdDay : this.state.thirdDay,
        fourthDay : this.state.fourthDay,
        fifthDay : this.state.fifthDay,
        sixthDay :this.state.sixthDay,
        seventhDay : this.state.seventhDay,
        tenMinutes : this.state.tenMinutes
      };
      if (this.state.id.length !== 0 &&
          !isEmptyString(this.state.code) &&
          !isEmptyString(this.state.featureName) &&
          !isEmptyString(this.state.completedTask) &&
          !isEmptyString(this.state.firstDay) &&
          !isEmptyString(this.state.secondDay) &&
          !isEmptyString(this.state.thirdDay) &&
          !isEmptyString(this.state.fourthDay) &&
          !isEmptyString(this.state.fifthDay) &&
          !isEmptyString(this.state.sixthDay) &&
          !isEmptyString(this.state.seventhDay) &&
          !isEmptyString(this.state.tenMinutes) 
        ) {
        this.props.updatenotification(this.state.id,obj1);
        this.setState({
          id: "",
          code:"",
          featureName: "",
          completedTask : "",
          firstDay : "",
          secondDay : "",
          thirdDay : "",
          fourthDay : "",
          fifthDay:"",
          sixthDay:"",
          seventhDay:"",
          tenMinutes:"",
          update: true,
          snackMsg: "Updated Suceessfully ",
          snackVariant: "success",
          snackOpen: true,
        });      
      }
    }
    
  // this.props.getPaginateNotification(0, 20,null);    
}
 column = [
    { title: 'Id', fieldName:'id'},
    {title:'Code',fieldName:'code'},
    { title: 'FeatureName', fieldName:'featureName'},
    { title: 'CompletedTask', fieldName:'completedTask'},
    { title: 'FirstDay', fieldName:'firstDay'},
    { title: 'SecondDay', fieldName:'secondDay'},
    { title: 'ThirdDay', fieldName:'thirdDay'},
    { title: 'FourthDay', fieldName:'fourthDay'},
    { title: 'FifthDay', fieldName:'fifthDay'},
    { title: 'SixthDay', fieldName:'sixthDay'},
    { title: 'SeventhDay', fieldName:'seventhDay'},
    { title: 'Tenminutes', fieldName:'tenMinutes'},
];
    render() {
        return (
            <ThemeProvider theme={this.tableTheme()}>
               <div style={{display:"flex",flexDirection:"row",margin:"10px"}}>
          <img
            src={BackButton}
            style={{ cursor: "pointer",marginTop:"-10px" }}
            onClick={() => this.props.history.goBack()}
             />
               <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              <Typography style={{ cursor: "pointer", fontWeight: "600",marginLeft:"10px" }} onClick={()=>this.props.history.push(studentPath)}>
                Home
              </Typography>
              <Typography style={{ cursor: "pointer", fontWeight: "600" }}>
                Notification
              </Typography>
            </Breadcrumbs>
            </div>
            <div>
               {this.props.viewNotification !== 0 ? (
                <TableComponent
                  data={
                    this.props.viewnotificationList.length !== 0
                      ? this.props.viewnotificationList
                      : null
                  }
                  cols={this.column}
                  onRowClick={this.rowClick}
                  add={true}
                  action={true}
                  onEdit={true}
                  onDelete = {true} 
                  onDeleteClick ={this.handleDelete}
                  onEditClick={this.handleEdit} 
                  onAddClick={this.handleClickOpen}
                  // onSearch={this.paginate}
                  // paginate={this.paginate}
                  // totalCount={this.props.viewnotificationList.totalElements}
                  title={"Notification"}
                  // pageCount={this.props.viewnotificationList.totalPages}

                />
              ) : (
                <ThemeProvider theme={this.spinnerTheme()}>
                <div style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "65vh",
                }}>
              {/* <CircularProgress
             color="primary"
              variant="indeterminate"
              size = "3rem"
              thickness="3"
               /> */}
               <Loader />
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
                  aria-labelledby="customized-dialog-title">
                  <DialogTitle id="customized-dialog-title">
                    <div className="flex-1 text-center">
                      {this.state.id.length !== 0 ? "Edit Notification" : "Add Notification"}
                    </div>
                    <div className="model-close-button">
                      <IconButton aria-label="close" onClick={(e)=>this.setState({show : false})}>
                        <CloseIcon />
                      </IconButton>
                    </div>
                  </DialogTitle>
                  <DialogContent>
                  <Grid container spacing={3}>
                    <Grid item md={4}>
                  <TextField
                      variant="outlined"
                      color="primary"
                      label="Featurename"
                      fullWidth
                      error={this.state.featureNameErr.length > 0}
                      helperText={this.state.featureNameErr}
                      value={this.state.featureName}
                      onChange={(e) => this.setState({ featureName: e.target.value })}
                      multiline
                    />
                    </Grid>
                    <Grid item md={4}>
                  <TextField
                      variant="outlined"
                      color="primary"
                      label="Code"
                      fullWidth
                      error={this.state.codeErr.length > 0}
                      helperText={this.state.codeErr}
                      value={this.state.code}
                      onChange={(e) => this.setState({ code: e.target.value })}
                    />
                    </Grid>
                    <Grid item md={4}>
                  <TextField
                      variant="outlined"
                      color="primary"
                      label="Completed Task"
                      fullWidth
                      error={this.state.completedTaskErr.length > 0}
                      helperText={this.state.completedTaskErr}
                      value={this.state.completedTask}
                      onChange={(e) => this.setState({ completedTask: e.target.value })}
                      multiline
                    />
                    </Grid>
                    <Grid item md={4}>
                    <TextField
                      variant="outlined"
                      color="primary"
                      label="FirstDay"
                      rowsMin={3}
                      multiline
                      fullWidth
                      error={this.state.firstDayErr.length > 0}
                      helperText={this.state.firstDayErr}
                      value={this.state.firstDay}
                      onChange={(e) =>
                        this.setState({ firstDay: e.target.value })
                      }
                    /> 
                    </Grid>
                    <Grid item md={4}>
                  <TextField
                      variant="outlined"
                      color="primary"
                      label="SecondDay"
                      fullWidth
                      error={this.state.secondDayErr.length > 0}
                      helperText={this.state.secondDayErr}
                      value={this.state.secondDay}
                      onChange={(e) => this.setState({ secondDay: e.target.value })}
                      multiline
                    />
                    </Grid>
                    <Grid item md={4}>
                  <TextField
                      variant="outlined"
                      color="primary"
                      label="ThirdDay"
                      fullWidth
                      error={this.state.thirdDayErr.length > 0}
                      helperText={this.state.thirdDayErr}
                      value={this.state.thirdDay}
                      onChange={(e) => this.setState({ thirdDay: e.target.value })}
                      multiline
                    />
                    </Grid>
                    <Grid item md={4}>
                  <TextField
                      variant="outlined"
                      color="primary"
                      label="FourthDay"
                      fullWidth
                      error={this.state.fourthDayErr.length > 0}
                      helperText={this.state.fourthDayErr}
                      value={this.state.fourthDay}
                      onChange={(e) => this.setState({ fourthDay: e.target.value })}
                      multiline
                    />
                    </Grid>
                    <Grid item md={4}>
                  <TextField
                      variant="outlined"
                      color="primary"
                      label="FifthDay"
                      fullWidth
                      error={this.state.fifthDayErr.length > 0}
                      helperText={this.state.fifthDayErr}
                      value={this.state.fifthDay}
                      onChange={(e) => this.setState({ fifthDay: e.target.value })}
                      multiline
                    />
                    </Grid>
                    <Grid item md={4}>
                  <TextField
                      variant="outlined"
                      color="primary"
                      label="SixthDay"
                      fullWidth
                      error={this.state.sixthDayErr.length > 0}
                      helperText={this.state.sixthDayErr}
                      value={this.state.sixthDay}
                      onChange={(e) => this.setState({ sixthDay: e.target.value })}
                      multiline
                    />
                    </Grid>
                    <Grid item md={4}>
                  <TextField
                      variant="outlined"
                      color="primary"
                      label="SeventhDay"
                      fullWidth
                      error={this.state.seventhDayErr.length > 0}
                      helperText={this.state.seventhDayErr}
                      value={this.state.seventhDay}
                      onChange={(e) => this.setState({ seventhDay: e.target.value })}
                      multiline
                    />
                    </Grid>
                    <Grid item md={4}>
                  <TextField
                      variant="outlined"
                      color="primary"
                      label="TenMinutes"
                      error={this.state.tenMinutesErr.length > 0}
                      helperText={this.state.tenMinutesErr}
                      fullWidth
                      value={this.state.tenMinutes}
                      onChange={(e) => this.setState({ tenMinutes: e.target.value })}
                      multiline
                    />
                    </Grid>
                   </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={
                        this.state.id.length === 0
                          ? this.newNotify
                          : this.updateNotify
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
              <ThemeProvider>
              <Dialog
                maxWidth={'lg'}
                // TransitionComponent={Transition}
                  open={this.state.deleteshow}
                  onClose={(e)=>this.setState({deleteshow : false})}
                  aria-labelledby="customized-dialog-title">             
                 <DialogTitle>
                    <div>
                      <h2>Popup Message!!!</h2>
                    </div>
                  </DialogTitle>
                  <DialogContent>
                    <p>Are you Sure?</p>
                    <Button variant="contained" color="primary" onClick={this.cancel}>Cancel</Button>
                    <Button variant="contained" color="secondary" onClick={this.confirm}>Confirm</Button>
                  </DialogContent>
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
      viewnotificationList:state.NotificationReducer.viewnotificationList,
      updatenotificationList : state.NotificationReducer.updatenotificationList
    }
}

export default connect(mapStateToprops,{viewnotification,addnotification,updatenotification,deletenotification})(Notification)