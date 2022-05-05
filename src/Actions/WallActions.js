import { WALL } from '../Redux/Action';
import axios from 'axios';

export const listWallPosts = (status, type, page = 0) => async (dispatch) => {
  try {
    dispatch({ type: WALL.LIST_REQUEST });

    const { data } = await axios.get(
      `${
        process.env.REACT_APP_API_URL
      }/api/v1/wallpost?isEvent=${type}&activeStatus=${status}&page=${page -
        1}&size=6`,
      {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${window.sessionStorage.getItem(
            'accessToken'
          )}`,
        },
      }
    );
    dispatch({
      type: WALL.LIST_SUCCESS,
      payload: data,
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

export const listAllWallPosts = (status, type) => async (dispatch) => {
  try {
    dispatch({ type: WALL.LIST_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/wallpost?isEvent=${type}&activeStatus=${status}&page=0&size=1000`,
      {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${window.sessionStorage.getItem(
            'accessToken'
          )}`,
        },
      }
    );
    dispatch({
      type: WALL.LIST_SUCCESS,
      payload: data,
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
export const listWallWebinars = (page = 0, type) => async (dispatch) => {
  let department = window.sessionStorage.getItem('department');

  try {
    dispatch({ type: WALL.WEBINAR_LIST_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/wallpost/webinarlist`,
      {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${window.sessionStorage.getItem(
            'accessToken'
          )}`,
        },
        params: {
          page: page - 1,
          size: 6,
          activeStatus: type ? type : '',
          department: department,
        },
      }
    );

    dispatch({
      type: WALL.WEBINAR_LIST_SUCCESS,
      payload: data,
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

export const listAllWallWebinars = () => async (dispatch) => {
  let department = window.sessionStorage.getItem('department');
  try {
    dispatch({ type: WALL.WEBINAR_LIST_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/wallpost/webinarlist`,
      {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${window.sessionStorage.getItem(
            'accessToken'
          )}`,
        },
        params: {
          page: 0,
          size: 1000,
          department: department,
        },
      }
    );

    dispatch({
      type: WALL.WEBINAR_LIST_SUCCESS,
      payload: data,
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

export const getWallCategories = (status) => async (dispatch) => {
  let department = window.sessionStorage.getItem('department');
  try {
    dispatch({ type: WALL.WALL_CATEGORIES_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/wallcategory`,
      {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${window.sessionStorage.getItem(
            'accessToken'
          )}`,
        },
        params: {
          activeStatus: status,
          department: department,
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

export const getWallJobList = (status) => async (dispatch) => {
  try {
    dispatch({ type: WALL.WALL_JOB_LIST_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/jobcategories?activeStatus=${status}`,
      {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${window.sessionStorage.getItem(
            'accessToken'
          )}`,
        },
      }
    );
    dispatch({
      type: WALL.WALL_JOB_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: WALL.WALL_JOB_LIST_FAIL,
      payload:
        error.response && error.response.message
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

    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/v1/wallpost/${id}`,
      {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${window.sessionStorage.getItem(
            'accessToken'
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

export const createWallPost = (post) => async (dispatch) => {
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
          admin: 'yes',
          Authorization: `Bearer ${window.sessionStorage.getItem(
            'accessToken'
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

export const updateWallPost = (post) => async (dispatch) => {
  try {
    dispatch({
      type: WALL.UPDATE_REQUEST,
    });
    const { data } = await axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/v1/wallpost/${post.id}`,
        post,
        {
          crossDomain: true,
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${window.sessionStorage.getItem(
              'accessToken'
            )}`,
          },
        }
      )
      .then((res) => console.log(res));
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

export const uploadImage = (image, callback) => {
  return (dispatch) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/v1/files/upload/lms/webinar/hostImage`,
        image,
        {
          crossDomain: true,
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${window.sessionStorage.getItem(
              'accessToken'
            )}`,
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

export const getPlatforms = () => {
  return (dispatch) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/platforms`, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${window.sessionStorage.getItem(
            'accessToken'
          )}`,
        },
      })
      .then((response) => {
        dispatch({
          type: WALL.PLATFORMS,
          payload: response.data.data,
        });
      })
      .catch((error) => console.log(error));
  };
};

// export const postRecordedVideoUrl = (webinarId, url) => {
//   return dispatch => {
//     axios.post(
//       `${process.env.REACT_APP_API_URL}/api/v1/webinar/${webinarId}/record/video`,
//       {
//         crossDomain: true,
//         headers: {
//           admin: "yes",
//           Authorization: `Bearer ${window.sessionStorage.getItem(
//             "accessToken"
//           )}`,
//         },
//         params: {
//           url,
//         },
//       }
//     ).tehn;
//   };
// };

export const postRecordedVideoUrl = (webinarId, url, callback) => {
  return (dispatch) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/v1/lms/webinar/${webinarId}/record/video`,
        {},
        {
          crossDomain: true,
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${window.sessionStorage.getItem(
              'accessToken'
            )}`,
          },
          params: {
            url,
          },
        }
      )
      .then((response) => {
        console.log('hello');
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
        callback(error.response.data);
      });
  };
};
