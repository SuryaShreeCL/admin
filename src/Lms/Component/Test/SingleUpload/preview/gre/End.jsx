import { Box, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React, { Component } from 'react';
import {
  Content,
  greTheme,
  InnerContent,
  Divider,
} from '../../../../../assets/css/GreStyles';
import Layout from './Layout';
import { connect } from 'react-redux';
import { getTestSection } from '../../../../../redux/action/Test';
import QueryString from 'qs';
import { routePaths } from '../../../../../routes/RoutePath';

export class End extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  handleNextClick = () => {
    const { testQuestionSetId, currentSection, totalSection } =
      QueryString.parse(this.props.location.search, {
        ignoreQueryPrefix: true,
      });

    if (parseInt(currentSection) < totalSection) {
      this.props.getTestSection();

      this.props.history.push(
        `${
          routePaths.gre.instruction
        }?testQuestionSetId=${testQuestionSetId.trim()}&section=true`
      );
    } else this.props.history.push(routePaths.progress);
  };

  render() {
    const { testQuestionSetId, currentSection, totalSection } =
      QueryString.parse(this.props.location.search, {
        ignoreQueryPrefix: true,
      });

    const layoutProps = {
      showPrimaryButton: true,
      primaryButtonText: 'Continue',
      sectionData: { data: { currentSection, totalSections: totalSection } },
      showSection: true,
      handleNextClick: this.handleNextClick,
    };

    return (
      <ThemeProvider theme={greTheme}>
        <Layout {...layoutProps}>
          <Content>
            <InnerContent>
              <Box pt={2}>
                <Typography variant={'h1'} color='textPrimary'>
                  Section Finished
                </Typography>
              </Box>
              <Box pt={2}>
                <Divider orientation='horizontal' />
              </Box>
              <Typography variant='h6' color='textPrimary'>
                <Box pt={3}>
                  You have finished this section and now we begin the next one.
                </Box>

                <Box pt={2} display='flex'>
                  Select &nbsp;
                  <Box fontWeight={700}>Continue</Box>
                  &nbsp; to proceed
                </Box>
              </Typography>
            </InnerContent>
          </Content>
        </Layout>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    sectionResponse: state.testReducer.testSection,
  };
};

export default connect(mapStateToProps, {
  getTestSection,
})(End);
