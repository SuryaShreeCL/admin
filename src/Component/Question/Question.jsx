import React, { Component } from 'react'
import {
    viewQuestion,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    viewChoice,
    viewQuestionSet,
} from "../../Actions/QuestionSet"
import {choicePath} from "../RoutePaths"
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
 } from '@material-ui/core';
 import CloseIcon from "@material-ui/icons/Close";
 import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
  import AddIcon from "@material-ui/icons/Add";
 import TableComponent from "../TableComponent/TableComponent";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
export class Question extends Component {
    constructor(props) {
        super(props)
        this.state = {
             id : "",
             name : "",
             type : "",
             show : false,
             update : null,
             description : "",
             time : "",
             url : "",
             question : "",
             questionSet : "",
        }
    }
    componentDidMount(){
        this.props.viewQuestion(this.props.match.params.id)
        this.props.viewQuestionSet()
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
          title: "ID",
          fieldName: "id"},
          { title: "Question Name", fieldName: "name" },
        { title: "Question", fieldName: "question" },
        { title: "Question Type", fieldName: "type" },
      ];
      rowClick = (data) => {
        this.props.history.push(choicePath+data.id)
      };
      handleClickOpen = (e) => {
        this.setState({ 
          show: true,
          id : "",
          name : "",
          type : "",
        });
      };
      handleEdit = (data) => {
        console.log(data)
        this.setState({
          id : data.id,
          name : data.name,
          type : data.type,
          question : data.question,
          time : data.timeRemaining,
          url : data.imgURL,
          show : true,
        })
    };
    questionSetChangeHandler = (event,value) =>{
      this.setState({
        questionSet : value
      })
    }
    deleteHandler = (data) =>{
        // this.props.deleteQuestion(data.id)
        this.props.viewQuestion(this.props.match.params.id)
      }
      // Add Question Set
      addQuestion() {
        this.setState({ show: false });
        let questionObj = {
          name: this.state.name,
          type : this.state.type,
          description : this.state.description,
          question : this.state.question,
          timeRemaining : this.state.time, 
          ImgURL : this.state.url
        };
        if (this.state.name.length !== 0) {
          this.props.addQuestion(questionObj);
          this.setState({
            id: "",
            name: "",
            type : "",
            question : "",
            description : "",
            time : "",
            url : "",
          });
        }
        this.props.viewQuestion()
      }
      // Update Question Set
      updateQuestion(){
        this.setState({ show: false });
    let newQuestionObj = {
      id : this.state.id,
      name: this.state.name,
          type : this.state.type,
          description : this.state.description,
          question : this.state.question,
          timeRemaining : this.state.time, 
    };
    if (this.state.name.length !== 0) {
      this.props.updateQuestion(newQuestionObj);
      this.setState({
        id: "",
        name: "",
        type : "",
        question : "",
        description : "",
        time : "",
        update: true,
      });      
    }
    this.props.viewQuestion(this.props.match.params.id)
  }
  render() {
        return (
            <ThemeProvider theme={this.getmuitheme()}>
            <div>
                <Grid container>
                <IconButton
                 color="primary"
                 onClick = {(e)=>this.props.history.goBack()}
                 >
  <ArrowBackRoundedIcon />
</IconButton>
                <Grid item md={12}>
              {/* {this.props.viewQuestionList.length !== 0 ? ( */}
                <TableComponent
                  data={
                    this.props.viewQuestionList.length !== 0
                      ? this.props.viewQuestionList
                      : null
                  }
                  cols={this.col}
                  onRowClick={this.rowClick}
                  title={"Questions"}
                  onDelete={true}
                  onDeleteClick={this.deleteHandler}
                  action={true}
                  onEdit={true}
                  onEditClick={this.handleEdit}
                  add={true}
                  onAddClick={this.handleClickOpen}
                />
               {/* ) : (  */}
                {/* <ThemeProvider theme={this.spinnerTheme()}>
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
                </ThemeProvider> */}
             {/* )}  */}
            </Grid>
            </Grid>
          {/* Add and Edit Questions */}
          <ThemeProvider theme={this.modeltheme()}>
            <Dialog
            // fullScreen
            maxWidth={'lg'}
            TransitionComponent={Transition}
              open={this.state.show}
              onClose={(e) => this.setState({ show: false })}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0
                    ? "Edit Question"
                    : "Add Question"}
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
              <Grid container spacing={3}>
                <Grid item md={4}>
                <TextField
                  variant="outlined"
                  color="primary"
                  label="Enter Question Name"
                  fullWidth
                  value={this.state.name}
                  rows={4}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  multiline
                />
                </Grid>
                <Grid item md={4}>
                <TextField
                  variant="outlined"
                  color="primary"
                  label="Enter Question"
                  fullWidth
                  value={this.state.question}
                  rows={4}
                  onChange={(e) => this.setState({ question: e.target.value })}
                  multiline
                />
                </Grid>
                <Grid item md={4}>
                <TextField
                  variant="outlined"
                  color="primary"
                  label="Enter Description"
                  fullWidth
                  value={this.state.description}
                  rows={4}
                  onChange={(e) => this.setState({ description: e.target.value })}
                  multiline
                />
                </Grid>
                <Grid item md={2}>
                <FormControl variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">Question Type</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.type}
          onChange={(e)=>this.setState({type : e.target.value})}
          label="Question Set Type"
        >
          <MenuItem value={"YESORNO"}>YESORNO</MenuItem>
          <MenuItem value={"MULTI_CHOICE"}>MULTI_CHOICE</MenuItem>
          <MenuItem value={"SINGLE_SELECT"}>SINGLE_SELECT</MenuItem>
          <MenuItem value={"TEXT"}>TEXT</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid item md={2}>
                <TextField
                  variant="outlined"
                  color="primary"
                  label="Time Remaining"
                  fullWidth
                  value={this.state.time}
                  onChange={(e) => this.setState({ time: e.target.value })}
                  multiline
                />
                </Grid>
                <Grid item md={4}>
                <TextField
                  variant="outlined"
                  color="primary"
                  label="Enter Image URL"
                  fullWidth
                  value={this.state.url}
                  onChange={(e) => this.setState({ url: e.target.value })}
                  multiline
                />
                </Grid>
                <Grid item md={4}>
                <Autocomplete
                onChange={this.questionSetChangeHandler}
  id="combo-box-demo"
  value = {this.state.questionSet}
  options={this.props.viewQuestionSetList}
  getOptionLabel={(option) => option.name}
  fullWidth
  renderInput={(params) => <TextField {...params} label="Question Set Name" variant="outlined" />}
/>
                </Grid>
      </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={
                    this.state.id.length===0
                      ? this.addQuestion.bind(this)
                      : this.updateQuestion.bind(this)
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
        viewQuestionList: state.QuestionSetReducer.viewQuestionList,
        viewQuestionSetList: state.QuestionSetReducer.viewQuestionSetList,
    }
}
export default connect(mapStateToProps,{viewQuestion,viewQuestionSet,addQuestion,updateQuestion,deleteQuestion,viewChoice})(Question)