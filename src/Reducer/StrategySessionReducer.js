import { STRATEGY_SESSION } from "../Redux/Action";

const initialState = {
  loading: false,
  documentModel: null,
  fileUploadStatus: null,
  documentUpdateStatus: null,
  downloadFileResponse: null,
  fileDeleteStatus: null,
};

const StrategySessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case STRATEGY_SESSION.loader:
      return { ...state, loading: true };
    case STRATEGY_SESSION.clearData:
      return {};
    case STRATEGY_SESSION.clearCustomData:
      return {
        ...state,
        [action.fieldName]: null,
      };
    case STRATEGY_SESSION.getDocumentModelBySubStageId:
      return {
        ...state,
        documentModel: action.payload,
        loading: action.loading,
      };
    case STRATEGY_SESSION.postFileUploadBySubStageId:
      return {
        ...state,
        fileUploadStatus: action.payload,
        loading: action.loading,
      };
    case STRATEGY_SESSION.putDocumentBySubStageId:
      return {
        ...state,
        documentUpdateStatus: action.payload,
        loading: action.loading,
      };
    case STRATEGY_SESSION.getDownloadByDocumentId:
      return {
        ...state,
        downloadFileResponse: action.payload,
        loading: action.loading,
      };
    case STRATEGY_SESSION.deleteDocumentByDocumentId:
      return {
        ...state,
        fileDeleteStatus: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default StrategySessionReducer;
