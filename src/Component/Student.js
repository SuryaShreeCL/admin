import React, { Component, forwardRef } from "react";
import "../Asset/StudentData.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import MaterialTable from "material-table";
import history from "./History";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { getStudents, getStudentPaginate } from "../Actions/Student";
import { connect } from "react-redux";
import { URL } from "../Actions/URL";
import { studentIdPath } from "./RoutePaths";
import TableComponent from "./TableComponent/TableComponent";

export class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  // stu_header = [
  //   { title: 'ID', field: 'studentID' },
  //   // { title: 'Last Name', field: 'lastName' },
  //   { title: 'Full Name', field: 'fullName' },
  //   { title: 'Email Id', field: 'emailId' },
  //   { title: 'Phone', field: 'phoneNumber' },
  //   { title: 'Department', field: 'department.name' },
  //   // { title: 'UGGPA', field: 'uggpa' },
  // ];

  stu_header = [
    { title: "ID", fieldName: "studentID" },
    // { title: 'Last Name', field: 'lastName' },
    { title: "Full Name", fieldName: "fullName" },
    { title: "Email Id", fieldName: "emailId" },
    { title: "Phone", fieldName: "phoneNumber" },
    { title: "Department", fieldName: "department.name" },
    // { title: 'UGGPA', field: 'uggpa' },
  ];

  tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  componentDidMount() {
    this.props.getStudents();
    this.props.getStudentPaginate(0, 20);
  }

  rowClick = (rowData) => {
    history.push(studentIdPath + rowData.id);
  };

  getmuitheme = () =>
    createMuiTheme({
      overrides: {
        MuiTypography: {
          h6: {
            fontWeight: "bold",
          },
        },
      },
    });

  paginate = (page, size, keyword) => {
    this.props.getStudentPaginate(page, size, keyword);
  };

  render() {
    return (
      <MuiThemeProvider theme={this.getmuitheme}>
        <div>
          {/* <MaterialTable            
            columns={this.stu_header}
            icons={this.tableIcons}
            data={this.props.StudentsList}
            isLoading={(this.props.StudentsList.length===0) ? true : false}
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
          /> */}

          {this.props.StudentFilterList.length !== 0 ? (
            <TableComponent
              data={
                this.props.StudentFilterList.length !== 0
                  ? this.props.StudentFilterList.content
                  : null
              }
              cols={this.stu_header}
              onRowClick={this.rowClick}
              onSearch={this.paginate}
              paginate={this.paginate}
              totalCount={this.props.StudentFilterList.totalElements}
              title={"Student"}
              pageCount={this.props.StudentFilterList.totalPages}
            />
          ) : (
            ""
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    StudentsList: state.StudentReducer.StudentsList,
    StudentFilterList: state.StudentReducer.StudentFilterList,
  };
};
export default connect(mapStateToProps, { getStudents, getStudentPaginate })(
  Student
);
