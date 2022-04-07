import { APPLICATION_STAGE } from "../Redux/Action";

const initialState = {
  loading: false,
  documentModel: null,
  fileUploadStatus: null,
  documentUpdateStatus: null,
  downloadFileResponse: null,
  schoolList: null,
  miscellaneousList: null,
};

const ApplicationStageReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLICATION_STAGE.loader:
      return { ...state, loading: true };
    case APPLICATION_STAGE.clearData:
      return {};
    case APPLICATION_STAGE.clearCustomData:
      return {
        ...state,
        [action.fieldName]: null,
      };
    case APPLICATION_STAGE.getDocumentModelBySubStageId:
      return {
        ...state,
        documentModel: action.payload,
        loading: action.loading,
      };
    case APPLICATION_STAGE.postFileUploadBySubStageId:
      return {
        ...state,
        fileUploadStatus: action.payload,
        loading: action.loading,
      };
    case APPLICATION_STAGE.putDocumentBySubStageId:
      return {
        ...state,
        documentUpdateStatus: action.payload,
        loading: action.loading,
      };
    case APPLICATION_STAGE.getDownloadByDocumentId:
      return {
        ...state,
        downloadFileResponse: action.payload,
        loading: action.loading,
      };
    case APPLICATION_STAGE.getSchoolList:
      return {
        ...state,
        schoolList: action.payload,
        loading: action.loading,
      };
    case APPLICATION_STAGE.getMiscellaneousList:
      return {
        ...state,
        miscellaneousList: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default ApplicationStageReducer;
