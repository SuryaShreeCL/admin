import { WALL } from '../Redux/Action';
import axios from 'axios';

export const listWallPosts = (status) => async (dispatch) => {
  try {
    dispatch({ type: WALL.LIST_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_WALL_URL}/api/v1/wallpost?activeStatus=${status}`,
      {
        crossDomain: true,
      }
    );
    console.log(data.content);

    dispatch({
      type: WALL.LIST_SUCCESS,
      payload: data.content,
    });
  } catch (error) {
    dispatch({
      type: WALL.LIST_FAIL,
      payload:
        error.response && error.response.content.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteWallPost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: WALL.DELETE_REQUEST,
    });

    await axios.delete(`${process.env.REACT_APP_API_WALL_URL}/services/WALLs/${id}`, {
      crossDomain: true,
    });
    dispatch({
      type: WALL.DELETE_SUCCESS,
    });
  } catch (error) {
    console.log(error.message);
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;

    dispatch({
      type: WALL.DELETE_FAIL,
      payload: message,
    });
  }
};

export const createWallPost = (WALL) => async (dispatch) => {
  try {
    dispatch({
      type: WALL.CREATE_REQUEST,
    });
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_WALL_URL}/services/WALLs/`,
      WALL,
      {
        crossDomain: true,
      }
    );

    dispatch({
      type: WALL.CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;

    dispatch({
      type: WALL.CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateWallPost = (WALL) => async (dispatch) => {
  try {
    dispatch({
      type: WALL.UPDATE_REQUEST,
    });

    const { data } = await axios.put(
      `${process.env.REACT_APP_API_WALL_URL}/services/WALLs/${WALL.id}`,
      WALL,
      {
        crossDomain: true,
      }
    );

    dispatch({
      type: WALL.UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: WALL.DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({
      type: WALL.UPDATE_FAIL,
      payload: message,
    });
  }
};
