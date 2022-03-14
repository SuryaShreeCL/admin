import { STUDENT } from "../Redux/Action";
const initialState = {
  StudentList: [],
  StudentsList: [],
  Answer: [],
  CareerIntertestSurvey: [],
  StudentFilterList: [],
  studentDocumentList: [],
  downloadedDocumentResponse: [],
  editDocumentResponse: [],
  deletedFileResponse: [],
  signUpResponse: [],
  editStudentResponse: [],
  blackListedUserDetails: [],
  whiteListedUserDetails: [],
  manualUserDetails: [],
  mernUserDetails: [],
  signUpError: [],
  cityList: [],
  aspirationDetails: [],
  tempPersonalData: [],
  updateNewPersonalResponse: [],
  getUserDataAcademicInfo: [],
  updateUserData: [],
  getAcademicInfo: [],
  updateAcademicInfo: [],
  uploadFile: [],
  sscexamboard: [],
  getDocumentList: [],
  deleteDocument: [],
  deleteDocumentGraduate: [],
  filteredStageBasedUsers: [],
  searchedList: [],
  StudentStepDetails: [],
  ObComplete: [],
  ObIncomplete: [],
  IncompleteStatus: [],
  getexpecteddate: [],
  getieltsexam: [],
  AspirationTerm: [],
  AspirationDegree: [],
  AspirationBranch: [],
  AspirationCountry: [],
  regionList: [],
  AspirationCollege: [],
  AspirationSpecialization: [],
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
    case STUDENT.deleteDocument:
      return {
        ...state,
        deletedFileResponse: action.deletedFileResponse,
      };
    case STUDENT.editDocument:
      return {
        ...state,
        editDocumentResponse: action.editDocumentResponse,
      };
    case STUDENT.getTempPersonalData:
      return {
        ...state,
        tempPersonalData: action.payload,
      };
    case STUDENT.verifyNewPersonalData:
      return {
        ...state,
        updateNewPersonalResponse: action.payload,
      };
    case STUDENT.getUserDataAcademicInfo:
      return {
        ...state,
        getUserDataAcademicInfo: action.payload,
      };
    case STUDENT.updateUserData:
      return {
        ...state,
        updateUserData: action.payload,
      };
    case STUDENT.getAcademicInfo:
      return {
        ...state,
        getAcademicInfo: action.payload,
      };
    case STUDENT.updateAcademicInfo:
      return {
        ...state,
        updateAcademicInfo: action.payload,
      };

    case STUDENT.uploadFile:
      return {
        ...state,
        uploadFile: action.payload,
      };
    case STUDENT.sscexamboard:
      return {
        ...state,
        sscexamboard: action.payload,
      };
    case STUDENT.getDocumentList:
      return {
        ...state,
        getDocumentList: action.payload,
      };
    case STUDENT.deleteDocument:
      return {
        ...state,
        deleteDocument: action.payload,
      };
    case STUDENT.deleteDocumentGraduate:
      return {
        ...state,
        deleteDocumentGraduate: action.payload,
      };

    case STUDENT.filterStageBaseUsers:
      return {
        ...state,
        filteredStageBasedUsers: action.payload,
      };
    case STUDENT.searchStudentInStages:
      return {
        ...state,
        searchedList: action.payload,
      };
    case STUDENT.StudentStepDetails:
      return {
        ...state,
        StudentStepDetails: action.payload,
      };
    case STUDENT.ObIncomplete:
      return {
        ...state,
        ObIncomplete: action.payload,
      };
    case STUDENT.ObComplete:
      return {
        ...state,
        ObComplete: action.payload,
      };
    case STUDENT.IncompleteStatus:
      return {
        ...state,
        IncompleteStatus: action.payload,
      };
    case STUDENT.getexpecteddate:
      return {
        ...state,
        getexpecteddate: action.payload,
      };
    case STUDENT.getieltsexam:
      return {
        ...state,
        getieltsexam: action.payload,
      };
    case STUDENT.aspirationWork:
      return {
        ...state,
        aspirationWork: action.payload,
      };
    case STUDENT.aspirationLocation:
      return {
        ...state,
        aspirationLocation: action.payload,
      };
    case STUDENT.aspirationPackage:
      return {
        ...state,
        aspirationPackage: action.payload,
      };
    case STUDENT.getaspirationData:
      return {
        ...state,
        getaspirationData: action.payload,
      };
    case STUDENT.postaspirationData:
      return {
        ...state,
        postaspirationData: action.payload,
      };
    case STUDENT.aspirationTerm:
      return {
        ...state,
        AspirationTerm: action.AspirationTerm,
      };
    case STUDENT.aspirationDegree:
      return {
        ...state,
        AspirationDegree: action.AspirationDegree,
      };
    case STUDENT.aspirationBranch:
      return {
        ...state,
        AspirationBranch: action.AspirationBranch,
      };
    case STUDENT.aspirationCountry:
      return {
        ...state,
        AspirationCountry: action.AspirationCountry,
      };
    case STUDENT.aspirationCollege:
      return {
        ...state,
        AspirationCollege: action.AspirationCollege,
      };
    case STUDENT.aspirationSpecialization:
      return {
        ...state,
        AspirationSpecialization: action.AspirationSpecialization,
      };
    default:
      break;
  }
  return state;
};
