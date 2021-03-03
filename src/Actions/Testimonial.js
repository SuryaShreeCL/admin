import { TESTIMONIAL } from '../Redux/Action';
import axios from 'axios';

export const listTestimonials = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: TESTIMONIAL.LIST_REQUEST });

    const { data } = await axios.get(`/services/testimonials?keyword=${keyword}&pageNumber=${pageNumber}`);

    dispatch({
      type: TESTIMONIAL.LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TESTIMONIAL.LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listTestimonialDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TESTIMONIAL.DETAILS_REQUEST });

    const { data } = await axios.get(`/services/testimonials/${id}`);

    dispatch({
      type: TESTIMONIAL.DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TESTIMONIAL.DETAILS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteTestimonial = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TESTIMONIAL.DELETE_REQUEST,
    });

    await axios.delete(`/services/testimonials/${id}`);

    dispatch({
      type: TESTIMONIAL.DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;

    dispatch({
      type: TESTIMONIAL.DELETE_FAIL,
      payload: message,
    });
  }
};

export const createTestimonial = () => async (dispatch) => {
  try {
    dispatch({
      type: TESTIMONIAL.CREATE_REQUEST,
    });

    const { data } = await axios.post(`/services/testimonials`);

    dispatch({
      type: TESTIMONIAL.CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;

    dispatch({
      type: TESTIMONIAL.CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateTestimonial = (testimonial) => async (dispatch) => {
  try {
    dispatch({
      type: TESTIMONIAL.UPDATE_REQUEST,
    });

    const { data } = await axios.put(`/services/testimonials/${product._id}`, testimonial);

    dispatch({
      type: TESTIMONIAL.UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: TESTIMONIAL.DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({
      type: TESTIMONIAL.UPDATE_FAIL,
      payload: message,
    });
  }
};
