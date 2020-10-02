import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import MaterialTable from 'material-table'
import axios from 'axios'
import $ from 'jquery'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import history from './History'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import {getCourses} from '../Actions/Course'

const useStyles = theme => ({
    header: {
        backgroundColor: 'red',
    }
});


//var dt = require( 'datatables.net' )();

export class Courses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }


    col = [
        { title: 'Id', field: 'courseId' },
        { title: 'Name', field: 'name' },
        //  { title: 'Course Category', field: 'courseCategory' },
        // { title: 'Domains', field: 'domains' },
        // { title: 'Action', field: 'id', render: rowData => <> <button id={rowData.id} onClick={this.getEditId} className="btn btn-primary btn-sm" style={{ marginTop: '0px' }}> <i className="fa fa-pencil-square-o"></i> Edit</button><button id={rowData.id} onClick={this.getDeleteId} className="btn btn-danger btn-sm" style={{ marginTop: '0px', marginLeft: '5px' }}> <i className="fa fa-pencil-square-o"></i> Delete</button></> },
    ];

    componentDidMount() {
        this.props.getCourses()
        
        // axios.get("/api/v1/courses", {
        //     crossDomain: true
        // })
        //     .then(res => res.data)
        //     .then(result => {


        //         console.log(result)
        //         this.setState({
        //             data: result
        //         })
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }
    getmuitheme = () => createMuiTheme({
        palette: {
            primary: {
                main: '#007bff',
            }
        },
        overrides: {
            MuiTypography: {
                h6: {
                    fontWeight: 'bold',
                }
            },
            MuiIconButton: {
                root: {
                    '&:hover': {
                        backgroundColor: 'none',
                        borderRadius: 0,
                    }
                }
            },

        }
    })

    render() {
        const { classes } = this.props;
        return (
            <ThemeProvider theme={this.getmuitheme()}>
                <div>
                    <div className="course-mtoolbar">
                        <MaterialTable
                            columns={this.col}
                            data={this.props.CourseList}
                            title="Courses"
                            onRowClick=""
                            className={classes.root}
                            options={{
                                headerStyle: {
                                    backgroundColor: '#01579b',
                                    color: '#FFF',
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
                                            size="small"
                                        >
                                            Add Course
                                        </Button>
                                    ),
                                    tooltip: 'Create Course',
                                    isFreeAction: true,
                                    onClick: (event, rowData) => {
                                        history.push('/courses/add');
                                    }
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
                                    tooltip: 'Edit Course',
                                    onClick: (event, rowData) => {
                                        history.push('courses/edit/' + rowData.id);
                                    },
                                },
                                {
                                    icon: () => (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<DeleteIcon />}
                                            size="small"
                                        >
                                            Delete
                                        </Button>
                                    ),
                                    tooltip: 'Delete Course',
                                    onClick: (event, rowData) => {
                                        history.push('courses/edit/' + rowData.id);
                                    }
                                }
                            ]}
                            options={{
                                actionsColumnIndex: -1,
                                headerStyle: {
                                    fontWeight: 'bold',
                                },
                                minBodyHeight: '420px',
                                maxBodyHeight: '420px',
                            }}
                        />
                    </div>
                    {console.log(this.props.CourseList)}
                </div>
            </ThemeProvider>
        )
    }
}
const mapStateToprops=(state)=>{
    console.log(state);
    return{CourseList:state.CourseReducer.CourseList}
}

export default connect(mapStateToprops,{getCourses}) (withStyles(useStyles)(Courses))
