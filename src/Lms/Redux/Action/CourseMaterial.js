import axios from 'axios';
import { COURSE_MATERIAL } from '../Action';
import { URL } from '../../../Actions/URL';

const DEV_LMS = URL;

const pageSize = 10;

export const getCourses = callback => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(DEV_LMS + '/api/v1/lms/products', {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        dispatch({
          type: COURSE_MATERIAL.viewCourses,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const courseMonth = (productId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(
        DEV_LMS +
          '/api/v1/lms/studyPlanMaster/product/' +
          productId +
          '/studyPlan/month',
        {
          crossDomain: true,
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(response => {
        dispatch({
          type: COURSE_MATERIAL.courseMonth,
          payload: response.data,
        });
        // callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getSubjects = (courseId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(DEV_LMS + '/api/v1/subjects/product/' + courseId, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        dispatch({
          type: COURSE_MATERIAL.viewSubjects,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getConcepts = (subjectId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(DEV_LMS + '/api/v1/concepts/subject/' + subjectId, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        dispatch({
          type: COURSE_MATERIAL.viewConcepts,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getTopics = (conceptId, pageNo, searchString, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(
        `${DEV_LMS}/api/v1/topics/concept/${conceptId}?page=${pageNo}&size=${pageSize}&search=${searchString}`,

        {
          crossDomain: true,
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(response => {
        dispatch({
          type: COURSE_MATERIAL.viewTopics,
          payload: response.data.data.content,
          payload2: response.data.data.totalPages,
        });

        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getTopics2 = (conceptId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(
        `${DEV_LMS}/api/v1/lms/concept/${conceptId}/topics`,

        {
          crossDomain: true,
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(response => {
        dispatch({
          type: COURSE_MATERIAL.viewTopics,
          payload: response.data.data,
        });
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const deleteTopic = (topicId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .put(
        `${DEV_LMS}/api/v1/topics/${topicId}/status/Archive`,
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
        callback(error.response.data);
        // console.log(error);
      });
  };
};

export const publishTopic = (topicId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .put(
        `${DEV_LMS}/api/v1/topics/${topicId}/status/Live`,
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
        callback(error.esponse.data);

        // console.log(error);
      });
  };
};

export const reviewTopic = (topicId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .put(
        `${DEV_LMS}/api/v1/topics/${topicId}/status/Review`,
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

export const addTopicDetails = (topicDetails, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .post(DEV_LMS + '/api/v1/topics', topicDetails, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        dispatch({
          type: COURSE_MATERIAL.createorUpdateTopics,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const addTaskDetails = (taskDetails, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .post(DEV_LMS + '/api/v1/tasks', taskDetails, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        dispatch({
          type: COURSE_MATERIAL.createorUpdateTask,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getTopicDetails = (topicId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(DEV_LMS + `/api/v1/topics/${topicId}`, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        dispatch({
          type: COURSE_MATERIAL.getTopicFullDetails,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const createFileUpload = (masterId, data, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .post(
        DEV_LMS +
          '/api/v1/lms/studyPlanMaster/' +
          masterId +
          '/studyPlan/import',
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
        dispatch({
          type: COURSE_MATERIAL.createFileUpload,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch(error => {
        if (error.response) callback(error.response.data);
        else callback({ response: false, message: 'file not uploaded' });

        // console.log(error);
      });
  };
};

export const monthPlan = (monthId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(DEV_LMS + '/api/v1/lms/studyPlanMaster/' + monthId + '/studyPlan', {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        dispatch({
          type: COURSE_MATERIAL.monthPlan,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const approveTopic = (topicId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .put(
        `${DEV_LMS}/api/v1/topics/${topicId}/status/Approved`,
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

export const deleteTask = (taskId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return () => {
    axios
      .delete(`${URL}/api/v1/tasks/${taskId}`, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        callback(response.data);
      })
      .catch(error => console.log(error));
  };
};

export const validTopicName = (conceptId, topicName, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return () => {
    axios
      .post(
        DEV_LMS + `/api/v1/topic/concept/${conceptId}/name`,
        { name: topicName },
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

export const uploadTopicImage = (image, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return () => {
    axios
      .post(DEV_LMS + `/api/v1/files/upload/concept/topic/image`, image, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const draftTopic = (topicId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .put(
        `${DEV_LMS}/api/v1/topics/${topicId}/status/Draft`,
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

export const putImage = (file, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  // {{DEV-LMS}}/api/v1/
  return () =>
    axios
      .post(
        `${DEV_LMS}/api/v1/files/upload/test/question/image`,
        file,

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

export const postQuestions = (testQuestionSetId, data, callback) => {
  const accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .post(
        // {{DEV-LMS}}/api/v1/lms/questions/testQuestionSet/{{TESTQUESTIONSETID}}
        `${DEV_LMS}/api/v1/questions/testQuestionSet/${testQuestionSetId}`,
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
        // dispatch;
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};
