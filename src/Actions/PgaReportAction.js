import axios from 'axios';
import { PGA_REPORT } from '../Redux/Action';
import { URL, RESUME_PARSE_URL } from './URL';

const BASE_URL = `${URL}/api/v1`;

export const getSpiderGraph = (studentId, productId) => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(
        `${BASE_URL}/students/${studentId}/product/${productId}/careerTracks/spiderGraph`,
        {
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(result => {
        dispatch({ type: PGA_REPORT.getSpiderGraph, payload: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const postResumes = formData => {
  return dispatch => {
    axios
      .post(`${RESUME_PARSE_URL}/resume-parser`, formData, null)
      .then(result => {
        dispatch({ type: PGA_REPORT.postParseResume, payload: result.data });
      })
      .catch(error => {
        console.log(error.response);
        dispatch({ type: PGA_REPORT.postParseResume, payload: error });
      });
  };
};

export const getColleges = () => {
  let accessToken = window.sessionStorage.getItem('accessToken');

  return dispatch => {
    axios
      .get(`${BASE_URL}/colleges`, {
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(result => {
        dispatch({ type: PGA_REPORT.getColleges, payload: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getDepartments = () => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(`${BASE_URL}/departments`, {
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(result => {
        dispatch({ type: PGA_REPORT.getDepartments, payload: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getUniversity = () => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(`${BASE_URL}/university`, {
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(result => {
        dispatch({ type: PGA_REPORT.getUniversity, payload: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getDegrees = () => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(`${BASE_URL}/degrees`, {
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(result => {
        dispatch({ type: PGA_REPORT.getDegrees, payload: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getProfessionalCertificates = studentId => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(`${BASE_URL}/students/${studentId}/profileScore`, {
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          type: 'ProfessionalCertificates',
        },
      })
      .then(result => {
        dispatch({
          type: PGA_REPORT.getProfessionalCertificates,
          payload: result.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getAcademicCertificates = studentId => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(`${BASE_URL}/students/${studentId}/profileScore`, {
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          type: 'AcademicCertificates',
        },
      })
      .then(result => {
        dispatch({
          type: PGA_REPORT.getAcademicCertificates,
          payload: result.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getRelevantSkills = studentId => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(`${BASE_URL}/students/${studentId}/profileScore`, {
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          type: 'RelevantSkills',
        },
      })
      .then(result => {
        dispatch({
          type: PGA_REPORT.getRelevantSkills,
          payload: result.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getElectiveSubjects = studentId => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(`${BASE_URL}/students/${studentId}/profileScore`, {
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          type: 'ElectiveSubjects',
        },
      })
      .then(result => {
        dispatch({
          type: PGA_REPORT.getElectiveSubjects,
          payload: result.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getAwardHobby = studentId => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(`${BASE_URL}/students/${studentId}/profileScore`, {
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          type: 'awardhobby',
        },
      })
      .then(result => {
        dispatch({
          type: PGA_REPORT.getAwardHobby,
          payload: result.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const generateCareerTracks = (studentId, productId) => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(
        `${BASE_URL}/students/${studentId}/product/${productId}/careerTracks/generate`,
        {
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(result => {
        dispatch({
          type: PGA_REPORT.generateCareerTracks,
          payload: result.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const addStudentCareerTrackDetails = (
  studentId,
  productId,
  requestBody
) => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .post(
        `${BASE_URL}/students/${studentId}/product/${productId}/careerTracks`,
        requestBody,
        {
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(result => {
        dispatch({
          type: PGA_REPORT.addStudentCareerTrackDetails,
          payload: result.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getResumePdfUrl = (studentId, pathName) => {
  return `${BASE_URL}/cv/download/cv/${studentId}/${pathName}`;
};

export const profileScoreGenerate = (studentId, productId, profileScoreId) => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .put(
        `${BASE_URL}/students/${studentId}/product/${productId}/profileScore/${profileScoreId}`,
        null,
        {
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(result => {
        dispatch({
          type: PGA_REPORT.profileScoreGenerate,
          payload: result.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getResumePdfPath = (studentId, productId) => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(`${BASE_URL}/cv/upload/${studentId}/${productId}`, {
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(result => {
        dispatch({
          type: PGA_REPORT.getResumePdfPath,
          payload: result.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getResumePdfDownloadUrl = (studentId, pathName) => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(`${BASE_URL}/cv/download/cv/${studentId}/${pathName}`, {
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: 'blob',
      })
      .then(result => {
        const blob = new Blob([result.data], {
          type: 'application/octetstream',
        });
        dispatch({
          type: PGA_REPORT.getResumePdfDownloadUrl,
          payload: blob,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getResumeQuestionnaire = (studentId, productId) => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(
        `${BASE_URL}/students/${studentId}/product/${productId}/profileScore`,
        {
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(result => {
        dispatch({
          type: PGA_REPORT.getResumeQuestionnaire,
          payload: result.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const postSpiderGraph = (
  studentId,
  productId,
  profileScoreId,
  formData
) => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .post(
        `${BASE_URL}/students/${studentId}/product/${productId}/profileScore/${profileScoreId}/spiderGraph/upload`,
        formData,
        {
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(result => {
        dispatch({ type: PGA_REPORT.postSpiderGraph, payload: result.data });
      })
      .catch(error => {
        console.log(error.response);
      });
  };
};
