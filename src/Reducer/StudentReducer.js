import { STUDENT } from "../Redux/Action";
const initialState = {
  StudentList: [],
  StudentsList: [],
  Answer: [],
  CareerIntertestSurvey: [],
  StudentFilterList: [],
  studentDocumentList: [],
  downloadedDocumentResponse: [],
  signUpResponse: [],
  editStudentResponse: [],
  blackListedUserDetails: [],
  whiteListedUserDetails: [],
  manualUserDetails: [],
  mernUserDetails: [],
  signUpError: [],
  cityList: [],
  aspirationDetails: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STUDENT.getStudent:
      return {
        ...state,
        StudentsList: action.StudentList,
      };
    case STUDENT.getStudentById:
      return {
        ...state,
        StudentList: action.StudentList,
      };
    case STUDENT.postStudent:
      return {
        ...state,
        StudentList: action.StudentList,
      };
    case STUDENT.studentCollegeInformation:
      return {
        ...state,
        StudentList: action.CollegeInfo,
      };
    case STUDENT.postQuestion:
      return {
        ...state,
        StudentList: action.QuestionList,
      };
    case STUDENT.studentFeedback:
      return {
        ...state,
        StudentList: action.StudentFeedback,
      };
    case STUDENT.startTestExecution:
      return {
        ...state,
        StudentList: action.TestExecution,
      };
    case STUDENT.careerInterestSurvey:
      return {
        ...state,
        CareerIntertestSurvey: action.CareerInterestSurvey,
      };
    case STUDENT.getAnswer:
      return {
        ...state,
        Answer: action.Answer,
      };
    case STUDENT.getStudentPaginate:
      return {
        ...state,
        StudentFilterList: action.StudentFilterResult,
      };
    case STUDENT.viewDocumet:
      return {
        ...state,
        studentDocumentList: action.studentDocumentList,
      };
    case STUDENT.downloadDocument:
      return {
        ...state,
        downloadedDocumentResponse: action.downloadedDocumentResponse,
      };
    case STUDENT.mernStudentSignUp:
      return {
        ...state,
        signUpResponse: action.signUpResponse,
      };
    case STUDENT.mernStudentEdit:
      return {
        ...state,
        editStudentResponse: action.editStudentResponse,
      };
    case STUDENT.getBlackListedUser:
      return {
        ...state,
        blackListedUserDetails: action.blackListedUserDetails,
      };
    case STUDENT.getWhiteListedUser:
      return {
        ...state,
        whiteListedUserDetails: action.whiteListedUserDetails,
      };
    case STUDENT.getManualUser:
      return {
        ...state,
        manualUserDetails: action.manualUserDetails,
      };
    case STUDENT.getMernUser:
      return {
        ...state,
        mernUserDetails: action.mernUserDetails,
      };
    case STUDENT.catchSignUpError:
      return {
        ...state,
        signUpError: action.signUpError,
      };
    case STUDENT.viewAllCity:
      return {
        ...state,
        cityList: action.cityList,
      };
    case STUDENT.getAspirationById:
      return {
        ...state,
        aspirationDetails: action.aspirationDetails,
      };

    default:
      break;
  }
  return state;
};
