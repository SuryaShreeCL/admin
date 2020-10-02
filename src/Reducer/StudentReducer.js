import { STUDENT } from "../Redux/Action";
const initialState = {
  StudentList: [],
  Answer:[],
  CareerIntertestSurvey:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
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
        StudentList:action.TestExecution,
      };
    case STUDENT.careerInterestSurvey:
      return {
        ...state,
        CareerIntertestSurvey:action.CareerInterestSurvey,
      };
    case STUDENT.getAnswer:
      return {
        ...state,
        Answer:action.Answer,
      };
    default:
      break;
  }
  return state;
};