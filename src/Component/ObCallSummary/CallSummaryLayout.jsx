import { Divider, Grid, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PrimaryButton from '../../Utils/PrimaryButton';
import { ThemedTab, ThemedTabs } from "../Utils/ThemedComponents"
import ClientDetails from './ClientDetails';
import Question from './textEditor';
import AcademicInfo from './academicInfo';
import Rating from './Rating';
class CallSummaryLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftTabCount: 0,
            rightTabCount: 0,
        }
    }

    renderLeftContent = (value) => {
        try {
            if (value === 0) {
                return <ClientDetails {...this.props} />
            } else if (value === 1) {
                return <Question {...this.props} />
            }
            else if (value === 2) {
                return <Rating {...this.props} />
            }
        } catch (error) {
            console.log(error)
        }
    }

    renderRightContent = (value) => {
        try {

        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <Grid container spacing={2}>
                <Grid item md={12} container justify={"space-between"} alignItems={"center"}>
                    <Typography variant="h6">
                        OnBoarding Call Summary
                    </Typography>
                    <PrimaryButton variant={"contained"} color={"primary"} >
                        Save Call Summary
                    </PrimaryButton>
                </Grid>
                <Grid item md={12}>
                    <Divider style={{ backgroundColor: "#cacaca" }} />
                </Grid>
                <Grid item md={8}>
                    <Grid container>
                        <Grid item md={12}>
                            <ThemedTabs
                                value={this.state.leftTabCount}
                                textColor={"inherit"}
                                onChange={(e, value) => this.setState({ leftTabCount: value })}
                                aria-label="ant example"
                            >
                                <ThemedTab label="Client Details" />
                                <ThemedTab label="Questions" />
                                <ThemedTab label="Rating" />
                            </ThemedTabs>
                        </Grid>
                        <Grid item md={12}>
                            {this.renderLeftContent(this.state.leftTabCount)}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={4}>
                    <Grid container>
                        <Grid item md={12}>
                            <ThemedTabs
                                value={this.state.rightTabCount}
                                textColor={"inherit"}
                                onChange={(e, value) => this.setState({ rightTabCount: value })}
                                aria-label="ant example"
                            >
                                <ThemedTab label="Checklist" />
                                <ThemedTab label="Resources" />
                                <ThemedTab label="Verification" />
                            </ThemedTabs>
                        </Grid>
                        
                    </Grid>
                    </Grid>
                    </Grid>
                    );
    }
}

const mapStateToProps = (state) => {
    return {

                    }
}

                    export default connect(mapStateToProps, { })(CallSummaryLayout)