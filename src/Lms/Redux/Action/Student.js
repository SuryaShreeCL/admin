import axios from "axios";
import { STUDENT } from "../Action";
import { URL } from "../../../Actions/URL";
import { errorHandler } from "../../../Component/Utils/Helpers";

const DEV_LMS = URL;

export const getProducts = (studentId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(DEV_LMS + `/api/v1/lms/students/${studentId}/products`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: STUDENT.getProducts,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getTaskTopic = (studentId, productId, category, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        DEV_LMS +
          `/api/v1/lms/student/${studentId}/product/${productId}/${category}`,
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
          type: STUDENT.getTaskTopic,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getAllLmsProduct = (callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(DEV_LMS + `/api/v1/lms/products`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: STUDENT.getLmsProducts,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const postStudentLmsProduct = (studentId, data, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(
        DEV_LMS + `/api/v1/lms/students/${studentId}/product/allocated`,
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
        dispatch({
          type: STUDENT.studentLmsProduct,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getCsvTemplate = (callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return () => {
    console.log("hello");
    axios
      .get(DEV_LMS + `/api/v1/files/template/studyplan_template.csv`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const strengthWeaknessExport = (studentId, productId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        DEV_LMS +
          `/api/v1/lms/student/${studentId}/product/${productId}/strengthWeakness?export=true`,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        window.open(
          `${DEV_LMS}/api/v1/lms/student/${studentId}/product/${productId}/strengthWeakness?export=true`
        );
        // dispatch({
        //   type: STUDENT.strengthWeaknessExport,
        //   payload: response.data,
        // });
        // callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const studyPlanExport = (studentId, productId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        DEV_LMS +
          `/api/v1/lms/student/${studentId}/product/${productId}/studyPlans/monthlyDetails?export=true`,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        window.open(
          DEV_LMS +
            `/api/v1/lms/student/${studentId}/product/${productId}/studyPlans/monthlyDetails?export=true`
        );
        // dispatch({
        //   type: STUDENT.studyPlanExport,
        //   payload: response.data,
        // });
        // callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const calibrationTestExport = (studentId, productId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        DEV_LMS +
          `/api/v1/lms/student/${studentId}/product/${productId}/calibrationReport?export=true`,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        window.open(
          DEV_LMS +
            `/api/v1/lms/student/${studentId}/product/${productId}/calibrationReport?export=true`
        );
        // dispatch({
        //   type: STUDENT.calibrationTestExport,
        //   payload: response.data,
        // });
        // callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const topicTestExport = (studentId, productId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        DEV_LMS +
          `/api/v1/lms/student/${studentId}/product/${productId}/topicTests?export=true`,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        window.open(
          DEV_LMS +
            `/api/v1/lms/student/${studentId}/product/${productId}/topicTests?export=true`
        );
        // dispatch({
        //   type: STUDENT.topicTestExport,
        //   payload: response.data,
        // });
        // callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const topicTestReportExport = (studentId, productId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        DEV_LMS +
          `/api/v1/lms/student/${studentId}/product/${productId}/topicTests/report/export`,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        window.open(
          DEV_LMS +
            `/api/v1/lms/student/${studentId}/product/${productId}/topicTests/report/export`
        );
        // dispatch({
        //   type: STUDENT.topicTestReportExport,
        //   payload: response.data,
        // });
        // callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getStudentProducts = (studentId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(DEV_LMS + `/api/v1/lms/students/${studentId}/products/allocated`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: STUDENT.getStudentProducts,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getStudyPlan = (studentId, courseId) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        `${DEV_LMS}/api/v1/lms/student/${studentId}/course/${courseId}/courseTaken/studyPlan`,
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
          type: STUDENT.getStudyPlan,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch(errorHandler(STUDENT.getStudyPlan, error, false));
        console.log(error);
      });
  };
};

export const updateStudyPlan = (studentId, studyPlanId, data, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(
        `${DEV_LMS}/api/v1/lms/student/${studentId}/studyPlan/${studyPlanId}`,
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
        dispatch({
          type: STUDENT.updateStudyPlan,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
        dispatch(errorHandler(STUDENT.updateStudyPlan, error, false));
        callback(errorHandler(STUDENT.updateStudyPlan, error, false));
      });
  };
};
