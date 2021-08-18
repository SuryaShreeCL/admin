import { Card, Box, Grid } from "@material-ui/core";
import React, { Component } from "react";
import "../Assets/App.css";
import { CardTitle } from "../Assets/StyledComponents";
import DropDown from "../Utils/DropDown";
import PlusButton from "../Utils/PlusButton";
import TabBar from "./TabBar";
import Table from "./Table";
import PaginationComponent from "../Utils/PaginationComponent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { getCourses,createFileUpload } from "../Redux/Action/CourseMaterial";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  componentDidMount() {
    this.props.getCourses();
  }

  render() {
    const { courses } = this.props;
    return (
      <div
      // style={{ padding: "10px 5px 5px" }}
      >
        <Card className={"card"}>
          <Grid container spacing={3} style={{ padding: "12px" }}>
            {/* title */}

            <Grid item md={12} style={{ padding: "15px" }}>
              <CardTitle>Study plan</CardTitle>
            </Grid>

            {/* dropdown and button */}

            <Grid
              container
              justifyContent="space-between"
              style={{ padding: "12px" }}
            >
              <Grid item md={3} xs={3}>
                <Autocomplete
                  id="combo-box-demo"
                  options={[{title:"hiii", title:'knknki'} ]}
                  getOptionLabel={(option) => option.title}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Combo box"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>

              <Grid item md={2} className={"button_div"}>
                <PlusButton
                // onClick={handlePlusButton}
                >
                  Add New Study Plan
                </PlusButton>
              </Grid>
            </Grid>

            {/* tabBar */}
            <Grid item md={12}>
              <TabBar />
            </Grid>

            {/* table */}
            <Grid container>
              <Grid item md={3} style={{ backgroundColor: "#FAFAFA" }}>
                <List component="nav" aria-labelledby="nested-list-subheader">
                  <ListItem className={"list_button"} button>
                    <ListItemText
                      className={"list_item"}
                      primary="1 st Month"
                    />
                  </ListItem>
                  <ListItem button>
                    <ListItemText className={"list_item"} primary="2nd Month" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText className={"list_item"} primary="3rd Month" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText className={"list_item"} primary="4th Month" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText className={"list_item"} primary="5th Month" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText className={"list_item"} primary="6th Month" />
                  </ListItem>
                </List>
              </Grid>

              <Grid item md={9}>
                <Table />
                <Grid
                  item
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PaginationComponent pageCount={2} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    courses: state.CourseMaterialReducer.courses,
    uploadResponse : state.CourseMaterialReducer.courses
  };
};

export default connect(mapStateToProps, {
  getCourses,createFileUpload
})(Index);
