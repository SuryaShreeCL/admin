import { CV_REVIEW } from '../Redux/Action';

const initialState = {
  isLoading: false,
  studentCvList: null,
  downloadStatus: null,
  cvUploadStatus: null,
  cvReviewStatus: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CV_REVIEW.loader:
      return {
        ...state,
        isLoading: true,
      };
    case CV_REVIEW.getStudentCvList:
      return {
        ...state,
        studentCvList: action.payload,
        isLoading: action.loading,
      };
    case CV_REVIEW.cvDownload:
      return {
        ...state,
        downloadStatus: action.payload,
        isLoading: action.loading,
      };
    case CV_REVIEW.cvUpload:
      return {
        ...state,
        cvUploadStatus: action.payload,
        isLoading: action.loading,
      };
    case CV_REVIEW.reviewCompleted:
      return {
        ...state,
        cvReviewStatus: action.payload,
        isLoading: action.loading,
      };
    case CV_REVIEW.clearCustomData:
      return {
        ...state,
        [action.fieldName]: null,
      };
    default:
      break;
  }
  return state;
};
