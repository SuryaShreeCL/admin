import {
  TextField,
  Grid,
  withStyles,
  createTheme,
  ThemeProvider,
} from '@material-ui/core';
import React, { Component } from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { connect } from 'react-redux';
import PrimaryButton from '../../Utils/PrimaryButton';
import {
  getcvresult,
  deletecvresult,
  updatecvresult,
} from '../../Actions/ProfileGapAction';
import MySnackBar from '../MySnackBar';
import CvViewer from './CvViewer';
class CV extends Component {
  constructor() {
    super();
    this.state = {
      cvarr: [
        {
          id: '',
          sectionName: '',
          comments: '',
          updatedBy: {
            id: '',
          },
        },
      ],
      getcv: [],
      snackOpen: false,
      snackColor: '',
      snackMsg: '',
    };
  }
  componentDidMount() {
    this.props.getcvresult(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      response => {
        if (response.data.length > 0) {
          this.setState({
            cvarr: response.data,
          });
        }
      }
    );
  }
  handleAdd = () => {
    console.log('handleAdd');
    let arr = this.state.cvarr;
    arr.push({
      id: '',
      sectionName: '',
      comments: '',
      updatedBy: {
        id: '',
      },
    });
    this.setState({
      cvarr: arr,
    });
  };
  handleDelete = (data, index) => {
    console.log(data);
    if (this.state.cvarr.length > 1) {
      console.log('delete');
      if (data.id.length > 0) {
        this.props.deletecvresult(data.id, response => {
          console.log(response);
          if (response.status === 200) {
            this.props.getcvresult(
              this.props.match.params.studentId,
              this.props.match.params.productId,
              response => {
                console.log(response);
                this.setState({
                  cvarr: response.data,
                });
              }
            );
            this.setState({
              snackMsg: response.data,
              snackOpen: true,
              snackColor: 'success',
            });
          }
        });
      } else {
        if (this.state.cvarr.length > 1) {
          console.log(index, 'Delete');
          let delarr = this.state.cvarr;
          delarr.splice(index, 1);
          this.setState({
            cvarr: delarr,
          });
        }
      }
    }
  };
  handleTextChange = (e, index, name) => {
    let items = [...this.state.cvarr];
    let item = { ...items[index] };
    console.log(item);
    item[name] = e.target.value;
    items[index] = item;
    this.setState({ cvarr: items });
  };
  handleSaved = () => {
    console.log('hello');
    const adminuserId = window.sessionStorage.getItem('adminUserId');
    let obj = this.state.cvarr.map((eachItem, index) => {
      console.log(eachItem);
      // if (
      //    eachItem.sectionName !== "" &&
      //    eachItem.comments !== ""
      //    ){
      if (eachItem.id.length === 0) {
        return {
          sectionName: eachItem.sectionName,
          comments: eachItem.comments,
          updatedBy: {
            id:
              eachItem.updatedBy.id.length === 0
                ? adminuserId
                : eachItem.updatedBy.id,
          },
        };
      } else {
        return {
          id: eachItem.id,
          sectionName: eachItem.sectionName,
          comments: eachItem.comments,
          updatedBy: {
            id:
              eachItem.updatedBy.id.length === 0
                ? adminuserId
                : eachItem.updatedBy.id,
          },
        };
      }
      //  }
      //  else {
      //    this.setState({
      //     snackMsg: "Please Fill the Required Field",
      //     snackOpen: true,
      //     snackColor: "error",
      //    })
      //  }
    });
    let error = false;
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].sectionName.length === 0 || obj[i].comments.length === 0) {
        error = true;
      }
    }
    if (!error) {
      console.log(obj);
      this.props.updatecvresult(
        this.props.match.params.studentId,
        this.props.match.params.productId,
        obj,
        response => {
          if (response.status === 200) {
            this.props.getcvresult(
              this.props.match.params.studentId,
              this.props.match.params.productId,
              response => {
                console.log(response);
                this.setState({
                  cvarr: response.data,
                });
              }
            );
            this.setState({
              snackMsg: 'Saved Successfully',
              snackOpen: true,
              snackColor: 'success',
            });
          }
        }
      );
    } else {
      this.setState({
        snackMsg: 'Please Fill the Required Field',
        snackOpen: true,
        snackColor: 'error',
      });
    }
  };

  theme = createTheme({
    overrides: {
      MuiGrid: {
        'spacing-xs-3': {
          padding: '0px',
          width: '100%',
        },
      },
    },
  });
  render() {
    const { classes } = this.props;
    return (
      <div>
        <ThemeProvider theme={this.theme}>
          <Grid container>
            <Grid item md={7} style={{ marginTop: '10px' }}>
              <Grid container spacing={1} className={classes.cvinnergrid}>
                <Grid item md={12} className={classes.cvmaingrid}>
                  {this.state.cvarr.map((data, index) => (
                    <Grid container spacing={3} className={classes.cvarrgrid}>
                      <Grid item md={12}>
                        <TextField
                          label='Section Name'
                          value={data.sectionName}
                          onChange={e =>
                            this.handleTextChange(e, index, 'sectionName')
                          }
                        />
                      </Grid>
                      <Grid item md={10}>
                        <TextField
                          fullWidth
                          label="Editor/Mentor's Comment"
                          value={data.comments}
                          onChange={e =>
                            this.handleTextChange(e, index, 'comments')
                          }
                        />
                      </Grid>
                      <Grid item md={2} className={classes.icongrid}>
                        <div className={classes.icondiv}>
                          <AddCircleOutlineIcon
                            className={classes.addstyle}
                            color='primary'
                            onClick={() => {
                              this.handleAdd();
                            }}
                          />
                          <DeleteOutlineIcon
                            color='secondary'
                            onClick={() => {
                              this.handleDelete(data, index);
                            }}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                <Grid container className={classes.bottommain}>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    xl={12}
                    lg={12}
                    className={classes.bottominnergrid}
                  >
                    <hr />
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    xl={12}
                    lg={12}
                    className={classes.bottomsecondgrid}
                  >
                    <hr />
                    <div className={classes.buttondiv}>
                      <PrimaryButton
                        variant={'contained'}
                        color={'primary'}
                        onClick={() => this.handleSaved()}
                        className={classes.buttonstyle}
                      >
                        Save
                      </PrimaryButton>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <MySnackBar
                onClose={() => this.setState({ snackOpen: false })}
                snackOpen={this.state.snackOpen}
                snackVariant={this.state.snackColor}
                snackMsg={this.state.snackMsg}
              />
            </Grid>
            <Grid item md={5}>
              <CvViewer doctype={'cv'} {...this.props} />
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    );
  }
}
const useStyles = theme => ({
  cvmaingrid: {
    maxHeight: '89vh',
    overflowY: 'scroll',
  },
  cvinnergrid: {
    height: '100%',
  },
  cvarrgrid: {
    padding: '20px',
  },
  icongrid: {
    display: 'flex',
    alignItems: 'end',
  },
  icondiv: {
    display: 'flex',
  },
  addstyle: {
    marginRight: '8px',
  },
  bottommain: {
    height: '84px',
    display: 'flex',
    alignSelf: 'flex-end',
  },
  bottominnergrid: {
    width: '964px',
    marginLeft: '10px',
    marginRight: '11px',
    marginTop: '10px',
  },
  bottomsecondgrid: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  buttondiv: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    marginTop: '-8px',
  },
  buttonstyle: {
    width: '100px',
    display: 'flex',
    marginRight: '21px',
    marginBottom: '2px',
  },
});
const mapStateToProps = state => {
  return {
    getcvresultList: state.ProfileGapAnalysisReducer.getcvresult,
    deletecvresultList: state.ProfileGapAnalysisReducer.deletecvresult,
    updatecvresultList: state.ProfileGapAnalysisReducer.updatecvresult,
  };
};
export default connect(mapStateToProps, {
  getcvresult,
  deletecvresult,
  updatecvresult,
})(withStyles(useStyles)(CV));
