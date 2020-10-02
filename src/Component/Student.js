import React, { Component } from "react";
import "../Asset/StudentData.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import MaterialTable from 'material-table';
import history from "./History";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

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


  componentDidMount() {
    axios
      .get("http://services.thecareerlabs.com:8080/api/v1/students", {
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
    history.push('/students/' + rowData.id)
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
