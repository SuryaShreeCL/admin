import { TEST } from '../Redux/Action';
import axios from 'axios';
import clevertap from 'clevertap-web-sdk';

export const listTests = (status, page = 1, search = '') => async (dispatch) => {
  try {
    dispatch({ type: TEST.LIST_REQUEST });

    const { data } = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/v1/testQuestionSets/events`,
      crossDomain: true,
      headers: {
        admin: 'yes',
        Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`,
      },
      data: {
        search: search,
        testType: 'EVENT',
        status: status,
        field: ['createdAt'],
        order: ['DESC'],
        // -1 for showing results from 0th index and handling it from 1st index on UI
        page: page - 1,
        size: '6',
      },
    });

    dispatch({
      type: TEST.LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: TEST.LIST_FAIL,
      payload:
        error.response && error.response.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteTest = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TEST.DELETE_REQUEST,
    });

    await axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}/api/v1/testQuestionSet/${id}/status/Archive`,
      crossDomain: true,
      headers: {
        admin: 'yes',
        Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`,
      },
    });

    dispatch({
      type: TEST.DELETE_SUCCESS,
    });
  } catch (error) {
    console.log(error.message);
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;

    dispatch({
      type: TEST.DELETE_FAIL,
      payload: message,
    });
  }
};

export const createTest = (test) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/testQuestionSets`, test, {
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`,
        },
      })
      .then((result) => {
        window.sessionStorage.setItem('questionSetId', JSON.stringify(result?.data?.data?.id));
        window.sessionStorage.setItem(
          'questionSectionId',
          JSON.stringify(result?.data?.data?.testSection[0]?.id)
        );

        dispatch({
          type: TEST.CREATE_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
          type: TEST.CREATE_FAIL,
          payload: message,
        });
      });
  };
};

export const updateTest = (test) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/testQuestionSets`, test, {
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`,
        },
      })
      .then((result) => {
        dispatch({
          type: TEST.UPDATE_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
          type: TEST.UPDATE_FAIL,
          payload: message,
        });
      });
  };
};

export const scheduleTest = (id, dates) => async (dispatch) => {
  try {
    dispatch({
      type: TEST.SCHEDULE_REQUEST,
    });
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/v1/testQuestionSet/${id}/schedule`,
      dates,
      {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`,
        },
      }
    );
    dispatch({
      type: TEST.SCHEDULE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;

    dispatch({
      type: TEST.SCHEDULE_FAIL,
      payload: message,
    });
  }
};

export const setCutOffScore = (test) => async (dispatch) => {
  const payload = {
    testQuestionSetId: test.id,
    cutOffScore: test.cutOffScore,
  };
  try {
    dispatch({
      type: TEST.CUTOFF_REQUEST,
    });
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/v1/testquestionset/cutoffscore`,
      payload,
      {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`,
        },
      }
    );
    dispatch({
      type: TEST.CUTOFF_SUCCESS,
      payload: data.data,
    });

    if (data.success) {
      //On Success capture clevertap event
      clevertap.event.push('Test Results out', {
        'Name of the Drive': test?.linkedEvent?.eventTitle,
        'Test Name': test.name,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({
      type: TEST.CUTOFF_FAIL,
      payload: message,
    });
  }
};

export const getTestDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TEST.DETAILS_REQUEST,
    });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/testquestionset/${id}`,
      {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`,
        },
      }
    );
    dispatch({
      type: TEST.DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({
      type: TEST.DETAILS_FAIL,
      payload: message,
    });
  }
};

export const uploadPostTestStatusByStepId = (sheet, stepId, callback) => {
  return (dispatch) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/v1/students/uploadStudentPostTestStepStatus/${stepId}`,
        sheet,
        {
          crossDomain: true,
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`,
          },
        }
      )
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const scheduleIt = (id) => {
  axios({
    method: 'put',
    url: `${process.env.REACT_APP_API_URL}/api/v1/testQuestionSet/${id}/status/Scheduled`,
    crossDomain: true,
    headers: {
      admin: 'yes',
      Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`,
    },
  }).then(function(response) {
    console.log(response);
  });
};

export const updatePostTestScoreByQuestionSetId = (questionSetId) => {
  return axios({
    method: 'put',
    url: `${process.env.REACT_APP_API_URL}/api/v1/testQuestionSet/${questionSetId}/score`,
    crossDomain: true,
    headers: {
      admin: 'yes',
      Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`,
    },
  }).then((response) => {
    // console.log(response);
    return true;
  }).catch(error=>{
    // console.log(error);
    return false;
  })
};
