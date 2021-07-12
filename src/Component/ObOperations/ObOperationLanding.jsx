import { createMuiTheme, Divider, Grid, Typography, ThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodayDocument from './TodayDocument';
import TodayWorkCompletion from './TodayWorkCompletion';
import add from "../../Asset/Images/add.svg"
class ObOperationLanding extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    theme = createMuiTheme({
        overrides : {
            MuiDivider : {
                root : {
                    margin : "revert"
                }
            }
        }
    })
    render() {
        return (
          <Grid container>
              <Grid item md={4}>
                 <Grid container spacing={2}>
                    <Grid item md={12} sm={12}>
                    <TodayWorkCompletion
                {...this.props}
                />
                    </Grid>
                    <Grid item md={12} sm={12}>
                    <TodayDocument
                {...this.props}
                />
                    </Grid>
                 </Grid>

              </Grid>
              <Grid item md={1}>
                  <ThemeProvider theme={this.theme}>
                <Divider orientation={"vertical"} style={{backgroundColor : "#cacaca", height : "100vh"}} />
                </ThemeProvider>
            </Grid>
            <Grid item md={7}>
            <div style={{width : "100%", height : "50vh", display : "flex", alignItems : "center", justifyContent : "center", borderRadius : "8px", boxShadow : "0px 0px 8px 1px rgba(72, 166, 227, 0.1)", cursor : "pointer"}}>
                <img src={add}></img>
                <Typography color="primary">Add new widget</Typography>
            </div>
            </Grid>
          </Grid>
        );
    }
}

export const mapStateToProps = (state) =>({

})

export default connect(mapStateToProps, {})(ObOperationLanding)