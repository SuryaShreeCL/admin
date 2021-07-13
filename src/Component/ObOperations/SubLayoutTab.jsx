import { Grid, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThemedTab, ThemedTabs } from '../Utils/ThemedComponents';
import WorkExperience from '../ObCallSummary/workExperience';
import GraduateTestResult from '../ObCallSummary/graduateTestResult';
import AspirationDetails from '../ObCallSummary/aspirationDetails';
import TestEngineResult from '../ObCallSummary/testEngineResult';
import AdmissionServices from '../ObCallSummary/admissionServices';
class SubLayoutTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabCount: 0
        }
    }

    renderContent = (count) => {
        try {
            if (count === 0) {

            }
            if (count === 1) {

            }
            if (count === 2) {
                return <WorkExperience {...this.props} />
            }
            if (count === 3) {
                return <AspirationDetails {...this.props} />
            }
            if (count === 4) {
                return <GraduateTestResult {...this.props} />
            }
            if (count === 5) {
                return <TestEngineResult {...this.props} />
            }
            if (count === 6) {
                return <AdmissionServices {...this.props} />
            }
        } catch (error) {

        }
    }

    render() {
        return (
            <Grid container>
                <Grid item md={12}>
                    <ThemedTabs
                        value={this.state.tabCount}
                        textColor={"inherit"}
                        onChange={(e, value) => this.setState({ tabCount: value })}
                        aria-label="ant example"
                    >
                        <ThemedTab label="Personal Info" />
                        <ThemedTab label="Academic Info" />
                        <ThemedTab label="Work Experience" />
                        <ThemedTab label="Aspiration Details" />
                        <ThemedTab label="Graduate Admission Test" />
                        <ThemedTab label="Test and Surveys" />
                        <ThemedTab label="Others" />
                    </ThemedTabs>
                </Grid>
                <Grid item md={12}>
                    {this.renderContent(this.state.tabCount)}
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({

})

const useStyles = () => ({

})


export default connect(mapStateToProps, {})(withStyles(useStyles)(SubLayoutTab))