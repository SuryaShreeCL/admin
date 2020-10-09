import React, { Component,forwardRef } from "react";
import "../Asset/StudentData.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import MaterialTable from 'material-table';
import history from "./History";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
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
import {URL} from '../Actions/URL'
import { studentIdPath } from './RoutePaths'

export default class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };

  }

  stu_header = [
    { title: 'Customer Id', field: 'id' },
    // { title: 'First Name', field: 'firstName' },
    // { title: 'Last Name', field: 'lastName' },
    { title: 'Full Name', field: 'fullName' },
    { title: 'Email Id', field: 'emailId' },
    { title: 'Phone', field: 'phoneNumber' },
    // { title: 'UGGPA', field: 'uggpa' },
  ];

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

  componentDidMount() {
       
    axios
      .get(URL+"/api/v1/students", {
        crossDomain: true,
      })
      .then((res) => res.data)

      .then((result) => {
        console.log(result);
        this.setState({
          data: result,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  rowClick = (ev, rowData) => {
    history.push(studentIdPath + rowData.id)
  }

  getmuitheme = () => createMuiTheme({
    overrides: {
      MuiTypography: {
        h6: {
          fontWeight: 'bold',
        }
      },
    }
  })


  render() {

    return (
      <MuiThemeProvider theme={this.getmuitheme}>
        <div>
          <MaterialTable            
            columns={this.stu_header}
            icons={this.tableIcons}
            data={this.state.data}
            title="Student Details"
            onRowClick={this.rowClick}
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
      </MuiThemeProvider>
    );
  }
}
