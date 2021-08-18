import axios from "axios";
import { COURSE_MATERIAL } from "../Action";

const DEV_LMS = "https://dev-serviceslms.thecareerlabs.com";

const pageSize = 10;

const validationToken =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsbXNhZG1pbiIsImV4cCI6MTYyOTI5MzUxOSwiaWF0IjoxNjI5Mjg2MzE5fQ.6OutYsYCA2loH_1eRE9QRzh2IYWm8bK32sdlgTyNiaVvtwH0f8eLvEW8QVoz9QfQ7jK9ojKcAVn0JI-s2jY8cQ";

export const getCourses = (callback) => {
  let accessToken = validationToken;
  return (dispatch) => {
    axios
      .get(DEV_LMS + "/api/v1/lms/products", {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: COURSE_MATERIAL.viewCourses,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getSubjects = (courseId, callback) => {
  let accessToken = validationToken;
  return (dispatch) => {
    axios
      .get(DEV_LMS + "/api/v1/subjects/product/" + courseId, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: COURSE_MATERIAL.viewSubjects,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getConcepts = (subjectId, callback) => {
  let accessToken = validationToken;
  return (dispatch) => {
    axios
      .get(DEV_LMS + "/api/v1/concepts/subject/" + subjectId, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: COURSE_MATERIAL.viewConcepts,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getTopics = (conceptId, pageNo, searchString, callback) => {
  let accessToken = validationToken;
  //   /api/v1/concepts/subject/9031684e-db7e-4744-b0b5-1c7a9172ef30
  //   /api/v1/topics/concept/37eb6138-c085-4a2f-a453-a73fb190d868?page=0&size=10&search=
  return (dispatch) => {
    axios
      .get(
        `${DEV_LMS}/api/v1/topics/concept/${conceptId}?page=${pageNo}&size=${pageSize}&search=${searchString}`,

        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: COURSE_MATERIAL.viewTopics,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteTopic = (topicId) => {
  let accessToken = validationToken;
  return (dispatch) => {
    axios
      .put(
        `${DEV_LMS}/api/v1/topics${topicId}/status/Archive`,

        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: COURSE_MATERIAL.deleteTopic,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // {{DEV-LMS}}/api/v1/topics/{{TOPICID}}/status/Archive
};

// export const viewStudentStatus = id => {
//   let accessToken = window.sessionStorage.getItem('accessToken');

//   return dispatch => {
//     axios
//       .get(URL + '/api/v1/studentVerification/view/' + id, {
//         crossDomain: true,
//         headers: {
//           admin: 'yes',
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then(result => {
//         console.log(result);
//         dispatch({
//           type: ADMIN.viewStudentStatus,
//           studentStatusResponse: result.data,
//         });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };
// };

export const addTopicDetails = (topicDetails, callback) => {
  let accessToken = validationToken;
  return (dispatch) => {
    axios
      .post(DEV_LMS + "/api/v1/topics", topicDetails, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: COURSE_MATERIAL.createorUpdateTopics,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addTaskDetails = (taskDetails, callback) => {
  let accessToken = validationToken;
  return (dispatch) => {
    axios
      .post(DEV_LMS + "/api/v1/tasks", taskDetails, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: COURSE_MATERIAL.createorUpdateTask,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getTopicDetails = (topicId, callback) => {
  let accessToken = validationToken;
  return (dispatch) => {
    axios
      .get(DEV_LMS + `/api/v1/topics/${topicId}`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: COURSE_MATERIAL.getTopicFullDetails,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
