import React, { Component } from 'react'
import {
    viewQuestionSet,
    addQuestionSet,
    updateQuestionSet,
    deleteQuestionSet,
    viewQuestion
} from "../../Actions/QuestionSet"
import {questionsPath} from "../RoutePaths"
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
 import AddIcon from "@material-ui/icons/Add";
 import TableComponent from "../TableComponent/TableComponent";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
export class QuestionSet extends Component {
    constructor(props) {
        super(props)
        this.state = {
             id : "",
             name : "",
             type : "",
             show : false,
             update : null,
        }
    }
    componentDidMount(){
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
        { title: "Question set Name", fieldName: "name" },
        { title: "Question set Type", fieldName: "type" },
      ];
      rowClick = (data) => {
        this.props.history.push(questionsPath+data.id)
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
        this.setState({
          id : data.id,
          name : data.name,
          type : data.type,
          show : true,
        })
    };
 
    deleteHandler = (data) =>{      
        // this.props.deleteQuestionSet(data.id)
        this.props.viewQuestionSet()
      }
      // Add Question Set
      addQuestionSet() {
        this.setState({ show: false });
        let questionSetObj = {
          name: this.state.name,
          type : this.state.type,
        };
        if (this.state.name.length !== 0) {
          this.props.addQuestionSet(questionSetObj);
          this.setState({
            id: "",
            name: "",
            type : "",
          });
        }
        this.props.viewQuestionSet()
      }
      // Update Question Set
      updateQuestionSet(){
        this.setState({ show: false });
    let newQuestionObj = {
      id : this.state.id,
      name: this.state.name,
      type : this.state.type,
    };
    if (this.state.name.length !== 0) {
      this.props.updateQuestionSet(newQuestionObj);
      this.setState({
        id: "",
        name: "",
        type : "",
        update: true,
      });      
    }
    this.props.viewQuestionSet()
  }
  render() {
        console.log(this.props.viewQuestionSetList)
        return (
            <ThemeProvider theme={this.getmuitheme()}>
            <div>
                <Grid container>
                <Grid item md={12}>
              {this.props.viewQuestionSetList.length !== 0 ? (
                <TableComponent
                  data={
                    this.props.viewQuestionSetList.length !== 0
                      ? this.props.viewQuestionSetList
                      : null
                  }
                  cols={this.col}
                  onRowClick={this.rowClick}
                  title={"Question Set"}
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
          {/* Add and Edit Question Set */}
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
                    ? "Edit Question Set"
                    : "Add Question Set"}
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
                  label="Enter Question Set Name"
                  fullWidth
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  multiline
                />
                <FormControl variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">Question Set Type</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.type}
          onChange={(e)=>this.setState({type : e.target.value})}
          label="Question Set Type"
        >
          <MenuItem value={"SURVEY"}>SURVEY</MenuItem>
          <MenuItem value={"EVALUATION"}>EVALUATION</MenuItem>
        </Select>
      </FormControl>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={
                    this.state.id.length===0
                      ? this.addQuestionSet.bind(this)
                      : this.updateQuestionSet.bind(this)
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
        viewQuestionSetList: state.QuestionSetReducer.viewQuestionSetList,
    }
}
export default connect(mapStateToProps,{viewQuestionSet,addQuestionSet,updateQuestionSet,deleteQuestionSet,viewQuestion})(QuestionSet)