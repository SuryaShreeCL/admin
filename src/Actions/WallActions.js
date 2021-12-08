import { WALL } from "../Redux/Action";
import axios from "axios";

export const listWallPosts = (status, type) => async dispatch => {
  try {
    dispatch({ type: WALL.LIST_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/wallpost?isEvent=${type}&activeStatus=${status}&page=0&size=10000`,
      {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${window.sessionStorage.getItem(
            "accessToken"
          )}`,
        },
      }
    );
    dispatch({
      type: WALL.LIST_SUCCESS,
      payload: data.content,
    });
  } catch (error) {
    dispatch({
      type: WALL.LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listWallWebinars = () => async dispatch => {
  try {
    dispatch({ type: WALL.WEBINAR_LIST_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/wallpost/webinarlist?page=0&size=50000`,
      {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${window.sessionStorage.getItem(
            "accessToken"
          )}`,
        },
      }
    );

    dispatch({
      type: WALL.WEBINAR_LIST_SUCCESS,
      payload: data.content,
    });
  } catch (error) {
    dispatch({
      type: WALL.WEBINAR_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getWallCategories = status => async dispatch => {
  try {
    dispatch({ type: WALL.WALL_CATEGORIES_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/wallcategory?activeStatus=${status}`,
      {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${window.sessionStorage.getItem(
            "accessToken"
          )}`,
        },
      }
    );

    dispatch({
      type: WALL.WALL_CATEGORIES_SUCCESS,
      payload: data.content,
    });
  } catch (error) {
    dispatch({
      type: WALL.WALL_CATEGORIES_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteWallPost = id => async dispatch => {
  try {
    dispatch({
      type: WALL.DELETE_REQUEST,
    });

    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/v1/wallpost/${id}`,
      {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${window.sessionStorage.getItem(
            "accessToken"
          )}`,
        },
      }
    );
    dispatch({
      type: WALL.DELETE_SUCCESS,
    });
  } catch (error) {
    console.log(error.message);
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: WALL.DELETE_FAIL,
      payload: message,
    });
  }
};

export const createWallPost = post => async dispatch => {
  try {
    dispatch({
      type: WALL.CREATE_REQUEST,
    });
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/wallpost`,
      post,
      {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${window.sessionStorage.getItem(
            "accessToken"
          )}`,
        },
      }
    );

    dispatch({
      type: WALL.CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: WALL.CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateWallPost = post => async dispatch => {
  try {
    dispatch({
      type: WALL.UPDATE_REQUEST,
    });
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/v1/wallpost/${post.id}`,
      post,
      {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${window.sessionStorage.getItem(
            "accessToken"
          )}`,
        },
      }
    );
    dispatch({
      type: WALL.UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: WALL.UPDATE_FAIL,
      payload: message,
    });
  }
};

// export const UploadImage = () => {
//   return axios
//     .post(url, data, {
//       params: {
//         ...param,
//       },
//     })
//     .then(res => {
//       response(res);
//     })
//     .catch(err => {
//       error(err);
//     });
// };

export const uploadImage = (image, callback) => {
  return dispatch => {
    axios

      .post(
        `${process.env.REACT_APP_API_URL}/api/v1/files/upload/lms/webinar/hostImage`,
        image,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${window.sessionStorage.getItem(
              "accessToken"
            )}`,
          },
        }
      )
      .then(response => {
        dispatch({
          type: WALL.UPLOADED_IMAGE,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};
