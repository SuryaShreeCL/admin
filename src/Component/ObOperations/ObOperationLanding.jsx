import { createMuiTheme, Divider, Grid, Typography, ThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodayDocument from './TodayDocument';
import TodayWorkCompletion from './TodayWorkCompletion';
import add from "../../Asset/Images/add.svg"
class ObOperationLanding extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    theme = createMuiTheme({
        overrides: {
            MuiDivider: {
                root: {
                    margin: "revert"
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
                        <Divider orientation={"vertical"} style={{ backgroundColor: "#cacaca", height: "100vh" }} />
                    </ThemeProvider>
                </Grid>
                <Grid item md={7}>
                    <div style={{ width: "100%", height: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src={add}></img>
                        <Typography color="primary">Add new widget</Typography>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {})(ObOperationLanding)