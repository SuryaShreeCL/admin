import React, { Component } from 'react'
import {
    viewChoice,
    addChoice,
    updateChoice,
    deleteChoice,
} from "../../Actions/QuestionSet"
import {choicePath} from "../RoutePaths"
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
export class Choice extends Component {
    constructor(props) {
        super(props)
        this.state = {
             id : "",
             name : "",
             type : "",
             url : "",
             show : false,
             update : null,
        }
    }
    componentDidMount(){
        this.props.viewChoice(this.props.match.params.id)
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
        { title: "Choice", fieldName: "text" },
      ];
      rowClick = (data) => {
        // this.props.history.push(choicePath+data.id)
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
          name : data.text,
          type : data.type,
          url : data.choiceImage,
          show : true,
        })
    };
    deleteHandler = (data) =>{
        // this.props.deleteQuestionSet(data.id)
        this.props.viewChoice()
      }
      // Add Question Set
      addChoice() {
        this.setState({ show: false });
        let choiceObj = {
          text: this.state.name,
          type : this.state.type,
          choiceImage : this.state.url,
        };
        if (this.state.name.length !== 0) {
          this.props.addChoice(this.props.match.params.id,choiceObj);
          this.setState({
            id: "",
            name: "",
            type : "",
            url : "",
          });
        }
        this.props.viewChoice(this.props.match.params.id)
      }
      // Update Question Set
      updateChoice(){
        this.setState({ show: false });
        let choiceObj = {
          id : this.state.id,
          text: this.state.name,
          type : this.state.type,
          choiceImage : this.state.url,
        };
    if (this.state.name.length !== 0) {
      this.props.updateChoice(this.props.match.params.id,choiceObj);
      this.setState({
        id: "",
        name: "",
        type : "",
        url : "",
        update: true,
      });      
    }
    this.props.viewChoice(this.props.match.params.id)
  }
  render() {
    console.log(this.props)
        return (
            <ThemeProvider theme={this.getmuitheme()}>
            <div>
                <Grid container>
                <Grid item md={12}>
              {this.props.viewChoiceList.length !== 0 ? (
                <TableComponent
                  data={
                    this.props.viewChoiceList.length !== 0
                      ? this.props.viewChoiceList
                      : null
                  }
                  cols={this.col}
                  onRowClick={this.rowClick}
                  title={"Choices"}
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
                    ? "Edit Choice"
                    : "Add Choice"}
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
                  label="Enter Choice Type"
                  fullWidth
                  value={this.state.type}
                  onChange={(e) => this.setState({ type: e.target.value })}
                  multiline
                />
              <TextField
                  variant="outlined"
                  color="primary"
                  label="Enter Choice"
                  fullWidth
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  multiline
                />
                 <TextField
                  variant="outlined"
                  color="primary"
                  label="Choice Image URL"
                  fullWidth
                  value={this.state.url}
                  onChange={(e) => this.setState({ url: e.target.value })}
                  multiline
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={
                    this.state.id.length===0
                      ? this.addChoice.bind(this)
                      : this.updateChoice.bind(this)
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
        viewChoiceList: state.QuestionSetReducer.viewChoiceList,
    }
}
export default connect(mapStateToProps,{viewChoice,addChoice,updateChoice,deleteChoice})(Choice)