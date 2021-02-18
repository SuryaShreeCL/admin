import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";
import TablePagination from "@material-ui/core/TablePagination";
import { createMuiTheme, Hidden, ThemeProvider } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit"
import Spinner from "./Utils/Spinner";

export default class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowCount: 20,
      pageCount: 0,
      searchKeyword: "",
      tableColumn: null,
      tableData: null,
    };
    this.flag = false;
  }

  tableColumn = this.props.cols;

  tableData = this.props.data !== null ? this.props.data : null;

  componentDidMount() {
    this.setState({ tableColumn: this.props.cols });
    this.setState({ tableData: this.props.data });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      if (this.props.data !== null) {
        this.setState({ tableColumn: this.props.cols });
        this.setState({ tableData: this.props.data });
      }
    }

    if (
      prevState.pageCount !== this.state.pageCount ||
      prevState.rowCount !== this.state.rowCount ||
      prevState.searchKeyword !== this.state.searchKeyword
    ) {
      this.props.paginate(
        this.state.pageCount,
        this.state.rowCount,
        this.state.searchKeyword
      );
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

  renderHeader = () => {
    const { body } = table;
    return (
      <>
        {this.state.tableColumn.map((col) => {
          return (
            <>
              <th style={body.th}>{col.title}</th>
            </>
          );
        })}
        {this.props.action ? (
          <th
            style={body.th}
            colSpan={this.props.onEdit && this.props.onDelete ? 2 : 1}
          >
            Actions
          </th>
        ) : null}
      </>
    );
  };

  renderAction = (data) => {
    const { body } = table;
    return (
      <>
        {this.props.onEdit ? (
          <td style={body.td}>
            <Button
              variant="contained"
              color="primary"
              name='action'
              onClick={(e) =>{
                e.stopPropagation();
                  if(typeof this.props.onEditClick === "function"){
                  this.props.onEditClick(data)
                }
              }
              }
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </td>
        ) : null}
        {this.props.onDelete ? (
          <td style={body.td}>
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) =>{
                e.stopPropagation();
                  if(typeof this.props.onDeleteClick === "function"){
                  this.props.onDeleteClick(data)
                }
              }
              }
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </td>
        ) : null}
      </>
    );
  };

  renderTableData = () => {
    const { body } = table;
    return this.state.tableData.map((row, index) => {
      return (
        <tr
          key={index}
          onClick={(e) => {
            if(this.props.onRowClick!==undefined)
            this.props.onRowClick(row)
          }}
          style={body.tr}
        >
          {this.tableColumn.map((col) => {
            var split = "";
            if (col.fieldName.indexOf(".") !== -1) {
              var split = col.fieldName.split(".", 1);
            }
            return (
              <td style={body.td}>
                {split === ""
                  ? eval("row" + "." + col.fieldName.toString())
                  : eval("row" + "." + split[0]) !== null
                  ? eval("row" + "." + col.fieldName.toString())
                  : null}
              </td>
            );
          })}
          {this.props.action ? this.renderAction(row) : null}
        </tr>
      );
    });
  };

  renderPageNavigator = () => {
    return (
      <Pagination
        count={
          this.props.pageCount === undefined ||
          this.props.pageCount === "" ||
          this.props.pageCount === null
            ? parseInt(this.props.totalCount / this.state.rowCount)
            : this.props.pageCount
        }
        color={"primary"}
        // onChange={(e,page)=>this.setState({pageNumberCount:page})}
        onChange={(e, page) => this.setState({ pageCount: page - 1 })}
        showFirstButton
        showLastButton
      />
    );
  };

  // handleRowChange(val){
  //   this.setState({rowCount:val});
  // }
  // handlePageChange(page){
  //   this.setState({pageCount:page});
  // }

  renderRowPerPage = () => {
    const { footer } = table;
    return (
      <div style={footer.perPage}>
        <>
          <label style={footer.perPageLabel}>Rows per page:</label>
          <FormControl>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={this.state.rowCount}
              onChange={(e) => this.setState({ rowCount: e.target.value })}
              autoWidth
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
        </>
      </div>
    );
  };

  render() {
    const { header, spacer, footer, body } = table;
    var spin=true    
    return (
      <div>
        {/* paper Container */}
        <Paper
          elevation={3}
          style={{ overflowY: "hidden", position: "relative" }}
        >
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
                  value={this.state.searchKeyword}
                  onChange={(e) =>
                    this.setState({ searchKeyword: e.target.value })
                  }
                />
              </div>
              {this.props.add ? (
                <div style={header.search.button}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) =>
                      typeof this.props.onAddClick === "function"
                        ? this.props.onAddClick(e)
                        : null
                    }
                    startIcon={<AddIcon />}
                  >
                    Add
                  </Button>
                </div>
              ) : null}
            </Grid>

            {/* Table Body */}
            <Grid item md={12} style={body.container}>
              <table border="1px solid" style={body.table} cellPadding="10px">
                {this.state.tableData !== null ? (
                  <>
                    <thead style={body.thead}>
                      {/* render Header  */}

                      {this.renderHeader()}
                    </thead>
                    <tbody>{this.renderTableData()}</tbody>
                  </>
                ) : (                                    
                  <Spinner visible={spin} />                                                                      
                )}
              </table>
            </Grid>

            {/* Table Footer */}
            <Grid item md={12} style={footer.container}>
              <ThemeProvider theme={this.paginationTheme()}>
                {this.state.tableData !== null ? (
                  <>
                    <div style={spacer}></div>
                    <div style={footer.totalCount}>
                      <label style={footer.totalCountLabel}>
                        Total No of record
                      </label>{" "}
                      : {this.props.totalCount}
                    </div>
                    {this.renderRowPerPage()}
                    <div>{this.renderPageNavigator()}</div>
                  </>
                ) : (
                  ""
                )}
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
      padding: 10,
    },
    totalCount: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0px 10px",
    },
    totalCountLabel: {
      margin: "0px",
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
      padding: "20px",
    },
  },
};
