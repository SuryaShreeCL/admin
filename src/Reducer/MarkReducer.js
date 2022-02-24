import { STUDENTMARKDETAILS } from '../Redux/Action';
const initialState = {
  viewStudentMarkDetailsList: [],
  viewReseTestList: [],
  viewAnswersList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STUDENTMARKDETAILS.viewStudentMarkDetails:
      return {
        ...state,
        viewStudentMarkDetailsList: action.viewStudentMarkDetailsList,
      };
    case STUDENTMARKDETAILS.viewResetTest:
      return {
        ...state,
        viewReseTestList: action.viewReseTestList,
      };
    case STUDENTMARKDETAILS.viewAnswers:
      return {
        ...state,
        viewAnswersList: action.viewAnswersList,
      };

    default:
      break;
  }
  return state;
};
