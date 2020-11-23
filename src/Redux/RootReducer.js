import { combineReducers } from "redux";
import CourseReducer from "../Reducer/CourseReducer";
import QuestionsReducer from "../Reducer/QuestionsReducer";
import CollegeReducer from "../Reducer/CollegeReducer";
import StudentReducer from '../Reducer/StudentReducer'
import ChoiceAnswerReducer from '../Reducer/ChoiceAnswerReducer'

export default combineReducers({
  CourseReducer: CourseReducer,
  QuestionsReducer: QuestionsReducer,
  CollegeReducer: CollegeReducer,
  StudentReducer:StudentReducer,
  ChoiceAnswerReducer:ChoiceAnswerReducer,
  
});
