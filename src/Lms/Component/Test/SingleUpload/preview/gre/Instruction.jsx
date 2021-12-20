import { Box, ThemeProvider, Typography } from "@material-ui/core";
import React, { Component } from "react";
import {
  Content,
  Divider,
  greTheme,
  TitleBox,
  Text,
  BulletBox,
  Bullet,
  DemoBox,
  InnerContent,
} from "../../../../../assets/css/GreStyles";
import Layout from "./Layout";
import { connect } from "react-redux";
import {
  getInstructions,
  getTestSection,
} from "../../../../../redux/action/Test";
import QueryString from "qs";
import _ from "lodash";
import PrimaryButton from "./components/PrimaryButton";
// import routePaths from '../../../../../routes/RoutePath';

import { routePaths } from "../../../../../routes/RoutePath";
export class Instruction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSection: false,
      showBackButton: false,
    };
  }

  componentDidMount() {
    const { testQuestionSetId, section } = QueryString.parse(
      this.props.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );
    this.props.getInstructions(testQuestionSetId.trim(), response => {});

    if (section && _.isEmpty(this.props.sectionResponse)) {
      this.props.getTestSection();
      this.setState({ showSection: true, showBackButton: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      const { testQuestionSetId, section } = QueryString.parse(
        this.props.location.search,
        {
          ignoreQueryPrefix: true,
        }
      );
      if (section && _.isEmpty(this.props.sectionResponse)) {
        this.props.getTestSection();
      }
    }
  }

  instructions = instructionData => {
    if (instructionData !== null)
      return instructionData.data.instruction.map(item => {
        return (
          <Text>
            <BulletBox>
              <Bullet />
            </BulletBox>
            <Typography variant="body1">{item}</Typography>
          </Text>
        );
      });
  };

  handleNextClick = () => {
    const { testQuestionSetId, section, resume } = QueryString.parse(
      this.props.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );
    if (resume) {
      this.props.history.push(
        `${
          routePaths.gre.test
        }?testQuestionSetId=${testQuestionSetId.trim()}&section=true`
      );
    } else if (!section) {
      this.setState({ showSection: true, showBackButton: true });
      this.props.history.push(
        `${
          routePaths.gre.instruction
        }?testQuestionSetId=${testQuestionSetId.trim()}&section=true`
      );
    } else
      this.props.history.push(
        `${
          routePaths.gre.test
        }?testQuestionSetId=${testQuestionSetId.trim()}&section=true`
      );
  };

  handleBackClick = () => {
    const { testQuestionSetId, section } = QueryString.parse(
      this.props.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );
    if (section) {
      this.setState({ showSection: false, showBackButton: false });
      this.props.history.push(
        `${routePaths.gre.instruction}?testQuestionSetId=${testQuestionSetId}`
      );
    }
  };

  render() {
    const { section } = QueryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });

    const layoutProps = {
      showPrimaryButton: true,
      primaryButtonText: "Continue",
      showBookmarkButton: false,
      isBookmark: false,
      showPauseButton: false,
      showBackButton: this.state.showBackButton,
      sectionData: this.props.sectionResponse,
      showSection: this.state.showSection,
      handleNextClick: this.handleNextClick,
      handleBackClick: this.handleBackClick,
    };

    return (
      <ThemeProvider theme={greTheme}>
        <Layout {...layoutProps}>
          <Content>
            <InnerContent>
              {!section ? (
                <Box pt={2} pb={2}>
                  <Typography variant="h1" color="textPrimary">
                    Calibration Test Information
                  </Typography>
                </Box>
              ) : (
                <TitleBox>
                  <Typography variant="h1" color="textPrimary">
                    {!_.isEmpty(this.props.sectionResponse) &&
                      this.props.sectionResponse.data.testSection.name}
                  </Typography>
                  <Typography variant="h3" color="textPrimary">
                    {!_.isEmpty(this.props.sectionResponse) &&
                      this.props.sectionResponse.data.testSection.noOfQuestions}
                    {` Questions`}
                  </Typography>
                  <Typography variant="h3" color="textPrimary">
                    {!_.isEmpty(this.props.sectionResponse) &&
                      this.props.sectionResponse.data.testSection.duration}
                    {` minutes (standard time)`}
                  </Typography>
                </TitleBox>
              )}
              <Divider orientation="horizontal" />
              <Box pt={3}>
                <Typography variant="h2" color="textPrimary">
                  Test instructions
                </Typography>
              </Box>
              <Box pt={2}>
                <Typography variant="h6" color="textPrimary">
                  {this.props.instructionsResponse !== null &&
                    this.props.instructionsResponse.data.instructionTitle}
                </Typography>
              </Box>

              {/* Bullet Points */}
              {this.instructions(this.props.instructionsResponse)}
              <DemoBox>
                <Typography variant="h6" color="textPrimary">
                  Click <PrimaryButton disabled>Continue</PrimaryButton> to
                  Continue
                </Typography>
              </DemoBox>
            </InnerContent>
          </Content>
        </Layout>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    instructionsResponse: state.testReducer.instructions,
    sectionResponse: state.testReducer.testSection,
  };
};

export default connect(mapStateToProps, {
  getInstructions,
  getTestSection,
})(Instruction);
