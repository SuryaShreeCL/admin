import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllColleges,
  addColleges,
  updateColleges,
} from "../Actions/College";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import MaterialTable from "material-table";
import { tableIcons } from "./MaterialTableIcon";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

export class College extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      id: "",
      name: "",
      description: "",
      logo: "",
      msg: false,
      update: false,
    };
  }

  col = [
    {
      title: "Logo",
      field: "logoURL",
      render: (rowData) => (
        <img
        src="https://previews.123rf.com/images/butenkow/butenkow1612/butenkow161202042/67425677-college-logo-design-template-vector-illustration-of-icon.jpg"
        style={{ width: 80, borderRadius: "50%" }}
      />
      ), },
    { title: "Name", field: "name" },
    { title: "Description", field: "description" },
  ];

  componentDidMount() {
    this.props.getAllColleges();
  }

  tableTheme = () =>
    createMuiTheme({
      overrides: {
        MuiSvgIcon: {
          root: {
            color: "unset",
          },
        },
      },
    });

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

  handleClickOpen = (e) => {
    this.setState({ show: true });
  };

  handleClose = (e) => {
    this.setState({ show: false });
  };

  newCollege(e) {
    this.setState({ show: false });
    let newCollegeObj = {
      name: this.state.name,
      description: this.state.description,
      logoURL: this.state.logo,
    };
    if (this.state.name.length !== 0) {
      this.props.addColleges(newCollegeObj);
      this.setState({
        id: "",
        name: "",
        description: "",
        logo: "",       
      });
    }
  }

  updateCollege(e) {
    this.setState({ show: false });
    let newCollegeObj = {
      name: this.state.name,
      description: this.state.description,
      logoURL: this.state.logo,
    };
    if (this.state.name.length !== 0) {
      this.props.updateColleges(this.state.id, newCollegeObj);
      this.setState({
        id: "",
        name: "",
        description: "",
        logo: "",
        update: true,
      });      
    }
    this.props.getAllColleges();
  }
  render() {   
    return (
      <ThemeProvider theme={this.tableTheme()}>
        <div>
          <MaterialTable
            title="Colleges"
            icons={tableIcons}
            columns={this.col}
            data={this.props.AllCollegeList}
            actions={[
              {
                icon: () => (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    size="small"
                  >
                    Add College
                  </Button>
                ),
                tooltip: "Create Course",
                isFreeAction: true,
                onClick: (e) =>
                  this.setState({
                    id: "",
                    name: "",
                    description: "",
                    logo: "",
                    show: true,
                  }),
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
                tooltip: "Edit Course",
                onClick: (e, row) => {
                  this.setState({
                    id: row.id,
                    name: row.name,
                    description: row.description,
                    logo: row.logoURL,
                    show: true,
                  });
                },
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
                tooltip: "Delete Course",
              },
            ]}
            options={{
              actionsColumnIndex: -1,
              search: true,
              headerStyle: {
                fontWeight: "bold",
              },
              minBodyHeight: "420px",
              maxBodyHeight: "420px",
            }}
          />

          {/* Add adnd Edit College Dialog */}

          <ThemeProvider theme={this.modeltheme()}>
            <Dialog
              open={this.state.show}
              onClose={this.handleClose}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0 ? "Edit College" : "Add College"}
                </div>
                <div className="model-close-button">
                  <IconButton aria-label="close" onClick={this.handleClose}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </DialogTitle>
              <DialogContent>
                <TextField
                  variant="outlined"
                  color="primary"
                  label="Enter College Name"
                  fullWidth
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
                <TextField
                  variant="outlined"
                  color="primary"
                  label="description"
                  rowsMin={3}
                  multiline
                  fullWidth
                  value={this.state.description}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
                <TextField
                  variant="outlined"
                  color="primary"
                  label="Logo Url"
                  rowsMin={3}
                  multiline
                  fullWidth
                  value={this.state.logo}
                  onChange={(e) => this.setState({ logo: e.target.value })}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={
                    this.state.id.length === 0
                      ? this.newCollege.bind(this)
                      : this.updateCollege.bind(this)
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
    );
  }
}
const mapStateToProps = (state) => {
  return {
    AllCollegeList: state.CollegeReducer.allCollegeList,
  };
};
export default connect(mapStateToProps, {
  getAllColleges,
  addColleges,
  updateColleges,
})(College);
