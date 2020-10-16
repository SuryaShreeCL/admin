import React, { Component,forwardRef } from 'react'
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
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {addCoursePath,editCoursePath} from './RoutePaths'

export class Courses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
      };


    col = [
        { title: 'Id', field: 'courseId' },
        { title: 'Name', field: 'name' },
        //  { title: 'Course Category', field: 'courseCategory' },
        // { title: 'Domains', field: 'domains' },
        // { title: 'Action', field: 'id', render: rowData => <> <button id={rowData.id} onClick={this.getEditId} className="btn btn-primary btn-sm" style={{ marginTop: '0px' }}> <i className="fa fa-pencil-square-o"></i> Edit</button><button id={rowData.id} onClick={this.getDeleteId} className="btn btn-danger btn-sm" style={{ marginTop: '0px', marginLeft: '5px' }}> <i className="fa fa-pencil-square-o"></i> Delete</button></> },
    ];

    componentDidMount() {
        this.props.getCourses()              
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
        return (
            <ThemeProvider theme={this.getmuitheme()}>
                <div>
                    <div className="course-mtoolbar">
                        <MaterialTable
                            columns={this.col}
                            data={this.props.CourseList}
                            title="Courses"
                            onRowClick=""                            
                            icons={this.tableIcons}
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
                                        history.push(addCoursePath);
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
                                            disabled
                                        >
                                            Delete
                                        </Button>
                                    ),
                                    tooltip: 'Delete Course',
                                    // onClick: (event, rowData) => {
                                    //     history.push(editCoursePath + rowData.id);
                                    // }
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

export default connect(mapStateToprops,{getCourses})(Courses)
