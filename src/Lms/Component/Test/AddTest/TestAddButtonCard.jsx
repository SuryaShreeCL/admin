import React, { Component } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { AddButton } from '../../../Utils/Buttons';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { CenteredImg, SubTitle } from '../../../Assets/StyledComponents';
import Freepik from '../../../Assets/images/freepik.png';
import { Question } from '../../../Assets/StyledComponents';
import { MoreVertRounded } from '@material-ui/icons';
import Menu from './Menu';

class TestAddButtonCard extends Component {
  constructor(props) {
    super(props);
  }

  renderQuestions = (
    questions,
    handleThreeDotClick,
    handleClose,
    anchorEl,
    handleDelete
  ) => {
    if (questions !== null && questions.length !== 0) {
      return (
        <>
          {questions.map((question, index) => {
            return (
              <Question id={question.id}>
                <div style={{ flex: 1 }}>
                  {index + 1}. {question.question}
                </div>
                <IconButton
                  style={{ padding: '3px', height: '30px', margin: 'auto 0px' }}
                  onClick={event => handleThreeDotClick(event, question.id)}
                >
                  <MoreVertRounded style={{ fill: '#1093ff' }} />
                </IconButton>
                <Menu
                  questionId={question.id}
                  handleClose={handleClose}
                  open={anchorEl}
                  anchorEl={anchorEl}
                  handleDelete={handleDelete}
                />
              </Question>
            );
          })}
        </>
      );
    } else {
      return <CenteredImg src={Freepik} />;
    }
  };

  render() {
    const {
      addQuestion,
      type,
      id,
      questions,
      handleThreeDotClick,
      handleClose,
      anchorEl,
      popUpId,
      handleDelete,
      sectionData,
      tabValue,
    } = this.props;
    // if(questions)
    return (
      <>
        <Grid
          container
          spacing={4}
          alignItems={'center'}
          justifyContent={'space-between'}
          style={{
            marginTop: type !== 'QUESTIONBANK' && '24px',
          }}
        >
          <Grid item>
            <SubTitle>List of Question</SubTitle>
          </Grid>
          <Grid item>
            <div
              style={{
                opacity:
                  id === null
                    ? '0.5'
                    : type === 'CALIBRATION' && sectionData.length === 0
                    ? '0.5'
                    : type === 'CALIBRATION' &&
                      sectionData[tabValue - 1] !== undefined &&
                      sectionData[tabValue - 1]['id'] === null
                    ? '0.5'
                    : 1,
              }}
            >
              <AddButton
                startIcon={<AddRoundedIcon style={{ marginLeft: 6 }} />}
                onClick={addQuestion}
              >
                Add New Question
              </AddButton>
            </div>
          </Grid>
        </Grid>
        {this.renderQuestions(
          questions,
          handleThreeDotClick,
          handleClose,
          anchorEl,
          popUpId,
          handleDelete
        )}
      </>
    );
  }
}

export default TestAddButtonCard;
