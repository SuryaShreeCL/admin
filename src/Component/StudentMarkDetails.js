import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  viewanswers,
  viewresettest,
  viewstudentmarkdetails,
} from '../Actions/StudentMarkDetails';
import NoDataImg from '../Asset/Images/noData.jpg';

function usePrevious(value) {
  const ref = React.useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function CustomizedPrograss(props) {
  const prevViewAnswers = usePrevious(props.viewAnswers);
  console.log(prevViewAnswers);

  const [show, setShow] = useState(false);
  // const quesAns = []
  const [quesAns, setQuesAns] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');
  const [snackColor, setSnackColor] = useState('');

  React.useEffect(() => {
    props.viewstudentmarkdetails(props.id);

    const { viewAnswers } = props;
    if (viewAnswers && viewAnswers.length !== 0) {
      setQuesAns(viewAnswers);
    } else {
      setQuesAns([]);
    }
  }, [props.viewReseTestList, props.viewAnswers]);

  const BorderLinearProgress = withStyles(theme => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }))(LinearProgress);

  const myclick = testId => {
    console.log(testId);
    props.viewresettest(props.id, testId);
  };

  const answers = questionSetName => {
    props.viewanswers(props.id, questionSetName);
    setShow(true);
  };
  console.log(props.viewAnswers);
  console.log(quesAns);

  return (
    <div>
      <div style={{ position: 'relative' }}>
        {props.viewstudentmarkdetailsList.length !== 0
          ? props.viewstudentmarkdetailsList.teststatus.map(singleObject => {
              return (
                <>
                  <Grid container spacing={12}>
                    <Grid item md={6} align='center'>
                      <label>
                        <Typography>{singleObject.questionSetName}</Typography>
                      </label>
                      <BorderLinearProgress
                        style={{ width: '50%' }}
                        variant='determinate'
                        value={singleObject.completed}
                      />
                      <h6>
                        <small>{singleObject.completed}%completed</small>
                      </h6>
                      <br />
                    </Grid>
                    <Grid item md={6}>
                      <Button
                        variant={'contained'}
                        size={'small'}
                        disabled={
                          window.sessionStorage.getItem('role') !==
                          'SUPER ADMIN'
                            ? true
                            : false
                        }
                        color={'primary'}
                        style={{ borderRadius: 30 }}
                        onClick={() => myclick(singleObject.testExecutionId)}
                      >
                        Reset Test
                      </Button>
                      <Button
                        Rounded
                        variant={'contained'}
                        size={'small'}
                        color={'primary'}
                        style={{ borderRadius: 30 }}
                        onClick={e => answers(singleObject.questionSetName)}
                      >
                        Answers
                      </Button>
                    </Grid>
                  </Grid>
                </>
              );
            })
          : null}
        <Dialog open={show}>
          {quesAns.length !== 0 ? (
            <>
              <DialogTitle>Answers</DialogTitle>
              <DialogContent>
                <ol>
                  {quesAns.map(content => {
                    return (
                      <Grid>
                        <li>
                          <Typography>{content.question}</Typography>
                        </li>
                        <Typography style={{ color: 'green' }}>
                          {content.answer}
                        </Typography>
                      </Grid>
                    );
                  })}
                </ol>
              </DialogContent>
            </>
          ) : (
            <>
              <DialogTitle>Please Attend The Test !</DialogTitle>
              <DialogContent>
                <Grid item align={'center'}>
                  <img src={NoDataImg} style={{ width: '80%' }}></img>
                </Grid>
              </DialogContent>
            </>
          )}
          <DialogActions>
            <Button
              variant={'outlined'}
              color={'primary'}
              size={'small'}
              onClick={() => setShow(false)}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  console.log(state);
  return {
    viewstudentmarkdetailsList:
      state.StudentMarkDetailReducer.viewStudentMarkDetailsList,
    viewReseTestList: state.StudentMarkDetailReducer.viewReseTestList,
    viewAnswers: state.StudentMarkDetailReducer.viewAnswersList,
  };
};
export default connect(mapStateToProps, {
  viewstudentmarkdetails,
  viewresettest,
  viewanswers,
})(CustomizedPrograss);
