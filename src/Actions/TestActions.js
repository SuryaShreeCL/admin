import { TEST } from '../Redux/Action';
import axios from 'axios';

let accessToken = window.sessionStorage.getItem('accessToken');

export const listTests = (status, page, size) => async (dispatch) => {
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
        page: page,
        size: size,
        testType: 'EVENT',
        status: status,
      },
    });

    dispatch({
      type: TEST.LIST_SUCCESS,
      payload: data?.data.content,
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

    await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/wallpost/${id}`, {
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

export const createTest = (post) => async (dispatch) => {
  try {
    dispatch({
      type: TEST.CREATE_REQUEST,
    });
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/wallpost`, post, {
      crossDomain: true,
      headers: {
        admin: 'yes',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch({
      type: TEST.CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;

    dispatch({
      type: TEST.CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateTest = (post) => async (dispatch) => {
  try {
    dispatch({
      type: TEST.UPDATE_REQUEST,
    });
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/v1/wallpost/${post.id}`,
      post,
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
