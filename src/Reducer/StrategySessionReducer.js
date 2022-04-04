import { STRATEGY_SESSION } from "../Redux/Action";
const initialState = {
  getStageId: [],
  getTemplateUsingStageId: [],
  getDownloadFileUsingStageId: [],
  postStudentDocumentUsingStageId: [],
  putSaveFileDetailsUsingStageId: [],
  
};
const STRATEGY_SESSION = (state, action) => {
  switch (action.type) {
    case STRATEGY_SESSION.getStageId:
      return {
        ...state,
        StageId: action.getStageId,
      };
    case STRATEGY_SESSION.getTemplateUsingStageId:
      return {
        ...state,
        TemplateUsingStageId: action.getTemplateUsingStageId,
      };
      case STRATEGY_SESSION.postStudentDocumentUsingStageId:
      return {
        ...state,
        TemplateUsingStageId: action.postStudentDocumentUsingStageId,
      };
      case STRATEGY_SESSION.putSaveFileDetailsUsingStageId:
      return {
        ...state,
        TemplateUsingStageId: action.putSaveFileDetailsUsingStageId,
      };
      case STRATEGY_SESSION.getDownloadFileUsingStageId:
      return {
        ...state,
        TemplateUsingStageId: action.getDownloadFileUsingStageId,
      };
  }
};
