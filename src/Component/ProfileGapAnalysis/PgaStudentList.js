import React, { Component } from 'react'
import Loader from "../Utils/controls/Loader";
import {
    Grid,
    IconButton,
    TextField,
    Typography,
  } from "@material-ui/core";
  import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
  import DataGrid from "../ObOnboarding/DataGrid";
import {connect} from 'react-redux'
class PgaStudentList extends Component {
    constructor(){
        super();
        this.state={
            listOfusers:[]
        }
    }
    render() {
        const { HeadStyle, HeadDisplay } = style;
        return (
            <div>
                <Grid container spacing={3}>
          <Grid item md={12}>
              <div style={HeadDisplay}>
                <p style={HeadStyle}> List of Users in Profile Gap Analysis Stage </p>                 
               <div> 
             <TextField
                  label={
                    <Typography
                      style={{ fontSize: "13px",marginLeft:30 }}
                    >
                      Search by Email ID / Mobile / Full Name / CLS ID
                    </Typography>
                  }
                  variant="outlined"
                //   value={this.state.search}
                //   onChange={(e) => {
                //     this.setState({ search: e.target.value });
                //   }}
                //   InputLabelProps={{
                //     shrink: this.state.shrink,
                //   }}
                //   onFocus={() => this.shrink()}
                  onKeyUp={(e) => {
                    if (e.keyCode === 13) {
                      e.preventDefault();
                      document.getElementById("search").click();
                    }
                  }}
                />
                  <IconButton
                    style={{ marginLeft: "8px" }}
                    // onClick={this.handleSearch}
                    color="primary"
                    id={"search"}
                    aria-label="search"
                  >
                    <SearchRoundedIcon />
                  </IconButton>          
              </div>
              </div>
            {this.state.listOfusers.length !== 0 ? (
              <DataGrid
                data={this.state.listOfusers}
                obCallStatus={this.renderChip}
                action={this.renderManageButton}
              />
            ) : <Loader/>}
          </Grid>
        </Grid>
            </div>
        )
    }
}
const style = {
    HeadStyle: {
      fontStyle: "Poppins",
      fontWeight: "600",
      fontStyle: "normal",
      fontSize: "18px",
      color: "#052A4E",
      // padding:15
    },
    HeadDisplay: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      padding: 20,
    },
  };
  const mapStateToProps = (state) => {
    return {     
    };
  };
  
  export default connect(mapStateToProps, {
   
  })(PgaStudentList);
  