import { PROFILE_MENTORING } from "../Redux/Action";

const initialState = {
  loading: false,
  documentModel: null,
  fileUploadStatus: null,
  documentUpdateStatus: null,
  downloadFileResponse: null,
  fileDeleteStatus: null,
};

const ProfileMentoringReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_MENTORING.loader:
      return { ...state, loading: true };
    case PROFILE_MENTORING.clearData:
      return {};
    case PROFILE_MENTORING.clearCustomData:
      return {
        ...state,
        [action.fieldName]: null,
      };
    case PROFILE_MENTORING.getDocumentModelBySubStageId:
      return {
        ...state,
        documentModel: action.payload,
        loading: action.loading,
      };
    case PROFILE_MENTORING.postFileUpload:
      return {
        ...state,
        fileUploadStatus: action.payload,
        loading: action.loading,
      };
    case PROFILE_MENTORING.putDocumentBySubStageId:
      return {
        ...state,
        documentUpdateStatus: action.payload,
        loading: action.loading,
      };
    case PROFILE_MENTORING.getDownloadByDocumentId:
      return {
        ...state,
        downloadFileResponse: action.payload,
        loading: action.loading,
      };
    case PROFILE_MENTORING.deleteDocumentByDocumentId:
      return {
        ...state,
        fileDeleteStatus: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default ProfileMentoringReducer;
