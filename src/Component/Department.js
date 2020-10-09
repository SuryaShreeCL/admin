import React, { Component,forwardRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import {URL} from '../Actions/URL'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {getBranches} from '../Actions/College'
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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import MaterialTable from 'material-table'

export class Department extends Component {

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

    tableTheme=()=>createMuiTheme({
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
    });

    col = [
        { title: 'Id', field: 'id', },
        { title: 'Name', field: 'name' },        
    ];

    componentDidMount() {
        this.props.getBranches();
    }

    shouldComponentUpdate(nextProps,nextState){
        if(this.props.DepartmentList.length!==0){
            return false;
        }
        else{
            return true;
        }
    }

    
    
    render() {        
        console.log(this.props.DepartmentList);
        return (
            <ThemeProvider theme={this.tableTheme()}>
            <div>
                <MaterialTable 
                icons={this.tableIcons}
                columns={this.col}
                data={this.props.DepartmentList}
                title='Departments'    
                options={{
                    search:true,
                    headerStyle: {
                      fontWeight: "bold",
                    },
                    minBodyHeight: '420px',
                    maxBodyHeight: '420px'
                  }}            
                />
            </div>
            </ThemeProvider>
        )
    }
}
const mapStateToProps=state=>{
    return {
        DepartmentList:state.CollegeReducer.BranchList,
    }
}
export default connect(mapStateToProps,{getBranches})(Department)
