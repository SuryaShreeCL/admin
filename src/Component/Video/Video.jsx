import React, { Component } from 'react'
import {
    viewVideo,
    addVideo,
    updateVideo,
    deleteVideo,
} from "../../Actions/Video"
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from "react-redux";
import { 
    Grid,
    CircularProgress,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Slide,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography
 } from '@material-ui/core';
 import CloseIcon from "@material-ui/icons/Close";
 import AddIcon from "@material-ui/icons/Add";
 import { isEmptyString } from "../Validation"
 import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
 import TableComponent from "../TableComponent/TableComponent";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {studentPath } from "../RoutePaths";
import BackButton from '../../Asset/Images/backbutton.svg';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Breadcrumbs} from '@material-ui/core'
export class Video extends Component {
    constructor(props) {
        super(props)
        this.state = {
             id : "",
             name : "",
             nameErr : "",
             branch : "",
             branchErr : "",
             tags : "",
             tagsErr : "",
             videos : null,
             videoErr : "",
             show : false,
             update : null,
        }
    }
    componentDidMount(){
        this.props.viewVideo()
    }
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
    spinnerTheme = () =>
    createMuiTheme({
      overrides: {
        MuiCircularProgress: {
          colorPrimary: {
            color: "#009be5",
          },
        },
      },
    });
    getmuitheme = () =>
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
    col = [
        {
          title: "id",
          fieldName: "id"},
        { title: "Name", fieldName: "name" },
        { title: "Video URL", fieldName: "videoUrl" },
      ];
      rowClick = (data) => {
        // this.props.history.push(choicePath+data.id)
      };
      handleClickOpen = (e) => {
        this.setState({ 
          show: true,
          id : "",
          name : "",
          branch : "",
          tags : "",
          videos : "",
        });
      };
      handleEdit = (data) => {
        this.setState({
          id : data.id,
          name : data.name,
          branch : data.branch,
          tags : data.tags,
          videos : data.videoUrl,
          show : true,
        })
    };
    deleteHandler = (data) =>{
        // this.props.deleteQuestionSet(data.id)
        this.props.viewChoice()
      }
      // Add Video
      addVideo() {
        let hlpTxt = "Please fill the required feild"
          isEmptyString(this.state.name) ? this.setState({nameErr : hlpTxt}) : this.setState({nameErr : ""})
          isEmptyString(this.state.branch) ? this.setState({branchErr : hlpTxt}) : this.setState({branchErr : ""})
          isEmptyString(this.state.tags) ? this.setState({tagsErr : hlpTxt}) : this.setState({tagsErr : ""})
          isEmptyString(this.state.videos) ? this.setState({videoErr : hlpTxt}) : this.setState({videoErr : ""})
       if(
        !isEmptyString(this.state.name) &&
        !isEmptyString(this.state.branch) &&
        !isEmptyString(this.state.tags) &&
        !isEmptyString(this.state.videos) 
       ){
        let videoObj = {
          name: this.state.name,
          branch : this.state.branch,
          tags : this.state.tags,
          videos : this.state.videos
        };
        if (this.state.name.length !== 0) {
          this.props.addVideo(videoObj);
          this.setState({
            id : "",
          name : "",
          show: false,
          branch : "",
          tags : "",
          videos : "",
          });
        }
        this.props.viewVideo()
       }
         
      }
      // Update Video
      updateVideo(){

        let hlpTxt = "Please fill the required feild"
        isEmptyString(this.state.name) ? this.setState({nameErr : hlpTxt}) : this.setState({nameErr : ""})
        isEmptyString(this.state.branch) ? this.setState({branchErr : hlpTxt}) : this.setState({branchErr : ""})
        isEmptyString(this.state.tags) ? this.setState({tagsErr : hlpTxt}) : this.setState({tagsErr : ""})
        isEmptyString(this.state.videos) ? this.setState({videoErr : hlpTxt}) : this.setState({videoErr : ""})
        
        if(
          !isEmptyString(this.state.name) &&
          !isEmptyString(this.state.branch) &&
          !isEmptyString(this.state.tags) &&
          !isEmptyString(this.state.videos) 
        ){
          let videoObj = {
            id : this.state.id,
            name: this.state.name,
            branch : this.state.branch,
            tags : this.state.tags,
            videos : this.state.videos
          };
      if (this.state.name.length !== 0) {
        this.props.updateVideo(videoObj);
        this.setState({
          id : "",
          name : "",
          branch : "",
          tags : "",
          videos : "",
          update: true,
          show: false,
        });      
      }
      this.props.viewVideo()
        }
 
  }
  render() {
    const videoOption = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
    ]
        return (
            <ThemeProvider theme={this.getmuitheme()}>
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
                Video
              </Typography>
            </Breadcrumbs>
            </div>
            <div>
                <Grid container>
                
                <Grid item md={12}>
              {this.props.viewVideoList.length !== 0 ? (
                <TableComponent
                  data={
                    this.props.viewVideoList.length !== 0
                      ? this.props.viewVideoList
                      : null
                  }
                  cols={this.col}
                  onRowClick={this.rowClick}
                  title={"Videos"}
                  onDelete={true}
                  onDeleteClick={this.deleteHandler}
                  action={true}
                  onEdit={true}
                  onEditClick={this.handleEdit}
                  add={true}
                  onAddClick={this.handleClickOpen}
                />
              ) : (
                <ThemeProvider theme={this.spinnerTheme()}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "65vh",
                    }}
                  >
                    <CircularProgress
                      color="primary"
                      variant="indeterminate"
                      size="3rem"
                      thickness="3"
                    />
                  </div>
                </ThemeProvider>
              )}
            </Grid>
            </Grid>
          {/* Add and Edit Choice */}
          <ThemeProvider theme={this.modeltheme()}>
            <Dialog
            TransitionComponent={Transition}
              open={this.state.show}
              onClose={(e) => this.setState({ show: false })}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0
                    ? "Edit Video"
                    : "Add Video"}
                </div>
                <div className="model-close-button">
                  <IconButton
                    aria-label="close"
                    onClick={(e) => this.setState({ show: false })}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </DialogTitle>
              <DialogContent>
               
              <TextField
                  variant="outlined"
                  color="primary"
                  label="Enter The Name"
                  fullWidth
                  helperText={this.state.nameErr}
                  error={this.state.nameErr.length > 0}
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  multiline
                />
              <TextField
                  variant="outlined"
                  color="primary"
                  label="Enter Branch"
                  helperText={this.state.branchErr}
                  error={this.state.branchErr.length > 0}
                  fullWidth
                  value={this.state.branch}
                  onChange={(e) => this.setState({ branch: e.target.value })}
                  multiline
                />
                 <TextField
                  variant="outlined"
                  color="primary"
                  label="Enter Tags"
                  helperText={this.state.tagsErr}
                  error={this.state.tagsErr.length > 0}
                  fullWidth
                  value={this.state.tags}
                  onChange={(e) => this.setState({ tags: e.target.value })}
                  multiline
                />
                      <TextField
                  variant="outlined"
                  color="primary"
                  label="Video URL"
                  helperText={this.state.videoErr}
                  error={this.state.videoErr.length > 0}
                  fullWidth
                  value={this.state.videos}
                  onChange={(e) => this.setState({ videos: e.target.value })}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={
                    this.state.id.length===0
                      ? this.addVideo.bind(this)
                      : this.updateVideo.bind(this)
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
            </div>
            </ThemeProvider>
        )
    }
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const mapStateToProps=(state)=>{
    return {
        viewVideoList: state.VideoReducer.viewVideoList,
    }
}
export default connect(mapStateToProps,{viewVideo,addVideo,updateVideo,deleteVideo})(Video)