import axios from 'axios';
import { TEST } from '../Action';
import { URL } from '../../../Actions/URL';

export const getFilters = () => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(`${URL}/api/v1/lms/testQuestionSets/filter`, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        dispatch({
          type: TEST.getFilters,
          payload: response.data,
        });
      })
      .catch(error => console.log(error));
  };
};

export const getQuestionSet = bodyObj => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    console.log(bodyObj);
    axios
      .post(`${URL}/api/v1/lms/testQuestionSets`, bodyObj, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        dispatch({
          type: TEST.getQuestionSet,
          payload: response.data,
        });
      })
      .catch(error => console.log(error));
  };
};
