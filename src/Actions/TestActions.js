import { TEST } from '../Redux/Action';
import axios from 'axios';

let accessToken = window.sessionStorage.getItem('accessToken');

export const listTests = (status) => async (dispatch) => {
  try {
    dispatch({ type: TEST.LIST_REQUEST });

    const { data } = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/v1/testQuestionSets/events`,
      crossDomain: true,
      headers: {
        admin: 'yes',
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        search: '',
        testType: 'EVENT',
        status: status,
      },
    });

    dispatch({
      type: TEST.LIST_SUCCESS,
      payload: data,
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
        Authorization: `Bearer ${accessToken}`,
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
          Authorization: `Bearer ${accessToken}`,
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
          Authorization: `Bearer ${accessToken}`,
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

export const updateTest = (test) => async (dispatch) => {
  try {
    dispatch({
      type: TEST.UPDATE_REQUEST,
    });
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/v1/testquestionsets`,
      test,
      {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch({
      type: TEST.UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({
      type: TEST.UPDATE_FAIL,
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
          Authorization: `Bearer ${accessToken}`,
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
