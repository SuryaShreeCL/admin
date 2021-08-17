import { Card, Box, Grid } from "@material-ui/core";
import React, { Component } from "react";
import "../Assets/App.css";
import { CardTitle} from "../Assets/StyledComponents";
import DropDown from "../Utils/DropDown";
import PlusButton from "../Utils/PlusButton";
import TabBar from "./TabBar";
import Table from "./Table";
import PaginationComponent from '../Utils/PaginationComponent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


export default class ViewStudyPlans extends Component {

  months=[
        '1st Month',
        '2nd Month',
        '3rd Month',
        '4th Month',
        '5th Month',
        '6th Month'


    ]
  render() {
    const { courses } = this.props;
    return (
      <div style={{padding:"10px 5px 5px"}}>
        <Card className={"card"}>
          <Grid container spacing={3} style={{ padding: "12px" }}>
            {/* title */}
            <Grid item md={12}>
              <CardTitle>Study plan</CardTitle>
            </Grid>

            {/* dropdown and button */}

            <Grid
              container
              justifyContent="space-between"
              style={{ padding: "12px" }}
            >
              <Grid item md={3} xs={3}>
                <DropDown fullWidth label="Course" name="course" />
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
              <Grid item md={3} style={{backgroundColor: '#FAFAFA'}}>
              <List component="nav" aria-labelledby="nested-list-subheader">
                <ListItem 
                className={"list_button"}
                button >
                  <ListItemText className={"list_item"}
                  primary="1 st Month" />
                </ListItem>
                <ListItem button>
                  <ListItemText className={"list_item"}
                  primary="2nd Month" />
                </ListItem>
                <ListItem button>
                  <ListItemText className={"list_item"}
                  primary="3rd Month" />
                </ListItem>
                <ListItem button>
                  <ListItemText className={"list_item"}
                  primary="4th Month" />
                </ListItem>
                <ListItem button>
                  <ListItemText className={"list_item"}
                  primary="5th Month" />
                </ListItem>
                <ListItem button>
                  <ListItemText className={"list_item"}
                  primary="6th Month" />
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
