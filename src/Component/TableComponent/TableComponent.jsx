import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";
import TablePagination from "@material-ui/core/TablePagination";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Spinner from "./Utils/Spinner";

export default class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      rowCount: 20,
      pageCount:1,
      tableColumn: null,
      tableData: null,      
    };
    this.flag=false;
  }

  tableColumn = this.props.cols;  

  tableData = this.props.data !== null ? this.props.data : null;

  componentDidUpdate(prevProps,prevState) {
    if (this.props !== prevProps) {
      if (this.props.data !== null) {
        this.setState({ tableColumn: this.props.cols });
        this.setState({ tableData: this.props.data });        
      }      
    }

    if(prevState.pageCount!==this.state.pageCount || prevState.rowCount !==this.state.rowCount){
      this.props.paginate(this.state.pageCount,this.state.rowCount);
    }
  }

  paginationTheme = () =>
    createMuiTheme({
      overrides: {
        MuiSvgIcon: {
          root: {
            color: "black",
          },
        },
      },
      palette: {
        primary: {
          main: "#009be5",
        },
      },
    });
  handleChangePage = (e, newPage) => {
    this.props.paginate(5,8);
  };

  renderHeader = () => {
    const { body } = table;
    return this.state.tableColumn.map((col) => {
      return <th style={body.th}> {col.title} </th>;
    });
  };

  renderTableData = () => {
    const { body } = table;
    return this.state.tableData.map((row, index) => {
      return (
        <tr key={index} onClick={(e)=>this.props.onRowClick(row)} style={body.tr}>
          {this.tableColumn.map((col) => {            
            return (
              <td style={body.td}>
                {eval("row" + "." + col.fieldName.toString())}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  renderPageNavigator=()=>{    
    return <Pagination
    count={parseInt(this.props.totalCount/10)}
    color={"primary"}
    // onChange={(e,page)=>this.setState({pageNumberCount:page})}
    onChange={(e,page) => this.setState({pageCount:page})}
    showFirstButton    
    showLastButton
  />
  }
  
  // handleRowChange(val){
  //   this.setState({rowCount:val});        
  // }
  // handlePageChange(page){
  //   this.setState({pageCount:page});
  // }

  renderRowPerPage=()=>{
    const { footer } =table
    return <div style={footer.perPage}>
    <label style={footer.perPageLabel}>Rows per page:</label>
    <FormControl>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={this.state.rowCount}
        onChange={(e) => this.setState({rowCount:e.target.value})}
        autoWidth
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
        <MenuItem value={30}>50</MenuItem>
      </Select>
    </FormControl>
  </div>;
  }



  render() {             
    const { header, spacer, footer, body } = table;    
    return (
      <div>      
        {/* paper Container */}
        <Paper elevation={3} style={{overflowY:'hidden',position:'relative'}} >
          {/* Table Header */}
          <Grid container>
            <Grid item md={12} style={header.container}>
              <div style={header.title}>
                <label>{this.props.title}</label>
              </div>
              <div>
                <TextField
                  variant="outlined"
                  size="small"
                  color="primary"
                  label="search"
                />
              </div>
              <div style={header.search.button}>
                <Button variant="contained" color="primary">
                  Search
                </Button>
              </div>
            </Grid>

            {/* Table Body */}
            <Grid item md={12} style={body.container}>
              <table border="1px solid" style={body.table} cellPadding='10px' >
                {this.state.tableData !== null ? (
                  <>
                    <thead style={body.thead}>
                      {/* render Header  */}

                      {this.renderHeader()}
                    </thead>
                    <tbody>{this.renderTableData()}</tbody>                                        
                  </>
                ) : (
                  <Spinner visible={true} />
                )}
              </table>
            </Grid>

            {/* Table Footer */}
            <Grid item md={12} style={footer.container}>
              <ThemeProvider theme={this.paginationTheme()}>
              {this.state.tableData !== null ? <>
                <div style={spacer}></div>
                {this.renderRowPerPage()}                
                <div>
                  {this.renderPageNavigator()}
                </div>
                </> : ''}
              </ThemeProvider>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

const table = {
  header: {
    container: {
      display: "flex",
      alignItems: "center",
      padding: 10,
    },
    title: {
      flex: 1,
      fontSize: 22,
    },
    search: {
      text: {},
      button: {
        marginLeft: 10,
      },
    },
  },
  footer: {
    container: {
      display: "flex",
      padding:10,      
    },
    perPage: {
      display: "flex",
      alignItems: "flex-end",
      paddingRight: 10,
    },
    perPageLabel: {
      paddingRight: 10,
    },
  },
  spacer: {
    flex: 1,
  },
  body: {
    container: {
      padding: 10,
    },
    table: {
      minWidth: 300,
      maxWidth: "100%",
      border: "none",
    },
    thead: {
      border: "none",
    },
    th: {
      textAlign: "center",
      border: "none",
      borderBottom: "1px solid rgba(224, 224, 224, 1",
      fontSize: 16,
    },
    tr: {
      cursor: "pointer",
    },
    td: {
      border: "none",      
      borderBottom: "1px solid rgba(224, 224, 224, 1",
      padding:'20px',
    },
  },
};