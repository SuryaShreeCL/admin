import { THIRD_YEAR_WEBINAR } from "../Redux/Action";
import axios from "axios";
import { errorHandler } from "../Component/Utils/Helpers";

const baseUrl = `${process.env.REACT_APP_API_URL}/api/v1`;

export const getAllWebinarList = (page = 1) => async (dispatch) => {
  try {
    dispatch({ type: THIRD_YEAR_WEBINAR.LOADER });
    const { data } = await axios.get(`${baseUrl}/gre/webinar/viewall`, {
      crossDomain: true,
      headers: {
        admin: "yes",
        Authorization: `Bearer ${window.sessionStorage.getItem("accessToken")}`,
      },
      params: {
        page: page - 1,
        size: 6,
      },
    });
    dispatch({
      type: THIRD_YEAR_WEBINAR.GET_ALL_WEBINAR_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch(
      errorHandler(THIRD_YEAR_WEBINAR.GET_ALL_WEBINAR_LIST, error, false)
    );
  }
};

export const getWebinarList = (id) => async (dispatch) => {
  try {
    dispatch({ type: THIRD_YEAR_WEBINAR.LOADER });
    const { data } = await axios.get(`${baseUrl}/gre/webinar/${id}`, {
      crossDomain: true,
      headers: {
        admin: "yes",
        Authorization: `Bearer ${window.sessionStorage.getItem("accessToken")}`,
      },
    });
    dispatch({
      type: THIRD_YEAR_WEBINAR.GET_WEBINAR_BY_ID,
      payload: data,
    });
  } catch (error) {
    dispatch(errorHandler(THIRD_YEAR_WEBINAR.GET_WEBINAR_BY_ID, error, false));
  }
};

export const updateWebinar = (payload) => async (dispatch) => {
  try {
    dispatch({ type: THIRD_YEAR_WEBINAR.LOADER });
    const { data } = await axios.put(`${baseUrl}/gre/webinar`, payload, {
      crossDomain: true,
      headers: {
        admin: "yes",
        Authorization: `Bearer ${window.sessionStorage.getItem("accessToken")}`,
      },
    });
    dispatch({
      type: THIRD_YEAR_WEBINAR.UPDATE_WEBINAR,
      payload: data,
    });
  } catch (error) {
    dispatch(errorHandler(THIRD_YEAR_WEBINAR.UPDATE_WEBINAR, error, false));
  }
};

export const createWebinar = (payload) => async (dispatch) => {
  try {
    dispatch({ type: THIRD_YEAR_WEBINAR.LOADER });
    const { data } = await axios.put(`${baseUrl}/gre/webinar`, payload, {
      crossDomain: true,
      headers: {
        admin: "yes",
        Authorization: `Bearer ${window.sessionStorage.getItem("accessToken")}`,
      },
    });
    dispatch({
      type: THIRD_YEAR_WEBINAR.CREATE_WEBINAR,
      payload: data,
    });
  } catch (error) {
    dispatch(errorHandler(THIRD_YEAR_WEBINAR.CREATE_WEBINAR, error, false));
  }
};

export const deleteWebinarById = (
  webinarId,
  currentPageContentLength
) => async (dispatch) => {
  try {
    dispatch({ type: THIRD_YEAR_WEBINAR.LOADER });
    const { data } = await axios.delete(`${baseUrl}/gre/webinar/${webinarId}`, {
      crossDomain: true,
      headers: {
        admin: "yes",
        Authorization: `Bearer ${window.sessionStorage.getItem("accessToken")}`,
      },
    });
    dispatch({
      type: THIRD_YEAR_WEBINAR.DELETE_WEBINAR_BY_ID,
      payload: { ...data, currentPageContentLength },
    });
  } catch (error) {
    dispatch(
      errorHandler(THIRD_YEAR_WEBINAR.DELETE_WEBINAR_BY_ID, error, false)
    );
  }
};
