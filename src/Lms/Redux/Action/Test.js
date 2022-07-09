import axios from "axios";
import { TEST, TESTDOWNLOAD } from "../Action";
import { URL } from "../../../Actions/URL";
import { errorHandler } from "../../../Component/Utils/Helpers";

export const getFilters = () => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(`${URL}/api/v1/lms/testQuestionSets/filter`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: TEST.getFilters,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const aegetFilters = () => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(`${URL}/api/v2/lms/testQuestionSets/filter`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: TEST.getFilters,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const getQuestionSet = (bodyObj) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .post(`${URL}/api/v1/lms/testQuestionSets`, bodyObj, {
        //crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: TEST.getQuestionSet,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const aegetQuestionSet = (bodyObj) => {
  let accessToken = sessionStorage.getItem("accessToken");
  console.log(bodyObj);
  return (dispatch) => {
    axios
      .post(`${URL}/api/v2/lms/testQuestionSets`, bodyObj, {
        //crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: TEST.getQuestionSet,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const deleteTest = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    // {{DEV-LMS}}/api/v1/testquestionsets/3f6245e1-78d4-4bbc-be07-519624100297/status/Archive
    axios
      .put(
        `${URL}/api/v1/testquestionsets/${testQuestionSetId}/status/Archive`,
        {},
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        callback(error.response.data);
      });
  };
};

export const aedeleteTest = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    // {{DEV-LMS}}/api/v1/testquestionsets/3f6245e1-78d4-4bbc-be07-519624100297/status/Archive
    axios
      .put(
        `${URL}/api/v2/lms/testquestionsets/${testQuestionSetId}/status/Archive`,
        {},
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        callback(error.response.data);
      });
  };
};

export const reviewTest = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return () => {
    axios
      .put(
        `${URL}/api/v1/testquestionsets/${testQuestionSetId}/status/Review`,
        {},
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
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

// export const aereviewTest = (testQuestionSetId, callback) => {
//   let accessToken = sessionStorage.getItem("accessToken");
//   return () => {
//     axios
//       .put(
//         `${URL}/api/v2/lms/testquestionsets/${testQuestionSetId}/status/Review`,
//         {},
//         {
//           crossDomain: true,
//           headers: {
//              admin: "yes",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//       .then(response => {
//         callback(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };
// };

export const approveTest = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(
        `${URL}/api/v1/testquestionsets/${testQuestionSetId}/status/Approved`,
        {},
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
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

export const aeapproveTest = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(
        `${URL}/api/v2/lms/testquestionsets/${testQuestionSetId}/status/Approved`,
        {},
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
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

export const publishTest = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(
        `${URL}/api/v1/testquestionsets/${testQuestionSetId}/status/Live`,
        {},
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        callback(error.response.data);
        // console.log(error);
      });
  };
};

export const aepublishTest = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(
        `${URL}/api/v2/lms/testquestionsets/${testQuestionSetId}/status/Live`,
        {},
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        callback(error.response.data);
        // console.log(error);
      });
  };
};

export const getQuestionType = (testQuestionSetId) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        `${URL}/api/v1/lms/testQuestionSet/${testQuestionSetId}/questions/types`,
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
          type: TEST.getQuestionType,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const aegetQuestionType = (testQuestionSetId) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        `${URL}/api/v2/lms/testQuestionSet/${testQuestionSetId}/questions/types`,
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
          type: TEST.getQuestionType,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const setQuestionData = (testQuestionSetId, type, data, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .post(
        `${URL}/api/v1/lms/testQuestionSet/${testQuestionSetId}/questions/import?type=${type}`,
        // {{DEV-LMS}}/api/v1/lms/testQuestionSet/{{TESTQUESTIONSETID}}/questions/import?type=SINGLE_SELECT&testSectionId={{TESTSECTIONID}}
        data,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        // dispatch({
        //   type: COURSE_MATERIAL.createFileUpload,
        //   payload: response.data,
        // });
        callback(response.data);
      })
      .catch((error) => {
        // console.log(error);
        callback(error.response.data);
      });
  };
};

export const aesetQuestionData = (testQuestionSetId, type, data, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .post(
        `${URL}/api/v1/lms/testQuestionSet/${testQuestionSetId}/questions/import?type=${type}`,
        // {{DEV-LMS}}/api/v1/lms/testQuestionSet/{{TESTQUESTIONSETID}}/questions/import?type=SINGLE_SELECT&testSectionId={{TESTSECTIONID}}
        data,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        // dispatch({
        //   type: COURSE_MATERIAL.createFileUpload,
        //   payload: response.data,
        // });
        callback(response.data);
      })
      .catch((error) => {
        // console.log(error);
        callback(error.response.data);
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
  let accessToken = sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .post(
        `${URL}/api/v1/lms/testQuestionSet/${testQuestionSetId}/questions/import?type=${type}&testSectionId=${testSectionId}`,
        data,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        // console.log(error);
        callback(error.response.data);
      });
  };
};

export const aesetQuestionDataWithId = (
  testQuestionSetId,
  type,
  testSectionId,
  data,
  callback
) => {
  let accessToken = sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .post(
        `${URL}/api/v2/lms/testQuestionSet/${testQuestionSetId}/questions/import?type=${type}&testSectionId=${testSectionId}`,
        data,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        // console.log(error);
        callback(error.response.data);
      });
  };
};

export const createTestQuestionSet = (questionSets, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .post(`${URL}/api/v1/lms/testquestionsets`, questionSets, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        callback(response.data);
        dispatch({
          type: TEST.createTestQuestionSet,
          payload: response.data,
        });
      })
      .catch((error) => {
        callback(error.response.data);
        console.log(error);
      });
  };
};

export const aecreateTestQuestionSet = (questionSets, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .post(`${URL}/api/v2/lms/testquestionsets`, questionSets, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        callback(response.data);
        dispatch({
          type: TEST.createTestQuestionSet,
          payload: response.data,
        });
      })
      .catch((error) => {
        callback(error?.response?.data);
        console.log(error);
      });
  };
};

export const getTopicByCourse = (courseId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(`${URL}/api/v1/topics/course/${courseId}`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: TEST.getTopicByCourse,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => console.log(error));
  };
};
export const getTemplate = (fileName) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(`${URL}/api/v1/files/template/${fileName}`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: TEST.getTemplate,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
    // {{DEV-LMS}}/api/v1/files/template/calibration_bundel.xlsx
  };
};

export const aegetTemplate = (fileName) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(`${URL}/api/v2/lms/template/${fileName}`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: TEST.getTemplate,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
    // {{DEV-LMS}}/api/v1/files/template/calibration_bundel.xlsx
  };
};

export const getSubjectsByCourse = (subjectId) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(`${URL}/api/v1/subjects/course/${subjectId}`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: TEST.getSubjectsByCourse,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const getTestQuestionSet = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(`${URL}/api/v1/lms/testquestionset/${testQuestionSetId}`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: TEST.getTestQuestionSet,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => console.log(error));
  };
};

export const aegetTestQuestionSet = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(`${URL}/api/v2/lms/testquestionset/${testQuestionSetId}`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: TEST.getTestQuestionSet,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => console.log(error));
  };
};

export const deleteQuestion = (questionId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");

  return () => {
    axios
      .delete(`${URL}/api/v1/question/${questionId}`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => console.log(error));
  };
};

export const aedeleteQuestion = (questionId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return () => {
    axios
      .put(
        `${URL}/api/v2/lms/question/${questionId}`,
        {},
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => console.log(error));
  };
};

export const deleteSection = (sectionId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");

  return () => {
    axios
      .delete(`${URL}/api/v1/testSection/${sectionId}`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => console.log(error));
  };
};

export const aedeleteSection = (sectionId, callback) => {
  // let accessToken = sessionStorage.getItem("accessToken");
  let accessToken = sessionStorage.getItem("accessToken");
  return () => {
    axios
      .put(
        `${URL}/api/v2/lms/testSection/${sectionId}`,
        {},
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => console.log(error));
  };
};

export const getTopicList = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        `${URL}/api/v1/lms/testQuestionSet/${testQuestionSetId}/subjects/concepts/topics`
      )
      .then((response) => {
        window.open(
          `${URL}/api/v1/lms/testQuestionSet/${testQuestionSetId}/subjects/concepts/topics`
        );
        callback(response.data);
      })
      .catch((error) => console.log(error));
  };
};

export const aegetTopicList = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        `${URL}/api/v1/lms/testQuestionSet/${testQuestionSetId}/subjects/concepts/topics`
      )
      .then((response) => {
        window.open(
          `${URL}/api/v1/lms/testQuestionSet/${testQuestionSetId}/subjects/concepts/topics`
        );
        callback(response.data);
      })
      .catch((error) => console.log(error));
  };
};

export const draftTest = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(
        `${URL}/api/v1/testquestionsets/${testQuestionSetId}/status/Draft`,
        {},
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
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

export const aedraftTest = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(
        `${URL}/api/v2/lms/testquestionsets/${testQuestionSetId}/status/{Unarchive}`,
        {},
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
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

export const postQuestions = (testQuestionSetId, data, callback) => {
  const accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .post(
        `${URL}/api/v1/lms/questions/testQuestionSet/${testQuestionSetId}`,
        data,

        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        // dispatch;
        callback(response.data);
      })
      .catch((error) => {
        callback(error.response.data);
        console.log(error);
      });
  };
};

export const aepostQuestions = (testQuestionSetId, data, callback) => {
  const accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .post(
        `${URL}/api/v2/lms/questions/testQuestionSet/${testQuestionSetId}`,
        data,

        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        // dispatch;
        callback(response.data);
      })
      .catch((error) => {
        callback(error.response.data);
        console.log(error);
      });
  };
};

export const getQuestions = (questionId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        // {{DEV-LMS}}/api/v1/lms/questions/c7719662-16ea-4263-9833-36867a48248f
        `${URL}/api/v1/lms/questions/${questionId}`,
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
          type: TEST.getQuestions,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => console.log(error));
  };
};

export const aegetQuestions = (questionId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        // {{DEV-LMS}}/api/v1/lms/questions/c7719662-16ea-4263-9833-36867a48248f
        `${URL}/api/v2/lms/questions/${questionId}`,
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
          type: TEST.getQuestions,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => console.log(error));
  };
};

export const cleanEditData = () => {
  return (dispatch) => {
    dispatch({ type: TEST.cleanEditData });
  };
};

export const previewTestData = (questionId, requestBody) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .post(`${URL}/api/v1/lms/questions/${questionId}/preview`, requestBody, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: TEST.previewTestData,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const aepreviewTestData = (questionId, requestBody) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .post(`${URL}/api/v2/lms/questions/${questionId}/preview`, requestBody, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: TEST.previewTestData,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const downloadTest = (testQuestionSetId, downloadpath) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(`${URL}/api/v2/lms/testQuestionSet/${testQuestionSetId}/report`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "blob",
      })
      .then((response) => {
        var filename = "Student Report";
        //   .split('.')
        //   .slice(0, -1)
        //   .join('.');
        const downloadUrl = window.URL.createObjectURL(
          new Blob([response.data])
        );
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", `${filename}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        dispatch({
          type: TESTDOWNLOAD.testQuestionSetId,
          // payload: response.data,
          payload: { success: true, data: response.data },
          loading: false,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const getTopicListByConceptId = (conceptId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(`${URL}/api/v1/concept/topic/filter`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          id: conceptId,
        },
      })
      .then((response) => {
        dispatch({
          type: TEST.getTopicListByConceptId,
          payload: response.data,
        });
        // callback(response.data);
      })
      .catch((error) => {
        dispatch(errorHandler(TEST.getTopicListByConceptId, error, false));
        // callback(error.response);
        console.log(error);
      });
  };
};
