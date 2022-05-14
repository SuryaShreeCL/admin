import { STRATEGY_SESSION } from "../Redux/Action";

const initialState = {
  loading: false,
  documentModel: null,
  fileUploadStatus: null,
  documentUpdateStatus: null,
  downloadFileResponse: null,
  fileDeleteStatus: null,
  uploadFileResponse: null,
  updateGreResponse: null,
  greList: null,
  updateGmatResponse: null,
  gmatList: null,
  updateIeltsResponse: null,
  ieltsList: null,
  updateToeflResponse: null,
  toeflList: null,
  testTranscriptFiles: null,
  filePath: null,
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
    case STRATEGY_SESSION.updateGreData:
      return {
        ...state,
        updateGreResponse: action.payload,
        loading: action.loading,
      };
    case STRATEGY_SESSION.getGreData:
      return {
        ...state,
        greList: action.payload,
        loading: action.loading,
      };
    case STRATEGY_SESSION.updateGmatData:
      return {
        ...state,
        updateGmatResponse: action.payload,
        loading: action.loading,
      };
    case STRATEGY_SESSION.getGmatData:
      return {
        ...state,
        gmatList: action.payload,
        loading: action.loading,
      };
    case STRATEGY_SESSION.updateIeltsData:
      return {
        ...state,
        updateIeltsResponse: action.payload,
        loading: action.loading,
      };
    case STRATEGY_SESSION.getIeltsData:
      return {
        ...state,
        ieltsList: action.payload,
        loading: action.loading,
      };
    case STRATEGY_SESSION.updateToeflData:
      return {
        ...state,
        updateToeflResponse: action.payload,
        loading: action.loading,
      };
    case STRATEGY_SESSION.getToeflData:
      return {
        ...state,
        toeflList: action.payload,
        loading: action.loading,
      };
    case STRATEGY_SESSION.uploadFile:
      return {
        ...state,
        uploadFileResponse: action.payload,
        loading: action.loading,
      };
    case STRATEGY_SESSION.getTestTranscriptFiles:
      return {
        ...state,
        testTranscriptFiles: action.payload,
        loading: action.loading,
      };

    case STRATEGY_SESSION.getFilePath:
      return {
        ...state,
        filePath: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default StrategySessionReducer;
