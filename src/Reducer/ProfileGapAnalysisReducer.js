import { PROFILE_GAP_ANALYSIS } from "../Redux/Action";

const initialState = {
  getgeneraldetails: [],
  getstatus: [],
  updatestatus: [],
  updategeneraldetails: [],
  testResults: [],
  testResults: [],
  getcvresult: [],
  deletecvresult: [],
  updatecvresult: [],
  getdashboarddetails: [],
  academicView: [],
  semesterDetails: [],
  updateSemesterDetails: [],
  removeSemesterDetails: [],
  academicDetails: [],
  calculation: [],
  preview: [],
  reportStatus: [],
  getPgaList: null,
  loading: false,
  ppgaNotesStatus: null,
  ppgaCallNotes: null,
  commentHistory: null,
  ppgaCallStatus: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_GAP_ANALYSIS.loader:
      return {
        ...state,
        loading: true,
      };
    case PROFILE_GAP_ANALYSIS.getgeneraldetails:
      return {
        ...state,
        getgeneraldetails: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.getstatus:
      return {
        ...state,
        getstatus: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.getCommentHistory:
      return {
        ...state,
        commentHistory: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.updatestatus:
      return {
        ...state,
        updatestatus: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.updategeneraldetails:
      return {
        ...state,
        updategeneraldetails: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.getPpgaCallNotes:
      return {
        ...state,
        ppgaCallNotes: action.payload,
        loading: action.loading,
      };
    case PROFILE_GAP_ANALYSIS.getTestResults:
      return {
        ...state,
        testResults: action.payload,
      };

    case PROFILE_GAP_ANALYSIS.updatePpgaCallNotes:
      return {
        ...state,
        ppgaCallStatus: action.payload,
        loading: action.loading,
      };

    case PROFILE_GAP_ANALYSIS.getcvresult:
      return {
        ...state,
        getcvresult: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.deletecvresult:
      return {
        ...state,
        deletecvresult: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.updatecvresult:
      return {
        ...state,
        updatecvresult: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.getdashboarddetails:
      return {
        ...state,
        getdashboarddetails: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.getPgaList:
      return {
        ...state,
        getPgaList: action.payload,
        loading: action.loading,
      };
    case PROFILE_GAP_ANALYSIS.viewAcademicDetails:
      return {
        ...state,
        academicView: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.viewSemesterDetails:
      return {
        ...state,
        semesterDetails: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.saveSemesterDetails:
      return {
        ...state,
        updateSemesterDetails: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.deleteSemesterDetails:
      return {
        ...state,
        removeSemesterDetails: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.saveAcademicDetails:
      return {
        ...state,
        academicDetails: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.updateCalculation:
      return {
        ...state,
        calculation: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.getPreview:
      return {
        ...state,
        preview: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.getReportStatus:
      return {
        ...state,
        reportStatus: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.ppgaCallNotesStatus:
      return {
        ...state,
        ppgaNotesStatus: action.payload,
      };
    default:
      break;
  }
  return state;
};
