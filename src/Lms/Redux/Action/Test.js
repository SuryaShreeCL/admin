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

export const deleteTest = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    // {{DEV-LMS}}/api/v1/testquestionsets/3f6245e1-78d4-4bbc-be07-519624100297/status/Archive
    axios
      .put(
        `${URL}/api/v1/testquestionsets/${testQuestionSetId}/status/Archive`,
        {},
        {
          crossDomain: true,
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};
export const reviewTest = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .put(
        `${URL}/api/v1/testquestionsets/${testQuestionSetId}/status/Review`,
        {},
        {
          crossDomain: true,
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const approveTest = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .put(
        `${URL}/api/v1/testquestionsets/${testQuestionSetId}/status/Approved`,
        {},
        {
          crossDomain: true,
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};
export const publishTest = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .put(
        `${URL}/api/v1/testquestionsets/${testQuestionSetId}/status/Live`,
        {},
        {
          crossDomain: true,
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getQuestionType = () => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(`${URL}/api/v1/lms/questions/types`, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        dispatch({
          type: TEST.getQuestionType,
          payload: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const setQuestionData = (testQuestionSetId, type, data, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');

  return dispatch => {
    axios
      .post(
        `${URL}/api/v1/lms/testQuestionSet/${testQuestionSetId}/questions/import?type=${type}`,
        // {{DEV-LMS}}/api/v1/lms/testQuestionSet/{{TESTQUESTIONSETID}}/questions/import?type=SINGLE_SELECT&testSectionId={{TESTSECTIONID}}
        data,
        {
          crossDomain: true,
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(response => {
        // dispatch({
        //   type: COURSE_MATERIAL.createFileUpload,
        //   payload: response.data,
        // });
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const setQuestionDataWithId = (
  testQuestionSetId,
  type,
  testSectionId,
  data,
  callback
) => {
  let accessToken = sessionStorage.getItem('accessToken');

  return dispatch => {
    axios
      .post(
        `${URL}/api/v1/lms/testQuestionSet/${testQuestionSetId}/questions/import?type=${type}&testSectionId=${testSectionId}`,
        data,
        {
          crossDomain: true,
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
        callback(error.response.data);
      });
  };
};
