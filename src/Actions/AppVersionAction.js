import { APPVERSION } from '../Redux/Action';
import axios from 'axios';

export const getCurrentAppVersion = () => async (dispatch) => {
  try {
    dispatch({ type: APPVERSION.REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/app/version?type=ELEV8`,
      {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`,
        },
      }
    );

    dispatch({
      type: APPVERSION.SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: APPVERSION.FAIL,
      payload:
        error.response && error.response.message ? error.response.data.message : error.message,
    });
  }
};

export const updateAppVersion = (versionDetails) => async (dispatch) => {
  try {
    dispatch({
      type: APPVERSION.CREATE_REQUEST,
    });
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/v1/app/version`,
      versionDetails,
      {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`,
        },
      }
    );
    dispatch({
      type: APPVERSION.CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({
      type: APPVERSION.CREATE_FAIL,
      payload: message,
    });
  }
};
