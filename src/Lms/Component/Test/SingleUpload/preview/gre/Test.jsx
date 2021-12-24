import { ThemeProvider } from '@material-ui/styles';
import React, { Component } from 'react';
import { greTheme } from '../../../../../Assets/css/Preview/GreStyles';
import Bundle from './components/Bundle';
import Passage from './components/Passage';
import SingleMulti from './components/SingleMulti';
import Layout from './Layout';

class Test extends Component {
  constructor(props) {
    super(props);
  }

  renderQuestion = () => {
    const {
      type,
      question,
      choices,
      description,
      imgURL,
      isHaveDescription,
      isHaveImage,
      bottomText,
      topText,
      isCalculator,
    } = this.props.testResponse.data;

    if (type === 'SINGLE_SELECT') {
      return isHaveDescription || isHaveImage ? (
        <Passage
          description={description}
          choices={choices}
          selectedChoice={[]}
          imgUrl={imgURL}
          isCalculator={isCalculator}
          question={question}
          bottomText={bottomText}
          topText={topText}
        />
      ) : (
        <SingleMulti
          question={question}
          options={choices}
          selectedChoice={[]}
          description={description}
          imgUrl={imgURL}
          isCalculator={isCalculator}
          bottomText={bottomText}
          topText={topText}
        />
      );
    } else if (type === 'SUBJECTIVE' || type === 'DESCRIPTIVE') {
      return (
        <Passage
          question={question}
          description={description}
          subjective={true}
          answer={this.state.answer}
          imgUrl={imgURL}
          isCalculator={isCalculator}
          bottomText={bottomText}
          topText={topText}
        />
      );
    } else if (type === 'BUNDLE') {
      return isHaveDescription || isHaveImage ? (
        <Passage
          question={question}
          description={description}
          bundle={true}
          choices={choices}
          bundleLength={Math.max.apply(
            Math,
            choices.map(item => item.bundleNo)
          )}
          selectedChoice={[]}
          imgUrl={imgURL}
          isCalculator={isCalculator}
          bottomText={bottomText}
          topText={topText}
        />
      ) : (
        <Bundle
          choices={choices}
          bundleLength={Math.max.apply(
            Math,
            choices.map(item => item.bundleNo)
          )}
          selectedChoice={[]}
          question={question}
          bottomText={bottomText}
          topText={topText}
        />
      );
    } else if (type === 'MULTI_CHOICE') {
      return isHaveDescription || isHaveImage ? (
        <Passage
          description={description}
          question={question}
          choices={choices}
          selectedChoice={[]}
          imgUrl={imgURL}
          isMulti={true}
          isCalculator={isCalculator}
          bottomText={bottomText}
          topText={topText}
        />
      ) : (
        <SingleMulti
          question={question}
          options={choices}
          selectedChoice={[]}
          description={description}
          imgUrl={imgURL}
          isMulti={true}
          isCalculator={isCalculator}
          bottomText={bottomText}
          topText={topText}
        />
      );
    }
  };

  render() {
    const {
      question,
      type,
      isHaveDescription,
      currentQuestionNo,
      choices,
      description,
      totalBundle,
      imgURL,
      isHaveImage,
      isCalculator,
      topText,
      bottomText,
      noOfAnswer,
      testSectionName,
      currentTestSection,
      totalNoOfTestSection,
      totalNoOfQuestion,
      remainingTime,
      testType,
      conceptName,
      testTitle,
    } = this.props.testResponse.data;

    const layoutProps = {
      showPrimaryButton: true,
      showBookmarkButton: true,
      showPauseButton: true,
      showSection: true,
      showCalculatorButton: isCalculator,
      primaryButtonText: 'Continue',
      isBookmark: false,
      question: question,
      disabled: false,
      currentTestSection,
      totalNoOfTestSection,
      totalNoOfQuestion,
      currentQuestionNo,
      remainingTime,
    };

    return (
      <React.Fragment>
        <ThemeProvider theme={greTheme}>
          <Layout {...layoutProps}>{this.renderQuestion()}</Layout>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default Test;
